import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Web search kan meerdere rondes duren — Node runtime + ruime maxDuration.
export const runtime = "nodejs";
export const maxDuration = 60;

// Sonnet 4.6 is de balans tussen snelheid en kwaliteit, en ondersteunt de
// nieuwere web_search_20260209 tool (dynamic filtering). Override via env.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

function extractBedrijfsnaam(url: string): string {
  const cleaned = url
    .replace(/^(https?:\/\/)?(www\.)?/, "")
    .split(/[/.]/)[0];
  if (!cleaned) return "jouw bedrijf";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY ontbreekt. Zet hem in .env.local." },
      { status: 500 }
    );
  }

  let url = "";
  try {
    const body = await req.json();
    url = (body?.url || "").toString().trim();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (!url) {
    return NextResponse.json({ error: "Vul een website URL in." }, { status: 400 });
  }

  const naam = extractBedrijfsnaam(url);

  const prompt =
    `Zoek op wat het bedrijf op ${url} doet. Zoek naar de website of ` +
    `informatie over dit bedrijf.\n\n` +
    `Geef daarna een echte, specifieke analyse met:\n\n` +
    `1. Korte beschrijving van wat dit bedrijf doet (1-2 zinnen, specifiek ` +
    `gebaseerd op wat je hebt gevonden).\n\n` +
    `2. Drie concrete AI-automatiseringskansen SPECIFIEK voor dit bedrijf en ` +
    `hun sector. Per kans: wat het is, wat het oplevert en hoe snel te ` +
    `implementeren.\n\n` +
    `3. Eén quick win die ze snel kunnen toepassen.\n\n` +
    `Sluit altijd af met: "Wil je weten hoe ZT Digital dit voor ${naam} ` +
    `realiseert? Plan vandaag nog een gratis gesprek via ztdigital.nl"\n\n` +
    `Schrijf professioneel in het Nederlands. Gebruik emoji bullets. Wees ` +
    `enthousiast en overtuigend. Minimaal 200 woorden. Geef alleen de analyse ` +
    `zelf terug, zonder inleidende meta-tekst over je zoekopdracht.`;

  const client = new Anthropic({ apiKey });

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: prompt },
  ];

  try {
    let response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 5 }],
      messages,
    });

    // De server-side tool loop kan pauzeren (pause_turn) — hervatten.
    let guard = 0;
    while (response.stop_reason === "pause_turn" && guard < 3) {
      messages.push({ role: "assistant", content: response.content });
      response = await client.messages.create({
        model: MODEL,
        max_tokens: 2048,
        tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 5 }],
        messages,
      });
      guard++;
    }

    const result = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!result) {
      return NextResponse.json(
        { error: "Geen analyse ontvangen. Probeer het opnieuw." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result, bedrijfsnaam: naam });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Onbekende fout";
    return NextResponse.json(
      { error: "AI-analyse mislukt. Probeer het later opnieuw.", detail },
      { status: 502 }
    );
  }
}

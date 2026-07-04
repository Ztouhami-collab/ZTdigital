import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const FROM = process.env.CONTACT_FROM || "ZT Digital <noreply@ztdigital.nl>";
const TO = process.env.CONTACT_TO || "info@ztdigital.nl";

// Voorkom HTML-injectie: gebruikersinvoer belandt in de e-mail-HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY ontbreekt. Zet hem in .env.local." },
      { status: 500 }
    );
  }

  let body: {
    voornaam?: unknown;
    achternaam?: unknown;
    email?: unknown;
    diensten?: unknown;
    bericht?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const voornaam = (body.voornaam ?? "").toString().trim();
  const achternaam = (body.achternaam ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const bericht = (body.bericht ?? "").toString().trim();
  const diensten = Array.isArray(body.diensten)
    ? body.diensten.map((d) => d.toString().trim()).filter(Boolean)
    : [];

  if (!voornaam || !achternaam || !email || !bericht) {
    return NextResponse.json(
      { error: "Vul je voor- en achternaam, e-mailadres en bericht in." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Vul een geldig e-mailadres in." },
      { status: 400 }
    );
  }

  const dienstenText = diensten.length
    ? diensten.map(escapeHtml).join(", ")
    : "Geen diensten geselecteerd";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nieuw contactformulier van ${voornaam} ${achternaam}`,
      html: `
        <h2>Nieuw bericht via ztdigital.nl</h2>
        <p><strong>Naam:</strong> ${escapeHtml(voornaam)} ${escapeHtml(achternaam)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Diensten:</strong> ${dienstenText}</p>
        <p><strong>Bericht:</strong></p>
        <p>${escapeHtml(bericht).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Versturen mislukt. Probeer het later opnieuw.", detail: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Er ging iets mis bij het versturen. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

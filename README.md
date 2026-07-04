# ZT Digital — Homepage

De volledige homepage van **ZT Digital** als **Next.js 15** app (App Router) met **Tailwind CSS**. Klaar voor VS Code en deploybaar op Vercel.

## Snel starten

```bash
npm install
cp .env.example .env.local   # vul je ANTHROPIC_API_KEY in (alleen nodig voor de URL-analyzer)
npm run dev
```

Open http://localhost:3000

## Structuur

```
app/
  layout.tsx            Fonts (Space Grotesk + Plus Jakarta Sans) + metadata
  globals.css           Tailwind + marquee-animatie + hero-glow
  page.tsx              Zet alle secties op volgorde
  api/analyze/route.ts  Server-route die de Anthropic API aanroept
components/
  Navbar, Hero, UrlAnalyzer, Stats, LogoMarquee, LogoMarqueeTrack,
  Benefits, Services, Cases, Process, PriceBanner, Faq, CtaSection, Footer
  Logo, icons
public/
  logos/                openai, anthropic, microsoft, aws, vercel, supabase, n8n, azure (SVG, mark-only)
  drivedesk-mockup.png  Placeholder — vervang met echte screenshot
  opazorg-mockup.png    Placeholder — vervang met echte screenshot
```

## URL Analyzer

De knop **"Analyseer →"** POST't naar `/api/analyze`. Die server-route roept de Anthropic Messages API aan met model `claude-sonnet-4-5` (override via `ANTHROPIC_MODEL`) en `max_tokens: 500`.

De API-key staat **server-side** in `ANTHROPIC_API_KEY` en komt nooit in de client-bundle. Zonder key geeft de route een nette foutmelding terug in het analyzer-veld. Zet de key op Vercel onder **Project → Settings → Environment Variables**.

> Let op: browsers kunnen de Anthropic API niet direct aanroepen (CORS + key-lek). Daarom loopt het via de server-route — dat is de correcte, veilige aanpak.

## Aanpassen

- **Kleuren** — `tailwind.config.ts` (`brand.green`, `brand.dark`, …)
- **Logo's** — vervang de SVG's in `public/logos/` door de officiële merk-SVG's
- **Cases-afbeeldingen** — vervang de twee PNG-placeholders in `public/`
- **Teksten** — staan als data-arrays boven in elke sectie-component

## Deploy naar Vercel

1. Push naar GitHub
2. Importeer de repo op vercel.com
3. Voeg `ANTHROPIC_API_KEY` toe als Environment Variable
4. Deploy

Framework preset wordt automatisch als Next.js herkend.

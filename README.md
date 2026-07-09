# AK Marketing — hemsida

Statisk hemsida för marknadsföringsbolag. Byggd enligt [hemsida-instruktioner](../hemsida-instruktioner.md): raka ramar, premium navy/grön/vit palett, recensioner & resultat överst.

## Struktur

| Fil | Innehåll |
|-----|----------|
| `index.html` | Hela sidan: hero (recensioner + resultat) → om oss → preview-tab → kontaktformulär |
| `styles.css` | All styling. `border-radius: 0 !important` globalt — raka hörn överallt |
| `script.js` | Videolista, tabs, räknande statistik, formulärvalidering |
| `assets/logo.svg` | Logga (SVG-rekonstruktion — byt gärna mot originalfilen) |
| `assets/videos/` | Lägg videofiler här |

## Redigera innehåll

### Videos (endast utvalda visas)
Öppna `script.js` och redigera `VIDEOS`-listan högst upp:

```js
{ title: "Lanseringskampanj", category: "reels", src: "assets/videos/kampanj.mp4" },
```

`src: null` visar en platshållare tills videon finns.

### Kontaktformulär
Formuläret pekar på Formspree. Skapa ett gratis formulär på [formspree.io](https://formspree.io), kopiera ditt form-ID och byt `DIN-FORM-ID` i `index.html`.

### Statistik & recensioner
Redigeras direkt i `index.html` (sektionen `#resultat`).

## Kör lokalt

Öppna `index.html` i webbläsaren, eller:

```bash
npx serve .
```

## Deploy

Sajten deployas automatiskt via Vercel vid varje push till `main`.

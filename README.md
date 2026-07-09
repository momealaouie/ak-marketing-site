# AK Mediaz — website

Static website for a film production & marketing agency. Sharp corners, premium navy/green/white palette (colors sampled from the logo), reviews & results first.

## Structure

| File | Contents |
|------|----------|
| `index.html` | The whole page: hero (reviews + results + featured clients) → keyword marquee → about → selected work tabs → contact form |
| `styles.css` | All styling. `border-radius: 0 !important` globally — sharp corners everywhere |
| `script.js` | Video list, tabs, scroll reveal animations, animated stats, form validation |
| `assets/logo.svg` | Logo (SVG reconstruction — replace with the original file if preferred) |
| `assets/videos/` | Put video files here |

## Editing content

### Videos (only selected work is shown)
Open `script.js` and edit the `VIDEOS` list at the top:

```js
{ title: "Launch campaign", category: "reels", src: "assets/videos/launch.mp4" },
```

`src: null` shows a placeholder until the file exists. Categories: `reels`, `ads`, `brand`.

### Contact form
The form posts to Formspree. Create a free form at [formspree.io](https://formspree.io), copy your form ID and replace `YOUR-FORM-ID` in `index.html`.

Validation: name required, email must be valid (`user@domain.tld`), phone required (7–15 digits, `+`/spaces/dashes allowed), message required.

### Stats & reviews
Edit directly in `index.html` (the `#results` section).

### Featured clients
Edit the `.clients-grid` cards in `index.html`. Swap the initials `<span class="client-logo">` for `<img class="client-logo" src="assets/clients/name.png" alt="...">` when you have real logo files.

### Socials
Instagram & TikTok are linked in the selected-work section, the contact section and the footer:
[instagram.com/ak.mediaz](https://www.instagram.com/ak.mediaz) · [tiktok.com/@ak.mediaz](https://www.tiktok.com/@ak.mediaz)

## Run locally

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Deploy

The site auto-deploys via Vercel on every push to `main`.

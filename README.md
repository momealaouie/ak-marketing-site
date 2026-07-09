# AK Media — website

Static website for a film production & marketing agency. Sharp corners, premium navy/green/white palette (colors sampled from the logo), reviews & results first.

## Structure

| File | Contents |
|------|----------|
| `index.html` | The whole page: hero (reviews + results + featured clients) → keyword marquee → about → selected work tabs → contact form |
| `styles.css` | All styling. `border-radius: 0 !important` globally — sharp corners everywhere |
| `script.js` | Video list, tabs, scroll reveal animations, animated stats, form validation |
| `assets/logo.png` | The AK Media logo (original) |
| `assets/videos/` | Put video files here |

## Editing content

### Videos (only selected work is shown)
Open `script.js` and edit the `VIDEOS` list at the top:

```js
{ title: "Launch campaign", category: "reels", src: "assets/videos/launch.mp4" },
```

`src: null` shows a placeholder until the file exists. Categories: `reels`, `ads`, `brand`.

### Contact form
The form posts to [FormSubmit](https://formsubmit.co) and delivers submissions to the email address in the form `action` in `index.html` — no account needed. **The first submission triggers a one-time activation email to that address; click the link in it to start receiving messages.** To change the recipient, edit the address in the `action` attribute. After activation, FormSubmit emails you a random alias string you can use in the `action` instead of the plain address to keep it out of the page source.

Validation: name required, email must be valid (`user@domain.tld`), phone required (7–15 digits, `+`/spaces/dashes allowed), message required.

### Stats & reviews
Edit directly in `index.html` (the `#results` section).

### Featured clients
Edit the `.clients-grid` cards in `index.html`. Swap the initials `<span class="client-logo">` for `<img class="client-logo" src="assets/clients/name.png" alt="...">` when you have real logo files.

### Socials
Instagram & TikTok are linked in the selected-work section and the contact section; the footer's Community column also includes LinkedIn:
[instagram.com/ak.mediaz](https://www.instagram.com/ak.mediaz) · [tiktok.com/@ak.mediaz](https://www.tiktok.com/@ak.mediaz) · [linkedin.com/company/ak-mediaz](https://www.linkedin.com/company/ak-mediaz/)

## Run locally

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Deploy

The site auto-deploys via Vercel on every push to `main`.

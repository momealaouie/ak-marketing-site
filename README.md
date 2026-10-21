# AK Media — website

Static website for a film production & marketing agency. Sharp corners, premium navy/green/white palette (colors sampled from the logo), reviews & results first.

## Structure

| File | Contents |
|------|----------|
| `index.html` | The whole page: hero (reviews + results + featured clients) → keyword marquee → about (journey timeline + how we work) → selected work tabs → FAQ → contact form |
| `styles.css` | All styling. `border-radius: 0 !important` globally — sharp corners everywhere |
| `script.js` | Video list, tabs, scroll reveal animations, animated stats, form validation |
| `privacy.html`, `terms.html` | Privacy policy and terms of use, EN + SV in one page each |
| `legal.js` | Language switch for the legal pages (reads the same `lang` the main page saves) |
| `404.html` | Custom "page not found" — Vercel serves it for any missing URL, so its paths are root-absolute |
| `robots.txt`, `sitemap.xml` | For search engines — add any new page to the sitemap |
| `favicon.ico`, `apple-touch-icon.png` | Browser tab icon and iPhone home-screen icon |
| `assets/logo.png` | The AK Media logo (original, 1080px) |
| `assets/logo-168.png` | Small copy of the logo used in the header and footer |
| `assets/og.jpg` | Link preview image (1200×630) shown when the site is shared |
| `assets/fonts/` | Space Grotesk, self-hosted — no request to Google Fonts |
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

The email uses FormSubmit's **box** template (`_template=box`). Do not switch back to `table` — that template clips long messages after ~6 lines in the delivered email, so the rest of a customer's message is lost.

### Stats & reviews
Edit directly in `index.html` (the `#results` section).

### Featured clients
Edit the `.clients-grid` cards in `index.html`. Swap the initials `<span class="client-logo">` for `<img class="client-logo" src="assets/clients/name.png" alt="...">` when you have real logo files.

### Socials
Instagram & TikTok are linked in the selected-work section and the contact section; the footer's Community column also includes LinkedIn:
[instagram.com/ak.mediaz](https://www.instagram.com/ak.mediaz) · [tiktok.com/@ak.mediaz](https://www.tiktok.com/@ak.mediaz) · [linkedin.com/company/ak-mediaz](https://www.linkedin.com/company/ak-mediaz/)

### Analytics
Every page loads Vercel Web Analytics (`/_vercel/insights/script.js`). It sets no cookies, which is why the site needs no cookie banner. It only starts counting once Analytics is enabled for the project in the Vercel dashboard (Project → Analytics → Enable); until then that script 404s. If you ever add something that sets cookies (Meta Pixel, Google Analytics), you need a consent banner first and the privacy policy must be updated.

### Legal pages
`privacy.html` and `terms.html` hold both languages. When you change one, change the other language too and update the "Last updated / Senast uppdaterad" date. The privacy policy promises to delete inquiries within 12 months if no collaboration starts, and to answer data requests within 30 days.

## Run locally

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Deploy

The site auto-deploys via Vercel on every push to `main`.

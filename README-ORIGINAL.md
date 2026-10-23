# Arizran Tech — Professional Typography & Dark Default

## What's changed
- Default theme for first-time visitors: dark (`data-theme="dark"` on each of the 6 HTML pages).
- Browser UI theme color: `#0a1020` initially, with the existing toggle updating it afterward.
- Display/headings: **Manrope** (500–800).
- Body/interface: **Inter** (400–800).
- Small technical labels: **IBM Plex Mono** (unchanged).
- More comfortable display letter spacing and line height in the CSS.
- Existing theme toggle and saved visitor preference preserved.
- Existing WhatsApp GA4 tracking JS preserved, and GA4 base Google tag included on all 6 HTML pages (`G-8PNWGNS64S`).
- Existing content, service pages, portfolio images, sitemap and SEO metadata kept.

## Important: avoid overwriting unshared local edits
This package was assembled from the latest complete website package from this conversation, plus the WhatsApp-tracking JavaScript update and the GA4 tag supplied in chat. If your local repository has *other* changes beyond those, back it up or merge the typography/theme changes rather than blindly replacing all files.

## Minimal manual changes, if you prefer to edit the current live branch
1. In every HTML page, replace `<html lang="en-IN" data-theme="light">` with `<html lang="en-IN" data-theme="dark">`.
2. Replace initial `<meta name="theme-color" content="#f6f8fc">` with `<meta name="theme-color" content="#0a1020">`.
3. Replace each Google Fonts stylesheet href with:
   `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap`
4. Change `--font-display` to `'Manrope',system-ui,sans-serif` and `--font-body` to `'Inter',system-ui,sans-serif` in `styles.css`.
5. Keep existing `script.js`, `service-pages.js`, Google tag, and Google Analytics tracking intact.

## Returning visitors and dark default
The existing theme toggle saves user choice in `localStorage['arizran-theme']`. If your browser previously chose light, it will remain light on return visits. To test the new *first-visit* dark default, open in a private browser window or delete only that localStorage value in browser DevTools.

## Deployment
- Inspect locally and keep a Git backup/commit before replacing files.
- Run `git add . && git commit -m "Refresh typography and set dark default" && git push origin main`.
- Check all 6 pages; check theme toggle, GA4 Realtime and WhatsApp clicks after Cloudflare completes the deployment.

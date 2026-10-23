# Validation report — 23 October 2026

Tested the packaged **seven HTML pages** using Chromium in both desktop (1440×900) and mobile (390×900) viewports.

## Checks passed
- All seven pages rendered in dark and light theme with zero JavaScript page errors.
- No viewport-width overflow in the tested desktop and mobile configurations.
- Header theme toggles operate on all seven pages.
- Mobile navigation opens and closes on all seven pages.
- Homepage before/after switch, process tabs and portfolio filters work.
- Light-theme enquiry dropdown uses **one 18×18 px arrow**, with `background-repeat: no-repeat`.
- WhatsApp enquiry form constructs an encoded WhatsApp message and fires a `whatsapp_click` GA4 event without sending contact details in event parameters.
- All locally referenced image, script and stylesheet paths exist in the package.
- All seven pages have canonical links, a single H1, and working JSON-LD parsing; sitemap is parseable XML.
- Both JavaScript files passed `node --check`, and all three CSS stylesheets passed the CSS parsing check without syntax errors.

## Limits of testing
- Browser visual/interactivity tests used the packaged HTML with inline CSS, JS and image assets because direct `file://` and local-server navigation is blocked in the test environment.
- GA4 network delivery, WhatsApp app handoff, live page indexing, and deployed Cloudflare behavior cannot be fully verified offline. Verify these on your actual website after deploying.
- The 16 `assets/` files are from the earlier approved homepage update in this conversation, not a fresh upload of your current local `assets/` folder. Preserve any newer local images you've changed since then.

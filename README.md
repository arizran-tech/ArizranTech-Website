# Arizran Tech — full website update (23 October 2026)

This archive reconstructs the actual repository hierarchy using the 15 files you uploaded and the 16 earlier-approved asset files already used for this redesign.

## What changed
- Fixed the light-theme dropdown chevron: it is no longer tiled across the select field.
- Moved homepage-specific styling to `homepage.css` and kept the global base in `styles.css`. This avoids accidental styling conflicts with the service and privacy pages.
- Rebuilt consistent pill navigation and light/dark toggle across the Services and Privacy pages.
- Reused the existing approved service art files in service hero panels.
- Kept existing page titles, descriptions, canonical URLs, structured data, service copy, privacy text, GA4 tracking ID and WhatsApp event tracking.
- Added unified JavaScript tracking to the privacy page (previously it used its own smaller inline script).

## To install
Back up your current local repository. Unzip contents into the repository root, preserving the `services/`, `privacy-policy/`, and `assets/` folders. Review changes locally before committing and pushing.

## Important about assets
The user did not re-upload the `assets` directory in the final source batch. The included assets were recovered from the **previously approved homepage repository update** created in this conversation; verify them against your current assets if you edited any images locally since.

## Basic checks
- Open root `index.html`, `/services/`, all four service pages and `/privacy-policy/` in desktop and mobile sizes.
- Switch themes and test the contact form dropdown and submit-to-WhatsApp action.
- Test mobile menus, all footer links, and service navigation.
- Test GA4 Realtime or DebugView after deployment, especially `whatsapp_click`.
- Note: this form opens WhatsApp; it does not store submission data on the website.

## Deployment (after local checks)
```cmd
cd /d D:\Arizran-Tech-website
git add .
git commit -m "Fix themes and unify Arizran website pages"
git push origin main
```

The included `README-ORIGINAL.md` and `WHATSAPP-TRACKING-README.md` are historical background, not deployment instructions for this new package.

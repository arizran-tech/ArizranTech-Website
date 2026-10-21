# Arizran Tech — SEO service pages

Ready-to-deploy static frontend for Cloudflare Workers Static Assets. Keeps Arizran's blue-and-white responsive design, light default theme, original homepage, official logo, original project screenshots, theme toggle, floating WhatsApp control, and fixed back-to-top button.

## New URLs

- `/services/` — all services overview
- `/services/website-development/` — Website Development in Kerala
- `/services/web-app-development/` — web applications & custom business tools
- `/services/seo-services/` — SEO Services in Kerala
- `/services/digital-marketing/` — Meta ads, posters and AI ad reels

Every page has unique SEO title, description, canonical URL, Open Graph and Twitter preview metadata, visible copy, FAQ answers, Service / WebPage / BreadcrumbList JSON-LD. `sitemap.xml` now includes all six indexable pages (homepage + 5 service pages). The homepage service links and footer point to appropriate pages.

## How to deploy

1. Back up your current GitHub repository.
2. Copy the **contents** of this folder to the repository root (not the enclosing folder). Replace existing `index.html`, `script.js`, `styles.css`, `sitemap.xml`, `robots.txt`, and `README.md`. Keep the `assets/` directory, and add `service-pages.css`, `service-pages.js`, and the complete `services/` directory.
3. From the repo folder run:

   git add .
   git commit -m "Add SEO-optimized service landing pages"
   git push origin main

4. Your connected Cloudflare Workers project should deploy automatically from `main`.
5. Test `/services/`, `/services/website-development/` and all four detail pages in a real browser.
6. Verify that each page is `200` and appears at its trailing-slash canonical path. Cloudflare Workers Static Assets defaults to `auto-trailing-slash` for directory index files, provided the Workers asset settings have not overridden it.
7. Check `https://www.arizrantech.com/sitemap.xml`; use Google Search Console to inspect each service page if desired. You do not need to register a new property.

## Important

- No backend, database or CMS required.
- No invented testimonials, ad results, ranking claims, team members, or physical office.
- The homepage still features four real website screenshots and the website development page reuses them.
- This package uses the last shared SEO files as its starting point and includes code for the white-default-theme and back-to-top fixes. If you made further changes in your GitHub copy afterward, review the diff before overwriting it.
- Google decides what gets indexed, and indexation or ranking is not guaranteed.

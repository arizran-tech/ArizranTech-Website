# Arizran Tech: WhatsApp Click Tracking for GA4

This update contains **only two JavaScript files**, based on the latest Arizran service-pages design. It does **not** replace your HTML files or Google Analytics installation.

## Files to replace in `D:\Arizran-Tech-website`

1. Copy `script.js` over the file in the root of your repository.
2. Copy `service-pages.js` over the file in the root of your repository.
3. Do not add the Google tag again. All six HTML pages should continue to have your existing GA4 tag `G-8PNWGNS64S`, once per page.

## What is tracked

- `whatsapp_click` for regular WhatsApp links, including the floating button, footer, and service CTA links.
- `whatsapp_click` for the homepage enquiry form's **Continue on WhatsApp** button; this is a separate explicit call because that form clicks a detached programmatically generated anchor.
- Parameters: `link_location`, `page_path`, and `service_name` **only for the form**. No names, phone numbers, email addresses, or message bodies are sent to GA4.
- Navigation to WhatsApp is not blocked or delayed.

## Publish

```cmd
cd /d D:\Arizran-Tech-website
git add script.js service-pages.js
git commit -m "Track WhatsApp enquiry clicks in GA4"
git push origin main
```

Wait for your Cloudflare Worker deployment to show **Ready**.

## Verify

1. Open your website with ad blocking disabled for this test.
2. Click a floating WhatsApp button (the WhatsApp tab may open; you need not send a message).
3. In GA4, visit Reports > Realtime overview and locate the event count by Event name. Look for `whatsapp_click`. Data can take a few minutes; use DebugView if you're using analytics debugging.
4. Test the homepage contact form separately, with test details, and click Continue on WhatsApp. This should create one `whatsapp_click` event.
5. Mark `whatsapp_click` as a Key event in GA4 Admin > Data display > Key events, when available (GA4 navigation changes periodically).

Notes: A WhatsApp click does **not** prove the message was sent. Other GA4 Enhanced Measurement outbound-link events (`click`) may also appear; these are separate events, not duplicate `whatsapp_click` events. Use a privacy notice and consent setup appropriate for visitors.

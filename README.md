# Natalie Lui — Beauty Cabinet Portfolio

A static HTML/CSS/JavaScript portfolio built for GitHub Pages.

## Preview on your computer

Unzip the project and open `index.html` in Chrome, Safari, or Firefox. The portfolio starts with a closed bathroom mirror; click **Explore my work** to open the cabinet. Click the bottles to view five case studies:

1. KraveBeauty — detailed beauty marketing role overview and limited research excerpts
2. For The Plot NYC — community brand story, original artwork, and event photography
3. Content Creation — 7 playable short-form video examples and dated TikTok analytics
4. Circle Hospitality — early-stage work and 5 restaurant video edits
5. Jefferies — business intelligence experience and synthetic-data dashboard

The About page includes the user-provided portraits and LinkedIn “Let’s connect” button. The Contact page includes direct email (mailto:natalievlui24@gmail.com) and LinkedIn links. The Resume page now displays an image preview of the supplied one-page PDF, direct view/download links, career summary, education, and certification.

## Upload to GitHub Pages

1. Create or open your GitHub repository.
2. Upload `index.html`, `script.js`, `styles.css`, and the entire `assets` folder into its root.
3. Go to **Settings → Pages** and publish the `main` branch from `/(root)`.
4. For a custom domain, add the domain in Pages settings and follow GitHub's DNS instructions.

All paths are relative, so the site works with a project URL or a custom domain. No build tools or third-party JavaScript libraries are required.

## Privacy, permissions and review before public launch

- **Public résumé:** The PDF currently contains a phone number and email address. Anyone can access them after deployment, including by downloading the PDF; consider replacing the PDF with a public-contact version before launch. The site also contains a legible image preview of the same PDF.

- **KraveBeauty:** Research screenshots are limited excerpts of previously selected materials. Review with the employer before public publishing. Do not publish full reports, internal recommendations, influencer data, contacts or confidential plans.
- **Content Creation:** Verify that you can republish all video footage, music, logos, and other third-party media. Statistics on the page are labeled for **September 14–November 12, 2026** and do not imply individual video results.
- **For The Plot:** Confirm photo permissions for recognizable attendees and verify business performance figures.
- **Circle Hospitality:** Confirm that workplace videos and any associated audio are cleared for use.
- **Jefferies:** The dashboard is a **synthetic illustration**, not actual Jefferies data or a recreation of any confidential systems.

## Editing

- Text and page layout: `script.js` (case study and About page templates).
- Colors, responsive layout and animations: `styles.css`.
- Résumé PDF and preview: `assets/Natalie_Lui_Resume.pdf` and `assets/Natalie_Lui_Resume_preview.webp`. Images and video assets: `assets/krave-work`, `assets/creator-work`, `assets/ftp-work`, `assets/circle-work`, plus product and logo assets.

Videos use `preload="none"` so the site does not download them until requested; users should still consider optimizing or using professional hosting if traffic grows. The site is ready for private review and technical deployment but **not approved for public publication** until the review items above are addressed.

## Final Contact page review (November 2026)

Contact uses a responsive two-column invitation with a direct mailto link and verified LinkedIn URL. The email address shown on the Contact page is public after deployment. No form backend is required.

## Mirror animation review (November 17, 2026)

- The closed mirror now uses an opaque condensation layer in front of the text, wiped away with a gentle left-to-right reveal.
- The door remains visible while rotating open instead of immediately fading out.
- The desktop and mobile cabinet shelves stay interactive after the rotation. No duplicate mouse hover text overlays the bottles.
- Background cabinet art remains a static illustration. This is a CSS 3D swing approximation, not a fully modeled 3D scene.
- Reduced-motion preferences are respected.

To replay the opening sequence, reload the home page. Click **Close the cabinet** to return to the landing screen.

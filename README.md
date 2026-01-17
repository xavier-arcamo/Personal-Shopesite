# Xeth Personal Site

A minimal, premium Apple-inspired personal site shell for **xetharcamo.com**. Built with semantic HTML, modern CSS, and vanilla JavaScript — no external assets or frameworks.

## File structure

```
.
├── index.html
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Customize sections

Each section includes **EDIT HERE** blocks for quick updates:

- **Hero:** Update name, tagline, and CTA labels in `index.html`.
- **Portfolio:** Replace placeholder cards and modal text. Add real project metadata.
- **Resume:** Adjust timeline entries and skills/education lists.
- **About:** Add a short bio and “Now” card details.
- **Playground:** Swap in your experiments or side projects.
- **Contact:** Hook the form to a backend or service of your choice.

## Add real portfolio items later

1. Update the `data-modal` title for each card in the Portfolio section.
2. Replace the card text with real descriptions.
3. Enhance `js/main.js` to load content dynamically if needed.

## Deploy to GitHub Pages (custom domain)

1. **Push this repo to GitHub.**
2. In GitHub, open **Settings → Pages**.
3. Set the source to the `main` branch (root).
4. Add a `CNAME` file containing `xetharcamo.com` in the repo root.
5. In your domain registrar, point `xetharcamo.com` to GitHub Pages via A records:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

Wait for DNS propagation, then your site will resolve to GitHub Pages.

## Notes

- Automatic dark/light theme detection with a manual toggle.
- Respectful motion settings for accessibility.
- Subtle background noise and gradients are generated in CSS (no images used).

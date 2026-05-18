# Constellation Marketing — Landing Page

A single-page marketing site for Constellation Marketing, a law firm marketing agency. Built with Astro for static HTML, SEO, and minimal client JavaScript.

## Features

- **Hero** — Full-viewport blurred video background, 50/50 copy and testimonial layout, stat cards
- **Body** — Full [goconstellation.com](https://goconstellation.com/) content: results, pain points, growth system, comparison, testimonials, services, case studies, FAQ, guides
- **Navbar** — React island for hover dropdowns, mobile menu, and hide-near-footer behavior
- **Footer** — Link columns aligned with live site, disclaimer, large wordmark
- **SEO** — Meta tags, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt

## Tech stack

- [Astro 5](https://astro.build/)
- [React 19](https://react.dev/) (Navbar only)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting started

### Prerequisites

- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:4321`).

### Build for production

```bash
npm run build
npm run preview
```

## SEO checklist before launch

1. Set your production domain in `astro.config.mjs` (`site`) and `public/robots.txt` (Sitemap URL).
2. Update copy and contact details in `src/config/site.js`.
3. Add a dedicated `public/og-image.jpg` (1200×630) and point `site.ogImage` to `/og-image.jpg` if you prefer a self-hosted image.
4. Deploy static output from `dist/`.

## Project structure

```
src/
├── config/site.js       # Site name, SEO copy, keywords
├── layouts/
│   └── BaseLayout.astro # HTML shell, meta, JSON-LD
├── pages/
│   └── index.astro      # Home page
├── data/
│   └── site-content.js  # Copy from goconstellation.com
├── components/
│   ├── sections/        # Page body sections (glass UI)
│   ├── Hero.astro       # Static hero (no JS)
│   ├── Footer.astro     # Static footer
│   └── Navbar.jsx       # Interactive nav (client island)
└── styles/global.css    # Tailwind theme (brand colors)
```

## Customization

| What | Where |
|------|--------|
| Production URL | `astro.config.mjs` — `site` |
| Title, description, OG image | `src/config/site.js` |
| Brand green (`#4fbc85`) | `src/styles/global.css` — `--color-brand` |
| Hero video | `src/components/Hero.astro` — `VIDEO_SRC` |
| Nav links & dropdown items | `src/components/Navbar.jsx` |
| Footer links | `src/components/Footer.astro` |

## License

Private project.

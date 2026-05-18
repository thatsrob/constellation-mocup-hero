# Constellation Marketing — Landing Page

A single-page marketing site for Constellation Marketing, a law firm marketing agency. Built with React and Vite, featuring a glassmorphic hero, hover navigation dropdowns, and a minimal footer.

## Features

- **Hero** — Full-viewport blurred video background, 50/50 copy and testimonial layout, stat cards, scroll-to-content control
- **Navbar** — Floating glass pill (mobile), squared glass bar (desktop), hover dropdowns, hides near footer
- **Footer** — Link columns, disclaimer, large wordmark, copyright bar

## Tech stack

- [React 19](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting started

### Prerequisites

- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── App.jsx              # Page layout
├── components/
│   ├── Hero.jsx         # Hero section
│   ├── Navbar.jsx       # Navigation + dropdowns
│   └── Footer.jsx       # Footer
├── index.css            # Tailwind theme (brand colors)
└── main.jsx
```

## Customization

| What | Where |
|------|--------|
| Brand green (`#4fbc85`) | `src/index.css` — `--color-brand` |
| Hero video | `src/components/Hero.jsx` — `VIDEO_SRC` |
| Nav links & dropdown items | `src/components/Navbar.jsx` |
| Footer links | `src/components/Footer.jsx` |

## License

Private project.

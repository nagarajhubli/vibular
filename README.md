# Vibular

> An Angular starter with strong opinions, softer pastels, and absolutely no regrets.
> Built between coffees, shipped on vibes.

**Vibular** = **Vibe** + **Angular**. It's the feeling you get when the CLI scaffolds a project faster than you can question whether you needed it. This entire app — toolbar, themes, PWA plumbing, and even the page that documents the prompts that built it — was assembled by talking to [Claude Code](https://claude.com/claude-code) in plain English.

The full prompt-by-prompt timeline lives inside the app at `/prompts`. It's gloriously self-referential.

## What's in the box

- **Angular 21** with standalone components, signals, and lazy-loaded routes.
- **Angular Material 21** on Material Design 3 — theming via the `mat.theme()` mixin, density tokens, and CSS custom properties.
- **Three pastel themes** — Azure Sky, Rose Petal, Mint Breeze — swappable from the toolbar and remembered in `localStorage`.
- **Split typography** — Montserrat for headlines, Lato for body text, wired through M3's `brand-family` / `plain-family` maps.
- **A components gallery** — 26 live Material demos, each with a copy button and syntax-highlighted source (highlight.js + github-dark).
- **A prompts page** — every prompt used to build this site, tagged and timestamped by step.
- **Progressive Web App** — manifest, service worker, 8 maskable icon sizes, and a rocket logo that survives the home-screen trip.
- **OnPush everywhere**, `takeUntilDestroyed()` for subscriptions, lazy routes — initial bundle sits at ~14 kB.

## Vibe coding, explained

This project is an experiment in **vibe coding** — describing what you want in prose, letting the AI write the code, and keeping only what feels right. Every feature in `src/` traces back to a single prompt you can read on the `/prompts` page. No design docs, no tickets, no JIRA. Just vibes and a git log.

It turns out vibes compile.

## Getting started

```bash
npm install
npm start          # ng serve on http://localhost:4200
```

Other things you might want:

```bash
npm run build      # production build into dist/
npm test           # Vitest, because Karma is a former life
node scripts/generate-icons.mjs  # regenerate PWA icons from the rocket SVG
```

## Project layout

```
src/
├── app/
│   ├── app.ts, app.html, app.scss    # shell: toolbar, theme picker, footer
│   ├── app.routes.ts                  # every route is lazy-loaded
│   ├── pages/
│   │   ├── home/                      # hero + feature cards
│   │   ├── about/                     # how it was built + "Why Vibular?"
│   │   ├── components/                # the big Material gallery
│   │   └── prompts/                   # the receipts
│   └── shared/demo-block/             # reusable demo wrapper with copy + show-code
├── styles.scss                        # mat.theme() calls for each pastel theme
└── index.html                         # fonts, PWA meta, manifest link

public/
├── manifest.webmanifest               # standalone, maskable, theme-coloured
├── favicon.png                        # rocket, not the Angular A
└── icons/                             # 8 sizes, all generated from one SVG

scripts/
└── generate-icons.mjs                 # sharp pipeline: SVG → every PNG you need
```

## Credits

Vibe coded with love by **Nagaraj** & **Claude**.
The Angular team wrote the hard parts. We just described what we wanted.

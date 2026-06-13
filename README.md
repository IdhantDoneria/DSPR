# DSPR — Premium Agency Website

A redesigned, immersive marketing site for **DSPR**, a boutique public relations
& digital marketing agency in Mumbai. Built to feel premium, editorial and
luxury‑grade — a 3D particle hero, smooth scrolling, cinematic reveals, an
interactive services network, a tilting press wall, and infinite client
marquees.

> **Content:** 100% of DSPR's original website copy is preserved verbatim in
> [`src/lib/data.ts`](src/lib/data.ts). Only the presentation was redesigned.

---

## Tech stack

| Concern            | Tool                                           |
| ------------------ | ---------------------------------------------- |
| Framework          | **Next.js 14** (App Router) + **TypeScript**   |
| Styling            | **Tailwind CSS** (custom luxury design tokens) |
| 3D / WebGL         | **React Three Fiber** + **Drei** + **three**   |
| Scroll animation   | **GSAP** + ScrollTrigger                       |
| Component motion   | **Framer Motion**                              |
| Smooth scroll      | **Lenis**                                      |
| State              | **Zustand**                                    |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
npm run type-check
```

Requires Node 18.17+.

## Architecture

```
src/
├── app/
│   ├── layout.tsx           # fonts, metadata, SEO, JSON-LD
│   ├── page.tsx             # section composition
│   ├── globals.css          # design system + reduced-motion handling
│   ├── opengraph-image.tsx  # generated OG/Twitter image
│   ├── icon.svg             # favicon
│   ├── robots.ts / sitemap.ts / manifest.ts
│   └── ...
├── components/
│   ├── layout/              # Experience shell, Header, Footer
│   ├── providers/           # Lenis + GSAP smooth-scroll wiring
│   ├── sections/            # Hero, About, Founder, Awards, Team,
│   │                        # Services, Clients, Media, Contact, ...
│   ├── three/               # particle universe (shaders, fields, scene)
│   ├── ui/                  # cursor, magnetic, marquee, tilt, reveal, …
│   └── seo/JsonLd.tsx
├── hooks/                   # media query, mouse, isomorphic layout effect
└── lib/                     # data (content), store (zustand), gsap, utils
```

### The hero particle universe

`src/components/three/` renders two GPU layers:

- **`AmbientField`** — ~1900 (desktop) drifting points animated in a vertex
  shader, with soft pointer repulsion.
- **`InfluenceNetwork`** — ~90 nodes that float, repel from the cursor and draw
  dynamic connecting lines whose brightness scales with proximity.

`HeroScene` adds restrained camera parallax + slow rotation; `HeroCanvas` clamps
DPR and uses Drei's `AdaptiveDpr` to protect the frame rate. The canvas is
lazy-loaded (`next/dynamic`, `ssr: false`) and skipped entirely for
`prefers-reduced-motion` users (an elegant CSS gradient stands in).

## Performance & accessibility

- DPR clamped (≤2) + adaptive resolution under load; mobile uses a lighter
  particle budget.
- `prefers-reduced-motion` disables Lenis, the WebGL hero, GSAP reveals and
  decorative CSS animation.
- Semantic landmarks, skip link, focus-visible rings, keyboard-operable nav and
  services, `sr-only` brand text on the hero, labelled form fields.
- SEO: full metadata, Open Graph/Twitter, `schema.org` `ProfessionalService`
  JSON-LD, sitemap, robots, manifest.

## Adding real assets

The build ships with refined placeholders so the layout reads as finished.

- **Photography** (founder, team): pass a `src` to
  [`MediaFrame`](src/components/ui/MediaFrame.tsx) pointing at an image in
  `/public`. It swaps the gradient placeholder for an optimized `next/image`.
- **Client / press logos**: brands currently render as typographic wordmarks
  ([`Wordmark`](src/components/ui/Wordmark.tsx)). Replace with `<Image>` per
  client when logo files are available.
- **Hero slideshow imagery**: the original Wix hero photography can be layered
  behind the particle scene if desired (see `HERO_SLIDES` in `data.ts`).

## Contact form

The form composes a `mailto:` to `contact.dspr@gmail.com` (no backend required).
Wire it to a real endpoint (e.g. a serverless route or form provider) by
replacing the `handleSubmit` in
[`Contact.tsx`](src/components/sections/Contact.tsx).

## Deployment

Optimised for **Vercel**: push the repo, import the project, deploy. Any Node
host that runs `next build && next start` works too. Set the production domain in
`SITE.url` (`src/lib/data.ts`) so canonical/OG URLs resolve correctly.

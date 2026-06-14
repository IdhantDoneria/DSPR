# DSPR — Project Handoff

_Last updated: 2026-06-14_

A premium, immersive marketing website for **DSPR**, a boutique Public Relations
& Digital Marketing agency in Mumbai (founder: Digisha Shah). The site is a
content-faithful, design-forward rebuild of the client's original Wix site,
intended to dramatically raise perceived value.

---

## 1. Current State

**Live (production):** https://dsp-r.vercel.app/ — auto-deploys from `main`
via a connected Vercel project. Pushing/merging to `main` redeploys the **same
URL** (no new link). PR branches get throwaway preview URLs.

**Status:** Production-ready. `next build` passes — 10 routes prerender as
static, type-check + lint clean, no API/backend (fully static frontend).

**Sections (top → bottom), all in `src/components/sections/`:**
Hero → FeaturedStrip → About → Founder → Awards → Team → Services → Clients →
Media → Contact. Signature indigo divider bars (`SectionDivider`) sit between
the major groups (see `src/app/page.tsx`).

**What works / recent fixes:**
- Hero has a GPU particle field + interactive node network + a 3-ribbon silk
  centerpiece (`SilkRibbons`), with a cream halo protecting wordmark legibility.
- "Let's talk" (header) and "Enquire" (services) route to the contact form via
  smooth-scroll (the old bare `mailto:` was unreliable and was removed there).
- Clients section: auto-width logo **pills** (was broken fixed circles that
  clipped long names); junk export filenames curated out of the data.
- Services section: **rebuilt** as an editorial index with a GSAP
  cursor-following preview (desktop) / accordion (touch). See §4.
- Contact form is a working `mailto:` composer with a honeypot; no server.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router), TypeScript |
| Styling | Tailwind CSS (custom tokens in `tailwind.config.ts`) |
| 3D / WebGL | React Three Fiber 8 + Drei 9, custom GLSL shaders |
| Animation | GSAP 3 (+ ScrollTrigger), Framer Motion 11 |
| Smooth scroll | Lenis 1 (`SmoothScrollProvider`, exports `scrollTo`) |
| State | Zustand 4 (`src/lib/store.ts` — cursor, menu, loaded, reducedMotion) |
| Node | v22.x (build verified) |

**Run locally:** `npm install` → `npm run dev`. Build: `npm run build`.

---

## 3. Design System (the important part)

The live DSPR identity is **light silk-cream, royal indigo, and warm gold with
centered serif-italic headings** — NOT a dark theme. Tokens live in
`tailwind.config.ts` and `src/app/globals.css`.

**Palette tokens:**
- `canvas` — silk-cream ground (`#F4F1EA`); `canvas-warm`, `canvas-cool`
  (near-white), `canvas-shade` (soft shadow).
- `ink` — near-black text (`#16151A`); `ink-dim`, `ink-mute` for secondary.
- `indigo` — signature royal violet (`#2E2B73`); `indigo-deep`, `indigo-light`,
  `indigo-glow`.
- `gold` — warm amber-gold, legible on cream (`#B98B3A`); `gold-amber`,
  `gold-light`, `gold-deep`.

**Signature treatments:**
- Headings: `SectionHeading` — centered serif-italic flanked by thin indigo
  rules. Body type is Inter (`--font-sans`); display is Bodoni Moda
  (`--font-display`).
- `.silk-ground` utility = woven cream sheen for full sections.
- `.indigo-rule` / `SectionDivider` = the bold violet bar between sections.
- `.text-gradient-gold` / `.text-gradient-indigo`, `.glass` (light frosted card).
- Custom cursor (`Cursor.tsx`) in indigo; hidden native cursor on fine pointers.

**Fonts:** loaded via `next/font/google` in `src/app/layout.tsx`.

---

## 4. Key Technical Decisions

1. **Light theme is the source of truth.** Components were authored for the
   light identity; an early bug was that the `canvas`/`indigo` tokens didn't
   exist and the body was still `bg-ink`, so the deployed site rendered a broken
   dark/light hybrid. Fixed by supplying the tokens + flipping the global ground.
   _Do not reintroduce dark backgrounds for content surfaces._

2. **3D is decorative, never load-bearing for content.** WebGL is used for
   atmosphere only (hero ribbons/particles `src/components/three/`, Contact
   `SilkBackdrop`). A WebGL "loom" was tried as the Services centerpiece and
   **rejected** — it read as blurry stripes. Lesson: content sections must be
   carried by typography, layout, and information design, not abstract shaders.

3. **Services = editorial index + cursor-following preview** (the pattern
   award-winning agencies use), `src/components/sections/Services.tsx`:
   - Desktop (`hover:hover and pointer:fine`): scannable list; hovering a craft
     shows a floating preview card that follows the cursor via `gsap.quickTo`
     (clamped to viewport), with a per-service indigo→gold gradient header,
     tagline, and capabilities. Click → contact form.
   - Touch: same list becomes an inline accordion (`aria-expanded`), with an
     "Enquire →" link. Gated by `useMediaQuery` to avoid SSR mismatch.

4. **All 3D is motion-aware and perf-tuned:** skipped/flattened under
   `prefers-reduced-motion`, DPR clamped, adaptive resolution, lighter particle
   budgets on mobile, lazy-mounted (`next/dynamic`, `ssr:false`).

5. **No backend by design.** Contact is a `mailto:` composer. A future backend
   (real form submission + a tiny CMS for press/clients/team) was scoped at
   roughly a half-day MVP slice; not built.

6. **SEO/SSG complete:** metadata, OpenGraph + Twitter generated images
   (`app/opengraph-image.tsx`), `schema.org` `ProfessionalService` JSON-LD,
   sitemap, robots, PWA manifest — all themed to the light identity.

---

## 5. Content

`src/lib/data.ts` is the single source of truth for all copy (verbatim from the
client). Includes `SITE`, nav, hero slides, about/founder/awards/team blocks,
the six `SERVICES`, `CLIENTS` (grouped categories), `MEDIA`, `CONTACT`.
Editing copy = edit this file only.

---

## 6. Active Constraints & Conventions

- **Branch:** development happens on `claude/kind-hopper-7po2lw`; changes reach
  production by merging to `main`. Do not force-push `main`.
- **Repo scope (for the AI session):** GitHub tooling is restricted to
  `idhantdoneria/dspr`.
- **`SITE.url` is `https://www.dspr.in`** (in `data.ts`) while production runs
  on `dsp-r.vercel.app`. Attach the real custom domain in Vercel before launch
  so canonical/OG URLs resolve correctly. ← **open launch task**
- **Assets:** the site ships with typographic/gradient stand-ins. `MediaFrame`
  and `Wordmark` are built to swap in real photography / client & press logos
  from `/public` when available.
- Keep edits content-faithful; preserve `prefers-reduced-motion` and a11y
  (skip link, focus-visible, semantic landmarks, labelled fields).

---

## 7. Recommended Next Steps (priority order)

1. **Attach the production domain** (`dspr.in`) in Vercel; keep `SITE.url` in
   sync. (Launch blocker for SEO.)
2. **Real imagery** — campaign thumbnails / short muted clips per service feed
   the Services preview card; real client & press logos replace `Wordmark`
   stand-ins. Biggest perceived-quality jump available.
3. Optional **lightweight backend**: real contact submissions (Resend) + a
   minimal CMS (press/clients/team) so non-devs can update content.
4. Cross-device QA at 375 / 428 / 768 / 1024 / 1440 widths.

---

## 8. File Map (quick reference)

```
src/
  app/            layout, page, globals.css, SEO routes (sitemap/robots/og/manifest)
  components/
    sections/     Hero, FeaturedStrip, About, Founder, Awards, Team,
                  Services, Clients, Media, Contact
    layout/       Header, Footer, Experience (page shell)
    three/        HeroCanvas, HeroScene, AmbientField, InfluenceNetwork,
                  SilkRibbons (hero), SilkBackdrop (contact), shaders.ts
    ui/           SectionHeading, SectionDivider, Marquee, Wordmark, TiltCard,
                  MediaFrame, Cursor, Preloader, ScrollProgress, Magnetic,
                  CountUp, RevealText
    providers/    SmoothScrollProvider (Lenis + scrollTo)
    seo/          JsonLd
  hooks/          useMediaQuery, useMousePosition, useIsomorphicLayoutEffect
  lib/            data.ts (content), store.ts, gsap.ts, utils.ts
```

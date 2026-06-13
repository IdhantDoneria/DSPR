"use client";

import { NAV_ITEMS, SITE } from "@/lib/data";
import { scrollTo } from "@/components/providers/SmoothScrollProvider";
import { Magnetic } from "@/components/ui/Magnetic";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink-600 bg-ink-900 pt-20">
      <div className="container-luxe">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl text-ivory">
              Crafting Stories,
              <br />
              <span className="italic text-gold">Driving Results.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-mute">
              A boutique public relations & digital marketing agency from Mumbai,
              shaping brand narratives across luxury, hospitality, weddings,
              travel and lifestyle.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href, -80)}
                    className="text-sm text-ivory-dim transition-colors hover:text-gold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Connect</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-ivory-dim transition-colors hover:text-gold"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-ivory-mute">{SITE.location}</li>
              <li>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory-dim transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory-dim transition-colors hover:text-gold"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized brand mark */}
        <Magnetic strength={0.08}>
          <button
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="block w-full select-none text-center font-display text-[24vw] font-semibold leading-none tracking-tight text-ivory/5 transition-colors duration-700 hover:text-ivory/10"
          >
            DSPR
          </button>
        </Magnetic>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-600 py-8 text-xs text-ivory-mute sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Mumbai · Maharashtra · India</p>
          <button
            onClick={() => scrollTo(0)}
            className="uppercase tracking-widest transition-colors hover:text-gold"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS, SITE } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { scrollTo } from "@/components/providers/SmoothScrollProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const isMenuOpen = useAppStore((s) => s.isMenuOpen);
  const toggleMenu = useAppStore((s) => s.toggleMenu);
  const closeMenu = useAppStore((s) => s.closeMenu);
  const isLoaded = useAppStore((s) => s.isLoaded);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    closeMenu();
    // small delay lets the menu overlay start closing first
    setTimeout(() => scrollTo(href, -80), isMenuOpen ? 200 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isLoaded ? 0 : -100 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled && !isMenuOpen ? "glass" : "bg-transparent"
        )}
      >
        <nav className="container-luxe flex h-20 items-center justify-between">
          <Magnetic strength={0.4} cursorLabel="">
            <button
              onClick={() => scrollTo(0)}
              aria-label="DSPR — back to top"
              className="font-display text-2xl font-semibold tracking-[0.2em] text-ivory"
            >
              DSPR
            </button>
          </Magnetic>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="group relative py-1 text-sm font-medium uppercase tracking-widest text-ivory-dim transition-colors hover:text-ivory"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-luxe group-hover:origin-left group-hover:scale-x-100" />
                  </button>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Magnetic strength={0.3} cursor="hover">
              <a
                href={`mailto:${SITE.email}`}
                className="hidden rounded-full border border-ivory/20 px-5 py-2 text-xs font-medium uppercase tracking-widest text-ivory transition-colors hover:border-gold hover:text-gold sm:inline-block"
              >
                Let's talk
              </a>
            </Magnetic>

            {/* Hamburger (mobile) */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-7 bg-ivory transition-all duration-300",
                  isMenuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-7 bg-ivory transition-all duration-300",
                  isMenuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-800 px-8 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => handleNav(item.href)}
                    className="block font-display text-5xl text-ivory sm:text-6xl"
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <div className="mt-14 flex flex-col gap-1 text-sm text-ivory-mute">
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
              <span>{SITE.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

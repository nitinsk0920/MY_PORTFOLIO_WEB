"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/smooth-scroll-provider";

const RESUME_URL = "https://drive.google.com/file/d/11eVwAG66kxehpISvvDaAffs7P9ZP-OHq/view";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Resume",     href: RESUME_URL, external: true },
  { label: "Contact",    href: "#contact" },
] as const;

export function SiteNavbar() {
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setMenuOpen(false); }
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function scrollToHash(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    setTimeout(() => {
      if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, menuOpen ? 320 : 0);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-white/[0.06] bg-black/90 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:h-16 sm:px-6"
          aria-label="Primary"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { setMenuOpen(false); scrollToHash(e, "#hero"); }}
            style={{
              fontFamily: "var(--font-heading)",
              color: "#FFFFFF",
              letterSpacing: "0",
              fontWeight: 400,
              fontSize: "1.05rem",
              textDecoration: "none",
            }}
          >
            Nitin
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={"external" in link && link.external ? "_blank" : undefined}
                  rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => { if (!("external" in link && link.external)) scrollToHash(e, link.href); }}
                  style={{
                    fontFamily: "var(--font-content)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#94A3B8",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="flex md:hidden flex-col items-center justify-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#FFFFFF",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#FFFFFF",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#FFFFFF",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center md:hidden"
            style={{
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              paddingTop: "4rem",
            }}
          >
            <nav>
              <ul className="flex flex-col items-center gap-7">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if ("external" in link && link.external) { setMenuOpen(false); return; }
                        scrollToHash(e, link.href);
                      }}
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.8rem, 8vw, 2.5rem)",
                        fontWeight: 400,
                        letterSpacing: "0",
                        color: "#FFFFFF",
                        textDecoration: "none",
                        display: "block",
                        textAlign: "center",
                        lineHeight: 1,
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom contact line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "2.5rem",
                fontFamily: "var(--font-content)",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#94A3B8",
                textAlign: "center",
              }}
            >
              nitinsk0920@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

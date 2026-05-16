"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/smooth-scroll-provider";

const RESUME_URL = "https://drive.google.com/file/d/11eVwAG66kxehpISvvDaAffs7P9ZP-OHq/view";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: RESUME_URL, external: true },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteNavbar() {
  const { lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToHash(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -88, duration: 1.2 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-white/[0.06] bg-black/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-[4.5rem]" aria-label="Primary">
        <a
          href="#hero"
          onClick={(e) => scrollToHash(e, "#hero")}
          style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF", letterSpacing: "-0.02em", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none" }}
        >
          Nitin
        </a>

        <ul className="flex items-center gap-5 sm:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={"external" in link && link.external ? "_blank" : undefined}
                rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => { if (!("external" in link && link.external)) scrollToHash(e, link.href); }}
                className="text-[10px] font-medium uppercase tracking-[0.22em] transition-colors sm:text-[11px]"
                style={{ fontFamily: "var(--font-content)", color: "#94A3B8", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

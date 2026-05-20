import { Container } from "@/components/container";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function FooterSection() {
  return (
    <footer id="footer" className="relative border-t border-white/10 py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <p className="font-heading text-2xl font-normal text-foreground">
              Nitin S Katagihallimath
            </p>
            <p className="mt-1 text-sm text-muted">
              AI/ML Enthusiast · AI Application Builder · Freelancer
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted transition hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="h-px w-full max-w-sm bg-white/15" />

          <div className="space-y-1">
            <p className="text-xs text-muted/70">
              © {new Date().getFullYear()} Nitin S Katagihallimath
            </p>
            <p className="text-xs text-muted/50">
              Designed & Built by Nitin S Katagihallimath — Exploring AI, creativity, and immersive digital experiences.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

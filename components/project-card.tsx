"use client";

import anime from "animejs";
import { useRef } from "react";
import { GlowBorderCard } from "@/components/ui/glow-border-card";

const ARCHIVE_GLOW_COLORS = [
  "#ffffff",
  "#e2e8f0",
  "#cbd5e1",
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#ffffff",
  "#cbd5e1",
  "#f8fafc",
  "#ffffff",
];

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  highlight: string;
  metric: string;
  featured?: boolean;
  align?: "left" | "right";
  onSelect?: () => void;
  githubUrl?: string;
};

export function ProjectCard({
  title,
  description,
  techStack,
  highlight,
  metric,
  featured = false,
  align = "left",
  onSelect,
  githubUrl,
}: ProjectCardProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  function intensify() {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    anime({
      targets: panel,
      translateY: -8,
      scale: 1.008,
      easing: "easeOutCubic",
      duration: 380,
    });
  }

  function soften() {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    anime({
      targets: panel,
      translateY: 0,
      scale: 1,
      easing: "easeOutCubic",
      duration: 520,
    });
  }

  const alignment = align === "left" ? "lg:mr-auto" : "lg:ml-auto";

  return (
    <article
      data-project-node
      className={`relative w-full opacity-0 ${alignment}`}
      onPointerEnter={intensify}
      onPointerLeave={soften}
    >
      <GlowBorderCard
        width="100%"
        height="auto"
        borderRadius="0.75rem"
        animationDuration={16}
        gradientColors={ARCHIVE_GLOW_COLORS}
        borderWidth="0.26rem"
        blurAmount="0.85rem"
        inset="-0.18rem"
        className="w-full max-w-3xl bg-background dark:bg-background shadow-[0_0_42px_rgba(255,255,255,0.05)]"
      >
        <div
          ref={panelRef}
          className="relative min-h-[440px] w-full rounded-lg border border-white/10 bg-background p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] sm:p-8"
        >
          <div className="flex h-full min-h-[392px] flex-col justify-between">
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-300">
                    {featured ? "Primary Archive" : "Project Archive"}
                  </p>
                  <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                    {title}
                  </h3>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-200 shadow-[0_0_22px_rgba(255,255,255,0.1)]">
                  {metric}
                </div>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
                {description}
              </p>

              <div className="mt-6 rounded-lg border border-border/25 bg-background/32 p-4">
                <p className="text-xs font-medium uppercase text-slate-300">
                  Key Highlight
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {highlight}
                </p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted transition duration-300 hover:border-white/25 hover:text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition duration-300 hover:border-white/40 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                onClick={onSelect}
              >
                View Details
              </button>
              <a
                href={githubUrl ?? "#"}
                aria-disabled={!githubUrl}
                onClick={(event) => {
                  if (!githubUrl) {
                    event.preventDefault();
                  }
                }}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-center text-sm font-medium text-muted transition duration-300 hover:border-white/25 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-white/30 aria-disabled:cursor-not-allowed aria-disabled:opacity-55"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </GlowBorderCard>
    </article>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";

const EXPERIENCE = [
  {
    role: "Freelance AI Application Builder",
    period: "2023 – Present",
    client: "Hospital Client (Healthcare AI)",
    description:
      "Worked with a hospital client to build and deploy a multilingual healthcare education chatbot for Chronic Liver Disease (CLD) and Sarcopenia.",
    focus: [
      "Full-stack AI application workflows",
      "Chatbot systems",
      "Frontend experience design",
      "AI integrations",
      "Supabase database integration",
      "Authentication workflows",
      "Deployment workflows",
      "AI-assisted development",
    ],
    also: ["CoDe-DuINo AI Arduino Assistant project"],
    note: "Also designed immersive portfolio and web experiences using AI-assisted tools and cinematic visual inspirations.",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001,
  });

  // Gentle parallax on the contained image box
  const imgY     = useTransform(smooth, [0, 1], ["6%", "-6%"]);
  const imgScale = useTransform(smooth, [0, 0.4, 1], [1.08, 1.0, 1.04]);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32">
      <Container>
        {/*
         * Same lg:grid-cols-2 as About:
         *   LEFT  — all experience content
         *   RIGHT — fall.jpg in a small contained portrait box,
         *           vertically centred (left-middle visual position)
         */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ══════════════════════════════════
              LEFT — experience content
              ══════════════════════════════════ */}
          <div className="flex flex-col">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Experience"
                title="Real-world AI work."
                description="Freelance projects delivering end-to-end AI applications for real clients."
              />
            </ScrollReveal>

            {EXPERIENCE.map((exp) => (
              <div key={exp.role}>
                {/* Role + period */}
                <ScrollReveal delay={80} className="mt-10">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted">
                        Role
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 400,
                          fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
                          color: "#f5f5f5",
                          marginTop: "0.45rem",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.2,
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{exp.client}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
                      {exp.period}
                    </span>
                  </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={120} className="mt-5">
                  <p className="text-sm leading-7 text-muted" style={{ fontWeight: 300 }}>
                    {exp.description}
                  </p>
                </ScrollReveal>

                {/* Focus tags */}
                <ScrollReveal delay={150} className="mt-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Focused On
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Note */}
                <ScrollReveal delay={180} className="mt-5">
                  <p className="text-sm italic leading-7 text-muted/70" style={{ fontWeight: 300 }}>
                    {exp.note}
                  </p>
                </ScrollReveal>

                {/* Also deployed */}
                <ScrollReveal delay={200} className="mt-5">
                  <div className="border border-white/10 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      Also Deployed
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {exp.also.map((item) => (
                        <li key={item} className="text-sm text-foreground/85" style={{ fontWeight: 300 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════
              RIGHT — fall.jpg
              Full column height portrait,
              parallax on scroll.
              Only shows on desktop (lg+).
              ══════════════════════════════════ */}
          <div className="hidden lg:flex items-center justify-start h-full pl-8">
            <ScrollReveal threshold={0.06}>
              <div
                className="relative overflow-hidden"
                style={{
                  /*
                   * Native ratio: 675x1200 = 9:16 (0.5625)
                   * Cap width at 675px (native) so we never upscale.
                   * Height follows naturally: 675 * (16/9) = 1200px,
                   * clamped to 80vh so it stays inside viewport.
                   */
                  width:       "clamp(260px, 28vw, 675px)",
                  aspectRatio: "675 / 1200",
                  maxHeight:   "80vh",
                  border:      "1px solid rgba(255,255,255,0.07)",
                  marginTop:   "2rem",
                }}
              >
                <motion.div
                  style={{
                    y:          imgY,
                    scale:      imgScale,
                    position:   "absolute",
                    inset:      "-10%",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src="/assets/fall.jpg"
                    alt="Fall — cinematic atmosphere"
                    fill
                    priority
                    quality={100}
                    sizes="675px"
                    style={{
                      objectFit:      "cover",
                      objectPosition: "center center",
                    }}
                  />
                </motion.div>

                {/* Left edge fade */}
                <div
                  aria-hidden
                  style={{
                    position:      "absolute",
                    inset:         0,
                    background:    "linear-gradient(to right, rgba(8,8,8,0.55) 0%, transparent 30%)",
                    zIndex:        1,
                    pointerEvents: "none",
                  }}
                />
                {/* Top + bottom vignette */}
                <div
                  aria-hidden
                  style={{
                    position:      "absolute",
                    inset:         0,
                    background:    "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 18%, transparent 78%, rgba(8,8,8,0.7) 100%)",
                    zIndex:        2,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}

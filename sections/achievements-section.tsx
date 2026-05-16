"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";

const ACHIEVEMENTS = [
  {
    title: "1st Place — Nivista 3.0 Project Exhibition",
    org: "Nivista 3.0 · KLE Technological University",
    desc: "Awarded first place in the project exhibition for outstanding work in AI application development.",
    certLink: "https://drive.google.com/file/d/1HvK-G8iTOiIGhTw06z1AX21VSicbBh_1/view?usp=sharing",
  },
  {
    title: "Research Paper Accepted — ICMLAS 2025",
    org: "International Conference on Machine Learning & AI Systems · 2025",
    desc: "Research paper accepted and presented at ICMLAS 2025 on AI and machine learning systems.",
    certLink: "https://drive.google.com/file/d/1l98Ap29MEMFfqhfP_57KQAqA6GnQLdeP/view?usp=sharing",
  },
  {
    title: "Participated — Amazon ML Hackathon",
    org: "Amazon · 2024",
    desc: "Built a multimodal ML system combining text and image data for product price prediction using DistilBERT, ResNet50, and XGBoost.",
    certLink: null,
  },
  {
    title: "Patent Filing in Progress",
    org: "Smart Syrup Bottle Cap Design · 2024",
    desc: "Filed a patent for a smart syrup bottle cap design addressing medication adherence in clinical and home care settings.",
    certLink: null,
  },
  {
    title: "2nd Place — Intra College Table Tennis",
    org: "KLE Technological University · 2023",
    desc: "Secured second place in the intra-college table tennis competition.",
    certLink: null,
  },
];

// Split into: top-row (2), middle-left (1), middle-right (1), bottom-row (1)
const TOP    = ACHIEVEMENTS.slice(0, 2); // left + right of top
const MID_L  = ACHIEVEMENTS[2];          // left of center
const MID_R  = ACHIEVEMENTS[3];          // right of center
const BOTTOM = ACHIEVEMENTS[4];          // below center

function AchievementCard({
  item,
  delay = 0,
}: {
  item: (typeof ACHIEVEMENTS)[0];
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <article className="flex h-full flex-col border border-white/10 bg-black/30 p-4">
        <h3
          style={{
            fontFamily:    "var(--font-heading)",
            fontWeight:    400,
            fontSize:      "clamp(0.78rem, 1.2vw, 0.92rem)",
            color:         "#E2E8F0",
            lineHeight:    1.35,
            margin:        0,
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-muted" style={{ fontWeight: 400 }}>{item.org}</p>
        <p className="mt-2 flex-1 text-xs leading-5 text-muted" style={{ fontWeight: 300 }}>
          {item.desc}
        </p>
        {item.certLink && (
          <a
            href={item.certLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-medium text-foreground transition hover:border-white/50 hover:bg-white/5"
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Certificate
          </a>
        )}
      </article>
    </ScrollReveal>
  );
}

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping:   16,
    restDelta: 0.001,
  });

  const videoY     = useTransform(smooth, [0, 1], ["-6%", "10%"]);
  const videoScale = useTransform(smooth, [0, 0.5, 1], [1.06, 1.0, 1.04]);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-24 sm:py-32">
      <Container>

        {/* Section header — full width above the grid */}
        <ScrollReveal>
          <SectionHeader
            eyebrow="Achievements"
            title="Research & Achievements"
            description="Awards, publications, hackathons, and notable accomplishments along the way."
            align="center"
          />
        </ScrollReveal>

        {/*
         * LAYOUT — desktop only radial grid:
         *
         *   [ card ]  [ card ]  [ card ]  [ card ]
         *             [  PORTAL (center)  ]
         *   [ card ]                      [ card ]
         *             [      card        ]
         *
         * We use a CSS grid:
         *   3 columns: left-cards | portal | right-cards
         *   Rows driven by content
         */}

        {/* ── Desktop layout ─────────────────────────────────────────── */}
        <div className="mt-14 hidden lg:grid"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows:    "auto auto auto",
            columnGap:           "0.75rem",
            rowGap:              "0.75rem",
            alignItems:          "center",
          }}
        >
          {/* TOP-LEFT card */}
          <div style={{ gridColumn: 1, gridRow: 1 }}>
            <AchievementCard item={TOP[0]} delay={0} />
          </div>

          {/* TOP-CENTER — empty */}
          <div style={{ gridColumn: 2, gridRow: 1, minHeight: "0" }} />

          {/* TOP-RIGHT card */}
          <div style={{ gridColumn: 3, gridRow: 1 }}>
            <AchievementCard item={TOP[1]} delay={60} />
          </div>

          {/* MIDDLE-LEFT card */}
          <div style={{ gridColumn: 1, gridRow: 2, alignSelf: "center" }}>
            <AchievementCard item={MID_L} delay={120} />
          </div>

          {/* CENTER — Portal video, perfectly centered in middle column */}
          <div style={{ gridColumn: 2, gridRow: 2, display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-4rem" }}>
            <ScrollReveal threshold={0.06}>
              <div
                className="relative overflow-hidden"
                style={{
                  width:       "clamp(200px, 20vw, 260px)",
                  aspectRatio: "2 / 3",
                  border:      "1px solid rgba(255,255,255,0.08)",
                  background:  "#000",
                }}
              >
                <motion.div
                  style={{
                    y:          videoY,
                    scale:      videoScale,
                    position:   "absolute",
                    inset:      "-10%",
                    willChange: "transform",
                  }}
                >
                  <video
                    ref={videoRef}
                    src="/animations/portals.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width:          "100%",
                      height:         "100%",
                      objectFit:      "cover",
                      objectPosition: "center top",
                      filter:         "grayscale(100%) brightness(0.5) contrast(1.18)",
                    }}
                  />
                </motion.div>

                {/* All-edge vignette */}
                <div aria-hidden style={{
                  position:      "absolute",
                  inset:          0,
                  background:    [
                    "linear-gradient(to right,  rgba(8,8,8,0.6) 0%, transparent 28%, transparent 72%, rgba(8,8,8,0.6) 100%)",
                    "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 22%, transparent 75%, rgba(8,8,8,0.7) 100%)",
                  ].join(", "),
                  zIndex:        1,
                  pointerEvents: "none",
                }} />

                {/* Label */}
                <div style={{ position: "absolute", bottom: "0.75rem", left: "50%", transform: "translateX(-50%)", zIndex: 2, pointerEvents: "none" }}>
                  <span style={{ fontFamily: "var(--font-content)", fontSize: "0.45rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                    Portals
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* MIDDLE-RIGHT card */}
          <div style={{ gridColumn: 3, gridRow: 2, alignSelf: "center" }}>
            <AchievementCard item={MID_R} delay={120} />
          </div>

          {/* BOTTOM-LEFT — empty */}
          <div style={{ gridColumn: 1, gridRow: 3 }} />

          {/* BOTTOM card — perfectly centered under portal */}
          <div style={{ gridColumn: 2, gridRow: 3, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%" }}>
              <AchievementCard item={BOTTOM} delay={180} />
            </div>
          </div>

          {/* BOTTOM-RIGHT — empty */}
          <div style={{ gridColumn: 3, gridRow: 3 }} />
        </div>

        {/* ── Mobile fallback — simple stacked list ──────────────────── */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {ACHIEVEMENTS.map((item, index) => (
            <AchievementCard key={item.title} item={item} delay={index * 60} />
          ))}
        </div>

      </Container>
    </section>
  );
}

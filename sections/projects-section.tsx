"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import anime from "animejs";
import { Container } from "@/components/container";
import { ProjectGridCard } from "@/components/project-grid-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { useSmoothScroll } from "@/components/smooth-scroll-provider";

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────────────────────────────────────
type ProjectData = {
  title: string;
  category: string;
  metric: string;
  overview?: string;
  bullets: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  deployment?: string;
};

const PROJECTS: ProjectData[] = [
  {
    title: "CLD Sarcopenia Healthcare Chatbot",
    category: "Healthcare AI",
    metric: "Healthcare AI",
    overview:
      "Full-stack multilingual healthcare education chatbot for Chronic Liver Disease (CLD) and sarcopenia — built for real-world hospital deployment.",
    bullets: [
      "Built using React, Vite, FastAPI, and Supabase PostgreSQL",
      "Developed secure hospital-admin access with JWT authentication and subscription-based access control",
      "Implemented protected report APIs and admin-only report viewing and downloading",
      "Created end-to-end patient learning workflow: intake forms, pre-test / post-test, topic-based modules, chatbot Q&A, and automated patient report generation",
      "Integrated AI-powered chatbot with retrieval-based content support",
      "Added multilingual learning content, voice/audio handling, and educational media support",
      "Designed responsive hospital-friendly frontend with lock/login flow, admin dashboard, learning pages, PDF report download, and Anime.js micro-interactions",
    ],
    techStack: ["React", "Vite", "FastAPI", "LangGraph", "Supabase", "PostgreSQL", "JWT", "Anime.js"],
    githubUrl: "https://github.com/nitinsk0920/CLD_Sarcopenia_chatbot.git",
    deployment: "Successfully deployed for real-world hospital usage.",
  },
  {
    title: "Oral Cancer Classification & Clinical Decision Support",
    category: "Vision & AI",
    metric: "Vision & AI",
    overview:
      "A deep learning screening pipeline for classifying oral cancer imagery with explainable AI and clinical decision support.",
    bullets: [
      "Built a 12K-image 4-class dataset from multiple sources with augmentation and stratified splitting",
      "Fine-tuned DenseNet169 using 2-phase transfer learning — achieving 94-95% accuracy",
      "Integrated Grad-CAM for explainable lesion localization",
      "Developed LangGraph + FastAPI pipeline with Streamlit UI for prediction, risk scoring, and report generation",
    ],
    techStack: ["PyTorch", "FastAPI", "LangGraph", "Streamlit"],
  },
  {
    title: "CoDe-DuINo - AI Arduino Development Assistant",
    category: "AI + Hardware",
    metric: "AI + Hardware",
    overview:
      "LLM-powered Arduino development assistant that bridges intelligent assistant behavior with physical hardware control.",
    bullets: [
      "Built LLM-powered Arduino assistant using React, FastAPI, and LangGraph",
      "Automated workflows using arduino-cli for compile, upload, and library management",
      "Included serial monitoring, pin mapping dashboard, and real-time logs",
      "Designed chatbot interface with voice input and modular onboarding UI",
      "Improved DX using streamlined component architecture and development flow",
    ],
    techStack: ["React", "FastAPI", "LangGraph", "Arduino CLI"],
    githubUrl: "https://github.com/nitinsk0920/CODE_DUINO.git",
    deployment: "Successfully deployed.",
  },
  {
    title: "PDF RAG Chatbot",
    category: "Document Q&A",
    metric: "Document Q&A",
    overview:
      "Document-aware chatbot that ingests PDFs and answers questions from retrieved source context in real time.",
    bullets: [
      "Built RAG-based chatbot for semantic PDF question answering",
      "Used embeddings + FAISS retrieval pipelines for context-aware responses",
      "Integrated LangChain + Hugging Face LLM for grounded answer generation",
      "Implemented chunking strategy and context-aware retrieval",
      "Developed Streamlit UI for real-time document interaction",
    ],
    techStack: ["LangChain", "FAISS", "Hugging Face", "Streamlit"],
    githubUrl: "https://github.com/nitinsk0920/RAG-PDF-Reader.git",
  },
  {
    title: "Text-to-Image Translation Using TextControlGAN",
    category: "Generative AI",
    metric: "Generative AI",
    overview:
      "GAN-based text-to-image generation exploring text-conditioned visual synthesis with iterative refinement.",
    bullets: [
      "Developed GAN-based text-to-image generation system using the CUB-200-2011 bird dataset",
      "Improved text-image alignment using regressor-enhanced architecture",
      "Achieved IS: 4.30 and FID: 57 on evaluation",
      "Implemented using PyTorch, h5py, and Matplotlib",
    ],
    techStack: ["PyTorch", "GAN", "NLP"],
  },
  {
    title: "Multimodal Product Price Prediction",
    category: "Multimodal AI",
    metric: "ML Hackathon",
    overview:
      "Multimodal regression model combining text and image embeddings for product price prediction — Amazon ML Hackathon.",
    bullets: [
      "Built multimodal regression model combining DistilBERT text embeddings with ResNet50 image embeddings",
      "Engineered and fused cross-modal features for unified prediction",
      "Trained and tuned XGBoost regressor on fused feature vectors",
      "Achieved R2 = 0.34, RMSE = 0.77, MAE = 0.61 on Amazon ML Hackathon dataset",
    ],
    techStack: ["Python", "Scikit-learn", "XGBoost", "NLP", "Computer Vision"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  lenis,
}: {
  project: ProjectData;
  onClose: () => void;
  lenis: import("lenis").default | null;
}) {
  const topLineRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      document.body.style.overflow = "";
      lenis?.start();
      onClose();
    }, 300);
  }, [onClose, lenis]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const t = setTimeout(() => setVisible(true), 10);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    anime({
      targets: ".modal-item",
      opacity: [0, 1],
      translateY: [14, 0],
      delay: anime.stagger(44, { start: 250 }),
      duration: 500,
      easing: "easeOutCubic",
    });
    anime({
      targets: topLineRef.current,
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: 120,
      easing: "easeOutExpo",
    });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [handleClose, lenis]);

  const btnGhost = {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: "0.55rem",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "transparent",
    color: "#FFF",
    padding: "0.58rem 1.3rem",
    fontSize: "0.67rem",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    fontFamily: "var(--font-content)",
    textDecoration: "none",
    transition: "all 0.18s",
    cursor: "pointer",
  };
  const btnMuted = {
    ...btnGhost,
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(148,163,184,0.85)",
  };

  return (
    <>
      <style>{`
        .modal-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(45,212,191,0.25) transparent;
        }
        .modal-scroll-area::-webkit-scrollbar { width: 3px; }
        .modal-scroll-area::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(45,212,191,0.3);
          border-radius: 99px;
        }
        .modal-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(45,212,191,0.55);
        }
      `}</style>

      {/* OVERLAY: fixed, covers full viewport, flexbox centers the panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={handleClose}
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(24px) saturate(0.55)",
            WebkitBackdropFilter: "blur(24px) saturate(0.55)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* PANEL: centered by flex parent, bounded by maxHeight */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(860px, 100%)",
            maxHeight: "calc(100vh - 48px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "rgba(4,4,6,0.97)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 48px 110px rgba(0,0,0,0.96), 0 20px 55px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.95)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Scan line */}
          <div
            ref={topLineRef}
            style={{
              flexShrink: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 15%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.08) 85%, transparent 100%)",
              transformOrigin: "center",
              opacity: 0,
            }}
          />

          {/* Corner accents */}
          {[
            { top: 0,    left: 0,    t: 9,    l: 9,    r: null, b: null, op: 0.28 },
            { top: 0,    right: 0,   t: 9,    l: null, r: 9,    b: null, op: 0.28 },
            { bottom: 0, left: 0,    t: null, l: 9,    r: null, b: 9,    op: 0.11 },
            { bottom: 0, right: 0,   t: null, l: null, r: 9,    b: 9,    op: 0.11 },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: c.top ?? undefined,
                right: c.right ?? undefined,
                bottom: c.bottom ?? undefined,
                left: c.left ?? undefined,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <div style={{ position: "absolute", top: c.t ?? undefined, right: c.r ?? undefined, bottom: c.b ?? undefined, left: c.l ?? undefined, width: 18, height: 1, background: `rgba(255,255,255,${c.op})` }} />
              <div style={{ position: "absolute", top: c.t ?? undefined, right: c.r ?? undefined, bottom: c.b ?? undefined, left: c.l ?? undefined, width: 1, height: 18, background: `rgba(255,255,255,${c.op})` }} />
            </div>
          ))}

          {/* HEADER - flex-shrink: 0, never scrolls */}
          <div
            className="modal-item"
            style={{
              flexShrink: 0,
              padding: "clamp(1.4rem, 4vw, 2rem) clamp(1.4rem, 4vw, 2.2rem) 0",
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.25rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.55rem" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2DD4BF", display: "block", flexShrink: 0, boxShadow: "0 0 6px rgba(45,212,191,0.5)" }} />
                  <span style={{ fontFamily: "var(--font-content)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.34em", textTransform: "uppercase", color: "#2DD4BF" }}>
                    {project.category}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "#E2E8F0", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                style={{ flexShrink: 0, marginTop: "0.1rem", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(148,163,184,0.7)", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.18s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2DD4BF"; e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; e.currentTarget.style.background = "rgba(45,212,191,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(148,163,184,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "transparent"; }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg, rgba(45,212,191,0.2) 0%, rgba(255,255,255,0.05) 60%, transparent 100%)", margin: "1.2rem 0 0" }} />
          </div>

          {/* SCROLLABLE CONTENT - flex:1 + minHeight:0 is the critical fix */}
          <div
            className="modal-scroll-area"
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "clamp(1.2rem, 3.5vw, 1.8rem) clamp(1.4rem, 4vw, 2.2rem)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {project.overview && (
              <p
                className="modal-item"
                style={{ fontFamily: "var(--font-content)", fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)", lineHeight: 1.82, color: "#64748B", fontWeight: 400, marginBottom: "1.4rem", opacity: 0, letterSpacing: "0.01em" }}
              >
                {project.overview}
              </p>
            )}

            <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", padding: 0, margin: 0, listStyle: "none" }}>
              {project.bullets.map((bullet, i) => (
                <li key={i} className="modal-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", opacity: 0 }}>
                  <span style={{ flexShrink: 0, marginTop: "0.58rem", width: 5, height: 1, background: "#2DD4BF", display: "block", boxShadow: "0 0 4px rgba(45,212,191,0.4)" }} />
                  <span style={{ fontFamily: "var(--font-content)", fontSize: "clamp(0.8rem, 1.3vw, 0.875rem)", lineHeight: 1.78, color: "#94A3B8", fontWeight: 300 }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {project.deployment && (
              <div
                className="modal-item"
                style={{ marginTop: "1.5rem", border: "1px solid rgba(45,212,191,0.12)", background: "rgba(45,212,191,0.03)", padding: "0.82rem 1.05rem", display: "flex", alignItems: "center", gap: "0.82rem", opacity: 0 }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2DD4BF", flexShrink: 0, boxShadow: "0 0 7px rgba(45,212,191,0.5)" }} />
                <div>
                  <p style={{ fontFamily: "var(--font-content)", fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#2DD4BF", margin: 0, opacity: 0.7 }}>Deployment</p>
                  <p style={{ fontFamily: "var(--font-content)", fontSize: "0.85rem", color: "#E2E8F0", marginTop: "0.2rem", fontWeight: 400 }}>{project.deployment}</p>
                </div>
              </div>
            )}

            <div className="modal-item" style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 100%)", margin: "1.4rem 0", opacity: 0 }} />

            <div className="modal-item" style={{ opacity: 0 }}>
              <p style={{ fontFamily: "var(--font-content)", fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#64748B", marginBottom: "0.72rem" }}>Tech Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {project.techStack.map((tech) => (
                  <span key={tech} style={{ border: "1px solid rgba(45,212,191,0.15)", padding: "0.27rem 0.78rem", fontSize: "0.69rem", fontFamily: "var(--font-content)", color: "#64748B", fontWeight: 400, background: "rgba(45,212,191,0.03)", letterSpacing: "0.04em" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER - flex-shrink: 0, always visible */}
          {(project.githubUrl || project.liveUrl) && (
            <div
              className="modal-item"
              style={{
                flexShrink: 0,
                padding: "clamp(1rem, 3vw, 1.4rem) clamp(1.4rem, 4vw, 2.2rem)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.62rem",
                background: "rgba(4,4,6,0.97)",
                opacity: 0,
              }}
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnGhost}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnMuted}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#2DD4BF"; e.currentTarget.style.borderColor = "rgba(45,212,191,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(148,163,184,0.85)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  Live Demo
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { lenis } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const gridProjects   = PROJECTS.slice(0, 4);
  const bottomProjects = PROJECTS.slice(4);

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32">
        <Container>
          <ScrollReveal>
            <SectionHeader
              eyebrow="Featured Work"
              title="Projects"
              description="Healthcare AI, vision models, retrieval systems, embedded AI, generative experiments, and multimodal ML."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ScrollReveal threshold={0.12} className="relative min-h-[420px] lg:min-h-[560px] overflow-hidden">
              <div className="relative h-full min-h-[420px] w-full overflow-hidden lg:min-h-[560px]">
                <motion.div style={{ y: heroImgY }} className="absolute inset-0">
                  <Image
                    src="/assets/m2.jpg"
                    alt=""
                    fill
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center scale-110"
                  />
                </motion.div>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gridProjects.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 80}>
                  <ProjectGridCard
                    category={project.metric}
                    title={project.title}
                    tech={project.techStack.join(" · ")}
                    onSelect={() => setSelectedProject(project)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {bottomProjects.map((project) => (
              <ScrollReveal key={project.title}>
                <ProjectGridCard
                  category={project.metric}
                  title={project.title}
                  tech={project.techStack.join(" · ")}
                  onSelect={() => setSelectedProject(project)}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          lenis={lenis}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

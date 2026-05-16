"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";

const SKILLS_MARQUEE = [
  "Python",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "LLMs",
  "RAG",
  "Supabase",
  "PostgreSQL",
  "MCP",
  "Docker",
  "Streamlit",
  "PyTorch",
  "OpenCV",
  "Pandas",
  "NumPy",
  "SQL",
  "Git",
  "GitHub",
  "HTML",
  "CSS",
  "C",
  "C++",
];

const SKILL_COLUMNS = [
  {
    title: "AI & Concepts",
    items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "LLMs", "RAG"],
  },
  {
    title: "Tools & Frameworks",
    items: ["LangChain", "LangGraph", "FastAPI", "Supabase", "PostgreSQL", "MCP", "Docker", "Streamlit"],
  },
  {
    title: "LIBRARIES & TOOLS",
    items: ["PyTorch", "OpenCV", "Pandas", "NumPy"],
  },
  {
    title: "Programming",
    items: ["Python(OOPs, modular design)", "C", "C++", "SQL", "Git & GitHub"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS"],
  },
] as const;

type SkillMarqueeRowProps = {
  reverse?: boolean;
  duration: number;
  skills: string[];
};

function SkillMarqueeRow({ reverse = false, duration, skills }: SkillMarqueeRowProps) {
  const reduceMotion = useReducedMotion();
  const repeatedSkills = [...skills, ...skills];

  return (
    <motion.div
      className="flex min-w-max items-center gap-10 whitespace-nowrap sm:gap-14"
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={reduceMotion ? undefined : { x: reverse ? "0%" : "-50%" }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{ willChange: reduceMotion ? "auto" : "transform" }}
    >
      {repeatedSkills.map((skill, i) => (
        <span
          key={`${skill}-${i}`}
          className="shrink-0 select-none font-heading text-[clamp(4rem,7vw,6.75rem)] font-light leading-none tracking-normal text-white/[0.075]"
        >
          {skill}
        </span>
      ))}
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Skills
          </h2>
        </ScrollReveal>
      </Container>

      <div aria-hidden className="relative my-8 h-44 overflow-hidden sm:my-10 sm:h-52 lg:h-56">
        <div
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
          }}
        >
          <div className="absolute left-0 top-4 w-full sm:top-2">
            <SkillMarqueeRow skills={SKILLS_MARQUEE} duration={46} />
          </div>
          <div className="absolute bottom-4 left-0 w-full sm:bottom-2">
            <SkillMarqueeRow skills={[...SKILLS_MARQUEE].reverse()} reverse duration={52} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_42%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <Container>
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {SKILL_COLUMNS.map((column) => (
            <motion.div
              key={column.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-content)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {column.title}
              </h3>
              <div
                style={{
                  marginTop: "1rem",
                  height: 1,
                  background: "rgba(255,255,255,0.18)",
                }}
              />
              <ul style={{ marginTop: "1.25rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {column.items.map((item) => (
                  <motion.li
                    key={item}
                    style={{
                      fontFamily: "var(--font-content)",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      color: "#94A3B8",
                    }}
                    whileHover={{ x: 6, color: "#f5f5f5" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

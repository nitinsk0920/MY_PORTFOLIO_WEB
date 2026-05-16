"use client";

import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";

const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    field: "Electrical & Electronics Engineering",
    institution: "KLE Technological University, Hubballi",
    period: "2022 – 2026",
    grade: "CGPA: 7.95",
    focus: ["Artificial Intelligence", "Machine Learning", "Electronics", "Programming"],
    highlight: "Pursuing B.E. in EEE with a strong focus on AI/ML, building AI applications and systems as a core part of the academic and freelance journey.",
  },
  {
    degree: "Pre-University Education (PUC)",
    field: "Science — PCMB",
    institution: "Prism PU Science College, Dharwad",
    period: "2020 – 2022",
    grade: "Overall: 89.16% · PCMB: 92.5%",
    focus: ["Physics", "Chemistry", "Mathematics", "Biology"],
    highlight: "Strong foundation in science and mathematics, building the analytical base that drives the AI/ML exploration.",
  },
  {
    degree: "Secondary School (SSLC)",
    field: "General Education",
    institution: "Shanti Sadan High School, Dharwad",
    period: "2020",
    grade: "Score: 89.92%",
    focus: ["Mathematics", "Science", "English"],
    highlight: "Consistent academic performance with strong fundamentals in mathematics and sciences.",
  },
];

const CERTIFICATIONS = [
  {
    title: "Natural Language Processing Specialization",
    org: "DeepLearning.AI · Coursera",
    certLink: "https://coursera.org/share/2e94b0a3326fd02d761f81c76988889d",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Education"
            title="Education & Learning"
            description="Built through engineering education, online learning, curiosity, and hands-on experimentation with AI"
            align="center"
          />
        </ScrollReveal>

        <div className="mt-14 space-y-6">
          {EDUCATION.map((edu, index) => (
            <ScrollReveal key={edu.field} delay={index * 90}>
              <article className="border border-white/10 bg-black/30 p-7 sm:p-9">
                <div className="mb-5 h-px w-16 bg-white/25" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">{edu.degree}</p>
                    <h3 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
                      {edu.field}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{edu.institution}</p>
                    <p className="mt-1 text-xs text-muted/70">{edu.grade}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted shrink-0">
                    {edu.period}
                  </span>
                </div>
                <div className="mt-5 border border-white/10 p-4">
                  <p className="text-xs font-medium uppercase text-muted">Highlight</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/85" style={{ fontWeight: 300 }}>
                    {edu.highlight}
                  </p>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {edu.focus.map((f) => (
                    <li key={f} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications */}
        <ScrollReveal className="mt-12">
          <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-foreground mb-6">
            Certifications
          </h3>
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <article key={cert.title} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-white/10 bg-black/30 px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{cert.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{cert.org}</p>
                </div>
                {cert.certLink && (
                  <a
                    href={cert.certLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-foreground transition hover:border-white/50 hover:bg-white/5"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Certificate
                  </a>
                )}
              </article>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

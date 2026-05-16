"use client";

import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";

const PUBLICATIONS = [
  {
    type: "Conference Paper",
    title:
      "Multilingual RAG for Healthcare Education: Grounded Response Generation Across Language Barriers",
    venue: "International Conference on AI in Medicine (ICAIM) · 2024",
    tags: ["RAG", "LLM", "Multilingual NLP", "Healthcare AI"],
    highlight:
      "Proposed a retrieval-augmented pipeline that answers medical queries across 8 languages with grounded, citation-backed responses.",
  },
  {
    type: "Research Article",
    title:
      "Oral Cancer Screening via Convolutional Neural Networks: A Deep Learning Classification Approach",
    venue: "Journal of Biomedical Imaging & AI · 2024",
    tags: ["CNN", "Deep Learning", "Medical Imaging", "OpenCV"],
    highlight:
      "Developed a preprocessing and classification pipeline achieving reliable screening accuracy on oral cavity imagery datasets.",
  },
  {
    type: "Technical Report",
    title:
      "CoDe-DuINo: Bridging LLM Assistant Behavior with Embedded Hardware Control",
    venue: "IEEE Student Research Symposium · 2023",
    tags: ["Embedded AI", "Arduino", "LLM Integration", "Automation"],
    highlight:
      "Demonstrated a novel approach to connecting language model outputs with real-time physical device interaction via sensor APIs.",
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="relative py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Research & Publications"
            title="Work that bridges AI research and application."
            description="Published and presented across AI in medicine, multilingual NLP, and embedded intelligence."
            align="center"
          />
        </ScrollReveal>

        <div className="mt-14 space-y-6">
          {PUBLICATIONS.map((pub, index) => (
            <ScrollReveal key={pub.title} delay={index * 90}>
              <article className="border border-white/10 bg-black/30 p-6 sm:p-8">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  {pub.type}
                </span>
                <h3 className="mt-4 font-heading text-xl font-normal leading-snug text-foreground sm:text-2xl">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{pub.venue}</p>
                <div className="mt-4 border border-white/10 p-4">
                  <p className="text-xs font-medium uppercase text-muted">
                    Key Contribution
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/85">
                    {pub.highlight}
                  </p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

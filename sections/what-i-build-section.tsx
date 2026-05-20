"use client";

import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";

const WHAT_I_DO = [
  {
    title: "AI Application Planning",
    description: "Planning intelligent applications, workflows, and AI-powered systems that are practical and scalable.",
    items: ["System architecture", "AI workflow design", "Application planning"],
  },
  {
    title: "LLM & RAG Workflows",
    description: "Working with LangChain, LangGraph, embeddings, and vector databases to build context-aware AI systems.",
    items: ["LangChain", "LangGraph", "Embeddings", "Vector databases"],
  },
  {
    title: "AI-Assisted Development",
    description: "Building AI-powered applications using modern AI coding tools to bring ideas into functional reality.",
    items: ["FastAPI backends", "AI coding tools", "Full-stack AI apps"],
  },
  {
    title: "Frontend Experience Design",
    description: "Creating cinematic and immersive web experiences using modern AI-assisted design workflows.",
    items: ["HTML", "CSS", "Cinematic UI", "AI-assisted design"],
  },
];

export function WhatIBuildSection() {
  return (
    <section id="what-i-build" className="relative py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow="What I Do"
            title="Intelligent systems shaped for real-world use."
            description="Focus areas where AI knowledge, application design, and modern tooling come together."
            align="center"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_I_DO.map((area, index) => (
            <ScrollReveal key={area.title} delay={index * 80}>
              <article className="border border-white/10 bg-black/30 p-5 sm:p-6 h-full">
                <div className="mb-5 h-px w-12 bg-white/25" />
                <h3 className="font-heading text-xl font-normal text-foreground leading-snug">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted" style={{ fontWeight: 300 }}>
                  {area.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {area.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                      {item}
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

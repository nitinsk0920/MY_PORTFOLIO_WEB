"use client";

import Image from "next/image";
import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollScaleImage } from "@/components/scroll-scale-section";
import { SectionHeader } from "@/components/section-header";

const INTERESTS = ["AI systems", "LLMs & RAG workflows", "NLP & Computer Vision", "AI-powered applications"];
const HOBBIES = ["Sketching", "Table Tennis", "Sci-Fi Movies", "Craft & Art", "Cooking"];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid min-h-[min(80vh,720px)] items-stretch gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center py-12 pr-0 lg:py-16 lg:pr-14">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Who I Am"
                title="About Me"
              />
            </ScrollReveal>

            <ScrollReveal delay={80} className="mt-6">
              <p className="text-sm leading-7 text-muted" style={{ fontWeight: 300 }}>
                I am an AI enthusiast and freelance developer passionate about building intelligent applications and modern digital experiences.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted" style={{ fontWeight: 300 }}>
                I enjoy understanding AI concepts theoretically and planning how intelligent applications, workflows, and systems should work. I use modern AI development tools to transform ideas into functional real-world applications.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted" style={{ fontWeight: 300 }}>
                Currently exploring and building projects in healthcare AI, AI assistants, multimodal systems, and immersive web experiences.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted" style={{ fontWeight: 300 }}>
                Along with AI applications, I also design modern cinematic websites and immersive user experiences using AI-powered development tools.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140} className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-foreground mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180} className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-foreground mb-3">Personal</p>
              <div className="flex flex-wrap gap-2">
                {HOBBIES.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted/70">
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Portrait */}
          <ScrollScaleImage mode="in" className="relative min-h-[360px] lg:min-h-[min(80vh,720px)]">
            <div className="relative h-full min-h-[360px] w-full lg:min-h-[min(80vh,720px)]">
              <Image
                src="/assets/m4.jpg"
                alt="Nitin S Katagihallimath"
                fill
                loading="lazy"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent lg:from-black/55" />
            </div>
          </ScrollScaleImage>
        </div>
      </Container>
    </section>
  );
}

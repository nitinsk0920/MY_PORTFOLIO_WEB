"use client";

import { Container } from "@/components/container";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import SocialFlipButton from "@/components/ui/social-flip-button";
import type { ReactNode } from "react";

type SocialButton = {
  label: string;
  href: string;
  icon: ReactNode;
};

type SocialCardProps = {
  title: string;
  name: string;
  pitch: string;
  icon: ReactNode;
  buttons: SocialButton[];
};

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.42 11.42 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.28ZM5.32 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="14" x="3" y="5" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.05 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 3 12 0 4 6-10 12L2 9l4-6Z" />
      <path d="M2 9h20" />
      <path d="m9 3-2 6 5 12 5-12-2-6" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
      <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
    </svg>
  );
}

function SocialCard({ title, name, pitch, icon, buttons }: SocialCardProps) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-[1px] shadow-[0_0_48px_rgba(255,255,255,0.035)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_0_70px_rgba(255,255,255,0.085)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_44%)]" />
      </div>
      <div className="pointer-events-none absolute inset-px rounded-[23px] bg-[linear-gradient(135deg,rgba(255,255,255,0.075),transparent_34%,rgba(255,255,255,0.035))]" />
      <div className="relative flex min-h-[330px] flex-col justify-between rounded-[23px] bg-black/70 p-7 sm:p-8">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/80 shadow-[0_0_24px_rgba(255,255,255,0.055)] transition duration-500 group-hover:border-white/25 group-hover:text-white">
              {icon}
            </div>
            <div className="ml-5 h-px flex-1 bg-gradient-to-r from-white/25 via-white/[0.08] to-transparent" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted">
            {title}
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {name}
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            {pitch}
          </p>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {buttons.map((button) => (
            <a
              key={button.label}
              href={button.href}
              target={button.href.startsWith("http") ? "_blank" : "_self"}
              rel={button.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (button.href.startsWith("mailto:") || button.href.startsWith("tel:")) {
                  e.preventDefault();
                  window.location.href = button.href;
                }
              }}
              className="inline-flex flex-col items-center justify-center gap-1 rounded-full border border-white/[0.12] bg-white/[0.035] px-4 py-3 text-sm font-medium text-foreground transition duration-300 hover:border-white/35 hover:bg-white/[0.075] hover:shadow-[0_0_28px_rgba(255,255,255,0.08)]"
            >
              <span className="flex items-center gap-2">
                <span className="text-white/75">{button.icon}</span>
                {button.label}
              </span>
              {(button.href.startsWith("mailto:") || button.href.startsWith("tel:")) && (
                <span className="text-[10px] tracking-wide text-white/40 font-normal">
                  {button.href.replace("mailto:", "").replace("tel:", "")}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const SOCIAL_CARDS: SocialCardProps[] = [
  {
    title: "Connect",
    name: "Nitin S Katagihallimath",
    pitch:
      "Explore my projects, AI experiments, and connect for collaborations or freelance opportunities.",
    icon: <DiamondIcon />,
    buttons: [
      {
        label: "GitHub",
        href: "https://github.com/nitinsk0920",
        icon: <GithubIcon />,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nitin-s-katagihallimath-692aa826a",
        icon: <LinkedinIcon />,
      },
    ],
  },
  {
    title: "Contact",
    name: "Available for Work",
    pitch:
      "Open to freelance AI application development, chatbot systems, and creative web experiences.",
    icon: <SignalIcon />,
    buttons: [
      {
        label: "Email",
        href: "mailto:nitinsk0920@gmail.com",
        icon: <MailIcon />,
      },
      {
        label: "Phone",
        href: "tel:+918073743139",
        icon: <PhoneIcon />,
      },
    ],
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col items-center">
            <SocialFlipButton />
            <p className="mt-6 text-center text-sm leading-7 text-muted max-w-xl">
              Open to freelance AI projects, collaborations, and new opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
          {SOCIAL_CARDS.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 120}>
              <SocialCard {...card} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

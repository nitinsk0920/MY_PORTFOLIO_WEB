"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import anime from "animejs";

export function MainBackground() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particleLayer = particlesRef.current;
    if (!particleLayer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const particleCount = 55;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "absolute rounded-full bg-white";
      p.style.opacity = "0";

      // Tiny star-like particles
      const size = Math.random() * 1.8 + 0.5;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;

      // Random positions across entire viewport
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;

      particleLayer.appendChild(p);
      particles.push(p);
    }

    // Slow twinkling particle animation
    const anim = anime({
      targets: particles,
      opacity: [
        { value: (() => Math.random() * 0.12 + 0.03) as any, duration: (() => Math.random() * 3000 + 2000) as any },
        { value: 0, duration: (() => Math.random() * 3000 + 2000) as any },
      ],
      translateY: (() => [0, -(Math.random() * 60 + 20)]) as any,
      translateX: (() => [0, (Math.random() * 30 - 15)]) as any,
      duration: (() => Math.random() * 12000 + 18000) as any,
      easing: "linear",
      loop: true,
      delay: anime.stagger(150, { start: 300 }),
    });

    return () => {
      anim.pause();
      anime.remove(particles);
      if (particleLayer) {
        particleLayer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* Base starfield image — back-2.jpg */}
      <div className="absolute inset-0">
        <Image
          src="/assets/back-2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60 brightness-[0.7]"
          style={{ filter: "brightness(0.7)" }}
        />
      </div>

      {/* Dark overlay gradient — readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_10%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />

      {/* Atmospheric fog layer */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 30% 60%, rgba(255,255,255,0.08), transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.05), transparent 45%)",
          animation: "fog-drift 20s ease-in-out infinite",
        }}
      />

      {/* Floating particles/stars layer */}
      <div ref={particlesRef} className="absolute inset-0 mix-blend-screen" />
    </div>
  );
}

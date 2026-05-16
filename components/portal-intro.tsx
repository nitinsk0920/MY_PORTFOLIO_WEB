"use client";

import anime from "animejs";
import dynamic from "next/dynamic";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

const PORTAL_SCENE =
  "https://prod.spline.design/MbzgeL1upm5JwlT2/scene.splinecode";

const SplinePortalScene = dynamic(
  () =>
    import("@/components/spline-portal-scene").then(
      (module) => module.SplinePortalScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="h-24 w-24 rounded-full border border-gold/25 bg-aura shadow-soft-gold" />
      </div>
    ),
  },
);

export function PortalIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(hoverTimerRef.current);
    };
  }, [isVisible]);

  function enterPortfolio() {
    if (
      isEntering ||
      !portalRef.current ||
      !tiltRef.current ||
      !sceneRef.current ||
      !veilRef.current
    ) {
      return;
    }

    window.clearTimeout(hoverTimerRef.current);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setIsVisible(false);
      document.body.style.overflow = "";
      return;
    }

    setIsEntering(true);
    tiltRef.current.style.transition = "transform 1300ms ease";
    tiltRef.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1.04)";

    anime
      .timeline({
        easing: "easeInOutSine",
      })
      .add({
        targets: sceneRef.current,
        scale: [1, 1.92],
        opacity: [1, 0.08],
        duration: 3200,
      })
      .add(
        {
          targets: veilRef.current,
          scale: [0.16, 12],
          opacity: [0, 0.96],
          duration: 3000,
        },
        "-=3000",
      )
      .add(
        {
          targets: portalRef.current,
          opacity: [1, 0],
          duration: 900,
        },
        "-=620",
      )
      .finished.then(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }

  function startPortalHover() {
    if (isEntering) {
      return;
    }

    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(enterPortfolio, 1400);
  }

  function cancelPortalHover() {
    if (isEntering) {
      return;
    }

    window.clearTimeout(hoverTimerRef.current);

    if (tiltRef.current) {
      tiltRef.current.style.transition = "transform 700ms ease";
      tiltRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  }

  function rotatePortal(event: PointerEvent<HTMLDivElement>) {
    if (isEntering || !tiltRef.current) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const rotateX = y * -7;
    const rotateY = x * 9;

    tiltRef.current.style.transition = "transform 180ms ease-out";
    tiltRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={portalRef}
      className="fixed inset-0 z-50 overflow-hidden bg-background"
      onPointerEnter={startPortalHover}
      onPointerLeave={cancelPortalHover}
      onPointerMove={rotatePortal}
    >
      <div
        ref={tiltRef}
        className="absolute inset-0 cursor-pointer will-change-transform"
      >
        <div ref={sceneRef} className="absolute inset-0 will-change-transform">
          <SplinePortalScene scene={PORTAL_SCENE} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_34%,rgb(var(--background)/0.48)_68%,rgb(var(--background))_100%)]" />
      <div
        ref={veilRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--gold)/0.3),rgb(var(--violet)/0.24)_42%,rgb(var(--background))_72%)] opacity-0 blur-xl will-change-transform"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center px-6">
        <button
          type="button"
          className="pointer-events-auto rounded-full border border-gold/35 bg-background/45 px-6 py-3 text-sm font-medium text-gold-soft shadow-soft-gold backdrop-blur-xl transition duration-300 hover:border-gold/65 hover:bg-gold/10 hover:shadow-[0_0_42px_rgb(var(--gold)/0.2)] focus:outline-none focus:ring-2 focus:ring-gold/45"
          onClick={(event) => {
            event.stopPropagation();
            enterPortfolio();
          }}
          onFocus={enterPortfolio}
        >
          Enter Portfolio
        </button>
      </div>
    </div>
  );
}

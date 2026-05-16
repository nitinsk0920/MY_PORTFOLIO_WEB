"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-16 w-16 animate-pulse rounded-full border border-white/10 bg-white/[0.03]" />
      </div>
    ),
  },
);

export function SplineHeroBackground() {
  const [shouldRender, setShouldRender] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!reducedMotion && !isMobile) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-30 overflow-hidden"
      style={{ height: "100%", minHeight: "100vh" }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: loaded ? 0.22 : 0 }}
      >
        <SplinePortalScene scene={PORTAL_SCENE} onLoad={() => setLoaded(true)} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.75)_70%)]" />
    </div>
  );
}

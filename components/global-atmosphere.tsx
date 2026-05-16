"use client";

import dynamic from "next/dynamic";

// Dynamically import so Three.js is never SSR'd
const StarfieldScene = dynamic(
  () =>
    import("@/components/starfield-scene").then((m) => ({
      default: m.StarfieldScene,
    })),
  { ssr: false }
);

export function GlobalAtmosphere() {
  return <StarfieldScene />;
}

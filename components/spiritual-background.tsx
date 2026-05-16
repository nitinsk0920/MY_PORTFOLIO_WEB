"use client";

import CosmicRift from "@/components/forgeui/cosmicrift";

export function SpiritualBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020106]"
    >
      <CosmicRift
        height="100vh"
        density={1.2}
        speed={1}
        colorBackground="#020106"
        colorStars="#ffffff"
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgb(168_117_255/0.12),transparent_34%),linear-gradient(to_bottom,rgb(2_1_6/0.18),rgb(2_1_6/0.72))]" />
    </div>
  );
}

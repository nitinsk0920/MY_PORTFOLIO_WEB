"use client";

import Spline from "@splinetool/react-spline/next";
import type { Application } from "@splinetool/runtime";

type SplinePortalSceneProps = {
  scene: string;
  onLoad?: (app: Application) => void;
};

export function SplinePortalScene({ scene, onLoad }: SplinePortalSceneProps) {
  return <Spline scene={scene} onLoad={onLoad} />;
}

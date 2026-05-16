"use client";

import anime from "animejs";
import { useEffect, useRef, useState } from "react";

type CinematicIntroProps = {
  children: React.ReactNode;
};

const INTRO_VIDEO_SRC = "/animations/one_peice2.mp4";
// Video is 9:16 portrait (1440x2560)
const VIDEO_ASPECT_W = 9;
const VIDEO_ASPECT_H = 16;
const FADE_AT_SECONDS = 4.3;

export function CinematicIntro({ children }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  const containerRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const vignetteRef   = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const fallbackRef   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow            = "hidden";
    document.documentElement.style.overflow = "hidden";
    // Also kill any grey body/html background bleeding through
    document.body.style.background            = "#000000";
    document.documentElement.style.background = "#000000";

    if (contentRef.current) {
      contentRef.current.style.opacity    = "0";
      contentRef.current.style.transform  = "scale(0.982)";
      contentRef.current.style.filter     = "blur(8px)";
      contentRef.current.style.visibility = "hidden";
    }

    const video = videoRef.current;
    if (!video) return;

    // Reveal immediately — no event gating
    video.style.opacity = "1";

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    fallbackRef.current = setTimeout(startTransition, 6500);

    return () => {
      clearTimeout(fallbackRef.current);
      document.body.style.overflow            = "";
      document.documentElement.style.overflow = "";
      document.body.style.background            = "";
      document.documentElement.style.background = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
    if (v.currentTime >= FADE_AT_SECONDS || v.currentTime >= v.duration - 0.25) {
      startTransition();
    }
  }

  function startTransition() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    clearTimeout(fallbackRef.current);

    const container = containerRef.current;
    const content   = contentRef.current;
    const vignette  = vignetteRef.current;
    if (!container || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      content.style.opacity    = "1";
      content.style.transform  = "scale(1)";
      content.style.filter     = "blur(0px)";
      content.style.visibility = "visible";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setIsVisible(false);
      return;
    }

    container.style.pointerEvents = "none";
    content.style.visibility = "visible";

    anime.timeline({ easing: "easeInOutQuart" })
      .add({
        targets:  vignette ?? [],
        opacity:  [0, 1],
        duration: 800,
        easing:   "easeInCubic",
      })
      .add({
        targets:  container,
        opacity:  [1, 0],
        duration: 1200,
        easing:   "easeInQuad",
      }, "-=500")
      .add({
        targets:  content,
        opacity:  [0, 1],
        scale:    [0.982, 1],
        duration: 2000,
        easing:   "easeOutExpo",
      }, "-=900")
      .finished.then(() => {
        if (content) {
          content.style.transition = "filter 0.8s ease";
          content.style.filter     = "blur(0px)";
        }
        setTimeout(() => {
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          setIsVisible(false);
        }, 820);
      });
  }

  return (
    <>
      {/* Portfolio beneath intro */}
      <div
        ref={contentRef}
        className="relative z-0 min-h-screen"
        style={{ willChange: "transform, opacity, filter" }}
      >
        {children}
      </div>

      {/* ── Cinematic intro ─────────────────────────────────────────── */}
      {isVisible && (
        <div
          ref={containerRef}
          style={{
            position:        "fixed",
            inset:            0,
            zIndex:           100,
            // Pure black — this IS the left/right bar colour
            background:      "#000000",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            overflow:        "hidden",
          }}
        >
          {/*
           * SIZING WRAPPER — matches the video's exact 9:16 aspect ratio.
           *
           * Strategy: compute the largest 9:16 rectangle that fits inside
           * the current viewport using CSS aspect-ratio + clamp.
           * The video fills this wrapper 100%×100% with no leftover space,
           * so the browser has ZERO area to paint with its UA grey.
           * The #000000 container shows through on left/right instead.
           *
           * On a 1920×1080 desktop:
           *   max height = 100vh = 1080px → width = 1080*(9/16) = 607px
           * On a 390×844 mobile (portrait):
           *   max width = 100vw = 390px → height = 390*(16/9) = 693px ≤ 844 ✓
           */}
          <div
            style={{
              position:    "relative",
              zIndex:       1,
              // Aspect-ratio constrains the box to exact 9:16
              aspectRatio: `${VIDEO_ASPECT_W} / ${VIDEO_ASPECT_H}`,
              // Never overflow viewport in either axis
              maxWidth:    "100vw",
              maxHeight:   "100vh",
              // Fill as tall as possible (portrait-first sizing)
              height:      "100vh",
              width:       "auto",
              // Absolutely no background — parent's #000000 shows through
              background:  "transparent",
              overflow:    "hidden",
            }}
          >
            <video
              ref={videoRef}
              style={{
                display:   "block",
                width:     "100%",
                height:    "100%",
                // object-fit:fill here is intentional — the wrapper IS
                // already the correct aspect ratio, so fill = no distortion,
                // and critically: no browser letterbox grey bars
                objectFit: "fill",
                opacity:    0,   // set to 1 imperatively in useEffect
                filter:    "none",
                // Belt-and-suspenders: match parent bg in case UA still leaks
                background: "#000000",
              }}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={startTransition}
              onError={() => startTransition()}
            >
              <source src={INTRO_VIDEO_SRC} type="video/mp4" />
            </video>
          </div>

          {/*
           * VIGNETTE — opacity:0 during playback.
           * Blooms to solid black on exit transition only.
           */}
          <div
            ref={vignetteRef}
            style={{
              position:      "absolute",
              inset:          0,
              pointerEvents: "none",
              zIndex:          2,
              opacity:         0,
              background:     "#000000",
            }}
          />
        </div>
      )}
    </>
  );
}

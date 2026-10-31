"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover / fine pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let rafId: number;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dot) dot.style.opacity = "1";
        if (ring) ring.style.opacity = "0.85";
        if (spotlight) spotlight.style.opacity = "1";
      }

      // Direct GPU transform update for crisp center dot - zero latency
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Update spotlight position directly without re-rendering React tree
      if (spotlight) {
        spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Smooth RAF loop for the trailing ring only
    const render = () => {
      // High responsiveness factor (0.28 for snappy yet fluid feel)
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    // Hover state using mouseover/mouseout (only fires when entering/leaving elements, NOT every pixel)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !ring) return;

      const interactive = target.closest("a, button, input, textarea, select, [role='button'], [data-cursor-hover]");
      if (interactive) {
        ring.classList.add("cursor-hovered");
      } else {
        ring.classList.remove("cursor-hovered");
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
      if (spotlight) spotlight.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "0.85";
      if (spotlight) spotlight.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Hardware-accelerated dynamic spotlight following cursor */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 h-[650px] w-[650px] rounded-full opacity-0 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(165, 56, 96, 0.05) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 70%)",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Central crisp dot: instantaneous 1:1 hardware tracked */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10001] h-1.5 w-1.5 rounded-full bg-white opacity-0 will-change-transform"
        style={{
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Smooth trailing interactive ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-7 w-7 rounded-full border border-white/40 opacity-0 will-change-transform transition-[width,height,border-color,background-color] duration-150 ease-out"
        style={{
          transition: "opacity 0.2s ease, width 0.18s ease-out, height 0.18s ease-out, border-color 0.18s ease, background-color 0.18s ease",
        }}
      />

      <style jsx global>{`
        .cursor-hovered {
          width: 44px !important;
          height: 44px !important;
          border-color: rgba(165, 56, 96, 0.85) !important;
          background-color: rgba(165, 56, 96, 0.15) !important;
          box-shadow: 0 0 20px rgba(165, 56, 96, 0.35);
          backdrop-filter: invert(0.05);
        }
      `}</style>
    </>
  );
}

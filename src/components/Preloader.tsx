"use client";

import { useEffect, useState } from "react";

const BOOT_LOGS = [
  "INITIALIZING DIGITAL PORTFOLIO...",
  "COMPILING SYSTEM ARCHITECTURE...",
  "CONNECTING REPOSITORIES & DATA...",
  "CALIBRATING INTERACTIVE SHADERS...",
  "SYSTEM DEPLOYED // READY",
];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Total duration ~2.2 seconds: intentional, smooth, premium pacing
    const startTime = performance.now();
    const duration = 2200; // ms

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / duration);

      // Non-linear cubic-bezier easeOut: snappy start, smooth settle at the end
      const ease = 1 - Math.pow(1 - rawT, 3);
      const currentProgress = Math.min(100, Math.floor(ease * 100));

      setProgress(currentProgress);

      // Update log based on progress milestones
      if (currentProgress < 25) setLogIndex(0);
      else if (currentProgress < 50) setLogIndex(1);
      else if (currentProgress < 75) setLogIndex(2);
      else if (currentProgress < 95) setLogIndex(3);
      else setLogIndex(4);

      if (rawT < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setLogIndex(4);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 400);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[10001] flex flex-col justify-between bg-[#080808] p-8 md:p-16 transition-opacity duration-700 select-none ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Meta Header */}
      <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#A0A0A0] uppercase font-mono">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
          SHARMAINE A. JACOB
        </span>
        <span className="text-[rgb(194,76,120)] font-semibold">SYSTEM DEV // 2026</span>
      </div>

      {/* Center Cinematic Statement */}
      <div className="my-auto max-w-4xl space-y-4">
        <div className="flex items-center gap-2.5 font-mono text-xs text-[rgb(194,76,120)] tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(165,56,96)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(165,56,96)]" />
          </span>
          <span className="font-semibold">{BOOT_LOGS[logIndex]}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-none">
          CRAFTING IDEAS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[rgb(194,76,120)]">
            INTO SYSTEMS.
          </span>
        </h1>

        <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-lg leading-relaxed pt-2">
          Undergraduate System Development Specialization • PHINMA Cagayan de Oro College
        </p>
      </div>

      {/* Bottom Progress Metrics */}
      <div className="space-y-4 font-mono">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-neutral-400 tracking-wider block">
              CAGAYAN DE ORO CITY, PH • VERIFIED CODEBASES
            </span>
            <span className="text-[10px] text-[rgb(194,76,120)] uppercase tracking-widest hidden sm:inline-block">
              {progress < 100 ? "BOOT_SEQUENCE_ACTIVE" : "ENVIRONMENT_RESOLVED"}
            </span>
          </div>

          <span className="text-3xl md:text-5xl font-light text-white tabular-nums tracking-tighter">
            <span className="text-[rgb(194,76,120)] font-bold">{progress}</span>%
          </span>
        </div>

        {/* Progress bar with glow */}
        <div className="h-[2px] w-full bg-[#202020] overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-white via-[rgb(194,76,120)] to-[rgb(165,56,96)] shadow-[0_0_16px_rgba(165,56,96,0.9)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + increment);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[10001] flex flex-col justify-between bg-[#080808] p-8 md:p-16 transition-opacity duration-700 select-none ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#A0A0A0] uppercase font-mono">
        <span>SHARMAINE A. JACOB</span>
        <span className="text-[rgb(165,56,96)] font-semibold">SYSTEM DEV // 2026</span>
      </div>

      <div className="my-auto max-w-4xl">
        <p className="text-xs font-mono text-[rgb(165,56,96)] mb-3 tracking-widest uppercase flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)] animate-ping" />
          [ INITIALIZING DIGITAL PORTFOLIO ]
        </p>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-none">
          CRAFTING IDEAS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[rgb(165,56,96)]">
            INTO SYSTEMS.
          </span>
        </h1>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between font-mono">
          <span className="text-xs text-neutral-400 tracking-wider">
            CAGAYAN DE ORO CITY, PH • VERIFIED REPOSITORIES
          </span>
          <span className="text-3xl md:text-5xl font-light text-white tabular-nums tracking-tighter">
            <span className="text-[rgb(165,56,96)]">{progress}</span>%
          </span>
        </div>
        <div className="h-[2px] w-full bg-[#292929] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-white via-[rgb(194,76,120)] to-[rgb(165,56,96)] shadow-[0_0_12px_rgba(165,56,96,0.8)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Crosshair, Zap, Shield, Eye } from "lucide-react";

export default function SpiderCursorMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
  const [isHovered, setIsHovered] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const stateRef = useRef({
    x: 200,
    y: 200,
    targetX: 200,
    targetY: 200,
    isHovered: false,
    radius: 130,
    shockwaves: [] as { x: number; y: number; r: number; maxR: number; alpha: number }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }[],
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const handleResize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Default center
      if (!stateRef.current.isHovered) {
        stateRef.current.targetX = width / 2;
        stateRef.current.targetY = height / 2;
        stateRef.current.x = width / 2;
        stateRef.current.y = height / 2;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Spider emblem geometry relative to center
    const drawSpiderEmblem = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      scale: number,
      isIlluminated: boolean
    ) => {
      context.save();
      context.translate(cx, cy);
      context.scale(scale, scale);

      // Color scheme
      const strokeStyle = isIlluminated ? "#FFFFFF" : "#222222";
      const glowStyle = isIlluminated ? "rgb(194, 76, 120)" : "transparent";

      if (isIlluminated) {
        context.shadowColor = glowStyle;
        context.shadowBlur = 18;
      }

      // Upper Diamond Body (Spider thorax)
      context.beginPath();
      context.moveTo(0, -22);
      context.lineTo(10, -8);
      context.lineTo(0, 4);
      context.lineTo(-10, -8);
      context.closePath();
      context.fillStyle = isIlluminated ? "rgb(165, 56, 96)" : "#161616";
      context.fill();
      context.strokeStyle = strokeStyle;
      context.lineWidth = 2;
      context.stroke();

      // Lower Elongated Abdomen
      context.beginPath();
      context.moveTo(0, 6);
      context.lineTo(12, 22);
      context.lineTo(0, 44);
      context.lineTo(-12, 22);
      context.closePath();
      context.fillStyle = isIlluminated ? "white" : "#161616";
      context.fill();
      context.strokeStyle = strokeStyle;
      context.lineWidth = 2;
      context.stroke();

      // Sharp Angular Spider Legs (4 pairs with high-tech joints)
      const legPairs = [
        // Top front legs pointing up & out
        [
          [-8, -12],
          [-30, -38],
          [-46, -26],
          [-62, -50],
        ],
        // Upper middle legs
        [
          [-10, -4],
          [-40, -14],
          [-58, 4],
          [-74, -8],
        ],
        // Lower middle legs pointing down & out
        [
          [-10, 10],
          [-42, 20],
          [-54, 46],
          [-66, 68],
        ],
        // Rear legs pointing down
        [
          [-6, 22],
          [-32, 44],
          [-38, 74],
          [-42, 98],
        ],
      ];

      context.lineWidth = isIlluminated ? 2.5 : 1.5;
      context.strokeStyle = strokeStyle;

      // Draw left legs & mirrored right legs
      for (const leg of legPairs) {
        // Left
        context.beginPath();
        context.moveTo(leg[0][0], leg[0][1]);
        for (let i = 1; i < leg.length; i++) {
          context.lineTo(leg[i][0], leg[i][1]);
        }
        context.stroke();

        // Right (mirrored X)
        context.beginPath();
        context.moveTo(-leg[0][0], leg[0][1]);
        for (let i = 1; i < leg.length; i++) {
          context.lineTo(-leg[i][0], leg[i][1]);
        }
        context.stroke();
      }

      // Nodal energy joints on legs when illuminated
      if (isIlluminated) {
        context.fillStyle = "rgb(194, 76, 120)";
        for (const leg of legPairs) {
          for (let i = 1; i < leg.length; i++) {
            context.beginPath();
            context.arc(leg[i][0], leg[i][1], 2, 0, Math.PI * 2);
            context.fill();
            context.beginPath();
            context.arc(-leg[i][0], leg[i][1], 2, 0, Math.PI * 2);
            context.fill();
          }
        }
      }

      context.restore();
    };

    // Draw the geometric web radar background
    const drawWebStructure = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      isIlluminated: boolean,
      pointerX: number,
      pointerY: number
    ) => {
      const rings = 6;
      const spokes = 12;
      const maxRadius = Math.max(width, height) * 0.72;

      context.lineWidth = isIlluminated ? 1.5 : 0.8;
      context.strokeStyle = isIlluminated
        ? "rgba(165, 56, 96, 0.45)"
        : "rgba(255, 255, 255, 0.05)";

      // Radial spokes
      for (let s = 0; s < spokes; s++) {
        const rad = (s * 2 * Math.PI) / spokes;
        const ex = cx + Math.cos(rad) * maxRadius;
        const ey = cy + Math.sin(rad) * maxRadius;

        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(ex, ey);
        context.stroke();
      }

      // Concentric polygonal web rings
      for (let r = 1; r <= rings; r++) {
        const radius = (r / rings) * maxRadius;
        context.beginPath();

        for (let s = 0; s <= spokes; s++) {
          const rad = (s * 2 * Math.PI) / spokes;
          // Subtle curve between spokes
          const px = cx + Math.cos(rad) * radius;
          const py = cy + Math.sin(rad) * radius;

          if (s === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        }
        context.stroke();
      }

      // Dynamic Interactive Web Filaments connected to the Cursor!
      if (isIlluminated) {
        context.save();
        context.shadowColor = "rgb(194, 76, 120)";
        context.shadowBlur = 10;
        context.strokeStyle = "rgba(255, 255, 255, 0.9)";
        context.lineWidth = 1.8;

        // Radiating dynamic silk threads from 6 web nodes directly snapping to pointer
        for (let i = 0; i < 6; i++) {
          const rad = (i * 2 * Math.PI) / 6;
          const anchorX = cx + Math.cos(rad) * 90;
          const anchorY = cy + Math.sin(rad) * 90;

          // Quadratic curve giving tensile droop / tension
          const midX = (anchorX + pointerX) / 2 + Math.sin(i) * 12;
          const midY = (anchorY + pointerY) / 2 + Math.cos(i) * 12;

          context.beginPath();
          context.moveTo(anchorX, anchorY);
          context.quadraticCurveTo(midX, midY, pointerX, pointerY);
          context.stroke();

          // Nodal anchor sparkle
          context.fillStyle = "rgb(194, 76, 120)";
          context.beginPath();
          context.arc(anchorX, anchorY, 3, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
    };

    let time = 0;

    const render = () => {
      time += 0.016;
      const state = stateRef.current;
      const cx = width / 2;
      const cy = height / 2;

      // Smooth cursor interpolation
      if (!state.isHovered) {
        // Ambient Lissajous figure-8 idle movement for mobile or idle desktop
        state.targetX = cx + Math.sin(time * 1.2) * (width * 0.28);
        state.targetY = cy + Math.cos(time * 0.9) * (height * 0.22);
      }

      state.x += (state.targetX - state.x) * 0.14;
      state.y += (state.targetY - state.y) * 0.14;

      // Clear full canvas
      ctx.clearRect(0, 0, width, height);

      // LAYER 1: Deep Dark Base Layer (Subtle, professional, monochrome)
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      // Subtle tech background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Base stealth web & spider silhouette
      drawWebStructure(ctx, cx, cy, false, state.x, state.y);
      drawSpiderEmblem(ctx, cx, cy, 0.85, false);

      // LAYER 2: Masked Spider-Man Cyber Layer revealed only under cursor spotlight!
      ctx.save();

      // Create circular / radial mask path centered at cursor
      ctx.beginPath();
      ctx.arc(state.x, state.y, state.radius, 0, Math.PI * 2);
      ctx.clip(); // Restrict everything inside this circle!

      // Glowing spotlight background fill inside the mask
      const spotGrad = ctx.createRadialGradient(
        state.x,
        state.y,
        0,
        state.x,
        state.y,
        state.radius
      );
      spotGrad.addColorStop(0, "rgba(22, 10, 16, 0.95)");
      spotGrad.addColorStop(0.6, "rgba(14, 8, 12, 0.92)");
      spotGrad.addColorStop(1, "rgba(8, 8, 8, 0.7)");

      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw high-intensity illuminated Web & Spider Emblem inside mask!
      drawWebStructure(ctx, cx, cy, true, state.x, state.y);
      drawSpiderEmblem(ctx, cx, cy, 0.85, true);

      // Glowing Spider-Sense Radar Crosshair at cursor point
      ctx.save();
      ctx.translate(state.x, state.y);

      // Rotating radar ring
      ctx.strokeStyle = "rgba(194, 76, 120, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Core reticle
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 10);
      ctx.stroke();

      // Glowing central dot
      ctx.fillStyle = "rgb(194, 76, 120)";
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Render floating bio-electric sparks inside mask
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Add a couple micro sparks near cursor continuously
      if (Math.random() < 0.35 && state.particles.length < 25) {
        state.particles.push({
          x: state.x + (Math.random() - 0.5) * 40,
          y: state.y + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          maxLife: 1,
          color: Math.random() > 0.5 ? "rgb(194, 76, 120)" : "#FFFFFF",
        });
      }

      ctx.restore(); // End mask clipping

      // LAYER 3: Shockwave pulses & Mask Ring Border
      // Glowing ring around the mask boundary
      ctx.save();
      ctx.beginPath();
      ctx.arc(state.x, state.y, state.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(194, 76, 120, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Click shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.r += 6;
        sw.alpha -= 0.025;

        if (sw.alpha <= 0) {
          state.shockwaves.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(194, 76, 120, ${sw.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.targetX = x;
    stateRef.current.targetY = y;
    stateRef.current.isHovered = true;
    setIsHovered(true);
    setMousePos({ x, y });
  };

  const handlePointerLeave = () => {
    stateRef.current.isHovered = false;
    setIsHovered(false);
  };

  // Shockwave burst on click / tap
  const handleClick = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.shockwaves.push({
      x,
      y,
      r: 10,
      maxR: 350,
      alpha: 0.9,
    });

    setPulseCount((c) => c + 1);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handleClick}
      className="relative aspect-square w-full rounded-2xl border border-[#292929] bg-[#0A0A0A] overflow-hidden select-none cursor-crosshair shadow-2xl group transition-all duration-500 hover:border-[rgb(165,56,96)]/80 hover:shadow-[0_0_35px_rgba(165,56,96,0.3)]"
    >
      {/* Decorative High-Tech Corner Brackets */}
      <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[rgb(165,56,96)] pointer-events-none z-20" />
      <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-[rgb(165,56,96)] pointer-events-none z-20" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[rgb(165,56,96)] pointer-events-none z-20" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[rgb(165,56,96)] pointer-events-none z-20" />

      {/* Main Canvas rendering the dual-layer Spider-Man mask effect */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono pointer-events-none z-20">
        <div className="flex items-center gap-2 rounded bg-black/70 px-2 py-1 border border-white/10 backdrop-blur-md">
          <Crosshair className="h-3 w-3 text-[rgb(194,76,120)] animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-white font-semibold tracking-wider">
            SPIDER-MASK PROTOCOL
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded bg-black/70 px-2 py-1 border border-[rgb(165,56,96)]/40 text-[rgb(194,76,120)] font-semibold backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)] animate-ping" />
          <span>{isHovered ? "SENSE // LOCKED" : "AMBIENT SCAN"}</span>
        </div>
      </div>

      {/* Bottom Info HUD Ribbon */}
      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#292929]/90 border-l-2 border-l-[rgb(165,56,96)] bg-[#0C0C0C]/85 px-4 py-3 backdrop-blur-md pointer-events-none z-20 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Zap className="h-3 w-3 text-[rgb(194,76,120)]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                SYSTEM DEVELOPER IDENTITY
              </span>
            </div>
            <p className="text-sm font-bold text-white tracking-wide">
              Sharmaine A. Jacob
            </p>
          </div>

          <div className="text-right font-mono text-[9px] text-neutral-400">
            <span className="block text-white font-medium">PHINMA COC</span>
            <span className="text-[rgb(194,76,120)]">TAP TO PULSE</span>
          </div>
        </div>
      </div>

      {/* Interactive Helper Hint Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-[9px] font-mono text-neutral-300 border border-white/20 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-[rgb(194,76,120)]" />
          MOVE CURSOR OR TOUCH TO REVEAL WEB
        </span>
      </div>
    </div>
  );
}
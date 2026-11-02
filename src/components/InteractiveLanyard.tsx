"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, QrCode } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface VerletPoint {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

export default function InteractiveLanyard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Pure ref-based state: ZERO React re-renders during motion/drag/hover for 120fps performance
  const mouseStateRef = useRef({
    x: 0,
    y: 0,
    isHovering: false,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    cardStartX: 0,
    cardStartY: 0,
  });

  const physicsRef = useRef({
    points: [] as VerletPoint[],
    segmentLength: 20,
    cardX: 0,
    cardY: 0,
    cardRotZ: 0,
    cardRotY: 0,
    cardRotX: 0,
    rotZVel: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!container || !canvas || !card) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = container.clientWidth || 380;
    let height = container.clientHeight || 560;

    const numPoints = 8;
    const segmentLength = 22;
    physicsRef.current.segmentLength = segmentLength;

    const resetPoints = (w: number) => {
      const anchorX = w / 2;
      const anchorY = 0;
      const pts: VerletPoint[] = [];

      for (let i = 0; i < numPoints; i++) {
        const y = anchorY + i * segmentLength;
        pts.push({
          x: anchorX,
          y,
          oldX: anchorX,
          oldY: y,
          pinned: i === 0,
        });
      }

      physicsRef.current.points = pts;
      physicsRef.current.cardX = anchorX;
      physicsRef.current.cardY = anchorY + (numPoints - 1) * segmentLength;
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth || 380;
      height = container.clientHeight || 560;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (physicsRef.current.points.length === 0) {
        resetPoints(width);
      } else {
        physicsRef.current.points[0].x = width / 2;
        physicsRef.current.points[0].oldX = width / 2;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const gravity = 0.38;
    const damping = 0.985;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const pts = physicsRef.current.points;
      if (pts.length < 2) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const anchor = pts[0];
      anchor.x = width / 2;
      anchor.y = 0;

      const mouse = mouseStateRef.current;
      const lastPt = pts[pts.length - 1];

      // 1. Verlet integration on rope particles
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        if (p.pinned) continue;

        const vx = (p.x - p.oldX) * damping;
        const vy = (p.y - p.oldY) * damping;

        p.oldX = p.x;
        p.oldY = p.y;

        p.x += vx;
        p.y += vy + gravity;
      }

      // 2. Physics reaction to mouse/touch
      if (mouse.isDragging) {
        // Direct spring towards mouse position when dragged
        const targetX = mouse.cardStartX + (mouse.x - mouse.dragStartX);
        const targetY = mouse.cardStartY + (mouse.y - mouse.dragStartY);

        lastPt.x += (targetX - lastPt.x) * 0.4;
        lastPt.y += (targetY - lastPt.y) * 0.4;
      } else if (mouse.isHovering) {
        // Ultra-smooth, non-laggy subtle hover sway (acceleration based, NOT direct mutation)
        const dx = mouse.x - lastPt.x;
        const dy = mouse.y - (lastPt.y + 120);
        const dist = Math.hypot(dx, dy);

        if (dist < 260 && dist > 1) {
          // Gentle air displacement force (never snaps or jitters)
          const force = ((260 - dist) / 260) * 0.12;
          lastPt.x += (dx / dist) * force;
        }
      } else {
        // Gentle idle oscillation
        const t = now * 0.0016;
        lastPt.x += Math.sin(t) * 0.08;
      }

      // 3. Relax distance constraints
      const iterations = 6; // 6 is snappy and light on CPU
      for (let it = 0; it < iterations; it++) {
        for (let i = 0; i < pts.length - 1; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - segmentLength) / dist;

          const ox = dx * diff * 0.5;
          const oy = dy * diff * 0.5;

          if (!p1.pinned) {
            p1.x += ox;
            p1.y += oy;
          }
          if (!p2.pinned && !(i + 1 === pts.length - 1 && mouse.isDragging)) {
            p2.x -= ox;
            p2.y -= oy;
          }
        }
      }

      // 4. Render the fabric lanyard strap
      ctx.clearRect(0, 0, width, height);

      // Strap drop shadow
      ctx.beginPath();
      ctx.moveTo(pts[0].x + 3, pts[0].y + 3);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x + 3, pts[i].y + 3);
      }
      ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Main fabric ribbon strap (Matte black)
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = "#161616";
      ctx.lineWidth = 13;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Dual woven accent stripe in rgb(165, 56, 96)
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = "rgba(165, 56, 96, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Hardware clasp at end of strap
      const prevPt = pts[pts.length - 2];
      const angle = Math.atan2(lastPt.y - prevPt.y, lastPt.x - prevPt.x);

      ctx.save();
      ctx.translate(lastPt.x, lastPt.y);
      ctx.rotate(angle - Math.PI / 2);

      // Swivel chrome ring
      ctx.beginPath();
      ctx.arc(0, 4, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = "#B0B0B0";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Lobster Clasp Body
      ctx.fillStyle = "#888888";
      ctx.beginPath();
      ctx.roundRect(-3.5, 8, 7, 13, 1.5);
      ctx.fill();

      // Hook
      ctx.strokeStyle = "#E0E0E0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 22, 3.5, -Math.PI * 0.1, Math.PI * 1.1);
      ctx.stroke();

      ctx.restore();

      // 5. Update ID Badge Transform with Smooth Angular Physics
      const cardX = lastPt.x;
      const cardY = lastPt.y + 22;

      const swingAngle = Math.atan2(lastPt.x - prevPt.x, segmentLength);
      const targetRotZ = Math.max(-28, Math.min(28, (swingAngle * 180) / Math.PI));

      const phys = physicsRef.current;
      phys.cardRotZ += (targetRotZ - phys.cardRotZ) * 0.18;

      // Card 3D tilt reaction
      let targetRotY = 0;
      let targetRotX = 0;

      if (mouse.isDragging) {
        const vx = (lastPt.x - lastPt.oldX);
        targetRotY = Math.max(-25, Math.min(25, -vx * 1.6));
      } else if (mouse.isHovering) {
        const rx = (mouse.x - cardX) / 200;
        targetRotY = Math.max(-14, Math.min(14, rx * 14));
      }

      phys.cardRotY += (targetRotY - phys.cardRotY) * 0.12;
      phys.cardRotX += (targetRotX - phys.cardRotX) * 0.12;

      // Apply transform via hardware-accelerated translate3d
      card.style.transform = `translate3d(${cardX}px, ${cardY}px, 0) translate(-50%, 0) rotateZ(${phys.cardRotZ.toFixed(2)}deg) rotateY(${phys.cardRotY.toFixed(2)}deg) rotateX(${phys.cardRotX.toFixed(2)}deg)`;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Pointer interactions without React re-renders
  const handlePointerDown = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pts = physicsRef.current.points;
    const lastPt = pts.length > 0 ? pts[pts.length - 1] : { x, y };

    mouseStateRef.current.isDragging = true;
    mouseStateRef.current.dragStartX = x;
    mouseStateRef.current.dragStartY = y;
    mouseStateRef.current.cardStartX = lastPt.x;
    mouseStateRef.current.cardStartY = lastPt.y;
    mouseStateRef.current.x = x;
    mouseStateRef.current.y = y;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouseStateRef.current.x = e.clientX - rect.left;
    mouseStateRef.current.y = e.clientY - rect.top;
    mouseStateRef.current.isHovering = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    mouseStateRef.current.isDragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handlePointerLeave = () => {
    mouseStateRef.current.isHovering = false;
    mouseStateRef.current.isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[520px] sm:h-[570px] select-none touch-none overflow-visible flex justify-center bg-transparent"
      style={{ perspective: "1200px" }}
    >
      {/* Canvas for the realistic fabric strap - 100% transparent background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Floating 3D Suspended Developer ID Card - ONLY the card is visible */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="absolute top-0 left-0 w-[270px] sm:w-[290px] z-20 cursor-grab active:cursor-grabbing will-change-transform origin-top transition-shadow duration-200 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
      >
        {/* Top Punch Hole & Reinforced Clip Slot */}
        <div className="mx-auto w-12 h-3.5 rounded-full bg-[#080808] border-2 border-[#333333] shadow-inner mb-[-7px] relative z-30 flex items-center justify-center">
          <div className="w-6 h-1 rounded-full bg-[#1A1A1A] border border-white/20" />
        </div>

        {/* The Badge Body */}
        <div className="relative rounded-2xl border border-[#2D2D2D] bg-[#0E0E0E] p-4 text-white overflow-hidden shadow-2xl hover:border-[rgb(165,56,96)]/70 transition-colors">
          {/* Holographic Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

          {/* Badge Top Header */}
          <div className="flex items-center justify-between border-b border-[#222222] pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[rgb(165,56,96)] shadow-[0_0_8px_rgba(165,56,96,0.9)]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-300">
                PHINMA COC
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[rgb(165,56,96)]/20 border border-[rgb(165,56,96)]/40 text-[rgb(194,76,120)] font-semibold flex items-center gap-1">
              <ShieldCheck className="h-2.5 w-2.5" />
              VERIFIED 2026
            </span>
          </div>

          {/* Photo & IC Smart Chip Row */}
          <div className="relative flex gap-3 items-center mb-3">
            {/* Portrait Frame */}
            <div className="relative h-28 w-24 rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#080808] shrink-0 shadow-md">
              <Image
                src="/profile.jpg"
                alt="Sharmaine A. Jacob"
                fill
                sizes="100px"
                priority
                className="object-cover object-top filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 left-1 right-1">
                <span className="text-[8px] font-mono text-[rgb(194,76,120)] font-bold tracking-tight block truncate">
                  DEV // 08821
                </span>
              </div>
            </div>

            {/* Smart Chip & Telemetry */}
            <div className="flex-1 space-y-1.5 text-left">
              {/* Black & Pink Monogram Chip with SJ Initials */}
              <div className="w-10 h-7 rounded-md border border-[rgb(165,56,96)]/80 bg-gradient-to-br from-[#1A1A1A] via-[#101010] to-[#080808] shadow-[0_0_12px_rgba(165,56,96,0.35)] relative flex items-center justify-center p-0.5 mb-1 overflow-hidden group/chip">
                {/* Circuit background traces in pink */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[rgb(194,76,120)]" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[rgb(194,76,120)]" />
                </div>
                {/* Micro corner solder pads */}
                <div className="absolute top-0.5 left-0.5 h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />
                <div className="absolute top-0.5 right-0.5 h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />
                <div className="absolute bottom-0.5 left-0.5 h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />
                <div className="absolute bottom-0.5 right-0.5 h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />

                {/* Bold SJ Initials in Pink & White */}
                <span className="relative z-10 font-mono font-black text-xs tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[rgb(214,96,140)] to-[rgb(165,56,96)] drop-shadow-[0_0_6px_rgba(165,56,96,0.6)]">
                  SJ
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[8px] font-mono uppercase text-neutral-400 block tracking-wider">
                  CLASSIFICATION:
                </span>
                <span className="text-[11px] font-bold text-white uppercase block leading-tight">
                  SYSTEM DEV
                </span>
                <span className="text-[9px] font-mono text-[rgb(194,76,120)] block">
                  BSIT CANDIDATE
                </span>
              </div>
            </div>
          </div>

          {/* Identity Credentials */}
          <div className="space-y-1 bg-[#080808] rounded-lg p-2.5 border border-[#1E1E1E] font-mono text-left mb-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[9px] text-neutral-400">NAME:</span>
              <span className="text-[11px] font-bold text-white uppercase tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[9px] text-neutral-400">TRACK:</span>
              <span className="text-[10px] text-neutral-200">
                System Development
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[9px] text-neutral-400">LOCATION:</span>
              <span className="text-[10px] text-neutral-300">
                Cagayan de Oro, PH
              </span>
            </div>
          </div>

          {/* Bottom Barcode & Pass Key */}
          <div className="border-t border-[#1E1E1E] pt-2 flex items-center justify-between">
            <div className="flex items-center gap-[2px] h-5 px-1 bg-white/95 rounded-[2px] py-0.5">
              {[3, 1, 4, 1, 2, 2, 3, 1, 2, 5, 2, 2, 1, 3, 2, 4, 1, 1, 3, 2].map((w, idx) => (
                <div
                  key={idx}
                  className="bg-black h-full"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 font-mono text-[9px] text-neutral-400">
              <QrCode className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
              <span>PASS#2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
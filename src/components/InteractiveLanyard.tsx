"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, QrCode, Cpu } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned?: boolean;
}

export default function InteractiveLanyard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0 });

  // Physics points for the lanyard ribbon (Verlet integration)
  const pointsRef = useRef<Point[]>([]);
  const segmentLengthRef = useRef(20);
  const cardPhysicsRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    angularVel: 0,
  });

  const initPhysics = useCallback((width: number) => {
    const numPoints = 9;
    const anchorX = width / 2;
    const anchorY = 0;
    const segmentLength = 22;
    segmentLengthRef.current = segmentLength;

    const points: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: anchorX,
        y: anchorY + i * segmentLength,
        oldX: anchorX,
        oldY: anchorY + i * segmentLength,
        pinned: i === 0,
      });
    }

    pointsRef.current = points;
    cardPhysicsRef.current.x = anchorX;
    cardPhysicsRef.current.y = anchorY + (numPoints - 1) * segmentLength;
  }, []);

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

      if (pointsRef.current.length === 0) {
        initPhysics(width);
      } else {
        // Adjust anchor
        pointsRef.current[0].x = width / 2;
        pointsRef.current[0].oldX = width / 2;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const gravity = 0.42;
    const friction = 0.985;
    const segmentLength = segmentLengthRef.current;

    // Simulation loop
    let lastTime = performance.now();

    const simulate = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const points = pointsRef.current;
      if (points.length === 0) {
        animId = requestAnimationFrame(simulate);
        return;
      }

      const anchor = points[0];
      anchor.x = width / 2;
      anchor.y = 0;

      // Verlet integration for rope segments
      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        if (p.pinned) continue;

        const vx = (p.x - p.oldX) * friction;
        const vy = (p.y - p.oldY) * friction;

        p.oldX = p.x;
        p.oldY = p.y;

        p.x += vx;
        p.y += vy + gravity;
      }

      // If user is dragging the card, pin the last point to dragged position
      const lastPoint = points[points.length - 1];
      if (isDraggingRef.current) {
        const targetX = mouseRef.current.x - dragOffsetRef.current.x;
        const targetY = mouseRef.current.y - dragOffsetRef.current.y;

        lastPoint.x += (targetX - lastPoint.x) * 0.45;
        lastPoint.y += (targetY - lastPoint.y) * 0.45;
        lastPoint.oldX = lastPoint.x - mouseRef.current.vx * 0.5;
        lastPoint.oldY = lastPoint.y - mouseRef.current.vy * 0.5;
      } else {
        // Ambient natural gentle sway
        const time = now * 0.0018;
        const gentleBreeze = Math.sin(time) * 0.15;
        lastPoint.x += gentleBreeze;
      }

      // Relax constraints (multiple iterations for stiffness)
      const iterations = 10;
      for (let it = 0; it < iterations; it++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - segmentLength) / dist;

          const offsetX = dx * diff * 0.5;
          const offsetY = dy * diff * 0.5;

          if (!p1.pinned) {
            p1.x += offsetX;
            p1.y += offsetY;
          }
          if (!p2.pinned && !(i + 1 === points.length - 1 && isDraggingRef.current)) {
            p2.x -= offsetX;
            p2.y -= offsetY;
          }
        }
      }

      // Draw the fabric lanyard strap on Canvas
      ctx.clearRect(0, 0, width, height);

      // Strap drop shadow
      ctx.beginPath();
      ctx.moveTo(points[0].x + 4, points[0].y + 4);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x + 4, points[i].y + 4);
      }
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Main fabric ribbon strap (Deep matte black with woven texture look)
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = "#141414";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Inner woven accent stripe in rgb(165, 56, 96)
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = "rgba(165, 56, 96, 0.75)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Outer edge stitching lines
      ctx.beginPath();
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        ctx.moveTo(p1.x + nx * 5.5, p1.y + ny * 5.5);
        ctx.lineTo(p2.x + nx * 5.5, p2.y + ny * 5.5);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Metallic Lobster Clasp & Swivel Hook at the end of strap
      const endPoint = points[points.length - 1];
      const prevPoint = points[points.length - 2];
      const angle = Math.atan2(endPoint.y - prevPoint.y, endPoint.x - prevPoint.x);

      ctx.save();
      ctx.translate(endPoint.x, endPoint.y);
      ctx.rotate(angle - Math.PI / 2);

      // Swivel ring (chrome metallic)
      const gradRing = ctx.createLinearGradient(-6, 0, 6, 0);
      gradRing.addColorStop(0, "#888888");
      gradRing.addColorStop(0.5, "#FFFFFF");
      gradRing.addColorStop(1, "#444444");

      ctx.beginPath();
      ctx.arc(0, 4, 6, 0, Math.PI * 2);
      ctx.strokeStyle = gradRing;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Lobster Clasp Body
      const gradClasp = ctx.createLinearGradient(-5, 0, 5, 0);
      gradClasp.addColorStop(0, "#777777");
      gradClasp.addColorStop(0.3, "#E0E0E0");
      gradClasp.addColorStop(0.7, "#A0A0A0");
      gradClasp.addColorStop(1, "#333333");

      ctx.fillStyle = gradClasp;
      ctx.beginPath();
      ctx.roundRect(-4, 9, 8, 14, 2);
      ctx.fill();

      // Hook tongue
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 24, 4, -Math.PI * 0.2, Math.PI * 1.2);
      ctx.stroke();

      ctx.restore();

      // Update Card Position & 3D Tilt Matrix
      if (cardRef.current) {
        const cardX = endPoint.x;
        const cardY = endPoint.y + 24; // attach point below clasp

        // Compute swing angle and rotational inertia
        const dx = endPoint.x - prevPoint.x;
        const swingAngle = Math.atan2(dx, segmentLength); // radians
        const swingDeg = (swingAngle * 180) / Math.PI;

        const targetRotZ = Math.max(-32, Math.min(32, swingDeg * 1.15));

        // Smoothly interpolate rotations
        const cp = cardPhysicsRef.current;
        cp.rotZ += (targetRotZ - cp.rotZ) * 0.18;

        // Yaw tilt responds to horizontal velocity / drag
        let targetRotY = 0;
        let targetRotX = 0;

        if (isDraggingRef.current) {
          targetRotY = Math.max(-28, Math.min(28, -mouseRef.current.vx * 1.8));
          targetRotX = Math.max(-20, Math.min(20, mouseRef.current.vy * 1.4));
        } else {
          // React slightly to cursor proximity if hovering
          const distToMouse = Math.hypot(
            mouseRef.current.x - cardX,
            mouseRef.current.y - (cardY + 140)
          );
          if (distToMouse < 320) {
            const pullX = (mouseRef.current.x - cardX) / 320;
            const pullY = (mouseRef.current.y - (cardY + 140)) / 320;
            targetRotY = pullX * 16;
            targetRotX = -pullY * 12;
          }
        }

        cp.rotY += (targetRotY - cp.rotY) * 0.12;
        cp.rotX += (targetRotX - cp.rotX) * 0.12;

        // Apply hardware-accelerated 3D transform
        cardRef.current.style.transform = `
          translate3d(${cardX}px, ${cardY}px, 0)
          translate(-50%, 0)
          perspective(1000px)
          rotateZ(${cp.rotZ.toFixed(2)}deg)
          rotateY(${cp.rotY.toFixed(2)}deg)
          rotateX(${cp.rotX.toFixed(2)}deg)
        `;
      }

      animId = requestAnimationFrame(simulate);
    };

    animId = requestAnimationFrame(simulate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [initPhysics]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isDraggingRef.current = true;
    setIsInteracting(true);
    setHasInteracted(true);

    const points = pointsRef.current;
    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      dragOffsetRef.current = {
        x: x - lastPoint.x,
        y: y - lastPoint.y,
      };
    }

    mouseRef.current.prevX = x;
    mouseRef.current.prevY = y;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.vx = x - mouseRef.current.prevX;
    mouseRef.current.vy = y - mouseRef.current.prevY;
    mouseRef.current.prevX = x;
    mouseRef.current.prevY = y;
    mouseRef.current.x = x;
    mouseRef.current.y = y;

    // Wake up physics on hover
    if (!isDraggingRef.current && pointsRef.current.length > 0) {
      const last = pointsRef.current[pointsRef.current.length - 1];
      const dist = Math.hypot(x - last.x, y - (last.y + 120));
      if (dist < 180) {
        last.x += (x - last.x) * 0.04;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[520px] sm:h-[580px] select-none touch-none overflow-visible flex justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Background Ambience behind the lanyard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[rgb(165,56,96)]/[0.04] blur-[90px] rounded-full pointer-events-none" />

      {/* Canvas for the realistic fabric strap and physics rope */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Interactive 3D Suspended Developer ID Card */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className={`absolute top-0 left-0 w-[275px] sm:w-[300px] z-20 cursor-grab active:cursor-grabbing will-change-transform origin-top transition-shadow duration-300 ${
          isInteracting ? "shadow-[0_20px_60px_rgba(165,56,96,0.35)]" : "shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
        }`}
        style={{ transformOrigin: "top center" }}
      >
        {/* Top Punch Hole & Reinforced Clip Slot */}
        <div className="mx-auto w-14 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#333333] shadow-inner mb-[-8px] relative z-30 flex items-center justify-center">
          <div className="w-8 h-1.5 rounded-full bg-[#181818] border border-white/20" />
        </div>

        {/* The Acrylic Badge Body */}
        <div className="relative rounded-2xl border border-[#2F2F2F] bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-[#0A0A0A] p-4 text-white overflow-hidden backdrop-blur-xl group hover:border-[rgb(165,56,96)]/80 transition-colors">
          {/* Dynamic Holographic / Specular Sheen Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
            style={{
              mixBlendMode: "overlay",
            }}
          />

          {/* Rainbow Holographic Security Strip */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[rgb(165,56,96)]/25 via-cyan-400/10 to-transparent pointer-events-none rounded-bl-full blur-sm" />

          {/* Badge Top Header */}
          <div className="flex items-center justify-between border-b border-[#252525] pb-2.5 mb-3">
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
            <div className="relative h-28 w-24 rounded-lg overflow-hidden border border-[#2D2D2D] bg-[#0A0A0A] shrink-0 shadow-md">
              <Image
                src="/profile.jpg"
                alt="Sharmaine A. Jacob"
                fill
                sizes="100px"
                priority
                className="object-cover object-top filter grayscale contrast-115 group-hover:grayscale-0 transition-all duration-500"
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
              {/* Gold Smart Chip Simulation */}
              <div className="w-9 h-7 rounded border border-amber-500/60 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-inner relative flex items-center justify-center p-0.5 mb-1">
                <div className="w-full h-full border border-amber-900/40 rounded-[2px] grid grid-cols-2 gap-0.5 opacity-80">
                  <div className="border-r border-b border-amber-900/40" />
                  <div className="border-b border-amber-900/40" />
                  <div className="border-r border-amber-900/40" />
                  <div />
                </div>
                <Cpu className="absolute h-3 w-3 text-amber-950/70" />
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
          <div className="space-y-1 bg-[#090909]/80 rounded-lg p-2.5 border border-[#222222] font-mono text-left mb-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[9px] text-neutral-400">NAME:</span>
              <span className="text-[11px] font-black text-white uppercase tracking-tight">
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

          {/* Bottom Barcode & Tech Strip */}
          <div className="border-t border-[#222222] pt-2.5 flex items-center justify-between">
            {/* Simulated high-density barcode */}
            <div className="flex items-center gap-[2px] h-6 px-1 bg-white/95 rounded-[2px] py-1 shadow-inner">
              {[4, 2, 5, 1, 3, 2, 4, 1, 2, 6, 2, 3, 1, 4, 2, 5, 2, 1, 3, 2].map((w, idx) => (
                <div
                  key={idx}
                  className="bg-black h-full"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-400">
              <QrCode className="h-4 w-4 text-[rgb(194,76,120)]" />
              <span>PASS#2026</span>
            </div>
          </div>
        </div>

        {/* Interactive Floating Hint Pill */}
        {!hasInteracted && (
          <div className="mt-4 flex justify-center pointer-events-none animate-bounce">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(165,56,96)]/60 bg-[#0E0E0E]/90 px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-white shadow-[0_0_15px_rgba(165,56,96,0.4)] backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-[rgb(194,76,120)]" />
              DRAG OR SWING BADGE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
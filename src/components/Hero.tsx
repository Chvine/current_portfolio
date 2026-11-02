"use client";

import { ArrowDownRight, Download, Mail, MapPin, Terminal, Code2, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import InteractiveLanyard from "@/components/InteractiveLanyard";

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center overflow-hidden border-b border-[#292929] grid-background"
    >
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.025] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-[rgb(165,56,96)]/[0.04] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#292929]/80 text-xs font-mono text-[#A0A0A0]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[rgb(165,56,96)] animate-ping" />
            <span className="text-white font-medium uppercase tracking-wider">
              System Development Specialization
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
              Cagayan de Oro City, Philippines
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#292929] bg-[#111111] px-2.5 py-1 rounded text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              BSIT Undergrad (2024–2027)
            </span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 lg:py-16">
          {/* Left Editorial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(165,56,96)]/30 bg-[#111111]/80 px-3.5 py-1 text-xs font-mono text-neutral-300">
                <Code2 className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
                <span>PHINMA CAGAYAN DE ORO COLLEGE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
                SHARMAINE <br />
                <span className="text-neutral-400 font-light">
                  A. <span className="text-white group-hover:text-[rgb(194,76,120)] transition-colors">JACOB</span>
                </span>
              </h1>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-white border-l-2 border-[rgb(165,56,96)] pl-4">
                <span>{PERSONAL_INFO.title}</span>
              </div>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed font-normal">
                {PERSONAL_INFO.heroSubtext}
              </p>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-neutral-100 hover:shadow-[0_0_28px_rgba(165,56,96,0.35)] active:scale-95"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[rgb(165,56,96)]" />
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="group inline-flex items-center gap-2.5 rounded-lg border border-[#292929] bg-[#111111] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-[rgb(165,56,96)] hover:bg-[#181818] hover:shadow-[0_0_20px_rgba(165,56,96,0.25)] active:scale-95"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:text-[rgb(194,76,120)]" />
                  <span>Download CV</span>
                </button>
              )}

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-[#292929] bg-[#111111] text-neutral-300 transition-all duration-300 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] hover:scale-105"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-[#292929] bg-[#111111] text-neutral-300 transition-all duration-300 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] hover:scale-105"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3 rounded-lg border border-[#292929] bg-[#111111] text-neutral-300 transition-all duration-300 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] hover:scale-105"
                  aria-label="Email Sharmaine"
                  title="Send Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Tech Tickers */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400">
              <span className="text-neutral-300 font-semibold uppercase tracking-wider">Core Arsenal:</span>
              {["Python", "Java", "JavaScript", "HTML5/CSS3", "Cloudflare Workers", "SQL"].map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-[#292929] bg-[#0E0E0E] px-2 py-0.5 text-neutral-300 transition-colors hover:border-[rgb(165,56,96)]/60 hover:text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Floating Interactive Lanyard ID (5 cols) - Transparent, only ID visible */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="w-full max-w-md flex justify-center">
              <InteractiveLanyard />
            </div>
          </div>
        </div>

        {/* Bottom Headline Banner */}
        <div className="pt-8 border-t border-[#292929]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#A0A0A0] flex items-center gap-2">
            <span className="text-[rgb(165,56,96)] font-bold">//</span>
            <span>PHILOSOPHY: ARCHITECTURE OVER COMPLEXITY</span>
          </div>
          <div className="text-sm font-semibold tracking-wider text-white uppercase flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
            <span>BUILDING IDEAS INTO DIGITAL EXPERIENCES.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

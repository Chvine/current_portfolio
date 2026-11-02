"use client";

import { CheckCircle2, Code, Compass, GraduationCap, Laptop, Sparkles, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import SpiderCursorMask from "@/components/SpiderCursorMask";

export default function About() {
  const highlights = [
    {
      icon: Terminal,
      title: "System Development Focus",
      desc: "Specialized academic track at PHINMA COC emphasizing full lifecycle software engineering, OOP patterns, and system design.",
    },
    {
      icon: Laptop,
      title: "Full-Stack Web & POS Tools",
      desc: "Experienced with single-page applications, local retail point-of-sale systems, and serverless Cloudflare deployments.",
    },
    {
      icon: Code,
      title: "Verified Code Repositories",
      desc: "All featured projects are backed by real public GitHub repositories and tested academic deliverables.",
    },
    {
      icon: Compass,
      title: "Problem Solver & Collaborator",
      desc: "Proven track record across group development projects—communicating clearly, defending system architectures, and delivering on time.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-[#292929] relative bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-[rgb(165,56,96)] font-bold">01 //</span> ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            ABOUT <span className="text-[rgb(194,76,120)]">ME.</span>
          </h2>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-neutral-300 leading-relaxed text-base sm:text-lg">
              <p className="border-l-2 border-[rgb(165,56,96)] pl-4 font-normal text-white text-lg sm:text-xl">
                Hi! I’m <strong className="text-white font-bold">Sharmaine Jacob</strong>, a Bachelor of Science in Information Technology student at <strong className="text-white font-bold">PHINMA Cagayan de Oro College</strong>, specializing in <span className="text-[rgb(194,76,120)] font-semibold">System Development</span>.
              </p>

              <p className="text-neutral-300">
                I am passionate about learning new technologies and creating useful digital solutions. I have knowledge and experience in <strong className="text-white font-semibold">Python, Java, JavaScript, HTML, PHP, CSS, React, and Next.js</strong>. I also have experience working with <strong className="text-white font-semibold">MySQL</strong> for database management and using <strong className="text-white font-semibold">Bootstrap</strong> for creating responsive and user-friendly website designs.
              </p>

              <p className="text-neutral-300">
                Through my academic projects, I have developed different systems, including a <strong className="text-white font-medium">riddle game, lending management system, healthcare appointment system, and apparel ordering system</strong>. These projects helped me improve my programming, database, problem-solving, teamwork, and adaptability skills.
              </p>

              <p className="text-neutral-400">
                I am continuously learning and improving my skills in web and system development. My goal is to apply my knowledge to real-world projects, create useful and innovative systems, and grow as an IT professional.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="group rounded-xl border border-[#292929] bg-[#111111] p-4 text-center transition-all duration-300 hover:border-[rgb(165,56,96)]/60 hover:shadow-[0_0_15px_rgba(165,56,96,0.2)]">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-[rgb(194,76,120)] transition-colors">
                  8+
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Public Repos
                </span>
              </div>
              <div className="group rounded-xl border border-[#292929] bg-[#111111] p-4 text-center transition-all duration-300 hover:border-[rgb(165,56,96)]/60 hover:shadow-[0_0_15px_rgba(165,56,96,0.2)]">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-[rgb(194,76,120)] transition-colors">
                  4+
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Academic Systems
                </span>
              </div>
              <div className="group rounded-xl border border-[#292929] bg-[#111111] p-4 text-center transition-all duration-300 hover:border-[rgb(165,56,96)]/60 hover:shadow-[0_0_15px_rgba(165,56,96,0.2)]">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-[rgb(194,76,120)] transition-colors">
                  2027
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  BSIT Candidate
                </span>
              </div>
              <div className="group rounded-xl border border-[#292929] bg-[#111111] p-4 text-center transition-all duration-300 hover:border-[rgb(165,56,96)]/60 hover:shadow-[0_0_15px_rgba(165,56,96,0.2)]">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-[rgb(194,76,120)] transition-colors">
                  100%
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Dedication
                </span>
              </div>
            </div>

            {/* Personal Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-xl border border-[#292929] bg-[#0E0E0E] p-5 transition-all duration-300 hover:border-[rgb(165,56,96)]/70 hover:bg-[#131313] hover:shadow-[0_0_20px_rgba(165,56,96,0.15)]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-[#181818] border border-[#292929] text-white group-hover:border-[rgb(165,56,96)] group-hover:text-[rgb(194,76,120)] transition-colors">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-semibold text-white tracking-wide group-hover:text-[rgb(194,76,120)] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Spider-Man Cursor Mask & Info Sheet (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Spider-Man Cyber Web Cursor Mask */}
            <SpiderCursorMask />

            {/* Verification & Details Dossier */}
            <div className="rounded-2xl border border-[#292929] bg-[#0E0E0E] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#292929] pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  DEVELOPER DOSSIER
                </span>
                <span className="text-[11px] font-mono text-[rgb(194,76,120)] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
                  AUTHENTIC DATA
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#202020]">
                  <span className="text-neutral-400">INSTITUTION:</span>
                  <span className="text-white font-medium text-right">PHINMA COC</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#202020]">
                  <span className="text-neutral-400">DEGREE PROGRAM:</span>
                  <span className="text-white font-medium text-right">BS Information Tech</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#202020]">
                  <span className="text-neutral-400">SPECIALIZATION:</span>
                  <span className="text-white font-medium text-right">System Development</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#202020]">
                  <span className="text-neutral-400">ACADEMIC PERIOD:</span>
                  <span className="text-white font-medium text-right">2024 – 2027</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#202020]">
                  <span className="text-neutral-400">GITHUB HANDLE:</span>
                  <a
                    href="https://github.com/Chvine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline font-medium text-right"
                  >
                    @Chvine
                  </a>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">SEEKING:</span>
                  <span className="text-white font-medium text-right">Internship / Junior Dev</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { Check, Cpu, Layers, Server, Terminal, Wrench, ShieldCheck } from "lucide-react";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const categoryIcons = [Terminal, Layers, Cpu, Server, Wrench];

  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-[#292929] relative bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
              <span className="text-[rgb(165,56,96)] font-bold">02 //</span> TECHNICAL CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              VERIFIED SKILLS. <br />
              <span className="text-neutral-400">
                PRACTICAL <span className="text-[rgb(194,76,120)]">APPLICATION.</span>
              </span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#A0A0A0] max-w-xs uppercase">
            // Categorized by demonstrated projects and academic coursework. Zero fabricated proficiencies.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-[#292929]">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(165,56,96,0.3)] scale-[1.02] border border-[rgb(165,56,96)]/60"
                    : "border border-[#292929] bg-[#111111] text-neutral-400 hover:border-[rgb(165,56,96)]/60 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-[rgb(165,56,96)]" : "text-neutral-400"}`} />
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isSelected ? "bg-[rgb(165,56,96)]/20 text-[rgb(130,42,75)] font-bold" : "bg-[#1E1E1E] text-neutral-400"
                  }`}
                >
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        <div className="py-6 flex items-center justify-between">
          <p className="text-sm text-neutral-300 font-mono">
            &gt; {SKILL_CATEGORIES[selectedCategory].description}
          </p>
          <span className="text-xs font-mono text-[rgb(194,76,120)] hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[rgb(165,56,96)]" />
            Verified via Repos & Systems
          </span>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES[selectedCategory].skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="group relative rounded-xl border border-[#292929] bg-[#0E0E0E] p-6 transition-all duration-300 hover:border-[rgb(165,56,96)]/80 hover:bg-[#141414] hover:shadow-[0_0_22px_rgba(165,56,96,0.18)] hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-base font-bold text-white tracking-wide group-hover:text-white">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#292929] bg-[#181818] text-neutral-300 uppercase group-hover:border-[rgb(165,56,96)]/50 group-hover:text-[rgb(194,76,120)] transition-colors">
                  {skill.level}
                </span>
              </div>

              <div className="pt-3 border-t border-[#202020] space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Demonstrated In:
                </span>
                <p className="text-xs text-neutral-300 font-mono flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[rgb(165,56,96)] shrink-0" />
                  <span>{skill.verifiedIn}</span>
                </p>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[rgb(165,56,96)] group-hover:shadow-[0_0_8px_rgba(165,56,96,0.9)] transition-all duration-300 rounded-b-xl" />
            </div>
          ))}
        </div>

        {/* All Skills Matrix (Quick Glance) */}
        <div className="mt-16 rounded-2xl border border-[#292929] bg-[#0B0B0B] p-8">
          <div className="flex items-center justify-between mb-6 border-b border-[#202020] pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              COMPLETE TECH MATRIX
            </span>
            <span className="text-xs font-mono text-[rgb(194,76,120)] flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />
              28 VERIFIED ITEMS
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              "Python",
              "Java",
              "JavaScript ES6+",
              "PHP",
              "HTML5",
              "CSS3",
              "Tailwind CSS",
              "Java Swing GUI",
              "Cloudflare Pages",
              "Cloudflare Workers",
              "Cloudflare KV",
              "REST APIs",
              "Object-Oriented Programming (OOP)",
              "Systems Analysis & Design",
              "Database Management (DBMS)",
              "MySQL",
              "Web Storage API",
              "Git & GitHub",
              "VS Code",
              "Responsive Design",
              "CSS Grid & Flexbox",
              "Glassmorphism UI",
              "Canva",
              "Figma Prototyping",
              "Wrangler CLI",
              "Linux CLI Basics",
              "Technical Documentation",
              "Agile Collaboration",
            ].map((tech, i) => (
              <span
                key={i}
                className="rounded-md border border-[#252525] bg-[#121212] px-3 py-1.5 text-xs font-mono text-neutral-300 transition-all duration-200 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_12px_rgba(165,56,96,0.25)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

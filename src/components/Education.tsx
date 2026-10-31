"use client";

import { EDUCATION_TIMELINE, PERSONAL_INFO } from "@/data/portfolioData";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle2 } from "lucide-react";

export default function Education() {
  const edu = EDUCATION_TIMELINE[0];

  return (
    <section id="education" className="py-24 sm:py-32 border-b border-[#292929] relative bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-[rgb(165,56,96)] font-bold">04 //</span> ACADEMIC FOUNDATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            EDUCATION &amp; <br />
            <span className="text-neutral-400">
              TRACK <span className="text-[rgb(194,76,120)]">SPECIALIZATION.</span>
            </span>
          </h2>
        </div>

        {/* Editorial Timeline Container */}
        <div className="rounded-2xl border border-[#292929] bg-[#0D0D0D] p-8 md:p-12 relative overflow-hidden group transition-all duration-500 hover:border-[rgb(165,56,96)]/60 hover:shadow-[0_0_30px_rgba(165,56,96,0.15)]">
          {/* Ongoing Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#222222]">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full border border-[rgb(165,56,96)]/50 bg-[rgb(165,56,96)]/10 text-[rgb(194,76,120)] text-xs font-mono font-medium flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)] animate-pulse shadow-[0_0_6px_rgba(165,56,96,0.9)]" />
                CURRENTLY ENROLLED (ACTIVE UNDERGRADUATE)
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <Calendar className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
              <span>{edu.period} • Expected Completion April 2027</span>
            </div>
          </div>

          {/* Main Institution & Degree Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  INSTITUTION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                  {edu.institution}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
                  <span>{edu.campus}</span>
                </div>
              </div>

              <div className="rounded-xl border border-[#252525] bg-[#121212] p-5 space-y-2 border-l-2 border-l-[rgb(165,56,96)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  DEGREE &amp; TRACK
                </span>
                <p className="text-lg font-bold text-white tracking-wide">
                  {edu.degree}
                </p>
                <div className="inline-flex items-center gap-2 rounded bg-[rgb(165,56,96)] px-3 py-1 text-xs font-mono font-bold text-white uppercase shadow-[0_0_12px_rgba(165,56,96,0.5)]">
                  <span>Track: {edu.specialization}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed pt-2">
                  {edu.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  ACADEMIC EMPHASIS
                </span>
                <div className="space-y-2">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-[rgb(194,76,120)] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Coursework Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-[#252525] bg-[#111111] p-6 space-y-4 group-hover:border-[rgb(165,56,96)]/30 transition-colors">
                <div className="flex items-center gap-2 border-b border-[#202020] pb-3 text-neutral-300 font-mono text-xs">
                  <BookOpen className="h-4 w-4 text-[rgb(194,76,120)]" />
                  <span className="uppercase font-bold tracking-wider">Relevant Core Coursework</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {edu.keyCoursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="rounded border border-[#242424] bg-[#0A0A0A] p-2.5 text-neutral-300 flex items-center gap-2 hover:border-[rgb(165,56,96)]/50 hover:text-white transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
                      <span className="line-clamp-1">{course}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#202020] pt-4 text-[11px] font-mono text-neutral-400">
                  <p>Coursework emphasizes practical lab implementations, team system defenses, and industry-standard documentation.</p>
                </div>
              </div>

              {/* Institutional Note */}
              <div className="rounded-xl border border-[#222222] bg-[#0A0A0A] p-5 text-xs font-mono text-neutral-400 space-y-1 border-l-2 border-l-[rgb(165,56,96)]/60">
                <span className="text-[rgb(194,76,120)] font-semibold uppercase block">
                  Commitment to Growth:
                </span>
                <p>
                  Maintaining active academic standing while continuously translating theoretical curricula into independently hosted applications on GitHub and Cloudflare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

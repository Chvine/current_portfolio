"use client";

import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EDUCATION_TIMELINE } from "@/data/portfolioData";
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-[rgb(165,56,96)]/60 bg-[#0F0F0F] shadow-[0_0_50px_rgba(165,56,96,0.22)] z-10 overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#252525] px-6 py-4 bg-[#141414] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              CURRICULUM VITAE PREVIEW
            </span>
            <span className="text-[10px] font-mono text-[rgb(194,76,120)] bg-[rgb(165,56,96)]/15 px-2.5 py-0.5 rounded border border-[rgb(165,56,96)]/40 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
              VERIFIED 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-mono font-bold uppercase text-black hover:bg-neutral-100 hover:border-[rgb(165,56,96)] hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] transition-all"
              title="Print or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5 text-[rgb(165,56,96)]" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-[#292929] bg-[#1A1A1A] text-neutral-400 hover:text-white hover:border-[rgb(165,56,96)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0B0B0B] text-white font-mono text-xs selection:bg-white selection:text-black print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b-2 border-white pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mt-0.5">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-[11px] text-neutral-400">
                  Track Specialization: <span className="text-[rgb(194,76,120)]">{PERSONAL_INFO.specialization}</span>
                </p>
              </div>

              <div className="space-y-1 text-right text-[11px] text-neutral-300">
                <p>{PERSONAL_INFO.location}</p>
                <p>{PERSONAL_INFO.email}</p>
                <p>{PERSONAL_INFO.phone}</p>
                <p>
                  GitHub: {PERSONAL_INFO.github} • LinkedIn: {PERSONAL_INFO.linkedin}
                </p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[rgb(194,76,120)] border-b border-[#252525] pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-neutral-300 leading-relaxed text-[11px]">
              Bachelor of Science in Information Technology student at PHINMA Cagayan de Oro College, specializing in System Development. Proficient in Python, Java, JavaScript, HTML, PHP, CSS, React, and Next.js, with hands-on experience in MySQL database management and Bootstrap responsive UI design. Proven developer of academic systems including a riddle game, lending management system, healthcare appointment system, and apparel ordering system. Focused on building practical, innovative systems and continuously expanding software engineering capabilities.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[rgb(194,76,120)] border-b border-[#252525] pb-1">
              EDUCATION
            </h2>
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-white text-[11px]">
                <span>PHINMA EDUCATION – CAGAYAN DE ORO COLLEGE</span>
                <span>{EDUCATION_TIMELINE[0].period}</span>
              </div>
              <div className="flex justify-between text-neutral-300 text-[11px]">
                <span>Bachelor of Science in Information Technology (BSIT)</span>
                <span className="text-[rgb(194,76,120)]">Ongoing (Active Candidate)</span>
              </div>
              <p className="text-neutral-400 text-[10px]">
                Specialization: System Development • Cagayan de Oro City, Misamis Oriental, PH
              </p>
              <p className="text-neutral-300 text-[10px] pt-1">
                Relevant Coursework: Advanced Programming, Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Systems Analysis & Design, Web Systems & Technologies.
              </p>
            </div>
          </div>

          {/* Verified Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[rgb(194,76,120)] border-b border-[#252525] pb-1">
              FEATURED & VERIFIED PROJECTS
            </h2>

            <div className="space-y-4">
              {PROJECTS.slice(0, 5).map((project) => (
                <div key={project.id} className="space-y-1.5 border-l-2 border-l-[rgb(165,56,96)] pl-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-bold text-white text-[11px]">
                      {project.title} — {project.tagline}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {project.type} | {project.timeline}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    <span className="text-neutral-300 font-semibold">Technologies:</span> {project.technologies.join(", ")}
                    {project.githubUrl && ` • Repo: ${project.githubUrl}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[rgb(194,76,120)] border-b border-[#252525] pb-1">
              TECHNICAL SKILLS MATRIX
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
              <div>
                <span className="font-bold text-white block">Programming Languages:</span>
                <span className="text-neutral-300">Python, Java, JavaScript (ES6+), PHP, HTML5, CSS3</span>
              </div>
              <div>
                <span className="font-bold text-white block">Frontend & UI Design:</span>
                <span className="text-neutral-300">Responsive Layouts, Tailwind CSS, Modern Grid & Flexbox, Glassmorphism, Canva, Figma</span>
              </div>
              <div>
                <span className="font-bold text-white block">Systems & Desktop Development:</span>
                <span className="text-neutral-300">Java Swing GUI, OOP Principles, Systems Analysis & Design, Modular Architecture</span>
              </div>
              <div>
                <span className="font-bold text-white block">Backend, Cloud & Data:</span>
                <span className="text-neutral-300">Cloudflare Pages, Cloudflare Workers & KV, REST APIs, Web Storage API, MySQL Concepts</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-white block">Workflow & Professional Skills:</span>
                <span className="text-neutral-300">Git/GitHub Version Control, VS Code, Technical Documentation, Teamwork, Adaptability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { CERTIFICATIONS, Certification } from "@/data/portfolioData";
import { Award, ExternalLink, Download, CheckCircle2, ShieldCheck, X, ZoomIn, Calendar, Sparkles } from "lucide-react";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 sm:py-32 border-b border-[#292929] relative bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
              <span className="text-[rgb(165,56,96)] font-bold">05 //</span> VERIFIED CREDENTIALS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              CERTIFICATIONS <br />
              <span className="text-neutral-400">
                &amp; <span className="text-[rgb(194,76,120)]">ACCOLADES.</span>
              </span>
            </h2>
          </div>

          <div className="text-xs font-mono text-[#A0A0A0] max-w-sm uppercase space-y-1">
            <p className="text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
              Verified industry &amp; academic certifications album.
            </p>
          </div>
        </div>

        {/* Certifications Grid / Album */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="lg:col-span-8 rounded-2xl border border-[#292929] bg-[#0E0E0E] p-6 sm:p-8 relative overflow-hidden group transition-all duration-500 hover:border-[rgb(165,56,96)]/70 hover:shadow-[0_0_35px_rgba(165,56,96,0.2)]"
            >
              {/* Header meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#222222]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#161616] border border-[#282828] text-[rgb(194,76,120)]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {cert.credentialLevel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full border border-[rgb(165,56,96)]/50 bg-[rgb(165,56,96)]/15 text-[rgb(194,76,120)] text-[11px] font-mono font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    VERIFIED CREDENTIAL
                  </span>
                </div>
              </div>

              {/* Certificate Preview & Content Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
                {/* Visual Certificate Frame */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="md:col-span-6 relative aspect-[1.414/1] w-full rounded-xl overflow-hidden border border-[#2A2A2A] bg-white cursor-pointer group/img shadow-xl hover:border-[rgb(165,56,96)] transition-all duration-300"
                >
                  <Image
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-mono font-bold text-black shadow-lg">
                      <ZoomIn className="h-3.5 w-3.5 text-[rgb(165,56,96)]" />
                      View Certificate
                    </span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 flex items-center gap-2 mt-1">
                      <Calendar className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
                      <span>Issued on {cert.issueDate}</span>
                    </p>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Competencies */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      VERIFIED PROFICIENCIES:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-md border border-[#262626] bg-[#141414] px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:border-[rgb(165,56,96)]/60 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-mono font-bold uppercase text-black hover:bg-neutral-100 hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] transition-all"
                    >
                      <ZoomIn className="h-3.5 w-3.5 text-[rgb(165,56,96)]" />
                      <span>Preview Image</span>
                    </button>

                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        download
                        className="inline-flex items-center gap-2 rounded-lg border border-[#292929] bg-[#151515] px-4 py-2 text-xs font-mono uppercase text-white hover:border-[rgb(165,56,96)] hover:bg-[#1A1A1A] transition-colors"
                      >
                        <Download className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
                        <span>Download PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Album Info & Future Credentials Showcase */}
          <div className="lg:col-span-4 rounded-2xl border border-[#292929] bg-[#0C0C0C] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#202020] pb-3 font-mono">
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                ACCREDITATION LEDGER
              </span>
              <span className="text-[10px] text-[rgb(194,76,120)] font-semibold">
                ACTIVE LEARNER
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#222222] bg-[#111111] p-4 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[rgb(194,76,120)] tracking-wider block">
                  LATEST ACCOMPLISHMENT
                </span>
                <p className="text-sm font-bold text-white">
                  Cisco Networking Academy Credential
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Earned November 2026, affirming strong core competencies in operating system architectures, shell scripting, and security fundamentals.
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-[#292929] bg-[#0E0E0E] p-4 space-y-2 text-neutral-400 font-mono text-xs">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                  CONTINUOUS LEARNING
                </span>
                <p className="text-xs text-neutral-300">
                  Currently pursuing advanced certifications in Full-Stack Web Architecture, Cloud Deployment, and Systems Security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Certificate Full Preview */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setSelectedCert(null)} />

          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-[rgb(165,56,96)]/70 bg-[#0E0E0E] shadow-2xl z-10 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#252525] px-6 py-4 bg-[#141414]">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  {selectedCert.title}
                </h4>
                <p className="text-[11px] font-mono text-neutral-400">
                  {selectedCert.issuer} • {selectedCert.issueDate}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-mono font-bold uppercase text-black hover:bg-neutral-100 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-[rgb(165,56,96)]" />
                    <span>PDF</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg border border-[#292929] bg-[#1A1A1A] text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-[#050505]">
              <div className="relative w-full max-w-3xl aspect-[1.414/1] rounded-xl overflow-hidden shadow-2xl bg-white border border-[#333333]">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
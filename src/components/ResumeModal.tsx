"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Download, ExternalLink, FileText, Printer, CheckCircle2, ChevronRight, Eye } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<"pages" | "pdf">("pages");

  if (!isOpen) return null;

  const cvPdfUrl = "/Sharmaine_Jacob_CV.pdf";

  const handlePrint = () => {
    window.open(cvPdfUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl border border-[rgb(165,56,96)]/60 bg-[#0E0E0E] shadow-[0_0_60px_rgba(165,56,96,0.25)] z-10 overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#252525] px-4 sm:px-6 py-3.5 bg-[#141414] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[rgb(194,76,120)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                CURRICULUM VITAE
              </span>
            </div>
            <span className="text-[10px] font-mono text-[rgb(194,76,120)] bg-[rgb(165,56,96)]/15 px-2.5 py-0.5 rounded border border-[rgb(165,56,96)]/40 hidden sm:inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
              ORIGINAL PDF • 2 PAGES
            </span>
          </div>

          {/* Actions & Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle (Desktop only) */}
            <div className="hidden md:flex items-center rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] p-0.5 text-[11px] font-mono">
              <button
                onClick={() => setViewMode("pages")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === "pages"
                    ? "bg-[rgb(165,56,96)] text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Page View
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === "pdf"
                    ? "bg-[rgb(165,56,96)] text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                PDF Embed
              </button>
            </div>

            {/* Download Button */}
            <a
              href={cvPdfUrl}
              download="Sharmaine_Jacob_CV.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-mono font-bold uppercase text-black hover:bg-neutral-100 hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] transition-all"
              title="Download Original PDF"
            >
              <Download className="h-3.5 w-3.5 text-[rgb(165,56,96)]" />
              <span className="hidden sm:inline">Download</span> PDF
            </a>

            {/* Open in New Window */}
            <button
              onClick={handlePrint}
              className="p-1.5 sm:px-3 sm:py-1.5 inline-flex items-center gap-1 rounded-lg border border-[#292929] bg-[#1A1A1A] text-xs font-mono text-neutral-300 hover:text-white hover:border-[rgb(165,56,96)] transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Open</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[#292929] bg-[#1A1A1A] text-neutral-400 hover:text-white hover:border-[rgb(165,56,96)] transition-colors"
              aria-label="Close CV Preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto bg-[#080808] p-3 sm:p-6 md:p-8">
          {viewMode === "pdf" ? (
            /* Native PDF embed iframe */
            <div className="w-full h-[78vh] rounded-xl overflow-hidden border border-[#292929] bg-[#111111]">
              <iframe
                src={`${cvPdfUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title="Sharmaine Jacob CV PDF"
              />
            </div>
          ) : (
            /* High-fidelity rendered PDF pages */
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Page 1 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
                    PAGE 01 — PROFILE SUMMARY, EDUCATION, CERTIFICATION &amp; PROJECTS
                  </span>
                  <span>1 OF 2</span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#2D2D2D] bg-white shadow-2xl transition-all duration-300 hover:border-[rgb(165,56,96)]/60">
                  <Image
                    src="/cv-page-1.png"
                    alt="Sharmaine A. Jacob Curriculum Vitae - Page 1"
                    width={1600}
                    height={2263}
                    priority
                    className="w-full h-auto block select-none"
                  />
                </div>
              </div>

              {/* Page 2 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
                    PAGE 02 — FEATURED PROJECTS CONTINUED
                  </span>
                  <span>2 OF 2</span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#2D2D2D] bg-white shadow-2xl transition-all duration-300 hover:border-[rgb(165,56,96)]/60">
                  <Image
                    src="/cv-page-2.png"
                    alt="Sharmaine A. Jacob Curriculum Vitae - Page 2"
                    width={1600}
                    height={2263}
                    className="w-full h-auto block select-none"
                  />
                </div>
              </div>

              {/* Footer action pill */}
              <div className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#222222] text-xs font-mono text-neutral-400">
                <span>Sharmaine A. Jacob • Official Curriculum Vitae</span>
                <a
                  href={cvPdfUrl}
                  download="Sharmaine_Jacob_CV.pdf"
                  className="inline-flex items-center gap-2 text-white hover:text-[rgb(194,76,120)] transition-colors underline underline-offset-4"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Complete PDF File (2 Pages)
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
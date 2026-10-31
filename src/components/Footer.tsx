"use client";

import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#292929] py-14 relative select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-12 border-b border-[#202020]">
          {/* Brand & Title */}
          <div className="md:col-span-6 space-y-2">
            <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Sharmaine A. <span className="text-[rgb(194,76,120)]">Jacob</span>
            </span>
            <p className="text-xs font-mono text-neutral-400">
              BSIT Student • <span className="text-neutral-300">System Development Track</span> • PHINMA Cagayan de Oro College
            </p>
          </div>

          {/* Social Links & Back To Top */}
          <div className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-4">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-[#292929] bg-[#111111] text-neutral-300 hover:text-white hover:border-[rgb(165,56,96)] hover:shadow-[0_0_12px_rgba(165,56,96,0.25)] transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-[#292929] bg-[#111111] text-neutral-300 hover:text-white hover:border-[rgb(165,56,96)] hover:shadow-[0_0_12px_rgba(165,56,96,0.25)] transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-lg border border-[#292929] bg-[#111111] text-neutral-300 hover:text-white hover:border-[rgb(165,56,96)] hover:shadow-[0_0_12px_rgba(165,56,96,0.25)] transition-all"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-lg border border-[#292929] bg-[#111111] px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_15px_rgba(165,56,96,0.25)] transition-all"
            >
              <span>Back To Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:text-[rgb(194,76,120)]" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p>© 2026 Sharmaine A. Jacob. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Designed &amp; Engineered with Next.js, TypeScript &amp; Tailwind CSS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ArrowUpRight, ExternalLink, Layers, Sparkles, Terminal, Code2, X, CheckCircle } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filters = ["All", "Full-Stack Web", "Systems & Desktop", "Civic & Community", "Interactive & Logic", "Mobile Application"];

  const filteredProjects = selectedFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  const featuredPrimary = PROJECTS.find((p) => p.id === "cozier");
  const otherProjects = filteredProjects;

  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-[#292929] relative bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
              <span className="text-[rgb(165,56,96)] font-bold">03 //</span> SELECTED WORKS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              ENGINEERED SYSTEMS. <br />
              <span className="text-neutral-400">
                VERIFIED <span className="text-[rgb(194,76,120)]">CODEBASES.</span>
              </span>
            </h2>
          </div>
          <div className="text-xs font-mono text-[#A0A0A0] max-w-sm uppercase space-y-1">
            <p>// Inspected from GitHub @Chvine & academic deliverables.</p>
            <p className="text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
              Total catalog: {PROJECTS.length} verified projects.
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-[#292929] mb-12">
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;
            const count = filter === "All"
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category === filter).length;

            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-lg px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-[0_0_16px_rgba(165,56,96,0.3)] border border-[rgb(165,56,96)]/60"
                    : "border border-[#292929] bg-[#111111] text-neutral-400 hover:border-[rgb(165,56,96)]/60 hover:text-white"
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`ml-2 text-[10px] px-1.5 py-0.2 rounded ${
                    isSelected ? "bg-[rgb(165,56,96)]/20 text-[rgb(130,42,75)] font-bold" : "bg-[#1E1E1E] text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Primary Featured Hero Showcase (Cozier) - Only when "All" or "Full-Stack Web" */}
        {(selectedFilter === "All" || selectedFilter === "Full-Stack Web") && featuredPrimary && (
          <div className="mb-14 rounded-2xl border border-[#333333] bg-[#0E0E0E] p-8 md:p-12 relative overflow-hidden group transition-all duration-500 hover:border-[rgb(165,56,96)]/90 hover:shadow-[0_0_35px_rgba(165,56,96,0.22)]">
            {/* Top label */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#222222]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-[rgb(165,56,96)] text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(165,56,96,0.6)]">
                  PRIMARY FEATURED
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {featuredPrimary.type} • {featuredPrimary.timeline}
                </span>
              </div>
              <span className="text-xs font-mono text-[rgb(194,76,120)] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
                {featuredPrimary.metrics}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-2">
                    {featuredPrimary.title}
                  </h3>
                  <p className="text-sm font-mono text-[rgb(194,76,120)] uppercase tracking-wider">
                    {featuredPrimary.tagline}
                  </p>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {featuredPrimary.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Core Architectural Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-mono">
                    {featuredPrimary.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 bg-[#141414] border border-[#252525] p-2.5 rounded group-hover:border-[rgb(165,56,96)]/30 transition-colors">
                        <span className="text-[rgb(194,76,120)] mt-0.5">•</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredPrimary.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="rounded border border-[#292929] bg-[#161616] px-2.5 py-1 text-xs font-mono text-neutral-300 hover:border-[rgb(165,56,96)]/60 hover:text-white transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {featuredPrimary.githubUrl && (
                    <a
                      href={featuredPrimary.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-100 hover:border-[rgb(165,56,96)] hover:shadow-[0_0_20px_rgba(165,56,96,0.3)]"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>Inspect Repository</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[rgb(165,56,96)]" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalProject(featuredPrimary)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#292929] bg-[#141414] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[rgb(165,56,96)] hover:bg-[#181818] transition-colors"
                  >
                    <span>View Architecture</span>
                  </button>
                </div>
              </div>

              {/* Right Technical Blueprint Graphic */}
              <div className="lg:col-span-5 bg-[#080808] border border-[#252525] rounded-xl p-6 font-mono text-xs text-neutral-300 space-y-4">
                <div className="flex items-center justify-between border-b border-[#202020] pb-3 text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-[rgb(194,76,120)]" />
                    cozier_files/architecture.tree
                  </span>
                  <span className="text-[rgb(194,76,120)] text-[10px] bg-[rgb(165,56,96)]/15 px-2 py-0.5 rounded border border-[rgb(165,56,96)]/30">
                    VERIFIED
                  </span>
                </div>
                <pre className="text-[11px] leading-relaxed text-neutral-400 overflow-x-auto">
{`cozier/
├── index.html          # Main SPA Entry
├── wrangler.toml       # Cloudflare Pages Config
├── js/
│   ├── config.js       # Zero-Hardcoding Rules
│   ├── products.js     # Catalog & Filters
│   └── app.js          # Cart & Checkout Logic
└── functions/
    └── api/
        └── orders.js   # Serverless KV Endpoint`}
                </pre>
                <div className="border-t border-[#202020] pt-3 text-[11px] text-neutral-400 space-y-1">
                  <p className="text-white font-semibold">Zero-Hardcoding Design Pattern:</p>
                  <p>All prices, shipping tiers, promo discounts, and order schemas are decoupled from UI components.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-[#292929] bg-[#0E0E0E] p-6 transition-all duration-300 hover:border-[rgb(165,56,96)]/80 hover:bg-[#131313] hover:shadow-[0_0_24px_rgba(165,56,96,0.18)] hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Meta Top */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-[#202020] pb-3">
                  <span className="uppercase text-[rgb(194,76,120)] font-medium">{project.category}</span>
                  <span>{project.timeline}</span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1 line-clamp-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Key feature preview */}
                <div className="rounded bg-[#151515] border border-[#242424] border-l-2 border-l-[rgb(165,56,96)] p-2.5 text-[11px] font-mono text-neutral-300">
                  <span className="text-white font-semibold block mb-1 uppercase text-[10px] text-[rgb(194,76,120)]">
                    Key Highlight:
                  </span>
                  <span>{project.features[0]}</span>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="rounded border border-[#222222] bg-[#171717] px-2 py-0.5 text-[11px] font-mono text-neutral-300 group-hover:border-[rgb(165,56,96)]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded border border-[#222222] bg-[#171717] px-1.5 py-0.5 text-[11px] font-mono text-neutral-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#202020]">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-mono font-semibold text-white hover:text-[rgb(194,76,120)] hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Details & Specs</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-[#292929] bg-[#141414] text-neutral-300 hover:text-white hover:border-[rgb(165,56,96)] hover:shadow-[0_0_12px_rgba(165,56,96,0.3)] transition-all"
                    aria-label={`GitHub repo for ${project.title}`}
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    Academic Deliverable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Case Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={() => setActiveModalProject(null)}
          />
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgb(165,56,96)]/60 bg-[#0E0E0E] p-6 sm:p-10 shadow-[0_0_50px_rgba(165,56,96,0.22)] z-10 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#252525] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[rgb(194,76,120)]">
                  {activeModalProject.category} // {activeModalProject.type} ({activeModalProject.timeline})
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-neutral-300 mt-1">
                  {activeModalProject.tagline}
                </p>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-lg border border-[#292929] bg-[#161616] text-neutral-400 hover:text-white hover:border-[rgb(165,56,96)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Narrative Overview */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                SYSTEM SPECIFICATIONS & ARCHITECTURE
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {activeModalProject.longDescription}
              </p>
            </div>

            {/* Implemented Features */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                VERIFIED CAPABILITIES & FEATURES
              </span>
              <div className="space-y-2">
                {activeModalProject.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-[#252525] bg-[#121212] p-3 text-xs font-mono text-neutral-300"
                  >
                    <CheckCircle className="h-4 w-4 text-[rgb(194,76,120)] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded border border-[#292929] bg-[#181818] px-3 py-1 text-xs font-mono text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#252525] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400">
                {activeModalProject.metrics || "Validated Academic System"}
              </span>

              <div className="flex items-center gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 hover:border-[rgb(165,56,96)] hover:shadow-[0_0_15px_rgba(165,56,96,0.3)] transition-all"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Open GitHub Repo</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[rgb(165,56,96)]" />
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="rounded-lg border border-[#292929] bg-[#161616] px-4 py-2.5 text-xs font-mono uppercase text-neutral-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

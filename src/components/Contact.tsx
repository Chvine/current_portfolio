"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errors.subject = "Please enter a subject.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch & prepare direct mailto option
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const openMailClient = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject || "Collaboration"}`);
    const body = encodeURIComponent(
      `Hi Sharmaine,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-b border-[#292929] relative bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-[rgb(165,56,96)] font-bold">06 //</span> GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            LET&apos;S BUILD SOMETHING <br />
            <span className="text-neutral-400">
              MEANINGFUL <span className="text-[rgb(194,76,120)]">TOGETHER.</span>
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl text-sm sm:text-base font-normal pt-2">
            Open to software development internships, junior engineering opportunities, capstone collaborations, and technical discussions.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Dossier & Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#292929] bg-[#111111] p-6 sm:p-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block border-b border-[#222222] pb-3">
                DIRECT CONTACT CHANNELS
              </span>

              {/* Email */}
              <div className="group rounded-xl border border-[#222222] bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-[rgb(165,56,96)]/80 hover:shadow-[0_0_20px_rgba(165,56,96,0.18)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-[rgb(194,76,120)]" />
                    EMAIL ADDRESS
                  </span>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, "email")}
                    className="text-neutral-400 hover:text-[rgb(194,76,120)] text-xs font-mono flex items-center gap-1 transition-colors"
                    title="Copy Email"
                  >
                    {copiedType === "email" ? (
                      <span className="text-[rgb(194,76,120)] flex items-center gap-1">
                        <Check className="h-3 w-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="h-3 w-3" /> Copy
                      </span>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm sm:text-base font-mono font-bold text-white hover:text-[rgb(194,76,120)] transition-colors block break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Phone */}
              <div className="group rounded-xl border border-[#222222] bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-[rgb(165,56,96)]/80 hover:shadow-[0_0_20px_rgba(165,56,96,0.18)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-[rgb(194,76,120)]" />
                    PHONE / MOBILE
                  </span>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, "phone")}
                    className="text-neutral-400 hover:text-[rgb(194,76,120)] text-xs font-mono flex items-center gap-1 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedType === "phone" ? (
                      <span className="text-[rgb(194,76,120)] flex items-center gap-1">
                        <Check className="h-3 w-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="h-3 w-3" /> Copy
                      </span>
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm sm:text-base font-mono font-bold text-white hover:text-[rgb(194,76,120)] transition-colors block"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div className="rounded-xl border border-[#222222] bg-[#0A0A0A] p-4 border-l-2 border-l-[rgb(165,56,96)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="h-3 w-3 text-[rgb(194,76,120)]" />
                  PHYSICAL LOCATION
                </span>
                <p className="text-sm font-mono font-medium text-white">
                  {PERSONAL_INFO.location}
                </p>
                <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                  Standard Philippine Time (UTC+8)
                </span>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-[#222222] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  PUBLIC PROFILES
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#252525] bg-[#0E0E0E] p-3 text-xs font-mono text-neutral-300 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_12px_rgba(165,56,96,0.2)] transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-[rgb(194,76,120)]" />
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#252525] bg-[#0E0E0E] p-3 text-xs font-mono text-neutral-300 hover:border-[rgb(165,56,96)] hover:text-white hover:shadow-[0_0_12px_rgba(165,56,96,0.2)] transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="h-4 w-4" />
                      LinkedIn
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-[rgb(194,76,120)]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#292929] bg-[#111111] p-6 sm:p-10 relative">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block border-b border-[#222222] pb-4 mb-6">
                DISPATCH A DIRECT MESSAGE
              </span>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[rgb(165,56,96)]/60 bg-[rgb(165,56,96)]/15 text-[rgb(194,76,120)] shadow-[0_0_25px_rgba(165,56,96,0.35)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Message Formatted &amp; Ready
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-mono max-w-md mx-auto">
                      Thank you, {formData.name}. Your inquiry has been prepared. You can also trigger your local email client with your exact message prefilled:
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <button
                      onClick={openMailClient}
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 hover:border-[rgb(165,56,96)] hover:shadow-[0_0_20px_rgba(165,56,96,0.35)] transition-all"
                    >
                      <Mail className="h-4 w-4 text-[rgb(165,56,96)]" />
                      <span>Launch In Default Mail Client</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="rounded-lg border border-[#292929] bg-[#181818] px-5 py-3 text-xs font-mono uppercase text-neutral-300 hover:text-white"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
                        Your Name <span className="text-[rgb(194,76,120)]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                        }}
                        placeholder="e.g. Alex Rivera"
                        className={`w-full rounded-lg border bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[rgb(165,56,96)] focus:border-[rgb(165,56,96)] transition-all font-mono ${
                          formErrors.name ? "border-red-500" : "border-[#292929]"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] font-mono text-red-400">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
                        Your Email <span className="text-[rgb(194,76,120)]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full rounded-lg border bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[rgb(165,56,96)] focus:border-[rgb(165,56,96)] transition-all font-mono ${
                          formErrors.email ? "border-red-500" : "border-[#292929]"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] font-mono text-red-400">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
                      Subject / Topic <span className="text-[rgb(194,76,120)]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (formErrors.subject) setFormErrors({ ...formErrors, subject: "" });
                      }}
                      placeholder="e.g. Internship Opportunity / System Capstone Project"
                      className={`w-full rounded-lg border bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[rgb(165,56,96)] focus:border-[rgb(165,56,96)] transition-all font-mono ${
                        formErrors.subject ? "border-red-500" : "border-[#292929]"
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="text-[11px] font-mono text-red-400">{formErrors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
                      Your Message <span className="text-[rgb(194,76,120)]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: "" });
                      }}
                      placeholder="Detail your inquiry, project scope, or opportunity..."
                      className={`w-full rounded-lg border bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[rgb(165,56,96)] focus:border-[rgb(165,56,96)] transition-all font-mono resize-none ${
                        formErrors.message ? "border-red-500" : "border-[#292929]"
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] font-mono text-red-400">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-neutral-100 hover:border-[rgb(165,56,96)] hover:shadow-[0_0_25px_rgba(165,56,96,0.35)] active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Dispatch...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-[rgb(165,56,96)]" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

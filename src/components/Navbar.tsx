"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";

interface NavbarProps {
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phTime, setPhTime] = useState("");

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  // Clock in Cagayan de Oro (PH Time, UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setPhTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll spy & navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((link) => link.id);
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-md border-b border-[#292929] py-3.5 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="group flex flex-col"
          >
            <span className="text-sm font-semibold tracking-wider text-white uppercase group-hover:text-neutral-200 transition-colors">
              Sharmaine A. Jacob
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />
              System Development
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[#292929] bg-[#111111]/70 px-4 py-1.5 backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-[#A0A0A0] hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-5 bg-[rgb(165,56,96)] shadow-[0_0_8px_rgba(165,56,96,0.9)] rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action / Status */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex flex-col items-end text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CDO, PH: {phTime || "PH TIME"}
              </span>
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-[rgb(165,56,96)]" />
                AVAILABLE FOR ROLES
              </span>
            </div>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="group relative inline-flex items-center gap-2 rounded-lg border border-[#292929] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-neutral-100 hover:border-[rgb(165,56,96)] hover:shadow-[0_0_15px_rgba(165,56,96,0.35)] active:scale-95"
              >
                <span>CV Preview</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[rgb(165,56,96)]" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#292929] bg-[#111111] text-white hover:border-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#0C0C0C] border-l border-[#292929] p-8 flex flex-col justify-between transition-transform duration-500 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-16 space-y-6">
            <div className="border-b border-[#292929] pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
                NAVIGATION
              </span>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-xl font-bold uppercase tracking-tight transition-all flex items-center gap-2 ${
                    activeSection === link.id
                      ? "text-[rgb(194,76,120)] translate-x-2"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {activeSection === link.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)]" />
                  )}
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#292929]">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>LOCAL TIME (CDO)</span>
              <span className="text-white">{phTime}</span>
            </div>
            {onOpenResume && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 rounded-lg bg-white text-black text-center text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 hover:border-[rgb(165,56,96)] transition-all shadow-[0_0_15px_rgba(165,56,96,0.25)]"
              >
                View & Download CV
              </button>
            )}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="block w-full py-3 rounded-lg border border-[rgb(165,56,96)]/50 bg-[#111111] text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-[rgb(165,56,96)]/20 hover:border-[rgb(165,56,96)] transition-colors"
            >
              Contact Sharmaine
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

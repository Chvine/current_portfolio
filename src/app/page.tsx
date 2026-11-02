"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Intro Preloader */}
      <Preloader />

      {/* Ultra-smooth hardware-accelerated interactive cursor & spotlight */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenResume={() => setResumeOpen(true)} />

      {/* Technical Marquee */}
      <Marquee />

      {/* About Section */}
      <About />

      {/* Technical Skills Section */}
      <Skills />

      {/* Projects Showcase */}
      <Projects />

      {/* Education Timeline */}
      <Education />

      {/* Certifications Album */}
      <Certifications />

      {/* Contact Section */}
      <Contact />

      {/* Editorial Footer */}
      <Footer />

      {/* Printable / Viewable Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}

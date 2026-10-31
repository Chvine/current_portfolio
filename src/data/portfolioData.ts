export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Full-Stack Web" | "Systems & Desktop" | "Civic & Community" | "Interactive & Logic";
  type: "Individual Project" | "Group Project" | "Mini-Project";
  timeline: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    verifiedIn: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Sharmaine A. Jacob",
  nickname: "Sharmaine",
  title: "Information Technology Student | Aspiring Software Developer",
  shortRole: "Software Developer & System Builder",
  specialization: "System Development",
  school: "PHINMA Cagayan de Oro College",
  educationPeriod: "June 2024 – April 2027",
  degree: "Bachelor of Science in Information Technology (BSIT)",
  status: "Undergraduate (Ongoing)",
  location: "Cagayan de Oro City, Misamis Oriental, Philippines",
  timezone: "Asia/Manila (UTC+8)",
  email: "sharmainejacob549@gmail.com",
  phone: "090707072820",
  github: "https://github.com/Chvine",
  githubUsername: "Chvine",
  linkedin: "https://www.linkedin.com/in/sharmaine-jacob-8a828",
  heroHeadline: "BUILDING IDEAS INTO DIGITAL EXPERIENCES.",
  heroSubtext:
    "Information Technology student specializing in System Development. Crafting robust software systems, modern web platforms, and practical digital solutions with clean architecture and intentional design.",
  bio: [
    "Hi! I’m Sharmaine Jacob, a Bachelor of Science in Information Technology student at PHINMA Cagayan de Oro College, specializing in System Development.",
    "I am passionate about learning new technologies and creating useful digital solutions. I have knowledge and experience in Python, Java, JavaScript, HTML, PHP, CSS, React, and Next.js. I also have experience working with MySQL for database management and using Bootstrap for creating responsive and user-friendly website designs.",
    "Through my academic projects, I have developed different systems, including a riddle game, lending management system, healthcare appointment system, and apparel ordering system. These projects helped me improve my programming, database, problem-solving, teamwork, and adaptability skills.",
    "I am continuously learning and improving my skills in web and system development. My goal is to apply my knowledge to real-world projects, create useful and innovative systems, and grow as an IT professional.",
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "cozier",
    title: "Cozier",
    tagline: "Minimalist E-Commerce Platform & Order Tracking Dashboard",
    category: "Full-Stack Web",
    type: "Individual Project",
    timeline: "October 2026",
    featured: true,
    description:
      "A clean, minimalist e-commerce web application engineered for an independent clothing label in Cagayan de Oro, featuring serverless order tracking and Cloudflare Pages KV integration.",
    longDescription:
      "Cozier is an end-to-end e-commerce single-page application built with modular JavaScript architecture and deployed on Cloudflare Pages. It implements a zero-hardcoding configuration engine, interactive product filtering, slide-out shopping drawer, dynamic promo code system (percentage and flat discounts), automated checkout validation, and a serverless order fulfillment dashboard backed by Cloudflare KV.",
    features: [
      "Dynamic shopping bag state with live tax, delivery thresholds, and promo validation",
      "Serverless Cloudflare Pages Function (/api/orders) with Key-Value (KV) persistence",
      "Order tracking search dashboard with real-time status resolution",
      "Zero-hardcoding configuration pattern separating product data from business logic",
      "Bespoke editorial typography and responsive mobile layout",
    ],
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Cloudflare Pages", "Cloudflare Workers & KV", "REST API"],
    githubUrl: "https://github.com/Chvine/cozier",
    metrics: "Production-ready SPA with serverless KV storage",
  },
  {
    id: "sari-sari-pos",
    title: "Tindahan ni Ante",
    tagline: "Web-Based Sari-Sari Store Point-of-Sale & Cashiering System",
    category: "Full-Stack Web",
    type: "Individual Project",
    timeline: "August 2026",
    featured: true,
    description:
      "A lightweight, zero-database POS cashiering system built for micro-retail stores, featuring real-time stock management, statutory discounts, and printable receipts.",
    longDescription:
      "Designed specifically for the operational reality of neighborhood sari-sari stores in the Philippines. Tindahan ni Ante streamlines counter cashiering without expensive server infrastructure. It manages inventory state in memory, processes real-time transactions, applies statutory 20% Senior Citizen and PWD discounts, records timestamped history, and renders formatted digital receipts.",
    features: [
      "Real-time inventory deduction and automatic out-of-stock guardrails",
      "Senior Citizen / PWD 20% discount calculation engine complying with Philippine standards",
      "Dynamic digital receipt formatting ready for thermal or standard printing",
      "Transaction history ledger with total sales metrics and summary statistics",
      "Intuitive high-contrast UI tailored for rapid keypad or touch entry",
    ],
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Web Storage API", "Event-Driven Architecture"],
    githubUrl: "https://github.com/Chvine/Sari-sari-Store-POS-Cashiering-System",
    metrics: "Instantaneous client-side cashiering and receipt engine",
  },
  {
    id: "barangay-canitoan",
    title: "Barangay Canitoan Official Portal",
    tagline: "Civic Public Information Platform & Service Hub",
    category: "Civic & Community",
    type: "Mini-Project",
    timeline: "July 2026",
    featured: true,
    description:
      "Modern municipal web portal serving residents of Barangay Canitoan, Cagayan de Oro City with digital service directories, emergency hotlines, and community announcements.",
    longDescription:
      "Developed for the Advance Programming course at PHINMA COC, this comprehensive 8-section municipal hub modernizes public sector access. Built with semantic HTML5, modern CSS Grid/Flexbox, and lightweight JavaScript, it provides instant tap-to-call 24/7 emergency dispatch, frontline document application requirements, an interactive lightbox community gallery, and embedded zone mapping.",
    features: [
      "8 dedicated public service modules (Certificates, Clearance, Permits, Zones, Officials)",
      "Actionable tap-to-call emergency dispatch directory for mobile residents",
      "Interactive lightbox gallery with zero external heavy framework dependencies",
      "Glassmorphic navigation with smooth scroll anchors and mobile drawer menu",
      "Live geographic embed accurately mapping the Barangay Hall in Zone 2",
    ],
    technologies: ["HTML5", "CSS3 Grid & Flexbox", "Vanilla JavaScript", "Glassmorphism UI", "Cloudflare Pages"],
    githubUrl: "https://github.com/Chvine/barangay-website",
    metrics: "8 complete modules deployed live via Cloudflare Pages",
  },
  {
    id: "apparel-ordering",
    title: "Apparel Ordering & Management System",
    tagline: "Desktop Tailoring & Printing Order Management Software",
    category: "Systems & Desktop",
    type: "Group Project",
    timeline: "October 2025",
    description:
      "A desktop software solution engineered in Java to streamline customer custom garment orders, tailoring measurements, print specifications, and billing.",
    longDescription:
      "Developed as a collaborative system development project, this desktop application replaces disorganized manual paperwork for bespoke tailoring and silkscreen/sublimation printing shops. It tracks customer measurements, material inventories, printing techniques, job completion stages, and automated balance invoicing.",
    features: [
      "Custom order intake forms capturing sizing matrices, fabric choices, and artwork details",
      "Order lifecycle tracking from Intake to In-Production, Ready-for-Fitting, and Released",
      "Automated total billing with downpayment and balance computations",
      "Structured Java Swing interface built on strict Object-Oriented principles",
    ],
    technologies: ["Java", "Java Swing GUI", "OOP Architecture", "File I/O"],
    metrics: "Comprehensive desktop order lifecycle management",
  },
  {
    id: "healthcare-system",
    title: "Healthcare Appointment System",
    tagline: "Console-Based Clinical Patient & Consultation Scheduler",
    category: "Systems & Desktop",
    type: "Group Project",
    timeline: "October 2024",
    description:
      "Modular Python clinical scheduler handling patient registration, physician rosters, consultation bookings, and calendar cancellations.",
    longDescription:
      "A console-based software system built to organize clinical consultation queues. Features secure authentication for patients and desk administrators, department-based physician matching, real-time timeslot reservation algorithms, and consultation conflict prevention.",
    features: [
      "Patient registration and credential authentication flow",
      "Specialty physician catalog with day/time consultation windows",
      "Timeslot conflict detector preventing overlapping appointments",
      "Cancellation, itinerary review, and appointment rescheduling routines",
    ],
    technologies: ["Python", "Data Structures", "CLI / Terminal UI", "Modular Systems"],
    metrics: "Zero-conflict scheduling algorithm in Python",
  },
  {
    id: "lending-system",
    title: "Lending Management System",
    tagline: "Borrower Portfolio & Amortization Tracking Application",
    category: "Systems & Desktop",
    type: "Group Project",
    timeline: "March 2024",
    description:
      "Java GUI software for managing borrower accounts, repayment terms, interest rates, and loan balance disbursements.",
    longDescription:
      "Engineered to help micro-credit lenders organize their client records and payment cycles. The system automates amortization schedules, flags overdue balances, records repayment installments, and maintains contact dossiers for borrowers.",
    features: [
      "Borrower profiling with identity records and collateral logging",
      "Automated loan interest and amortization schedule calculator",
      "Outstanding balance reconciliation and payment ledger",
      "Search and filter records by borrower name or loan status",
    ],
    technologies: ["Java", "Java GUI / Swing", "Financial Calculation Logic", "Data Modeling"],
    metrics: "Financial amortization calculations and borrower ledger",
  },
  {
    id: "braingle-game",
    title: "Braingle Riddle & Logic Game",
    tagline: "Terminal-Based Interactive Logic & Puzzle Game",
    category: "Interactive & Logic",
    type: "Group Project",
    timeline: "September 2023",
    description:
      "An engaging Python interactive text adventure featuring curated riddle tiers, progressive difficulty scaling, and hint mechanics.",
    longDescription:
      "A creative programming project exploring interactive command-line gameplay and control-flow architectures. Players navigate multiple difficulty tiers of riddles, utilizing limited hint tokens while the engine tracks accuracy, streaks, and final cognitive ratings.",
    features: [
      "Tiered progression system unlocking harder logic questions upon success",
      "Hint revelation logic with intelligent score penalties",
      "Robust input sanitization tolerating minor grammatical variations",
      "Formatted terminal output with ASCII visual flourishes",
    ],
    technologies: ["Python", "Algorithms", "Game Logic Design", "Terminal UX"],
    metrics: "Multi-tiered progressive riddle engine",
  },
  {
    id: "math-for-kids",
    title: "Math for Kids",
    tagline: "Interactive Arithmetic Learning Web Platform",
    category: "Interactive & Logic",
    type: "Individual Project",
    timeline: "July 2026",
    description:
      "A playful, responsive web educational tool designed to help elementary students build confidence in foundational math through visual exercises.",
    longDescription:
      "Built with clean HTML, CSS animations, and vanilla JavaScript, Math for Kids delivers instant gratification through colorful visual rewards, arithmetic problem generators, and error-resilient exercises.",
    features: [
      "Randomized arithmetic problem generators for addition, subtraction, and multiplication",
      "Immediate positive feedback loops with responsive CSS animations",
      "Kid-friendly UI with high contrast and intuitive touch targets",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3 Keyframe Animations"],
    githubUrl: "https://github.com/Chvine/math-for-kids",
    metrics: "Interactive arithmetic generation with instant feedback",
  },
  {
    id: "language-learning",
    title: "Language Learning Web",
    tagline: "Modular Language Study & Drill Platform",
    category: "Full-Stack Web",
    type: "Individual Project",
    timeline: "April 2025",
    description:
      "An accessible educational web application providing structured vocabulary units, phonetic flashcards, and self-assessment modules.",
    longDescription:
      "An early web development exploration into educational interfaces, focusing on clean layout hierarchy, intuitive step-by-step lesson navigation, and interactive knowledge retention drills.",
    features: [
      "Structured lesson modules categorized by topic and proficiency level",
      "Interactive flashcard flip animations for vocabulary retention",
      "Progress tracking within the current learning session",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/Chvine/Language-Learning-Web",
    metrics: "Lightweight educational web application",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages used across academic coursework, systems development, and personal projects.",
    skills: [
      { name: "Python", level: "Intermediate", verifiedIn: "Braingle Game, Healthcare App" },
      { name: "Java", level: "Intermediate", verifiedIn: "Lending System, Apparel System (GUI)" },
      { name: "JavaScript (ES6+)", level: "Advanced", verifiedIn: "Cozier SPA, Tindahan ni Ante POS, Math for Kids" },
      { name: "PHP", level: "Academic", verifiedIn: "Advance Programming coursework" },
      { name: "HTML5", level: "Advanced", verifiedIn: "Barangay Canitoan, Cozier, POS, Portfolios" },
      { name: "CSS3 / Modern CSS", level: "Advanced", verifiedIn: "Flexbox, Grid, Glassmorphism, Animations" },
    ],
  },
  {
    title: "Frontend & UI Engineering",
    description: "Creating responsive, accessible, and high-impact digital interfaces.",
    skills: [
      { name: "React & Next.js", level: "Intermediate", verifiedIn: "Modern web application development & portfolio" },
      { name: "Bootstrap", level: "Intermediate", verifiedIn: "Responsive and user-friendly web designs" },
      { name: "Responsive Web Design", level: "Advanced", verifiedIn: "Mobile-first layouts across all web projects" },
      { name: "Tailwind CSS", level: "Intermediate", verifiedIn: "Modern portfolio & utility-first workflows" },
      { name: "DOM Manipulation & Events", level: "Advanced", verifiedIn: "Tindahan ni Ante POS & Cozier cart state" },
      { name: "CSS Grid & Flexbox", level: "Advanced", verifiedIn: "Barangay Canitoan official layout" },
      { name: "Glassmorphism & Micro-animations", level: "Advanced", verifiedIn: "Barangay portal navbar & UI cards" },
      { name: "UI/UX Prototyping (Canva / Figma)", level: "Proficient", verifiedIn: "Design layouts and system flowcharts" },
    ],
  },
  {
    title: "System & Desktop Development",
    description: "Building functional desktop software, business logic, and structured architectures.",
    skills: [
      { name: "Java Swing GUI", level: "Intermediate", verifiedIn: "Apparel Ordering & Lending Systems" },
      { name: "Object-Oriented Programming (OOP)", level: "Intermediate", verifiedIn: "Java & Python system design" },
      { name: "Systems Analysis & Design", level: "Academic", verifiedIn: "BSIT Specialization in System Development" },
      { name: "Business Logic & Financial Math", level: "Intermediate", verifiedIn: "POS discount engine, Loan amortization" },
      { name: "Modular Architecture", level: "Intermediate", verifiedIn: "Config-driven project structuring" },
    ],
  },
  {
    title: "Backend, Cloud & Data",
    description: "Deploying serverless web services and structuring reliable data storage.",
    skills: [
      { name: "Cloudflare Pages", level: "Intermediate", verifiedIn: "Cozier and Barangay Canitoan deployment" },
      { name: "Cloudflare Workers & KV", level: "Intermediate", verifiedIn: "Cozier serverless order fulfillment" },
      { name: "RESTful API Integration", level: "Intermediate", verifiedIn: "Cloudflare serverless functions" },
      { name: "Database Concepts & MySQL", level: "Academic", verifiedIn: "BSIT Database Management coursework" },
      { name: "Web Storage API (LocalStorage)", level: "Advanced", verifiedIn: "POS transaction caching" },
      { name: "JSON Data Modeling", level: "Advanced", verifiedIn: "Catalog configuration & order storage" },
    ],
  },
  {
    title: "Development Tools & Workflow",
    description: "Everyday developer tooling and collaborative methodologies.",
    skills: [
      { name: "Git & GitHub", level: "Proficient", verifiedIn: "Version control across 8+ public repositories" },
      { name: "Visual Studio Code", level: "Proficient", verifiedIn: "Primary code editor & extension workflows" },
      { name: "Wrangler CLI", level: "Intermediate", verifiedIn: "Cloudflare deployment workflows" },
      { name: "Team Collaboration & Agile Basics", level: "Proficient", verifiedIn: "4 group academic systems" },
      { name: "Technical Documentation", level: "Proficient", verifiedIn: "Detailed READMEs & project architectures" },
    ],
  },
];

export const EDUCATION_TIMELINE = [
  {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    institution: "PHINMA Education – Cagayan de Oro College",
    campus: "Cagayan de Oro City, Philippines",
    period: "June 2024 – April 2027",
    status: "Currently Enrolled (Undergraduate)",
    specialization: "System Development",
    description:
      "Intensive undergraduate education focusing on software engineering principles, full-stack web applications, relational database design, systems analysis, and enterprise desktop solutions.",
    keyCoursework: [
      "Advanced Computer Programming",
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Systems Analysis & Design",
      "Web Systems & Technologies",
      "Information Assurance & Security",
      "Human-Computer Interaction (HCI)",
    ],
    highlights: [
      "Specializing directly in System Development track",
      "Consistently building real-world group systems and community web portals",
      "Active team player in academic system design presentations and defense",
    ],
  },
];

"use client";

export default function Marquee() {
  const items = [
    "SYSTEM DEVELOPMENT",
    "FULL-STACK WEB",
    "PYTHON & JAVA ARCHITECTURE",
    "CLOUDFLARE PAGES & WORKERS",
    "POINT-OF-SALE SYSTEMS",
    "CIVIC & PUBLIC PORTALS",
    "PHINMA CAGAYAN DE ORO COLLEGE",
    "CLEAN ARCHITECTURE",
    "RESPONSIVE UI/UX",
    "VERIFIED GITHUB CODE",
  ];

  return (
    <div className="relative w-full overflow-hidden border-b border-[#292929] bg-[#0A0A0A] py-4 select-none">
      <div className="flex w-[200%] animate-marquee">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-6">
              <span className={`text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase ${
                index % 3 === 0 ? "text-[rgb(194,76,120)]" : "text-neutral-300"
              }`}>
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)] shadow-[0_0_6px_rgba(165,56,96,0.8)]" />
            </div>
          ))}
        </div>
        <div className="flex min-w-full shrink-0 items-center justify-around gap-8" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-6">
              <span className={`text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase ${
                index % 3 === 0 ? "text-[rgb(194,76,120)]" : "text-neutral-300"
              }`}>
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(165,56,96)] shadow-[0_0_6px_rgba(165,56,96,0.8)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

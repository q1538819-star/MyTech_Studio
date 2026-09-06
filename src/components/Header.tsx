import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const LINKS = [
  { href: "#ateliers", label: "Ateliers" },
  { href: "#methode", label: "Méthode" },
  { href: "#programme", label: "Programme" },
  { href: "#ressources", label: "Ressources" },
  { href: "#quiz", label: "Quiz" },
];

export default function Header() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 border-b border-line shadow-[0_10px_30px_rgba(0,0,0,0.35)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 shrink-0">
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-orangeT" aria-hidden>
            <g className="rot" style={{ "--d": "14s" } as CSSProperties}>
              <path
                d="M20 4l3 5h6l1.8 5.8 5.2 3-2 5.6 3.4 4.9-3.4 4.9 2 5.6-5.2 3L29 31h-6l-3 5-3-5h-6l-1.8-5.8-5.2-3 2-5.6L2.6 16.7 6 11.8l-2-5.6 5.2-3L11 9h6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="18" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </g>
          </svg>
          <span className="font-display text-lg sm:text-xl tracking-wide text-snow leading-none">
            MYTECH<span className="text-orangeT">·</span>STUDIO
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] tracking-[0.2em] uppercase text-fog">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-1.5 hover:text-snow transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-orangeT after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#quiz"
          className="shrink-0 font-mono text-[11px] tracking-[0.18em] uppercase px-3.5 py-2 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors"
        >
          Cycle 4 <span className="hidden sm:inline">· Évaluation</span>
        </a>
      </div>
      <div className="h-[3px] bg-ink2">
        <div className="h-full bg-orangeT transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}

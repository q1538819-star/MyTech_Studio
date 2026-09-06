import { useEffect, useState } from "react";
import { PAGES } from "../lib/router";
import type { CSSProperties } from "react";

export default function NavBar({ page }: { page: string }) {
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
        scrolled ? "bg-ink/95 border-b border-line shadow-[0_10px_30px_rgba(0,0,0,0.35)]" : "bg-ink/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center gap-5">
        <a href="#/" className="group flex items-center gap-2.5 shrink-0">
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
          <span className="hidden sm:block font-display text-lg tracking-wide text-snow leading-none">
            MYTECH<span className="text-orangeT">·</span>STUDIO
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2 font-mono text-[10.5px] sm:text-[11px] tracking-[0.14em] uppercase overflow-x-auto flex-1 no-scrollbar">
          {PAGES.map((p) => {
            const active = page === p.slug;
            return (
              <a
                key={p.slug}
                href={p.href}
                className={`relative px-2.5 sm:px-3 py-2 whitespace-nowrap transition-colors ${
                  active ? "text-ink bg-orangeT font-semibold" : "text-fog hover:text-snow hover:bg-ink3"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {p.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#/quiz"
          className="shrink-0 hidden md:inline-block font-mono text-[11px] tracking-[0.18em] uppercase px-3.5 py-2 border border-cyanT/60 text-cyanT hover:bg-cyanT hover:text-ink transition-colors"
        >
          Évaluation
        </a>
      </div>
      <div className="h-[3px] bg-ink2">
        <div className="h-full bg-orangeT transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}

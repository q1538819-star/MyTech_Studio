import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.14) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  desc,
  dark = true,
}: {
  index: string;
  kicker: string;
  title: string;
  desc?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p
          className={`font-mono text-[11px] sm:text-xs tracking-[0.28em] uppercase flex items-center gap-3 ${
            dark ? "text-cyanT" : "text-[#3567a8]"
          }`}
        >
          <span
            className={`inline-block w-2.5 h-2.5 ${dark ? "bg-orangeT" : "bg-redT"}`}
            aria-hidden
          />
          {index} — {kicker}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`font-display uppercase leading-[0.95] mt-4 text-[clamp(2.1rem,5.2vw,4rem)] tracking-wide ${
            dark ? "text-snow" : "text-cardink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={170}>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? "text-fog" : "text-[#41546b]"}`}>
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border-2 rotate-[-5deg] select-none ${className}`}
    >
      {children}
    </span>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-4 h-4 ${className}`} aria-hidden>
      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function DimArrow({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-mono text-[11px] tracking-widest ${className}`} aria-hidden>
      <svg viewBox="0 0 26 10" className="w-6 h-3">
        <path d="M0 5h24M24 5l-5-3M24 5l-5 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
      <span>{label}</span>
      <svg viewBox="0 0 26 10" className="w-6 h-3 rotate-180">
        <path d="M0 5h24M24 5l-5-3M24 5l-5 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  );
}

export function rotStyle(dur: number, running: boolean, reverse = false): CSSProperties {
  return {
    "--d": `${dur}s`,
    animationPlayState: running ? "running" : "paused",
    animationName: reverse ? "spin-rev" : "spin",
  } as CSSProperties;
}

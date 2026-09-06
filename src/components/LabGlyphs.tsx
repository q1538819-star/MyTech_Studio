import type { CSSProperties } from "react";

function gearD(r: number, teeth: number): string {
  const ri = r - 5;
  const steps = teeth * 4;
  let d = "";
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rad = i % 4 < 2 ? r : ri;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * rad).toFixed(1)} ${(Math.sin(a) * rad).toFixed(1)}`;
  }
  return d + "Z";
}

export default function LabGlyph({ slug, color }: { slug: string; color: string }) {
  const common = { stroke: color, fill: "none" } as const;
  switch (slug) {
    case "energie":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <path d="M27 4 L14 26 h9 l-3 18 L36 20 h-10 z" {...common} strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      );
    case "engrenages":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <g transform="translate(20,20)">
            <g className="rot" style={{ "--d": "5s" } as CSSProperties}>
              <path d={gearD(13, 8)} {...common} strokeWidth="2" />
            </g>
          </g>
          <g transform="translate(35,33)">
            <g className="rot-rev" style={{ "--d": "5s" } as CSSProperties}>
              <path d={gearD(8, 7)} {...common} strokeWidth="2" />
            </g>
          </g>
        </svg>
      );
    case "logique":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <circle cx="10" cy="14" r="4" {...common} strokeWidth="2" className="blinker" />
          <circle cx="10" cy="34" r="4" {...common} strokeWidth="2" />
          <path d="M20 8 h8 a16 16 0 0 1 0 32 h-8 z" {...common} strokeWidth="2" />
          <line x1="36" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "circuit":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <rect x="6" y="10" width="36" height="28" {...common} strokeWidth="2" />
          <circle cx="24" cy="24" r="7" {...common} strokeWidth="2" />
          <line x1="19" y1="19" x2="29" y2="29" stroke={color} strokeWidth="2" />
          <line x1="29" y1="19" x2="19" y2="29" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "domotique":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <path d="M8 22 L24 8 L40 22 v18 H8 z" {...common} strokeWidth="2" />
          <circle cx="24" cy="28" r="5" stroke={color} strokeWidth="2" fill="none" className="blinker" />
        </svg>
      );
    case "materiaux":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <rect x="8" y="10" width="28" height="6" fill={color} opacity="0.85" />
          <rect x="8" y="21" width="20" height="6" fill={color} opacity="0.55" />
          <rect x="8" y="32" width="32" height="6" fill={color} opacity="0.3" />
        </svg>
      );
    case "structures":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <path d="M6 36 L24 12 L42 36 z M6 36 h36 M24 12 v24 M15 36 L24 12 M33 36 L24 12" {...common} strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "algo":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <rect x="8" y="6" width="32" height="9" fill={color} opacity="0.8" />
          <rect x="12" y="19" width="28" height="9" fill={color} opacity="0.5" />
          <rect x="16" y="32" width="24" height="9" fill={color} opacity="0.9" className="blinker" />
        </svg>
      );
    case "energies":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <circle cx="16" cy="16" r="7" {...common} strokeWidth="2" className="blinker" />
          <line x1="34" y1="40" x2="34" y2="14" stroke={color} strokeWidth="2.4" />
          <g transform="translate(34,14)">
            <g className="rot" style={{ "--d": "3s" } as CSSProperties}>
              <path d="M0 0 L3 -12 L-3 -12 z M0 0 L10 8 L6 12 z M0 0 L-10 8 L-6 12 z" fill={color} opacity="0.8" />
            </g>
          </g>
        </svg>
      );
    case "reseaux":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <rect x="4" y="30" width="12" height="10" {...common} strokeWidth="2" />
          <rect x="32" y="8" width="12" height="10" {...common} strokeWidth="2" />
          <path d="M16 35 Q28 35 32 13" stroke={color} strokeWidth="2" fill="none" className="flow-dash" />
        </svg>
      );
    case "mecanismes":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <g transform="translate(16,24)">
            <g className="rot" style={{ "--d": "4s" } as CSSProperties}>
              <circle r="10" {...common} strokeWidth="2" />
              <line x1="-6" y1="0" x2="6" y2="0" stroke={color} strokeWidth="1.6" />
            </g>
          </g>
          <line x1="26" y1="16" x2="42" y2="20" stroke={color} strokeWidth="2" />
          <line x1="26" y1="32" x2="42" y2="28" stroke={color} strokeWidth="2" className="flow-dash" />
        </svg>
      );
    case "cdc":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <ellipse cx="24" cy="24" rx="8.5" ry="6" {...common} strokeWidth="2" />
          {[
            [11, 11],
            [37, 11],
            [8, 30],
            [40, 30],
            [24, 42],
          ].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <line x1="24" y1="24" x2={x} y2={y} stroke={color} strokeWidth="1.5" opacity="0.7" />
              <circle cx={x} cy={y} r="3.6" {...common} strokeWidth="2" />
            </g>
          ))}
        </svg>
      );
    case "algorigramme":
      return (
        <svg viewBox="0 0 48 48" className="w-9 h-9">
          <rect x="15" y="4" width="18" height="8" rx="4" {...common} strokeWidth="2" />
          <path d="M24 26 L33 20.5 L24 15 L15 20.5 Z" {...common} strokeWidth="2" />
          <rect x="15" y="34" width="18" height="9" {...common} strokeWidth="2" />
          <line x1="24" y1="12" x2="24" y2="15" stroke={color} strokeWidth="1.6" />
          <line x1="24" y1="26" x2="24" y2="34" stroke={color} strokeWidth="1.6" />
          <circle cx="24" cy="30" r="2" fill={color} className="pulse-ring" />
        </svg>
      );
    default:
      return null;
  }
}

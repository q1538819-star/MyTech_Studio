import { useState } from "react";
import type { CSSProperties } from "react";
import { Reveal, SectionHead, rotStyle } from "../lib/ui";

function gearPath(teeth: number, rOuter: number): string {
  const rInner = rOuter - 7;
  const steps = teeth * 4;
  let d = "";
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rad = i % 4 < 2 ? rOuter : rInner;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * rad).toFixed(1)} ${(Math.sin(a) * rad).toFixed(1)}`;
  }
  return d + "Z";
}

export default function MecanismesLab() {
  const [speed, setSpeed] = useState(5);
  const [running, setRunning] = useState(true);
  const d = (11 - speed) * 0.9; // secondes par tour

  const ps = { animationPlayState: running ? "running" : "paused" } as CSSProperties;

  return (
    <section id="mecanismes" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 11"
          kicker="Mécanismes"
          title="Trois machines simples"
          desc="Transformer un mouvement, c'est le rôle des mécanismes : la crémaillère traduit la rotation en translation, la came soulève périodiquement, la courroie transporte la rotation à distance. Règle la vitesse du moteur commun et observe."
        />

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-5 tech-card px-5 py-4">
            <button
              onClick={() => setRunning(!running)}
              className={`font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border-2 cursor-pointer transition-colors ${
                running ? "border-greenT text-greenT" : "border-orangeT text-orangeT"
              }`}
              aria-pressed={running}
            >
              {running ? "❚❚ Pause moteur" : "▶ Moteur en marche"}
            </button>
            <label className="flex-1 min-w-[220px]">
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-yellowT">Vitesse moteur — niveau {speed}/10</span>
              <input type="range" min={1} max={10} step={1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="mt-2" aria-label="Vitesse du moteur" />
            </label>
            <span className="font-mono text-[11px] text-fog">≈ {(60 / d).toFixed(1).replace(".", ",")} tr/min</span>
          </div>
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Crémaillère */}
          <Reveal delay={100}>
            <div className="tech-card p-4">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT">Pignon + crémaillère</h3>
              <svg viewBox="0 0 300 190" className="w-full mt-2 block" role="img" aria-label="Pignon entraînant une crémaillère">
                <line x1="16" y1="148" x2="284" y2="148" stroke="#24405c" strokeWidth="2" />
                <g className="anim-slide-x" style={{ "--d": `${d * 2}s`, ...ps } as CSSProperties}>
                  <rect x="60" y="112" width="180" height="14" fill="#14273c" stroke="#eaf3f9" strokeWidth="2" />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <rect key={i} x={66 + i * 15} y="102" width="7" height="10" fill="#eaf3f9" />
                  ))}
                  <path d="M70 96 l-8 -7 8 -7" fill="none" stroke="#ffc53d" strokeWidth="2" />
                  <path d="M230 96 l8 -7 -8 -7" fill="none" stroke="#ffc53d" strokeWidth="2" />
                </g>
                <g transform="translate(150,74)">
                  <g className="rot" style={rotStyle(d, running)}>
                    <path d={gearPath(10, 34)} fill="#14273c" stroke="#3fc9d8" strokeWidth="2" />
                    <line x1="-18" y1="0" x2="18" y2="0" stroke="#3fc9d8" strokeWidth="1.4" />
                    <line x1="0" y1="-18" x2="0" y2="18" stroke="#3fc9d8" strokeWidth="1.4" />
                  </g>
                  <rect x="-3.5" y="-3.5" width="7" height="7" fill="#ff7a29" />
                </g>
                <text x="150" y="176" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#9fb6c9">
                  rotation ⇄ translation (portail coulissant, direction de voiture)
                </text>
              </svg>
            </div>
          </Reveal>

          {/* Came */}
          <Reveal delay={180}>
            <div className="tech-card p-4">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-yellowT">Came + suiveur</h3>
              <svg viewBox="0 0 300 190" className="w-full mt-2 block" role="img" aria-label="Came soulevant un suiveur">
                <rect x="138" y="26" width="24" height="70" fill="#14273c" stroke="#eaf3f9" strokeWidth="2" />
                <rect x="120" y="14" width="60" height="14" fill="#14273c" stroke="#ffc53d" strokeWidth="2" />
                <line x1="126" y1="10" x2="174" y2="10" stroke="#24405c" strokeWidth="2" />
                <g className="anim-slide-y" style={{ "--d": `${d * 2}s`, ...ps } as CSSProperties}>
                  <rect x="138" y="26" width="24" height="70" fill="#14273c" stroke="#eaf3f9" strokeWidth="2" />
                  <rect x="120" y="14" width="60" height="14" fill="#14273c" stroke="#ffc53d" strokeWidth="2" />
                  <circle cx="150" cy="100" r="6" fill="#ffc53d" />
                </g>
                <g transform="translate(150,132)">
                  <g className="rot" style={rotStyle(d, running)}>
                    <ellipse rx="34" ry="22" fill="#14273c" stroke="#ff7a29" strokeWidth="2.4" />
                    <circle cx="10" cy="0" r="3.5" fill="#ff7a29" />
                  </g>
                </g>
                <line x1="96" y1="154" x2="204" y2="154" stroke="#24405c" strokeWidth="2" />
                <text x="150" y="178" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#9fb6c9">
                  rotation → translation périodique (moteur, essuie-glace)
                </text>
              </svg>
            </div>
          </Reveal>

          {/* Poulies courroie */}
          <Reveal delay={260}>
            <div className="tech-card p-4">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-greenT">Poulies + courroie</h3>
              <svg viewBox="0 0 300 190" className="w-full mt-2 block" role="img" aria-label="Deux poulies reliées par une courroie">
                <line x1="84" y1="62" x2="216" y2="94" stroke="#9fb6c9" strokeWidth="2" />
                <line x1="84" y1="118" x2="216" y2="150" stroke="#9fb6c9" strokeWidth="2" />
                <line x1="84" y1="62" x2="216" y2="94" stroke="#ffc53d" strokeWidth="2" className={running ? "flow-dash" : ""} />
                <line x1="84" y1="118" x2="216" y2="150" stroke="#ffc53d" strokeWidth="2" className={running ? "flow-dash" : ""} />
                <g transform="translate(84,90)">
                  <g className="rot" style={rotStyle(d, running)}>
                    <circle r="28" fill="none" stroke="#3fc9d8" strokeWidth="2.4" />
                    <line x1="-20" y1="0" x2="20" y2="0" stroke="#3fc9d8" strokeWidth="1.4" />
                    <line x1="0" y1="-20" x2="0" y2="20" stroke="#3fc9d8" strokeWidth="1.4" />
                  </g>
                  <rect x="-3.5" y="-3.5" width="7" height="7" fill="#ff7a29" />
                </g>
                <g transform="translate(216,122)">
                  <g className="rot" style={rotStyle(d * 1.6, running)}>
                    <circle r="38" fill="none" stroke="#7bd88f" strokeWidth="2.4" />
                    <line x1="-26" y1="0" x2="26" y2="0" stroke="#7bd88f" strokeWidth="1.4" />
                    <line x1="0" y1="-26" x2="0" y2="26" stroke="#7bd88f" strokeWidth="1.4" />
                  </g>
                  <rect x="-3.5" y="-3.5" width="7" height="7" fill="#ff7a29" />
                </g>
                <text x="150" y="178" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#9fb6c9">
                  transmission à distance (vélo, machine à laver)
                </text>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

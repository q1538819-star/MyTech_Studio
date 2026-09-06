import { useState } from "react";
import type { CSSProperties } from "react";
import { Cross, DimArrow, Reveal, Stamp, rotStyle } from "../lib/ui";

function gearPath(teeth: number, rOuter: number): string {
  const rInner = rOuter - 9;
  const steps = teeth * 4;
  let d = "";
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rad = i % 4 < 2 ? rOuter : rInner;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * rad).toFixed(1)} ${(Math.sin(a) * rad).toFixed(1)}`;
  }
  return d + "Z";
}

const TICKER = [
  "Chaîne d'énergie",
  "Engrenages",
  "Logique combinatoire",
  "Circuits électriques",
  "Domotique",
  "Matériaux",
  "Algorithmes",
  "Capteurs & actionneurs",
  "Structures",
  "Démarche de projet",
];

export default function Opening() {
  const [on, setOn] = useState(true);

  return (
    <section id="top" className="bg-blueprint relative overflow-hidden">
      {/* cadre de planche */}
      <div className="absolute inset-3 sm:inset-5 border border-line/70 pointer-events-none" aria-hidden>
        <Cross className="absolute -top-2 -left-2 text-cyanT" />
        <Cross className="absolute -top-2 -right-2 text-cyanT" />
        <Cross className="absolute -bottom-2 -left-2 text-cyanT" />
        <Cross className="absolute -bottom-2 -right-2 text-cyanT" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-14 grid lg:grid-cols-[1.04fr_0.96fr] gap-12 lg:gap-10 items-center relative">
        {/* ------- colonne texte ------- */}
        <div className="relative">
          <Reveal>
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-cyanT flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-orangeT inline-block" aria-hidden />
              Planche n°01 · Technologie · Collège
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-display uppercase leading-[0.88] tracking-wide mt-5 text-[clamp(3.4rem,10vw,7.4rem)] text-snow">
              MyTech
              <br />
              <span className="word-outline">Studio</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <DimArrow label="CURIOSITÉ : SANS LIMITE" className="text-fog mt-5" />
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-fog text-base sm:text-lg leading-relaxed">
              Le laboratoire interactif de la <strong className="text-snow">technologie au collège</strong>.
              Manipule la chaîne d'énergie, fais tourner les engrenages, câble tes circuits et
              programme la maison de demain — tout le <strong className="text-snow">cycle&nbsp;4</strong>,
              du croquis au prototype.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#/animations"
                className="group font-mono text-xs tracking-[0.2em] uppercase font-semibold px-6 py-3.5 bg-orangeT text-ink hover:bg-yellowT transition-colors inline-flex items-center gap-3"
              >
                Explorer le labo
                <span className="transition-transform group-hover:translate-x-1.5" aria-hidden>
                  →
                </span>
              </a>
              <a
                href="#/cours"
                className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3.5 border border-fog/50 text-snow hover:border-cyanT hover:text-cyanT transition-colors"
              >
                Voir les cours
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 flex flex-wrap gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-fog">
              {[
                ["11 machines au labo", "bg-orangeT"],
                ["6e → 3e", "bg-cyanT"],
                ["12 ressources", "bg-yellowT"],
                ["quiz d'évaluation", "bg-greenT"],
              ].map(([t, c]) => (
                <span key={t} className="border border-line px-3 py-1.5 flex items-center gap-2 bg-ink2/50">
                  <span className={`w-2 h-2 ${c}`} aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="hidden xl:block absolute -right-4 top-2">
            <Stamp className="border-redT text-redT bg-ink2/60">Vu & approuvé · le prof de techno</Stamp>
          </div>
        </div>

        {/* ------- planche technique ------- */}
        <Reveal delay={200} className="relative">
          <div className="relative border border-line bg-ink2/70 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">
                Système technique — vue animée
              </span>
              <button
                onClick={() => setOn(!on)}
                className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase cursor-pointer"
                aria-pressed={on}
              >
                <span className={on ? "text-greenT" : "text-fog"}>
                  {on ? "● Marche" : "○ Arrêt"}
                </span>
                <span
                  className={`relative w-11 h-5 border transition-colors ${
                    on ? "border-greenT bg-greenT/15" : "border-fog/60 bg-transparent"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-3.5 h-3.5 transition-all duration-300 ${
                      on ? "left-[24px] bg-greenT" : "left-0.5 bg-fog"
                    }`}
                  />
                </span>
              </button>
            </div>

            <svg viewBox="0 0 560 430" className="w-full block" role="img" aria-label="Schéma animé : moteur, courroie et engrenages en mouvement">
              {/* sol */}
              <line x1="20" y1="406" x2="540" y2="406" stroke="#24405c" strokeWidth="2" />
              {Array.from({ length: 26 }).map((_, i) => (
                <line key={i} x1={30 + i * 20} y1="406" x2={20 + i * 20} y2="418" stroke="#24405c" strokeWidth="1.2" />
              ))}

              {/* moteur */}
              <g stroke="#3fc9d8" strokeWidth="2" fill="none">
                <rect x="36" y="64" width="148" height="84" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={i} x1={52 + i * 22} y1="72" x2={52 + i * 22} y2="140" strokeWidth="1" opacity="0.55" />
                ))}
                <rect x="70" y="46" width="44" height="18" />
                <rect x="46" y="148" width="20" height="10" strokeWidth="1.4" />
                <rect x="150" y="148" width="20" height="10" strokeWidth="1.4" />
              </g>
              <text x="36" y="36" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                MOTEUR 9 V
              </text>
              <line x1="70" y1="42" x2="92" y2="46" stroke="#9fb6c9" strokeWidth="1" />

              {/* axe moteur → petite poulie */}
              <line x1="184" y1="106" x2="232" y2="106" stroke="#3fc9d8" strokeWidth="3" />
              <g transform="translate(232,106)">
                <g className="rot" style={rotStyle(2, on)}>
                  <circle r="20" fill="none" stroke="#eaf3f9" strokeWidth="2.5" />
                  <line x1="-13" y1="0" x2="13" y2="0" stroke="#eaf3f9" strokeWidth="1.6" />
                  <line x1="0" y1="-13" x2="0" y2="13" stroke="#eaf3f9" strokeWidth="1.6" />
                </g>
                <rect x="-3.5" y="-3.5" width="7" height="7" fill="#ff7a29" />
              </g>

              {/* courroie */}
              <line x1="232" y1="86" x2="398" y2="58" stroke="#9fb6c9" strokeWidth="2" />
              <line x1="232" y1="126" x2="398" y2="154" stroke="#9fb6c9" strokeWidth="2" />
              <line x1="232" y1="86" x2="398" y2="58" stroke="#ffc53d" strokeWidth="2" className={on ? "flow-dash" : ""} strokeDasharray="7 7" opacity={on ? 1 : 0} />
              <line x1="232" y1="126" x2="398" y2="154" stroke="#ffc53d" strokeWidth="2" className={on ? "flow-dash" : ""} strokeDasharray="7 7" opacity={on ? 1 : 0} />
              <text x="272" y="48" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                COURROIE
              </text>

              {/* grande poulie */}
              <g transform="translate(398,106)">
                <g className="rot" style={rotStyle(4.8, on)}>
                  <circle r="48" fill="none" stroke="#eaf3f9" strokeWidth="2.5" />
                  <circle r="40" fill="none" stroke="#eaf3f9" strokeWidth="1" opacity="0.5" />
                  <line x1="-40" y1="0" x2="40" y2="0" stroke="#eaf3f9" strokeWidth="1.6" />
                  <line x1="0" y1="-40" x2="0" y2="40" stroke="#eaf3f9" strokeWidth="1.6" />
                  <line x1="-28" y1="-28" x2="28" y2="28" stroke="#eaf3f9" strokeWidth="1.2" opacity="0.7" />
                  <line x1="-28" y1="28" x2="28" y2="-28" stroke="#eaf3f9" strokeWidth="1.2" opacity="0.7" />
                </g>
                <rect x="-4" y="-4" width="8" height="8" fill="#ff7a29" />
              </g>
              <text x="462" y="86" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                Ø 96
              </text>
              <line x1="446" y1="92" x2="458" y2="90" stroke="#9fb6c9" strokeWidth="1" />

              {/* arbre vertical */}
              <rect x="394" y="106" width="8" height="144" fill="#24405c" stroke="#3fc9d8" strokeWidth="1.4" />

              {/* engrenage A */}
              <g transform="translate(398,250)">
                <g className="rot" style={rotStyle(4.8, on)}>
                  <path d={gearPath(12, 45)} fill="#14273c" stroke="#ffc53d" strokeWidth="2" />
                  <circle r="14" fill="none" stroke="#ffc53d" strokeWidth="1.6" />
                </g>
                <rect x="-4" y="-4" width="8" height="8" fill="#ff7a29" />
              </g>
              <text x="240" y="222" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                Z = 12
              </text>
              <line x1="300" y1="226" x2="352" y2="238" stroke="#9fb6c9" strokeWidth="1" />

              {/* engrenage B (mené) */}
              <g transform="translate(338,335)">
                <g className="rot-rev" style={rotStyle(7.2, on, true)}>
                  <path d={gearPath(18, 63)} fill="#14273c" stroke="#3fc9d8" strokeWidth="2" />
                  <circle r="20" fill="none" stroke="#3fc9d8" strokeWidth="1.4" />
                  <line x1="-44" y1="0" x2="44" y2="0" stroke="#3fc9d8" strokeWidth="1.2" opacity="0.6" />
                  <line x1="0" y1="-44" x2="0" y2="44" stroke="#3fc9d8" strokeWidth="1.2" opacity="0.6" />
                </g>
                <rect x="-4.5" y="-4.5" width="9" height="9" fill="#ff7a29" />
              </g>
              <text x="130" y="330" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                ROUE MENÉE · Z = 18
              </text>
              <line x1="272" y1="332" x2="292" y2="334" stroke="#9fb6c9" strokeWidth="1" />

              {/* cote moteur */}
              <g stroke="#9fb6c9" strokeWidth="1" className="draw-in" style={{ "--len": "400" } as CSSProperties}>
                <line x1="36" y1="176" x2="36" y2="190" />
                <line x1="184" y1="176" x2="184" y2="190" />
                <line x1="36" y1="184" x2="184" y2="184" />
              </g>
              <text x="92" y="200" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="10">
                148 mm
              </text>

              {/* flux d'énergie */}
              {on && (
                <text x="40" y="396" fill="#7bd88f" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" className="blinker">
                  ▶ ÉNERGIE TRANSMISE — SORTIE : ≈ 40 tr/min
                </text>
              )}
            </svg>

            {/* cartouche */}
            <div className="grid grid-cols-2 sm:grid-cols-6 border-t border-line font-mono text-[10px] uppercase tracking-wider">
              {[
                ["Titre", "MyTech Studio"],
                ["N° plan", "01"],
                ["Échelle", "1:1"],
                ["Classe", "6e → 3e"],
                ["Année", "2025–2026"],
                ["Format", "A3"],
              ].map(([k, v], i) => (
                <div key={k} className={`px-3 py-2 ${i % 2 === 0 ? "border-r" : ""} ${i < 4 ? "sm:border-r" : ""} border-line ${i < 4 ? "border-b sm:border-b-0" : ""}`}>
                  <div className="text-fog/70">{k}</div>
                  <div className="text-snow mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* indice de scroll */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8 flex items-center justify-between">
        <a href="#/animations" className="font-mono text-[11px] tracking-[0.25em] uppercase text-fog hover:text-cyanT transition-colors flex items-center gap-3">
          <span className="inline-block floaty text-orangeT text-base" aria-hidden>▾</span>
          Dérouler le plan
        </a>
        <span className="font-mono text-[10px] tracking-[0.2em] text-fog/60 uppercase hidden sm:block">
          Repère A — vue de face
        </span>
      </div>

      {/* bandeau défilant */}
      <div className="border-y border-line bg-yellowT text-ink overflow-hidden py-2.5" aria-hidden>
        <div className="marquee-track font-display uppercase text-lg sm:text-xl tracking-wide whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {TICKER.map((t) => (
                <span key={`${copy}-${t}`} className="flex items-center">
                  <span className="px-5">{t}</span>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                    <path
                      d="M12 2l2.4 4h4.4l1.3 4.2 3.9 1.8-2 4 2 4-3.9 1.8-1.3 4.2h-4.4L12 26"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      transform="scale(0.85) translate(2,-2)"
                    />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

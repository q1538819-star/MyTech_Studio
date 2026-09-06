import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

export default function StructuresLab() {
  const [tri, setTri] = useState(false);
  const [load, setLoad] = useState(40);

  const defl = tri ? (load / 100) * 3 : (load / 100) * 30;
  const collapse = !tri && load > 72;
  const stress = Math.min(1, load / 100 + (tri ? 0 : 0.25));
  const chordColor = !tri && load > 45 ? "#e8442e" : "#eaf3f9";
  const diagColor = tri ? (load > 60 ? "#7bd88f" : "#3fc9d8") : "#3fc9d8";

  const xs = [0, 80, 160, 240, 320, 400, 480, 560];
  const Y_UP = 100;
  const Y_LO = 190;

  return (
    <section id="structures" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 07"
          kicker="Structures"
          title="Le pont qui tient (ou pas)"
          desc="Pourquoi les ponts et les grues sont-ils remplis de triangles ? Ajoute ou retire les diagonales, puis augmente la charge : sans triangulation, les barres travaillent en flexion et la structure plie…"
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <Reveal>
            <div className="border border-line bg-ink2/70">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Pont en treillis — essai de charge</span>
                <button
                  onClick={() => setTri(!tri)}
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border-2 cursor-pointer transition-colors ${
                    tri ? "border-greenT text-greenT bg-greenT/10" : "border-fog/60 text-fog hover:border-yellowT hover:text-yellowT"
                  }`}
                  aria-pressed={tri}
                >
                  {tri ? "✓ Triangulé" : "○ Sans diagonales"}
                </button>
              </div>

              <svg viewBox="0 0 640 330" className="w-full block" role="img" aria-label="Pont en treillis soumis à une charge">
                {/* piles */}
                {[60, 580].map((x) => (
                  <g key={x}>
                    <path d={`M${x - 26} 320 L${x + 26} 320 L${x + 10} 240 L${x - 10} 240 Z`} fill="#14273c" stroke="#24405c" strokeWidth="2" />
                    <line x1={x - 10} y1="240" x2={x + 10} y2="240" stroke="#3fc9d8" strokeWidth="2.5" />
                  </g>
                ))}
                <line x1="20" y1="320" x2="620" y2="320" stroke="#24405c" strokeWidth="2.5" />

                {/* pont (groupe déformable) */}
                <g
                  style={{
                    transform: `translateY(${defl}px) skewX(${collapse ? -6 : !tri ? -defl * 0.25 : 0}deg)`,
                    transformOrigin: "320px 240px",
                    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* membrures */}
                  {xs.slice(0, -1).map((x, i) => (
                    <g key={x}>
                      <line x1={x + 40} y1={Y_LO} x2={x + 120} y2={Y_LO} stroke={chordColor} strokeWidth="4" style={{ transition: "stroke 0.4s" }} />
                      <line x1={x + 40} y1={Y_UP} x2={x + 120} y2={Y_UP} stroke={chordColor} strokeWidth="3.5" style={{ transition: "stroke 0.4s" }} />
                      <line x1={x + 40} y1={Y_UP} x2={x + 40} y2={Y_LO} stroke="#9fb6c9" strokeWidth="2.5" opacity="0.8" />
                      {tri && i < xs.length - 2 && (
                        <line
                          x1={x + 40} y1={i % 2 === 0 ? Y_LO : Y_UP}
                          x2={x + 120} y2={i % 2 === 0 ? Y_UP : Y_LO}
                          stroke={diagColor} strokeWidth="3" style={{ transition: "stroke 0.4s" }}
                        />
                      )}
                    </g>
                  ))}

                  {/* câbles + caisse */}
                  <line x1="360" y1={Y_LO} x2="360" y2={Y_LO + 34} stroke="#9fb6c9" strokeWidth="1.6" />
                  <rect
                    x={360 - 16 - load * 0.14} y={Y_LO + 34}
                    width={32 + load * 0.28} height={28 + load * 0.2}
                    fill="#ff7a29" opacity={0.25 + stress * 0.6} stroke="#ff7a29" strokeWidth="2"
                    style={{ transition: "all 0.6s" }}
                  />
                  <text x="360" y={Y_LO + 55 + load * 0.1} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#0e1b2a" fontWeight="700">
                    {load} kg
                  </text>
                </g>

                {/* flèches d'efforts */}
                {load > 10 && (
                  <g fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1">
                    <text x="70" y={Y_UP - 14 + defl * 0.4} fill="#e8442e">COMPRESSION ▼</text>
                    <text x="430" y={Y_LO + 92 + defl * 0.4} fill="#3fc9d8">TRACTION ▲</text>
                  </g>
                )}

                {/* cote */}
                <g stroke="#9fb6c9" strokeWidth="1">
                  <line x1="60" y1="300" x2="60" y2="312" />
                  <line x1="580" y1="300" x2="580" y2="312" />
                  <line x1="60" y1="306" x2="580" y2="306" />
                </g>
                <text x="320" y="302" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#9fb6c9">
                  PORTÉE 520 mm
                </text>
              </svg>

              <div className={`px-4 py-3 border-t font-mono text-[11.5px] tracking-wide transition-colors ${collapse ? "border-redT bg-redT/15 text-redT blinker" : "border-line bg-ink/60 text-greenT"}`}>
                {collapse
                  ? "✖ RUPTURE ! Sans diagonales, les barres plient : le pont s'effondre."
                  : tri
                  ? `▶ Structure stable — flèche mesurée : ${defl.toFixed(1)} mm. Les triangles transforment la flexion en traction/compression.`
                  : `▶ Attention : flèche de ${defl.toFixed(1)} mm. Les barres travaillent en flexion… ajoute des triangles !`}
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={120}>
              <div className="tech-card p-5">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-yellowT mb-4">Banc d'essai</h3>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-orangeT">Charge appliquée — {load} kg</span>
                  <input type="range" min={0} max={100} step={1} value={load} onChange={(e) => setLoad(Number(e.target.value))} className="mt-2" aria-label="Charge appliquée au pont" />
                </label>
                <div className="mt-3 flex gap-2">
                  {[25, 50, 75, 100].map((v) => (
                    <button
                      key={v}
                      onClick={() => setLoad(v)}
                      className={`flex-1 font-mono text-[11px] py-2 border cursor-pointer transition-colors ${load === v ? "border-orangeT bg-orangeT text-ink font-semibold" : "border-line text-fog hover:border-fog"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="mt-5 space-y-2 font-mono text-[12px]">
                  <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-fog">Flèche mesurée</span><span className="text-snow">{defl.toFixed(1)} mm</span></div>
                  <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-fog">Barres</span><span className="text-snow">{tri ? "27 (avec diagonales)" : "21"}</span></div>
                  <div className="flex justify-between"><span className="text-fog">État</span><span className={collapse ? "text-redT" : tri ? "text-greenT" : "text-yellowT"}>{collapse ? "RUPTURE" : tri ? "STABLE" : "FLEXION"}</span></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="tech-card p-5 text-[13px] leading-relaxed text-fog">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT mb-3">À retenir</h3>
                <p>
                  Le <strong className="text-snow">triangle</strong> est la seule forme indéformable : c'est la <strong className="text-snow">triangulation</strong>.
                  Membrure haute comprimée, membrure basse tendue, diagonales qui relient le tout — c'est le secret des tours Eiffel, des grues et des treillis de toit.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

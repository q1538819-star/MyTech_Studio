import { useState } from "react";
import { Reveal, SectionHead, rotStyle } from "../lib/ui";

function gearPath(teeth: number, rOuter: number): string {
  const rInner = rOuter - Math.max(6, rOuter * 0.16);
  const steps = teeth * 4;
  let d = "";
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rad = i % 4 < 2 ? rOuter : rInner;
    d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * rad).toFixed(1)} ${(Math.sin(a) * rad).toFixed(1)}`;
  }
  return d + "Z";
}

const rOf = (z: number) => 9 + z * 3;
const fr = (n: number) => n.toFixed(1).replace(".", ",");

export default function GearsLab() {
  const [z1, setZ1] = useState(12);
  const [z2, setZ2] = useState(28);
  const [running, setRunning] = useState(true);

  const r1 = rOf(z1);
  const r2 = rOf(z2);
  const x2 = 235 + r1 + r2 - 6;
  const dur1 = 6 * (z1 / 16);
  const dur2 = 6 * (z2 / 16);
  const n2 = (60 * z1) / z2;
  const ratio = z1 / z2;

  return (
    <section id="engrenages" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 02"
          kicker="Transmission du mouvement"
          title="Le banc d'engrenages"
          desc="Deux roues dentées en prise tournent toujours en sens opposés. Fais varier le nombre de dents et observe le rapport de transmission : qui tourne le plus vite, et pourquoi un motoréducteur « démultiplie »."
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_330px] gap-8 items-start">
          {/* banc d'essai */}
          <Reveal>
            <div className="border border-line bg-ink2/70 relative">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Banc d'essai — vue de dessus</span>
                <button
                  onClick={() => setRunning(!running)}
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border cursor-pointer transition-colors ${
                    running ? "border-greenT text-greenT" : "border-fog/60 text-fog hover:border-yellowT hover:text-yellowT"
                  }`}
                  aria-pressed={running}
                >
                  {running ? "■ Stopper" : "▶ Lancer"}
                </button>
              </div>

              <svg viewBox="0 0 640 420" className="w-full block" role="img" aria-label="Deux engrenages en prise, animation du rapport de transmission">
                {/* entraxes */}
                <line x1="235" y1="210" x2={x2} y2="210" stroke="#24405c" strokeWidth="1" strokeDasharray="5 5" />

                {/* flèches de sens */}
                <g stroke="#ff7a29" strokeWidth="2" fill="none" opacity={running ? 1 : 0.3}>
                  <path d={`M ${235 - r1 - 14} 160 A ${r1 + 16} ${r1 + 16} 0 0 1 ${235 - 10} ${210 - r1 - 18}`} />
                  <path d={`M ${235 - 14} ${210 - r1 - 24} l 6 8 l -10 2 z`} fill="#ff7a29" stroke="none" />
                </g>
                <g stroke="#3fc9d8" strokeWidth="2" fill="none" opacity={running ? 1 : 0.3}>
                  <path d={`M ${x2 + 10} ${210 - r2 - 18} A ${r2 + 16} ${r2 + 16} 0 0 0 ${x2 + r2 + 14} 160`} />
                  <path d={`M ${x2 + 14} ${210 - r2 - 24} l -6 8 l 10 2 z`} fill="#3fc9d8" stroke="none" />
                </g>

                {/* pignon menant */}
                <g transform={`translate(235,210)`}>
                  <g className="rot" style={rotStyle(dur1, running)}>
                    <path d={gearPath(z1, r1)} fill="#14273c" stroke="#ff7a29" strokeWidth="2.2" />
                    <circle r={Math.max(8, r1 * 0.28)} fill="none" stroke="#ff7a29" strokeWidth="1.4" />
                  </g>
                  <rect x="-4" y="-4" width="8" height="8" fill="#ffc53d" />
                </g>

                {/* roue menée */}
                <g transform={`translate(${x2},210)`}>
                  <g className="rot-rev" style={rotStyle(dur2, running, true)}>
                    <path d={gearPath(z2, r2)} fill="#14273c" stroke="#3fc9d8" strokeWidth="2.2" />
                    <circle r={Math.max(8, r2 * 0.24)} fill="none" stroke="#3fc9d8" strokeWidth="1.4" />
                  </g>
                  <rect x="-4" y="-4" width="8" height="8" fill="#ffc53d" />
                </g>

                {/* légendes */}
                <text x="235" y="52" textAnchor="middle" fill="#ff7a29" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="2">
                  MENANTE
                </text>
                <text x="235" y="68" textAnchor="middle" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11">
                  Z₁ = {z1} dents · 60 tr/min
                </text>
                <text x={x2} y="52" textAnchor="middle" fill="#3fc9d8" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="2">
                  MENÉE
                </text>
                <text x={x2} y="68" textAnchor="middle" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11">
                  Z₂ = {z2} dents · {fr(n2)} tr/min
                </text>

                {/* cote entraxe */}
                <g stroke="#9fb6c9" strokeWidth="1">
                  <line x1="235" y1="330" x2="235" y2="360" strokeDasharray="3 4" />
                  <line x1={x2} y1="330" x2={x2} y2="360" strokeDasharray="3 4" />
                  <line x1="235" y1="352" x2={x2} y2="352" />
                  <path d={`M235 352 l7 -4 v8 z`} fill="#9fb6c9" />
                  <path d={`M${x2} 352 l-7 -4 v8 z`} fill="#9fb6c9" />
                </g>
                <text x={(235 + x2) / 2} y="376" textAnchor="middle" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11">
                  entraxe : {fr((r1 + r2 - 6) / 10)} cm
                </text>

                <text x="24" y="404" fill="#7bd88f" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" opacity={running ? 1 : 0.35}>
                  {running ? "▶ TRANSMISSION EN COURS" : "■ BANC À L'ARRÊT"}
                </text>
              </svg>
            </div>
          </Reveal>

          {/* pupitre de commande */}
          <div className="space-y-5">
            <Reveal delay={120}>
              <div className="tech-card p-5">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT mb-4">Pupitre de commande</h3>
                {[
                  { label: `Dents menante Z₁ — ${z1}`, val: z1, set: setZ1, color: "text-orangeT" },
                  { label: `Dents menée Z₂ — ${z2}`, val: z2, set: setZ2, color: "text-cyanT" },
                ].map((s) => (
                  <label key={s.label} className="block mb-5 last:mb-0">
                    <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${s.color}`}>{s.label}</span>
                    <input
                      type="range"
                      min={8}
                      max={32}
                      value={s.val}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="mt-2"
                      aria-label={s.label}
                    />
                  </label>
                ))}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    ["Démultiplié", 10, 30],
                    ["1 : 1", 16, 16],
                    ["Surmultiplié", 30, 10],
                  ].map(([l, a, b]) => (
                    <button
                      key={l as string}
                      onClick={() => {
                        setZ1(a as number);
                        setZ2(b as number);
                      }}
                      className="font-mono text-[10px] tracking-[0.12em] uppercase px-2.5 py-1.5 border border-line text-fog hover:border-orangeT hover:text-orangeT transition-colors cursor-pointer"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="tech-card p-5 font-mono text-[12px]">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-yellowT mb-3">Feuille de mesures</h3>
                <dl className="space-y-2.5">
                  {[
                    ["Vitesse entrée N₁", "60 tr/min"],
                    ["Rapport i = Z₁ / Z₂", fr(ratio)],
                    ["Vitesse sortie N₂", `${fr(n2)} tr/min`],
                    ["Sens de sortie", "inversé ↺"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-line/60 pb-2">
                      <dt className="text-fog">{k}</dt>
                      <dd className="text-snow font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[11.5px] leading-relaxed text-fog">
                  {z2 > z1 ? (
                    <>Z₂ &gt; Z₁ : la menée tourne <span className="text-cyanT">moins vite mais plus fort</span> — c'est la <strong className="text-snow">démultiplication</strong> (motoréducteur de barrière, treuil…).</>
                  ) : z2 < z1 ? (
                    <>Z₂ &lt; Z₁ : la menée tourne <span className="text-orangeT">plus vite mais moins fort</span> — c'est la <strong className="text-snow">surmultiplication</strong> (perceuse, essoreuse…).</>
                  ) : (
                    <>Z₁ = Z₂ : rapport 1 — même vitesse, sens inversé, comme dans un simple renvoi d'angle.</>
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const W = "#9fb6c9"; // fil
const fr = (n: number) => n.toFixed(2).replace(".", ",");

export default function CircuitLab() {
  const [closed, setClosed] = useState(true);
  const [u, setU] = useState(9);
  const i = u / 10;
  const p = u * i;
  const glow = u / 12;

  const segs: [number, number, number, number][] = [
    [120, 80, 248, 80],
    [312, 80, 440, 80],
    [440, 80, 440, 162],
    [440, 218, 440, 300],
    [440, 300, 322, 300],
    [238, 300, 120, 300],
    [120, 300, 120, 224],
    [120, 156, 120, 80],
  ];

  return (
    <section id="circuit" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 04"
          kicker="Électricité"
          title="Le circuit en série"
          desc="Générateur, interrupteur, lampe, résistance : referme la boucle et le courant circule. Augmente la tension et vérifie la loi d'Ohm en direct — attention à l'éclat de la lampe à 12 volts."
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_330px] gap-8 items-start">
          <Reveal>
            <div className="border border-line bg-ink2/70">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Schéma normalisé — circuit série</span>
                <button
                  onClick={() => setClosed(!closed)}
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border cursor-pointer transition-colors ${
                    closed ? "border-greenT text-greenT" : "border-fog/60 text-fog hover:border-yellowT hover:text-yellowT"
                  }`}
                  aria-pressed={closed}
                >
                  {closed ? "Interrupteur fermé" : "Interrupteur ouvert"}
                </button>
              </div>

              <svg viewBox="0 0 560 380" className="w-full block" role="img" aria-label="Circuit électrique en série animé">
                {/* fils */}
                {segs.map(([x1, y1, x2, y2], k) => (
                  <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={closed ? "#eaf3f9" : W} strokeWidth="2.5" opacity={closed ? 0.9 : 0.55} />
                ))}
                {/* flux d'électrons */}
                {closed &&
                  segs.map(([x1, y1, x2, y2], k) => (
                    <line key={`f${k}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3fc9d8" strokeWidth="2.5" className="flow-dash" />
                  ))}

                {/* générateur */}
                <line x1="120" y1="156" x2="120" y2="172" stroke="#eaf3f9" strokeWidth="2.5" />
                <line x1="96" y1="172" x2="144" y2="172" stroke="#ffc53d" strokeWidth="3.5" />
                <line x1="108" y1="186" x2="132" y2="186" stroke="#ffc53d" strokeWidth="7" />
                <line x1="96" y1="200" x2="144" y2="200" stroke="#ffc53d" strokeWidth="3.5" />
                <line x1="108" y1="214" x2="132" y2="214" stroke="#ffc53d" strokeWidth="7" />
                <line x1="120" y1="214" x2="120" y2="224" stroke="#eaf3f9" strokeWidth="2.5" />
                <text x="150" y="178" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="12">+   G : {u} V</text>
                <text x="150" y="216" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="12">−</text>

                {/* interrupteur */}
                <circle cx="250" cy="80" r="4.5" fill="#0e1b2a" stroke="#eaf3f9" strokeWidth="2" />
                <circle cx="310" cy="80" r="4.5" fill="#0e1b2a" stroke="#eaf3f9" strokeWidth="2" />
                <line
                  x1="250" y1="80"
                  x2={closed ? 310 : 302} y2={closed ? 80 : 52}
                  stroke={closed ? "#7bd88f" : "#ff7a29"} strokeWidth="3.5"
                  style={{ transition: "all .35s ease" }}
                />
                <text x="280" y="44" textAnchor="middle" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                  INTERRUPTEUR K
                </text>

                {/* lampe */}
                {closed && <circle cx="440" cy="190" r={30 + glow * 22} fill="#ffc53d" opacity={0.12 + glow * 0.3} />}
                <circle cx="440" cy="190" r="24" fill={closed ? `rgba(255,197,61,${0.15 + glow * 0.75})` : "#14273c"} stroke="#eaf3f9" strokeWidth="2.5" style={{ transition: "fill .3s" }} />
                <line x1="424" y1="174" x2="456" y2="206" stroke="#eaf3f9" strokeWidth="2" />
                <line x1="456" y1="174" x2="424" y2="206" stroke="#eaf3f9" strokeWidth="2" />
                <text x="488" y="194" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                  LAMPE L
                </text>

                {/* résistance */}
                <rect x="242" y="288" width="76" height="24" fill="#0e1b2a" stroke="#ff7a29" strokeWidth="2.5" />
                <text x="280" y="342" textAnchor="middle" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">
                  R = 10 Ω
                </text>

                <text x="24" y="362" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill={closed ? "#7bd88f" : "#ff7a29"}>
                  {closed ? `▶ I = ${fr(i)} A circule dans la boucle` : "■ CIRCUIT OUVERT — AUCUN COURANT"}
                </text>
              </svg>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={120}>
              <div className="tech-card p-5">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT mb-4">Réglage du générateur</h3>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-yellowT">Tension U — {u} V</span>
                  <input type="range" min={3} max={12} step={1} value={u} onChange={(e) => setU(Number(e.target.value))} className="mt-2" aria-label="Tension du générateur" />
                </label>
                <div className="mt-4 h-2.5 border border-line relative">
                  <div className="absolute inset-y-0 left-0 bg-yellowT transition-all duration-300" style={{ width: `${(glow * 100).toFixed(0)}%` }} />
                </div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-fog mt-2">Éclat de la lampe</p>
                {u >= 12 && <p className="mt-3 font-mono text-[11px] text-orangeT blinker">⚠ 12 V : la lampe est à fond, elle chauffe !</p>}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="tech-card p-5 font-mono text-[12px]">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-yellowT mb-3">Loi d'Ohm</h3>
                <div className="text-center py-4 border border-line bg-ink/60">
                  <span className="font-display text-3xl tracking-wider text-snow">
                    U = R <span className="text-orangeT">×</span> I
                  </span>
                </div>
                <dl className="mt-4 space-y-2.5">
                  {[
                    ["Tension U", `${u} V`],
                    ["Résistance R", "10 Ω"],
                    ["Courant I = U / R", closed ? `${fr(i)} A` : "0 A"],
                    ["Puissance P = U × I", closed ? `${fr(p)} W` : "0 W"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-line/60 pb-2">
                      <dt className="text-fog">{k}</dt>
                      <dd className="text-snow font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[11.5px] leading-relaxed text-fog">
                  Plus la tension augmente, plus le courant augmente — et la lampe brille davantage. C'est exactement ce que mesure le <strong className="text-snow">multimètre</strong> en classe.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

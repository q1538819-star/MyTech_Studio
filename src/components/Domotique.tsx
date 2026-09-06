import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const STARS = Array.from({ length: 26 }).map((_, i) => ({
  x: (i * 97) % 540 + 10,
  y: ((i * 53) % 150) + 12,
  r: i % 3 === 0 ? 1.6 : 1,
}));

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function skyColor(d: number) {
  return `rgb(${lerp(127, 10, d)}, ${lerp(183, 20, d)}, ${lerp(221, 33, d)})`;
}
function darkness(t: number) {
  if (t >= 21 || t < 6) return 1;
  if (t >= 18) return (t - 18) / 3;
  if (t < 8) return 1 - (t - 6) / 2;
  return 0;
}

export default function Domotique() {
  const [heure, setHeure] = useState(21);
  const [temp, setTemp] = useState(8);
  const [presence, setPresence] = useState(true);
  const [manuel, setManuel] = useState(false);

  const d = darkness(heure);
  const nuit = d > 0.5;
  const volets = nuit;
  const lumiere = manuel || (presence && nuit);
  const chauffage = temp < 19;

  const sunT = (heure - 6) / 12;
  const moonT = ((heure + 24 - 18) % 24) / 12;
  const arcPos = (t: number) => ({ x: 50 + t * 460, y: 150 - Math.sin(Math.PI * Math.min(Math.max(t, 0), 1)) * 95 });
  const sun = arcPos(sunT);
  const moon = arcPos(moonT);

  const rules = [
    { label: "SI nuit ALORS volets fermés", active: volets, color: "#3fc9d8" },
    { label: "SI présence ET nuit ALORS lumière salon", active: lumiere, color: "#ffc53d" },
    { label: "SI temp. < 19 °C ALORS chauffage", active: chauffage, color: "#ff7a29" },
  ];

  return (
    <section id="domotique" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 05"
          kicker="Domotique & objets connectés"
          title="La maison qui répond"
          desc="Un capteur acquiert une information, un programme la traite, un actionneur réagit. Règle l'heure, la température et simule une présence : la maison applique son programme toute seule."
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_330px] gap-8 items-start">
          <Reveal>
            <div className="border border-line bg-ink2/70">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Scénario domotique — temps réel</span>
                <span className="font-mono text-[11px] text-yellowT">{String(heure).padStart(2, "0")} h 00</span>
              </div>
              <svg viewBox="0 0 560 400" className="w-full block" role="img" aria-label="Maison domotique animée selon l'heure, la température et la présence">
                {/* ciel */}
                <rect x="0" y="0" width="560" height="330" fill={skyColor(d)} style={{ transition: "fill .5s" }} />
                {STARS.map((s, i) => (
                  <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#eaf3f9" opacity={d * 0.9} className={i % 4 === 0 ? "blinker" : ""} />
                ))}
                {!nuit && sunT >= 0 && sunT <= 1 && (
                  <g style={{ transition: "all .5s" }}>
                    <circle cx={sun.x} cy={sun.y} r="30" fill="#ffc53d" opacity="0.3" />
                    <circle cx={sun.x} cy={sun.y} r="19" fill="#ffc53d" />
                  </g>
                )}
                {(heure >= 18 || heure < 6) && (
                  <g style={{ transition: "all .5s" }}>
                    <circle cx={moon.x} cy={moon.y} r="15" fill="#eaf3f9" />
                    <circle cx={moon.x - 6} cy={moon.y - 4} r="13" fill={skyColor(d)} />
                  </g>
                )}

                {/* sol */}
                <rect x="0" y="330" width="560" height="70" fill="#14273c" />
                <line x1="0" y1="330" x2="560" y2="330" stroke="#24405c" strokeWidth="2" />

                {/* maison */}
                <polygon points="150,180 285,92 420,180" fill="#1d3550" stroke="#3fc9d8" strokeWidth="2" />
                <rect x="352" y="104" width="26" height="56" fill="#1d3550" stroke="#3fc9d8" strokeWidth="2" />
                <rect x="170" y="180" width="230" height="150" fill="#1d3550" stroke="#3fc9d8" strokeWidth="2" />

                {/* fenêtre gauche */}
                <rect x="190" y="200" width="58" height="55" fill={lumiere ? "#ffc53d" : "#0e1b2a"} stroke="#eaf3f9" strokeWidth="2" style={{ transition: "fill .4s" }} />
                {lumiere && <rect x="182" y="192" width="74" height="71" fill="#ffc53d" opacity="0.18" />}
                {volets ? (
                  <g>
                    <rect x="190" y="200" width="58" height="55" fill="#24405c" stroke="#eaf3f9" strokeWidth="2" />
                    {[0, 1, 2, 3].map((k) => (
                      <line key={k} x1="194" y1={210 + k * 12} x2="244" y2={210 + k * 12} stroke="#9fb6c9" strokeWidth="1.4" />
                    ))}
                  </g>
                ) : (
                  <g stroke="#eaf3f9" strokeWidth="1.4">
                    <line x1="219" y1="200" x2="219" y2="255" />
                    <line x1="190" y1="227" x2="248" y2="227" />
                  </g>
                )}

                {/* radiateur */}
                <rect x="192" y="282" width="54" height="30" fill={chauffage ? "#3a2417" : "#14273c"} stroke={chauffage ? "#ff7a29" : "#3fc9d8"} strokeWidth="2" style={{ transition: "all .4s" }} />
                {[0, 1, 2, 3].map((k) => (
                  <line key={k} x1={201 + k * 12} y1="285" x2={201 + k * 12} y2="309" stroke={chauffage ? "#ff7a29" : "#3fc9d8"} strokeWidth="1.4" />
                ))}
                {chauffage &&
                  [0, 1, 2].map((k) => (
                    <path key={k} d={`M${204 + k * 15} 276 q 4 -6 0 -12 q -4 -6 0 -12`} fill="none" stroke="#ff7a29" strokeWidth="2" className="heat-line" style={{ animationDelay: `${k * 0.45}s` }} opacity="0.9" />
                  ))}

                {/* porte */}
                <rect x="262" y="240" width="46" height="90" fill="#0e1b2a" stroke="#eaf3f9" strokeWidth="2" />
                <circle cx="300" cy="288" r="2.6" fill="#ffc53d" />

                {/* capteur de présence */}
                <rect x="272" y="222" width="26" height="10" fill="#0e1b2a" stroke={presence ? "#7bd88f" : "#9fb6c9"} strokeWidth="1.6" />
                <circle cx="285" cy="227" r="2.4" fill={presence ? "#7bd88f" : "#9fb6c9"} className={presence ? "blinker" : ""} />
                {presence && (
                  <>
                    <circle cx="285" cy="227" r="16" fill="none" stroke="#7bd88f" strokeWidth="1.4" className="pulse-ring" />
                    <polygon points="285,232 250,330 320,330" fill="#7bd88f" opacity="0.08" />
                  </>
                )}

                {/* fenêtre droite */}
                <rect x="322" y="200" width="58" height="55" fill={lumiere ? "#ffc53d" : "#0e1b2a"} stroke="#eaf3f9" strokeWidth="2" style={{ transition: "fill .4s" }} />
                {lumiere && <rect x="314" y="192" width="74" height="71" fill="#ffc53d" opacity="0.18" />}
                {volets ? (
                  <g>
                    <rect x="322" y="200" width="58" height="55" fill="#24405c" stroke="#eaf3f9" strokeWidth="2" />
                    {[0, 1, 2, 3].map((k) => (
                      <line key={k} x1="326" y1={210 + k * 12} x2="376" y2={210 + k * 12} stroke="#9fb6c9" strokeWidth="1.4" />
                    ))}
                  </g>
                ) : (
                  <g stroke="#eaf3f9" strokeWidth="1.4">
                    <line x1="351" y1="200" x2="351" y2="255" />
                    <line x1="322" y1="227" x2="380" y2="227" />
                  </g>
                )}

                {/* thermomètre extérieur */}
                <g transform="translate(480,220)">
                  <rect x="0" y="0" width="12" height="70" fill="#0e1b2a" stroke="#9fb6c9" strokeWidth="1.6" />
                  <circle cx="6" cy="78" r="10" fill={chauffage ? "#ff7a29" : "#3fc9d8"} stroke="#9fb6c9" strokeWidth="1.6" />
                  <rect x="3" y={70 - Math.max(4, ((temp + 5) / 40) * 62)} width="6" height={Math.max(4, ((temp + 5) / 40) * 62)} fill={chauffage ? "#ff7a29" : "#3fc9d8"} style={{ transition: "all .4s" }} />
                  <text x="22" y="44" fill="#9fb6c9" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="bold">
                    {temp} °C
                  </text>
                </g>
              </svg>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={120}>
              <div className="tech-card p-5">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT mb-4">Console de pilotage</h3>
                <label className="block mb-4">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-yellowT">Heure — {String(heure).padStart(2, "0")} h</span>
                  <input type="range" min={0} max={23} value={heure} onChange={(e) => setHeure(Number(e.target.value))} className="mt-2" aria-label="Heure de la journée" />
                </label>
                <label className="block mb-4">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-orangeT">Température — {temp} °C</span>
                  <input type="range" min={-5} max={35} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="mt-2" aria-label="Température extérieure" />
                </label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setPresence(!presence)} className={`font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-2 border cursor-pointer transition-colors ${presence ? "border-greenT text-greenT bg-greenT/10" : "border-line text-fog hover:border-greenT"}`} aria-pressed={presence}>
                    ◉ Présence détectée
                  </button>
                  <button onClick={() => setManuel(!manuel)} className={`font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-2 border cursor-pointer transition-colors ${manuel ? "border-yellowT text-yellowT bg-yellowT/10" : "border-line text-fog hover:border-yellowT"}`} aria-pressed={manuel}>
                    ◉ Lumière forcée
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="tech-card p-5">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-yellowT mb-3">Programme (règles SI…ALORS)</h3>
                <ul className="space-y-2.5 font-mono text-[11.5px]">
                  {rules.map((r) => (
                    <li key={r.label} className={`flex items-center gap-3 border border-line/70 px-3 py-2.5 transition-all ${r.active ? "bg-ink/70" : "opacity-55"}`}>
                      <span className={`w-2.5 h-2.5 shrink-0 ${r.active ? "blinker" : ""}`} style={{ background: r.active ? r.color : "#24405c" }} aria-hidden />
                      <span className={r.active ? "text-snow" : "text-fog"}>{r.label}</span>
                      <span className="ml-auto text-[10px]" style={{ color: r.active ? r.color : "#9fb6c9" }}>
                        {r.active ? "ACTIF" : "repos"}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[11.5px] leading-relaxed text-fog border-t border-line/60 pt-3">
                  Capteurs (présence, luminosité, température) → <strong className="text-snow">traitement</strong> par la carte programmable → actionneurs (volets, lampe, radiateur). C'est le principe de la <strong className="text-snow">chaîne d'information</strong>.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

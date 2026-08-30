import { useState } from "react";
import type { CSSProperties } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Reveal, SectionHead } from "../lib/ui";

const CONSO = 900; // W consommés par la maison

function solarW(h: number, cloud: number) {
  return Math.max(0, 3200 * Math.sin((Math.PI * (h - 6)) / 16)) * (1 - cloud / 100);
}
function windW(v: number) {
  if (v < 8 || v > 50) return 0;
  return Math.min(2400, Math.round(2400 * Math.pow((v - 8) / 42, 2)));
}
const fr = (n: number) => Math.round(n).toLocaleString("fr-FR");

export default function EnergiesLab() {
  const [h, setH] = useState(13);
  const [v, setV] = useState(22);
  const [cloud, setCloud] = useState(10);

  const solar = solarW(h, cloud);
  const wind = windW(v);
  const prod = solar + wind;
  const balance = prod - CONSO;
  const batt = Math.max(4, Math.min(100, 58 + balance / 55));

  const angle = (Math.PI * (h - 6)) / 16;
  const sunX = 70 + 420 * ((h - 6) / 16);
  const sunY = 178 - 140 * Math.sin(angle);
  const turbineD = v >= 8 && v <= 50 ? Math.max(0.7, 9 - v / 7) : 0;

  const chartData = Array.from({ length: 33 }, (_, i) => {
    const hh = 6 + i * 0.5;
    return { h: hh, solaire: Math.round(solarW(hh, cloud)), eolien: windW(v) };
  });

  return (
    <section id="energies" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 09"
          kicker="Énergies renouvelables"
          title="Alimenter la maison 24 h/24"
          desc="Déplace le soleil dans le ciel, règle la force du vent et la nébulosité : le mix énergétique de la maison change en direct. Le graphique montre la production sur toute la journée — sauras-tu éviter la panne ?"
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_330px] gap-8 items-start">
          <div className="space-y-6">
            {/* scène */}
            <Reveal>
              <div className="border border-line bg-ink2/70">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Vue du site — {String(Math.floor(h)).padStart(2, "0")}h{h % 1 ? "30" : "00"}</span>
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fog">
                    Bilan : <span className={balance >= 0 ? "text-greenT" : "text-orangeT"}>{balance >= 0 ? "+" : ""}{fr(balance)} W</span>
                  </span>
                </div>
                <svg viewBox="0 0 560 250" className="w-full block" role="img" aria-label="Scène : soleil, éolienne, panneaux et maison">
                  <line x1="0" y1="218" x2="560" y2="218" stroke="#24405c" strokeWidth="2.5" />

                  {/* trajectoire du soleil */}
                  <path d="M70 178 Q280 -90 490 178" fill="none" stroke="#24405c" strokeWidth="1.4" strokeDasharray="4 6" />
                  <g style={{ transform: `translate(${sunX}px, ${sunY}px)`, transition: "transform 0.5s ease" }}>
                    <circle r="20" fill="#ffc53d" opacity={0.18 + (1 - cloud / 100) * 0.3} />
                    <circle r="11" fill="#ffc53d" opacity={0.4 + (1 - cloud / 100) * 0.6} />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                      <line key={a} x1={Math.cos((a * Math.PI) / 180) * 15} y1={Math.sin((a * Math.PI) / 180) * 15} x2={Math.cos((a * Math.PI) / 180) * 21} y2={Math.sin((a * Math.PI) / 180) * 21} stroke="#ffc53d" strokeWidth="1.6" opacity={0.85 - cloud / 150} />
                    ))}
                  </g>
                  {/* nuages */}
                  {cloud > 20 && (
                    <g fill="#9fb6c9" opacity={cloud / 160}>
                      <ellipse cx="250" cy="52" rx="42" ry="13" />
                      <ellipse cx="285" cy="42" rx="30" ry="11" />
                      <ellipse cx="360" cy="70" rx="36" ry="11" />
                    </g>
                  )}

                  {/* éolienne */}
                  <line x1="120" y1="218" x2="120" y2="96" stroke="#eaf3f9" strokeWidth="3.5" />
                  <g style={{ transform: "translate(120px,96px)" }}>
                    <g className="rot" style={{ "--d": `${turbineD || 4}s`, animationPlayState: turbineD ? "running" : "paused" } as CSSProperties}>
                      {[0, 120, 240].map((a) => (
                        <path key={a} d="M0 0 Q8 -20 3 -46 Q0 -50 -3 -46 Q-8 -20 0 0 Z" fill="#eaf3f9" transform={`rotate(${a})`} />
                      ))}
                    </g>
                    <circle r="4" fill="#ff7a29" />
                  </g>
                  <text x="120" y="238" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#9fb6c9">
                    ÉOLIENNE · {fr(wind)} W
                  </text>

                  {/* panneaux solaires */}
                  <g transform="translate(210,190)">
                    <g transform="skewX(-24)">
                      <rect x="0" y="0" width="86" height="26" fill="#14273c" stroke="#3fc9d8" strokeWidth="2" />
                      <line x1="29" y1="0" x2="29" y2="26" stroke="#3fc9d8" strokeWidth="1" opacity="0.6" />
                      <line x1="58" y1="0" x2="58" y2="26" stroke="#3fc9d8" strokeWidth="1" opacity="0.6" />
                      <line x1="0" y1="13" x2="86" y2="13" stroke="#3fc9d8" strokeWidth="1" opacity="0.6" />
                    </g>
                    <rect x="20" y="26" width="6" height="10" fill="#9fb6c9" />
                    <rect x="62" y="26" width="6" height="10" fill="#9fb6c9" />
                  </g>
                  <text x="252" y="240" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#9fb6c9">
                    SOLAIRE · {fr(solar)} W
                  </text>

                  {/* maison */}
                  <g>
                    <path d="M380 150 L430 116 L480 150 Z" fill="#14273c" stroke="#ff7a29" strokeWidth="2" />
                    <rect x="388" y="150" width="84" height="68" fill="#14273c" stroke="#ff7a29" strokeWidth="2" />
                    <rect x="402" y="166" width="20" height="18" fill={balance >= 0 ? "#ffc53d" : "#e8442e"} opacity="0.9" style={{ transition: "fill .3s" }} />
                    <rect x="438" y="166" width="20" height="18" fill={balance >= 0 ? "#ffc53d" : "#e8442e"} opacity="0.9" style={{ transition: "fill .3s" }} />
                    <rect x="420" y="192" width="18" height="26" fill="#0e1b2a" stroke="#ff7a29" strokeWidth="1.4" />
                  </g>
                  <text x="430" y="238" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#9fb6c9">
                    MAISON · {fr(CONSO)} W
                  </text>

                  {/* lignes de flux */}
                  {solar > 40 && <line x1="262" y1="196" x2="382" y2="178" stroke="#ffc53d" strokeWidth="2" className="flow-dash" />}
                  {wind > 40 && <line x1="132" y1="150" x2="380" y2="170" stroke="#3fc9d8" strokeWidth="2" className="flow-dash" />}
                </svg>
              </div>
            </Reveal>

            {/* graphique */}
            <Reveal delay={120}>
              <div className="border border-line bg-ink2/70 p-4 sm:p-5">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog mb-3">
                  Production sur la journée (W) — la ligne marque l'heure choisie
                </p>
                <div className="h-[210px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 6, right: 10, left: -14, bottom: 0 }}>
                      <CartesianGrid stroke="#24405c" strokeDasharray="3 3" />
                      <XAxis dataKey="h" tickFormatter={(v: number) => `${Math.floor(v)}h`} stroke="#9fb6c9" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} interval={5} />
                      <YAxis stroke="#9fb6c9" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} />
                      <Tooltip
                        contentStyle={{ background: "#0e1b2a", border: "1px solid #24405c", fontFamily: "IBM Plex Mono", fontSize: 11 }}
                        labelFormatter={(v) => `≈ ${Math.floor(Number(v))}h`}
                        formatter={(value: number | string, name: string) => [`${fr(Number(value))} W`, name === "solaire" ? "Solaire" : "Éolien"]}
                      />
                      <ReferenceLine x={h} stroke="#ff7a29" strokeDasharray="4 4" />
                      <ReferenceLine y={CONSO} stroke="#e8442e" strokeDasharray="6 4" label={{ value: "conso 900 W", fill: "#e8442e", fontSize: 10, fontFamily: "IBM Plex Mono" }} />
                      <Area type="monotone" dataKey="solaire" stroke="#ffc53d" fill="#ffc53d" fillOpacity={0.22} strokeWidth={2} />
                      <Area type="monotone" dataKey="eolien" stroke="#3fc9d8" fill="#3fc9d8" fillOpacity={0.18} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
          </div>

          {/* réglages */}
          <div className="space-y-5">
            <Reveal delay={100}>
              <div className="tech-card p-5 space-y-5">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT">Météo & heure</h3>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-yellowT">Heure — {Math.floor(h)}h{h % 1 ? "30" : "00"}</span>
                  <input type="range" min={6} max={22} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} className="mt-2" aria-label="Heure de la journée" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyanT">Vent — {v} km/h {v > 50 ? "(coupure sécurité)" : v < 8 ? "(trop faible)" : ""}</span>
                  <input type="range" min={0} max={60} step={1} value={v} onChange={(e) => setV(Number(e.target.value))} className="mt-2" aria-label="Vitesse du vent" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fog">Nébulosité — {cloud} %</span>
                  <input type="range" min={0} max={100} step={5} value={cloud} onChange={(e) => setCloud(Number(e.target.value))} className="mt-2" aria-label="Nébulosité" />
                </label>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="tech-card p-5 font-mono text-[12px]">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-yellowT mb-3">Bilan énergétique</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-fog">Solaire</span><span className="text-yellowT">{fr(solar)} W</span></div>
                  <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-fog">Éolien</span><span className="text-cyanT">{fr(wind)} W</span></div>
                  <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-fog">Consommation</span><span className="text-redT">{fr(CONSO)} W</span></div>
                  <div className="flex justify-between"><span className="text-fog">Surplus / défaut</span><span className={balance >= 0 ? "text-greenT" : "text-orangeT"}>{balance >= 0 ? "+" : ""}{fr(balance)} W</span></div>
                </div>
                <p className="mt-4 text-[10.5px] tracking-[0.16em] uppercase text-fog">Batterie domestique</p>
                <div className="mt-2 h-4 border border-line relative">
                  <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width: `${batt}%`, background: balance >= 0 ? "#7bd88f" : "#ff7a29" }} />
                  <span className="absolute inset-0 grid place-items-center text-[10px] text-ink font-bold mix-blend-hard-light">{Math.round(batt)} %</span>
                </div>
                <p className="mt-4 text-[11.5px] leading-relaxed text-fog font-body">
                  Ni le soleil ni le vent ne sont constants : c'est pourquoi on <strong className="text-snow">combine les sources</strong> et on stocke l'excédent dans une batterie.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

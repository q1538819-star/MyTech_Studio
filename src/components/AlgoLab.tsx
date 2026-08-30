import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const STEPS = [
  { color: "#ffc53d", label: "Quand le [capteur de présence] détecte un véhicule", kind: "Événement" },
  { color: "#3fc9d8", label: "Allumer le feu VERT", kind: "Action" },
  { color: "#ff7a29", label: "Ouvrir la barrière (rotation 90°)", kind: "Action" },
  { color: "#7bd88f", label: "Attendre que le véhicule soit passé", kind: "Contrôle" },
  { color: "#ff7a29", label: "Fermer la barrière", kind: "Action" },
  { color: "#3fc9d8", label: "Allumer le feu ROUGE", kind: "Action" },
  { color: "#7bd88f", label: "Ajouter 1 au compteur de passages", kind: "Donnée" },
];

// état visuel associé à chaque étape
const STATES = [
  { gate: 0, light: "#e8442e", car: 90, sensor: true },
  { gate: 0, light: "#7bd88f", car: 90, sensor: true },
  { gate: -86, light: "#7bd88f", car: 90, sensor: true },
  { gate: -86, light: "#7bd88f", car: 430, sensor: false },
  { gate: 0, light: "#7bd88f", car: 430, sensor: false },
  { gate: 0, light: "#e8442e", car: 430, sensor: false },
  { gate: 0, light: "#e8442e", car: 430, sensor: false },
];

export default function AlgoLab() {
  const [step, setStep] = useState(-1);
  const [auto, setAuto] = useState(false);
  const [cars, setCars] = useState(0);
  const timer = useRef<number | null>(null);

  const running = step >= 0;
  const s = running ? STATES[step] : STATES[0];

  const advance = () => {
    setStep((prev) => {
      const next = prev + 1;
      if (next >= STEPS.length) {
        setCars((c) => c + 1);
        return -1; // retour au repos, prêt pour la prochaine voiture
      }
      return next;
    });
  };

  useEffect(() => {
    if (!auto) return;
    timer.current = window.setInterval(() => advance(), 1150);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [auto]);

  const stop = () => {
    setAuto(false);
    setStep(-1);
  };

  return (
    <section id="algo" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 08"
          kicker="Algorithmique"
          title="Programme la barrière automatique"
          desc="Un automate exécute un programme : une instruction après l'autre, sans jamais improviser. Lance l'exécution pas à pas ou en automatique et observe chaque bloc s'allumer pendant que la scène réagit."
        />

        <div className="mt-12 grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          {/* programme */}
          <Reveal>
            <div className="tech-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT">Programme : barriere_v2.scratch</h3>
                <span className={`font-mono text-[10px] px-2 py-1 border ${auto ? "border-greenT text-greenT blinker" : "border-line text-fog"}`}>
                  {auto ? "● AUTO" : running ? "PAUSE" : "PRÊT"}
                </span>
              </div>
              <ol className="space-y-1.5">
                {STEPS.map((st, i) => {
                  const active = i === step;
                  const passed = running && i < step;
                  return (
                    <li
                      key={i}
                      className="relative flex items-stretch transition-all duration-300"
                      style={{ transform: active ? "translateX(6px)" : "none" }}
                    >
                      <span className="w-1.5 shrink-0" style={{ background: st.color, opacity: active || passed ? 1 : 0.35 }} aria-hidden />
                      <div
                        className={`flex-1 px-3 py-2.5 border transition-colors duration-300 ${
                          active ? "border-snow bg-ink3" : "border-line/70 bg-ink/40"
                        }`}
                      >
                        <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase" style={{ color: st.color }}>
                          {st.kind}
                        </p>
                        <p className={`mt-0.5 text-[12.5px] leading-snug ${active ? "text-snow" : "text-fog"}`}>
                          <span className="text-fog/60 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                          {st.label}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={advance} disabled={auto} className="flex-1 font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default">
                  {running ? "Instruction ▸ suivante" : "▶ Exécuter"}
                </button>
                <button onClick={() => setAuto(!auto)} className={`font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 border-2 cursor-pointer transition-colors ${auto ? "border-redT text-redT hover:bg-redT/10" : "border-line text-fog hover:border-greenT hover:text-greenT"}`}>
                  {auto ? "■ Stop" : "▶▶ Auto"}
                </button>
                <button onClick={stop} className="font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 border-2 border-line text-fog hover:border-fog cursor-pointer transition-colors">
                  ↺ Reset
                </button>
              </div>
              <p className="mt-4 font-mono text-[11px] text-fog">
                Véhicules passés : <span className="text-yellowT text-sm font-semibold">{cars}</span>
              </p>
            </div>
          </Reveal>

          {/* scène */}
          <Reveal delay={120}>
            <div className="border border-line bg-ink2/70">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Scène — parking du collège</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fog">
                  Capteur PIR : <span className={s.sensor ? "text-greenT" : "text-fog/60"}>{s.sensor && running ? "● déclenché" : "○ rien"}</span>
                </span>
              </div>
              <svg viewBox="0 0 560 300" className="w-full block" role="img" aria-label="Barrière de parking automatique animée">
                {/* ciel + sol */}
                <line x1="0" y1="252" x2="560" y2="252" stroke="#24405c" strokeWidth="2.5" />
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={i} x1={20 + i * 40} y1="252" x2={10 + i * 40} y2="264" stroke="#24405c" strokeWidth="1.2" />
                ))}
                <text x="24" y="40" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#9fb6c9">
                  PARKING — 12 PLACES
                </text>
                <rect x="420" y="120" width="110" height="132" fill="none" stroke="#24405c" strokeWidth="2" />
                <text x="475" y="196" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#3a5672">P</text>

                {/* feu */}
                <rect x="330" y="110" width="26" height="56" fill="#0e1b2a" stroke="#9fb6c9" strokeWidth="2" />
                <circle cx="343" cy="126" r="7" fill={s.light === "#e8442e" ? "#e8442e" : "#3a2a28"} style={{ transition: "fill .3s" }} />
                <circle cx="343" cy="150" r="7" fill={s.light === "#7bd88f" ? "#7bd88f" : "#28352a"} style={{ transition: "fill .3s" }} />
                <line x1="343" y1="166" x2="343" y2="252" stroke="#9fb6c9" strokeWidth="3" />

                {/* capteur */}
                <rect x="118" y="222" width="18" height="30" fill="#14273c" stroke="#3fc9d8" strokeWidth="1.6" />
                <circle cx="127" cy="230" r="3.5" fill={s.sensor && running ? "#7bd88f" : "#3a5672"} className={s.sensor && running ? "blinker" : ""} />
                {s.sensor && running && (
                  <>
                    <circle cx="127" cy="230" r="14" fill="none" stroke="#7bd88f" strokeWidth="1.5" className="ping-ring" />
                    <circle cx="127" cy="230" r="14" fill="none" stroke="#7bd88f" strokeWidth="1.5" className="ping-ring" style={{ animationDelay: "0.6s" }} />
                  </>
                )}
                <text x="127" y="282" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#9fb6c9">CAPTEUR</text>

                {/* barrière */}
                <rect x="240" y="196" width="22" height="56" fill="#14273c" stroke="#ff7a29" strokeWidth="2" />
                <g style={{ transformOrigin: "251px 204px", transform: `rotate(${s.gate}deg)`, transition: "transform 0.8s cubic-bezier(0.34, 1.3, 0.5, 1)" }}>
                  <rect x="251" y="199" width="150" height="9" fill="#ff7a29" />
                  <rect x="251" y="199" width="24" height="9" fill="#eaf3f9" />
                  <rect x="299" y="199" width="24" height="9" fill="#eaf3f9" />
                  <rect x="347" y="199" width="24" height="9" fill="#eaf3f9" />
                </g>
                <circle cx="251" cy="204" r="5" fill="#ffc53d" />

                {/* voiture */}
                <g style={{ transform: `translateX(${s.car}px)`, transition: "transform 1s ease-in-out" }}>
                  <rect x="20" y="214" width="92" height="26" fill="#3fc9d8" />
                  <path d="M34 214 L46 198 L92 198 L104 214 Z" fill="#3fc9d8" />
                  <rect x="50" y="201" width="18" height="11" fill="#0e1b2a" />
                  <rect x="72" y="201" width="18" height="11" fill="#0e1b2a" />
                  <circle cx="42" cy="244" r="10" fill="#0e1b2a" stroke="#9fb6c9" strokeWidth="2" />
                  <circle cx="96" cy="244" r="10" fill="#0e1b2a" stroke="#9fb6c9" strokeWidth="2" />
                </g>

                <text x="24" y="130" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill={running ? "#7bd88f" : "#3a5672"} className={running ? "" : ""}>
                  {running ? `▶ exécution — ligne ${step + 1}` : "■ automate en attente"}
                </text>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHead, Stamp } from "../lib/ui";

type Bloc = { id: string; label: string; type: "start" | "action" | "test" | "end"; branch?: string };

const BLOCKS: Bloc[] = [
  { id: "debut", label: "DÉBUT", type: "start" },
  { id: "lire", label: "Lire le capteur de présence", type: "action" },
  { id: "test", label: "Présence détectée ?", type: "test" },
  { id: "lever", label: "Lever la barrière", type: "action", branch: "OUI" },
  { id: "attendre", label: "Attendre 3 secondes", type: "action", branch: "OUI" },
  { id: "baisser", label: "Baisser la barrière", type: "action", branch: "OUI" },
  { id: "clignoter", label: "Clignoter feu orange", type: "action", branch: "NON" },
  { id: "fin", label: "FIN DE CYCLE", type: "end" },
];

const ORDER = BLOCKS.map((b) => b.id);
const SHUFFLED = ["attendre", "debut", "clignoter", "lire", "fin", "lever", "test", "baisser"];

const byId = (id: string) => BLOCKS.find((b) => b.id === id)!;

type Step = { n: string; log: string; fx: Partial<{ barrierUp: boolean; carIn: boolean; carPass: boolean; clignote: boolean }> };

function stepsFor(car: boolean): Step[] {
  if (car)
    return [
      { n: "debut", log: "▶ démarrage du programme barrière", fx: {} },
      { n: "lire", log: "capteur infrarouge : lecture…", fx: {} },
      { n: "test", log: "obstacle détecté → branche OUI", fx: { carIn: true } },
      { n: "lever", log: "actionneur : moteur → barrière levée", fx: { barrierUp: true } },
      { n: "attendre", log: "temporisation 3 s — la voiture passe", fx: { carPass: true } },
      { n: "baisser", log: "actionneur : barrière baissée, voie libre", fx: { barrierUp: false, carIn: false, carPass: false } },
      { n: "fin", log: "■ cycle terminé — en attente d'une nouvelle voiture", fx: {} },
    ];
  return [
    { n: "debut", log: "▶ démarrage du programme barrière", fx: {} },
    { n: "lire", log: "capteur infrarouge : lecture…", fx: {} },
    { n: "test", log: "aucun obstacle → branche NON", fx: {} },
    { n: "clignoter", log: "feu orange : la barrière reste fermée", fx: { clignote: true } },
    { n: "fin", log: "■ cycle terminé — retour à la lecture capteur", fx: { clignote: false } },
  ];
}

const NODE_POS: Record<string, { x: number; y: number; w: number; h: number }> = {
  debut: { x: 175, y: 14, w: 130, h: 34 },
  lire: { x: 150, y: 74, w: 180, h: 40 },
  test: { x: 240, y: 158, w: 0, h: 0 }, // diamant spécial
  lever: { x: 150, y: 254, w: 180, h: 40 },
  attendre: { x: 150, y: 320, w: 180, h: 40 },
  baisser: { x: 150, y: 386, w: 180, h: 40 },
  clignoter: { x: 352, y: 148, w: 168, h: 44 },
  fin: { x: 160, y: 452, w: 160, h: 34 },
};

export default function AlgorigrammeLab() {
  const [phase, setPhase] = useState<"build" | "run">("build");
  const [placed, setPlaced] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [errors, setErrors] = useState(0);
  const [car, setCar] = useState(true);
  const [stepIdx, setStepIdx] = useState(-1);
  const [scene, setScene] = useState({ barrierUp: false, carIn: false, carPass: false, clignote: false });
  const [logs, setLogs] = useState<string[]>([]);
  const [auto, setAuto] = useState(false);
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | null>(null);

  const steps = stepsFor(car);
  const active = stepIdx >= 0 ? steps[stepIdx].n : null;
  const finished = stepIdx === steps.length - 1;

  // ---- phase construction ----
  const clickTile = (id: string) => {
    if (placed.includes(id)) return;
    if (id === ORDER[placed.length]) {
      setPlaced((p) => [...p, id]);
      setWrong(null);
    } else {
      setWrong(id);
      setErrors((e) => e + 1);
      window.setTimeout(() => setWrong(null), 500);
    }
  };

  const resetBuild = () => {
    setPlaced([]);
    setErrors(0);
    setWrong(null);
    setPhase("build");
    stopAuto();
    setStepIdx(-1);
    setLogs([]);
    setScene({ barrierUp: false, carIn: false, carPass: false, clignote: false });
  };

  // ---- phase exécution ----
  const applyStep = (i: number) => {
    const s = steps[i];
    setStepIdx(i);
    setScene((prev) => ({ ...prev, ...s.fx }));
    setLogs((l) => [...l, s.log]);
  };

  const nextStep = () => {
    const next = stepIdx + 1;
    if (next < steps.length) applyStep(next);
  };

  const relancer = () => {
    stopAuto();
    setStepIdx(-1);
    setLogs([]);
    setScene({ barrierUp: false, carIn: false, carPass: false, clignote: false });
  };

  const stopAuto = () => {
    setAuto(false);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };

  const startAuto = () => {
    if (finished || active === null) relancer();
    setAuto(true);
  };

  useEffect(() => {
    if (!auto) return;
    timer.current = window.setInterval(() => {
      setStepIdx((idx) => {
        const next = idx + 1;
        if (next >= steps.length) {
          setAuto(false);
          return idx;
        }
        const s = steps[next];
        setScene((prev) => ({ ...prev, ...s.fx }));
        setLogs((l) => [...l, s.log]);
        return next;
      });
    }, 1050);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, car]);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => () => {
    if (timer.current) window.clearInterval(timer.current);
  }, []);

  const buildDone = placed.length === ORDER.length;

  const NodeShape = ({ id }: { id: string }) => {
    const b = byId(id);
    const isActive = active === id;
    const stroke = isActive ? "#ffc53d" : b.type === "test" ? "#ff7a29" : b.type === "start" || b.type === "end" ? "#7bd88f" : "#3fc9d8";
    const common = {
      fill: isActive ? "#2a3d55" : "#0e1b2a",
      stroke,
      strokeWidth: isActive ? 3 : 2,
      style: { transition: "all .3s" },
    };
    if (b.type === "test") {
      return (
        <g>
          <path d="M240 122 L318 158 L240 194 L162 158 Z" {...common} />
          <text x="240" y="162" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#eaf3f9">
            {b.label}
          </text>
        </g>
      );
    }
    const pos = NODE_POS[id];
    const rx = b.type === "start" || b.type === "end" ? 17 : 0;
    return (
      <g>
        <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx={rx} {...common} />
        <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 4} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#eaf3f9">
          {b.label}
        </text>
      </g>
    );
  };

  return (
    <section id="algorigramme" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 13"
          kicker="Informatique · façon techno-flash"
          title="Algorithme & algorigramme"
          desc="Un algorigramme dessine un programme : rectangles pour les actions, losange pour le test, flèches pour l'ordre. D'abord, reconstitue celui de la barrière de parking dans le bon ordre. Ensuite, exécute-le pas à pas et regarde la scène réagir."
        />

        {/* phase 1 : assemblage */}
        {phase === "build" && (
          <Reveal delay={120}>
            <div className="mt-12 border border-line bg-ink2/70">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">
                  Étape 1/2 — remettre les blocs dans l'ordre · erreurs : <span className="text-redT">{errors}</span>
                </span>
                <button onClick={resetBuild} className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-fog/50 text-fog hover:border-yellowT hover:text-yellowT transition-colors cursor-pointer">
                  ↻ Mélanger
                </button>
              </div>

              {/* slots */}
              <div className="px-5 pt-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ORDER.map((id, i) => {
                    const done = i < placed.length;
                    const b = byId(id);
                    return (
                      <div
                        key={id}
                        className={`border-2 px-3 py-2.5 min-h-[58px] flex items-center gap-2 transition-colors ${
                          done ? "border-greenT bg-greenT/10" : i === placed.length ? "border-yellowT border-dashed" : "border-line"
                        }`}
                      >
                        <span className="font-display text-lg text-fog/70">{i + 1}</span>
                        {done ? (
                          <span className="font-mono text-[10.5px] uppercase tracking-wide text-snow">
                            {b.branch && <em className="not-italic text-yellowT mr-1">[{b.branch}]</em>}
                            {b.label}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] uppercase tracking-widest text-fog/50">
                            {i === placed.length ? "▸ prochain bloc" : "…"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* tuiles */}
              <div className="px-5 py-6 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {SHUFFLED.map((id) => {
                  const b = byId(id);
                  const used = placed.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => clickTile(id)}
                      disabled={used}
                      className={`px-3 py-3 border-2 font-mono text-[11px] uppercase tracking-wide text-left transition-all cursor-pointer disabled:cursor-default ${
                        used
                          ? "border-line/40 text-fog/30 bg-transparent"
                          : wrong === id
                          ? "border-redT bg-redT/15 text-snow shake-x"
                          : b.type === "test"
                          ? "border-orangeT/70 text-orangeT hover:bg-orangeT/10 -rotate-1"
                          : "border-cyanT/50 text-snow hover:bg-cyanT/10 hover:-translate-y-0.5"
                      }`}
                    >
                      {b.type === "test" ? "◇ " : b.type === "start" || b.type === "end" ? "⬭ " : "▭ "}
                      {b.label}
                    </button>
                  );
                })}
              </div>

              <div className="px-5 pb-6">
                {buildDone ? (
                  <div className="rise flex flex-wrap items-center gap-4">
                    <Stamp className="border-greenT text-greenT">Algorigramme correct !</Stamp>
                    <button
                      onClick={() => setPhase("run")}
                      className="font-mono text-[11px] tracking-[0.18em] uppercase px-5 py-3 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors cursor-pointer"
                    >
                      Passer à l'exécution →
                    </button>
                  </div>
                ) : (
                  <p className="font-mono text-[10.5px] uppercase tracking-wider text-fog/70">
                    Indice : un programme commence toujours par DÉBUT, et le losange pose une question dont découlent deux branches.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* phase 2 : exécution */}
        {phase === "run" && (
          <div className="rise mt-12 grid lg:grid-cols-[1fr_340px] gap-7 items-start">
            <div className="border border-line bg-ink2/70">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Étape 2/2 — exécution de l'algorigramme</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-fog cursor-pointer">
                    <button
                      onClick={() => setCar(!car)}
                      className={`w-9 h-4.5 relative border transition-colors ${car ? "bg-greenT/20 border-greenT" : "bg-transparent border-fog/60"}`}
                      aria-pressed={car}
                      aria-label="Une voiture arrive"
                    >
                      <span className={`absolute top-[2px] w-3 h-3 transition-all ${car ? "left-[20px] bg-greenT" : "left-[2px] bg-fog"}`} />
                    </button>
                    Une voiture arrive
                  </label>
                </div>
              </div>

              <svg viewBox="0 0 540 500" className="w-full block" role="img" aria-label="Algorigramme en cours d'exécution">
                {/* flèches */}
                <g stroke="#3a5672" strokeWidth="2" fill="none">
                  <path d="M240 48 L240 72 M240 72 l-4 -6 M240 72 l4 -6" transform="translate(0,0)" />
                  <path d="M240 48 L240 74" />
                  <path d="M240 114 L240 122" />
                  <path d="M240 194 L240 252" />
                  <path d="M240 294 L240 318" />
                  <path d="M240 360 L240 384" />
                  <path d="M318 158 L350 158 L350 170" />
                  <path d="M240 426 L240 450" />
                  <path d="M150 340 L96 340 L96 94 L148 94" />
                  <path d="M520 192 L520 60 L332 60 L332 72" />
                </g>
                <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#9fb6c9">
                  <text x="248" y="230">OUI</text>
                  <text x="322" y="148">NON</text>
                  <text x="104" y="222" transform="rotate(-90 104 222)">boucle</text>
                  <text x="528" y="120" transform="rotate(-90 528 120)">boucle</text>
                </g>

                {ORDER.map((id) => (
                  <NodeShape key={id} id={id} />
                ))}
              </svg>
            </div>

            <div className="space-y-5">
              {/* scène */}
              <div className="tech-card p-4">
                <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyanT mb-2">Scène — barrière de parking</h3>
                <svg viewBox="0 0 300 150" className="w-full block" role="img" aria-label="Barrière de parking animée">
                  <line x1="8" y1="118" x2="292" y2="118" stroke="#24405c" strokeWidth="2.5" />
                  {/* guérite */}
                  <rect x="182" y="52" width="34" height="66" fill="#14273c" stroke="#3fc9d8" strokeWidth="1.6" />
                  <rect x="188" y="62" width="22" height="14" fill={scene.carIn ? "#ffc53d" : "#24405c"} style={{ transition: "fill .4s" }} />
                  {/* poteau + barrière */}
                  <rect x="150" y="78" width="10" height="40" fill="#24405c" stroke="#3fc9d8" strokeWidth="1.4" />
                  <g style={{ transformOrigin: "155px 82px", transform: scene.barrierUp ? "rotate(-75deg)" : "rotate(0deg)", transition: "transform .8s ease" }}>
                    <rect x="155" y="78" width="98" height="7" fill="#ff7a29" />
                    <rect x="172" y="78" width="14" height="7" fill="#eaf3f9" />
                    <rect x="204" y="78" width="14" height="7" fill="#eaf3f9" />
                    <rect x="236" y="78" width="14" height="7" fill="#eaf3f9" />
                  </g>
                  {/* feu */}
                  <rect x="258" y="62" width="16" height="30" fill="#14273c" stroke="#24405c" strokeWidth="1.4" />
                  <circle cx="266" cy="71" r="4.5" fill={scene.clignote ? "#ff7a29" : "#3a2a22"} className={scene.clignote ? "blinker" : ""} />
                  <circle cx="266" cy="83" r="4.5" fill={scene.carIn && scene.barrierUp ? "#7bd88f" : "#223a2a"} />
                  {/* voiture */}
                  <g style={{ transform: `translateX(${scene.carPass ? 210 : scene.carIn ? 0 : -120}px)`, transition: "transform 2.4s ease" }}>
                    <rect x="30" y="88" width="64" height="22" fill="#3fc9d8" />
                    <rect x="42" y="74" width="38" height="16" fill="#3fc9d8" />
                    <rect x="48" y="77" width="12" height="11" fill="#0e1b2a" />
                    <rect x="64" y="77" width="12" height="11" fill="#0e1b2a" />
                    <circle cx="44" cy="112" r="8" fill="#14273c" stroke="#eaf3f9" strokeWidth="2" />
                    <circle cx="80" cy="112" r="8" fill="#14273c" stroke="#eaf3f9" strokeWidth="2" />
                  </g>
                  <text x="10" y="140" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#9fb6c9" letterSpacing="1">
                    {scene.barrierUp ? "VOIE OUVERTE" : "VOIE FERMÉE"}
                  </text>
                </svg>
              </div>

              {/* console */}
              <div className="tech-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-yellowT">Console d'exécution</h3>
                  <span className="font-mono text-[10px] text-fog">{stepIdx + 1}/{steps.length}</span>
                </div>
                <div ref={consoleRef} className="mt-2 h-28 overflow-y-auto border border-line bg-ink p-3 font-mono text-[10.5px] leading-relaxed text-greenT">
                  {logs.length === 0 ? <p className="text-fog/60">&gt; prêt. Lance l'exécution…</p> : logs.map((l, i) => <p key={i}>&gt; {l}</p>)}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={nextStep} disabled={auto || finished} className="font-mono text-[10px] tracking-[0.16em] uppercase px-3.5 py-2.5 border-2 border-cyanT text-cyanT disabled:opacity-35 hover:bg-cyanT/10 transition-colors cursor-pointer">
                    ▸ Pas à pas
                  </button>
                  <button onClick={startAuto} disabled={auto || finished} className="font-mono text-[10px] tracking-[0.16em] uppercase px-3.5 py-2.5 border-2 border-greenT text-greenT disabled:opacity-35 hover:bg-greenT/10 transition-colors cursor-pointer">
                    ▶ Auto
                  </button>
                  <button onClick={relancer} className="font-mono text-[10px] tracking-[0.16em] uppercase px-3.5 py-2.5 border-2 border-orangeT text-orangeT hover:bg-orangeT/10 transition-colors cursor-pointer">
                    ⟲ Relancer
                  </button>
                  <button onClick={resetBuild} className="font-mono text-[10px] tracking-[0.16em] uppercase px-3.5 py-2.5 border-2 border-fog/50 text-fog hover:border-yellowT hover:text-yellowT transition-colors cursor-pointer">
                    ← Réassembler
                  </button>
                </div>
                {auto && <p className="mt-2 font-mono text-[10px] text-yellowT blinker">● exécution automatique en cours…</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

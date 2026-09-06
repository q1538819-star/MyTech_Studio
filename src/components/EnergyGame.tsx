import { useState } from "react";
import { Reveal, SectionHead, Stamp } from "../lib/ui";

type Tuile = { id: string; label: string; kind: "fonction" | "energie" | "intrus" };

const TARGET: Tuile[] = [
  { id: "ein", label: "ÉNERGIE ÉLECTRIQUE", kind: "energie" },
  { id: "alim", label: "ALIMENTER · Pile 9 V", kind: "fonction" },
  { id: "dist", label: "DISTRIBUER · Interrupteur", kind: "fonction" },
  { id: "conv", label: "CONVERTIR · Moteur électrique", kind: "fonction" },
  { id: "trans", label: "TRANSMETTRE · Pignons + roues", kind: "fonction" },
  { id: "eout", label: "ÉNERGIE MÉCANIQUE", kind: "energie" },
];

const INTRUS: Tuile[] = [
  { id: "d1", label: "Haut-parleur", kind: "intrus" },
  { id: "d2", label: "Capteur de température", kind: "intrus" },
];

const TILES_ORDER = ["dist", "d1", "trans", "ein", "conv", "d2", "eout", "alim"];

export default function EnergyGame() {
  const [placed, setPlaced] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [errors, setErrors] = useState(0);
  const [msg, setMsg] = useState("Clique sur les tuiles dans l'ordre : de l'énergie stockée jusqu'au mouvement du robot.");

  const targetIds = TARGET.map((t) => t.id);
  const done = placed.length === targetIds.length;

  const click = (t: Tuile) => {
    if (placed.includes(t.id)) return;
    if (t.kind === "intrus") {
      setWrong(t.id);
      setErrors((e) => e + 1);
      setMsg(`✗ « ${t.label} » est un intrus : il n'appartient pas à la chaîne d'énergie du robot.`);
      window.setTimeout(() => setWrong(null), 500);
      return;
    }
    if (t.id === targetIds[placed.length]) {
      const next = [...placed, t.id];
      setPlaced(next);
      setMsg(next.length === targetIds.length ? "✓ Chaîne complète : l'énergie circule de la pile aux roues !" : "✓ Bien joué — continue la chaîne.");
    } else {
      setWrong(t.id);
      setErrors((e) => e + 1);
      setMsg(`✗ Pas à cette étape : que fait-on ${placed.length === 0 ? "avant tout" : `juste après « ${TARGET[placed.length - 1].label.split("·")[0].trim()} »`} ?`);
      window.setTimeout(() => setWrong(null), 500);
    }
  };

  const reset = () => {
    setPlaced([]);
    setErrors(0);
    setMsg("Clique sur les tuiles dans l'ordre : de l'énergie stockée jusqu'au mouvement du robot.");
  };

  const tileById = (id: string) => [...TARGET, ...INTRUS].find((t) => t.id === id)!;

  return (
    <section className="bg-seyes text-cardink relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-4 pb-20 sm:pb-24 relative">
        <SectionHead
          dark={false}
          index="Atelier 01 · exercice"
          kicker="Comme sur techno-flash : à toi de construire"
          title="Reconstitue la chaîne d'énergie"
          desc="Le robot suiveur de ligne attend sa chaîne d'énergie. Six tuiles s'enchaînent — mais deux intrus se sont glissés dans le tas. À toi de les repérer et de remettre l'ordre : énergie entrante, alimenter, distribuer, convertir, transmettre, énergie sortante."
        />

        <Reveal delay={120}>
          <div className="mt-10 border-2 border-cardink bg-[#fffdf4] shadow-[5px_5px_0_rgba(23,41,61,0.85)] p-5 sm:p-7">
            {/* chaîne en construction */}
            <div className="flex flex-wrap items-stretch gap-y-2">
              {TARGET.map((t, i) => {
                const isPlaced = i < placed.length;
                return (
                  <div key={t.id} className="flex items-center">
                    <div
                      className={`min-w-[128px] sm:min-w-[150px] px-3 py-3 border-2 text-center transition-all ${
                        isPlaced
                          ? t.kind === "energie"
                            ? "bg-cardink text-yellowT border-cardink"
                            : "bg-cardink text-paper border-cardink"
                          : "border-dashed border-cardink/50 text-[#71808f]"
                      }`}
                    >
                      {isPlaced ? (
                        <span className="font-mono text-[10px] uppercase tracking-wide font-semibold leading-snug block">{t.label}</span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-widest">case {i + 1}</span>
                      )}
                    </div>
                    {i < TARGET.length - 1 && (
                      <svg viewBox="0 0 24 12" className={`w-6 h-3 shrink-0 ${isPlaced ? "text-redT" : "text-cardink/30"}`} aria-hidden>
                        <path d="M0 6h18M18 6l-5-4M18 6l-5 4" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>

            {done && (
              <div className="rise mt-4 flex flex-wrap items-center gap-4 border-2 border-dashed border-[#3d7a4a] bg-[#eef6ee] px-4 py-3">
                <Stamp className="border-[#3d7a4a] text-[#3d7a4a] bg-transparent">Chaîne validée</Stamp>
                <p className="font-mono text-[11px] text-[#33465c]">
                  Énergie électrique → pile → interrupteur → moteur → pignons → roues : <strong>{errors === 0 ? "sans aucune erreur !" : `avec ${errors} erreur${errors > 1 ? "s" : ""}`}</strong>
                </p>
              </div>
            )}

            {/* tas de tuiles */}
            <p className="mt-7 mb-3 font-mono text-[10px] tracking-[0.25em] uppercase text-[#a8700a]">Le tas de composants — à toi de trier</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {TILES_ORDER.map((id) => {
                const t = tileById(id);
                const used = placed.includes(t.id);
                return (
                  <button
                    key={id}
                    onClick={() => click(t)}
                    disabled={used || done}
                    className={`px-3 py-3.5 border-2 font-mono text-[10.5px] uppercase tracking-wide text-left transition-all cursor-pointer disabled:cursor-default ${
                      used
                        ? "border-cardink/25 text-cardink/30 bg-paper"
                        : wrong === id
                        ? "border-redT bg-redT/10 shake-x"
                        : t.kind === "energie"
                        ? "border-[#a8700a] text-[#7a5300] bg-[#fdf3d8] hover:-translate-y-0.5"
                        : "border-cardink text-cardink bg-[#fffdf4] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_rgba(23,41,61,0.3)]"
                    }`}
                  >
                    {used ? "✓ " : ""}
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t-2 border-dashed border-cardink/25 pt-4">
              <p className={`font-mono text-[11.5px] flex-1 min-w-[240px] ${msg.startsWith("✗") ? "text-redT" : msg.startsWith("✓") ? "text-[#3d7a4a]" : "text-[#41546b]"}`}>
                {msg}
              </p>
              <button onClick={reset} className="font-mono text-[10.5px] tracking-[0.18em] uppercase px-4 py-2.5 border-2 border-cardink hover:bg-cardink hover:text-paper transition-colors cursor-pointer">
                ↻ Recommencer
              </button>
              <span className="font-mono text-[11px] text-[#71808f]">
                erreurs : <strong className={errors > 0 ? "text-redT" : ""}>{errors}</strong>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

type Gate = "ET" | "OU" | "NON";

const SYMBOL: Record<Gate, string> = { ET: "&", OU: "≥1", NON: "1" };

function SwitchLever({ label, value, onChange, disabled }: { label: string; value: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      onClick={() => !disabled && onChange(!value)}
      disabled={disabled}
      aria-pressed={value}
      className={`flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase border-2 border-cardink px-4 py-2.5 transition-all cursor-pointer ${
        disabled ? "opacity-35 cursor-not-allowed" : value ? "bg-cardink text-paper shadow-[3px_3px_0_rgba(232,68,46,0.85)]" : "bg-transparent text-cardink hover:bg-cardink/5"
      }`}
    >
      <span className={`w-3 h-3 border-2 border-current ${value ? "bg-greenT border-greenT" : ""}`} aria-hidden />
      Entrée {label} : {value ? "1" : "0"}
    </button>
  );
}

export default function LogicLab() {
  const [gate, setGate] = useState<Gate>("ET");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  const out = gate === "ET" ? a && b : gate === "OU" ? a || b : !a;
  const wire = (v: boolean) => (v ? "#ff7a29" : "#8b9db5");

  const rows =
    gate === "NON"
      ? [false, true].map((x) => ({ a: x, b: null as boolean | null, s: !x }))
      : [
          { a: false, b: false, s: gate === "ET" ? false : false },
          { a: false, b: true, s: gate === "ET" ? false : true },
          { a: true, b: false, s: gate === "ET" ? false : true },
          { a: true, b: true, s: true },
        ];
  const isActive = (r: { a: boolean; b: boolean | null }) => r.a === a && (gate === "NON" || r.b === b);

  return (
    <section id="logique" className="bg-seyes text-cardink relative">
      <div className="absolute top-0 bottom-0 left-10 sm:left-16 w-[2px] bg-redT/60 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <SectionHead
          dark={false}
          index="Atelier 03"
          kicker="Chaîne d'information"
          title="Les portes logiques"
          desc="Avant de programmer, il faut décider : OUI ou NON ? Les portes logiques combinent des entrées binaires (0 ou 1) pour produire une sortie. C'est la base de tous les automatismes — et de Scratch à l'Arduino."
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <Reveal>
            <div className="paper-card p-5 sm:p-7">
              {/* commandes */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#41546b]">Fonction :</span>
                {(Object.keys(SYMBOL) as Gate[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGate(g)}
                    className={`font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-2 border-2 border-cardink cursor-pointer transition-all ${
                      gate === g ? "bg-redT text-paper shadow-[3px_3px_0_rgba(23,41,61,0.85)]" : "hover:bg-cardink/5"
                    }`}
                  >
                    {g === "ET" ? "ET (AND)" : g === "OU" ? "OU (OR)" : "NON (NOT)"}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <SwitchLever label="A" value={a} onChange={setA} />
                <SwitchLever label="B" value={b} onChange={setB} disabled={gate === "NON"} />
              </div>

              {/* schéma */}
              <svg viewBox="0 0 520 250" className="w-full mt-6 block" role="img" aria-label={`Schéma de la porte logique ${gate}`}>
                {/* fils d'entrée */}
                <line x1="30" y1="95" x2="200" y2="95" stroke={wire(a)} strokeWidth="3" className={a ? "flow-dash" : ""} strokeDasharray={a ? undefined : "2 6"} />
                {gate !== "NON" && (
                  <line x1="30" y1="155" x2="200" y2="155" stroke={wire(b)} strokeWidth="3" className={b ? "flow-dash" : ""} strokeDasharray={b ? undefined : "2 6"} />
                )}
                <text x="18" y="80" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill={a ? "#ff7a29" : "#8b9db5"} fontWeight="bold">A={a ? 1 : 0}</text>
                {gate !== "NON" && (
                  <text x="18" y="180" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill={b ? "#ff7a29" : "#8b9db5"} fontWeight="bold">B={b ? 1 : 0}</text>
                )}

                {/* boîtier IEC */}
                <rect x="200" y="55" width="120" height="140" fill="#fffdf4" stroke="#17293d" strokeWidth="3" />
                <text x="260" y="140" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="44" fill="#17293d">
                  {SYMBOL[gate]}
                </text>
                <text x="260" y="216" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#41546b">
                  PORTE {gate}
                </text>

                {/* fil de sortie + LED */}
                <line x1="320" y1="125" x2="432" y2="125" stroke={wire(out)} strokeWidth="3" className={out ? "flow-dash" : ""} strokeDasharray={out ? undefined : "2 6"} />
                {out && <circle cx="455" cy="125" r="34" fill="#ffc53d" opacity="0.35" />}
                <circle cx="455" cy="125" r="22" fill={out ? "#ffc53d" : "#e4e0d2"} stroke="#17293d" strokeWidth="3" />
                <line x1="455" y1="147" x2="455" y2="170" stroke="#17293d" strokeWidth="3" />
                <line x1="443" y1="170" x2="467" y2="170" stroke="#17293d" strokeWidth="3" />
                <text x="455" y="92" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="bold" fill={out ? "#c77800" : "#8b9db5"}>
                  S = {out ? 1 : 0}
                </text>
              </svg>
            </div>
          </Reveal>

          {/* table de vérité */}
          <Reveal delay={150}>
            <div className="paper-card p-5">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#41546b] mb-4">Table de vérité — {gate}</h3>
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b-2 border-cardink text-[11px] uppercase tracking-widest text-[#41546b]">
                    <th className="py-2 text-left">A</th>
                    {gate !== "NON" && <th className="py-2 text-left">B</th>}
                    <th className="py-2 text-right">Sortie S</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className={`border-b border-cardink/15 ${isActive(r) ? "bg-yellowT/70 font-bold" : ""}`}>
                      <td className="py-2.5">{r.a ? 1 : 0}</td>
                      {gate !== "NON" && <td className="py-2.5">{r.b ? 1 : 0}</td>}
                      <td className="py-2.5 text-right">
                        <span className={`inline-block w-6 text-center py-0.5 ${r.s ? "bg-greenT/60" : "bg-cardink/10"}`}>{r.s ? 1 : 0}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-[13px] leading-relaxed text-[#41546b] border-t border-dashed border-cardink/30 pt-4">
                {gate === "ET" && <>La sortie passe à <strong>1</strong> uniquement si <strong>toutes</strong> les entrées sont à 1. Ex. : la barrière s'ouvre si badge <em>ET</em> digicode sont valides.</>}
                {gate === "OU" && <>La sortie passe à <strong>1</strong> dès qu'<strong>au moins une</strong> entrée est à 1. Ex. : l'alarme sonne si fenêtre <em>OU</em> porte s'ouvre.</>}
                {gate === "NON" && <>La sortie est toujours l'<strong>inverse</strong> de l'entrée. Ex. : la lampe s'allume quand il <em>ne fait pas</em> jour.</>}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

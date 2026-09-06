import { useState } from "react";
import type { ReactNode } from "react";
import { Reveal, SectionHead } from "../lib/ui";

type ExKey = "voiture" | "barriere" | "lampe" | "perceuse";

const EXAMPLES: Record<ExKey, { label: string; source: string; alimenter: string; distribuer: string; convertir: string; transmettre: string; agir: string }> = {
  voiture: {
    label: "Voiture radiocommandée",
    source: "Piles 9 V",
    alimenter: "Pack de piles",
    distribuer: "Interrupteur + récepteur radio",
    convertir: "Moteur électrique",
    transmettre: "Engrenages + cardans",
    agir: "Les roues tournent",
  },
  barriere: {
    label: "Barrière de parking",
    source: "Secteur 230 V",
    alimenter: "Bloc d'alimentation",
    distribuer: "Contacteur + carte de commande",
    convertir: "Motoréducteur",
    transmettre: "Bras articulé + contrepoids",
    agir: "La barrière se lève",
  },
  lampe: {
    label: "Lampe de poche",
    source: "Piles LR6",
    alimenter: "Piles",
    distribuer: "Interrupteur poussoir",
    convertir: "Lampe LED",
    transmettre: "Transmission directe",
    agir: "La lampe éclaire",
  },
  perceuse: {
    label: "Perceuse sans fil",
    source: "Batterie 18 V",
    alimenter: "Batterie Li-ion",
    distribuer: "Gâchette + variateur",
    convertir: "Moteur à courant continu",
    transmettre: "Mandrin",
    agir: "Le foret perce",
  },
};

const FUNCTIONS = [
  {
    key: "alimenter",
    name: "Alimenter",
    color: "#ffc53d",
    def: "Fournir l'énergie nécessaire au fonctionnement, la stocker et la transporter jusqu'au système.",
    composants: ["Piles", "Batterie", "Panneau solaire", "Prise secteur"],
  },
  {
    key: "distribuer",
    name: "Distribuer",
    color: "#3fc9d8",
    def: "Autoriser, couper ou régler le passage de l'énergie sur ordre de l'utilisateur ou d'un programme.",
    composants: ["Interrupteur", "Contacteur", "Relais", "Variateur"],
  },
  {
    key: "convertir",
    name: "Convertir",
    color: "#ff7a29",
    def: "Transformer l'énergie reçue en une autre forme utile : électrique → mécanique, lumineuse, thermique…",
    composants: ["Moteur", "Lampe", "Résistance", "Vérin"],
  },
  {
    key: "transmettre",
    name: "Transmettre",
    color: "#7bd88f",
    def: "Acheminer le mouvement ou l'action de l'organe de conversion jusqu'à la partie qui agit vraiment.",
    composants: ["Engrenages", "Courroie", "Chaîne", "Roues de friction"],
  },
] as const;

function Arrow({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 46 24" className="w-10 sm:w-12 h-6 shrink-0" aria-hidden>
      <line x1="2" y1="12" x2="36" y2="12" stroke={active ? "#ff7a29" : "#8b9db5"} strokeWidth="2.4" className={active ? "flow-dash" : ""} strokeDasharray={active ? undefined : "4 5"} />
      <path d="M36 12l-7-5v10z" fill={active ? "#ff7a29" : "#8b9db5"} />
    </svg>
  );
}

function NodeBox({ title, value, color, on, icon }: { title: string; value: string; color: string; on: boolean; icon: ReactNode }) {
  return (
    <div
      className={`w-40 sm:w-44 shrink-0 border-2 border-cardink bg-[#fffdf4] transition-all duration-300 ${
        on ? "shadow-[4px_4px_0_rgba(23,41,61,0.85)]" : "opacity-60 shadow-none grayscale-[35%]"
      }`}
    >
      <div className="h-1.5" style={{ background: color }} />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#41546b]">{title}</span>
          <span style={{ color }}>{icon}</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug font-semibold text-cardink min-h-[36px]">{value}</p>
      </div>
    </div>
  );
}

const ic = "w-5 h-5";
const ICONS = {
  bolt: <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L4 14h6l-1 8 9-12h-6z" strokeLinejoin="round" /></svg>,
  battery: <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="17" height="9" /><path d="M22 11v3M6 11v3M10 11v3" /></svg>,
  switch: <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="16" r="2.4" /><circle cx="19" cy="16" r="2.4" /><path d="M7 15L18 7" /></svg>,
  motor: <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M9.2 15V9.5l4 3.4V9" /></svg>,
  gears: <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="10" r="4.5" /><circle cx="17" cy="16" r="3.2" /><path d="M9 5.5V3M9 17v-2.5M4.5 10H2M16 10h-2.5M17 12.8v-1M20 18.5l1.5 1.5" /></svg>,
  hand: <svg viewBox="0 0 24 24" className={ic} fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

export default function EnergyChain() {
  const [ex, setEx] = useState<ExKey>("voiture");
  const [on, setOn] = useState(true);
  const data = EXAMPLES[ex];

  return (
    <section id="energie" className="bg-seyes text-cardink relative">
      <div className="absolute top-0 bottom-0 left-10 sm:left-16 w-[2px] bg-redT/60 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <SectionHead
          dark={false}
          index="Atelier 01"
          kicker="Chaîne d'énergie"
          title="De la pile au mouvement"
          desc="Tout objet technique qui bouge, éclaire ou chauffe suit le même chemin : alimenter, distribuer, convertir, transmettre. Choisis un objet du quotidien, mets le circuit sous tension et suis le flux d'énergie."
        />

        {/* commandes */}
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#41546b] mr-1">Objet étudié :</span>
            {(Object.keys(EXAMPLES) as ExKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setEx(k)}
                className={`font-mono text-[11px] tracking-[0.1em] uppercase px-3.5 py-2 border-2 transition-all cursor-pointer ${
                  ex === k
                    ? "bg-cardink text-paper border-cardink shadow-[3px_3px_0_rgba(232,68,46,0.9)]"
                    : "bg-transparent border-cardink/40 text-cardink hover:border-cardink"
                }`}
              >
                {EXAMPLES[k].label}
              </button>
            ))}
            <button
              onClick={() => setOn(!on)}
              className={`ml-auto flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase font-semibold px-4 py-2.5 border-2 border-cardink cursor-pointer transition-colors ${
                on ? "bg-greenT/30" : "bg-redT/15"
              }`}
              aria-pressed={on}
            >
              <span className={`relative w-10 h-4 border border-cardink ${on ? "bg-greenT/40" : "bg-transparent"}`}>
                <span className={`absolute top-[2px] w-3 h-3 transition-all duration-300 ${on ? "left-[24px] bg-cardink" : "left-[2px] bg-redT"}`} />
              </span>
              {on ? "Sous tension" : "Hors tension"}
            </button>
          </div>
        </Reveal>

        {/* chaîne */}
        <Reveal delay={200}>
          <div className="mt-8 overflow-x-auto pb-3 -mx-1 px-1">
            <div className="flex items-stretch gap-1 min-w-[960px] w-max">
              <NodeBox title="Énergie dispo" value={data.source} color="#8b9db5" on={on} icon={ICONS.bolt} />
              <Arrow active={on} />
              <NodeBox title="Alimenter" value={data.alimenter} color="#ffc53d" on={on} icon={ICONS.battery} />
              <Arrow active={on} />
              <NodeBox title="Distribuer" value={data.distribuer} color="#3fc9d8" on={on} icon={ICONS.switch} />
              <Arrow active={on} />
              <NodeBox title="Convertir" value={data.convertir} color="#ff7a29" on={on} icon={ICONS.motor} />
              <Arrow active={on} />
              <NodeBox title="Transmettre" value={data.transmettre} color="#7bd88f" on={on} icon={ICONS.gears} />
              <Arrow active={on} />
              <div className={`w-40 shrink-0 border-2 border-cardink bg-cardink text-paper transition-all duration-300 ${on ? "shadow-[4px_4px_0_rgba(232,68,46,0.9)]" : "opacity-60"}`}>
                <div className="h-1.5 bg-redT" />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/70">Agir sur…</span>
                    <span className="text-redT">{ICONS.hand}</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-snug font-semibold min-h-[36px]">{data.agir}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* fiches fonctions */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUNCTIONS.map((f, i) => (
            <Reveal key={f.key} delay={i * 90}>
              <article className="paper-card h-full p-4 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display uppercase text-xl tracking-wide" style={{ color: f.color === "#ffc53d" ? "#a06a00" : f.color === "#7bd88f" ? "#2c7a44" : f.color }}>
                    {f.name}
                  </h3>
                  <span className="font-mono text-[10px] text-[#41546b]">fct. 0{i + 1}</span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#41546b]">{f.def}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {f.composants.map((c) => (
                    <span key={c} className="font-mono text-[10px] uppercase tracking-wide border border-cardink/30 px-2 py-0.5">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-3 pt-3 border-t border-dashed border-cardink/30 text-[13px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#41546b]">Ici : </span>
                  <strong>{(data as unknown as Record<string, string>)[f.key]}</strong>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

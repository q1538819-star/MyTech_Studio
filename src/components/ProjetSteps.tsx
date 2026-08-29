import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const STEPS = [
  {
    title: "Analyser le besoin",
    short: "Besoin",
    color: "#ff7a29",
    desc: "Avant de fabriquer quoi que ce soit, on vérifie que l'objet répond à un vrai besoin : à qui rend-il service ? Sur quoi agit-il ? Dans quel but ? C'est la célèbre « bête à cornes ».",
    outils: ["Bête à cornes", "Brainstorming", "Questionnaire", "Étude de l'existant"],
    diagram: true,
  },
  {
    title: "Rédiger le cahier des charges",
    short: "Cahier des charges",
    color: "#ffc53d",
    desc: "Le cahier des charges liste les fonctions de service attendues, avec des critères et des niveaux d'exigence — et une flexibilité pour chaque. C'est le contrat entre le client et l'équipe.",
    outils: ["Diagramme pieuvre", "Fonctions de service", "Critères & niveaux", "Tableau du CDC"],
  },
  {
    title: "Imaginer des solutions",
    short: "Recherche",
    color: "#7bd88f",
    desc: "On ne garde pas la première idée : on croque, on compare, on fait de la veille technologique sur les solutions existantes, puis on choisit avec un comparateur pondéré.",
    outils: ["Croquis & schémas", "Veille (Lumni, CEA…)", "Comparateur de solutions", "Planche de tendances"],
  },
  {
    title: "Modéliser & simuler",
    short: "Maquette virtuelle",
    color: "#3fc9d8",
    desc: "La solution choisie est dessinée en 3D et testée virtuellement : encombrement, mouvement, câblage… On corrige les erreurs avant de dépenser le moindre matériau.",
    outils: ["CAO 3D (Tinkercad, SketchUp)", "Simulation Scratch", "Essais virtuels", "Nomenclature"],
  },
  {
    title: "Réaliser le prototype",
    short: "Fabrication",
    color: "#ff7a29",
    desc: "C'est l'heure de l'atelier : on fabrique les pièces, on assemble, on câble la carte programmable et on charge le programme. Chaque étape est consignée dans le carnet de projet.",
    outils: ["Impression 3D", "Découpe laser", "Carte micro:bit / Arduino", "Câblage & soudure"],
  },
  {
    title: "Tester & valider",
    short: "Essais",
    color: "#7bd88f",
    desc: "Le prototype est confronté au cahier des charges : mesures, essais, constats. Si un niveau d'exigence n'est pas atteint, on améliore… et on repart pour une version 2.",
    outils: ["Essais & mesures", "Comparaison au CDC", "Tableau des constats", "Améliorations"],
  },
  {
    title: "Communiquer",
    short: "Présentation",
    color: "#ffc53d",
    desc: "Un projet qui n'est pas présenté est un projet inachevé : affiche technique, vidéo de démonstration, soutenance orale… on explique ses choix et on défend sa solution.",
    outils: ["Affiche technique", "Vidéo de démo", "Présentation orale", "Carnet de projet"],
  },
];

function BeteACornes() {
  return (
    <svg viewBox="0 0 520 235" className="w-full mt-5 block" role="img" aria-label="Diagramme bête à cornes">
      {[
        { x: 16, y: 66, w: 152, h: 58, t1: "À qui rend-il", t2: "service ?", sub: "→ l'usager" },
        { x: 196, y: 66, w: 148, h: 58, t1: "OBJET", t2: "TECHNIQUE", sub: "", bold: true },
        { x: 372, y: 66, w: 132, h: 58, t1: "Dans quel", t2: "but ?", sub: "→ le besoin" },
        { x: 196, y: 166, w: 148, h: 52, t1: "Sur quoi", t2: "agit-il ?", sub: "→ la matière d'œuvre" },
      ].map((b) => (
        <g key={b.t1}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="#fffdf4" stroke="#17293d" strokeWidth="2.4" />
          <text x={b.x + b.w / 2} y={b.y + (b.t2 ? 25 : 33)} textAnchor="middle" fontFamily={b.bold ? "Anton, sans-serif" : "IBM Plex Mono, monospace"} fontSize={b.bold ? 17 : 11.5} fill="#17293d">
            {b.t1}
          </text>
          {b.t2 && (
            <text x={b.x + b.w / 2} y={b.y + 45} textAnchor="middle" fontFamily={b.bold ? "Anton, sans-serif" : "IBM Plex Mono, monospace"} fontSize={b.bold ? 17 : 11.5} fill="#17293d">
              {b.t2}
            </text>
          )}
          {b.sub && (
            <text x={b.x + b.w / 2} y={b.y + b.h + 15} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#7a5a00">
              {b.sub}
            </text>
          )}
        </g>
      ))}
      <g stroke="#e8442e" strokeWidth="2.4" fill="none">
        <line x1="170" y1="95" x2="192" y2="95" />
        <path d="M192 95 l-7 -4.5 v9 z" fill="#e8442e" />
        <line x1="346" y1="95" x2="368" y2="95" />
        <path d="M368 95 l-7 -4.5 v9 z" fill="#e8442e" />
        <line x1="270" y1="162" x2="270" y2="128" />
        <path d="M270 128 l-4.5 7 h9 z" fill="#e8442e" />
      </g>
    </svg>
  );
}

export default function ProjetSteps() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <section id="methode" className="bg-seyes text-cardink relative">
      <div className="absolute top-0 bottom-0 left-10 sm:left-16 w-[2px] bg-redT/60 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <SectionHead
          dark={false}
          index="La méthode"
          kicker="Démarche de projet"
          title="Du besoin au prototype"
          desc="En technologie, on ne bricole pas au hasard : on suit une démarche en 7 étapes. Clique sur chaque étape pour découvrir ses outils — la même méthode, de la 6e à la 3e."
        />

        <div className="mt-12 grid lg:grid-cols-[330px_1fr] gap-8 items-start">
          {/* sommaire des étapes */}
          <Reveal>
            <div className="lg:sticky lg:top-24 border-2 border-cardink bg-[#fffdf4] shadow-[5px_5px_0_rgba(23,41,61,0.85)]">
              <div className="px-4 py-3 border-b-2 border-cardink flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#41546b]">Sommaire</span>
                <span className="font-mono text-[11px] font-semibold">
                  Étape {step + 1}/{STEPS.length}
                </span>
              </div>
              <div className="h-1.5 bg-paper2">
                <div className="h-full transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%`, background: s.color }} />
              </div>
              <ol>
                {STEPS.map((st, i) => (
                  <li key={st.title}>
                    <button
                      onClick={() => setStep(i)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-cardink/15 last:border-b-0 transition-colors cursor-pointer ${
                        i === step ? "bg-cardink text-paper" : "hover:bg-paper2"
                      }`}
                    >
                      <span className="font-display text-lg w-7 shrink-0" style={{ color: i === step ? st.color : "#8b9db5" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-mono text-[11px] tracking-[0.1em] uppercase ${i === step ? "" : "text-cardink"}`}>{st.short}</span>
                      {i === step && <span className="ml-auto" style={{ color: st.color }} aria-hidden>▸</span>}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* détail de l'étape */}
          <Reveal delay={120}>
            <article key={step} className="paper-card p-6 sm:p-8 relative overflow-hidden">
              <span className="absolute -top-7 -right-3 font-display text-[9rem] leading-none opacity-[0.07] select-none" aria-hidden>
                {step + 1}
              </span>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase" style={{ color: s.color === "#ffc53d" ? "#a06a00" : s.color }}>
                Étape {step + 1} — sur {STEPS.length}
              </p>
              <h3 className="font-display uppercase text-3xl sm:text-4xl tracking-wide mt-3">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[#41546b] max-w-2xl">{s.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {s.outils.map((o) => (
                  <span key={o} className="font-mono text-[10.5px] uppercase tracking-wide border-2 border-cardink px-3 py-1.5 bg-paper hover:bg-cardink hover:text-paper transition-colors">
                    {o}
                  </span>
                ))}
              </div>

              {s.diagram && <BeteACornes />}

              <div className="mt-7 pt-5 border-t border-dashed border-cardink/30 flex items-center justify-between">
                <button
                  onClick={() => setStep((step + STEPS.length - 1) % STEPS.length)}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase px-4 py-2.5 border-2 border-cardink hover:bg-cardink hover:text-paper transition-colors cursor-pointer"
                >
                  ← Précédente
                </button>
                <div className="flex gap-1.5" aria-hidden>
                  {STEPS.map((_, i) => (
                    <span key={i} className="w-2.5 h-2.5" style={{ background: i === step ? s.color : "#c9d3e0" }} />
                  ))}
                </div>
                <button
                  onClick={() => setStep((step + 1) % STEPS.length)}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase px-4 py-2.5 border-2 border-cardink bg-cardink text-paper hover:bg-transparent hover:text-cardink transition-colors cursor-pointer"
                >
                  Suivante →
                </button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import type { ComponentType } from "react";
import EnergyChain from "../components/EnergyChain";
import GearsLab from "../components/GearsLab";
import LogicLab from "../components/LogicLab";
import CircuitLab from "../components/CircuitLab";
import Domotique from "../components/Domotique";
import MateriauxLab from "../components/MateriauxLab";
import StructuresLab from "../components/StructuresLab";
import AlgoLab from "../components/AlgoLab";
import EnergiesLab from "../components/EnergiesLab";
import ReseauxLab from "../components/ReseauxLab";
import MecanismesLab from "../components/MecanismesLab";
import CdcLab from "../components/CdcLab";
import AlgorigrammeLab from "../components/AlgorigrammeLab";
import EnergyGame from "../components/EnergyGame";
import LabGlyph from "../components/LabGlyphs";
import { navigate } from "../lib/router";

export interface LabMeta {
  slug: string;
  num: string;
  name: string;
  tag: string;
  color: string;
  Comp: ComponentType;
}

export const LABS: LabMeta[] = [
  { slug: "energie", num: "01", name: "Chaîne d'énergie", tag: "Énergie", color: "#ffc53d", Comp: EnergyChain },
  { slug: "engrenages", num: "02", name: "Banc d'engrenages", tag: "Mécanique", color: "#ff7a29", Comp: GearsLab },
  { slug: "logique", num: "03", name: "Portes logiques", tag: "Logique", color: "#e8442e", Comp: LogicLab },
  { slug: "circuit", num: "04", name: "Circuit en série", tag: "Électricité", color: "#3fc9d8", Comp: CircuitLab },
  { slug: "domotique", num: "05", name: "Maison domotique", tag: "Programmation", color: "#7bd88f", Comp: Domotique },
  { slug: "materiaux", num: "06", name: "Choix des matériaux", tag: "Matériaux", color: "#3fc9d8", Comp: MateriauxLab },
  { slug: "structures", num: "07", name: "Pont en treillis", tag: "Structures", color: "#ff7a29", Comp: StructuresLab },
  { slug: "algo", num: "08", name: "Barrière automatique", tag: "Algorithmique", color: "#ffc53d", Comp: AlgoLab },
  { slug: "energies", num: "09", name: "Énergies renouvelables", tag: "Énergie", color: "#7bd88f", Comp: EnergiesLab },
  { slug: "reseaux", num: "10", name: "Voyage d'un paquet", tag: "Réseaux", color: "#3fc9d8", Comp: ReseauxLab },
  { slug: "mecanismes", num: "11", name: "Mécanismes", tag: "Mécanique", color: "#e8442e", Comp: MecanismesLab },
  { slug: "cdc", num: "12", name: "Cahier des charges", tag: "Analyse & projet", color: "#e8442e", Comp: CdcLab },
  { slug: "algorigramme", num: "13", name: "Algorigramme", tag: "Algorithmique", color: "#ff7a29", Comp: AlgorigrammeLab },
];

export default function AnimationsPage({ param }: { param?: string }) {
  const idx = Math.max(0, LABS.findIndex((l) => l.slug === param));
  const lab = LABS[idx];
  const Active = lab.Comp;

  return (
    <div className="bg-blueprint pt-[67px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyanT flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-orangeT inline-block" aria-hidden />
          Le labo — {LABS.length} machines interactives
        </p>
        <h1 className="font-display uppercase leading-[0.95] mt-3 text-[clamp(2.2rem,5vw,3.6rem)] tracking-wide text-snow">
          Choisis ta machine, <span className="word-outline-orange">manipule</span>
        </h1>

        {/* sélecteur mobile */}
        <div className="mt-6 flex lg:hidden gap-2 overflow-x-auto no-scrollbar pb-1">
          {LABS.map((l) => (
            <button
              key={l.slug}
              onClick={() => navigate(`/animations/${l.slug}`)}
              className={`shrink-0 font-mono text-[10.5px] tracking-[0.12em] uppercase px-3 py-2 border-2 cursor-pointer transition-colors ${
                l.slug === lab.slug ? "border-orangeT bg-orangeT text-ink font-semibold" : "border-line text-fog"
              }`}
            >
              {l.num} · {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 grid lg:grid-cols-[270px_1fr] gap-0 items-start">
        {/* sommaire desktop */}
        <aside className="hidden lg:block sticky top-[92px] border-r border-line pr-0">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog px-4 pb-3">Sommaire du labo</p>
          <nav>
            {LABS.map((l) => {
              const active = l.slug === lab.slug;
              return (
                <button
                  key={l.slug}
                  onClick={() => navigate(`/animations/${l.slug}`)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 border-l-[3px] transition-colors cursor-pointer ${
                    active ? "bg-ink3/70" : "border-transparent hover:bg-ink3/40"
                  }`}
                  style={active ? { borderLeftColor: l.color } : undefined}
                >
                  <LabGlyph slug={l.slug} color={active ? l.color : "#5f7a94"} />
                  <span className="min-w-0">
                    <span className={`block font-mono text-[9.5px] tracking-[0.2em] uppercase ${active ? "" : "text-fog/70"}`} style={active ? { color: l.color } : undefined}>
                      {l.num} · {l.tag}
                    </span>
                    <span className={`block text-[13.5px] font-semibold truncate ${active ? "text-snow" : "text-fog"}`}>{l.name}</span>
                  </span>
                </button>
              );
            })}
          </nav>
          <a href="#/quiz" className="block mx-4 mt-4 mb-2 text-center font-mono text-[10.5px] tracking-[0.18em] uppercase py-2.5 border-2 border-yellowT text-yellowT hover:bg-yellowT hover:text-ink transition-colors">
            Prêt ? → Quiz
          </a>
        </aside>

        {/* machine active */}
        <div className="min-w-0">
          <Active />
          {lab.slug === "energie" && <EnergyGame />}
          {/* navigation entre machines */}
          <div className="border-t border-line bg-ink2/60">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between gap-4">
              <button
                onClick={() => navigate(`/animations/${LABS[(idx + LABS.length - 1) % LABS.length].slug}`)}
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-fog hover:text-cyanT transition-colors cursor-pointer"
              >
                ← {LABS[(idx + LABS.length - 1) % LABS.length].name}
              </button>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog/60 shrink-0">
                Machine {idx + 1}/{LABS.length}
              </span>
              <button
                onClick={() => navigate(`/animations/${LABS[(idx + 1) % LABS.length].slug}`)}
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-orangeT hover:text-yellowT transition-colors cursor-pointer text-right"
              >
                {LABS[(idx + 1) % LABS.length].name} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

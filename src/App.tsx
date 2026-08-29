import Header from "./components/Header";
import Opening from "./components/Opening";
import EnergyChain from "./components/EnergyChain";
import GearsLab from "./components/GearsLab";
import LogicLab from "./components/LogicLab";
import CircuitLab from "./components/CircuitLab";
import Domotique from "./components/Domotique";
import ProjetSteps from "./components/ProjetSteps";
import Niveaux from "./components/Niveaux";
import Ressources from "./components/Ressources";
import Quiz from "./components/Quiz";
import Footer from "./components/Footer";
import { Reveal } from "./lib/ui";

const ATELIERS = [
  { id: "#energie", n: "01", t: "Chaîne d'énergie", d: "Alimenter · distribuer · convertir · transmettre", c: "#ffc53d" },
  { id: "#engrenages", n: "02", t: "Engrenages", d: "Rapport de transmission & sens de rotation", c: "#ff7a29" },
  { id: "#logique", n: "03", t: "Portes logiques", d: "ET · OU · NON et tables de vérité", c: "#e8442e" },
  { id: "#circuit", n: "04", t: "Circuit en série", d: "Loi d'Ohm en direct sur le schéma", c: "#3fc9d8" },
  { id: "#domotique", n: "05", t: "Maison domotique", d: "Capteurs, règles SI…ALORS, actionneurs", c: "#7bd88f" },
];

function AtelierIndex() {
  return (
    <div id="ateliers" className="bg-ink border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyanT">Sommaire des ateliers</p>
              <h2 className="font-display uppercase tracking-wide text-2xl sm:text-3xl text-snow mt-2">
                Cinq machines à manipuler
              </h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-fog">↓ tout est interactif, promis</p>
          </div>
        </Reveal>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line border border-line">
          {ATELIERS.map((a, i) => (
            <Reveal key={a.id} delay={i * 70} className="bg-ink">
              <a href={a.id} className="group block h-full p-4 bg-ink transition-colors hover:bg-ink3/70">
                <span className="font-display text-2xl" style={{ color: a.c }}>{a.n}</span>
                <h3 className="mt-1.5 font-semibold text-snow text-[15px] group-hover:underline underline-offset-4 decoration-2" style={{ textDecorationColor: a.c }}>
                  {a.t}
                </h3>
                <p className="mt-1 text-[12px] text-fog leading-snug">{a.d}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="font-body antialiased">
      <div className="noise-layer" aria-hidden />
      <Header />
      <main>
        <Opening />
        <AtelierIndex />
        <EnergyChain />
        <GearsLab />
        <LogicLab />
        <CircuitLab />
        <Domotique />
        <ProjetSteps />
        <Niveaux />
        <Ressources />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}

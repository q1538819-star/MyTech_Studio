import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const NIVEAUX = [
  {
    niveau: "6e",
    color: "#3fc9d8",
    titre: "Découvrir & décrire",
    themes: [
      ["Matériaux & formes", "Familles de matériaux (bois, métaux, plastiques), propriétés et choix adaptés à l'usage."],
      ["Fonctions & dessin", "Analyser un objet du quotidien, produire un croquis coté, passer de la 2D à la 3D."],
      ["Structures & stabilité", "Pourquoi un pont tient debout : triangulation, assemblages, répartition des efforts."],
    ],
    projet: "Le pont en papier : porter 1 kg avec une simple feuille A4 — formes, plis et triangulation au pouvoir.",
    notions: ["matériau", "forme", "fonction", "croquis", "cote", "assemblage"],
  },
  {
    niveau: "5e",
    color: "#ffc53d",
    titre: "L'énergie partout",
    themes: [
      ["Sources & formes d'énergie", "Renouvelables ou non, chaînes de conversion, unités : le joule et le watt."],
      ["Chaîne d'énergie", "Alimenter, distribuer, convertir, transmettre : le même squelette dans tous les objets."],
      ["Mesures & grandeurs", "Tension, intensité, résistance : le multimètre pour mesurer et comprendre."],
    ],
    projet: "La mini-éolienne : fabriquer une turbine qui transforme le vent en électricité pour charger un condensateur.",
    notions: ["joule", "watt", "conversion", "rendement", "multimètre", "renouvelable"],
  },
  {
    niveau: "4e",
    color: "#7bd88f",
    titre: "Information & programmation",
    themes: [
      ["Chaîne d'information", "Acquérir, traiter, communiquer : le cerveau discret de tous les systèmes automatiques."],
      ["Capteurs & actionneurs", "Du détecteur de présence au moteur : l'interface entre le programme et le monde réel."],
      ["Algorithmes avec Scratch", "Variables, conditions, boucles : écrire des programmes qui prennent des décisions."],
    ],
    projet: "La barrière de parking automatique : capteurs, programme Scratch et motoréducteur travaillent ensemble.",
    notions: ["algorithme", "boucle", "condition", "variable", "capteur", "actionneur"],
  },
  {
    niveau: "3e",
    color: "#ff7a29",
    titre: "Concevoir & prototyper",
    themes: [
      ["Démarche de projet complète", "Cahier des charges, planning, prototype : conduire un projet en équipe, de A à Z."],
      ["Objets connectés & domotique", "Micro-contrôleurs, Wi-Fi, scénarios : programmer la maison intelligente."],
      ["Réseaux & communication", "Comment voyagent les données : du Bluetooth au cloud, sans oublier la sécurité."],
    ],
    projet: "La serre connectée : arroser, éclairer et surveiller des plantes à distance, données à l'appui.",
    notions: ["cahier des charges", "prototype", "IoT", "micro-contrôleur", "essai", "soutenance"],
  },
];

export default function Niveaux() {
  const [idx, setIdx] = useState(0);
  const n = NIVEAUX[idx];

  return (
    <section id="programme" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Le programme"
          kicker="Cycle 4 · de la 6e à la 3e"
          title="Quatre années, une montée en puissance"
          desc="Le programme de technologie s'organise autour de trois grands thèmes : design & créativité, modélisation & simulation, informatique & programmation. Voici ce qui t'attend chaque année."
        />

        {/* sélecteur de niveau */}
        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {NIVEAUX.map((lv, i) => (
              <button
                key={lv.niveau}
                onClick={() => setIdx(i)}
                className={`group border-2 px-4 py-3.5 text-left transition-all cursor-pointer ${
                  i === idx ? "bg-ink2 -translate-y-0.5" : "border-line hover:-translate-y-0.5"
                }`}
                style={{ borderColor: i === idx ? lv.color : undefined }}
                aria-pressed={i === idx}
              >
                <span className="font-display text-3xl sm:text-4xl tracking-wide" style={{ color: i === idx ? lv.color : "#9fb6c9" }}>
                  {lv.niveau}
                </span>
                <span className={`block mt-1 font-mono text-[10px] tracking-[0.16em] uppercase ${i === idx ? "text-snow" : "text-fog"}`}>
                  {lv.titre}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* contenu du niveau */}
        <div key={idx} className="rise mt-10 grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="tech-card p-6 sm:p-8">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-5xl sm:text-6xl" style={{ color: n.color }}>{n.niveau}</span>
              <h3 className="font-display uppercase text-2xl sm:text-3xl tracking-wide text-snow">{n.titre}</h3>
            </div>
            <ol className="mt-7">
              {n.themes.map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[52px_1fr] gap-4 py-5 border-t border-line/70 first:border-t-0 items-start">
                  <span className="font-display text-2xl pt-0.5" style={{ color: n.color }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="font-semibold text-snow text-lg">{t}</h4>
                    <p className="mt-1.5 text-fog text-[14.5px] leading-relaxed">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-5">
            <div className="border-2 p-6 bg-ink2/80" style={{ borderColor: n.color }}>
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: n.color }}>
                Projet phare de l'année
              </p>
              <p className="mt-3 text-snow text-[15.5px] leading-relaxed font-medium">{n.projet}</p>
            </div>
            <div className="tech-card p-6">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-fog">Notions clés à maîtriser</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {n.notions.map((no) => (
                  <span key={no} className="font-mono text-[10.5px] uppercase tracking-wide border px-3 py-1.5 transition-colors hover:bg-ink" style={{ borderColor: `${n.color}66`, color: n.color }}>
                    {no}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

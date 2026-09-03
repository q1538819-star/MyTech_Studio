import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const TERMES: { t: string; d: string; n: "6e" | "5e" | "4e" | "3e" }[] = [
  { t: "Actionneur", d: "Composant qui agit sur le monde réel à partir d'un ordre électrique : moteur, lampe, électrovanne, buzzer…", n: "4e" },
  { t: "Algorithme", d: "Suite finie et ordonnée d'instructions qui résout un problème. Un programme en est la traduction pour l'ordinateur.", n: "4e" },
  { t: "Ampère", d: "Unité de mesure de l'intensité du courant électrique (symbole A), mesurée avec un ampèremètre branché en série.", n: "5e" },
  { t: "Bête à cornes", d: "Diagramme qui vérifie le besoin : à qui l'objet rend-il service, sur quoi agit-il, dans quel but ?", n: "6e" },
  { t: "Cahier des charges", d: "Document contractuel qui liste les fonctions de service, critères, niveaux d'exigence et flexibilités attendus.", n: "3e" },
  { t: "CAO", d: "Conception Assistée par Ordinateur : dessiner et modéliser une pièce en 3D (Tinkercad, SketchUp, FreeCAD…).", n: "6e" },
  { t: "Capteur", d: "Composant qui mesure une grandeur du monde réel (présence, température, lumière…) et la transforme en signal électrique.", n: "4e" },
  { t: "Circuit en série", d: "Circuit où tous les dipôles forment une seule boucle : si l'un est coupé, le courant ne passe plus nulle part.", n: "5e" },
  { t: "Cote", d: "Dimension chiffrée en millimètres portée sur un dessin technique, encadrée par des flèches et lignes d'attache.", n: "6e" },
  { t: "Crémaillère", d: "Barre dentée qui transforme la rotation d'un pignon en mouvement de translation (portail coulissant, direction…).", n: "5e" },
  { t: "Diagramme pieuvre", d: "Diagramme qui recense la fonction principale et les fonctions de contrainte d'un objet dans son environnement.", n: "3e" },
  { t: "Engrenage", d: "Deux roues dentées en prise qui transmettent un mouvement de rotation, en inversant le sens et en modifiant la vitesse.", n: "5e" },
  { t: "Fonction de service", d: "Service attendu d'un objet, exprimé du point de vue de l'utilisateur : FP (principale) et FC (contraintes).", n: "3e" },
  { t: "Fonction technique", d: "Solution technique interne qui permet de réaliser une fonction de service (soutenir, guider, alimenter…).", n: "6e" },
  { t: "IoT", d: "Internet des Objets : objets connectés qui échangent des données via Wi-Fi, Bluetooth ou LoRa.", n: "3e" },
  { t: "Joule", d: "Unité de mesure de l'énergie (symbole J). Une lampe de 10 W allumée 1 s consomme 10 J.", n: "5e" },
  { t: "Loi d'Ohm", d: "Relation fondamentale U = R × I entre tension (V), résistance (Ω) et intensité (A) dans un dipôle.", n: "5e" },
  { t: "Maquette numérique", d: "Modèle 3D informatique d'un objet, utilisé pour simuler, vérifier les dimensions et préparer la fabrication.", n: "6e" },
  { t: "Micro-contrôleur", d: "Petit ordinateur embarqué qui exécute un programme (micro:bit, Arduino) et pilote capteurs et actionneurs.", n: "3e" },
  { t: "Nomenclature", d: "Liste organisée de toutes les pièces d'un objet, avec références et quantités, pour pouvoir le fabriquer ou le réparer.", n: "3e" },
  { t: "Paquet de données", d: "Fragment d'un message, étiqueté avec les adresses IP source et destination, qui voyage de routeur en routeur.", n: "3e" },
  { t: "Prototype", d: "Premier exemplaire fonctionnel d'un objet, fabriqué pour être testé et confronté au cahier des charges.", n: "3e" },
  { t: "Rapport de transmission", d: "r = Z menante / Z menée : il fixe le rapport des vitesses entre deux roues dentées ou poulies.", n: "5e" },
  { t: "Renouvelable", d: "Se dit d'une source d'énergie qui se reconstitue naturellement : soleil, vent, eau, biomasse, géothermie.", n: "5e" },
  { t: "Schéma normalisé", d: "Représentation d'un circuit électrique avec les symboles officiels des dipôles, universellement compris.", n: "5e" },
  { t: "Triangulation", d: "Principe de rigidité : le triangle est indéformable, on l'utilise dans les treillis de ponts, grues et charpentes.", n: "6e" },
  { t: "Watt", d: "Unité de mesure de la puissance (symbole W) : P = U × I. La puissance indique le débit d'énergie.", n: "5e" },
];

const NIVEAU_COLOR: Record<string, string> = { "6e": "#3fc9d8", "5e": "#ffc53d", "4e": "#7bd88f", "3e": "#ff7a29" };

export default function Glossaire() {
  const [q, setQ] = useState("");
  const [niv, setNiv] = useState<string>("tous");

  const liste = TERMES.filter(
    (t) =>
      (t.t.toLowerCase().includes(q.toLowerCase()) || t.d.toLowerCase().includes(q.toLowerCase())) &&
      (niv === "tous" || t.n === niv)
  ).sort((a, b) => a.t.localeCompare(b.t));

  return (
    <section className="bg-blueprint border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionHead
          index="Boîte à outils"
          kicker="Le glossaire du technologue"
          title="27 mots à connaître par cœur"
          desc="Le vocabulaire technique officiel du cycle 4, du besoin à la validation. Cherche un mot, filtre par niveau : ces définitions sont celles attendues en évaluation."
        />

        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog font-mono" aria-hidden>
                ⌕
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Chercher un terme… (ex : engrenage, watt, prototype)"
                className="w-full bg-ink2 border border-line pl-10 pr-4 py-3 font-mono text-[12px] text-snow placeholder:text-fog/50 focus:outline-none focus:border-cyanT"
                aria-label="Rechercher dans le glossaire"
              />
            </div>
            <div className="flex gap-1.5">
              {["tous", "6e", "5e", "4e", "3e"].map((n) => (
                <button
                  key={n}
                  onClick={() => setNiv(n)}
                  className={`font-mono text-[10.5px] tracking-[0.14em] uppercase px-3.5 py-2.5 border transition-colors cursor-pointer ${
                    niv === n ? "bg-orangeT border-orangeT text-ink font-semibold" : "border-line text-fog hover:border-orangeT hover:text-orangeT"
                  }`}
                  aria-pressed={niv === n}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {liste.map((t, i) => (
            <Reveal key={t.t} delay={Math.min(i, 8) * 40}>
              <div className="tech-card p-4.5 p-4 h-full">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display uppercase tracking-wide text-lg text-snow">{t.t}</h3>
                  <span className="font-mono text-[9.5px] tracking-widest uppercase px-2 py-1 border shrink-0" style={{ color: NIVEAU_COLOR[t.n], borderColor: `${NIVEAU_COLOR[t.n]}66` }}>
                    {t.n}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-fog">{t.d}</p>
              </div>
            </Reveal>
          ))}
          {liste.length === 0 && (
            <p className="col-span-full font-mono text-sm text-fog py-10 text-center">
              Aucun terme ne correspond à « {q} ». Essaie un autre mot — ou découvre-le dans les cours !
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

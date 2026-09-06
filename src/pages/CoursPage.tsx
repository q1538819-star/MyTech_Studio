import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";
import { navigate } from "../lib/router";

type Chapitre = {
  t: string;
  obj: string;
  points: string[];
  vocab: string[];
  anim?: { slug: string; label: string };
};

const COURS: { niveau: string; color: string; intro: string; chapitres: Chapitre[] }[] = [
  {
    niveau: "6e",
    color: "#3fc9d8",
    intro: "Première année de technologie : on apprend à regarder les objets autrement — de quoi sont-ils faits, à quoi servent-ils, comment les représenter ?",
    chapitres: [
      {
        t: "Le monde des objets",
        obj: "Distinguer besoin, fonction d'usage et fonctions techniques d'un objet du quotidien.",
        points: [
          "Un objet répond à un besoin : la « bête à cornes » relie usager, objet et besoin.",
          "La fonction d'usage décrit le service rendu (« permettre de s'asseoir »).",
          "Les fonctions techniques décrivent COMMENT l'objet y arrive (soutenir, stabiliser…).",
          "On décompose un objet en composants pour comprendre son organisation.",
        ],
        vocab: ["besoin", "fonction d'usage", "fonction technique", "composant", "bête à cornes"],
        anim: { slug: "energie", label: "Voir la chaîne d'énergie" },
      },
      {
        t: "Les familles de matériaux",
        obj: "Classer les matériaux et relier leurs propriétés à leur usage dans un objet.",
        points: [
          "Grandes familles : métaux, bois, plastiques, minéraux (verre, béton), papier/carton.",
          "Propriétés observables : densité, dureté, conductivité électrique et thermique.",
          "Le choix d'un matériau dépend de la fonction, du coût et de l'impact environnemental.",
          "Recyclage : chaque famille a ses filières (acier et aluminium se recyclent à l'infini).",
        ],
        vocab: ["densité", "dureté", "conductivité", "recyclage", "famille de matériaux"],
        anim: { slug: "materiaux", label: "Tester le comparateur de matériaux" },
      },
      {
        t: "Dessiner et représenter",
        obj: "Passer de l'objet réel à sa représentation : croquis coté, vues, maquette 3D.",
        points: [
          "Le croquis à main levée communique une idée rapidement.",
          "Un dessin coté donne les dimensions en millimètres, avec des cotes et flèches.",
          "Les vues (face, dessus, côté) décrivent complètement une pièce simple.",
          "La CAO (Tinkercad, SketchUp) permet de modéliser en 3D avant de fabriquer.",
        ],
        vocab: ["croquis", "cote", "vue de face", "échelle", "CAO", "maquette numérique"],
      },
      {
        t: "Structures et stabilité",
        obj: "Comprendre pourquoi certaines formes résistent mieux que d'autres aux efforts.",
        points: [
          "Une structure doit supporter des charges sans se déformer ni casser.",
          "Le triangle est indéformable : c'est le principe de la triangulation.",
          "Treillis de ponts, grues, charpentes : les triangles sont partout.",
          "Les assemblages (collé, vissé, emboîté) conditionnent la rigidité.",
        ],
        vocab: ["charge", "déformation", "triangulation", "treillis", "assemblage"],
        anim: { slug: "structures", label: "Tester le pont en treillis" },
      },
      {
        t: "L'évolution des objets",
        obj: "Comparer des objets d'époques différentes et expliquer leurs transformations.",
        points: [
          "Les objets évoluent avec les matériaux, les énergies et les usages disponibles.",
          "L'analyse de l'existant précède toute création : on n'invente jamais de zéro.",
          "Innovation vs invention : améliorer un objet vs en créer un radicalement nouveau.",
        ],
        vocab: ["évolution", "innovation", "analyse de l'existant", "usage"],
      },
    ],
  },
  {
    niveau: "5e",
    color: "#ffc53d",
    intro: "L'année de l'énergie : d'où vient-elle, comment se transforme-t-elle, comment la mesure-t-on dans les circuits électriques ?",
    chapitres: [
      {
        t: "Sources et formes d'énergie",
        obj: "Identifier les sources d'énergie et les conversions dans les objets techniques.",
        points: [
          "Formes : électrique, mécanique, thermique, lumineuse, chimique…",
          "Sources renouvelables (soleil, vent, eau) vs non renouvelables (pétrole, gaz, uranium).",
          "Unités : le joule (J) pour l'énergie, le watt (W) pour la puissance.",
          "Toute conversion comporte des pertes, souvent en chaleur.",
        ],
        vocab: ["joule", "watt", "renouvelable", "conversion", "pertes"],
        anim: { slug: "energies", label: "Simuler solaire + éolien" },
      },
      {
        t: "La chaîne d'énergie",
        obj: "Décrire un objet technique avec le modèle alimenter-distribuer-convertir-transmettre.",
        points: [
          "Alimenter : fournir l'énergie (pile, secteur, batterie).",
          "Distribuer : commander le flux (interrupteur, relais, variateur).",
          "Convertir : changer la forme d'énergie (moteur, lampe, résistance).",
          "Transmettre : transporter le mouvement (engrenages, courroies, pignons).",
        ],
        vocab: ["alimenter", "distribuer", "convertir", "transmettre", "chaîne d'énergie"],
        anim: { slug: "energie", label: "Manipuler la chaîne d'énergie" },
      },
      {
        t: "Circuits et schémas électriques",
        obj: "Lire et réaliser un circuit à partir de son schéma normalisé, en série ou en dérivation.",
        points: [
          "Chaque dipôle a un symbole normalisé (générateur, lampe, résistance, moteur…).",
          "En série : un seul chemin — si un élément grille, tout s'arrête.",
          "En dérivation : plusieurs branches indépendantes, comme à la maison.",
          "Le courant ne circule que dans un circuit fermé.",
        ],
        vocab: ["dipôle", "schéma normalisé", "circuit série", "dérivation", "boucle"],
        anim: { slug: "circuit", label: "Câbler le circuit en série" },
      },
      {
        t: "Mesures électriques",
        obj: "Mesurer tension et intensité au multimètre et découvrir la loi d'Ohm.",
        points: [
          "La tension U se mesure en volts (V), voltmètre en dérivation.",
          "L'intensité I se mesure en ampères (A), ampèremètre en série.",
          "Loi d'Ohm : U = R × I ; la résistance R s'exprime en ohms (Ω).",
          "La puissance P = U × I s'exprime en watts.",
        ],
        vocab: ["volt", "ampère", "ohm", "multimètre", "loi d'Ohm"],
        anim: { slug: "circuit", label: "Vérifier la loi d'Ohm" },
      },
      {
        t: "Transmettre le mouvement",
        obj: "Calculer l'effet d'un engrenage ou d'une courroie sur la vitesse et le sens de rotation.",
        points: [
          "Deux roues en prise tournent en sens opposés ; une courroie croisée aussi.",
          "Rapport r = Z menante / Z menée ; N menée = N menante × r.",
          "Petite menante + grande menée = réduction (plus lent, plus fort).",
          "L'inverse = multiplication : on gagne de la vitesse, on perd du couple.",
        ],
        vocab: ["rapport de transmission", "roue menante", "roue menée", "réduction", "couple"],
        anim: { slug: "engrenages", label: "Régler le banc d'engrenages" },
      },
    ],
  },
  {
    niveau: "4e",
    color: "#7bd88f",
    intro: "L'année de l'information : capteurs, programmes et automates — comment les objets « prennent des décisions ».",
    chapitres: [
      {
        t: "La chaîne d'information",
        obj: "Décrire un système automatique avec acquérir-traiter-communiquer.",
        points: [
          "Acquérir : les capteurs mesurent le monde réel (présence, température, luminosité).",
          "Traiter : le programme compare les mesures à des consignes.",
          "Communiquer : afficher, alerter, envoyer une information à l'utilisateur.",
          "La chaîne d'information pilote la chaîne d'énergie : le cerveau et les muscles.",
        ],
        vocab: ["capteur", "consigne", "automate", "chaîne d'information"],
        anim: { slug: "domotique", label: "Piloter la maison domotique" },
      },
      {
        t: "Programmer avec Scratch",
        obj: "Écrire des programmes simples : événements, variables, conditions et boucles.",
        points: [
          "Un programme s'exécute instruction par instruction, sans initiative.",
          "Les événements déclenchent l'exécution (« quand le capteur détecte… »).",
          "La condition SI…ALORS…SINON permet de choisir entre deux chemins.",
          "Les boucles répètent ; les variables mémorisent (compteur de passages).",
        ],
        vocab: ["algorithme", "événement", "variable", "boucle", "condition"],
        anim: { slug: "algo", label: "Programmer la barrière" },
      },
      {
        t: "Logique combinatoire",
        obj: "Combiner des états logiques 0/1 avec les fonctions ET, OU, NON.",
        points: [
          "Un état logique vaut 0 (faux) ou 1 (vrai).",
          "ET : vrai seulement si toutes les entrées sont vraies.",
          "OU : vrai si au moins une entrée est vraie. NON : inverse.",
          "La table de vérité liste toutes les combinaisons possibles.",
        ],
        vocab: ["état logique", "fonction ET", "fonction OU", "table de vérité"],
        anim: { slug: "logique", label: "Manipuler les portes logiques" },
      },
      {
        t: "Automatiser un objet",
        obj: "Concevoir un objet automatique complet : capteurs, programme, actionneurs.",
        points: [
          "L'actionneur agit sur le réel : moteur, lampe, électrovanne, buzzer.",
          "Le cahier des charges fixe les scénarios de fonctionnement attendus.",
          "On teste le programme par simulation avant le câblage réel.",
        ],
        vocab: ["actionneur", "scénario", "simulation", "automatisme"],
        anim: { slug: "algo", label: "Voir la barrière automatique" },
      },
    ],
  },
  {
    niveau: "3e",
    color: "#ff7a29",
    intro: "L'année du projet complet et des objets connectés : conduire une conception de l'idée au prototype validé.",
    chapitres: [
      {
        t: "Le cahier des charges",
        obj: "Traduire un besoin en fonctions de service chiffrées et vérifiables.",
        points: [
          "Le diagramme pieuvre recense les fonctions de service et contraintes.",
          "Chaque fonction a un critère, un niveau d'exigence et une flexibilité.",
          "Le CDC est un contrat : il servira à valider le prototype final.",
        ],
        vocab: ["fonction de service", "critère", "niveau d'exigence", "contrainte", "diagramme pieuvre"],
      },
      {
        t: "Objets connectés & IoT",
        obj: "Programmer un micro-contrôleur et scénariser une installation domotique.",
        points: [
          "Le micro-contrôleur (micro:bit, Arduino) exécute le programme embarqué.",
          "Capteurs + Wi-Fi/Bluetooth = objets connectés qui remontent des données.",
          "Les scénarios SI…ALORS automatisent confort et économies d'énergie.",
          "Attention aux données personnelles : la sécurité fait partie du projet.",
        ],
        vocab: ["micro-contrôleur", "IoT", "scénario", "données", "sécurité"],
        anim: { slug: "domotique", label: "Tester les règles domotiques" },
      },
      {
        t: "Réseaux et Internet",
        obj: "Expliquer comment les données voyagent de machine en machine.",
        points: [
          "Les données sont découpées en paquets adressés (IP source, IP destination).",
          "Réseau local (box, switch) puis routeurs d'Internet : chaque étape est un saut.",
          "Protocoles : HTTP pour le web, Wi-Fi et Bluetooth pour le sans-fil.",
          "Le ping mesure le temps d'un aller-retour vers un serveur.",
        ],
        vocab: ["adresse IP", "paquet", "routeur", "protocole", "ping"],
        anim: { slug: "reseaux", label: "Envoyer un paquet" },
      },
      {
        t: "Prototyper et valider",
        obj: "Fabriquer un prototype, le tester contre le CDC et documenter les écarts.",
        points: [
          "Fabrication : impression 3D, découpe laser, câblage de la carte.",
          "Les essais produisent des mesures comparées aux niveaux d'exigence.",
          "Un constat d'écart déclenche une amélioration : version 2, version 3…",
          "La nomenclature liste pièces et références pour reproduire l'objet.",
        ],
        vocab: ["prototype", "essai", "constat", "nomenclature", "validation"],
      },
      {
        t: "Communiquer son projet",
        obj: "Présenter et défendre ses choix techniques lors d'une soutenance.",
        points: [
          "L'affiche technique synthétise besoin, solution et résultats.",
          "La démonstration filmée montre le prototype en situation réelle.",
          "La soutenance argumente les choix face au cahier des charges.",
        ],
        vocab: ["soutenance", "affiche technique", "argumentation", "démonstration"],
      },
    ],
  },
];

const PLUS: Record<string, { l: string; u: string }[]> = {
  "Le monde des objets": [
    { l: "techno-flash · Cahier des charges fonctionnel", u: "https://techno-flash.com/animations/cahier_des_charges/cahier_des_charges_fonctionnel.html" },
    { l: "Nathan · Technologie collège", u: "https://technologie-college.nathan.fr/" },
  ],
  "Les familles de matériaux": [
    { l: "Techmania · les matériaux", u: "http://www.techmania.fr/" },
    { l: "techno-moreau · cours 6e", u: "https://techno-moreau.fr/" },
  ],
  "Dessiner et représenter": [
    { l: "Nathan · Technologie collège", u: "https://technologie-college.nathan.fr/" },
    { l: "Padlet · T. Aubreton", u: "https://padlet.com/thierry_aubreton" },
  ],
  "Structures et stabilité": [
    { l: "Techmania · les structures", u: "http://www.techmania.fr/" },
    { l: "Lumni · vidéos techno", u: "https://www.lumni.fr/" },
  ],
  "L'évolution des objets": [{ l: "Lumni · vidéos techno", u: "https://www.lumni.fr/" }],
  "Sources et formes d'énergie": [
    { l: "CEA · animations technologies", u: "https://www.cea.fr/multimedia/Pages/animations/technologies.aspx" },
    { l: "Lumni · l'énergie", u: "https://www.lumni.fr/" },
  ],
  "La chaîne d'énergie": [
    { l: "techno-flash · Chaîne d'énergie", u: "https://techno-flash.com/animations/chaine_energie/chaine_energie.html" },
    { l: "Techmania · l'énergie", u: "http://www.techmania.fr/" },
  ],
  "Circuits et schémas électriques": [
    { l: "techno-flash · animations électricité", u: "https://techno-flash.com/" },
    { l: "Lumni · l'électricité", u: "https://www.lumni.fr/" },
  ],
  "Mesures électriques": [
    { l: "Nathan · Technologie collège", u: "https://technologie-college.nathan.fr/" },
    { l: "techno-moreau · cours 5e", u: "https://techno-moreau.fr/" },
  ],
  "Transmettre le mouvement": [
    { l: "techno-moreau · engrenages", u: "https://techno-moreau.fr/" },
    { l: "Padlet · Techno Valdahon", u: "https://padlet.com/coursdetechnovaldahon/" },
  ],
  "La chaîne d'information": [
    { l: "Lumni · vidéos techno", u: "https://www.lumni.fr/" },
    { l: "ENT · Techno Brassens", u: "https://entechnobrassens.info/" },
  ],
  "Programmer avec Scratch": [
    { l: "techno-flash · Algorithme & algorigramme", u: "https://techno-flash.com/animations/AAbfu49z/Algorithme_Algorigramme.html" },
    { l: "Lumni · la programmation", u: "https://www.lumni.fr/" },
  ],
  "Logique combinatoire": [
    { l: "techno-flash · Algorithme & algorigramme", u: "https://techno-flash.com/animations/AAbfu49z/Algorithme_Algorigramme.html" },
    { l: "ENT2D · STI collège", u: "https://ent2d.ac-bordeaux.fr/disciplines/sti-college/" },
  ],
  "Automatiser un objet": [
    { l: "Padlet · Techno Valdahon", u: "https://padlet.com/coursdetechnovaldahon/" },
    { l: "Éduscol · ressources cycle 4", u: "https://eduscol.education.gouv.fr/5745/ressources-d-accompagnement-du-programme-de-technologie-au-cycle-4" },
  ],
  "Le cahier des charges": [
    { l: "techno-flash · Cahier des charges fonctionnel", u: "https://techno-flash.com/animations/cahier_des_charges/cahier_des_charges_fonctionnel.html" },
    { l: "Éduscol · ressources cycle 4", u: "https://eduscol.education.gouv.fr/5745/ressources-d-accompagnement-du-programme-de-technologie-au-cycle-4" },
  ],
  "Objets connectés & IoT": [
    { l: "Lumni · vidéos techno", u: "https://www.lumni.fr/" },
    { l: "Padlet · T. Aubreton", u: "https://padlet.com/thierry_aubreton" },
  ],
  "Réseaux et Internet": [
    { l: "Lumni · le numérique", u: "https://www.lumni.fr/" },
    { l: "Éduscol · ressources cycle 4", u: "https://eduscol.education.gouv.fr/5745/ressources-d-accompagnement-du-programme-de-technologie-au-cycle-4" },
  ],
  "Prototyper et valider": [
    { l: "Nathan · Technologie collège", u: "https://technologie-college.nathan.fr/" },
    { l: "techno-moreau · projets", u: "https://techno-moreau.fr/" },
  ],
  "Communiquer son projet": [
    { l: "ENT2D · STI collège", u: "https://ent2d.ac-bordeaux.fr/disciplines/sti-college/" },
    { l: "Nathan · Technologie collège", u: "https://technologie-college.nathan.fr/" },
  ],
};

export default function CoursPage() {
  const [niv, setNiv] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const c = COURS[niv];

  return (
    <div className="bg-seyes text-cardink min-h-screen pt-[67px]">
      <div className="absolute top-0 bottom-0 left-10 sm:left-16 w-[2px] bg-redT/60 pointer-events-none" aria-hidden />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 relative">
        <SectionHead
          dark={false}
          index="Les cours"
          kicker="19 chapitres · 6e → 3e"
          title="Le programme, chapitre par chapitre"
          desc="Chaque chapitre : l'objectif, les points essentiels à retenir et le vocabulaire à connaître. Les chapitres marqués ▸ ouvrent directement l'animation correspondante au labo."
        />

        {/* onglets niveaux */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COURS.map((lv, i) => (
            <button
              key={lv.niveau}
              onClick={() => {
                setNiv(i);
                setOpen(0);
              }}
              className={`border-2 px-4 py-3 text-left transition-all cursor-pointer ${
                i === niv ? "bg-cardink text-paper -translate-y-0.5 shadow-[4px_4px_0_rgba(23,41,61,0.4)]" : "bg-[#fffdf4] hover:-translate-y-0.5"
              }`}
              style={{ borderColor: i === niv ? lv.color : "#17293d" }}
              aria-pressed={i === niv}
            >
              <span className="font-display text-3xl" style={{ color: lv.color }}>{lv.niveau}</span>
              <span className={`block mt-0.5 font-mono text-[9.5px] tracking-[0.16em] uppercase ${i === niv ? "text-paper/70" : "text-[#41546b]"}`}>
                {lv.chapitres.length} chapitres
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-[14px] text-[#41546b] italic max-w-3xl">{c.intro}</p>

        {/* chapitres */}
        <div className="mt-6 space-y-3.5">
          {c.chapitres.map((ch, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={ch.t} delay={i * 60}>
                <article className="border-2 border-cardink bg-[#fffdf4] shadow-[5px_5px_0_rgba(23,41,61,0.85)] overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-paper2 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-2xl sm:text-3xl w-12 shrink-0" style={{ color: c.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-lg sm:text-xl">{ch.t}</span>
                      <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#71808f] mt-0.5">{ch.obj}</span>
                    </span>
                    <span className={`font-display text-xl transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} style={{ color: c.color }} aria-hidden>
                      ▸
                    </span>
                  </button>
                  {isOpen && (
                    <div className="rise border-t-2 border-dashed border-cardink/25 px-5 sm:pl-[5.2rem] py-5 pr-5">
                      <div className="grid md:grid-cols-[1fr_240px] gap-6">
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#a8700a]">À retenir</p>
                          <ul className="mt-2.5 space-y-2">
                            {ch.points.map((p) => (
                              <li key={p} className="flex gap-2.5 text-[13.5px] leading-relaxed text-[#33465c]">
                                <span className="mt-[7px] w-2 h-2 shrink-0" style={{ background: c.color }} aria-hidden />
                                {p}
                              </li>
                            ))}
                          </ul>
                          {ch.anim && (
                            <button
                              onClick={() => navigate(`/animations/${ch.anim!.slug}`)}
                              className="mt-4 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 bg-cardink text-paper hover:bg-[#24405c] transition-colors cursor-pointer"
                            >
                              <span style={{ color: c.color }} aria-hidden>▶</span>
                              {ch.anim.label}
                            </button>
                          )}
                          {PLUS[ch.t] && (
                            <div className="mt-5 border-2 border-dashed border-cardink/30 bg-paper px-4 py-3">
                              <p className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#a8700a]">Pour aller plus loin ↗</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {PLUS[ch.t].map((lk) => (
                                  <a
                                    key={lk.l}
                                    href={lk.u}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[10.5px] uppercase tracking-wide border border-cardink/60 px-2.5 py-1.5 hover:bg-cardink hover:text-paper transition-colors"
                                  >
                                    {lk.l}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#a8700a]">Vocabulaire</p>
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {ch.vocab.map((v) => (
                              <span key={v} className="font-mono text-[10px] uppercase tracking-wide border border-cardink/50 px-2 py-1 bg-paper">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

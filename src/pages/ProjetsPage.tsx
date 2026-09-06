import { useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";
import { navigate } from "../lib/router";

type Projet = {
  nom: string;
  niveau: string;
  color: string;
  duree: string;
  resume: string;
  besoin: string;
  fonctions: [string, string][]; // critère — niveau d'exigence
  outils: string[];
  anims: { slug: string; label: string }[];
};

const PROJETS: Projet[] = [
  {
    nom: "Le pont en papier",
    niveau: "6e",
    color: "#3fc9d8",
    duree: "6 séances",
    resume: "Porter 1 kg au-dessus d'une brèche de 30 cm… avec une seule feuille A4 et un peu de colle.",
    besoin: "Permettre à une charge de 1 kg de franchir une brèche sans toucher le fond.",
    fonctions: [
      ["Portée", "≥ 300 mm"],
      ["Charge supportée", "≥ 1 kg pendant 10 s"],
      ["Masse de la structure", "≤ 150 g"],
      ["Esthétique", "libre, soignée"],
    ],
    outils: ["Papier A4", "Colle", "Règle & cutter", "Balance", "Masses marquées"],
    anims: [{ slug: "structures", label: "S'entraîner : pont en treillis" }],
  },
  {
    nom: "L'abri de jardin bioclimatique",
    niveau: "6e",
    color: "#3fc9d8",
    duree: "8 séances",
    resume: "Concevoir un abri qui reste frais l'été et sec toute l'année, en choisissant les bons matériaux.",
    besoin: "Protéger des outils de jardin de la pluie et de la chaleur.",
    fonctions: [
      ["Étanchéité", "aucune fuite sous arrosage 30 s"],
      ["Température intérieure", "≤ extérieur + 5 °C en plein soleil"],
      ["Résistance au vent", "stable sous ventilateur vitesse 2"],
    ],
    outils: ["Carton plume", "Papiers & films", "Lampe chauffante", "Thermomètre"],
    anims: [{ slug: "materiaux", label: "S'entraîner : choix des matériaux" }],
  },
  {
    nom: "La mini-éolienne",
    niveau: "5e",
    color: "#ffc53d",
    duree: "8 séances",
    resume: "Construire une turbine qui transforme le vent en électricité pour recharger un condensateur.",
    besoin: "Produire de l'électricité à partir du vent pour alimenter une LED.",
    fonctions: [
      ["Tension produite", "≥ 2 V à 20 km/h de vent"],
      ["Démarrage", "dès 10 km/h"],
      ["Nombre de pales", "2 à 4, au choix (à justifier)"],
      ["Sécurité", "arrêt automatique au-delà de 45 km/h"],
    ],
    outils: ["Petit moteur CC", "Pales imprimées 3D", "Multimètre", "Soufflerie de classe"],
    anims: [{ slug: "energies", label: "S'entraîner : mix solaire-éolien" }],
  },
  {
    nom: "Le chargeur de téléphone solaire",
    niveau: "5e",
    color: "#ffc53d",
    duree: "6 séances",
    resume: "Un panneau, un régulateur, une batterie : recharger un téléphone… quand le soleil le veut bien.",
    besoin: "Recharger un téléphone en randonnée, sans prise électrique.",
    fonctions: [
      ["Tension de sortie", "5 V ± 0,25 V (USB)"],
      ["Autonomie", "≥ 30 % de batterie après 2 h de soleil"],
      ["Encombrement", "tient dans une sacoche"],
    ],
    outils: ["Panneau 6 V", "Régulateur USB", "Batterie Li-ion", "Luxmètre"],
    anims: [{ slug: "energies", label: "S'entraîner : production solaire" }],
  },
  {
    nom: "La barrière de parking",
    niveau: "4e",
    color: "#7bd88f",
    duree: "10 séances",
    resume: "Capteur de présence, programme Scratch, motoréducteur : la barrière s'ouvre toute seule.",
    besoin: "Autoriser l'entrée d'un véhicule détenteur d'un badge, sans agent.",
    fonctions: [
      ["Détection", "véhicule repéré à ≤ 1,5 m"],
      ["Temps d'ouverture", "≤ 3 s"],
      ["Comptage", "+1 par véhicule passé"],
      ["Sécurité", "ne jamais se refermer sur un véhicule"],
    ],
    outils: ["Maquette + motoréducteur", "Capteur à ultrasons", "Scratch / mBlock", "Carte Arduino"],
    anims: [
      { slug: "algo", label: "S'entraîner : programme barrière" },
      { slug: "logique", label: "S'entraîner : portes logiques" },
    ],
  },
  {
    nom: "Le radar de recul",
    niveau: "4e",
    color: "#7bd88f",
    duree: "8 séances",
    resume: "Un buzzer qui bipe de plus en plus vite à mesure que l'obstacle se rapproche, comme sur les vraies voitures.",
    besoin: "Alerter le conducteur d'un obstacle arrière et de sa distance.",
    fonctions: [
      ["Plage de détection", "20 cm à 150 cm"],
      ["Signal", "bip de plus en plus rapide"],
      ["Précision", "± 3 cm"],
    ],
    outils: ["Capteur ultrasons HC-SR04", "Buzzer", "Arduino", "Mètre ruban"],
    anims: [{ slug: "algo", label: "S'entraîner : logique d'automate" }],
  },
  {
    nom: "La serre connectée",
    niveau: "3e",
    color: "#ff7a29",
    duree: "12 séances",
    resume: "Arrosage automatique, éclairage LED et suivi des données : les plantes poussent toutes seules.",
    besoin: "Maintenir des conditions de culture optimales sans intervention quotidienne.",
    fonctions: [
      ["Humidité du sol", "entre 40 et 60 %"],
      ["Température", "15 à 25 °C"],
      ["Surveillance", "données consultables à distance"],
      ["Autonomie", "≥ 7 jours sans intervention"],
    ],
    outils: ["micro:bit / ESP32", "Capteurs sol & air", "Pompe 5 V", "Dashboard web"],
    anims: [
      { slug: "domotique", label: "S'entraîner : règles SI…ALORS" },
      { slug: "reseaux", label: "S'entraîner : envoi de données" },
    ],
  },
  {
    nom: "La borne de recharge intelligente",
    niveau: "3e",
    color: "#ff7a29",
    duree: "10 séances",
    resume: "Répartir la puissance entre deux vélos électriques qui chargent en même temps, sans faire sauter les plombs.",
    besoin: "Recharger deux vélos électriques sur une prise limitée à 10 A.",
    fonctions: [
      ["Puissance totale", "≤ 2 200 W en permanence"],
      ["Répartition", "prioritaire au vélo le plus déchargé"],
      ["Affichage", "état de charge visible"],
    ],
    outils: ["Relais statiques", "Capteurs de courant", "ESP32", "Écran OLED"],
    anims: [{ slug: "circuit", label: "S'entraîner : puissance électrique" }],
  },
  {
    nom: "Le robot suiveur de ligne",
    niveau: "3e",
    color: "#ff7a29",
    duree: "12 séances",
    resume: "Deux capteurs infrarouges, deux moteurs, un algorithme de régulation : le robot suit son circuit au millimètre.",
    besoin: "Suivre automatiquement une ligne noire tracée au sol.",
    fonctions: [
      ["Vitesse moyenne", "≥ 0,3 m/s"],
      ["Précision de suivi", "ne jamais perdre la ligne"],
      ["Virages", "angles jusqu'à 90°"],
    ],
    outils: ["Châssis 2 roues", "Capteurs IR", "Pont en H", "Arduino"],
    anims: [
      { slug: "algo", label: "S'entraîner : algorithmique" },
      { slug: "mecanismes", label: "S'entraîner : transmission" },
    ],
  },
  {
    nom: "Le four solaire",
    niveau: "5e",
    color: "#ffc53d",
    duree: "5 séances",
    resume: "Concentrer les rayons du soleil pour faire fondre du chocolat — ou cuire un œuf, pour les plus ambitieux.",
    besoin: "Cuire ou chauffer un aliment sans autre source d'énergie que le soleil.",
    fonctions: [
      ["Température interne", "≥ 80 °C par ciel dégagé"],
      ["Orientation", "réglable en hauteur et en azimut"],
      ["Sécurité", "aucune surface brûlante accessible"],
    ],
    outils: ["Carton & miroirs", "Film réfléchissant", "Thermomètre", "Peinture noire mate"],
    anims: [{ slug: "energies", label: "S'entraîner : énergie solaire" }],
  },
  {
    nom: "La station météo de la classe",
    niveau: "4e",
    color: "#7bd88f",
    duree: "9 séances",
    resume: "Température, humidité, pression : la classe publie sa météo toutes les heures sur un tableau de bord.",
    besoin: "Mesurer et archiver les conditions météo locales, consultables à distance.",
    fonctions: [
      ["Capteurs", "température ± 0,5 °C, humidité ± 3 %"],
      ["Publication", "données envoyées toutes les heures"],
      ["Autonomie", "fonctionne sur pile 1 semaine"],
    ],
    outils: ["Capteur BME280", "ESP32", "Grafana / padlet", "Abri météo"],
    anims: [
      { slug: "domotique", label: "S'entraîner : capteurs & règles" },
      { slug: "reseaux", label: "S'entraîner : envoi de données" },
    ],
  },
];

const NIVEAUX = ["Tous", "6e", "5e", "4e", "3e"];

export default function ProjetsPage() {
  const [filtre, setFiltre] = useState("Tous");
  const [open, setOpen] = useState<string | null>(PROJETS[0].nom);

  const shown = PROJETS.filter((p) => filtre === "Tous" || p.niveau === filtre);

  return (
    <div className="bg-blueprint min-h-screen pt-[67px]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <SectionHead
          index="Les projets"
          kicker="Du cahier des charges au prototype"
          title="11 projets menés en classe"
          desc="Chaque projet suit la démarche complète : besoin, cahier des charges, fabrication, essais. Déplie une carte pour lire son cahier des charges et retrouver les animations d'entraînement associées."
        />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {NIVEAUX.map((n) => (
            <button
              key={n}
              onClick={() => setFiltre(n)}
              className={`font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2 border-2 cursor-pointer transition-colors ${
                filtre === n ? "border-orangeT bg-orangeT text-ink font-semibold" : "border-line text-fog hover:border-fog"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] tracking-[0.2em] uppercase text-fog">
            {shown.length} projet{shown.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-7 grid md:grid-cols-2 gap-5">
          {shown.map((p, i) => {
            const isOpen = open === p.nom;
            return (
              <Reveal key={p.nom} delay={(i % 2) * 80}>
                <article
                  className={`border bg-ink2/70 transition-all duration-300 ${isOpen ? "border-line" : "border-line hover:-translate-y-1"}`}
                  style={isOpen ? { borderTopColor: p.color, borderTopWidth: 3 } : undefined}
                >
                  <button onClick={() => setOpen(isOpen ? null : p.nom)} className="w-full text-left px-5 py-4 cursor-pointer" aria-expanded={isOpen}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase px-2.5 py-1 border" style={{ color: p.color, borderColor: `${p.color}88` }}>
                        {p.niveau} · {p.duree}
                      </span>
                      <span className={`font-display text-lg transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} style={{ color: p.color }} aria-hidden>
                        ▸
                      </span>
                    </div>
                    <h3 className="font-display uppercase text-2xl tracking-wide text-snow mt-3">{p.nom}</h3>
                    <p className="mt-1.5 text-[13.5px] text-fog leading-relaxed">{p.resume}</p>
                  </button>

                  {isOpen && (
                    <div className="rise border-t border-line px-5 py-5 space-y-5">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-yellowT">Besoin identifié</p>
                        <p className="mt-1.5 text-[13.5px] text-snow/90 leading-relaxed">{p.besoin}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-yellowT">Extrait du cahier des charges</p>
                        <table className="mt-2 w-full text-[12.5px]">
                          <tbody>
                            {p.fonctions.map(([c, n]) => (
                              <tr key={c} className="border-b border-line/50 last:border-0">
                                <td className="py-1.5 pr-3 text-fog">{c}</td>
                                <td className="py-1.5 text-right font-mono text-[11.5px]" style={{ color: p.color }}>{n}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-yellowT">Matériel & outils</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.outils.map((o) => (
                            <span key={o} className="font-mono text-[10px] uppercase tracking-wide border border-line px-2 py-1 text-fog">{o}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {p.anims.map((a) => (
                          <button
                            key={a.slug + a.label}
                            onClick={() => navigate(`/animations/${a.slug}`)}
                            className="font-mono text-[10.5px] tracking-[0.14em] uppercase px-3.5 py-2 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors cursor-pointer"
                          >
                            ▶ {a.label}
                          </button>
                        ))}
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

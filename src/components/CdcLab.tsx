import { useState } from "react";
import { Reveal, SectionHead, Stamp } from "../lib/ui";

type Produit = {
  nom: string;
  bdc: { usager: string; but: string; agit: string };
  fp: string;
  fc: { label: string; def: string }[];
  cdc: { fonction: string; critere: string; niveaux: string[]; flex: string }[];
};

const PRODUITS: Produit[] = [
  {
    nom: "Enceinte nomade",
    bdc: { usager: "Le collégien mélomane", but: "Écouter de la musique partout", agit: "La musique (le son)" },
    fp: "Diffuser de la musique de façon nomade",
    fc: [
      { label: "Résister aux chutes", def: "Survivre à une chute du bureau sans casser : le boîtier et les composants doivent être protégés." },
      { label: "Être transportable", def: "Se glisser dans un sac : masse et encombrement limités pour suivre l'utilisateur partout." },
      { label: "Être autonome", def: "Fonctionner sans prise électrique : la batterie stocke l'énergie nécessaire." },
      { label: "Être esthétique", def: "Plaire à son utilisateur : formes, couleurs et finitions font partie du design." },
      { label: "Respecter un budget", def: "Rester achetable : le coût de revient conditionne le prix de vente." },
    ],
    cdc: [
      { fonction: "FP1 — Diffuser la musique", critere: "Puissance sonore", niveaux: ["85 dB", "95 dB", "105 dB"], flex: "± 5 dB" },
      { fonction: "FC1 — Résister aux chutes", critere: "Hauteur de chute", niveaux: ["0,5 m", "1 m", "1,5 m"], flex: "± 0,2 m" },
      { fonction: "FC2 — Être transportable", critere: "Masse", niveaux: ["≤ 300 g", "≤ 500 g", "≤ 800 g"], flex: "± 50 g" },
      { fonction: "FC3 — Être autonome", critere: "Autonomie", niveaux: ["4 h", "8 h", "12 h"], flex: "± 1 h" },
      { fonction: "FC4 — Respecter un budget", critere: "Prix de vente", niveaux: ["15 €", "25 €", "40 €"], flex: "± 5 €" },
    ],
  },
  {
    nom: "Trottinette électrique",
    bdc: { usager: "Le citadin pressé", but: "Se déplacer vite sans effort", agit: "Le déplacement de la personne" },
    fp: "Permettre de se déplacer rapidement en ville",
    fc: [
      { label: "Freiner en sécurité", def: "S'arrêter sur une courte distance, même sur sol mouillé : c'est la contrainte n°1." },
      { label: "Avoir de l'autonomie", def: "Parcourir le trajet quotidien sans recharger : la batterie dimensionne l'usage." },
      { label: "Être pliable", def: "Se plier en quelques secondes pour monter dans le bus ou le train." },
      { label: "Résister aux intempéries", def: "Rouler sous la pluie : étanchéité de l'électronique et anticorrosion." },
      { label: "Se recharger vite", def: "Retrouver une charge complète en quelques heures sur une prise standard." },
    ],
    cdc: [
      { fonction: "FP1 — Se déplacer", critere: "Vitesse maximale", niveaux: ["15 km/h", "25 km/h", "35 km/h"], flex: "± 2 km/h" },
      { fonction: "FC1 — Freiner", critere: "Distance d'arrêt", niveaux: ["3 m", "5 m", "8 m"], flex: "± 0,5 m" },
      { fonction: "FC2 — Autonomie", critere: "Portée", niveaux: ["10 km", "20 km", "30 km"], flex: "± 2 km" },
      { fonction: "FC3 — Pliage", critere: "Temps de pliage", niveaux: ["3 s", "5 s", "10 s"], flex: "± 1 s" },
      { fonction: "FC4 — Recharge", critere: "Charge complète", niveaux: ["1 h", "3 h", "5 h"], flex: "± 30 min" },
    ],
  },
  {
    nom: "Serre connectée",
    bdc: { usager: "Le jardinier urbain", but: "Cultiver toute l'année", agit: "Les plantes" },
    fp: "Maintenir des conditions idéales pour les plantes",
    fc: [
      { label: "Arroser automatiquement", def: "Distribuer l'eau sans intervention : capteur d'humidité + électrovanne." },
      { label: "Alerter à distance", def: "Prévenir le jardinier sur son téléphone en cas de gel ou de panne." },
      { label: "Résister au vent", def: "Tenir debout lors des tempêtes : structure et ancrage adaptés." },
      { label: "Être économe en eau", def: "Arroser juste ce qu'il faut : la ressource est précieuse." },
      { label: "Laisser passer la lumière", def: "Le vitrage doit transmettre un maximum de lumière pour la photosynthèse." },
    ],
    cdc: [
      { fonction: "FP1 — Conditions idéales", critere: "Plage de température", niveaux: ["15–25 °C", "10–30 °C", "5–35 °C"], flex: "± 2 °C" },
      { fonction: "FC1 — Arrosage", critere: "Réserve d'eau", niveaux: ["2 L", "5 L", "10 L"], flex: "± 0,5 L" },
      { fonction: "FC2 — Alerte", critere: "Portée de l'alerte", niveaux: ["Wi-Fi maison", "4G ville", "LoRa 10 km"], flex: "—" },
      { fonction: "FC3 — Tenir au vent", critere: "Vitesse supportée", niveaux: ["40 km/h", "60 km/h", "80 km/h"], flex: "± 5 km/h" },
      { fonction: "FC4 — Lumière", critere: "Transmission lumineuse", niveaux: ["60 %", "75 %", "90 %"], flex: "± 5 %" },
    ],
  },
];

const FC_POS = [
  { x: 280, y: 46 },
  { x: 452, y: 122 },
  { x: 414, y: 282 },
  { x: 146, y: 282 },
  { x: 108, y: 122 },
];

export default function CdcLab() {
  const [prod, setProd] = useState(0);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [fcActive, setFcActive] = useState(0);
  const [choix, setChoix] = useState<string[]>(["", "", "", "", ""]);
  const [valide, setValide] = useState(false);
  const p = PRODUITS[prod];

  const choisir = (i: number, v: string) => {
    setChoix((c) => c.map((x, k) => (k === i ? v : x)));
    setValide(false);
  };

  const changerProduit = (i: number) => {
    setProd(i);
    setRevealed([]);
    setFcActive(0);
    setChoix(["", "", "", "", ""]);
    setValide(false);
  };

  const remplirConseille = () => setChoix(p.cdc.map(() => "1"));
  const nbRemplis = choix.filter((c) => c !== "").length;

  const toggleReveal = (k: string) =>
    setRevealed((r) => (r.includes(k) ? r.filter((x) => x !== k) : [...r, k]));

  const bdcCells: { k: string; q: string; a: string; x: number; y: number }[] = [
    { k: "usager", q: "À qui rend-il service ?", a: p.bdc.usager, x: 16, y: 66 },
    { k: "but", q: "Dans quel but ?", a: p.bdc.but, x: 372, y: 66 },
    { k: "agit", q: "Sur quoi agit-il ?", a: p.bdc.agit, x: 196, y: 170 },
  ];

  return (
    <section id="cdc" className="bg-seyes text-cardink relative">
      <div className="absolute top-0 bottom-0 left-10 sm:left-16 w-[2px] bg-redT/60 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <SectionHead
          dark={false}
          index="Atelier 12"
          kicker="Analyse & projet · façon techno-flash"
          title="Le cahier des charges fonctionnel"
          desc="Avant de fabriquer, on cadre le besoin. Choisis un produit, clique sur la bête à cornes pour révéler ses réponses, explore le diagramme pieuvre, puis complète le tableau du cahier des charges et fais-le valider — exactement comme dans l'animation de techno-flash."
        />

        {/* choix du produit */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {PRODUITS.map((pr, i) => (
            <button
              key={pr.nom}
              onClick={() => changerProduit(i)}
              className={`font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 border-2 transition-all cursor-pointer ${
                i === prod ? "bg-cardink text-paper border-cardink shadow-[4px_4px_0_rgba(23,41,61,0.35)]" : "bg-[#fffdf4] border-cardink/60 hover:border-cardink hover:-translate-y-0.5"
              }`}
              aria-pressed={i === prod}
            >
              {pr.nom}
            </button>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-7 items-start">
          {/* colonne diagrammes */}
          <div className="space-y-7">
            <Reveal>
              <div className="paper-card p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#a8700a]">1 · La bête à cornes</h3>
                  <span className="font-mono text-[10px] text-[#71808f]">clique sur les bulles</span>
                </div>
                <svg viewBox="0 0 520 250" className="w-full mt-3 block" role="img" aria-label="Bête à cornes interactive">
                  <g>
                    <rect x="196" y="66" width="148" height="58" fill="#17293d" />
                    <text x="270" y="90" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="15" fill="#f5f3ea" letterSpacing="1">
                      {p.nom.toUpperCase()}
                    </text>
                    <text x="270" y="108" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#9fb6c9">
                      OBJET TECHNIQUE
                    </text>
                  </g>
                  {bdcCells.map((c) => {
                    const open = revealed.includes(c.k);
                    const cx = c.x + 74;
                    return (
                      <g key={c.k} onClick={() => toggleReveal(c.k)} className="cursor-pointer">
                        <rect x={c.x} y={c.y} width="148" height="56" fill={open ? "#ffc53d" : "#fffdf4"} stroke="#17293d" strokeWidth="2.4" />
                        {!open ? (
                          <text x={cx} y={c.y + 32} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#17293d">
                            {c.q}
                          </text>
                        ) : (
                          <>
                            <text x={cx} y={c.y + 22} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7a5a00">
                              {c.q}
                            </text>
                            <text x={cx} y={c.y + 40} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="bold" fill="#17293d">
                              {c.a.length > 26 ? c.a.slice(0, 25) + "…" : c.a}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                  <g stroke="#e8442e" strokeWidth="2.4" fill="none">
                    <line x1="170" y1="95" x2="192" y2="95" />
                    <path d="M192 95 l-7 -4.5 v9 z" fill="#e8442e" />
                    <line x1="346" y1="95" x2="368" y2="95" />
                    <path d="M368 95 l-7 -4.5 v9 z" fill="#e8442e" />
                    <line x1="270" y1="166" x2="270" y2="128" />
                    <path d="M270 128 l-4.5 7 h9 z" fill="#e8442e" />
                  </g>
                </svg>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="paper-card p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#a8700a]">2 · Le diagramme pieuvre</h3>
                  <span className="font-mono text-[10px] text-[#71808f]">clique sur une fonction</span>
                </div>
                <svg viewBox="0 0 560 330" className="w-full mt-3 block" role="img" aria-label="Diagramme pieuvre interactif">
                  {p.fc.map((f, i) => {
                    const pos = FC_POS[i];
                    const active = fcActive === i;
                    return (
                      <g key={f.label}>
                        <line
                          x1="280" y1="164" x2={pos.x} y2={pos.y}
                          stroke={active ? "#e8442e" : "#17293d"}
                          strokeWidth={active ? 3 : 1.6}
                          strokeDasharray={active ? "none" : "5 4"}
                          style={{ transition: "all .3s" }}
                        />
                        <g onClick={() => setFcActive(i)} className="cursor-pointer">
                          <circle cx={pos.x} cy={pos.y} r={active ? 34 : 30} fill={active ? "#ffc53d" : "#fffdf4"} stroke="#17293d" strokeWidth="2.2" style={{ transition: "all .3s" }} />
                          <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="bold" fill="#17293d">
                            FC{i + 1}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                  <ellipse cx="280" cy="164" rx="92" ry="36" fill="#17293d" />
                  <text x="280" y="160" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="15" fill="#f5f3ea" letterSpacing="1">
                    {p.nom.toUpperCase()}
                  </text>
                  <text x="280" y="176" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#ffc53d">
                    FP1 : {p.fp.length > 34 ? p.fp.slice(0, 33) + "…" : p.fp}
                  </text>
                </svg>
                <div className="mt-3 border-t-2 border-dashed border-cardink/25 pt-3">
                  <p className="font-semibold">
                    <span className="font-mono text-[11px] bg-cardink text-paper px-2 py-0.5 mr-2">FC{fcActive + 1}</span>
                    {p.fc[fcActive].label}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#41546b]">{p.fc[fcActive].def}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[#71808f]">
                    FP = fonction principale (le service rendu) · FC = fonction de contrainte (ce qu'il faut respecter)
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* colonne cahier des charges */}
          <Reveal delay={160}>
            <div className="paper-card p-5 sm:p-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#a8700a]">3 · Tableau du cahier des charges</h3>
                <span className="font-mono text-[10px] text-[#71808f]">{nbRemplis}/5 niveaux choisis</span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-[12.5px] min-w-[520px]">
                  <thead>
                    <tr className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[#71808f] border-b-2 border-cardink">
                      <th className="text-left py-2 pr-2">Fonction</th>
                      <th className="text-left py-2 pr-2">Critère</th>
                      <th className="text-left py-2 pr-2">Niveau d'exigence</th>
                      <th className="text-left py-2">Flexibilité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.cdc.map((row, i) => (
                      <tr key={row.fonction} className="border-b border-cardink/20 align-top">
                        <td className="py-3 pr-2 font-semibold">{row.fonction}</td>
                        <td className="py-3 pr-2 text-[#41546b]">{row.critere}</td>
                        <td className="py-3 pr-2">
                          <select
                            value={choix[i]}
                            onChange={(e) => choisir(i, e.target.value)}
                            className="font-mono text-[11.5px] border-2 border-cardink bg-[#fffdf4] px-2 py-1.5 cursor-pointer focus:outline-none focus:border-[#e8442e] w-full max-w-[170px]"
                            aria-label={`Niveau pour ${row.fonction}`}
                          >
                            <option value="">— choisir —</option>
                            {row.niveaux.map((n, k) => (
                              <option key={n} value={String(k)}>{n}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 font-mono text-[11.5px] text-[#71808f]">{row.flex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setValide(true)}
                  disabled={nbRemplis < 5}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase px-5 py-3 border-2 border-cardink bg-cardink text-paper disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#24405c] transition-colors cursor-pointer"
                >
                  ✓ Valider le CDC
                </button>
                <button
                  onClick={remplirConseille}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase px-5 py-3 border-2 border-cardink hover:bg-cardink hover:text-paper transition-colors cursor-pointer"
                >
                  Solution conseillée
                </button>
              </div>

              {valide && (
                <div className="rise mt-5 border-2 border-dashed border-[#3d7a4a] bg-[#eef6ee] p-4 flex flex-wrap items-center gap-4">
                  <Stamp className="border-[#3d7a4a] text-[#3d7a4a] bg-transparent">CDC validé · prêt pour conception</Stamp>
                  <div className="font-mono text-[10.5px] text-[#33465c] space-y-0.5">
                    {p.cdc.map((row, i) => (
                      <p key={row.fonction}>
                        {row.critere} → <strong>{row.niveaux[Number(choix[i])]}</strong>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-5 text-[12px] leading-relaxed text-[#41546b] border-t border-dashed border-cardink/25 pt-4">
                <strong>Méthode (inspirée de techno-flash) :</strong> chaque fonction de service reçoit un <em>critère</em> mesurable, un <em>niveau d'exigence</em> chiffré et une <em>flexibilité</em> (la marge acceptable). Ce tableau devient le contrat qui permettra de valider le prototype en fin de projet.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

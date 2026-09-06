import { useState } from "react";
import { Reveal, SectionHead, Stamp } from "../lib/ui";

const QUESTIONS = [
  {
    q: "Dans la chaîne d'énergie, quelle fonction transforme l'énergie électrique en mouvement ?",
    opts: ["Alimenter", "Distribuer", "Convertir", "Transmettre"],
    good: 2,
    why: "Convertir, c'est changer la forme de l'énergie : le moteur convertit l'électrique en mécanique, la lampe en lumineux.",
  },
  {
    q: "Deux engrenages en prise tournent toujours…",
    opts: ["Dans le même sens", "Dans des sens opposés", "À la même vitesse", "Seulement si l'un est moteur"],
    good: 1,
    why: "Les dents se poussent l'une l'autre : la roue menée tourne forcément en sens inverse de la menante.",
  },
  {
    q: "Une roue menante de 10 dents entraîne une roue de 30 dents. Si la menante tourne à 60 tr/min, la menée tourne à…",
    opts: ["180 tr/min", "60 tr/min", "30 tr/min", "20 tr/min"],
    good: 3,
    why: "N₂ = N₁ × Z₁/Z₂ = 60 × 10/30 = 20 tr/min : trois fois plus de dents, trois fois moins vite.",
  },
  {
    q: "La porte logique ET donne un niveau 1 en sortie…",
    opts: ["Si A = 1 ou B = 1", "Uniquement si A = 1 ET B = 1", "Si A = 0 et B = 0", "Toujours"],
    good: 1,
    why: "La fonction ET exige que TOUTES les entrées soient à 1. C'est elle qui sécurise : badge ET digicode.",
  },
  {
    q: "Quelle grandeur électrique mesure-t-on en volts ?",
    opts: ["L'intensité", "La résistance", "La tension", "La puissance"],
    good: 2,
    why: "La tension U se mesure en volts (V) avec un voltmètre branché en dérivation. L'intensité, elle, c'est l'ampère.",
  },
  {
    q: "Dans Scratch, le bloc « répéter 10 fois » est…",
    opts: ["Une condition", "Une boucle", "Une variable", "Un capteur"],
    good: 1,
    why: "Répéter des instructions un certain nombre de fois : c'est la définition même d'une boucle.",
  },
  {
    q: "Quel composant domotique détecte une présence humaine dans une pièce ?",
    opts: ["Un détecteur infrarouge (PIR)", "Une résistance", "Un relais", "Un transformateur"],
    good: 0,
    why: "Le capteur PIR perçoit le rayonnement infrarouge émis par le corps humain : parfait pour allumer à notre passage.",
  },
  {
    q: "La puissance électrique s'exprime en…",
    opts: ["Joules", "Watts", "Ampères", "Ohms"],
    good: 1,
    why: "La puissance P = U × I se mesure en watts (W). Le joule, lui, mesure l'énergie consommée.",
  },
  {
    q: "Laquelle de ces sources d'énergie est renouvelable ?",
    opts: ["Le charbon", "Le gaz naturel", "Le vent", "L'uranium"],
    good: 2,
    why: "Le vent (énergie éolienne) se renouvelle en permanence, contrairement aux combustibles fossiles et fissiles.",
  },
  {
    q: "Dans un système automatique, le composant qui « sent » le monde réel (température, présence…) est…",
    opts: ["L'actionneur", "Le capteur", "Le micro-contrôleur", "L'afficheur"],
    good: 1,
    why: "Le capteur ACQUIERT l'information ; le programme la traite ; l'actionneur agit sur le réel.",
  },
  {
    q: "L'acier, le cuivre et l'aluminium appartiennent à la famille des…",
    opts: ["Minéraux", "Plastiques", "Composites", "Métaux"],
    good: 3,
    why: "Tous trois sont des métaux : bons conducteurs électriques et thermiques, recyclables à l'infini.",
  },
  {
    q: "Pour rendre une structure plus rigide sans l'alourdir beaucoup, on…",
    opts: ["Ajoute des triangles", "Épaissit toutes les barres", "Supprime les appuis", "La peint"],
    good: 0,
    why: "Le triangle est la seule figure indéformable : c'est la triangulation, utilisée dans les ponts et les grues.",
  },
  {
    q: "Dans un cahier des charges fonctionnel, la fonction principale (FP1) décrit…",
    opts: ["Le prix de vente", "Le service rendu à l'utilisateur", "La couleur de l'objet", "Le nom du fabricant"],
    good: 1,
    why: "La FP exprime le service attendu, du point de vue de l'utilisateur. Les FC, elles, listent les contraintes à respecter.",
  },
  {
    q: "Dans un algorigramme, le losange représente…",
    opts: ["Le début du programme", "Une action à exécuter", "Un test avec deux issues possibles", "La fin du programme"],
    good: 2,
    why: "Le losange pose une question (oui/non) : le programme emprunte ensuite l'une des deux branches, comme dans notre barrière.",
  },
];

export default function Quiz() {
  const [num, setNum] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const q = QUESTIONS[num];
  const last = num === QUESTIONS.length - 1;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === q.good;
    if (ok) setScore((s) => s + 1);
    setHistory((h) => [...h, ok]);
  };

  const next = () => {
    if (last) {
      setDone(true);
    } else {
      setNum((n) => n + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setNum(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setHistory([]);
  };

  const pct = Math.round((score / QUESTIONS.length) * 100);

  return (
    <section id="quiz" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <SectionHead
          index="Évaluation"
          kicker="Contrôle des connaissances · 14 questions"
          title="Le quiz du technologue"
          desc="Quatorze questions couvrant tout le cycle 4 : énergie, mécanique, logique, électricité, programmation, cahier des charges, algorigramme, matériaux et structures. Réponse immédiate, explication incluse — comme en classe, mais sans la sonnerie."
        />

        <Reveal delay={150}>
          <div className="mt-12 border border-line bg-ink2/80 relative">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Fiche d'évaluation — technologie</span>
              <span className="font-mono text-[11px] text-yellowT">
                {done ? "Terminé" : `Question ${num + 1} / ${QUESTIONS.length}`}
              </span>
            </div>

            <div className="flex gap-1 px-5 pt-4" aria-hidden>
              {QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 transition-colors duration-300"
                  style={{
                    background: i < history.length ? (history[i] ? "#7bd88f" : "#e8442e") : i === num && !done ? "#ffc53d" : "#24405c",
                  }}
                />
              ))}
            </div>

            {!done ? (
              <div key={num} className="rise p-6 sm:p-8">
                <h3 className="font-semibold text-xl sm:text-2xl leading-snug text-snow">{q.q}</h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {q.opts.map((o, i) => {
                    let cls = "border-line text-snow hover:border-cyanT hover:bg-ink";
                    if (picked !== null) {
                      if (i === q.good) cls = "border-greenT bg-greenT/15 text-snow";
                      else if (i === picked) cls = "border-redT bg-redT/15 text-snow";
                      else cls = "border-line text-fog opacity-50";
                    }
                    return (
                      <button
                        key={o}
                        onClick={() => pick(i)}
                        disabled={picked !== null}
                        className={`text-left border-2 px-4 py-3.5 font-mono text-[12.5px] tracking-wide transition-all cursor-pointer disabled:cursor-default ${cls}`}
                      >
                        <span className="text-fog mr-2">{String.fromCharCode(65 + i)}.</span>
                        {o}
                      </button>
                    );
                  })}
                </div>

                {picked !== null && (
                  <div className="rise mt-6">
                    <div className={`border-l-4 px-4 py-3.5 ${picked === q.good ? "border-greenT bg-greenT/10" : "border-redT bg-redT/10"}`}>
                      <p className={`font-mono text-[11px] tracking-[0.2em] uppercase ${picked === q.good ? "text-greenT" : "text-redT"}`}>
                        {picked === q.good ? "✓ Exact !" : "✗ Pas tout à fait…"}
                      </p>
                      <p className="mt-1.5 text-[13.5px] text-fog leading-relaxed">{q.why}</p>
                    </div>
                    <button
                      onClick={next}
                      className="mt-5 font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors cursor-pointer"
                    >
                      {last ? "Voir mon score →" : "Question suivante →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="rise p-8 sm:p-12 text-center relative">
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-fog">Résultat de l'évaluation</p>
                <p className="font-display text-[clamp(4rem,12vw,7rem)] leading-none mt-4 text-snow">
                  {score}<span className="text-fog/60">/{QUESTIONS.length}</span>
                </p>
                <div className="mt-6 flex justify-center">
                  {pct >= 70 ? (
                    <Stamp className="border-greenT text-greenT text-sm">Compétences validées</Stamp>
                  ) : pct >= 40 ? (
                    <Stamp className="border-yellowT text-yellowT text-sm">Presque — on revoit 2 ou 3 trucs</Stamp>
                  ) : (
                    <Stamp className="border-redT text-redT text-sm">Retour au labo conseillé</Stamp>
                  )}
                </div>
                <p className="mt-6 max-w-md mx-auto text-fog text-[14.5px] leading-relaxed">
                  {pct >= 70
                    ? "Bravo ! Énergie, engrenages, logique et réseaux n'ont plus de secret pour toi."
                    : "Rejoue les machines du labo : manipuler, c'est la meilleure façon de retenir. Puis reviens battre ton score."}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={restart} className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors cursor-pointer">
                    ↻ Recommencer le quiz
                  </button>
                  <a href="#/animations" className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 border border-fog/50 text-snow hover:border-cyanT hover:text-cyanT transition-colors">
                    Retourner au labo
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

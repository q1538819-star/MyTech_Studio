import Opening from "../components/Opening";
import LabGlyph from "../components/LabGlyphs";
import { LABS } from "./AnimationsPage";
import { Reveal, SectionHead } from "../lib/ui";

const STATS: [string, string][] = [
  ["11", "animations interactives"],
  ["19", "chapitres de cours"],
  ["9", "projets guidés"],
  ["12", "ressources sélectionnées"],
  ["12", "questions au quiz"],
];

const PARCOURS = [
  { n: "6e", color: "#3fc9d8", t: "Je découvre les objets", d: "Matériaux, croquis, structures : on apprend à regarder autrement." },
  { n: "5e", color: "#ffc53d", t: "Je maîtrise l'énergie", d: "Chaînes d'énergie, circuits, engrenages : tout se mesure." },
  { n: "4e", color: "#7bd88f", t: "Je programme", d: "Capteurs, Scratch, portes logiques : les objets décident." },
  { n: "3e", color: "#ff7a29", t: "Je conçois en équipe", d: "Cahier des charges, prototype, objets connectés, soutenance." },
];

export default function HomePage() {
  return (
    <div>
      <Opening />

      {/* chiffres du studio */}
      <div className="bg-ink border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS.map(([n, t], i) => (
            <Reveal key={t} delay={i * 60}>
              <p className="font-display text-4xl sm:text-5xl text-snow leading-none">{n}</p>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-fog">{t}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* machines à la une */}
      <section className="bg-blueprint">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              index="À la une"
              kicker="Le labo"
              title="Les machines du studio"
              desc="Chaque animation est un petit banc d'essai : on règle, on déclenche, on observe. En voici six — les onze t'attendent au labo."
            />
            <Reveal delay={200}>
              <a href="#/animations" className="shrink-0 font-mono text-xs tracking-[0.2em] uppercase px-5 py-3 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors inline-flex items-center gap-2.5">
                Ouvrir le labo <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LABS.slice(0, 6).map((l, i) => (
              <Reveal key={l.slug} delay={(i % 3) * 90}>
                <a
                  href={`#/animations/${l.slug}`}
                  className="group tech-card block p-5 h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 font-display text-[5rem] leading-[0.8] text-snow/5 select-none" aria-hidden>
                    {l.num}
                  </div>
                  <div className="flex items-start justify-between">
                    <LabGlyph slug={l.slug} color={l.color} />
                    <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase px-2 py-1 border" style={{ color: l.color, borderColor: `${l.color}77` }}>
                      {l.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display uppercase text-xl tracking-wide text-snow group-hover:underline underline-offset-4" style={{ textDecorationColor: l.color }}>
                    {l.name}
                  </h3>
                  <p className="mt-2 font-mono text-[10.5px] tracking-[0.14em] uppercase text-fog group-hover:text-snow transition-colors">
                    Manipuler <span className="inline-block transition-transform group-hover:translate-x-1.5" aria-hidden>→</span>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          {/* nouveautés */}
          <Reveal delay={100}>
            <div className="mt-10 border border-dashed border-cyanT/50 bg-cyanT/5 px-5 py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyanT border border-cyanT/60 px-2 py-1">Nouveautés</span>
              <p className="text-[13px] text-fog">
                Six nouvelles machines au labo : <a href="#/animations/materiaux" className="text-snow underline underline-offset-2 decoration-cyanT hover:text-cyanT">matériaux</a>,{" "}
                <a href="#/animations/structures" className="text-snow underline underline-offset-2 decoration-cyanT hover:text-cyanT">pont en treillis</a>,{" "}
                <a href="#/animations/algo" className="text-snow underline underline-offset-2 decoration-cyanT hover:text-cyanT">barrière programmée</a>,{" "}
                <a href="#/animations/energies" className="text-snow underline underline-offset-2 decoration-cyanT hover:text-cyanT">solaire + éolien</a>,{" "}
                <a href="#/animations/reseaux" className="text-snow underline underline-offset-2 decoration-cyanT hover:text-cyanT">réseaux</a> et{" "}
                <a href="#/animations/mecanismes" className="text-snow underline underline-offset-2 decoration-cyanT hover:text-cyanT">mécanismes</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* parcours */}
      <section className="bg-ink2 border-y border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <SectionHead
            index="Ton parcours"
            kicker="6e → 3e"
            title="Quatre années, un fil conducteur"
            desc="Du premier croquis au prototype connecté, chaque niveau s'appuie sur le précédent. Retrouve le détail chapitre par chapitre dans la section Cours."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARCOURS.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <a href="#/cours" className="group block border border-line hover:-translate-y-1.5 transition-all duration-300 bg-ink p-5 h-full relative overflow-hidden">
                  <span className="absolute -right-3 -top-6 font-display text-[7rem] leading-none opacity-[0.08] select-none" style={{ color: p.color }} aria-hidden>
                    {p.n}
                  </span>
                  <span className="font-display text-3xl" style={{ color: p.color }}>{p.n}</span>
                  <h3 className="mt-2 font-semibold text-snow text-lg">{p.t}</h3>
                  <p className="mt-1.5 text-[12.5px] text-fog leading-relaxed">{p.d}</p>
                  <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-fog group-hover:text-cyanT transition-colors">
                    Voir les chapitres →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA quiz */}
      <section className="bg-blueprint">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyanT">Contrôle des connaissances</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display uppercase leading-[0.95] mt-3 text-[clamp(1.9rem,4.5vw,3.2rem)] tracking-wide text-snow">
                12 questions. <span className="word-outline-orange">Zéro excuse.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-fog max-w-xl leading-relaxed">
                Tout ce que tu as manipulé au labo revient dans le quiz — avec la correction expliquée à chaque réponse.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <a href="#/quiz" className="group inline-flex items-center gap-4 font-display uppercase text-2xl tracking-wide px-8 py-5 bg-orangeT text-ink hover:bg-yellowT transition-colors">
              Passer le quiz
              <span className="transition-transform group-hover:translate-x-2" aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

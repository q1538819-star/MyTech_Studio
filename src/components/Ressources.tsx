import { Reveal, SectionHead } from "../lib/ui";

const TAGCOLORS: Record<string, string> = {
  Cours: "#3567a8",
  Animations: "#e8442e",
  Institutionnel: "#2c7a44",
  Padlet: "#a06a00",
  Vidéos: "#8a4fb0",
};

const SITES = [
  { name: "Techno Flash", domain: "techno-flash.com", tag: "Cours", desc: "Cours, exercices interactifs et quiz pour réviser chaque chapitre de technologie." },
  { name: "Lumni", domain: "lumni.fr", tag: "Vidéos", desc: "Vidéos et contenus audiovisuels de l'audiovisuel public pour comprendre en images." },
  { name: "Techno Moreau", domain: "techno-moreau.fr", tag: "Cours", desc: "Séquences, fiches de cours et activités clé en main pour le collège." },
  { name: "Padlet — Techno Valdahon", domain: "padlet.com/coursdetechnovaldahon", tag: "Padlet", desc: "Le mur de ressources du cours de technologie du collège de Valdahon." },
  { name: "ENT Techno Brassens", domain: "entechnobrassens.info", tag: "Cours", desc: "L'espace dédié à la technologie du collège Georges-Brassens : cours et travaux." },
  { name: "Padlet — T. Aubreton", domain: "padlet.com/thierry_aubreton", tag: "Padlet", desc: "Le padlet de M. Aubreton : séquences, activités et documents élèves." },
  { name: "STI Collège — AC Bordeaux", domain: "ent2d.ac-bordeaux.fr", tag: "Institutionnel", desc: "Les ressources académiques Sciences et Techniques Industrielles de Bordeaux." },
  { name: "Nathan Technologie Collège", domain: "technologie-college.nathan.fr", tag: "Cours", desc: "Le site compagnon des manuels Nathan : activités, vidéos et ressources élève." },
  { name: "Techmania", domain: "techmania.fr", tag: "Cours", desc: "Activités, TP et fichiers élèves prêts à l'emploi pour la classe de technologie." },
  { name: "CEA — Les technologies", domain: "cea.fr", tag: "Institutionnel", desc: "Dossiers et explications du CEA sur les grandes technologies d'aujourd'hui." },
  { name: "CEA — Animations multimédia", domain: "cea.fr/multimedia", tag: "Animations", desc: "Animations interactives sur les énergies et les technologies : idéal avant un TP." },
  { name: "Éduscol — Programme cycle 4", domain: "eduscol.education.gouv.fr", tag: "Institutionnel", desc: "Le programme officiel de technologie et ses ressources d'accompagnement." },
];

const URLS: Record<string, string> = {
  "Techno Flash": "https://techno-flash.com/",
  Lumni: "https://www.lumni.fr/",
  "Techno Moreau": "https://techno-moreau.fr/",
  "Padlet — Techno Valdahon": "https://padlet.com/coursdetechnovaldahon/",
  "ENT Techno Brassens": "https://entechnobrassens.info/",
  "Padlet — T. Aubreton": "https://padlet.com/thierry_aubreton",
  "STI Collège — AC Bordeaux": "https://ent2d.ac-bordeaux.fr/disciplines/sti-college/",
  "Nathan Technologie Collège": "https://technologie-college.nathan.fr/",
  Techmania: "http://www.techmania.fr/",
  "CEA — Les technologies": "https://www.cea.fr/",
  "CEA — Animations multimédia": "https://www.cea.fr/multimedia/Pages/animations/technologies.aspx",
  "Éduscol — Programme cycle 4": "https://eduscol.education.gouv.fr/5745/ressources-d-accompagnement-du-programme-de-technologie-au-cycle-4",
};

export default function Ressources() {
  return (
    <section id="ressources" className="bg-seyes text-cardink relative">
      <div className="absolute top-0 bottom-0 left-10 sm:left-16 w-[2px] bg-redT/60 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <SectionHead
          dark={false}
          index="Pour aller plus loin"
          kicker="Ressources sélectionnées"
          desc="Les meilleures adresses du web pour la technologie au collège, testées en classe : cours, padlets de professeurs, animations du CEA et textes officiels. Toutes s'ouvrent dans un nouvel onglet."
          title="La bibliothèque du technologue"
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 90}>
              <a
                href={URLS[s.name]}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-card group flex flex-col h-full p-5 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-0.4deg]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 border-2" style={{ color: TAGCOLORS[s.tag], borderColor: TAGCOLORS[s.tag] }}>
                    {s.tag}
                  </span>
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-cardink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-3.5 font-bold text-lg leading-tight text-cardink group-hover:underline decoration-2 underline-offset-4" style={{ textDecorationColor: TAGCOLORS[s.tag] }}>
                  {s.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-[#7a8ba3]">{s.domain}</p>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#41546b]">{s.desc}</p>
                <span className="mt-auto pt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-[#7a8ba3] group-hover:text-cardink transition-colors">
                  Consulter →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

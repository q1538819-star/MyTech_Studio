export default function Footer() {
  return (
    <footer className="bg-ink2 border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div>
            <p className="font-display uppercase leading-[0.95] tracking-wide text-[clamp(1.9rem,4.6vw,3.4rem)] text-snow">
              La technique,
              <br />
              ça s'apprend <span className="text-orangeT">en faisant</span>.
            </p>
            <p className="mt-5 max-w-lg text-fog text-[14.5px] leading-relaxed">
              MyTech Studio rassemble ateliers animés, méthode de projet et ressources vérifiées
              pour accompagner les élèves de technologie du cycle 4 — de la première vis serrée
              au prototype connecté.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase">
              {[
                ["#/", "Accueil"],
                ["#/animations", "Le labo"],
                ["#/cours", "Cours"],
                ["#/projets", "Projets"],
                ["#/ressources", "Ressources"],
                ["#/quiz", "Quiz"],
              ].map(([h, l]) => (
                <a key={h} href={h} className="text-fog hover:text-orangeT transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* cartouche final */}
          <div className="border border-line font-mono text-[11px] uppercase tracking-wider">
            <div className="px-4 py-2.5 border-b border-line bg-ink flex items-center justify-between">
              <span className="text-fog">Cartouche</span>
              <span className="text-orangeT">MyTech Studio</span>
            </div>
            {[
              ["Titre", "Technologie au collège — cycle 4"],
              ["Discipline", "Sciences & techniques"],
              ["Niveaux", "6e · 5e · 4e · 3e"],
              ["Échelle", "1:1 — grandeur nature"],
              ["Réalisation", "React · SVG · Tailwind"],
              ["Sources", "Éduscol · CEA · Lumni · Nathan"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] border-b border-line/70 last:border-b-0">
                <div className="px-4 py-2.5 border-r border-line/70 text-fog/70">{k}</div>
                <div className="px-4 py-2.5 text-snow">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line/70 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-fog/70">
            © 2025–2026 MyTech Studio — planche finale · bon pour accord
          </p>
          <a href="#/" className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-fog hover:text-yellowT transition-colors">
            ↑ Retour à l'accueil
          </a>
        </div>
      </div>
    </footer>
  );
}

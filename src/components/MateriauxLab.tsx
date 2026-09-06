import { useMemo, useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

type Mat = {
  name: string;
  family: string;
  density: number; // g/cm3
  hard: number; // /10
  cond: number; // /10
  recyc: number; // /10
  cost: number; // /10
  usage: string;
};

const MATS: Mat[] = [
  { name: "Acier", family: "Métaux", density: 7.8, hard: 8, cond: 7, recyc: 9, cost: 5, usage: "Charpentes, vis, ressorts" },
  { name: "Aluminium", family: "Métaux", density: 2.7, hard: 4, cond: 8, recyc: 9, cost: 6, usage: "Cadres de vélo, canettes" },
  { name: "Cuivre", family: "Métaux", density: 8.9, hard: 3, cond: 10, recyc: 9, cost: 9, usage: "Fils et câbles électriques" },
  { name: "Pin", family: "Bois", density: 0.5, hard: 3, cond: 1, recyc: 8, cost: 2, usage: "Meubles, structures légères" },
  { name: "Béton", family: "Minéraux", density: 2.4, hard: 7, cond: 1, recyc: 3, cost: 1, usage: "Fondations, dalles" },
  { name: "Verre", family: "Minéraux", density: 2.5, hard: 6, cond: 1, recyc: 9, cost: 3, usage: "Vitres, lentilles" },
  { name: "PVC", family: "Plastiques", density: 1.4, hard: 4, cond: 0, recyc: 4, cost: 2, usage: "Tuyaux, gouttières" },
  { name: "Carton", family: "Papier", density: 0.2, hard: 1, cond: 0, recyc: 9, cost: 1, usage: "Emballages, maquettes" },
];

const FAMILIES = ["Tous", "Métaux", "Bois", "Minéraux", "Plastiques", "Papier"];
const FAM_COLOR: Record<string, string> = {
  "Métaux": "#3fc9d8",
  "Bois": "#ff7a29",
  "Minéraux": "#9fb6c9",
  "Plastiques": "#ffc53d",
  "Papier": "#7bd88f",
};

const CRITERIA = [
  { key: "density", label: "Densité", unit: "g/cm³", max: 10, better: "low", note: "Plus c'est léger, mieux c'est pour un objet portatif" },
  { key: "hard", label: "Dureté", unit: "/10", max: 10, better: "high", note: "Résistance aux rayures et aux chocs" },
  { key: "cond", label: "Conductivité élec.", unit: "/10", max: 10, better: "high", note: "Capacité à laisser passer le courant" },
  { key: "recyc", label: "Recyclabilité", unit: "/10", max: 10, better: "high", note: "Facilité à être recyclé en fin de vie" },
  { key: "cost", label: "Coût", unit: "/10", max: 10, better: "low", note: "Prix de la matière première" },
] as const;

type CritKey = (typeof CRITERIA)[number]["key"];

export default function MateriauxLab() {
  const [family, setFamily] = useState("Tous");
  const [sortKey, setSortKey] = useState<CritKey>("density");
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [duel, setDuel] = useState<[string, string]>(["Aluminium", "Acier"]);

  const shown = useMemo(() => {
    const list = MATS.filter((m) => family === "Tous" || m.family === family);
    return [...list].sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir);
  }, [family, sortKey, sortDir]);

  const clickSort = (k: CritKey) => {
    if (k === sortKey) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(k);
      setSortDir(1);
    }
  };

  const A = MATS.find((m) => m.name === duel[0])!;
  const B = MATS.find((m) => m.name === duel[1])!;

  const verdicts = CRITERIA.map((c) => {
    const va = A[c.key];
    const vb = B[c.key];
    let winner = 0;
    if (c.better === "low") winner = va === vb ? 0 : va < vb ? -1 : 1;
    else winner = va === vb ? 0 : va > vb ? -1 : 1;
    return { c, winner };
  });
  const scoreA = verdicts.filter((v) => v.winner === -1).length;
  const scoreB = verdicts.filter((v) => v.winner === 1).length;

  return (
    <section id="materiaux" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 06"
          kicker="Matériaux"
          title="Quel matériau choisir ?"
          desc="Acier, bois, plastique… chaque famille a ses forces. Filtre par famille, clique sur les critères pour trier, puis lance un duel pour départager deux matériaux sur 5 critères — comme dans un vrai comparateur de choix."
        />

        {/* filtres */}
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {FAMILIES.map((f) => (
              <button
                key={f}
                onClick={() => setFamily(f)}
                className={`font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-2 border-2 transition-colors cursor-pointer ${
                  family === f ? "border-orangeT bg-orangeT text-ink font-semibold" : "border-line text-fog hover:border-fog"
                }`}
              >
                {f !== "Tous" && <span className="inline-block w-2 h-2 mr-2" style={{ background: FAM_COLOR[f] }} aria-hidden />}
                {f}
              </button>
            ))}
            <span className="ml-auto font-mono text-[10px] tracking-[0.2em] uppercase text-fog">
              {shown.length} matériau{shown.length > 1 ? "x" : ""} — clique sur un critère pour trier ↕
            </span>
          </div>
        </Reveal>

        {/* tableau */}
        <Reveal delay={180}>
          <div className="mt-5 overflow-x-auto border border-line bg-ink2/70">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-line font-mono text-[10.5px] tracking-[0.18em] uppercase text-fog">
                  <th className="px-4 py-3">Matériau</th>
                  {CRITERIA.map((c) => (
                    <th key={c.key} className="px-3 py-3">
                      <button onClick={() => clickSort(c.key)} className={`cursor-pointer hover:text-snow transition-colors ${sortKey === c.key ? "text-yellowT" : ""}`}>
                        {c.label} {sortKey === c.key ? (sortDir === 1 ? "↑" : "↓") : ""}
                      </button>
                    </th>
                  ))}
                  <th className="px-4 py-3">Exemple d'usage</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((m) => (
                  <tr key={m.name} className="border-b border-line/50 last:border-b-0 hover:bg-ink3/50 transition-colors group">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="inline-block w-2.5 h-2.5 mr-2.5" style={{ background: FAM_COLOR[m.family] }} aria-hidden />
                      <span className="font-semibold text-snow">{m.name}</span>
                    </td>
                    {CRITERIA.map((c) => (
                      <td key={c.key} className="px-3 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-ink border border-line/60">
                            <div
                              className="h-full transition-all duration-700"
                              style={{ width: `${(m[c.key] / c.max) * 100}%`, background: FAM_COLOR[m.family] }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-fog w-8">{m[c.key]}</span>
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-3.5 text-[12.5px] text-fog whitespace-nowrap">{m.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* duel */}
        <div className="mt-12 grid lg:grid-cols-[300px_1fr] gap-6 items-start">
          <Reveal>
            <div className="tech-card p-5">
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyanT mb-4">⚔ Le duel des matériaux</h3>
              {[0, 1].map((i) => (
                <label key={i} className="block mb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">Matériau {i === 0 ? "A" : "B"}</span>
                  <select
                    value={duel[i]}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDuel(i === 0 ? [v, duel[1]] : [duel[0], v]);
                    }}
                    className="mt-1.5 w-full bg-ink border-2 border-line px-3 py-2.5 font-mono text-[12px] text-snow focus:border-orangeT outline-none cursor-pointer"
                  >
                    {MATS.map((m) => (
                      <option key={m.name} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </label>
              ))}
              <div className="mt-4 border-t border-line pt-4 text-center">
                <p className="font-display text-2xl tracking-wide text-snow">
                  {scoreA} <span className="text-fog/60">—</span> {scoreB}
                </p>
                <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-yellowT">
                  {scoreA === scoreB ? "Égalité parfaite !" : scoreA > scoreB ? `Avantage ${A.name}` : `Avantage ${B.name}`}
                </p>
                <p className="mt-3 text-[11.5px] text-fog leading-relaxed">
                  Le « meilleur » matériau n'existe pas : tout dépend de la fonction et du cahier des charges !
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="tech-card p-5 sm:p-6">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-5">
                <span className="font-display text-xl text-right" style={{ color: FAM_COLOR[A.family] }}>{A.name}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog border border-line px-2 py-1">VS</span>
                <span className="font-display text-xl" style={{ color: FAM_COLOR[B.family] }}>{B.name}</span>
              </div>
              <ul className="space-y-3.5">
                {verdicts.map(({ c, winner }) => (
                  <li key={c.key}>
                    <div className="flex justify-between font-mono text-[10.5px] tracking-wide uppercase mb-1.5">
                      <span className={winner === -1 ? "text-snow" : "text-fog"}>
                        {winner === -1 && "◀ "}A · {A[c.key]} {c.unit}
                      </span>
                      <span className="text-fog/80">{c.label}</span>
                      <span className={winner === 1 ? "text-snow" : "text-fog"}>
                        {B[c.key]} {c.unit} · B{winner === 1 && " ▶"}
                      </span>
                    </div>
                    <div className="flex h-2.5 gap-1">
                      <div className="flex-1 bg-ink border border-line/60 flex justify-end overflow-hidden">
                        <div className="h-full transition-all duration-700" style={{ width: `${(A[c.key] / c.max) * 100}%`, background: winner === -1 ? "#ffc53d" : "#3a5672" }} />
                      </div>
                      <div className="flex-1 bg-ink border border-line/60 overflow-hidden">
                        <div className="h-full transition-all duration-700" style={{ width: `${(B[c.key] / c.max) * 100}%`, background: winner === 1 ? "#ffc53d" : "#3a5672" }} />
                      </div>
                    </div>
                    <p className="mt-1 text-[10.5px] text-fog/70 italic">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

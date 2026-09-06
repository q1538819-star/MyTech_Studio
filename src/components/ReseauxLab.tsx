import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHead } from "../lib/ui";

const PATH = "M 96 196 L 210 196 L 320 196 L 402 148 L 468 92 L 540 72";

const NODES = [
  { x: 40, y: 168, w: 112, h: 56, t: "MON PC", ip: "192.168.1.24" },
  { x: 178, y: 168, w: 84, h: 56, t: "SWITCH", ip: "classe 3B" },
  { x: 286, y: 168, w: 92, h: 56, t: "ROUTEUR", ip: "192.168.1.1" },
  { x: 420, y: 34, w: 116, h: 56, t: "INTERNET", ip: "le nuage" },
  { x: 492, y: 34, w: 118, h: 56, t: "SERVEUR", ip: "93.184.216.34" },
];

export default function ReseauxLab() {
  const [run, setRun] = useState(0);
  const [ping, setPing] = useState<number | null>(null);
  const t = useRef<number | null>(null);

  const send = () => {
    setPing(null);
    setRun((r) => r + 1);
    if (t.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setPing(14 + Math.round(Math.random() * 52)), 1750);
  };

  useEffect(() => () => {
    if (t.current) window.clearTimeout(t.current);
  }, []);

  return (
    <section id="reseaux" className="bg-blueprint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHead
          index="Atelier 10"
          kicker="Réseaux & Internet"
          title="Voyage d'un paquet de données"
          desc="Quand tu ouvres une page web, des paquets traversent ta box, ton réseau local puis Internet, de routeur en routeur. Envoie un paquet et suis son trajet — chaque étape s'appelle un « saut »."
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <Reveal>
            <div className="border border-line bg-ink2/70">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fog">Réseau local → Internet</span>
                <button onClick={send} className="font-mono text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 bg-orangeT text-ink font-semibold hover:bg-yellowT transition-colors cursor-pointer">
                  ➤ Envoyer un paquet
                </button>
              </div>
              <div className="overflow-x-auto">
                <div className="relative w-[620px] max-w-none">
                  <svg viewBox="0 0 620 260" className="w-full block" role="img" aria-label="Schéma de réseau : paquet voyageant du PC au serveur">
                    <path d={PATH} fill="none" stroke="#24405c" strokeWidth="3" />
                    <path key={`f${run}`} d={PATH} fill="none" stroke="#3fc9d8" strokeWidth="2" className={run ? "flow-dash" : ""} opacity={run ? 0.8 : 0} />

                    {NODES.map((n, i) => (
                      <g key={n.t}>
                        <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="#0e1b2a" stroke={run && ping === null ? "#ffc53d" : "#3fc9d8"} strokeWidth="2" style={{ transition: "stroke .4s" }} />
                        <text x={n.x + n.w / 2} y={n.y + 24} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="1.5" fill="#eaf3f9">
                          {n.t}
                        </text>
                        <text x={n.x + n.w / 2} y={n.y + 42} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#9fb6c9">
                          {n.ip}
                        </text>
                        {run > 0 && ping === null && (
                          <circle cx={n.x + n.w / 2} cy={n.y + n.h / 2} r={Math.min(n.w, n.h) / 2} fill="none" stroke="#ffc53d" strokeWidth="1.5" className="ping-ring" style={{ animationDelay: `${i * 0.3}s` }} />
                        )}
                      </g>
                    ))}

                    <text x="24" y="246" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1.5" fill={ping !== null ? "#7bd88f" : run ? "#ffc53d" : "#3a5672"}>
                      {ping !== null
                        ? `✓ PAQUET ARRIVÉ — 4 sauts · ping ${ping} ms`
                        : run
                        ? "▶ paquet en transit…"
                        : "■ en attente d'envoi"}
                    </text>
                  </svg>

                  {/* paquet en mouvement (CSS offset-path) */}
                  {run > 0 && ping === null && (
                    <div
                      key={run}
                      className="packet-run absolute w-3.5 h-3.5 -mt-[7px] -ml-[7px] bg-orangeT shadow-[0_0_14px_rgba(255,122,41,0.9)]"
                      style={{ offsetPath: `path('${PATH}')`, top: 0, left: 0 }}
                      aria-hidden
                    />
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={120}>
              <div className="tech-card p-5 font-mono text-[12px]">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-cyanT mb-4">Carnet de route du paquet</h3>
                <ol className="space-y-2.5">
                  {[
                    "Le message est découpé en petits paquets étiquetés (adresse du destinataire).",
                    "Le switch le transmet au bon appareil du réseau local (classe, maison…).",
                    "Le routeur (ta box) l'envoie vers Internet via ton fournisseur d'accès.",
                    "De routeur en routeur, il trouve son chemin jusqu'au serveur.",
                    "Le serveur répond ; ta page web se reconstruit morceau par morceau.",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3 text-fog leading-snug">
                      <span className="text-orangeT shrink-0">{i + 1}.</span>
                      <span className="font-body text-[12.5px]">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="tech-card p-5 text-[13px] leading-relaxed text-fog">
                <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-yellowT mb-3">Le savais-tu ?</h3>
                <p>
                  Une <strong className="text-snow">adresse IP</strong> fonctionne comme une adresse postale : <span className="font-mono text-[11px] text-cyanT">192.168.…</span> pour la maison, une adresse publique pour Internet. Et le <strong className="text-snow">ping</strong>, c'est le temps d'un aller-retour — plus il est court, plus la connexion est réactive.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";

export interface Route {
  page: string;
  param?: string;
}

export function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [page, param] = h.split("/");
  return { page: page || "accueil", param };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function navigate(to: string) {
  window.location.hash = to;
}

export const PAGES = [
  { slug: "accueil", label: "Accueil", href: "#/" },
  { slug: "animations", label: "Animations", href: "#/animations" },
  { slug: "cours", label: "Cours", href: "#/cours" },
  { slug: "projets", label: "Projets", href: "#/projets" },
  { slug: "ressources", label: "Ressources", href: "#/ressources" },
  { slug: "quiz", label: "Quiz", href: "#/quiz" },
];

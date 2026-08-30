import { useEffect } from "react";
import { useRoute } from "./lib/router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AnimationsPage from "./pages/AnimationsPage";
import CoursPage from "./pages/CoursPage";
import ProjetsPage from "./pages/ProjetsPage";
import Ressources from "./components/Ressources";
import Quiz from "./components/Quiz";

const KNOWN = ["accueil", "animations", "cours", "projets", "ressources", "quiz"];

export default function App() {
  const { page, param } = useRoute();
  const current = KNOWN.includes(page) ? page : "accueil";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current, param]);

  return (
    <div className="font-body antialiased">
      <div className="noise-layer" aria-hidden />
      <NavBar page={current} />
      <main>
        {current === "accueil" && <HomePage />}
        {current === "animations" && <AnimationsPage param={param} />}
        {current === "cours" && <CoursPage />}
        {current === "projets" && <ProjetsPage />}
        {current === "ressources" && (
          <div className="pt-[67px]">
            <Ressources />
          </div>
        )}
        {current === "quiz" && (
          <div className="pt-[67px]">
            <Quiz />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

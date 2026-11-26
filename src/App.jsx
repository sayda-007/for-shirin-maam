import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { site, questions } from "./data/content";
import ProgressIndicator from "./components/common/ProgressIndicator";
import NavigationControls from "./components/common/NavigationControls";
import SceneTransition from "./components/common/SceneTransition";
import WelcomeScene from "./components/scenes/WelcomeScene";
import SearchQuestion from "./components/scenes/SearchQuestion";
import QualitiesQuestion from "./components/scenes/QualitiesQuestion";
import ClassroomQuestion from "./components/scenes/ClassroomQuestion";
import BeyondSyllabusQuestion from "./components/scenes/BeyondSyllabusQuestion";
import SymbolQuestion from "./components/scenes/SymbolQuestion";
import AppreciationNotesQuestion from "./components/scenes/AppreciationNotesQuestion";
import FinalQuestion from "./components/scenes/FinalQuestion";
import AwardScene from "./components/scenes/AwardScene";
import LetterScene from "./components/scenes/LetterScene";
import ClosingScene from "./components/scenes/ClosingScene";
import { SmallStar } from "./components/common/Illustrations";

const SCENE_IDS = ["welcome", ...questions.map((question) => question.id), "award", "letter", "closing"];
const QUESTION_IDS = new Set(questions.map((question) => question.id));

const SCENE_COMPONENTS = {
  welcome: WelcomeScene,
  search: SearchQuestion,
  qualities: QualitiesQuestion,
  classroom: ClassroomQuestion,
  syllabus: BeyondSyllabusQuestion,
  symbol: SymbolQuestion,
  notes: AppreciationNotesQuestion,
  heart: FinalQuestion,
  award: AwardScene,
  letter: LetterScene,
  closing: ClosingScene,
};

const NEXT_LABELS = {
  heart: "See your award",
  award: "To the letter",
  letter: "One last thing",
};

function getAnnouncement(sceneId) {
  if (sceneId === "welcome") return "Welcome. A little something for you.";
  if (sceneId === "award") return "One award we didn't want to forget.";
  if (sceneId === "letter") return "Two students. One little letter.";
  if (sceneId === "closing") return "A final thank you.";
  const question = questions.find((item) => item.id === sceneId);
  return question ? `Question ${question.number} of 07: ${question.title}` : "";
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const [navigation, setNavigation] = useState({ index: 0, direction: 1 });
  const { index, direction } = navigation;
  const sceneId = SCENE_IDS[index];
  const SceneComponent = SCENE_COMPONENTS[sceneId];

  const questionIndex = QUESTION_IDS.has(sceneId)
    ? questions.findIndex((question) => question.id === sceneId) + 1
    : 0;
  const isQuestion = questionIndex > 0;
  const showNavigation = sceneId !== "welcome" && sceneId !== "closing";

  const goTo = useCallback((target) => {
    setNavigation((previous) => {
      const next = Math.max(0, Math.min(SCENE_IDS.length - 1, target));
      if (next === previous.index) return previous;
      return { index: next, direction: next > previous.index ? 1 : -1 };
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", sceneId === "closing" ? "#252923" : "#F5F1E8");
  }, [sceneId]);

  return (
    <div className={`app ${sceneId === "closing" ? "app--dark" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="shell site-header__inner">
          <div className="site-header__brand">
            <span className="site-header__mark" aria-hidden="true">
              S
            </span>
            <span className="site-header__name">{site.eyebrow}</span>
          </div>
          <div className="site-header__status">
            {isQuestion ? (
              <ProgressIndicator current={questionIndex} total={questions.length} />
            ) : (
              <span className="site-header__note">
                {sceneId === "welcome" ? "SEVEN QUESTIONS · ONE LITTLE SURPRISE" : "BEYOND THE BLACKBOARD"}
              </span>
            )}
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <SceneTransition
            key={sceneId}
            direction={direction}
            reduced={reduced}
            className={`scene--${sceneId}`}
          >
            <SceneComponent
              reduced={reduced}
              onBegin={() => goTo(1)}
              onRestart={() => goTo(0)}
            />
            {showNavigation && (
              <NavigationControls
                onBack={() => goTo(index - 1)}
                onNext={() => goTo(index + 1)}
                backLabel="Back"
                nextLabel={NEXT_LABELS[sceneId] ?? "Continue"}
                backHint={index === 1 ? "Return to the welcome" : SCENE_IDS[index - 1]}
                nextHint={NEXT_LABELS[sceneId] ?? "Next scene"}
              />
            )}
          </SceneTransition>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <span>{site.footerNote}</span>
          <span className="site-footer__title">
            <SmallStar className="site-footer__star" />
            {site.experienceTitle}
          </span>
        </div>
      </footer>

      <p className="sr-only" role="status" aria-live="polite">
        {getAnnouncement(sceneId)}
      </p>
    </div>
  );
}

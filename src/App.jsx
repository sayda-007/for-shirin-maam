import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { letter, questions, site, ui } from "./data/content";
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
import AppreciationScene from "./components/scenes/AppreciationScene";
import LetterScene from "./components/scenes/LetterScene";
import ClosingScene from "./components/scenes/ClosingScene";
import { FlowerHeart } from "./components/common/Illustrations";

const SCENE_IDS = [
  "welcome",
  ...questions.map((question) => question.id),
  "appreciation",
  "letter",
  "closing",
];
const QUESTION_IDS = new Set(questions.map((question) => question.id));
const LETTER_SCENE_INDEX = SCENE_IDS.indexOf("letter");

const SCENE_COMPONENTS = {
  welcome: WelcomeScene,
  search: SearchQuestion,
  qualities: QualitiesQuestion,
  classroom: ClassroomQuestion,
  syllabus: BeyondSyllabusQuestion,
  symbol: SymbolQuestion,
  notes: AppreciationNotesQuestion,
  heart: FinalQuestion,
  appreciation: AppreciationScene,
  letter: LetterScene,
  closing: ClosingScene,
};

function getAnnouncement(sceneId) {
  const announcement = ui.announcements;
  if (sceneId === "welcome") return announcement.welcome;
  if (sceneId === "appreciation") return announcement.appreciation;
  if (sceneId === "letter") return announcement.letter;
  if (sceneId === "closing") return announcement.closing;
  const question = questions.find((item) => item.id === sceneId);
  return question ? announcement.question(question.number, question.question) : "";
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const [navigation, setNavigation] = useState({ index: 0, direction: 1 });
  const [letterStep, setLetterStep] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const transitionLock = useRef(false);
  const lockTimer = useRef(null);
  const { index, direction } = navigation;
  const sceneId = SCENE_IDS[index];
  const SceneComponent = SCENE_COMPONENTS[sceneId];

  const questionIndex = QUESTION_IDS.has(sceneId)
    ? questions.findIndex((question) => question.id === sceneId) + 1
    : 0;
  const isQuestion = questionIndex > 0;
  const isLetter = sceneId === "letter";
  const currentLetter = letter.letters[Math.min(letterStep, letter.letters.length - 1)];
  const showNavigation = !isQuestion && sceneId !== "welcome" && sceneId !== "closing";

  const goTo = useCallback(
    (target) => {
      if (transitionLock.current) return;
      const next = Math.max(0, Math.min(SCENE_IDS.length - 1, target));
      if (next === index) return;
      transitionLock.current = true;
      if (next === LETTER_SCENE_INDEX) {
        setLetterStep(0);
        setLetterOpen(false);
      }
      setNavigation({ index: next, direction: next > index ? 1 : -1 });
      window.clearTimeout(lockTimer.current);
      lockTimer.current = window.setTimeout(() => {
        transitionLock.current = false;
      }, reduced ? 120 : 620);
    },
    [index, reduced],
  );

  const resetJourney = useCallback(() => {
    window.clearTimeout(lockTimer.current);
    transitionLock.current = false;
    setLetterStep(0);
    setLetterOpen(false);
    goTo(0);
  }, [goTo]);

  const handleLetterOpen = useCallback(() => setLetterOpen(true), []);
  const handleLetterClose = useCallback(() => setLetterOpen(false), []);

  const handleLetterBack = useCallback(() => {
    if (letterStep > 0) {
      setLetterStep(letterStep - 1);
      setLetterOpen(false);
      return;
    }
    goTo(index - 1);
  }, [goTo, index, letterStep]);

  const handleLetterNext = useCallback(() => {
    if (letterStep < letter.letters.length - 1) {
      setLetterStep(letterStep + 1);
      setLetterOpen(false);
      return;
    }
    goTo(index + 1);
  }, [goTo, index, letterStep]);

  useEffect(() => () => window.clearTimeout(lockTimer.current), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", sceneId === "closing" ? "#515D48" : "#68775E");
  }, [sceneId]);

  return (
    <div className={`app ${sceneId === "closing" ? "app--dark" : ""}`}>
      <a className="skip-link" href="#main">
        {ui.skipLink}
      </a>

      <header className="site-header">
        <div className="shell site-header__inner">
          <button
            type="button"
            className="site-header__brand"
            onClick={resetJourney}
            aria-label={`${site.title} — return to the welcome`}
          >
            <span className="site-header__mark" aria-hidden="true">
              <FlowerHeart />
            </span>
            <span className="site-header__name">{site.eyebrow}</span>
          </button>
          <div className="site-header__status">
            {isQuestion ? (
              <ProgressIndicator current={questionIndex} total={questions.length} />
            ) : sceneId === "welcome" ? (
              <span className="site-header__note">{ui.welcomeHeader}</span>
            ) : (
              <button
                type="button"
                className="site-header__note site-header__note--home"
                onClick={resetJourney}
                aria-label={`${site.title} — return to the welcome`}
              >
                {ui.defaultHeader}
              </button>
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
              key={isLetter ? `letter-${letterStep}` : sceneId}
              reduced={reduced}
              onBegin={() => goTo(1)}
              onRestart={resetJourney}
              onBack={() => goTo(index - 1)}
              onNext={() => goTo(index + 1)}
              step={letterStep}
              open={letterOpen}
              onOpen={handleLetterOpen}
              onClose={handleLetterClose}
            />
            {showNavigation && (
              <NavigationControls
                onBack={isLetter ? handleLetterBack : () => goTo(index - 1)}
                onNext={isLetter ? handleLetterNext : () => goTo(index + 1)}
                backLabel={ui.back}
                nextLabel={isLetter ? currentLetter.continueLabel : ui.nextLabels[sceneId] ?? ui.continue}
                backHint={
                  isLetter && letterStep > 0
                    ? letter.letters[letterStep - 1].invitation
                    : index === 1
                      ? ui.backHintWelcome
                      : SCENE_IDS[index - 1]
                }
                nextHint={ui.nextHint}
              />
            )}
          </SceneTransition>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <span>{site.footerNote}</span>
          <span className="site-footer__title">{site.title}</span>
        </div>
      </footer>

      <p className="sr-only" role="status" aria-live="polite">
        {getAnnouncement(sceneId)}
      </p>
    </div>
  );
}

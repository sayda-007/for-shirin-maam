import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";
import { questions, searchUi, ui } from "../../data/content";

export default function SearchQuestion({ questionId = "search", reduced, onBack, onNext }) {
  const question = questions.find((item) => item.id === questionId) ?? questions[0];
  const fullQuestion = question.question;
  const [typedCount, setTypedCount] = useState(reduced ? fullQuestion.length : 0);
  const [phase, setPhase] = useState(reduced ? "complete" : "entrance");

  useEffect(() => {
    if (reduced || phase !== "entrance") return undefined;
    const timer = window.setTimeout(() => setPhase("typing"), 280);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  useEffect(() => {
    if (reduced || phase !== "typing") return undefined;

    if (typedCount >= fullQuestion.length) {
      const timer = window.setTimeout(() => setPhase("submitting"), 180);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setTypedCount((current) => Math.min(current + 1, fullQuestion.length));
    }, 44);

    return () => window.clearTimeout(timer);
  }, [phase, typedCount, fullQuestion.length, reduced]);

  useEffect(() => {
    if (reduced || phase !== "submitting") return undefined;
    const timer = window.setTimeout(() => setPhase("complete"), 620);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  const complete = phase === "complete";

  return (
    <div className="search-scene">
      <div className="search-scene__meta">
        <span className="search-scene__label">{searchUi.label}</span>
        <span className="search-scene__counter">
          {question.number} / {String(questions.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className={`search-scene__field ${phase === "submitting" ? "is-submitting" : ""}`}
        role="search"
        aria-label={searchUi.typingHint}
      >
        <Search className="search-scene__icon" size={22} strokeWidth={1.6} aria-hidden="true" />
        <p className="search-scene__query">
          <span>{fullQuestion.slice(0, typedCount)}</span>
          {!complete && <span className="search-scene__cursor" aria-hidden="true" />}
        </p>
        <span className="search-scene__progress" aria-hidden="true" />
      </div>

      <div className="search-scene__results" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!complete ? (
            <motion.p
              key="searching"
              className="search-scene__status"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            >
              {searchUi.searching}
            </motion.p>
          ) : (
            <motion.div
              key="answer"
              className="search-result"
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="search-result__label">{searchUi.resultLabel}</span>
              <p className="search-result__answer">{question.answer}</p>
              {question.supporting && (
                <p className="search-result__support">{question.supporting}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="search-scene__controls">
        <button type="button" className="search-control search-control--back" onClick={onBack}>
          <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
          {ui.back}
        </button>

        <AnimatePresence>
          {complete && (
            <motion.button
              type="button"
              className="search-control search-control--next"
              onClick={onNext}
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            >
              {question.id === "heart" ? "Continue to the note" : ui.nextQuestion}
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <p className="sr-only" role="status">
        {complete ? ui.announcements.answer(fullQuestion, question.answer) : ""}
      </p>
    </div>
  );
}

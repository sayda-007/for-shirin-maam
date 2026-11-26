import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { search } from "../../data/content";
import { SmallStar } from "../common/Illustrations";

export default function SearchQuestion({ reduced }) {
  const [typed, setTyped] = useState(reduced ? search.query.length : 0);
  const [showResult, setShowResult] = useState(Boolean(reduced));
  const complete = typed >= search.query.length;

  useEffect(() => {
    if (reduced) {
      const timer = window.setTimeout(() => {
        setTyped(search.query.length);
        setShowResult(true);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(index);
      if (index >= search.query.length) window.clearInterval(timer);
    }, 135);

    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    if (!complete || reduced) return undefined;
    const timer = window.setTimeout(() => setShowResult(true), 420);
    return () => window.clearTimeout(timer);
  }, [complete, reduced]);

  return (
    <div className="search-scene">
      <div className="search-scene__field" role="search" aria-label={search.placeholder}>
        <Search size={20} strokeWidth={1.5} aria-hidden="true" />
        <span className="search-scene__typed" aria-hidden="true">
          {search.query.slice(0, typed)}
          {!complete && <span className="search-scene__caret" />}
        </span>
        <span className="sr-only">{search.query}</span>
        <span className={`search-scene__loading ${complete ? "is-done" : ""}`} aria-hidden="true" />
      </div>

      <div className="search-scene__results" aria-live="polite">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.p
              key="searching"
              className="search-scene__searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              {search.searching}
            </motion.p>
          ) : (
            <motion.div
              key="result"
              className="search-result"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="search-result__label">
                <SmallStar className="search-result__star" />
                {search.resultLabel}
              </span>
              <p className="search-result__answer">{search.answer}</p>
              <p className="search-result__support">{search.supporting}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

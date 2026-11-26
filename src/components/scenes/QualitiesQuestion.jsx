import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { qualities } from "../../data/content";

export default function QualitiesQuestion({ reduced }) {
  const [active, setActive] = useState(null);

  return (
    <div className="qualities">
      <div className="qualities__grid">
        {qualities.map((quality, index) => (
          <button
            key={quality.word}
            type="button"
            className={`quality ${active === index ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
          >
            <span className="quality__index">0{index + 1}</span>
            <span className="quality__word">{quality.word}</span>
            <span className="quality__line" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="qualities__reveal" aria-live="polite">
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.p
              key="prompt"
              className="qualities__prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              Choose a word to see what we mean.
            </motion.p>
          ) : (
            <motion.blockquote
              key={active}
              className="qualities__message"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="qualities__quote-mark" aria-hidden="true">
                “
              </span>
              {qualities[active].message}
            </motion.blockquote>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

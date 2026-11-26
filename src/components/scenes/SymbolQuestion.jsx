import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { symbols } from "../../data/content";
import { SymbolIllustration } from "../common/Illustrations";

export default function SymbolQuestion({ reduced }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="symbol-scene">
      <div className="symbol-scene__row">
        {symbols.map((symbol, index) => (
          <button
            key={symbol.id}
            type="button"
            className={`symbol ${selected === index ? "is-selected" : ""} ${selected !== null && selected !== index ? "is-muted" : ""}`}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <span className="symbol__index">0{index + 1}</span>
            <SymbolIllustration id={symbol.id} className="symbol__art" />
            <span className="symbol__name">{symbol.name}</span>
            <span className="symbol__underline" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="symbol-scene__message" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.p
              key="prompt"
              className="symbol-scene__prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              Pick the one that feels right.
            </motion.p>
          ) : (
            <motion.div
              key={selected}
              className="symbol-scene__answer"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="symbol-scene__answer-label">WHY IT FITS</span>
              <p>{symbols[selected].message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { notes } from "../../data/content";

function TwineBow() {
  return (
    <svg className="notes__bow" viewBox="0 0 96 52" aria-hidden="true" focusable="false" fill="none">
      <path d="M48 31C38 12 20 8 12 16c-7 7 4 20 36 15M48 31c10-19 28-23 36-15 7 7-4 20-36 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M48 31c-9 6-14 13-11 19 3 5 9 2 11-5 2 7 8 10 11 5 3-6-2-13-11-19Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="48" cy="31" r="3.5" fill="var(--ivory)" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function AppreciationNotesQuestion({ reduced }) {
  const [active, setActive] = useState(null);
  const center = (notes.length - 1) / 2;

  return (
    <div className="notes-scene">
      <div className="notes__stage">
        <TwineBow />
        {notes.map((message, index) => {
          const offset = index - center;
          const isActive = active === index;
          const hasSelection = active !== null;

          return (
            <motion.button
              key={message}
              type="button"
              className={`paper-note ${isActive ? "is-active" : ""}`}
              onClick={() => setActive(isActive ? null : index)}
              aria-expanded={isActive}
              aria-label={`${isActive ? "Close" : "Open"} note ${index + 1}`}
              initial={false}
              animate={{
                rotate: isActive ? 0 : offset * 3.2,
                x: isActive ? 0 : offset * 15,
                y: isActive ? -8 : Math.abs(offset) * 5,
                scale: hasSelection ? (isActive ? 1 : 0.96) : 1,
                opacity: hasSelection && !isActive ? 0.55 : 1,
                zIndex: isActive ? 30 : 10 + (notes.length - 1 - index),
              }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="paper-note__index">NOTE 0{index + 1}</span>
              <span className="paper-note__rule" aria-hidden="true" />
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    className="paper-note__message"
                    initial={reduced ? undefined : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.12 }}
                  >
                    {message}
                  </motion.span>
                )}
              </AnimatePresence>
              {!isActive && <span className="paper-note__fold" aria-hidden="true" />}
            </motion.button>
          );
        })}
      </div>

      <div className="notes__footer">
        <p className="notes__prompt">
          {active === null ? "A few small thank-yous, tucked away." : "Tap another note to keep reading."}
        </p>
        <div className="notes__dots" role="group" aria-label="Choose a note">
          {notes.map((message, index) => (
            <button
              key={message}
              type="button"
              className={`notes__dot ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`Read note ${index + 1}`}
              aria-pressed={active === index}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

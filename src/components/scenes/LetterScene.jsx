import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { letter } from "../../data/content";
import { FlowerHeart } from "../common/Illustrations";

function LetterLines({ lines, shared = false }) {
  return (
    <div className={`letter-lines ${shared ? "letter-lines--shared" : ""}`}>
      {lines.map((line, index) => {
        const isGreeting = index === 0;
        const isSignature = index === lines.length - 1 || index === lines.length - 2;
        return (
          <p
            key={line}
            className={`letter-line ${isGreeting ? "letter-line--greeting" : ""} ${
              isSignature ? "letter-line--signature" : ""
            }`}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function LetterScene({ reduced, step, open, onOpen, onClose }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);
  const current = letter.letters[step];

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const openLetter = () => {
    if (open || opening) return;
    if (reduced) {
      onOpen();
      return;
    }
    setOpening(true);
    timer.current = window.setTimeout(() => {
      setOpening(false);
      onOpen();
    }, 620);
  };

  return (
    <div className="letter-scene">
      <h2 className="section-heading">{letter.heading}</h2>

      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key={`envelope-${current.id}`}
            type="button"
            className={`envelope ${opening ? "is-opening" : ""}`}
            onClick={openLetter}
            disabled={opening}
            aria-label={`${current.action}. ${letter.envelopeNote}.`}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
            transition={{ duration: reduced ? 0 : 0.45 }}
          >
            <span className="envelope__back" aria-hidden="true" />
            <motion.span
              className="envelope__sheet"
              aria-hidden="true"
              initial={false}
              animate={{ y: opening ? -62 : 0 }}
              transition={{ duration: reduced ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="envelope__flap"
              aria-hidden="true"
              initial={false}
              animate={{ rotateX: opening ? -170 : 0 }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.32, 0.72, 0.25, 1] }}
            />
            <span className="envelope__front" aria-hidden="true" />
            <span className="envelope__seal" aria-hidden="true">
              <FlowerHeart />
            </span>
            <span className="envelope__label">{current.invitation}</span>
            <span className="envelope__note">{letter.envelopeNote}</span>
            <span className="envelope__action">{current.action}</span>
          </motion.button>
        ) : (
          <motion.article
            key={`letter-${current.id}`}
            className="letters"
            aria-label={current.label}
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <section className={`letter-panel letter-panel--${current.id}`}>
              <h3>{current.label}</h3>
              <LetterLines lines={current.message} shared={current.id === "shared"} />
            </section>

            <button type="button" className="letters__fold" onClick={onClose}>
              {letter.closeAction}
            </button>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { letter } from "../../data/content";
import { SmallStar } from "../common/Illustrations";

export default function LetterScene({ reduced }) {
  const [phase, setPhase] = useState("closed");
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const openLetter = () => {
    if (phase !== "closed") return;
    if (reduced) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    timer.current = window.setTimeout(() => setPhase("open"), 780);
  };

  return (
    <div className="letter-scene">
      <AnimatePresence mode="wait" initial={false}>
        {phase !== "open" ? (
          <motion.button
            key="envelope"
            type="button"
            className={`envelope ${phase === "opening" ? "is-opening" : ""}`}
            onClick={openLetter}
            aria-label={`${letter.action}: ${letter.envelopeNote}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
          >
            <span className="envelope__back" aria-hidden="true" />
            <motion.span
              className="envelope__sheet"
              aria-hidden="true"
              initial={false}
              animate={{ y: phase === "opening" ? -78 : 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="envelope__flap"
              aria-hidden="true"
              initial={false}
              animate={{ rotateX: phase === "opening" ? -176 : 0 }}
              transition={{ duration: reduced ? 0 : 0.65, ease: [0.32, 0.72, 0.25, 1] }}
            />
            <span className="envelope__front" aria-hidden="true" />
            <span className="envelope__seal" aria-hidden="true">
              <SmallStar />
            </span>
            <span className="envelope__caption">
              <span className="envelope__label">{letter.envelopeLabel}</span>
              <span className="envelope__note">{letter.envelopeNote}</span>
            </span>
          </motion.button>
        ) : (
          <motion.article
            key="letter"
            className="letter"
            initial={reduced ? undefined : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="letter__paper">
              <div className="letter__head">
                <span>{letter.envelopeLabel}</span>
                <SmallStar className="letter__head-star" />
              </div>

              <section className="letter__block">
                <h3 className="letter__block-label">{letter.one.label}</h3>
                <p className="letter__placeholder">{letter.one.placeholder}</p>
              </section>

              <section className="letter__block">
                <h3 className="letter__block-label">{letter.two.label}</h3>
                <p className="letter__placeholder">{letter.two.placeholder}</p>
              </section>

              <p className="letter__shared">{letter.shared}</p>
            </div>

            <button type="button" className="letter__fold" onClick={() => setPhase("closed")}>
              {letter.closeAction}
            </button>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { syllabus } from "../../data/content";
import { SmallStar } from "../common/Illustrations";

export default function BeyondSyllabusQuestion({ reduced }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="syllabus-scene">
      <div className={`syllabus ${revealed ? "is-revealed" : ""}`}>
        <div className="syllabus__topline">
          <span>SYLLABUS / NOTES</span>
          <span className="syllabus__stamp">not on the syllabus</span>
        </div>
        <h3 className="syllabus__title">{syllabus.documentTitle}</h3>
        <p className="syllabus__note">{syllabus.note}</p>
        <span className="syllabus__rule" aria-hidden="true" />

        <ul className="syllabus__list">
          <AnimatePresence>
            {revealed &&
              syllabus.items.map((item, index) => (
                <motion.li
                  key={item}
                  className="syllabus__item"
                  initial={reduced ? undefined : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.12 }}
                >
                  <span className="syllabus__check" aria-hidden="true">
                    <Check size={13} strokeWidth={2} />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {revealed && (
            <motion.p
              className="syllabus__closing"
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.7 }}
            >
              <SmallStar className="syllabus__closing-star" />
              {syllabus.closing}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        className="btn btn--ghost syllabus__toggle"
        onClick={() => setRevealed((value) => !value)}
        aria-expanded={revealed}
      >
        {revealed ? syllabus.revealedAction : syllabus.action}
      </button>
    </div>
  );
}

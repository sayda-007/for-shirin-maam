import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { finalQuestion } from "../../data/content";
import { SmallStar } from "../common/Illustrations";

export default function FinalQuestion({ reduced }) {
  const [ready, setReady] = useState(Boolean(reduced));

  useEffect(() => {
    if (reduced) {
      const timer = window.setTimeout(() => setReady(true), 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setReady(true), 2200);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <div className="heart-scene">
      <span className="heart-scene__rule" aria-hidden="true" />
      <div className="heart-scene__stage" aria-live="polite">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.p
              key="thought"
              className="heart-scene__thought"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.7 }}
            >
              {finalQuestion.thought}
            </motion.p>
          ) : (
            <motion.div
              key="answer"
              className="heart-scene__answer"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.8 }}
            >
              <SmallStar className="heart-scene__star" />
              {finalQuestion.answer.map((line, index) => (
                <motion.p
                  key={line}
                  initial={reduced ? undefined : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.8,
                    delay: reduced ? 0 : index * 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

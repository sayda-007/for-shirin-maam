import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { closing } from "../../data/content";
import { FlowerHeart } from "../common/Illustrations";

const totalStages = 5;

export default function ClosingScene({ reduced, onRestart }) {
  const [stage, setStage] = useState(reduced ? totalStages : 0);

  useEffect(() => {
    if (reduced) return undefined;
    const timings = [420, 1500, 2580, 3660, 4480];
    const timers = timings.map((time, index) =>
      window.setTimeout(() => setStage(index + 1), time),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduced]);

  const show = () =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <div className="closing-scene">
      <div className="closing-scene__inner">
        <div className="closing-scene__lines" aria-live="polite">
          {closing.lines.map((line, index) => (
            <AnimatePresence key={line}>
              {stage >= index + 1 && (
                <motion.p className="closing-scene__line" {...show(index)}>
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {stage >= 4 && (
            <motion.div className="closing-scene__final" {...show(3)}>
              <p>{closing.final}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= totalStages && (
            <motion.div className="closing-scene__end" {...show(4)}>
              <FlowerHeart className="closing-scene__flower" />
              <p className="closing-scene__signature">
                {closing.signature.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <button type="button" className="closing-scene__restart" onClick={onRestart}>
                <RotateCcw size={14} strokeWidth={1.6} aria-hidden="true" />
                {closing.restart}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage < totalStages && (
            <motion.button
              type="button"
              className="closing-scene__skip"
              onClick={() => setStage(totalStages)}
              initial={reduced ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
            >
              {closing.skip}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

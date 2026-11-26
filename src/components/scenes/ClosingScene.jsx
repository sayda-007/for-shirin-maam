import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { closing } from "../../data/content";
import { SmallStar } from "../common/Illustrations";

export default function ClosingScene({ reduced, onRestart }) {
  const [stage, setStage] = useState(reduced ? 5 : 0);

  useEffect(() => {
    if (reduced) {
      const timer = window.setTimeout(() => setStage(5), 0);
      return () => window.clearTimeout(timer);
    }
    const timings = [350, 1700, 3000, 4400, 5700];
    const timers = timings.map((time, index) => window.setTimeout(() => setStage(index + 1), time));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduced]);

  const appear = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <div className="closing-scene">
      <span className="closing-scene__glow" aria-hidden="true" />
      <div className="closing-scene__inner">
        <SmallStar className="closing-scene__mark" />

        <div className="closing-scene__lines" aria-live="polite">
          {closing.lines.map((line, index) => (
            <AnimatePresence key={line}>
              {stage >= index + 1 && (
                <motion.p className="closing-scene__line" {...appear(index === 2 ? 0.15 : 0)}>
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {stage >= 4 && (
            <motion.div className="closing-scene__final" {...appear(0.2)}>
              <span className="closing-scene__divider" aria-hidden="true" />
              {closing.final.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 5 && (
            <motion.div className="closing-scene__end" {...appear(0.2)}>
              <p className="closing-scene__signature">{closing.signature}</p>
              <button type="button" className="closing-scene__restart" onClick={onRestart}>
                <RotateCcw size={14} strokeWidth={1.6} aria-hidden="true" />
                {closing.restart}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {stage < 5 && (
          <button type="button" className="closing-scene__skip" onClick={() => setStage(5)}>
            {closing.skip}
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}

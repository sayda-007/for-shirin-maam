import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { welcome } from "../../data/content";
import { BotanicalSprig, SmallStar } from "../common/Illustrations";

export default function WelcomeScene({ onBegin, reduced }) {
  const rise = reduced ? {} : { initial: { opacity: 0, y: 14 } };
  const easing = [0.22, 1, 0.36, 1];

  return (
    <div className="welcome">
      <div className="welcome__copy">
        <motion.p
          className="welcome__label"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.1 }}
        >
          <SmallStar className="welcome__label-star" />
          {welcome.label}
        </motion.p>

        <motion.h1
          className="welcome__title"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.2, ease: easing }}
        >
          <span>{welcome.headingFirst}</span>
          <em>{welcome.headingSecond}</em>
        </motion.h1>

        <motion.p
          className="welcome__support"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.36, ease: easing }}
        >
          {welcome.supporting}
        </motion.p>

        <motion.p
          className="welcome__handwritten"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.5, ease: easing }}
        >
          {welcome.handwritten}
        </motion.p>

        <motion.div
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.62 }}
        >
          <button type="button" className="btn btn--primary welcome__cta" onClick={onBegin}>
            {welcome.action}
            <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      <motion.div
        className="welcome__art"
        aria-hidden="true"
        initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: reduced ? 0 : 0.25, ease: easing }}
      >
        <span className="welcome__art-ring" />
        <span className="welcome__art-ring welcome__art-ring--inner" />
        <BotanicalSprig className="welcome__sprig" />
        <span className="welcome__art-caption">a small surprise, in seven questions</span>
      </motion.div>
    </div>
  );
}

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { welcome } from "../../data/content";
import { FlowerHeart } from "../common/Illustrations";

export default function WelcomeScene({ onBegin, reduced }) {
  const rise = reduced ? {} : { initial: { opacity: 0, y: 12 } };
  const ease = [0.22, 1, 0.36, 1];

  return (
    <div className="welcome">
      <div className="welcome__copy">
        <motion.p
          className="welcome__label"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.08 }}
        >
          {welcome.label}
        </motion.p>

        <motion.h1
          className="welcome__title"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.14, ease }}
        >
          {welcome.heading}
        </motion.h1>

        <motion.p
          className="welcome__support"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.24, ease }}
        >
          {welcome.supporting}
        </motion.p>

        <motion.p
          className="welcome__signature"
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.32, ease }}
        >
          {welcome.signature}
        </motion.p>

        <motion.div
          {...rise}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.4 }}
        >
          <button type="button" className="welcome__cta" onClick={onBegin}>
            {welcome.action}
            <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      <motion.figure
        className="welcome__portrait"
        initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: reduced ? 0 : 0.16, ease }}
      >
        <span className="welcome__portrait-backdrop" aria-hidden="true" />
        <FlowerHeart className="welcome__flower" />
        <img
          className="welcome__image"
          src={welcome.portraitSrc}
          alt={welcome.portraitAlt}
          width="433"
          height="576"
        />
      </motion.figure>
    </div>
  );
}

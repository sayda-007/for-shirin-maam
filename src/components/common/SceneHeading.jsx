import { motion } from "motion/react";

export default function SceneHeading({ eyebrow, title, number, reduced = false }) {
  const rise = reduced ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  return (
    <header className="scene-heading">
      <motion.p
        className="scene-heading__eyebrow"
        {...rise}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.08 }}
      >
        {number && <span className="scene-heading__number">{number}</span>}
        {eyebrow}
      </motion.p>
      <motion.h2
        className="scene-heading__title"
        {...rise}
        transition={{ duration: 0.6, delay: reduced ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
    </header>
  );
}

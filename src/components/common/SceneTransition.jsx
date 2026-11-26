import { motion } from "motion/react";

const variants = {
  enter: (direction) => ({ opacity: 0, y: direction > 0 ? 24 : -24, pointerEvents: "none" }),
  center: { opacity: 1, y: 0, pointerEvents: "auto" },
  exit: (direction) => ({ opacity: 0, y: direction > 0 ? -16 : 16, pointerEvents: "none" }),
};

const still = {
  enter: { opacity: 1, y: 0, pointerEvents: "none" },
  center: { opacity: 1, y: 0, pointerEvents: "auto" },
  exit: { opacity: 1, y: 0, pointerEvents: "none" },
};

export default function SceneTransition({ direction = 1, reduced = false, className = "", children }) {
  return (
    <motion.section
      className={`scene ${className}`.trim()}
      custom={direction}
      variants={reduced ? still : variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

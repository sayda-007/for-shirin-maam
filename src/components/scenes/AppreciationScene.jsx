import { motion } from "motion/react";
import { appreciation } from "../../data/content";
import { FlowerHeart } from "../common/Illustrations";

export default function AppreciationScene({ reduced }) {
  return (
    <div className="appreciation-scene">
      <motion.div
        className="appreciation-scene__mark"
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5 }}
      >
        <FlowerHeart />
      </motion.div>

      <motion.h2
        className="appreciation-scene__heading"
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.08 }}
      >
        {appreciation.heading}
      </motion.h2>

      <motion.p
        className="appreciation-scene__support"
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.16 }}
      >
        {appreciation.supporting}
      </motion.p>
    </div>
  );
}

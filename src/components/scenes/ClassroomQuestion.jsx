import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { classroom } from "../../data/content";
import { BotanicalSprig } from "../common/Illustrations";

export default function ClassroomQuestion({ reduced }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="notebook-scene">
      <div className="notebook">
        <div className="notebook__spread" aria-hidden={!open}>
          <div className="notebook__page notebook__page--left">
            <span className="notebook__page-label">A page worth keeping</span>
            <BotanicalSprig className="notebook__doodle" />
            <span className="notebook__page-number">01</span>
          </div>
          <div className="notebook__page notebook__page--right">
            <AnimatePresence>
              {open &&
                classroom.message.map((line, index) => (
                  <motion.p
                    key={line}
                    className="notebook__handwriting"
                    initial={reduced ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.45 + index * 0.45 }}
                  >
                    {line}
                  </motion.p>
                ))}
            </AnimatePresence>
            {open && <span className="notebook__caption">{classroom.caption}</span>}
          </div>
          <span className="notebook__spine" aria-hidden="true" />
        </div>

        <motion.button
          type="button"
          className="notebook__cover"
          onClick={() => setOpen(true)}
          aria-label={classroom.action}
          aria-expanded={open}
          style={{ pointerEvents: open ? "none" : "auto" }}
          initial={false}
          animate={{
            rotateY: open ? -168 : 0,
            opacity: open ? 0 : 1,
          }}
          transition={{ duration: reduced ? 0 : 0.85, ease: [0.32, 0.72, 0.25, 1] }}
        >
          <span className="notebook__cover-inner">
            <span className="notebook__cover-top">NOTES &amp; THOUGHTS</span>
            <span className="notebook__cover-title">{classroom.coverLabel}</span>
            <span className="notebook__cover-sub">{classroom.coverSub}</span>
            <span className="notebook__cover-hint">
              {classroom.action} <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </span>
          </span>
        </motion.button>
      </div>

      <button type="button" className="notebook__toggle" onClick={() => setOpen((value) => !value)}>
        {open ? classroom.openAction : classroom.action}
      </button>
    </div>
  );
}

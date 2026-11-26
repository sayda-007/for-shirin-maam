import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { award } from "../../data/content";
import { AwardEmblem, CornerFlourish } from "../common/Illustrations";

export default function AwardScene({ reduced }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="award-scene">
      <motion.div
        className={`certificate ${accepted ? "is-accepted" : ""}`}
        initial={reduced ? undefined : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="certificate__border" aria-hidden="true" />
        <CornerFlourish className="certificate__corner certificate__corner--tl" />
        <CornerFlourish className="certificate__corner certificate__corner--tr" />
        <CornerFlourish className="certificate__corner certificate__corner--bl" />
        <CornerFlourish className="certificate__corner certificate__corner--br" />

        {accepted && (
          <div className="certificate__sparkles" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => (
              <span key={index} className="certificate__spark" />
            ))}
          </div>
        )}

        <div className="certificate__content">
          <AwardEmblem className="certificate__emblem" />
          <p className="certificate__title">{award.title}</p>
          <span className="certificate__divider" aria-hidden="true">
            <i />
          </span>
          <p className="certificate__presented">{award.presentedLabel}</p>
          <h3 className="certificate__recipient">{award.recipient}</h3>
          <p className="certificate__recognition">{award.recognition}</p>
          <span className="certificate__divider certificate__divider--short" aria-hidden="true">
            <i />
          </span>
          <p className="certificate__signature">{award.signature}</p>
        </div>
      </motion.div>

      <div className="award-scene__action">
        <button
          type="button"
          className={`btn ${accepted ? "btn--quiet" : "btn--primary"}`}
          onClick={() => setAccepted(true)}
          disabled={accepted}
        >
          {accepted ? (
            <>
              <Check size={16} strokeWidth={1.8} aria-hidden="true" />
              Award accepted
            </>
          ) : (
            award.action
          )}
        </button>
        <AnimatePresence>
          {accepted && (
            <motion.p
              className="award-scene__accepted"
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.25 }}
            >
              {award.accepted}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

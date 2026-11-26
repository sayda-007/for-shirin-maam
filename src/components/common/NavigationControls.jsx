import { ArrowLeft, ArrowRight } from "lucide-react";
import { ui } from "../../data/content";

export default function NavigationControls({
  onBack,
  onNext,
  backLabel = ui.back,
  nextLabel = ui.continue,
  backHint = ui.backHintWelcome,
  nextHint = ui.nextHint,
  showNext = true,
}) {
  return (
    <nav className="nav-controls" aria-label="Experience navigation">
      <button
        type="button"
        className="nav-controls__button nav-controls__button--back"
        onClick={onBack}
        aria-label={`${backLabel}: ${backHint}`}
      >
        <ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" />
        <span>{backLabel}</span>
      </button>
      <span className="nav-controls__hint" aria-hidden="true">
        {ui.navHint}
      </span>
      {showNext ? (
        <button
          type="button"
          className="nav-controls__button nav-controls__button--next"
          onClick={onNext}
          aria-label={`${nextLabel}: ${nextHint}`}
        >
          <span>{nextLabel}</span>
          <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}

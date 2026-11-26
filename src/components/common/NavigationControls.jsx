import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NavigationControls({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Continue",
  backHint = "Previous step",
  nextHint = "Next step",
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
        One step at a time
      </span>
      <button
        type="button"
        className="nav-controls__button nav-controls__button--next"
        onClick={onNext}
        aria-label={`${nextLabel}: ${nextHint}`}
      >
        <span>{nextLabel}</span>
        <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </nav>
  );
}

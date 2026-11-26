export default function ProgressIndicator({ current, total }) {
  const format = (value) => String(value).padStart(2, "0");

  return (
    <div className="progress" role="group" aria-label={`Question ${current} of ${total}`}>
      <span className="progress__label">
        Question <strong>{format(current)}</strong> <span aria-hidden="true">/</span> {format(total)}
      </span>
      <span className="progress__bars" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`progress__bar ${index + 1 === current ? "is-current" : ""} ${index + 1 < current ? "is-done" : ""}`}
          />
        ))}
      </span>
    </div>
  );
}

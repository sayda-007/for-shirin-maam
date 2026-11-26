export function FlowerHeart({ className = "" }) {
  return (
    <svg
      className={`flower-heart ${className}`.trim()}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <g className="flower-heart__petals" fill="currentColor">
        <ellipse cx="60" cy="29" rx="15" ry="22" transform="rotate(-2 60 29)" />
        <ellipse cx="85" cy="46" rx="15" ry="22" transform="rotate(70 85 46)" />
        <ellipse cx="76" cy="76" rx="15" ry="22" transform="rotate(142 76 76)" />
        <ellipse cx="44" cy="76" rx="15" ry="22" transform="rotate(214 44 76)" />
        <ellipse cx="35" cy="46" rx="15" ry="22" transform="rotate(286 35 46)" />
      </g>
      <path
        className="flower-heart__heart"
        d="M60 72c-3.4-4.6-11-7.2-11-14 0-4.4 3.2-7.4 7.2-7.4 2.2 0 3.8 1 4.8 2.4 1-1.4 2.6-2.4 4.8-2.4 4 0 7.2 3 7.2 7.4 0 6.8-7.6 9.4-11 14Z"
      />
    </svg>
  );
}

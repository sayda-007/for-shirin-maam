export function SmallStar({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.5 13.9 10.1 21.5 12 13.9 13.9 12 21.5 10.1 13.9 2.5 12 10.1 10.1 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BotanicalSprig({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 260 340" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46 326c28-58 37-107 47-157 10-50 47-94 105-126" strokeWidth="1.6" />
        <path d="M78 247c-25-6-40-23-44-48 25 2 42 17 44 48Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
        <path d="M88 197c23-11 34-29 36-55-24 7-37 24-36 55Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
        <path d="M99 145c-23-5-37-19-42-41 23 2 39 15 42 41Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
        <path d="M116 105c21-12 31-28 32-51-22 7-33 22-32 51Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
        <path d="M144 73c-17-9-27-22-29-40 18 3 29 15 29 40Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
        <path d="M64 286c-18 2-31-4-40-18 18-4 32 2 40 18Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
        <path d="M183 55c11-17 26-25 45-25-6 20-21 31-45 25Z" strokeWidth="1.3" fill="currentColor" fillOpacity=".08" />
      </g>
      <path d="M222 22l1.8 5.2L229 29l-5.2 1.8L222 36l-1.8-5.2L215 29l5.2-1.8L222 22Z" fill="currentColor" opacity=".65" />
    </svg>
  );
}

export function CompassIllustration({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 96 96" aria-hidden="true" focusable="false" fill="none">
      <circle cx="48" cy="48" r="33" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="48" cy="48" r="27" stroke="currentColor" strokeWidth=".7" opacity=".45" />
      <path d="M48 10v7M48 79v7M10 48h7M79 48h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M48 17 55 48 48 44 41 48 48 17Z" fill="var(--terracotta)" />
      <path d="M48 79 41 48 48 52 55 48 48 79Z" fill="currentColor" opacity=".3" />
      <circle cx="48" cy="48" r="3" fill="var(--ivory)" stroke="currentColor" strokeWidth="1.4" />
      <path d="M29 29l4 4M67 29l-4 4M29 67l4-4M67 67l-4-4" stroke="currentColor" strokeWidth=".8" opacity=".5" />
    </svg>
  );
}

export function LightIllustration({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 96 96" aria-hidden="true" focusable="false" fill="none">
      <g stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" opacity=".85">
        <path d="M48 5v7M48 76v7M9 45h7M80 45h7M20 17l5 5M71 17l-5 5M20 73l5-5M71 73l-5-5" />
      </g>
      <path d="M39 30a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 30h20l4 8H34l4-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M34 38h28l5 35H29l5-35Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M27 73h42M31 79h34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M48 48c5 6 6 11 3 15-2 3-6 3-8 0-3-4-2-9 5-15Z" fill="var(--terracotta)" opacity=".8" />
    </svg>
  );
}

export function BookIllustration({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 96 96" aria-hidden="true" focusable="false" fill="none">
      <path
        d="M11 28c12-5 25-5 37 2 12-7 25-7 37-2v42c-12-5-25-5-37 2-12-7-25-7-37-2V28Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M48 30v42" stroke="currentColor" strokeWidth="1.4" />
      <path d="M19 39c8-2 16-2 23 1M19 47c8-2 16-2 23 1M19 55c8-2 16-2 20 1M54 40c7-3 15-3 23-1M54 48c7-3 15-3 23-1M54 56c5-2 11-3 16-2" stroke="currentColor" strokeWidth=".9" opacity=".5" strokeLinecap="round" />
      <path d="M67 13l1.5 4.5L73 19l-4.5 1.5L67 25l-1.5-4.5L61 19l4.5-1.5L67 13Z" fill="var(--gold)" />
    </svg>
  );
}

export function SymbolIllustration({ id, className = "" }) {
  if (id === "compass") return <CompassIllustration className={className} />;
  if (id === "light") return <LightIllustration className={className} />;
  return <BookIllustration className={className} />;
}

export function AwardEmblem({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 88 88" aria-hidden="true" focusable="false" fill="none">
      <circle cx="44" cy="44" r="32" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="44" cy="44" r="26" stroke="currentColor" strokeWidth=".7" opacity=".5" />
      <path d="M44 20l2.7 7.3 7.3 2.7-7.3 2.7L44 40l-2.7-7.3L34 30l7.3-2.7L44 20Z" fill="var(--gold)" />
      <path d="M22 56c5 8 13 13 22 14 9-1 17-6 22-14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M27 51c-3 4-3 8 0 11 3-3 4-7 3-11M61 51c3 4 3 8 0 11-3-3-4-7-3-11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M36 62h16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function CornerFlourish({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="none">
      <path d="M4 44V17C4 9.8 9.8 4 17 4h27" stroke="currentColor" strokeWidth="1" />
      <path d="M11 40V19c0-4.4 3.6-8 8-8h21" stroke="currentColor" strokeWidth=".7" opacity=".6" />
      <path d="M17 30c7-1 12-6 13-13" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
      <circle cx="17" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
}

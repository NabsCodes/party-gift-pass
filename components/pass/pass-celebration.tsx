function MatchBall() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden="true"
      focusable="false"
    >
      <title>Decorative football</title>
      <circle
        cx="14"
        cy="14"
        r="13"
        fill="#fffdf8"
        stroke="#171716"
        strokeWidth="1.5"
      />
      <path
        d="M14 4.5 18.2 9.8 16.8 16.5 11.2 16.5 9.8 9.8 14 4.5Z"
        fill="#df1f26"
      />
      <path
        d="M14 23.5 10.5 18.5 12.2 13.5 15.8 13.5 17.5 18.5 14 23.5Z"
        fill="#126044"
        opacity="0.85"
      />
    </svg>
  );
}

export function PassCelebration() {
  return (
    <div
      className="pass-kickoff border-red relative mt-6 h-14 overflow-hidden border-b"
      aria-hidden="true"
    >
      <div className="pass-pitch-lines pointer-events-none absolute inset-0" />
      <div className="pass-center-spot border-green/25 pointer-events-none absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
      <span className="pass-ball absolute bottom-2 left-0">
        <MatchBall />
      </span>
    </div>
  );
}

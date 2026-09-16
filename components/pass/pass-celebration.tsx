const streamers = [
  [8, "#df1f26", 0, -7],
  [15, "#f4c431", 90, -2],
  [23, "#126044", 25, -9],
  [32, "#df1f26", 120, -4],
  [42, "#f4c431", 55, -8],
  [53, "#126044", 145, -3],
  [63, "#df1f26", 80, -10],
  [73, "#f4c431", 170, -5],
  [82, "#126044", 35, -8],
  [91, "#df1f26", 110, -3],
] as const;

export function PassCelebration() {
  return (
    <div
      className="pass-kickoff border-red relative mt-6 h-16 overflow-hidden border-b-2"
      aria-hidden="true"
    >
      {streamers.map(([left, color, delay, rotate]) => (
        <span
          key={`${left}-${color}`}
          className="pass-streamer absolute top-0 h-3 w-1.5 rounded-full"
          style={{
            left: `${left}%`,
            backgroundColor: color,
            animationDelay: `${delay}ms`,
            rotate: `${rotate}deg`,
          }}
        />
      ))}
      <span className="pass-ball absolute bottom-1 left-0 text-2xl">⚽</span>
    </div>
  );
}

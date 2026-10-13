const blocks = [
  { name: "Grass", className: "pass-block pass-block-grass" },
  { name: "Dirt", className: "pass-block pass-block-dirt" },
  { name: "Stone", className: "pass-block pass-block-stone" },
] as const;

export function PassCelebration() {
  return (
    <div
      className="pass-blocks border-red relative mt-6 overflow-hidden border-b-2"
      aria-hidden="true"
    >
      {blocks.map((block) => (
        <span key={block.name} className={block.className} />
      ))}
    </div>
  );
}

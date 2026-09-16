import Link from "next/link";
export function Brand() {
  return (
    <Link
      className="brand"
      href="/staff"
      aria-label="Aadil’s Matchday staff home"
    >
      <span className="brand-mark">10</span>
      <span className="brand-copy">
        <strong>Aadil’s Matchday</strong>
        <small>The Gift Club · 26.09.26</small>
      </span>
    </Link>
  );
}

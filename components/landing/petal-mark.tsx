/**
 * The botanical mark of the reference layout: five rounded petals turning
 * around a common centre, drawn as a single outlined path so it reads at
 * 20px in the header and at 600px behind the hero portrait.
 *
 * `PetalMark` is the logo; `PetalBloom` is the oversized decorative version
 * that sits behind Karen in the hero, and is hidden from assistive tech.
 */

const PETALS = [0, 72, 144, 216, 288]

/** One petal, drawn pointing up from the origin, then rotated into place. */
const PETAL_PATH =
  "M0,0 C-16,-14 -26,-34 -18,-50 C-12,-62 12,-62 18,-50 C26,-34 16,-14 0,0 Z"

export function PetalMark({
  className = "",
  color = "currentColor",
  strokeWidth = 3,
}: {
  className?: string
  color?: string
  strokeWidth?: number
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-70 -70 140 140"
      className={className}
    >
      <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
        {PETALS.map((angle) => (
          <path key={angle} d={PETAL_PATH} transform={`rotate(${angle})`} />
        ))}
      </g>
    </svg>
  )
}

/**
 * The same mark blown up behind the hero portrait. Petals are drawn at two
 * scales so the bloom has depth without ever competing with the headline, and
 * the whole group breathes on one slow drift.
 *
 * The viewBox is sized to hold the larger ring, so the bloom stays inside its
 * own box — on a stacked layout it would otherwise paint over the cards above
 * the portrait.
 */
export function PetalBloom({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-140 -140 280 280"
      className={className}
    >
      <g className="blob-drift-a" fill="none" strokeLinejoin="round">
        <g stroke="#EADFCF" strokeWidth="2.4" transform="scale(2.05)">
          {PETALS.map((angle) => (
            <path key={angle} d={PETAL_PATH} transform={`rotate(${angle + 36})`} />
          ))}
        </g>
        <g stroke="#D8C6A8" strokeWidth="1.8" transform="scale(1.45)">
          {PETALS.map((angle) => (
            <path key={angle} d={PETAL_PATH} transform={`rotate(${angle})`} />
          ))}
        </g>
      </g>
    </svg>
  )
}

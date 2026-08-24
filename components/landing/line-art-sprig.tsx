import type { CSSProperties } from "react"

const LEAVES = [
  { x: 60, y: 118, rotate: -52, scale: 0.85 },
  { x: 60, y: 96, rotate: 48, scale: 0.95 },
  { x: 60, y: 72, rotate: -44, scale: 1 },
  { x: 60, y: 48, rotate: 40, scale: 0.9 },
  { x: 60, y: 22, rotate: -18, scale: 0.8 },
]

/**
 * Hand-drawn botanical line art (the branch/leaf motif that recurs across
 * the moodboard) with a slow stroke "growth" animation on mount.
 */
export function LineArtSprig({ className = "", color = "#8A2E3B" }: { className?: string; color?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 160"
      className={`sprig-sway ${className}`}
    >
      <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <path
          className="sprig-path"
          style={{ "--sprig-length": 150 } as CSSProperties}
          d="M60,150 C57,128 63,110 59,88 C56,66 62,44 60,10"
        />
        {LEAVES.map((leaf, i) => (
          <path
            key={i}
            className="sprig-path"
            style={{
              "--sprig-length": 60,
              animationDelay: `${0.5 + i * 0.18}s`,
            } as CSSProperties}
            transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.scale})`}
            d="M0,0 Q7,-12 0,-26 Q-7,-12 0,0 Z M0,-3 L0,-22"
          />
        ))}
      </g>
    </svg>
  )
}

type OrganicBlobsProps = {
  variant?: "hero" | "soft"
  className?: string
}

/**
 * Decorative blob backdrop echoing the illustrated moodboard: soft arches,
 * overlapping circles, deep-blue and terracotta accents, drifting slowly.
 * Purely decorative — hidden from assistive tech, never carries content.
 */
export function OrganicBlobs({ variant = "soft", className = "" }: OrganicBlobsProps) {
  const opacity = variant === "hero" ? 1 : 0.5

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
      style={{ opacity }}
    >
      <g className="blob-drift-a">
        <ellipse cx="120" cy="120" rx="260" ry="220" fill="#EADFCF" opacity="0.55" />
      </g>
      <g className="blob-drift-b">
        <circle cx="860" cy="150" r="190" fill="#A9B7C4" opacity="0.4" />
      </g>
      <g className="blob-drift-c">
        <path
          d="M -50 560 C 120 460, 220 640, 380 560 C 520 490, 560 620, 720 560 C 860 510, 900 600, 1050 560 L 1050 760 L -50 760 Z"
          fill="#3F536B"
          opacity="0.35"
        />
      </g>
      <g className="blob-drift-b">
        <circle cx="850" cy="580" r="150" fill="#8A2E3B" opacity="0.28" />
      </g>
    </svg>
  )
}

import { assetPath } from "@/lib/asset-path"
import { cn } from "@/lib/utils"

type MotifArtworkProps = {
  alt: string
  className?: string
  presentation?: boolean
  src: string
  still?: boolean
}

const layeredArtwork = [
  {
    backgroundSrc: "/images/anxiety-background.svg",
    foregroundSrc: "/images/anxiety-foreground.gif",
    sourceSuffix: "/anxiety-layered.svg",
    stillSrc: "/images/anxiety-still.svg",
  },
  {
    backgroundSrc: "/images/burnout-background.svg",
    foregroundSrc: "/images/burnout-foreground.gif",
    sourceSuffix: "/burnout-animated.svg",
    stillSrc: "/images/burnout-still.svg",
  },
  {
    backgroundSrc: "/images/relationship-background.svg",
    foregroundSrc: "/images/relationship-foreground.gif",
    sourceSuffix: "/couple-animated.svg",
    stillSrc: "/images/relationship-still.svg",
  },
] as const

export function MotifArtwork({
  alt,
  className,
  presentation = false,
  src,
  still = false,
}: MotifArtworkProps) {
  const layers = layeredArtwork.find(({ sourceSuffix }) => src.endsWith(sourceSuffix))
  const stillSrc = still && layers ? layers.stillSrc : src

  return (
    <div
      aria-hidden={presentation || undefined}
      aria-label={presentation ? undefined : alt}
      className={cn("relative overflow-hidden", className)}
      role={presentation ? "presentation" : "img"}
    >
      {layers && !still ? (
        <>
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet={assetPath(layers.stillSrc)}
            />
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src={assetPath(layers.backgroundSrc)}
            />
          </picture>
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            src={assetPath(layers.foregroundSrc)}
          />
        </>
      ) : (
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src={assetPath(stillSrc)}
        />
      )}
    </div>
  )
}

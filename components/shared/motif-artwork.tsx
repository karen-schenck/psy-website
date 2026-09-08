import { assetPath } from "@/lib/asset-path"
import { cn } from "@/lib/utils"

type MotifArtworkProps = {
  alt: string
  className?: string
  presentation?: boolean
  src: string
}

export function MotifArtwork({ alt, className, presentation = false, src }: MotifArtworkProps) {
  const isAnxietyArtwork = src.endsWith("/anxiety-layered.svg")

  return (
    <div
      aria-hidden={presentation || undefined}
      aria-label={presentation ? undefined : alt}
      className={cn("relative overflow-hidden", className)}
      role={presentation ? "presentation" : "img"}
    >
      {isAnxietyArtwork ? (
        <>
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet={assetPath("/images/anxiety-still.svg")}
            />
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src={assetPath("/images/anxiety-background.svg")}
            />
          </picture>
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            src={assetPath("/images/anxiety-foreground.gif")}
          />
        </>
      ) : (
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src={assetPath(src)}
        />
      )}
    </div>
  )
}

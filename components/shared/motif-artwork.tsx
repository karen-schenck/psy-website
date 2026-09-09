"use client"

import { assetPath } from "@/lib/asset-path"
import { cn } from "@/lib/utils"
import { AnimatedArtwork } from "./animated-artwork"

type MotifArtworkProps = {
  alt: string
  className?: string
  presentation?: boolean
  src: string
  still?: boolean
}

const layeredArtwork = [
  {
    videoName: "anxiety",
    sourceSuffix: "/anxiety-layered.svg",
    stillSrc: "/images/anxiety-still.svg",
  },
  {
    videoName: "burnout",
    sourceSuffix: "/burnout-animated.svg",
    stillSrc: "/images/burnout-still.svg",
  },
  {
    videoName: "relationship",
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

  if (layers && !still) {
    return (
      <AnimatedArtwork
        key={layers.videoName}
        alt={alt}
        className={className}
        presentation={presentation}
        name={layers.videoName}
        stillSrc={layers.stillSrc}
      />
    )
  }

  return (
    <div
      aria-hidden={presentation || undefined}
      aria-label={presentation ? undefined : alt}
      className={cn("relative overflow-hidden", className)}
      role={presentation ? "presentation" : "img"}
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        src={assetPath(stillSrc)}
      />
    </div>
  )
}

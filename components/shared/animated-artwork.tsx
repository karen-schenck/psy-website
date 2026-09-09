"use client"

import { useEffect, useRef, useState } from "react"
import { assetPath } from "@/lib/asset-path"
import { cn } from "@/lib/utils"

type Props = {
  alt: string
  className?: string
  presentation: boolean
  name: string
  stillSrc: string
}

export function AnimatedArtwork({ alt, className, presentation, name, stillSrc }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const element = video.current!
    const wrapper = container.current!
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let nearby = false
    let visible = false
    let disposed = false
    let attempt = 0

    const sync = () => {
      const currentAttempt = ++attempt
      if (motion.matches) {
        element.pause()
        element.removeAttribute("src")
        element.load()
        setRevealed(false)
        return
      }
      if (nearby && !document.hidden && !element.hasAttribute("src")) {
        const pixels = wrapper.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 3)
        element.preload = "auto"
        element.src = assetPath(`/images/${name}-${pixels <= 960 ? 960 : 1920}.mp4`)
      }
      if (!visible || document.hidden) {
        element.pause()
        return
      }
      if (element.hasAttribute("src") && !element.error) {
        element.play().catch(() => {
          if (!disposed && currentAttempt === attempt) setRevealed(false)
        })
      }
    }
    const loadObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting
      sync()
    }, { rootMargin: "300px" })
    const playObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    loadObserver.observe(wrapper)
    playObserver.observe(wrapper)
    motion.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    return () => {
      disposed = true
      attempt++
      loadObserver.disconnect()
      playObserver.disconnect()
      motion.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
      element.pause()
      element.removeAttribute("src")
      element.load()
    }
  }, [name])

  return (
    <div ref={container} className={cn("relative overflow-hidden", className)}>
      <div role={presentation ? "presentation" : "img"} aria-label={presentation ? undefined : alt}
        aria-hidden={presentation || undefined} className="absolute inset-0">
        <img alt="" aria-hidden="true" src={assetPath(stillSrc)}
          className="absolute inset-0 h-full w-full object-cover" />
        {/* The visibility effect starts playback; native autoplay could start during preloading. */}
        <video ref={video} muted loop playsInline preload="none" disablePictureInPicture
          aria-hidden="true" tabIndex={-1}
          className={cn("pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden", revealed && !failed ? "opacity-100" : "opacity-0")}
          onPlaying={() => setRevealed(true)}
          onError={() => { setFailed(true); setRevealed(false) }} />
      </div>
    </div>
  )
}

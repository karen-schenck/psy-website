"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { PetalMark } from "@/components/landing/petal-mark"
import { cn } from "@/lib/utils"

type Diagram = {
  kind: string
  center: string
  centerText: string
  nodes: string[][]
  note: string
}

const fourPositions = [[50, 16], [80, 50], [50, 84], [20, 50]]
const sixPositions = [[23, 16], [77, 16], [77, 50], [77, 84], [23, 84], [23, 50]]
const fourPaths = [
  "M605 130 Q710 155 720 238",
  "M720 438 Q695 525 605 554",
  "M295 554 Q190 525 180 438",
  "M180 238 Q200 150 295 130",
]
const sixPaths = [
  "M375 108 Q450 75 525 108", "M693 198 L693 243", "M693 430 L693 474",
  "M525 567 Q450 600 375 567", "M207 474 L207 430", "M207 243 L207 198",
]

function ArrowFlow({ path }: { path: string }) {
  return (
    <>
      <path className="therapy-arrow-flow" d={path} pathLength="100" strokeWidth="3" />
      <g className="therapy-arrow-head" style={{ offsetPath: `path("${path}")` }}>
        <path d="M-7 -5 L0 0 L-7 5" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </>
  )
}

/** HTML text stays readable and selectable; SVG provides the paper, shapes and connections. */
export function TherapyDiagram({ diagram, id }: { diagram: Diagram; id: string }) {
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const arrows = Array.from(diagramRef.current?.querySelectorAll<HTMLLIElement>(".therapy-diagram-node") ?? [])
    if (!arrows.length) return
    const visible = new Set<Element>()
    // On phones, keep each visible shape and its outgoing arrow on the same timeline.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      const active = arrows.filter((arrow) => visible.has(arrow))
      for (const arrow of arrows) {
        const index = active.indexOf(arrow)
        arrow.style.setProperty("--mobile-flow-delay", `${Math.max(index, 0) * 1.2}s`)
        arrow.style.setProperty("--mobile-flow-duration", `${(active.length + 1) * 1.2}s`)
        arrow.toggleAttribute("data-in-view", index !== -1)
      }
    }, { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" })
    arrows.forEach((arrow) => observer.observe(arrow))
    return () => observer.disconnect()
  }, [id])

  const six = diagram.nodes.length === 6
  const positions = six ? sixPositions : fourPositions
  const cycle = diagram.kind === "cycle"
  const markerId = `${id}-arrow`

  return (
    <figure aria-labelledby={`${id}-diagram-title`} className="flex flex-col gap-6">
      <div
        ref={diagramRef}
        className={cn("therapy-diagram", six && "therapy-diagram-six")}
        style={{ "--flow-duration": `${(diagram.nodes.length + 1) * 1.2}s` } as CSSProperties}
      >
        <svg aria-hidden="true" className="therapy-diagram-paper" viewBox="0 0 900 675" preserveAspectRatio="none">
          <defs>
            <filter id={`${id}-grain`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="8" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M1 1 L8 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </marker>
          </defs>
          <path d="M0 550 Q180 475 390 585 T900 530 V675 H0Z" fill="var(--therapy-clay)" opacity=".2" />
          <rect width="900" height="675" filter={`url(#${id}-grain)`} opacity=".045" />
          <g className="therapy-diagram-connections" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {cycle ? (six ? sixPaths : fourPaths).map((d, index) => (
              <g key={d} style={{ "--flow-delay": `${index * 1.2}s` } as CSSProperties}>
                <path className="therapy-arrow-track" d={d} markerEnd={`url(#${markerId})`} />
                <ArrowFlow path={d} />
              </g>
            )) : (
              <>
                <path d="M450 200 Q425 240 450 265 M580 337 Q555 315 545 337 M450 475 Q475 430 450 410 M320 337 Q345 360 355 337" />
                <ellipse cx="450" cy="337" rx="265" ry="205" strokeDasharray="3 10" opacity=".4" />
              </>
            )}
          </g>
        </svg>
        <div className="therapy-diagram-center">
          <div className="therapy-petal mx-auto mb-3 size-12">
            <PetalMark className="size-12 text-accent/70" strokeWidth={2} />
          </div>
          <p className="font-display text-lg leading-snug text-primary">{diagram.center}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{diagram.centerText}</p>
        </div>
        <ol className="therapy-diagram-nodes" role="list">
          {diagram.nodes.map(([title, description], index) => (
            <li key={title} className="therapy-diagram-node" style={{ "--node-flow-delay": `${index * 1.2}s`, "--node-x": `${positions[index][0]}%`, "--node-y": `${positions[index][1]}%` } as CSSProperties}>
              <svg className="therapy-node-shape" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
                <path d={index % 2 === 0 ? "M30 18 C75 -2 205 0 255 14 C288 22 309 80 290 128 C276 176 205 174 130 177 C57 181 4 155 8 103 C0 57 7 33 30 18Z" : "M46 9 C110 2 230 -5 267 33 C298 65 307 133 264 159 C230 185 103 178 48 164 C-3 151 4 98 12 59 C16 35 24 15 46 9Z"} />
              </svg>
              <div className="relative">
                {cycle && <span aria-hidden="true" className="mb-2 block font-display text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>}
                <h3 className="font-display text-lg leading-snug text-primary">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground">{description}</p>
              </div>
              {cycle && index < diagram.nodes.length - 1 && (
                <svg aria-hidden="true" className="therapy-mobile-arrow" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path className="therapy-arrow-track" d="M20 5 Q14 18 20 32 M13 27 L20 32 L24 24" />
                  <ArrowFlow path="M20 5 Q14 18 20 32" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mx-auto max-w-[75ch] text-center text-sm leading-relaxed text-foreground/85">{diagram.note}</figcaption>
    </figure>
  )
}

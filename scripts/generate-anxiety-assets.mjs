import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const sourcePath = join(root, "public/images/anxiety-still.svg")
const animationSourcePath = join(root, "public/images/anxiety-layered.svg")
const outputDir = join(root, "public/images")
const source = readFileSync(sourcePath, "utf8")
const animationSource = readFileSync(animationSourcePath, "utf8")
const animationLines = animationSource.split("\n")

const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="1448" height="1086" viewBox="0 0 1448 1086">'
const animationStyles = [
  animationLines.slice(19, 57).join("\n"),
  `@media (prefers-reduced-motion: reduce){
    .sb0,.fb0{visibility:visible;animation:none}
    .sb1,.sb2,.fb1,.fb2{visibility:hidden;animation:none}
    .churn,.swell,.flick,.jolt,.breathe,.sway{animation:none}
  }
  ]]></style>`,
]
  .join("\n")
  .replace(".jolt {animation:jolt 6.8s ease-in-out infinite}", ".jolt {animation:none}")
const foregroundMarker = '<g inkscape:groupmode="layer" inkscape:label="07 Gold Thought Scribble" id="layer-gold">'
const foregroundStart = source.indexOf(foregroundMarker)
const foregroundEnd = source.lastIndexOf("</svg>")

if (foregroundStart === -1 || foregroundEnd === -1) {
  throw new Error("Could not find the animated foreground layers in anxiety-still.svg")
}

const foreground = source.slice(foregroundStart, foregroundEnd).trim()

const foregroundSvg = [
  svgOpen,
  animationStyles,
  `<style>
    #layer-gold path,
    #layer-lineart path {
      shape-rendering: geometricPrecision;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  </style>`,
  foreground,
  "</svg>",
].join("\n")

writeFileSync(join(outputDir, "anxiety-foreground.svg"), foregroundSvg)

const chromeCandidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/home/corneille/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome",
  "/home/corneille/.cache/puppeteer/chrome/linux-148.0.7778.97/chrome-linux64/chrome",
  "/home/corneille/.cache/ms-playwright/chromium-1148/chrome-linux/chrome",
].filter(Boolean)
const chrome = chromeCandidates.find(existsSync)

if (!chrome) {
  throw new Error("No Chromium executable found. Set PUPPETEER_EXECUTABLE_PATH.")
}

const workingDir = mkdtempSync(join(tmpdir(), "anxiety-gif-"))
const renderPath = join(workingDir, "foreground.svg")
const gifLoopStyles = `<style>
  .sb0,.sb1,.sb2,.fb0,.fb1,.fb2{animation-duration:.3s}
  .churn{animation-duration:3s}
  .swell{animation-duration:1.5s}
  .flick{animation-duration:3s}
  .breathe,.sway{animation-duration:3s}
</style>`
const highResolutionSvg = foregroundSvg
  .replace("</svg>", `${gifLoopStyles}</svg>`)
  .replace('width="1448" height="1086"', 'width="2896" height="2172"')

try {
  const renderFrame = (frameTime, screenshotPath) => {
    const frozenSvg = highResolutionSvg.replace(
      "</svg>",
      `<style>*{animation-delay:-${frameTime}s!important;animation-play-state:paused!important}</style></svg>`,
    )
    writeFileSync(renderPath, frozenSvg)

    execFileSync(chrome, [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--run-all-compositor-stages-before-draw",
      "--default-background-color=00000000",
      "--force-device-scale-factor=1",
      "--window-size=2896,2172",
      "--virtual-time-budget=1",
      `--screenshot=${screenshotPath}`,
      `file://${renderPath}`,
    ], { stdio: "ignore", timeout: 30_000 })
  }

  const frameCount = 60
  for (let frame = 0; frame < frameCount; frame += 1) {
    renderFrame(
      frame / 10,
      join(workingDir, `frame-${String(frame).padStart(3, "0")}.png`),
    )
  }

  const loopEndPath = join(workingDir, "loop-end.png")
  renderFrame(6, loopEndPath)
  execFileSync("magick", [
    "compare", "-metric", "AE",
    join(workingDir, "frame-000.png"), loopEndPath, "null:",
  ], { stdio: "ignore" })

  execFileSync("ffmpeg", [
    "-y",
    "-framerate", "10",
    "-i", join(workingDir, "frame-%03d.png"),
    "-filter_complex",
    "[0:v]split[frames][palette_source];[palette_source]palettegen=reserve_transparent=1:stats_mode=diff[palette];[frames][palette]paletteuse=dither=sierra2_4a:alpha_threshold=128",
    "-loop", "0",
    join(outputDir, "anxiety-foreground.gif"),
  ], { stdio: "ignore" })
} finally {
  rmSync(workingDir, { recursive: true, force: true })
}

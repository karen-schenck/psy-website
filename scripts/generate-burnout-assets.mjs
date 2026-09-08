import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const outputDir = join(root, "public/images")
const sourcePath = join(outputDir, "burnout-animated.svg")
const source = readFileSync(sourcePath, "utf8")

const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">'
const defsStart = source.indexOf("<defs>")
const defsEnd = source.indexOf("</defs>")
const stylesStart = source.indexOf("<style><![CDATA[")
const stylesEnd = source.indexOf("]]></style>")
const sceneStart = source.indexOf('<rect width="1200" height="900"')
const characterMarker = '<g transform="translate(660,880)"><g class="slump">'
const characterStart = source.indexOf(characterMarker)
const svgEnd = source.lastIndexOf("</svg>")

if ([defsStart, defsEnd, stylesStart, stylesEnd, sceneStart, characterStart, svgEnd].some((index) => index === -1)) {
  throw new Error("Could not find the expected Burnout SVG sections")
}

const defs = source.slice(defsStart, defsEnd + "</defs>".length)
const animationStyles = source.slice(stylesStart, stylesEnd + "]]></style>".length)
const staticStyles = `<style>
  .f0{visibility:visible}
  .f1,.f2{visibility:hidden}
</style>`
const background = source
  .slice(sceneStart, characterStart)
  .replace(/<animate\b[\s\S]*?\/>/g, "")
  .trim()
const character = source.slice(characterStart, svgEnd).trim()

const backgroundSvg = [svgOpen, defs, background, "</svg>"].join("\n")
const stillSvg = [svgOpen, defs, staticStyles, background, character, "</svg>"].join("\n")
const foregroundSvg = [
  svgOpen,
  defs,
  animationStyles,
  `<style>
    .f0,.f1,.f2 {
      shape-rendering: geometricPrecision;
    }
  </style>`,
  character,
  "</svg>",
].join("\n")

writeFileSync(join(outputDir, "burnout-background.svg"), backgroundSvg)
writeFileSync(join(outputDir, "burnout-still.svg"), stillSvg)
writeFileSync(join(outputDir, "burnout-foreground.svg"), foregroundSvg)

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

const framesPerSecond = 10
const loopDuration = 7.4
const frameCount = loopDuration * framesPerSecond
const workingDir = mkdtempSync(join(tmpdir(), "burnout-gif-"))
const renderPath = join(workingDir, "foreground.svg")
const gifLoopStyles = `<style>
  .f0,.f1,.f2{animation-duration:${loopDuration / 12}s}
  .breathe,.slump{animation-duration:${loopDuration}s}
</style>`
const highResolutionSvg = foregroundSvg
  .replace("</svg>", `${gifLoopStyles}</svg>`)
  .replace('width="1200" height="900"', 'width="2400" height="1800"')

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
      "--window-size=2400,1800",
      "--virtual-time-budget=1",
      `--screenshot=${screenshotPath}`,
      `file://${renderPath}`,
    ], { stdio: "ignore", timeout: 30_000 })
  }

  for (let frame = 0; frame < frameCount; frame += 1) {
    renderFrame(
      frame / framesPerSecond,
      join(workingDir, `frame-${String(frame).padStart(3, "0")}.png`),
    )
  }

  const loopEndPath = join(workingDir, "loop-end.png")
  renderFrame(loopDuration, loopEndPath)
  execFileSync("magick", [
    "compare", "-metric", "AE",
    join(workingDir, "frame-000.png"), loopEndPath, "null:",
  ], { stdio: "ignore" })

  execFileSync("ffmpeg", [
    "-y",
    "-framerate", String(framesPerSecond),
    "-i", join(workingDir, "frame-%03d.png"),
    "-filter_complex",
    "[0:v]split[frames][palette_source];[palette_source]palettegen=reserve_transparent=1:stats_mode=diff[palette];[frames][palette]paletteuse=dither=sierra2_4a:alpha_threshold=128",
    "-loop", "0",
    join(outputDir, "burnout-foreground.gif"),
  ], { stdio: "ignore" })
} finally {
  rmSync(workingDir, { recursive: true, force: true })
}

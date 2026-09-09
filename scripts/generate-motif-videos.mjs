// Requires Node 22+, Chromium and ffmpeg. Render SVG masters, never the GIFs.
import { execFile, execFileSync } from "node:child_process"
import { promisify } from "node:util"
import { copyFileSync, existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const output = resolve(import.meta.dirname, "../public/images")
const chrome = [process.env.PUPPETEER_EXECUTABLE_PATH,
  "/home/corneille/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome",
  "/usr/bin/chromium", "/usr/bin/google-chrome"].find(path => path && existsSync(path))
if (!chrome) throw new Error("Set PUPPETEER_EXECUTABLE_PATH to a Chromium executable")
const scenes = [
  { name: "anxiety", duration: 12, styles: ".sb0,.sb1,.sb2{animation-duration:.3s}.fb0,.fb1,.fb2{animation-duration:.6s}.churn{animation-duration:3s}.swell{animation-duration:1.5s}.flick{animation-duration:3s}.breathe,.sway{animation-duration:6s}" },
  { name: "burnout", duration: 7.4, styles: ".f0,.f1,.f2{animation-duration:0.6166666666666667s}.breathe,.slump{animation-duration:7.4s}" },
  { name: "relationship", duration: 8, styles: ".l0,.l1,.l2,.r0,.r1,.r2{animation-duration:.5s}.breatheL,.breatheR,.leanL,.leanR{animation-duration:8s}.apartL,.apartR{animation-duration:4s}" },
]
if (process.argv[2] && !scenes.some(s => s.name === process.argv[2])) throw new Error("Unknown scene")
const temp = mkdtempSync(join(tmpdir(), "motif-videos-"))
const run = promisify(execFile)
const dataUrl = svg => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
const render = async (images, path) => {
  const renderPath = `${path}.html`
  writeFileSync(renderPath, `<style>html,body{margin:0;width:100%;height:100%;overflow:hidden}img{position:absolute;inset:0;width:100%;height:100%}</style>${images.map(src => `<img src="${src}">`).join("")}`)
  await run(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
    "--hide-scrollbars", "--run-all-compositor-stages-before-draw", "--force-device-scale-factor=1",
    "--window-size=1920,1440", "--virtual-time-budget=100", `--screenshot=${path}`, `file://${renderPath}`],
  { timeout: 60_000, maxBuffer: 1024 * 1024 })
  if (!existsSync(path)) throw new Error(`Chromium did not produce ${path}`)
}
try {
  for (const scene of scenes.filter(s => !process.argv[2] || s.name === process.argv[2])) {
    console.log(`${scene.name}: rendering static background`)
    const background = readFileSync(join(output, `${scene.name}-background.svg`), "utf8")
    const foreground = readFileSync(join(output, `${scene.name}-foreground.svg`), "utf8")
    // Rasterize the expensive static SVG filters once per scene.
    const backgroundPath = join(temp, `${scene.name}-background.png`)
    await render([dataUrl(background)], backgroundPath)
    const backgroundUrl = `data:image/png;base64,${readFileSync(backgroundPath).toString("base64")}`
    const frameCount = Math.round(scene.duration * 10)
    let nextFrame = 0
    let completed = 0
    const renderFrames = async () => {
      while (nextFrame <= frameCount) {
        const frame = nextFrame++
        const time = frame / 10
        const freeze = `<style>${scene.styles}*{animation-delay:-${time}s!important;animation-play-state:paused!important}${scene.name === "relationship" ? `.r0,.r1,.r2{animation-delay:-${time + 0.17}s!important}` : ""}</style>`
        const svg = foreground.replace("</svg>", `${freeze}</svg>`)
        await render([backgroundUrl, dataUrl(svg)], join(temp, `${scene.name}-${String(frame).padStart(3, "0")}.png`))
        completed++
        if (completed % 20 === 0) console.log(`${scene.name}: ${completed}/${frameCount + 1} frames`)
      }
    }
    const workers = await Promise.allSettled(Array.from({ length: 4 }, renderFrames))
    const failure = workers.find(worker => worker.status === "rejected")
    if (failure) throw failure.reason
    // A loop endpoint must match its first frame exactly before encoding.
    const difference = execFileSync("ffmpeg", ["-v", "error", "-i", join(temp, `${scene.name}-000.png`),
      "-i", join(temp, `${scene.name}-${String(frameCount).padStart(3, "0")}.png`),
      "-filter_complex", "[0:v][1:v]blend=all_mode=difference", "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"],
    { maxBuffer: 1920 * 1440 * 3 + 1024 })
    if (difference.some(value => value !== 0)) throw new Error(`${scene.name}: loop endpoints differ`)
    for (const width of [960, 1920]) {
      const encodedPath = join(temp, `${scene.name}-${width}.mp4`)
      execFileSync("ffmpeg", ["-y", "-v", "error", "-framerate", "10", "-i", join(temp, `${scene.name}-%03d.png`),
        "-frames:v", String(frameCount), "-vf", `scale=${width}:-2:flags=lanczos,setsar=1`,
        "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", "-an", encodedPath], { stdio: "inherit" })
      // /tmp may be on a different filesystem from the repository.
      copyFileSync(encodedPath, join(output, `${scene.name}-${width}.mp4`))
    }
    console.log(`${scene.name}: both MP4 sizes complete`)
  }
} finally {
  rmSync(temp, { recursive: true, force: true })
}

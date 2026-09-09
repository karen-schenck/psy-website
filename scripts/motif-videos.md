# Emotion artwork videos

`pnpm assets:videos` renders the original foreground SVGs over their static SVG
backgrounds and writes 960×720 and 1920×1440 H.264 MP4s into `public/images`.
Requires Node 22+, ffmpeg with libx264, and Chromium. Set
`PUPPETEER_EXECUTABLE_PATH` if Chromium is not at one of the detected paths.
To regenerate one scene: `pnpm assets:videos anxiety` (or `burnout`, `relationship`).

The generator preserves the existing 10 fps timing and 12, 7.4, and 8 second
loops. It checks that the rendered loop endpoint exactly matches the first
frame. It uses the SVG masters rather than palette-limited GIF frames. Encoding
uses CRF 16, yuv420p for broad H.264 compatibility, no audio, and MP4 faststart.
Compression is visually high quality, not mathematically lossless.

`AnimatedArtwork` initially shows the full static SVG. It selects one video
resolution based on the rendered width and device pixel ratio when the artwork
approaches the viewport. Playback starts through `play()` only while visible;
`loop`, `muted`, and `playsInline` keep it silent, inline, and repeating.
The video becomes visible on `playing`. A rejected autoplay attempt or media
error leaves the complete still. There are no visible playback controls.
Hidden tabs and offscreen artwork pause playback.
Reduced motion removes the video source entirely, including when the preference
changes during the session. Overview cards continue using static SVGs.

Validation before deployment:

- Run `pnpm exec tsc --noEmit --incremental false` and `pnpm build` after generation.
- Confirm all six MP4s are included in `out/images` and served as `video/mp4`.
- Check FR/EN detail pages on a real iPhone: loop boundary, sharp lines, texture,
  colors, scrolling, portrait/landscape, and continuous looping without controls.
- Check Low Power Mode or blocked autoplay: the complete still must remain.
- Check reduced motion, failed media requests, offscreen pause/resume, and tab
  backgrounding. Browser emulation does not replace real iOS validation.

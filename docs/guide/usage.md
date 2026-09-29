# Usage

## Prompt Examples

```text
/hyperframes-motion-reel Neon Tokyo night drive, 20 seconds, BPM 128
/hyperframes-motion-reel Product launch teaser for an AI camera, vertical 9:16
/hyperframes-motion-reel ./assets/character.png ./assets/voice.wav character intro reel
```

Anything you specify — design, duration, resolution, aspect ratio, assets — overrides the defaults. When asset paths are given, the skill inspects the actual images, audio or code before designing.

## Default Parameters

| Parameter | Default | Notes |
| --- | --- | --- |
| Duration | 15 s | Snaps to the beat grid; follows voice length when voice is supplied |
| FPS | 60 | `npx hyperframes render --fps 60` (the CLI default is 30) |
| BPM | 120 | 1 beat = 0.5 s = 30 frames |
| Size | 1920 × 1080 | 1080 × 1920 vertical, 1080 × 1080 square |
| Output | MP4 / H.264 | `draft` and `delivery` quality |

## Workflow

1. Concept in one sentence
2. Design system written to `DESIGN.md`
3. Timeline in seconds, beats and frames (`b(8) = 4.0s = f240`)
4. Motion design naming HyperFrames blueprints and rules per scene
5. Sound design
6. Implementation: `init` → `DESIGN.md` → `generate-audio.mjs` → HTML / JS
7. Validation: `npx hyperframes lint`, then `npx hyperframes check` to 0 findings
8. `npx hyperframes snapshot --at <peak>` for every scene, reviewed as images
9. Render with `npx hyperframes render --fps 60`
10. Verify with `ffprobe` and extract frames with `ffmpeg`

## Render Commands

```bash
npx hyperframes render --fps 60 --quality draft    --output out/draft.mp4
npx hyperframes render --fps 60 --quality delivery --output out/reel.mp4
```

## When Not to Use It

Porting an existing Remotion project is a different job: use `/hyperframes` and its `remotion-to-hyperframes` route instead.

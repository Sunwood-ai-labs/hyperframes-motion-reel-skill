# Getting Started

## Requirements

- [Claude Code](https://claude.com/claude-code)
- Node.js (current LTS) and `npx`
- Google Chrome, used by the HyperFrames renderer
- `ffmpeg` / `ffprobe` on `PATH` for final verification

## Install the Skill

Clone the repository into your Claude Code skills directory. The folder name becomes the slash command.

```bash
git clone https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill ~/.claude/skills/hyperframes-motion-reel
```

On Windows (PowerShell):

```powershell
git clone https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill "$env:USERPROFILE\.claude\skills\hyperframes-motion-reel"
```

## Companion Skills

During a build the skill reads the HyperFrames domain skills instead of relying on memory. Install them next to this one:

| When | Skill |
| --- | --- |
| Before writing HTML | `/hyperframes-core` |
| Before writing motion | `/hyperframes-animation` |
| Camera, 3D, masks, SVG morphs | `/hyperframes-keyframes` |
| Font selection | `/hyperframes-creative` |
| Named looks (glitch, grain, CRT, and so on) | `/hyperframes-registry` |
| lint / check / snapshot / render | `/hyperframes-cli` |
| Mixing voice and generated score | `/hyperframes-audio` |

## First Run

```text
/hyperframes-motion-reel Neon Tokyo night drive
```

The skill writes `DESIGN.md`, a beat timeline, the generated `score.wav`, the composition, and finally `out/reel.mp4`.

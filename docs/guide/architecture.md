# Architecture

## Two Animation Layers

Instead of hand-placed keyframes, the video state is a function of time.

**Choreography layer** — one paused GSAP timeline for type, UI and camera events:

```js
const tl = gsap.timeline({ paused: true });
tl.fromTo("#title", { yPercent: 110 }, { yPercent: 0, duration: b(0.5), ease: "expo.out" }, b(4));
window.__timelines["main"] = tl;
```

**Generative layer** — a single `ease: "none"` proxy tween calls a pure `render(t)` for particles, grids and graphs:

```js
const clock = { t: 0 };
tl.to(clock, { t: CFG.DURATION_SEC, duration: CFG.DURATION_SEC, ease: "none",
  onUpdate: () => render(clock.t) }, 0);
```

`render(t)` keeps no state from previous frames, so any frame can be seeked directly.

## Beat Grid

```js
const b = n => n * SEC_PER_BEAT; // 0.5 s at 120 BPM
```

Scene boundaries, impacts and cuts are always `b(n)`; raw seconds are not allowed. The audio generator reads the same beat table, so picture and sound stay frame-aligned.

## Rendering Methods

| Material | Method |
| --- | --- |
| Typography / UI | CSS transforms, `clipPath`, `letterSpacing` via GSAP |
| Lines, graphs, diagrams | SVG paths with `strokeDasharray` / `strokeDashoffset` |
| 3D spaces | CSS 3D: `perspective`, `rotationX/Y`, `preserve-3d` |
| Particles | One Canvas 2D element drawn from `render(t)` |
| Motion blur | Registry `motion-blur` component or render-time `motionBlur`, only on fast 1–3 beat moves |

## Generated Sound

`scripts/generate-audio.mjs` writes `assets/audio/score.wav` using Node.js built-ins only: kick (falling sine), hi-hat (high-passed noise), impact (sub sine + noise + short decay), rise, sub bass and UI beeps.

## Determinism

- No `Date.now()`, `performance.now()`, network fetches or input state
- Seeded PRNG (`mulberry32`) instead of `Math.random()`
- Particle seeds generated once; `render(t)` never draws new random numbers
- Properties set on the `from` side of `fromTo` are repeated on the `to` side so parallel workers do not drop elements

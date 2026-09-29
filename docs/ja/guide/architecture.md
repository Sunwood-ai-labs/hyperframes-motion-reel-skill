# アーキテクチャ

## 2 層のアニメーション

手動キーフレームを大量に打つのではなく、映像の状態を時刻の関数として決めます。

**振り付け層** — タイポ・UI・カメラなどのイベントを paused な GSAP タイムライン 1 本で：

```js
const tl = gsap.timeline({ paused: true });
tl.fromTo("#title", { yPercent: 110 }, { yPercent: 0, duration: b(0.5), ease: "expo.out" }, b(4));
window.__timelines["main"] = tl;
```

**生成層** — `ease: "none"` のプロキシ tween 1 本から、パーティクル・グリッド・グラフを描く純関数 `render(t)` を呼びます：

```js
const clock = { t: 0 };
tl.to(clock, { t: CFG.DURATION_SEC, duration: CFG.DURATION_SEC, ease: "none",
  onUpdate: () => render(clock.t) }, 0);
```

`render(t)` は前フレームの状態を持たないため、どのフレームにも直接シークできます。

## 拍グリッド

```js
const b = n => n * SEC_PER_BEAT; // 120 BPM なら 0.5 秒
```

シーン境界・インパクト・カットは必ず `b(n)` で書き、秒の直書きはしません。音声生成スクリプトも同じ拍テーブルを読むため、映像と音がフレーム単位で揃います。

## 描画方式

| 素材 | 方式 |
| --- | --- |
| タイポグラフィ / UI | GSAP で CSS transform、`clipPath`、`letterSpacing` |
| ライン・グラフ・図 | SVG パスの `strokeDasharray` / `strokeDashoffset` |
| 3D 空間 | CSS 3D：`perspective`、`rotationX/Y`、`preserve-3d` |
| パーティクル | `render(t)` から描く Canvas 2D 1 枚 |
| モーションブラー | registry の `motion-blur` か render 時の `motionBlur`。速い 1〜3 拍の動きだけ |

## 生成サウンド

`scripts/generate-audio.mjs` が Node.js 標準機能だけで `assets/audio/score.wav` を書き出します。Kick（下降するサイン波）、Hi-hat（高域ノイズ）、Impact（低域サイン + ノイズ + 短い減衰）、Rise、Sub bass、UI beep を生成します。

## 決定性

- `Date.now()`、`performance.now()`、ネットワーク取得、入力状態に依存しない
- `Math.random()` ではなく seeded PRNG（`mulberry32`）
- パーティクルの初期値は 1 回だけ生成し、`render(t)` では新たに乱数を引かない
- `fromTo` の from 側に書いたプロパティは to 側にも書き、並列ワーカーで要素が消えないようにする

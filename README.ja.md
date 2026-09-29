<div align="center">
  <img src="./docs/public/header.svg" alt="HyperFrames Motion Reel" width="100%">
  <h1>HyperFrames Motion Reel Skill</h1>
  <p><strong>ショーリール級のモーショングラフィックスを、コードで。</strong><br>
  1 行のテーマから、拍同期したレンダリング可能な HyperFrames 動画を作る Claude Code スキル。</p>
  <p>
    <img src="https://img.shields.io/badge/Claude%20Code-Skill-D97757?logo=anthropic&logoColor=white" alt="Claude Code Skill">
    <img src="https://img.shields.io/badge/HyperFrames-Apache--2.0-D7FF00?labelColor=050505" alt="HyperFrames Apache-2.0">
    <img src="https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white" alt="GSAP 3">
    <img src="https://img.shields.io/badge/120%20BPM-60%20FPS-050505" alt="120 BPM / 60 FPS">
    <a href="https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill/actions/workflows/ci.yml"><img src="https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-F4F4F0?labelColor=050505" alt="MIT License"></a>
  </p>
  <p>
    <a href="./README.md"><img src="https://img.shields.io/badge/Language-English-lightgrey.svg" alt="English"></a>
    <a href="./README.ja.md"><img src="https://img.shields.io/badge/Language-Japanese-blue.svg" alt="Japanese"></a>
  </p>
</div>

`hyperframes-motion-reel` は、Claude Code をトップクラスのモーションデザイナー兼クリエイティブコーダーとして動かすスキルです。短いテーマ（と任意の画像・音声素材）から世界観・コピー・デザインシステム・拍単位のタイムライン・生成サウンドを補完し、[HyperFrames](https://www.npmjs.com/package/hyperframes) で実装・検証・スナップショット確認・MP4 レンダリングまで行います。

`remotion-motion-reel` の HyperFrames 版です。同じクリエイティブ水準を保ちつつ Apache-2.0 / 無料ツールだけで構成しているため、企業規模を問わず **Remotion の Company License は不要** です。

## ✨ 特長

- **ショーリール基準の演出** — 大胆なタイポ、高速トランジション、奥行き、パララックス、パーティクル、カメラワーク。fadeIn の連続は禁止
- **拍にロックしたタイミング** — カット・インパクトはすべて 120 BPM / 60 FPS グリッド上の `b(n)` で記述（1 拍 = 0.5 秒 = 30 フレーム）
- **2 層のアニメーション設計** — 振り付けは paused な GSAP タイムライン 1 本、生成的な Canvas / SVG は純関数 `render(t)`（シーク安全）
- **コードで生成するサウンド** — Kick / Hi-hat / Impact / Rise / Sub bass を Node.js 標準機能だけで WAV 化。映像と同じ拍テーブルから駆動
- **変形トランジション** — クロスフェードではなく、文字 → ライン → グラフ → 3D グリッド → トンネル → ロゴと形状を引き継ぐ
- **決定的レンダリング** — seeded PRNG を使い、`Date.now()` / `Math.random()` に依存しない。並列ワーカーでも安定
- **一貫した検証ループ** — `lint` → `check`（0 findings）→ `snapshot` 目視 → `render` → `ffprobe` / `ffmpeg` でフレーム確認

## 🚀 クイックスタート

### 1. スキルをインストール

```bash
git clone https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill ~/.claude/skills/hyperframes-motion-reel
```

Windows（PowerShell）の場合：

```powershell
git clone https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill "$env:USERPROFILE\.claude\skills\hyperframes-motion-reel"
```

制作中に HyperFrames のドメインスキル（`/hyperframes-core`, `/hyperframes-animation`, `/hyperframes-keyframes`, `/hyperframes-creative`, `/hyperframes-registry`, `/hyperframes-cli`, `/hyperframes-audio`）を読み込むため、あわせてインストールしてください。

### 2. 必要環境

- Node.js（現行 LTS）と `npx`
- Google Chrome（HyperFrames のレンダラーが使用）
- 最終確認用に `ffmpeg` / `ffprobe` が `PATH` 上にあること

### 3. 実行

```text
/hyperframes-motion-reel ネオン東京のナイトドライブ、20秒、BPM 128
/hyperframes-motion-reel AIカメラのプロダクトローンチ予告、縦長 9:16
/hyperframes-motion-reel ./assets/character.png ./assets/voice.wav キャラクター紹介リール
```

プロンプト内で指定した尺・BPM・解像度・アスペクト比・素材はデフォルトより優先されます。

## ⚙️ デフォルトパラメータ

| パラメータ | デフォルト | 備考 |
| --- | --- | --- |
| 尺 | 15 秒 | 拍グリッドに揃える。ボイス素材があればその長さに合わせる |
| FPS | 60 | `npx hyperframes render --fps 60` |
| BPM | 120 | 1 拍 = 0.5 秒 = 30 フレーム |
| サイズ | 1920 × 1080 | 縦長は 1080 × 1920、正方形は 1080 × 1080 |
| 出力 | MP4 / H.264 | draft / delivery の品質プリセット |

## 🧭 ワークフロー

1. コンセプト — 1 文で
2. デザインシステム — `DESIGN.md` に書き出し
3. タイムライン — 秒・拍・フレーム番号で記述（`b(8) = 4.0s = f240`）
4. モーション設計 — シーンごとに HyperFrames の blueprint / rule を名前で指定
5. サウンド設計 — `scripts/generate-audio.mjs` で生成
6. 実装 — `npx hyperframes init` → HTML / GSAP / Canvas
7. 検証 — `npx hyperframes lint` と `npx hyperframes check` を 0 findings まで
8. 各シーンの山場をスナップショットで目視確認
9. レンダリング — `npx hyperframes render --fps 60 --quality delivery`
10. `ffprobe` / `ffmpeg` で最終 MP4 を確認

## 🗂️ 生成されるプロジェクト構成

```text
<project-dir>/
|- hyperframes.json
|- DESIGN.md
|- index.html              # ルートコンポジション（data-width / data-height / data-duration）
|- compositions/           # ハードカットのシーンのみ
|- src/
|  |- config.js            # CFG: FPS, BPM, サイズ, 色, 拍テーブル
|  |- lib.js               # b(), mapRange, spring, seeded random
|  `- particles.js         # Canvas を描く純関数 render(t)
|- scripts/
|  |- generate-audio.mjs   # Node 標準のみ -> assets/audio/score.wav
|  `- sync-config.mjs      # CFG -> ルートの data-* 属性
`- assets/
   |- audio/score.wav
   `- fonts/
```

## 📦 リポジトリ構成

```text
hyperframes-motion-reel-skill/
|- SKILL.md                # スキル本体（Claude Code が読み込む）
|- README.md
|- README.ja.md
|- LICENSE
|- .github/workflows/      # CI（markdownlint + docs ビルド）と Pages デプロイ
`- docs/                   # 日英 VitePress サイト
```

## ⚖️ ライセンス

- このスキルリポジトリ：[MIT](./LICENSE)
- HyperFrames（npm `hyperframes`）：Apache-2.0。企業規模を問わず商用利用無料
- GSAP 3：商用含め無料
- 有償ライセンスが必要なライブラリは持ち込みません。参考として、Remotion は従業員 4 人以上の営利企業では有償の Company License が必要です。

## 📚 ドキュメント

- 英語：[sunwood-ai-labs.github.io/hyperframes-motion-reel-skill](https://sunwood-ai-labs.github.io/hyperframes-motion-reel-skill/)
- 日本語：[sunwood-ai-labs.github.io/hyperframes-motion-reel-skill/ja/](https://sunwood-ai-labs.github.io/hyperframes-motion-reel-skill/ja/)
- ローカルプレビュー：

```bash
cd docs
npm install
npm run docs:dev
```

## 🔗 関連リポジトリ

- [hyperframes-skill](https://github.com/Sunwood-ai-labs/hyperframes-skill)
- [hyperframes-cli-skill](https://github.com/Sunwood-ai-labs/hyperframes-cli-skill)
- [hyperframes-registry-skill](https://github.com/Sunwood-ai-labs/hyperframes-registry-skill)
- [website-to-hyperframes-skill](https://github.com/Sunwood-ai-labs/website-to-hyperframes-skill)
- [gsap-skill](https://github.com/Sunwood-ai-labs/gsap-skill)

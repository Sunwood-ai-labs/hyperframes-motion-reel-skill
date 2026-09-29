# 使い方

## プロンプト例

```text
/hyperframes-motion-reel ネオン東京のナイトドライブ、20秒、BPM 128
/hyperframes-motion-reel AIカメラのプロダクトローンチ予告、縦長 9:16
/hyperframes-motion-reel ./assets/character.png ./assets/voice.wav キャラクター紹介リール
```

デザイン・尺・解像度・アスペクト比・素材など、指定したものはデフォルトより優先されます。素材パスがあれば、画像・音声・コードを実際に確認してから設計に入ります。

## デフォルトパラメータ

| パラメータ | デフォルト | 備考 |
| --- | --- | --- |
| 尺 | 15 秒 | 拍グリッドに揃える。ボイス素材があればその長さに合わせる |
| FPS | 60 | `npx hyperframes render --fps 60`（CLI のデフォルトは 30） |
| BPM | 120 | 1 拍 = 0.5 秒 = 30 フレーム |
| サイズ | 1920 × 1080 | 縦長 1080 × 1920、正方形 1080 × 1080 |
| 出力 | MP4 / H.264 | `draft` / `delivery` 品質 |

## ワークフロー

1. コンセプトを 1 文で
2. デザインシステムを `DESIGN.md` に書き出し
3. 秒・拍・フレームでタイムラインを記述（`b(8) = 4.0s = f240`）
4. シーンごとに HyperFrames の blueprint / rule を名前で指定したモーション設計
5. サウンド設計
6. 実装：`init` → `DESIGN.md` → `generate-audio.mjs` → HTML / JS
7. 検証：`npx hyperframes lint` のあと `npx hyperframes check` を 0 findings まで
8. 各シーンの山場を `npx hyperframes snapshot --at <秒>` で書き出し、画像で確認
9. `npx hyperframes render --fps 60` でレンダリング
10. `ffprobe` で確認し、`ffmpeg` でフレームを抜き出して最終確認

## レンダーコマンド

```bash
npx hyperframes render --fps 60 --quality draft    --output out/draft.mp4
npx hyperframes render --fps 60 --quality delivery --output out/reel.mp4
```

## 使わない場面

既存の Remotion プロジェクトの移植は別の作業です。`/hyperframes` の `remotion-to-hyperframes` ルートを使ってください。

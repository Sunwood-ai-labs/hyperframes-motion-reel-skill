# はじめに

## 必要環境

- [Claude Code](https://claude.com/claude-code)
- Node.js（現行 LTS）と `npx`
- Google Chrome（HyperFrames のレンダラーが使用）
- 最終確認用に `ffmpeg` / `ffprobe` が `PATH` 上にあること

## スキルのインストール

Claude Code のスキルディレクトリにクローンします。フォルダ名がそのままスラッシュコマンド名になります。

```bash
git clone https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill ~/.claude/skills/hyperframes-motion-reel
```

Windows（PowerShell）の場合：

```powershell
git clone https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill "$env:USERPROFILE\.claude\skills\hyperframes-motion-reel"
```

## 併用スキル

制作中は記憶に頼らず HyperFrames のドメインスキルを読み込みます。同じ場所にインストールしてください。

| タイミング | スキル |
| --- | --- |
| HTML を書く前 | `/hyperframes-core` |
| モーションを書く前 | `/hyperframes-animation` |
| カメラ・3D・マスク・SVG モーフ | `/hyperframes-keyframes` |
| フォント選定 | `/hyperframes-creative` |
| 名前のある見た目（glitch, grain, CRT など） | `/hyperframes-registry` |
| lint / check / snapshot / render | `/hyperframes-cli` |
| ボイスと生成スコアのミックス | `/hyperframes-audio` |

## 最初の実行

```text
/hyperframes-motion-reel ネオン東京のナイトドライブ
```

`DESIGN.md`、拍タイムライン、生成した `score.wav`、コンポジション、最後に `out/reel.mp4` が書き出されます。

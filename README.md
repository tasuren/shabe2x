# しゃべしゃべ
これはシャドーイングをするためのウェブアプリで、任意の文章を読み上げることができます。これは、
Web Speech APIを使ったネイティブ環境での読み上げを使用し、高速にかつプライバシー配慮して動作が可能です。

- **HTMLのペーストに対応** — HTMLをペーストした時、スタイルを消して書式そのままにペーストが可能。
- **部分的な読み上げ** — 文章を選択した時、その選択した部分だけ読み上げ可能。
- **シンプルなUI** — ブラウザ標準のデザインを踏襲し、基本配色も二色で明瞭。
- **ダークモード対応** — システムに合わせる自動機能付き。

## 技術スタック
- Bun
- SolidJS
- Tailwind CSS
  [Preflight](https://tailwindcss.com/docs/preflight)が無効化されています。
  開発時にはこれを留意してください。
- Tailwind Variants
- Cloudflare Pages

## ToDo
- [x] Web Speech APIによる読み上げの実装
- [ ] GoogleのText-to-Speech AIによる読み上げの実装
  これは有料のため、有料プランやAPIキーの設定項目を設ける可能性があります。
- [ ] ログイン機能と周辺のインフラを整備
- [ ] 「後で読むリスト」などの機能を実装

## 開発
### 用語
- Voice: ウェブ音声 APIの`SpeechSynthesisVoice`のことで、音声の種類を表す。
- Paper: シャドーイング対象の文章を配置する場所、文章を操作したりするためのクラスが存在する。
- TTS: 読み上げをするためのクラスのこと。

### 起動方法
1. Bunが必要なのでまずBunをインストール
2. `bun i`で依存関係をインストール
3. `bun dev`で起動

## その他情報
- [ライセンス](./LICENSE)
- [ウェブサイト](https://shabe2x.tasuren.jp)

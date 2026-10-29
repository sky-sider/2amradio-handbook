# アーキテクチャ・依存関係

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 6ファイル構成

| ファイル | 役割 | 開発時の注意 |
|---|---|---|
| `index.html` | 画面のマウント先・JS読込順 | 相対パスを維持。タイトル表記とバージョン表記も確認。 |
| `style.css` | 深夜ラジオのUI・スマホ対応・日誌 | DOMクラス名の変更は `script.js` と同時対応。 |
| `listeners.js` | `NAMES`・`defaultState`・`SIM_PROFILES`・生活更新 | 初期値と移行処理が対応しているか確認。 |
| `letters.js` | `letterDB`・`opening`・`songs`・各章の返答データ | 既存選択肢の順序・タグを不用意に変えない。 |
| `events.js` | `applyReply`・章／分岐・日々の生活・特別放送 | 呼び出し順と夜番号が重要。 |
| `script.js` | `s`・セーブ・描画・各モード・自動DJ・閉局 | UIと永続化が密接。改修時に全モードを確認。 |

## 実行フロー（簡略）

```text
index.html → 4つの JS を順に評価
   └─ script.js: localStorage → load() → migrateState() / defaultState()
      └─ render() → 画面表示
         └─ startNight() → nightLetters() → 選択 → beginBroadcast()
             └─ applyReply() → s.played へ保存
                └─ finishBroadcast() → 世界と12人が進む
                   └─ nextNight() → 次夜／章末／最終放送
```

## 主要責務の参照先

- 状態初期化：`defaultState`（listeners.js:2）、`createSimulationState`（listeners.js:169）、`createChapter4State`（events.js:4871）
- 1夜の手紙・持ち越し：`nightLetters`（script.js:353）、`createNightLetters`（events.js:138）、`updatePendingLetters`（events.js:153）
- 返答・世界更新：`applyReply`（events.js:5）、`simulateDailyLives`（listeners.js:363）、`simChooseAction`（listeners.js:290）
- 通常モード画面：`startNight`（script.js:484）、`beginBroadcast`（script.js:485）、`finishBroadcast`（script.js:496）、`nextNight`（script.js:508）、`render`（script.js:2772）
- 読書モード：`createReader`（script.js:1514）、`readerProduceNight`（script.js:2589）、`autoDJPickLetters`（script.js:1605）
- 永続化：`load`（script.js:259）、`save`（script.js:277）、`migrateState`（script.js:32）、`mainSaveRaw`（script.js:190）、`readerSaveRaw`（script.js:170）

## 同期・非同期

通常のUI更新とセーブはブラウザのメインスレッドで動きます。長期セーブの圧縮は一定の処理時間が必要です。重い処理を安易に増やすとAndroidで操作が詰まりやすくなります。v4.9.20〜22で圧縮と日誌描画の負荷軽減が行われました。

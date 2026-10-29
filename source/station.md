# 放送演出・曲・DJの雰囲気

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 放送演出の責務

本編手動モードでは挨拶・つなぎ・曲・締めを選択。おたより中心と読書モードでは、既定の候補を夜の内容に照らして自動選択します。曲は**架空の曲名を表示するテキスト演出**で、音源を実際に再生する仕組みではありません。

## 6つの曲（`letters.js`）

| 曲 | 受けたリスナーの軽い影響 |
|---|---|
| 夜明け前の散歩道 | `reflection +1` |
| 小さな灯り | `stress −2` |
| 知らない街の午前3時 | `agency +1` |
| 雨粒の通り道 | `stress −1` |
| 昨日の続きに名前をつける | `agency +1` |
| 始発まで、もう少し | `reflection +1` |

`applySongMood()` は**その夜に実際に紹介された差出人**を対象に1人ずつ適用。全リスナーが一斉に影響を受けるわけではありません。

## 放送全体の緩急

第101夜以降の通常放送は、紹介した手紙の語り口に応じ、何気ない夜・軽やかな夜・考えごとが残る夜・静かに受け止める夜の余韻を組み合わせます。毎晩ドラマを作らないことが重要です。

## 放送日誌に残すこと

`logs` は挨拶、曲、締め、未紹介などの出来事を記録します。`broadcastStyle.history` は上限120夜に整理されます。**実際に画面で使った言葉と日誌の文章を一致**させてください。

**参照**：`recordOpening`（events.js:167）、`applySongMood`（events.js:175）、`automaticStylePick`（script.js:743）、`stationAutoScore`（script.js:709）、`ensureAutomaticBroadcastSelections`（script.js:773）、`createBroadcastStyle`（script.js:789）、`regularPacingText4917`（script.js:1413）

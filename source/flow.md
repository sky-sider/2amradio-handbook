# 夜のゲームループと画面遷移

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本の1夜

1. `intro`：夜の導入。天気・章の案内、特別放送の予告等。
2. `prepare`：届いたお便り候補を確認し、最大3通を選択。モードと挨拶等を準備。
3. `broadcast`：お便りの朗読、返答、曲・幕間・締め。返答ごとに `applyReply` が走る。
4. `after`：未紹介便箋・世界の行動・人間関係・生活AIを更新して放送後を表示。
5. `nextNight()`：通常なら翌夜の `intro`。章末・最終放送の場合は特別な `phase` に移る。

### お便り選択

- `s.chosen`: 紹介予定のID配列（最大3）。`selectLetter()`が更新。
- `s.played`: 実際に読んだ記録。`id`, `who`, `subject`, `body`, `response`, `night` を格納。
- `s.letterSets[n]`: 当夜に届いた候補のスナップショット。再表示時に勝手に変えない。
- `s.pending`: 持ち越し対象のみを最大2通保持。対象外のお便りは翌夜に自動再登場しない。
- `NIGHTLY_LETTER_LIMITS`: 同夜の差出人別制限（パン屋2通、逆さまの傘・三角定規・冷蔵庫の明かりは各1通）。

### 返答時のイベント順

`applyReply(l, choice, assembled)` によって、既知フラグ・個別イベント・数値変化・物語拡張・生活AIへの反映・紹介履歴への記録を行います。**紹介されなかった手紙ではこの関数は実行されません。**

### 放送後に進むもの

`finishBroadcast()` は、曲の効果→放送文化→長期記憶→持ち越し→初期章イベント→12人の自律生活→新リスナー・交流・章の後日談→特別放送などの順で更新します。個別の処理は `processedNights` を用いる二重実行防止がある場合があります。

### 章の境目

| 夜 | 遷移 | 実装の扱い |
|---:|---|---|
| 14 | `complete` → 第15夜へ | 第1章の終了画面 |
| 28 | `chapter2_complete` | 第2章の終了画面 |
| 51〜64 | 第3章 | 章末後 `chapter3_complete` |
| 79〜92 | 第4章 | 92夜後 `chapter4_complete` |
| 100 | 記念放送／閉局が選択可能になる | 必ず閉局ではない |

特殊フェーズは [章](chapters.html)・[最終放送](finale.html)へ。

## 開発上の落とし穴

- `s.phase` だけを変えて `chosen` や `replyParts` をリセットし忘れない。
- `nightLetters()` は生成済みのスナップショットを再利用する設計。再生成しない。
- セーブや読書記録のUI操作が、物語の乱数 `s.rng` を消費しないこと。

**主要関数**：`startNight`（script.js:484）、`selectLetter`（script.js:483）、`beginBroadcast`（script.js:485）、`applyReply`（events.js:5）、`finishBroadcast`（script.js:496）、`nextNight`（script.js:508）、`updatePendingLetters`（events.js:153）

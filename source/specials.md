# 特別放送・記念放送

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

**シナリオライター向け**：新企画の発案・お便り例・採用条件は[特別放送 企画・お便り制作ガイド](special-writing.html)にまとめました。

## 特別放送とは

通常の放送とは別に、リスナー参加型・記念日・物語に連動する企画があります。募集を開始した夜と、実際に放送する夜が異なることがあります。実装は `s.special` と `storyPrograms` 系の状態を利用。

## 記念夜数

**v4.9.22のコードで確認できた節目**：50／100／200／300／365／500夜。`MILESTONE_PROGRAMS` が識別子へ写像します。節目の実施は他の番組企画との競合を見て処理します。

## 設計上の優先度

1. 予約済みで進行中の特別放送を勝手に消さない。
2. 特別放送に必要な専用投稿は、通常候補と区別できるタグを持たせる。
3. 第4章などの章固有投稿は特別放送と重なれば保留可能。
4. 番組に参加しなかった人物も自律生活を続ける。
5. 最終放送計画が記念放送と衝突するときは計画を一時不可にする。

## 主要状態の見方

`special.status`、`special.night` などが予約と実施の基礎。個々の構造は関数を優先して確認してください。返答データは `letters.js` の `SPECIAL_THEMES`／`SPECIAL_CHOICES` など。

**参照**：`createSpecialState`（events.js:3238）、`migrateSpecial`（events.js:3239）、`specialPlan`（events.js:3306）、`specialActive`（events.js:3281）、`specialCreateLetters`（events.js:3410）、`specialProcessNight`（events.js:3494）、`milestoneAt`（events.js:3252）、`milestoneUpcoming`（events.js:3253）

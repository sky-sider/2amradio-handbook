# お便り・返答・候補生成

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## お便りオブジェクト

```js
{
  who: 'cat',
  subject: '逃げることについて',
  body: 'こんばんは。…',
  choices: [
    ['共感する', '返信本文', 'empathy'],
    ['問いかける', '返信本文', 'reflection']
  ],
  // 必要に応じて carry, special, regular, tag, kind, replyVersion 等
}
```

`letterDB` の固定投稿、`regular.letterArchive` の自律生成投稿、章投稿、特別放送投稿が同じ候補一覧へ入ります。`letter(id)` はこれらを参照して本文や選択肢を解決します。

## 文章生成の区別

| レイヤー | やっていること | 主な実装 |
|---|---|---|
| 固定の脚本 | 初期章・各章の文面と選択肢を登録 | `letters.js`、`CH4_CONTENT` |
| 日常の合成 | ルートやテーマに基づき原稿を組み立てる | `regularCompose`、`createRegularLetters` |
| 生活追伸 | 前日の実際の行動／交流があれば追記 | `simLetterPostscript` 等 |
| 文面整合 | 章分岐や口調、選択済みの過去に応じて調整 | `chapter2LetterBody`、`chapter3LetterBody` 等 |
| 自動DJ | **受け取った原稿を評価し、読む手紙と返答を選ぶ** | `autoDJPickLetters`、`autoDJReplyScore` |

## 候補と既読

- 候補：`letterSets[n]` に固定。選択：`chosen` に最大3件。
- 実際に紹介：`played` に挿入され、ここで初めて返信影響を適用。
- 未紹介：`pending` に一部のみ最大2通、残すかどうかは `carry` プロパティによる。
- 既読の原稿は当時の `played.body` と `played.response` を保持し、後日の文面変更を遡及しない。

## 書き分け・本文監査

各人物の[詳細ページ](people.html)に口調とイベント境界が記載されています。新しいお便りを追加するときは、件名・本文・返答タグの整合／同じ題材の反復／時間の経過／初見にも理解可能かを確認します。

## 注意点

- `choices` のタグは内部パラメーターへ影響する。文面だけを入れ替えるつもりでタグを変更しない。
- 3段階返答は `replyParts` の構造と整合させる。
- 未紹介の手紙をストーリーの必須条件にしない。

**参照**：`letter`（script.js:287）、`nightLetters`（script.js:353）、`updatePendingLetters`（events.js:153）、`regularCompose`（events.js:2385）、`createRegularLetters`（events.js:2929）、`replyTopicChoices`（letters.js:1774）、`applyReply`（events.js:5）

# 放送日誌・人物録・しおり

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 放送日誌

`s.played` の実際に紹介した手紙を読み返せます。日誌は10夜単位のページ送りで、手紙の本文とDJの返答を保持します。`journalPage` は表示専用の位置情報として分離保存されます。

## 心に残ったお便り（しおり）

`bookmarks` に紹介済みの手紙を紐づける。v4.9.21以降は**20通ずつ**ページ表示。表示ページ移動だけで物語セーブの全体保存をしません。v4.9.22以降、しおりの付け外しでは該当領域を局所更新します。

## あのころと、今の声

第101夜以降、**同じ人物の紹介済みの二通**を並べて読み比べられます。2通の間隔は30夜以上。検索では未紹介便箋を参照しません。表示操作は世界の乱数や人生分岐を進めません。

## スクロールとUI

AndroidとPCで画面位置を維持する設計。日誌表示の一部更新では、開いていた二通比較の表示内容も維持しやすくしています。

## 開発メモ

- 履歴を表示するだけなのに `simulateDailyLives` 等を呼ばない。
- `s.played` の本文を再生成しない。
- しおりを大量に表示する場合、仮想化・ページングの前提を崩さない。

**参照**：`journal`（script.js:1259）、`journalHistoryContent`（script.js:1264）、`journalMovePage`（script.js:247）、`toggleBookmark`（script.js:1013）、`bookmarkArchiveMove`（script.js:1048）、`journalTwoLettersCandidates`（script.js:1063）、`journalTwoLettersPanel`（script.js:1090）、`refreshJournalBookmarkButtons`（script.js:1022）

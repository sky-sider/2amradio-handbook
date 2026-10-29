# セーブ・バックアップ・互換性

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## localStorageのキー

| キー | 用途 |
|---|---|
| `radio_2am_prototype_v1` | 本編の進行セーブ |
| `radio_2am_reader_v48` | 「聴くだけの夜」専用セーブ |
| `radio_2am_active_profile_v48` | 現在表示中の本編／読書切替 |
| `radio_2am_reader_position_v420` | 読書ページ・スクロール位置 |
| `radio_2am_main_view_v421` | 本編タブ・日誌ページの表示位置 |

キー名は旧版互換性のため重要。**リネームする場合は旧キー読み込みと移行処理が必須**です。

## 保存経路

`save()` がJSON化し、アクティブなプロファイルごとに `mainSaveRaw`／`readerSaveRaw` へ渡す。通常はJSONを保存し、容量不足時は圧縮形式へ切り替える。v4.9.20は圧縮内部処理の高速化であり、フォーマット変更を目的にしていません。

`load()` は保存済みデータの復号と `migrateState()` を行い、不足状態を補完します。読書状態に不整合があれば本編へ退避する設計です。

## 何を移行するか

`migrateSimulation` は `processedNights` を保持して重複生活更新を防ぎ、`people` の不足キーを補完。生活日誌は直近56件、重要度付きの生活記憶は概ね45件に整理。章4の移行は途中の夜や過去の夜に遡及追加しない。

## JSONバックアップ

`downloadSave` は本編をJSONとして保存し、`importSave` はJSONを検証・移行した後、保存に成功してから表示中の状態を切り替えます。読書モードにも個別のバックアップ操作があります。

## 保存の安全な検証

1. 新規開始直後、100夜、300夜、500夜相当のJSONで読み込み・書き出しを試す。
2. 圧縮保存前後で `played`、`letterSets`、各人物・章・閉局状態が一致すること。
3. 保存領域不足を模擬し、失敗しても**直前の正常セーブが残る**こと。
4. 第130夜の旧バックアップから最終放送まで通せること。
5. `reader.pages` の内部構造と `played` のID対応を `validateReaderState` で確認。
6. テスト時には**本編と読書の両方**のバックアップを確保。

**参照**：`load`（script.js:259）、`save`（script.js:277）、`mainSaveRaw`（script.js:190）、`readerSaveRaw`（script.js:170）、`mainDecodeSaved`（script.js:186）、`readerDecodeSaved`（script.js:166）、`migrateState`（script.js:32）、`migrateSimulation`（listeners.js:181）、`validateReaderState`（script.js:219）、`downloadSave`（script.js:535）、`importSave`（script.js:536）

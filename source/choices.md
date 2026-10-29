# 返答と内部パラメーターの変化

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## プレイヤーの意思決定が影響する経路

```text
お便りを選択・返答する
  └─ applyReply()
      ├─ 局との関係（trust / reflection / agency / stress）
      ├─ flags と明示された脚本分岐
      ├─ extendedApplyReply() / regularReplyRecorded() など
      ├─ simReplyImpact() → emotion + signals + memory
      └─ played に実際の本文と返答を保存
          └─ 放送後 simulateDailyLives()
             └─ 当日の行動候補の重みが一部変わり、生活や関係が進む
```

## 共通の返答タグの影響：`events.js:5`

| タグ `choice` | 共通の `s.listeners[id]` への追加変化 |
|---|---|
| `empathy` | `trust +2` |
| `agency` | `agency +2` |
| `reflection` | `reflection +2` |
| `humor` | `trust +1`、`stress -2` |
| `curiosity`・`followup`・`past` | `trust +1`、`reflection +1` |
| その他 | `applyReply` 冒頭の `trust +1` は基本共通。個別の脚本効果が別途ある。 |

**例外**：特定の手紙では個別イベントが追加されます。例：`cat1` では選択タグごとに追加の trust/reflection/stress/agency、`fish3` では3段階返答の合算がストレス等に影響。共通表だけで最終効果を決めつけないでください。

## 生活AIへの直接影響：`simReplyImpact()`

以下は `emotion` の配列 `joy / anxiety / anger / loneliness / hope` への基本差分です。実際はタグ未定義時のフォールバックや追加補正もあります。

| タグ | 喜び | 不安 | 怒り | 孤独 | 希望 |
|---|---:|---:|---:|---:|---:|
| empathy | +2 | -2 | 0 | -1 | +1 |
| humor | +3 | -1 | 0 | -1 | +1 |
| caution | 0 | -3 | 0 | 0 | +1 |
| agency | +1 | 0 | 0 | 0 | +3 |
| reflection | 0 | +1 | 0 | 0 | +2 |
| space | +1 | -2 | 0 | -1 | +1 |
| curiosity | +1 | 0 | 0 | -1 | +2 |
| past | +1 | +1 | 0 | -1 | +1 |
| honesty | 0 | 0 | -1 | 0 | +2 |

追加ルール：返答全文 `assembled` に「嫌・つら・苦し・怖」を含むと `anxiety -1`。テーマ別の `signals` は上限8、通常+2される。`agency` は `boundaries +1`、`reflection`/`past` は `memories +1`。翌日以降 `signals` は夜ごとに1減り0で削除。

## 注意すべき設計

- DJの返答だけで家族・友人の信頼値を直接増やさない（関係値は**実際の交流結果**により動く）。
- 同じ選択に常に同じ結末を強制しない（生活状態と過去の交流・行動重みに影響）。
- 「不安-2」と「希望+1」は共存する。不安を消去しない。
- スタジオのオープニングは `stationTone`、曲は紹介された当夜のリスナーへ軽い効果。劇的な進路変更にはしない。

**主な実装**：`applyReply`（events.js:5）、`extendedApplyReply`（events.js:17）、`simReplyImpact`（listeners.js:235）、`simChooseAction`（listeners.js:290）、`applySongMood`（events.js:175）

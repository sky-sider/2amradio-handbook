# 内部状態とパラメーターの全体像

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 単一の進行状態 `s`

ゲーム本編はグローバル変数 `s` に状態を集約し、`defaultState()`で初期化、`migrateState()`で旧版の不足項目を補います。**数値はすべてプレイヤーに表示する必要はありません。**

| 状態 | データ形 | 用途 |
|---|---|---|
| `night`, `phase`, `tab` | number/string | 現在夜、画面進行、タブ |
| `listeners[id]` | object | 放送との関係（信頼・内省・主体性・ストレスなど） |
| `simState.people[id]` | object | 自律生活（性格、感情、生活、交流、習慣、記憶） |
| `flags` | object | 既読・選択・人物別イベントフラグ |
| `privateMemories` | object | 放送局はまだ知らない個人の経験 |
| `storyState`, `lifePaths` | object | 脚本分岐、人生の方向 |
| `letterSets`, `pending`, `chosen` | object/array | 配達済み候補・持ち越し・紹介予定 |
| `played`, `logs`, `events` | array | 紹介履歴・放送履歴・出来事 |
| `simState.processedNights` | array | 自律生活の同夜二重更新防止 |
| `special`, `storyPrograms` | object | 特別企画と物語連動番組 |
| `chapter2`,`chapter3`,`chapter4` | object | 章固有の進行とイベント履歴 |
| `climate`, `stationTone` | object | 天気とスタジオの雰囲気 |
| `broadcastStyle`, `broadcastModePref` | object/string | 演出履歴・手動／おたより中心 |
| `finale` | object | 閉局計画・予告・閉局済み状態 |
| `rng` | unsigned integer | ゲーム本体の再現性に関わる乱数状態 |

## 2層の数値を混同しない

### ① 放送との関係：`s.listeners[id]`

| キー | 範囲 | 説明 |
|---|---|---|
| `trust` | 0〜100 | この放送で受け取った言葉に対する信頼の目安 |
| `reflection` | 0〜100 | 自分の状況を振り返る方向 |
| `agency` | 0〜100 | 自分で選択する方向 |
| `stress` | 0〜100 | 負担・緊張の方向 |
| `memories` | 配列 | 放送で知り得た、主に紹介済みの出来事 |
| `known` | boolean | 局が紹介を通じて知っているリスナーか |

### ② 暮らしの状態：`s.simState.people[id]`

| キー | 内部項目 |
|---|---|
| `traits` | `sociability`、`caution`、`sensitivity`、`independence`（基本性格・通常固定） |
| `emotion` | `joy`、`anxiety`、`anger`、`loneliness`、`hope`（毎夜変化） |
| `life` | `work`、`health`、`finance`、`leisure`（毎夜変化） |
| `relationships` | 相手ごとに `closeness`・`trust`・`tension` 等 |
| `signals` | 放送の返答により残る短期的な関心。毎夜減衰 |
| `activityCounts`, `rhythms`, `habits` | 行動・行動カテゴリの累積習慣 |
| `daily`, `memories` | 実際に起きた日常・重要度付きの記憶 |

数値の更新は原則 `simAdjust()`／`affect()` が0〜100に丸めます。性格 `traits` は初期値のまま移行する実装です。

## 人物の初期値

12人の**正確な初期数値**は[人物一覧](people.html)または各人物ページを参照。機械可読版は `data/listener-profiles.json` に用意しました。

**ソース照合**：`defaultState`（listeners.js:2）、`applyReply`（events.js:5）、`affect`（events.js:3）、`simReplyImpact`（listeners.js:235）、`simulateDailyLives`（listeners.js:363）、`migrateSimulation`（listeners.js:181）

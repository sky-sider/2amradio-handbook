# 終点のひとつ前｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：駅に思い出を持つ人  
**主題**：木曜日・切符・弟・昔の約束  
**物語の説明**：終点のひとつ前の駅と過去の約束。現在の別の予定も持つ。弟との再会を勝手に確定しない。  
**文体ガイド**：端正で短めの丁寧語。余白を大切にする。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 23 |
| 性格 | `traits.caution` | 85 |
| 性格 | `traits.sensitivity` | 73 |
| 性格 | `traits.independence` | 55 |
| 感情 | `emotion.joy` | 18 |
| 感情 | `emotion.anxiety` | 53 |
| 感情 | `emotion.anger` | 9 |
| 感情 | `emotion.loneliness` | 58 |
| 感情 | `emotion.hope` | 29 |
| 生活 | `life.work` | 48 |
| 生活 | `life.health` | 62 |
| 生活 | `life.finance` | 57 |
| 生活 | `life.leisure` | 29 |
| 放送関係 | `listeners.trust` | 15 |
| 放送関係 | `listeners.reflection` | 65 |
| 放送関係 | `listeners.agency` | 28 |
| 放送関係 | `listeners.stress` | 43 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 仕事帰りに時刻表を見た
- 駅前の道をゆっくり歩いた
- 古い切符を引き出しにしまった

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `brother` | 弟 | 66 | 45 | 61 | — |
| `neighbor` | 近所の人 | 34 | 46 | 15 | — |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `timetable` | 仕事帰りに時刻表を開いた | `reflection` | 16 | `None` | `hope` +1、`loneliness` +1 | なし |
| `chores` | 休みの日の買い物リストを作った | `duty` | 14 | `None` | `work` +1、`anxiety` -1 | なし |
| `walk` | 駅へ向かう道とは別の通りを歩いた | `rest` | 16 | `None` | `health` +1、`joy` +1 | なし |
| `ticket` | 古い切符を取り出して戻した | `reflection` | 16 | `None` | `hope` +1、`anxiety` +1 | なし |
| `letterdraft` | 誰かに宛てた便箋を一枚書きかけた | `reflection` | 12 | `None` | `hope` +1、`anxiety` +1 | 第9夜〜 |
| `neighbor` | 近所の人に道を譲って会釈した | `social` | 10 | `neighbor` | `loneliness` -1 | なし |
| `rest` | 早く帰って窓の灯りを眺めた | `rest` | 12 | `None` | `health` +2、`anxiety` -1 | なし |
| `stationstop` | 帰宅途中、駅前でしばらく時刻表を眺めた | `reflection` | 13 | `None` | `hope` +1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.terminal`、`defaultState().listeners.terminal`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

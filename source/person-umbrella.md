# 逆さまの傘｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：花屋の人  
**主題**：花屋・色・店先・仕事以外の休息  
**物語の説明**：花屋の日常、花ではない色、店の外で飲むお茶。営業休止や引継ぎを未確定のまま尊重。  
**文体ガイド**：あたたかな観察と軽い比喩、丁寧体。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 65 |
| 性格 | `traits.caution` | 58 |
| 性格 | `traits.sensitivity` | 71 |
| 性格 | `traits.independence` | 71 |
| 感情 | `emotion.joy` | 43 |
| 感情 | `emotion.anxiety` | 39 |
| 感情 | `emotion.anger` | 12 |
| 感情 | `emotion.loneliness` | 29 |
| 感情 | `emotion.hope` | 52 |
| 生活 | `life.work` | 63 |
| 生活 | `life.health` | 64 |
| 生活 | `life.finance` | 53 |
| 生活 | `life.leisure` | 51 |
| 放送関係 | `listeners.trust` | 24 |
| 放送関係 | `listeners.reflection` | 43 |
| 放送関係 | `listeners.agency` | 53 |
| 放送関係 | `listeners.stress` | 37 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 花屋のシャッターを上げた
- 水揚げした花の名前を確かめた
- 店先の小さな鉢を並べ直した

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `regular` | 花を買いに来る常連 | 55 | 58 | 16 | — |
| `assistant` | 週末に手伝う知人 | 48 | 55 | 23 | — |
| `neighbor` | 向かいの店の人 | 52 | 53 | 18 | — |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `bouquet` | 店で季節の花束を一つ組んだ | `creative` | 19 | `None` | `hope` +1、`leisure` +1 | なし |
| `window` | 店の窓辺に小さな鉢を飾り直した | `creative` | 16 | `None` | `joy` +2 | なし |
| `flowercustomer` | 店でお客さんの好みを聞いた | `social` | 16 | `regular` | `joy` +1、`loneliness` -1 | なし |
| `market` | 朝の市場で小さな花を仕入れた | `duty` | 17 | `None` | `work` +1、`health` -1 | なし |
| `assistanttalk` | 手伝いに来る知人と店の予定を話した | `social` | 12 | `assistant` | `anxiety` -1、`hope` +1 | なし |
| `plantrest` | 店を閉めてから、枯れかけた鉢の手入れをした | `rest` | 15 | `None` | `health` +1、`hope` +1 | なし |
| `neighborchat` | 向かいの店の人と短く立ち話をした | `social` | 12 | `neighbor` | `loneliness` -1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.umbrella`、`defaultState().listeners.umbrella`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

# 古時計｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：元時計修理の仕事／図書室と散歩  
**主題**：亡き妻の思い出・時計・図書室・今の生活  
**物語の説明**：止まった時計や妻の記憶を抱えつつ、図書室や近所との交流が増える。現在も店を営業していると誤読させない。  
**文体ガイド**：穏やかで年配らしい丁寧体。知識や経験はあるが説教しない。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 35 |
| 性格 | `traits.caution` | 58 |
| 性格 | `traits.sensitivity` | 75 |
| 性格 | `traits.independence` | 78 |
| 感情 | `emotion.joy` | 37 |
| 感情 | `emotion.anxiety` | 32 |
| 感情 | `emotion.anger` | 7 |
| 感情 | `emotion.loneliness` | 47 |
| 感情 | `emotion.hope` | 39 |
| 生活 | `life.work` | 18 |
| 生活 | `life.health` | 66 |
| 生活 | `life.finance` | 65 |
| 生活 | `life.leisure` | 57 |
| 放送関係 | `listeners.trust` | 30 |
| 放送関係 | `listeners.reflection` | 45 |
| 放送関係 | `listeners.agency` | 45 |
| 放送関係 | `listeners.stress` | 25 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 朝の散歩に出た
- 古い時計のねじを巻いた
- 妻の好きだったお茶を入れた

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `library` | 図書室の人たち | 55 | 65 | 12 | — |
| `oldFriend` | 古い知人 | 47 | 62 | 15 | — |
| `neighbor` | 近所の人 | 49 | 58 | 13 | — |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `walk` | 知らない花を見つけながら散歩した | `rest` | 16 | `None` | `health` +2、`joy` +1 | なし |
| `repair` | 手元の古い時計を一つ磨いた | `creative` | 15 | `None` | `joy` +2、`leisure` +1 | なし |
| `library` | 図書室で子どもたちの話を聞いた | `social` | 17 | `library` | `loneliness` -2、`joy` +2 | 第4夜〜 |
| `tea` | 好きなお茶を丁寧に淹れた | `rest` | 17 | `None` | `anxiety` -2、`joy` +1 | なし |
| `neighbor` | 散歩の帰りに近所の人と立ち話をした | `social` | 9 | `neighbor` | `loneliness` -2、`hope` +1 | なし |
| `photo` | 写真の入った箱を少し整理した | `reflection` | 14 | `None` | `hope` +1、`loneliness` +1 | なし |
| `stationplan` | 海辺の駅までの道順を紙に書いてみた | `reflection` | 10 | `None` | `hope` +2、`anxiety` +1 | 第8夜〜 |
| `morningmarket` | 朝の市場に寄り、季節の花を見た | `rest` | 12 | `None` | `joy` +1、`health` +1 | なし |
| `shopfront` | 昔の時計店があった通りを歩いた | `reflection` | 13 | `None` | `hope` +1、`loneliness` +1 | なし |
| `shopvisit` | 昔の時計店の窓を眺め、商店街をゆっくり歩いた | `rest` | 13 | `None` | `joy` +1、`loneliness` +1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.clock`、`defaultState().listeners.clock`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

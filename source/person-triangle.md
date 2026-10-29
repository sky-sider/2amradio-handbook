# 三角定規｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：学校に通う人／街の図面  
**主題**：進路・架空の地図・予定表・友人  
**物語の説明**：架空の街の空き地や予定の余白を考える。進路や職業を一つに決めたことにしない。  
**文体ガイド**：好奇心が強く、少し論理的で素直な丁寧語。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 56 |
| 性格 | `traits.caution` | 68 |
| 性格 | `traits.sensitivity` | 79 |
| 性格 | `traits.independence` | 61 |
| 感情 | `emotion.joy` | 47 |
| 感情 | `emotion.anxiety` | 41 |
| 感情 | `emotion.anger` | 12 |
| 感情 | `emotion.loneliness` | 23 |
| 感情 | `emotion.hope` | 66 |
| 生活 | `life.work` | 45 |
| 生活 | `life.health` | 77 |
| 生活 | `life.finance` | 48 |
| 生活 | `life.leisure` | 58 |
| 放送関係 | `listeners.trust` | 20 |
| 放送関係 | `listeners.reflection` | 57 |
| 放送関係 | `listeners.agency` | 55 |
| 放送関係 | `listeners.stress` | 31 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 学校の時間割を確認した
- ノートの端に図形を描いた
- 部活のない放課後をどう過ごすか考えた

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `friend` | クラスの友人 | 61 | 65 | 19 | — |
| `teacher` | 学校の先生 | 49 | 55 | 24 | — |
| `family` | 家族 | 65 | 70 | 23 | — |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `librarystudy` | 放課後、図書室で資料を読んだ | `duty` | 17 | `None` | `work` +1、`leisure` +1 | なし |
| `diagram` | ノートに思いついた街の地図を描いた | `creative` | 17 | `None` | `joy` +2、`hope` +1 | なし |
| `friends` | 友達と進路とは関係ない話をした | `social` | 16 | `friend` | `joy` +1、`loneliness` -2 | なし |
| `future` | なりたい職業を三つ書いて、一つ消した | `reflection` | 17 | `None` | `hope` +1、`anxiety` +1 | なし |
| `teacher` | 先生に気になる授業について質問した | `social` | 12 | `teacher` | `hope` +1、`anxiety` -1 | なし |
| `freewalk` | 帰宅途中、いつもと違う道を選んだ | `rest` | 15 | `None` | `health` +1、`joy` +1 | なし |
| `familydinner` | 家で夕食の支度を手伝った | `social` | 13 | `family` | `joy` +1、`loneliness` -1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.triangle`、`defaultState().listeners.triangle`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

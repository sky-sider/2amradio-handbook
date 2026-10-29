# 透明な金魚｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：学生／文章を読む・書く  
**主題**：友人への境界線・日記・進路・読書  
**物語の説明**：友達との関係に戸惑い、笑ってごまかす癖から少しずつ言葉を見つける。進路は選択次第。  
**文体ガイド**：慎重で繊細な丁寧語。決着しない気持ちを尊重する。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 55 |
| 性格 | `traits.caution` | 83 |
| 性格 | `traits.sensitivity` | 88 |
| 性格 | `traits.independence` | 35 |
| 感情 | `emotion.joy` | 24 |
| 感情 | `emotion.anxiety` | 71 |
| 感情 | `emotion.anger` | 16 |
| 感情 | `emotion.loneliness` | 54 |
| 感情 | `emotion.hope` | 34 |
| 生活 | `life.work` | 45 |
| 生活 | `life.health` | 67 |
| 生活 | `life.finance` | 48 |
| 生活 | `life.leisure` | 36 |
| 放送関係 | `listeners.trust` | 20 |
| 放送関係 | `listeners.reflection` | 40 |
| 放送関係 | `listeners.agency` | 20 |
| 放送関係 | `listeners.stress` | 60 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 講義のノートを取り直した
- 友人からのメッセージを読み返した
- 日記のページを開いた

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `friend` | 親しい友人 | 75 | 64 | 52 | — |
| `brother` | 兄 | 71 | 75 | 14 | `mizuno_brother` |
| `family` | 家族 | 75 | 69 | 26 | — |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `study` | 講義のメモを整理した | `duty` | 14 | `None` | `work` +1、`anxiety` -1 | なし |
| `diary` | 日記に今日の気持ちを一行書いた | `reflection` | 19 | `None` | `anxiety` -2、`hope` +1 | なし |
| `bookshop` | ひとりで本屋を歩いた | `rest` | 14 | `None` | `joy` +2、`leisure` +2 | なし |
| `friendchat` | 友人といつもの雑談をした | `social` | 11 | `friend` | `loneliness` -2、`joy` +1 | なし |
| `brother` | 兄から届いた短いメッセージを読んだ | `social` | 11 | `brother` | `loneliness` -1、`hope` +1 | なし |
| `practice` | 断りたいときの言葉をノートに書いた | `reflection` | 17 | `None` | `hope` +1、`anxiety` +1 | なし |
| `career` | 文章に関わる仕事について少し調べた | `creative` | 12 | `None` | `hope` +2、`leisure` -1 | 第8夜〜 |
| `libraryvisit` | 地域の図書室へ行き、好きな本を探した | `rest` | 15 | `None` | `joy` +1、`leisure` +1 | なし |
| `librarystudy` | 地域の図書室で、レポートの資料を調べた | `duty` | 14 | `None` | `work` +1、`leisure` +1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.fish`、`defaultState().listeners.fish`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

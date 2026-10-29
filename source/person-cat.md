# 夜明けの猫｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：会社員／絵を描く人  
**主題**：仕事の続け方・絵を描く時間・自分で選ぶ未来  
**物語の説明**：上司との相談や退職についての迷い。選択により「描く」「待つ」などの方向が変わる。後年は描かなかった休日も語る。  
**文体ガイド**：落ち着いた丁寧語。迷いを即断せず、自分の感覚を探す。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 28 |
| 性格 | `traits.caution` | 82 |
| 性格 | `traits.sensitivity` | 83 |
| 性格 | `traits.independence` | 42 |
| 感情 | `emotion.joy` | 18 |
| 感情 | `emotion.anxiety` | 65 |
| 感情 | `emotion.anger` | 14 |
| 感情 | `emotion.loneliness` | 42 |
| 感情 | `emotion.hope` | 33 |
| 生活 | `life.work` | 50 |
| 生活 | `life.health` | 61 |
| 生活 | `life.finance` | 58 |
| 生活 | `life.leisure` | 20 |
| 放送関係 | `listeners.trust` | 30 |
| 放送関係 | `listeners.reflection` | 30 |
| 放送関係 | `listeners.agency` | 25 |
| 放送関係 | `listeners.stress` | 65 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 通勤電車で窓の外を眺めた
- 頼まれた仕事を片付けた
- 雨の匂いが残る道を歩いた

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `boss` | 職場の上司 | 54 | 58 | 35 | — |
| `artFriend` | 学生時代の友人 | 59 | 63 | 15 | — |
| `coworker` | 同僚 | 51 | 55 | 20 | `mizuno_brother` |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `work` | 仕事の段取りを一つ見直した | `duty` | 17 | `None` | `work` +1、`anxiety` +1 | なし |
| `rest` | 帰宅後、照明を落としてゆっくり休んだ | `rest` | 15 | `None` | `health` +2、`anxiety` -3 | なし |
| `artlook` | 机の奥のスケッチブックを開いて眺めた | `creative` | 17 | `None` | `hope` +2、`leisure` +1 | なし |
| `cafe` | 帰り道に喫茶店へ寄った | `rest` | 13 | `None` | `joy` +1、`leisure` +2 | なし |
| `askboss` | 上司に仕事の進め方を一つ相談した | `social` | 8 | `boss` | `anxiety` -1、`work` +1 | 第1夜〜 |
| `frienddraft` | 昔の友人に送る文章を下書きした | `reflection` | 12 | `None` | `hope` +1、`anxiety` +1 | 第6夜〜 |
| `draw` | 机に向かって短い線を何本か描いた | `creative` | 12 | `None` | `joy` +3、`hope` +2、`leisure` +1 | 第8夜〜／`flags.catStartedSketch` |
| `flowerstop` | 仕事の帰りに花屋の小さな鉢を眺めた | `rest` | 12 | `None` | `joy` +1、`leisure` +1 | なし |
| `bakery` | 仕事帰りにパン屋へ寄り、夕食のパンを選んだ | `rest` | 15 | `None` | `joy` +1、`leisure` +1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.cat`、`defaultState().listeners.cat`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

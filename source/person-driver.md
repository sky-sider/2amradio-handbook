# 午前3時の配達員｜詳細人物設定

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 基本人物像

**人物の役割**：夜の配送業務  
**主題**：猫主任・妹・職場の仲間・夜の帰り道  
**物語の説明**：配送先や駐車場の猫主任との日常。妹との関係はプレイヤーの選択により異なる。運転中に投稿した設定にしない。  
**文体ガイド**：軽い業務報告調の冗談と親しみある丁寧語。

> **注意**：この人物像は開発用の要約です。進路・家族関係・過去の選択などは、セーブごとの `flags` と紹介履歴が優先されます。

## 内部初期値（コード実数値）

| 指標 | 変数 | 初期値 |
|---|---|---:|
| 性格 | `traits.sociability` | 80 |
| 性格 | `traits.caution` | 53 |
| 性格 | `traits.sensitivity` | 67 |
| 性格 | `traits.independence` | 70 |
| 感情 | `emotion.joy` | 48 |
| 感情 | `emotion.anxiety` | 48 |
| 感情 | `emotion.anger` | 20 |
| 感情 | `emotion.loneliness` | 29 |
| 感情 | `emotion.hope` | 38 |
| 生活 | `life.work` | 72 |
| 生活 | `life.health` | 48 |
| 生活 | `life.finance` | 54 |
| 生活 | `life.leisure` | 38 |
| 放送関係 | `listeners.trust` | 35 |
| 放送関係 | `listeners.reflection` | 40 |
| 放送関係 | `listeners.agency` | 50 |
| 放送関係 | `listeners.stress` | 35 |

数値は0〜100。**放送関係の数値と生活AIの数値は別の状態**です。性格4値は通常固定。感情5値・生活4値・関係値は行動と放送影響で変化します。

## 毎日の基本ルーティン

- 配送車を点検した
- 休憩所で缶コーヒーを買った
- 駐車場の猫主任を見かけた

これらは「朝・日中の情景」に使う候補で、**必ず毎晩全部行う**わけではありません。

## 交流相手と初期状態

| 相手キー | 相手 | 初期親密さ | 信頼 | 緊張 | 外部関連キー |
|---|---|---:|---:|---:|---|
| `sister` | 妹 | 48 | 43 | 73 | — |
| `coworker` | 配送仲間 | 62 | 67 | 19 | — |
| `catBoss` | 猫主任 | 36 | 45 | 0 | — |

実際の交流は関連する `social` 行動が選ばれた場合に発生し、`simMeet` で結果が決まります。交流しただけで自動的に仲直りしません。

## 自律生活の行動候補一覧

| 行動ID | 行動 | 分類 | 基本重み | 対人キー | 差分 | 条件 |
|---|---|---|---:|---|---|---|
| `route` | 翌日の配送ルートを確認した | `duty` | 17 | `None` | `work` +1、`anxiety` -1 | なし |
| `coffee` | 休憩所で温かい缶コーヒーを飲んだ | `rest` | 16 | `None` | `health` +1、`joy` +1 | なし |
| `chief` | 駐車場で猫主任の近くに座ってみた | `social` | 16 | `catBoss` | `joy` +2、`loneliness` -1 | なし |
| `coworker` | 同僚に休憩中の出来事を話した | `social` | 13 | `coworker` | `loneliness` -2、`joy` +1 | なし |
| `sleep` | いつもより長く仮眠を取った | `rest` | 14 | `None` | `health` +3、`anxiety` -2 | なし |
| `sisterdraft` | 妹への短い返事を下書きした | `reflection` | 12 | `None` | `hope` +1、`anxiety` +1 | 第6夜〜 |
| `sisterthink` | 妹と話したころの写真を見つめた | `reflection` | 11 | `None` | `hope` +1、`loneliness` +1 | 第6夜〜 |
| `conveniencestop` | 深夜のコンビニに寄って温かい飲み物を買った | `rest` | 13 | `None` | `health` +1、`joy` +1 | なし |
| `shoproute` | 古い時計店のある通りへ荷物を届けた | `duty` | 15 | `None` | `work` +1、`health` -1 | なし |
| `stationdelivery` | 駅前の配送先へ荷物を届けた | `duty` | 15 | `None` | `work` +1、`health` -1 | なし |

行動は候補表の重みをそのまま抽選するのではなく、現在の感情・生活・記憶・気候・関係などを足してから抽選します。[計算式](simulation.html)を参照。

## 物語・実装の注意

- その夜の投稿に書かれた出来事と、生活内部に存在する出来事を取り違えない。
- 未読の手紙をDJが知っているように書かない。参照根拠は原則 `s.played`。
- 過去章の選択結果を後年の固定文面で強制的に確定しない。
- 口調を個別に校正。自動DJの返答と本人の文体を同一視しない。

## 主要ソース

`listeners.js` の `SIM_PROFILES.driver`、`defaultState().listeners.driver`。関連：`simChooseAction`・`simRegisterAction`・`simMeet`・`applyReply`・`chapter4Letters`。

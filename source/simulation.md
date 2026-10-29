# 12人の自律生活AI

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 実装概要

「自律AI」は外部生成AIを呼ぶ方式ではありません。`SIM_PROFILES`の**行動候補**に性格・感情・生活・交流・習慣・放送の信号・季節などの重みを与え、決定的なハッシュによって行動を選びます。選択結果は日記と記憶に保存されます。

## 人物ごとの行動候補の形

```js
['activityId', '実際に起きた行動', 'category', 基本重み, 'relationKey または null',
 { joy: 1, health: 2 }, '翌日の追伸に使える文章', 開放夜の下限?, 必須フラグ?]
```

カテゴリは `duty`（仕事・用事）、`rest`（休息）、`creative`（創作）、`social`（対人）、`reflection`（考えごと）。**候補の種類・重み・増減は各人物ページに実装値で収録**しています。

## 行動重みの計算 `simCategoryWeight`

| 行動カテゴリ | 影響項目と係数 |
|---|---|
| duty | `(caution−50)×0.09`、仕事値が60超なら+2 |
| rest | `(anxiety−35)×0.10 + (58−health)×0.14` |
| creative | `(hope−40)×0.13 + (leisure−35)×0.10` |
| social | `(sociability−48)×0.14 + (loneliness−35)×0.12`、不安が75超なら−4 |
| reflection | `(sensitivity−55)×0.10 + (anxiety−40)×0.04` |

これに、交流の信頼・緊張、最近の会話結果、活動回数・生活リズム、直近3夜の同一行動ペナルティ、放送による `signals`、重要な記憶、生活余暇の不足などを加算。さらに `lifeDailyActionBias`、`climateActionBias`、`socialActionBias` を加え、候補の最小重みは0.5。

## 再現性と抽選

```js
seed = simHash(`${id}:${night}:${JSON.stringify(p.emotion)}:${JSON.stringify(p.life)}:`
  + `${JSON.stringify(p.signals)}:${JSON.stringify(p.activityCounts)}`);
```

各候補の重みを合計し、ハッシュから得た値で重み付き選択します。**その夜の人物状態が同じなら同じ行動**になります。一方、プレイヤーの返答・天気・過去の生活変化で状態が異なれば結果も変わります。

## 一夜の生活更新 `simulateDailyLives`

1. 同夜が `processedNights` に存在すれば更新しない。
2. 各人の朝の小さな様子・日中のルーティンを決める。
3. 行動候補を抽選し、感情・生活・関係・習慣・記憶に反映する。
4. 天候効果、仕事の負荷、不安・健康の相互作用などを適用。
5. `signals` を毎夜1だけ減衰。`daily` を直近56件に制限。
6. 重要度の低い日常記憶を整理しながら、重要な記憶は優先して保持（概ね45件）。

`memories` は `kind`、`tag`、`importance`、`summary` などの構造。**「今何をしているか」ではなく「実際に起きたこと」を記録**します。

## 追伸の生成

`simLetterPostscript` は前夜に実行された行動が存在するときだけ、ハッシュ確率で実際の行動に紐づく追伸を付けます。`simRelationshipPostscript` も**前夜の交流結果**があるときだけ使います。「行動が候補にあった」だけでは実行されたことにしません。

**主要関数**：`createSimulationState`（listeners.js:169）、`simCategoryWeight`（listeners.js:253）、`simChooseAction`（listeners.js:290）、`simMeet`（listeners.js:299）、`simRegisterAction`（listeners.js:342）、`simulateDailyLives`（listeners.js:363）、`simMemory`（listeners.js:215）、`simLetterPostscript`（listeners.js:393）、`simRelationshipPostscript`（listeners.js:411）

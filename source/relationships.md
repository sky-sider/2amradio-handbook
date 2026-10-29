# 人間関係・生活世界・記憶

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 相手ごとの関係データ

```js
relationships: {
  boss: {
    name: '職場の上司', closeness: 54, trust: 58, tension: 35,
    personKey: null, contactCount: 0, lastContactNight: 0, history: []
  }
}
```

`simMeet()` は実際に対人行動が選ばれたときに実行。評価値は

```text
score = 関係信頼 − 緊張×0.62 + (希望−不安)×0.12
        + (社交性−50)×0.08 + 決定的揺らぎ
```

| 評価値 | 結果 | 関係値の変化 |
|---|---|---|
| 64以上 | warm | 親密さ+2、信頼+2、緊張−2 |
| 40以上 | ordinary | 親密さ+1 |
| 17以上 | guarded | 緊張+1 |
| 17未満 | awkward | 信頼−1、緊張+2 |

さらに交流回数・最後に会った夜・履歴（直近12件）を記録。気まずい会話も、解決せずに記憶として残ります。

## 同じ世界に住む人々

`socialWorld`・`microWorld`・`relationThreads` などは、複数の暮らしが偶然に交差する仕組みです。**同じ日に互いの場所を同時に訪れたことにしない**、接触がなければ会った事実を作らない、という不変条件を守ります。

## 記憶の公開境界

- `privateMemories` と `simState.people[id].memories`：**本人が実際に経験した内部記録**。
- `listeners[id].memories` と `played`：**放送で知り得た事実**の根拠。
- `radioMemory`・`longEcho43`：以前紹介した手紙を後で思い返す材料（使う場合は既読条件を確認）。

「昨日読まなかったお便り」は、翌夜の候補に残ることがあっても、放送で紹介した履歴には入りません。**未紹介＝DJが知った**という判定をしてはいけません。

## 変更時の確認

交流や回想を増やすときは、実行した行動の夜・相手・条件と、そのイベントが局へ公開されたかを別々に監査してください。

**主要関数**：`simMeet`（listeners.js:299）、`socialPairContact`（events.js:874）、`simulateMicroWorld`（events.js:666）、`simulateSocialWorld`（events.js:1007）、`privateRemember`（events.js:11）、`remember`（events.js:4）、`radioMemoryAfterBroadcast39`（events.js:1641）

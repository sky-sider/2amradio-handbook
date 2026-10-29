# 午前二時の周波数 — SOMEWHERE ON AIR｜内部開発資料

ゲーム **v4.9.22** を基準にした、開発参加者向けの静的仕様サイトです（資料版 v1.1）。

## まず読む

- `index.html` : 資料サイトの入口
- `people.html` : 12人の詳細人物設定への入口
- `state.html` / `simulation.html` / `choices.html` : パラメーターと自律生活AI
- `auto-dj.html` : 「聴くだけの夜」の自動DJ採点と返答
- `source-index.html` : v4.9.22の実装関数474件の索引
- `source/` : 編集しやすいMarkdown原稿（原稿を書き換えた場合、HTMLも更新してください）
- `data/listener-profiles.json` : 実コードから抽出した人物プロフィールの機械可読スナップショット

## GitHub Pagesへ公開

1. ZIPを解凍し、**中身を全部リポジトリの最上位に配置**してください。`index.html` が最上位にある必要があります。
2. GitHubの Settings → Pages → Build and deployment → Deploy from a branch を選択。
3. `main` → `/(root)` を選んで保存。
4. `https://ユーザー名.github.io/リポジトリ名/` にアクセス。

`/.nojekyll` を同梱し、サイト内のパスは相対指定です。外部ライブラリやビルドツールは不要です。

## 注意

GitHub Pagesで公開すると原則として誰でも内容を閲覧できます。ユーザーの本物のセーブデータ、APIキー、非公開の素材や個人情報は絶対に置かないでください。このZIPにはゲーム本体の実行用ソース6ファイルは含めていません（**仕様の参照元**としてファイル名と行番号を記載）。

資料本文と人物設定の要約はv4.9.22のコードに照らして作成したスナップショットです。ゲーム本体を更新したら、この資料も再検証してください。全分岐・Android実機の動作保証ではありません。

## シナリオ執筆・人物設定の追補（v1.1）

- `writing-guide.html` と `source/writing-guide.md`：ライター向け制作手順・設定の出典区分。
- `person-*.html` / `source/person-*.md`：12人の人物設定バイブルを拡張。
- `data/writer-profiles.json`：新規執筆の参考用。ゲームで確定したパラメーターではありません。
- GitHub Pagesにアップロードする場合は、**ZIPを展開した中身全部**を元の資料サイトへ上書きアップロード。ゲーム本体は含みません。
- **注意**：ラジオネーム由来・内面など創作案は未確定。監修なくゲームの公式設定として確定させないこと。

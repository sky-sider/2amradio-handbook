# GitHub Pagesへの公開・保守

> **資料基準:** ゲーム v4.9.22 ／ **資料状態:** 実装コードを基準にした開発者向け整理。未検証・提案は明記。

## 公開の前提

このサイトは HTML／CSS／JavaScript だけで動作し、外部CDNやサーバーを使いません。`index.html` と各 `.html` ファイル、`assets/`・`data/` の相対パスを維持して配置してください。**GitHub Pagesは公開用**なので、秘密の内部メモ・実ユーザーのセーブ・APIキーを入れないでください。

## GitHub Pagesで公開

1. GitHubで新しいリポジトリ（例：`radio-2am-devdocs`）を作成。
2. ZIP内の `site/` フォルダーにあるファイルを、リポジトリの**ルート**に配置する。`site` フォルダーごとアップするとトップURLの直下に表示されません。
3. `index.html`、`assets/style.css`、`assets/app.js`、その他の `.html` をコミット。
4. リポジトリの **Settings → Pages** を開く。
5. **Build and deployment → Deploy from a branch** を選び、ブランチ `main`、フォルダー `/ (root)` を指定して保存。
6. 公開URL `https://ユーザー名.github.io/radio-2am-devdocs/` を開く。

GitHubの現在のUIは変更されることがあります。公開作業は利用者のGitHubアカウント側で必要です。

## File not foundが出る場合

- `index.html` の小文字表記を確認。
- `site/index.html` ではなく**リポジトリ直下**に `index.html` を置く。
- ブランチと `/ (root)` を確認。
- `assets/` や `data/` の名前の大文字・小文字を確認。

## 資料更新ワークフロー

1. ゲーム本体のバージョンを更新する。
2. 変更した関数・状態・分岐条件を仕様書へ反映。
3. 各ページの**資料基準版**を新しい版へ更新。
4. 特に `source-index.html` の行番号と `data/listener-profiles.json` の値を再生成。
5. スマホとPCで検索・目次・アンカーをテスト。
6. [変更履歴](changelog.html)へ追加。

## URLとリンク

GitHub Pagesのプロジェクト配下URLに対応するため、サイト内リンクは `flow.html` 等の**相対リンク**を使っています。ドメイン直下固定の `/flow.html` に変更しないでください。

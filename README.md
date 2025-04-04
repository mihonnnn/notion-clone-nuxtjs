# Notion Clone with Nuxt.js

Notion のようなメモアプリケーションのクローンを Nuxt.js と Firebase で構築しています。

## 技術スタック

- Nuxt.js 3
- Vue 3
- TypeScript
- Firebase
  - Firestore
  - Hosting
  - Storage

## プロジェクト構成

```
├── layouts/         # レイアウトコンポーネント
├── pages/          # ページコンポーネント
├── plugins/        # プラグイン（Firebase設定など）
├── public/         # 静的ファイル
└── server/         # サーバーサイドの設定
```

## セットアップ

依存関係のインストール:

```bash
yarn install
```

## 開発サーバーの起動

開発サーバーを起動（`http://localhost:3000`）:

```bash
yarn dev
```

## ビルドとデプロイ

プロダクションビルド:

```bash
yarn build
```

Firebase へのデプロイ:

```bash
yarn deploy
```

## 環境変数

`.env`ファイルに以下の環境変数を設定する必要があります:

```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

## ライセンス

MIT

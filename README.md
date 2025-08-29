
# Twitter Video Rank - Twitter動画保存ランキングサイト

> 人気のTwitter動画をランキング形式で確認し、簡単にダウンロードできるウェブアプリケーション
> アクセス先：[twitter-rank.net](https://twitter-rank.net)

## 🎯 主な機能


### 📊 人気動画ランキング

- **リアルタイムランキング**: ダウンロード数に基づく人気順表示
- **美しいUI**: 現代的なカードレイアウトでの表示
- **サムネイル表示**: 視覚的に分かりやすい動画プレビュー
- **ダウンロード統計**: 各動画のダウンロード回数を表示

### 🔗 Twitter動画保存サイト比較

- **TOP10ランキング**: 主要なTwitter動画保存サイトをランキング形式で紹介
- **詳細情報**: 各サイトの特徴、対応期間、機能の詳細説明
- **外部リンク**: 各サイトへの直接アクセス機能
- **比較機能**: サイト間の機能比較が可能



## 🛠️ 技術スタック

### フロントエンド

- **Next.js 13.5.1** - Reactベースのフルスタックフレームワーク
- **TypeScript** - 型安全なJavaScript開発
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- **Radix UI** - アクセシブルなUIコンポーネントライブラリ

### UIコンポーネント

- **Shadcn/ui** - 美しく機能的なUIコンポーネント
- **Lucide React** - 軽量なSVGアイコンライブラリ
- **Class Variance Authority** - 条件付きスタイリング
- **Tailwind Merge** - Tailwindクラスの最適化

### バックエンド・データ管理

- **Next.js API Routes** - サーバーサイドAPI
- **JSON Database** - 軽量なファイルベースデータベース
- **File System Operations** - Node.jsファイルシステムAPI

### 開発ツール

- **ESLint** - コード品質とスタイルの統一
- **PostCSS** - CSS後処理ツール
- **Autoprefixer** - CSS自動プレフィックス

## 📁 プロジェクト構造

```text
twitter-video/
├── app/                          # Next.js App Router
│   ├── api/                      # API エンドポイント
│   │   ├── videos/route.ts       # 動画データAPI
│   │   ├── sites/route.ts        # サイトデータAPI
│   │   └── blog/route.ts         # ブログAPI
│   ├── blog/page.tsx             # ブログページ
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # メインページ
│   └── globals.css               # グローバルスタイル
├── components/                   # Reactコンポーネント
│   ├── VideoDownloader.tsx       # 動画ダウンローダー
│   ├── Sites.tsx                 # サイトランキング
│   ├── FAQ.tsx                   # よくある質問
│   ├── Header.tsx                # ヘッダー
│   ├── VideoRankings.tsx         # 動画ランキング
│   └── ui/                       # UIコンポーネント
├── data/                         # データ管理
│   └── database.json             # JSONデータベース
├── lib/                          # ユーティリティ
│   ├── database.ts               # データベース操作
│   └── utils.ts                  # 共通ユーティリティ
└── hooks/                        # カスタムフック
    └── use-toast.ts              # トースト通知
```

## 🚀 セットアップ・起動方法

### 必要な環境

- Node.js 18.0 以上
- npm または yarn

### インストール手順

1. **リポジトリのクローン**

```bash
git clone https://github.com/twittervideo/twitter-video-rank.git
cd twitter-video-rank
```

2. **依存関係のインストール**

```bash
npm install
# または
yarn install
```

3. **開発サーバーの起動**

```bash
npm run dev
# または
yarn dev
```

4. **ブラウザでアクセス**

```text
http://localhost:3000
```

### 本番環境への導入

1. **ビルド**

```bash
npm run build
```

2. **本番サーバー起動**

```bash
npm run start
```

## 📊 API エンドポイント

### 動画API

- `GET /api/videos` - 人気動画一覧の取得
- `POST /api/videos` - 新しい動画ダウンロード記録の追加

### サイトAPI

- `GET /api/sites` - Twitter動画保存サイト一覧の取得

### ブログAPI

- `GET /api/blog` - ブログ記事一覧の取得

## 🎨 デザイン特徴

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **グラデーション背景**: 美しいブルー系グラデーション
- **カードレイアウト**: 情報を整理された形で表示
- **ホバーエフェクト**: インタラクティブなユーザー体験
- **アイコン統合**: 直感的な操作のためのアイコン使用

## 🔧 カスタマイズ・拡張

### 新しいUIコンポーネントの追加

```bash
npx shadcn-ui@latest add [component-name]
```

### データベーススキーマの拡張

`lib/database.ts`でインターフェースを更新し、対応するAPI処理を追加

### 新しいページの追加

`app`ディレクトリ内に新しいフォルダとpage.tsxファイルを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストや課題報告は歓迎します。大きな変更を行う前に、まずissueを開いて議論することをお勧めします。

## 📞 サポート・お問い合わせ

- GitHub Issues: [課題報告・機能要望](https://github.com/twittervideo/twitter-video-rank/issues)
- 公式サイト: [Twitter Video Rank](https://your-domain.com)

---

2025年8月 - twitter-rank.net チーム

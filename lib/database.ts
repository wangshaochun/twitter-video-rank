import { Pathway_Gothic_One } from "next/font/google";


export interface VideoRecord {
  id: number;
  url: string;
  title: string;
  thumbnail: string;
  download_count: number;
  created_at: string;
}

export interface SiteRecord {
  id: number;
  url: string;
  title: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  tags: string;
}

interface DatabaseData {
  videos: VideoRecord[]; 
  blogPosts: BlogPost[]; 
}



// 获取初始示例数据
function getInitialData(): DatabaseData {
  return {
    videos: [  ],
    blogPosts: [
      {
        id: 1,
        title: 'python実装twitterビデオダウンロードコード詳細',
        content: `
このコードは、Twitter から動画をダウンロードするための Python 実装です。

## 必要なライブラリ

\`\`\`python
import sys
import os
import requests
import json
import re
from typing import Tuple, List, Dict
from dataclasses import dataclass
from pathlib import Path
import logging
from urllib.parse import urlencode

# ロギングの設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@dataclass
class VideoVariant:
    """異なるビットレートと品質の動画バリアントを表現するデータクラス"""
    bitrate: int  # ビットレート (kbps)
    url: str      # 動画URL
    content_type: str  # コンテンツタイプ (例: video/mp4)


class TwitterAPIError(Exception):
    """Twitter API関連のエラー用カスタム例外クラス"""
    pass


class TwitterAPIClient:
    """Twitter/X APIとの連携用クライアントクラス
    
    このクラスはTwitter/Xプラットフォームとの認証とAPI連携を処理します。
    ベアラートークンの取得、ゲストトークン認証、ツイートデータの取得などを含みます。
    
    属性:
        BASE_URL (str): TwitterのGraphQL APIベースURL
        ACTIVATE_URL (str): ゲストトークン取得用URL
        MAINJS_URL (str): ベアラートークンを含むメインJavaScriptファイルのURL
        session (requests.Session): HTTPリクエスト用セッションオブジェクト
        bearer_token (str): API認証用ベアラートークン
        guest_token (str): API認証用ゲストトークン
    
    メソッド:
        authenticate(): 必要な認証トークンを取得
        get_tweet_details(tweet_id): 特定のツイートの詳細情報を取得
    
    例外:
        TwitterAPIError: APIリクエスト失敗時または認証失敗時
        requests.RequestException: HTTPリクエスト失敗時
    
    使用例:
        client = TwitterAPIClient()
        client.authenticate()
        tweet_data = client.get_tweet_details("1234567890")
    """

    BASE_URL = "https://api.x.com/graphql/OoJd6A50cv8GsifjoOHGfg"
    ACTIVATE_URL = "https://api.twitter.com/1.1/guest/activate.json"
    MAINJS_URL = "https://abs.twimg.com/responsive-web/client-web/main.165ee22a.js"

    def __init__(self):
        """TwitterAPIClientの初期化"""
        self.session = requests.Session()
        self.bearer_token = None
        self.guest_token = None
        self._setup_session()

    def _setup_session(self):
        """リクエストセッションの基本ヘッダーを設定"""
        self.session.headers.update({
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0",
            "accept": "*/*",
            "accept-language": "de,en-US;q=0.7,en;q=0.3",
            "accept-encoding": "gzip, deflate, br",
            "te": "trailers",
        })

    def authenticate(self):
        """認証トークンを取得する"""
        self.bearer_token = self._get_bearer_token()
        self.guest_token = self._get_guest_token()

        # セッションヘッダーをトークンで更新
        self.session.headers.update({
            "authorization": f"Bearer {self.bearer_token}",
            "x-guest-token": self.guest_token
        })

    def _get_bearer_token(self) -> str:
        """メインJSファイルからベアラートークンを抽出"""
        try:
            response = self.session.get(self.MAINJS_URL)
            response.raise_for_status()

            bearer_tokens = re.findall(r'AAAAAAAAA[^"]+', response.text)
            if not bearer_tokens:
                raise TwitterAPIError("メインJSファイルからベアラートークンが見つかりません")

            return bearer_tokens[0]

        except requests.RequestException as e:
            logger.error(f"ベアラートークンの取得に失敗: {e}")
            raise TwitterAPIError(f"ベアラートークンの取得に失敗: {e}")

    def _get_guest_token(self) -> str:
        """ベアラートークンを使用してゲストトークンを取得"""
        try:
            self.session.headers.update({"authorization": f"Bearer {self.bearer_token}"})
            response = self.session.post(self.ACTIVATE_URL)
            response.raise_for_status()

            return response.json()["guest_token"]

        except requests.RequestException as e:
            logger.error(f"ゲストトークンの取得に失敗: {e}")
            raise TwitterAPIError(f"ゲストトークンの取得に失敗: {e}")

    def get_tweet_details(self, tweet_id: str) -> dict:
        """Twitter APIからツイート詳細を取得"""
        try:
            url = self._build_tweet_detail_url(tweet_id)
            response = self.session.get(url)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"ツイート詳細の取得に失敗: {e}")
            raise TwitterAPIError(f"ツイート詳細の取得に失敗: {e}")

    def _build_tweet_detail_url(self, tweet_id: str) -> str:
        """ツイート詳細APIのURLを構築"""
        return f"{self.BASE_URL}/TweetResultByRestId?variables=%7B%22tweetId%22%3A%22{tweet_id}..."


class TwitterVideoDownloader:
    """Twitter動画ダウンロード用メインクラス"""

    def __init__(self):
        self.api_client = TwitterAPIClient()

    def download_video(self, tweet_url: str, output_dir: Path = None):
        """
        ツイートURLから動画をダウンロード

        引数:
            tweet_url: 動画を含むツイートのURL
            output_dir: 動画保存先ディレクトリ（オプション）
        """
        try:
            # 認証設定
            self.api_client.authenticate()

            # ツイート詳細を取得
            tweet_id = self._extract_tweet_id(tweet_url)
            tweet_data = self.api_client.get_tweet_details(tweet_id)

            # 動画バリアントを抽出
            video_variants = self._extract_video_variants(tweet_data)
            if not video_variants:
                raise ValueError("ツイートに動画が見つかりません")

            # 動画をダウンロード
            self._download_video_variants(video_variants, tweet_id, output_dir)

        except Exception as e:
            logger.error(f"動画のダウンロードに失敗: {e}")
            raise

    @staticmethod
    def _extract_tweet_id(tweet_url: str) -> str:
        """ツイートURLからツイートIDを抽出"""
        tweet_id = re.findall(r'(?<=status/)\d+', tweet_url)
        if not tweet_id:
            raise ValueError(f"URLからツイートIDを解析できません: {tweet_url}")
        return tweet_id[0]

    @staticmethod
    def _extract_video_variants(tweet_data: dict) -> List[VideoVariant]:
        """ツイートデータから動画バリアントを抽出"""
        try:
            media = tweet_data["data"]["tweetResult"]["result"]["legacy"]["entities"]["media"][0]
            variants = media["video_info"]["variants"]

            return [
                VideoVariant(
                    bitrate=variant.get("bitrate", 0),
                    url=variant["url"],
                    content_type=variant["content_type"]
                )
                for variant in variants
                if variant["content_type"] == "video/mp4"
            ]
        except (KeyError, IndexError) as e:
            logger.error(f"動画バリアントの抽出に失敗: {e}")
            raise ValueError("ツイートデータから動画情報が見つかりません")

    def _download_video_variants(
            self,
            variants: List[VideoVariant],
            tweet_id: str,
            output_dir: Path = None
    ):
        """
        全ての動画バリアントをダウンロード

        引数:
            variants: ダウンロードする動画バリアントのリスト
            tweet_id: ツイートID
            output_dir: 動画保存先ディレクトリ（オプション）
        """
        output_dir = output_dir or Path.cwd()
        output_dir.mkdir(parents=True, exist_ok=True)

        for variant in variants:
            output_path = output_dir / f"tweet_{tweet_id}_{variant.bitrate}.mp4"
            self._download_file(variant.url, output_path)
            logger.info(f"動画をダウンロードしました: {output_path}")

    @staticmethod
    def _download_file(url: str, output_path: Path):
        """
        URLからファイルをダウンロード（進捗追跡付き）

        引数:
            url: ダウンロードするファイルのURL
            output_path: ファイル保存先パス
        """
        try:
            with requests.get(url, stream=True) as response:
                response.raise_for_status()
                total_size = int(response.headers.get('content-length', 0))
                block_size = 8192

                with open(output_path, 'wb') as f:
                    if total_size == 0:
                        f.write(response.content)
                    else:
                        downloaded = 0
                        for chunk in response.iter_content(chunk_size=block_size):
                            if chunk:
                                f.write(chunk)
                                downloaded += len(chunk)
                                percentage = int((downloaded / total_size) * 100)
                                if percentage % 10 == 0:  # 10%毎にログ出力
                                    logger.info(f"ダウンロード進捗: {percentage}%")

        except requests.RequestException as e:
            logger.error(f"ファイルのダウンロードに失敗: {e}")
            if output_path.exists():
                output_path.unlink()  # 部分的にダウンロードされたファイルを削除
            raise


def main():
    """メイン実行関数"""
    if len(sys.argv) != 2:
        print("使用方法: python twitter_downloader.py <Twitter URL>")
        sys.exit(1)
        
    url = sys.argv[1]
    success = download_twitter_video(url)
    
    if success:
        print("動画のダウンロードが完了しました")
    else:
        print("動画のダウンロードに失敗しました")

if __name__ == "__main__":
    main()
\`\`\`

## 使用方法

1. 必要なライブラリをインストール:
   \`\`\`bash
   pip install requests
   \`\`\`

2. スクリプトを実行:
   \`\`\`bash
   python twitter_downloader.py https://twitter.com/username/status/1234567890
   \`\`\`

## 注意事項

- Twitter の利用規約を遵守してください
- 著作権に注意して使用してください
- 大量のダウンロードは避けてください`,
        author: 'データアナリスト',
        created_at: '2025-09-11T10:00:00Z',
        tags: 'ダウンロード,Twitter,動画'
      },
      {
        id: 2,
        title: 'Twitter Chrome拡張機能おすすめ：動画ダウンロード・ノイズブロック・体験向上・旧版復元',
        content: ` 
Twitterの使用体験を向上させるために、以下の優秀なChromeプラグインをご紹介します。これらのプラグインは動画ダウンロード、ノイズフィルタリング、旧インターフェース復元など、様々な機能を提供し、より快適なTwitterライフを実現します。

## 1. Media Harvest : X (Twitter) Media Downloader

https://chromewebstore.google.com/detail/hpcgabhdlnapolkkjpejieegfpehfdok

**ワンクリックでTwitterから動画と画像をダウンロード**

このアドオンを使用すると、サードパーティーサービスを必要とせずに、Twitter または TweetDeck から動画と画像をワンクリックでダウンロードできます。

**注意：他のダウンロード管理拡張機能をインストールしている場合、競合状態が発生する可能性があります。**

### 提供機能：
- カスタムファイル名
- センシティブコンテンツの自動表示
- キーボードショートカット
- 動画サムネイルのダウンロード

### 提供されない機能：
- ツイートクローリング
- 一括ダウンロード
- ファイル圧縮

*注意：この拡張機能はWebクローラーではありません。*

## 2. Calm Twitter

**心を落ち着かせるためのTwitterタイムライン整理ツール**

この拡張機能は、Twitterタイムラインからトレンド情報を隠し、心を落ち着かせます。

### 主な機能：
- ナビゲーションから不要な項目を非表示
- リプライ、リツイート、いいね、ブックマーク、表示回数の数字を非表示
- サイドバーからトレンド、おすすめフォロー、購読プロンプト、ニュースを非表示
- フォロー・フォロワー数を非表示
- ロゴの横に「Calm」を表示

この拡張機能は設定保存のための権限のみを必要とし、表示・非表示の切り替えのみを行います。

ソースコードはGitHubで公開されています：
https://github.com/yusukesaitoh/calm-twitter

## 3. Old Twitter Layout

**2015年の旧Twitterレイアウトを復元（2025年対応）**

この拡張機能は元のTwitterに CSS を追加するのではなく、完全に異なるクライアントで元の新しいTwitterクライアントを置き換えるため、Twitterの上にスタイルを追加するだけの代替案よりも高速です。この拡張機能を使用するには、Twitterアカウントにログインしている必要があります。

インストール後、https://twitter.com/old/settings にアクセスして、お好みに合わせて設定してください。デフォルトでは時系列タイムラインに切り替わりますが、設定でアルゴリズムタイムラインに戻すことができます。

コードはオープンソースです！https://github.com/dimdenGD/OldTwitter でコードを確認し、問題を報告できます。

### 機能：
- 基本的にTwitterのほぼ全ての機能を実装
- 超高速、多くのページが元のTwitterよりも速く読み込まれる
- カスタムプロフィールリンクカラーサポート
- プロフィールリンクカラーを変更でき、他の拡張機能ユーザーにも表示される
- Twemojiの有効化/無効化、お気に入り（星）をいいね（ハート）に戻す、デフォルトリンクカラーとフォントの変更
- ツイートを開かずに翻訳
- フォロー解除者の確認
- Twitterからすべての分析と追跡を削除
- ダークモードサポート（時間帯に応じたライト/ダークモードの切り替えも可能）
- 特定ユーザーのツイート自動翻訳機能
- 全ての広告を削除
- 動画とGIFの簡単ダウンロード
- 豊富なホットキー
- カスタムCSSサポート

## 4. Control Panel for Twitter

https://chromewebstore.google.com/detail/kpmjjdhbcfebfjgdnpjagcndoelnidfj

**Twitterをより詳細にコントロールし、欠けている機能とUI改善を追加**

### ホームタイムライン機能：
- デフォルトで「フォロー中」（時系列）タイムラインを使用
- 「おすすめ」（アルゴリズム）タイムラインを非表示
- リツイートを別タブで表示
- ブロックまたは非表示にしたアカウントの引用ツイートを非表示
- 特定ツイートの引用を非表示
- 引用ツイートに「この会話を非表示」メニュー項目を追加
- 「新しいツイートを見る」を非表示
- タイムラインで「フォローする人」「話題をフォロー」等を非表示
- 全幅タイムラインコンテンツ（サイドバーを非表示にしてタイムラインコンテンツを全幅化）

### UI改善：
- Xブランディング変更を置換
- ツイート下の視点を非表示
- 通知メニューの「認証済み」タブを非表示
- Twitter Blue認証マークをTwitter Blueアイコンに置換
- Twitter Blueの返信を非表示
- Twitter Blue強制販売を非表示
- 購読サービスを非表示
- 「その他」メニューに「非表示ワードを追加」を追加
- クイックブロック（確認ダイアログをスキップ）
- ユーザープロフィールでリツイートを非表示
- 検索でデフォルトで「最新」タブを使用
- 引用ツイート表示時に被引用ツイートを非表示

### UI調整：
- Chirpフォントを使用しない
- ツイート内の太字・斜体テキストを無効化
- ナビゲーションバーで通常のテキストフォントスタイルを使用
- ナビゲーション密度（快適/コンパクト）
- ドロップダウンメニューで通常のフォントサイズを使用
- フォロワー/フォロー中ボタンの変更（単色/テーマ）

### アルゴリズムコンテンツの削除：
- サイドバーの「話題」「おすすめ」等を非表示
- 「探索」ページのコンテンツを非表示、検索のみに使用
- 「もっと見つける」ツイートを非表示

### 「エンゲージメント」の削減：
- 指標を非表示
- インタラクション減少モード（ツイート下のアクションバーを非表示、返信のみがインタラクション手段）
- ホームタイムラインを無効化（Twitterで時間を浪費しすぎている場合の対策）

### 使用しないUI項目の非表示：
- ツイート下のブックマークボタン
- ツイート下のシェアボタン
- アカウント切り替え
- メッセージドロワー
- 使用しない「その他」メニュー項目を非表示

## まとめ

これらのChromeプラグインを活用することで、Twitterの使用体験を大幅に向上させることができます。ダウンロード機能から環境の最適化まで、ニーズに合わせて選択してご利用ください。各プラグインは異なる目的を持っているため、複数を組み合わせて使用することで、より理想的なTwitter環境を構築できます。
`,
        author: 'データアナリスト',
        created_at: '2025-09-21T17:00:00Z',
        tags: 'Twitter,chrome拡張機能'
      },
      {
        id: 3,
        title: '日本で最もフォロワーの多いX（旧Twitter）ユーザー トップ10（2025年9月時点推定）',
        content: `
日本国内のXユーザー数は約7,500万人を超えており、フォロワー数が多いアカウントは主に芸能人、YouTuber、スポーツ選手、政治家などに集中しています。以下は、Statistaや日本国内のランキングサイト（例: ranking.net、twinavi.jp）に基づく最新データからまとめたトップ10です。

データは2024年3月時点のStatista統計を基に、2025年の更新トレンド（YouTuberの成長や政治家の安定）を加味した推定値です。実際のフォロワー数は変動する可能性があります。

## 日本X（旧Twitter）フォロワー数ランキング トップ10

| 順位 | ユーザー名（@ハンドル） | 推定フォロワー数（万人） | 職業/特徴 |
|------|------------------------|------------------------|-----------|
| 1 | Hitoshi Matsumoto (@matsu_bouzu) | 950 | お笑い芸人（ダウンタウン松本人志） - コメディと社会風刺で長期人気。 |
| 2 | Hiroiki Ariyoshi (@ariyoshihiroiki) | 約800 | お笑い芸人・俳優 - 毒舌トークとバラエティ出演でファン層広い。 |
| 3 | Hikakin (@hikakin) | 約700 | YouTuber - ゲーム・レビュー動画の先駆者、若年層に強い。 |
| 4 | Masahiro Chono (@chono_official) | 約600 | プロレスラー - 格闘技ファンからの支持厚く、イベント告知多め。 |
| 5 | Shinjiro Koizumi (@koizumishinjiro) | 約500 | 政治家（元環境大臣） - 政策発信と若者向けコミュニケーション。 |
| 6 | Ken Shimura (遺族アカウント, @ken_shimura) | 約450 | お笑い芸人（故人アカウント） - 昭和のアイコンとしてファミリー層人気。 |
| 7 | Taro Yamamoto (@taro_yamamoto) | 約400 | 政治家・俳優 - 反体制発言で議論を呼ぶ。 |
| 8 | Yuzuru Hanyu (@YuzuruHanyu) | 約350 | フィギュアスケーター - 引退後も芸術・イベントで注目。 |
| 9 | GACKT (@GACKT) | 約300 | ミュージシャン・俳優 - ロックと多才ぶりでグローバルファン。 |
| 10 | Shohei Ohtani (@shoheiohtani) | 約280 | プロ野球選手 - MLB移籍後、日本人フォロワー急増。 |

## 特徴的な傾向

### 1. エンターテインメント業界の強さ
お笑い芸人、YouTuber、ミュージシャンが上位を占めており、日本のエンターテインメント文化の影響力を示している。

### 2. 世代を超えた人気
昭和の大スター（志村けん）から現代のYouTuber（ヒカキン）まで、幅広い世代に愛されるタレントがランクイン。

### 3. スポーツ選手の国際的活躍
大谷翔平選手のMLBでの活躍により、スポーツ選手のフォロワー数も急増傾向。

### 4. 政治家の発信力
小泉進次郎氏、山本太郎氏など、SNSを積極的に活用する政治家もトップ10入り。

## データの注意点

- 本ランキングは2025年9月時点の推定値です
- フォロワー数は日々変動するため、実際の数値とは異なる場合があります
- 非公開アカウントや企業アカウントは除外しています
- データソースは複数のランキングサイトとStatista統計を参考にしています

## まとめ

日本のX（旧Twitter）ユーザーは、エンターテインメント性の高いコンテンツを好む傾向があり、お笑い芸人やYouTuberが強い影響力を持っています。また、国際的に活躍するスポーツ選手や、SNSを積極活用する政治家も注目を集めています。

これらのトップユーザーの投稿内容や発信方法は、日本のSNSマーケティングやコンテンツ戦略を考える上で重要な参考になるでしょう。
`,
        author: 'データアナリスト',
        created_at: '2025-09-23T10:00:00Z',
        tags: 'X,Twitter,ランキング,フォロワー,日本'
      }
    ]
  };
}


// 直接返回初始数据，不做持久化
function loadData(): DatabaseData {
  return getInitialData();
}
 

// 获取热门视频
export async function getTopVideos(limit: number = 20): Promise<VideoRecord[]> {
  const data = loadData();
  return data.videos
    .sort((a, b) => b.download_count - a.download_count)
    .slice(0, limit);
}


// 获取站点记录
export async function getSites(limit: number = 20): Promise<SiteRecord[]> {
  // 返回示例数据，因为 DatabaseData 中没有 sites 属性
  return [
    {
      id: 1,
      url: 'https://example.com',
      title: 'Example Site',
      description: 'An example site description'
    }
  ].slice(0, limit);
}


// 获取博客文章
export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = loadData();
  return data.blogPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}


import path from 'path';
import fs from 'fs/promises';

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
  lastVideoId: number; 
  lastBlogId: number;
}

let cachedData: DatabaseData | null = null;
const DB_FILE_PATH = path.join(process.cwd(), 'data', 'database.json');

// 获取初始示例数据
function getInitialData(): DatabaseData {
  return {
    videos: [
      {
        id: 1,
        url: 'https://twitter.com/i/status/1234567890',
        title: '面白いネコの動画',
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300',
        download_count: 1250,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        url: 'https://twitter.com/i/status/1234567891',
        title: '桜の美しい景色',
        thumbnail: 'https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=300',
        download_count: 980,
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        url: 'https://twitter.com/i/status/1234567892',
        title: 'おいしい料理のレシピ',
        thumbnail: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300',
        download_count: 875,
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        url: 'https://twitter.com/i/status/1234567893',
        title: '東京の夜景',
        thumbnail: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=300',
        download_count: 756,
        created_at: new Date().toISOString()
      },
      {
        id: 5,
        url: 'https://twitter.com/i/status/1234567894',
        title: 'かわいい子犬',
        thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300',
        download_count: 694,
        created_at: new Date().toISOString()
      }
    ],
    blogPosts: [
      {
        id: 1,
        title: 'python実装twitterビデオダウンロードコード詳細',
        content: `
          <pre>import sys
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
    """メインエントリーポイント"""
    if len(sys.argv) != 2:
        print("使用方法: python script.py <tweet_url>")
        sys.exit(1)

    tweet_url = sys.argv[1]
    downloader = TwitterVideoDownloader()

    try:
        downloader.download_video(tweet_url)
        logger.info("動画ダウンロードが正常に完了しました")
    except Exception as e:
        logger.error(f"動画のダウンロードに失敗: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
    </pre> `,
        author: 'データアナリスト',
        created_at: new Date().toISOString(),
        tags: 'ダウンロード,Twitter,動画'
      }
    ],
    lastVideoId: 5,
    lastBlogId: 1
  };
}

// 确保数据目录存在
async function ensureDataDirectory(): Promise<void> {
  const dataDir = path.dirname(DB_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// 从文件读取数据
async function loadData(): Promise<DatabaseData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    await ensureDataDirectory();
    const fileContent = await fs.readFile(DB_FILE_PATH, 'utf-8');
    cachedData = JSON.parse(fileContent);
    return cachedData!;
  } catch (error) {
    // 如果文件不存在或格式错误，返回初始数据
    console.log('Creating new database file with initial data');
    cachedData = getInitialData();
    await saveData(cachedData);
    return cachedData;
  }
}

// 保存数据到文件
async function saveData(data: DatabaseData): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  cachedData = data;
}

// 初始化数据库（兼容原有接口）
export async function initDatabase(): Promise<void> {
  await loadData();
}

// 获取热门视频
export async function getTopVideos(limit: number = 20): Promise<VideoRecord[]> {
  const data = await loadData();
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
  const data = await loadData();
  return data.blogPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// 添加视频下载记录
export async function addVideoDownload(url: string, title: string, thumbnail?: string): Promise<void> {
  const data = await loadData();
  
  // 检查是否已存在该视频
  const existingVideoIndex = data.videos.findIndex(video => video.url === url);
  
  if (existingVideoIndex !== -1) {
    // 如果存在，增加下载次数
    data.videos[existingVideoIndex].download_count += 1;
  } else {
    // 如果不存在，添加新视频
    const newVideo: VideoRecord = {
      id: data.lastVideoId + 1,
      url,
      title,
      thumbnail: thumbnail || '',
      download_count: 1,
      created_at: new Date().toISOString()
    };
    data.videos.push(newVideo);
    data.lastVideoId += 1;
  }
  
  await saveData(data);
}
'use client';

import VideoDownloader from '@/components/VideoDownloader';
import Sites from '@/components/Sites';
import Precautions from '@/components/Precautions';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Twitter保存ランキング
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            みんながダウンロード保存した人気のツイッター動画
          </p>
          <p className="text-lg text-blue-600 font-medium">
            twitterの人気動画を見る
          </p>
        </div>

        {/* Video Downloader */}
        <div className="mb-6">
          <VideoDownloader />
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          {/* Sites */}
          <div>
            <Sites />
          </div>

          {/* Precautions */}
          <div>
            <Precautions />
          </div>

          {/* FAQ */}
          <div>
            <FAQ />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            なぜ当サービスを選ぶべきか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高速ダウンロード</h3>
              <p className="text-gray-600">最新技術により、高速でスムーズなダウンロードを実現</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">安全なサービス</h3>
              <p className="text-gray-600">プライバシーを保護し、安全にご利用いただけます</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">人気ランキング</h3>
              <p className="text-gray-600">トレンドの動画を確認して、話題のコンテンツを発見</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
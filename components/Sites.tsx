'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface SiteRecord {
  id: number;
  url: string;
  title: string;
  description: string;
}

export default function SiteRankings() { 
  const [loading] = useState(true);

  useEffect(() => { 
  }, []);
 
  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-blue-500 text-white';
  };

 

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <TrendingUp className="h-5 w-5" />
          <span>2025年Twitter動画保存ランキングサイトTOP10</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* サイト1: TWIVIDEO */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge className={getRankBadgeColor(1)}>1位</Badge>
                <h3 className="text-lg font-semibold text-gray-800">TWIVIDEO</h3>
              </div> 
            </div>
            <p className="text-gray-600 mb-2">
              「TWIVIDEO」は24時間、3日間と1週間のTwitter保存ランキングをまとめているサイト。直接動画やGIFをダウンロード可能。
            </p>
            <p className="text-sm text-blue-600 mb-2">
              Webサイトアドレス：<a href="https://twivideo.net/?ranking" target="_blank" rel="noopener noreferrer">https://twivideo.net/?ranking</a>
             </p>
            <p className="text-sm text-blue-600 mb-2">
              新着DL:<a href="https://twivideo.net/?realtime" target="_blank" rel="noopener noreferrer">https://twivideo.net/?realtime</a>
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />24時間・3日・1週間</span>
              <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />GIF対応</span>
            </div>
          </div>
          {/* サイト2: TWIIGLE */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge className={getRankBadgeColor(2)}>2位</Badge>
                <h3 className="text-lg font-semibold text-gray-800">TWIIGLE</h3>
              </div> 
            </div>
            <p className="text-gray-600 mb-2">
              「TWIIGLE」は24時間～1年間の幅広い期間のランキングを提供。「急上昇」「リアタイ」「裏垢」などの分類も充実。
            </p>
            <p className="text-sm text-blue-600 mb-2">
               Webサイトアドレス：<a href="https://twiigle.com/" target="_blank" rel="noopener noreferrer">https://twiigle.com/</a> 
            </p>
             <p className="text-sm text-blue-600 mb-2">
              新着DL：<a href="https://twiigle.com/realtime.html" target="_blank" rel="noopener noreferrer">https://twiigle.com/realtime.html</a>
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />最大1年間</span>
              <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />豊富な分類</span>
            </div>
          </div> \
          {/* サイト3: ssstwitter */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge className={getRankBadgeColor(3)}>3位</Badge>
                <h3 className="text-lg font-semibold text-gray-800">ssstwitter</h3>
              </div> 
            </div>
            <p className="text-gray-600 mb-2">
              一つの動画をダウンロードしたり、TwitterビデオをMP3に変換したりして、その使いやすさを確認できます。
            </p>
            <p className="text-sm text-blue-600 mb-2">
               Webサイトアドレス：<a href="https://ssstwitter.com/download-twitter-mp3" target="_blank" rel="noopener noreferrer">https://ssstwitter.com/download-twitter-mp3</a>  
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />動画ダウンロード</span>
              <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />MP3変換機能</span>
            </div>
          </div>   
          {/* サイト4: TwiHub2 */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge className={getRankBadgeColor(4)}>4位</Badge>
                <h3 className="text-lg font-semibold text-gray-800">TwiHub2（ツイハバ）</h3>
              </div>
              
            </div>
            <p className="text-gray-600 mb-2">
              「TwiHub2」は24時間、3日間、1週間のランキングに加え、殿堂入り・過去・お気に入りランキングも提供。
            </p>
            <p className="text-gray-600 mb-2">
              「TwiHub2」は24時間、3日間、1週間のランキングに加え、殿堂入り・過去・お気に入りランキングも提供。
            </p>
            <p className="text-sm text-blue-600 mb-2">
              注意：クリックすると常に広告が表示され、そのまま閉じることができます
            </p>
            <p className="text-sm text-blue-600 mb-2">
              新着DL：<a href="https://twihub.net/?type=realtime" target="_blank" rel="noopener noreferrer">https://twihub.net/?type=realtime</a>
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />24時間・3日・1週間</span>
              <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />殿堂入りランキング</span>
            </div>
          </div>

          {/* サイト6: Twihozon */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge className={getRankBadgeColor(6)}>6位</Badge>
                <h3 className="text-lg font-semibold text-gray-800">Twihozon</h3>
              </div>
             
            </div>
            <p className="text-gray-600 mb-2">
              「Twihozon」はランキング確認と動画保存の両方に対応。Mac、Windows、Android、iPhoneなどすべての端末で利用可能。
            </p>
            <p className="text-sm text-blue-600 mb-2">
              Webサイトアドレス：<a href="https://www.twihozon.com/" target="_blank" rel="noopener noreferrer">https://www.twihozon.com/</a>    
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />24時間・1週間・1ヶ月</span>
              <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />保存機能付き</span>
            </div>
          </div> 
          {/* サイト10: Twitter Video Downloader */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge className={getRankBadgeColor(10)}>10位</Badge>
                <h3 className="text-lg font-semibold text-gray-800">Twitter Video Downloader</h3>
              </div>
             
            </div>
            <p className="text-gray-600 mb-2">
              TwitterからMP4形式で動画をダウンロードし、高画質フォーマットの選択も提供します。
            </p>
            <p className="text-sm text-blue-600 mb-2">
              Webサイトアドレス：<a href="https://twittervideodownloader.com/" target="_blank" rel="noopener noreferrer">https://twittervideodownloader.com/</a>   
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />MP4ダウンロード</span>
              <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />高画質対応</span>
            </div>
          </div> 
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Twitter動画保存ランキングサイトについて</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              これらのサイトでは、TwitterやX（旧Twitter）で人気の動画コンテンツをランキング形式で確認できます。
              24時間、1週間、1ヶ月など様々な期間でのランキングが提供されており、
              トレンドの動画や話題の動画を簡単に見つけることができます。
              また、多くのサイトで動画のダウンロード・保存機能も利用可能です。
            </p>
          </div>
        </div>
      </CardContent> 
    </Card>
  );
}
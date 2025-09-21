'use client';

import { useState } from 'react';
import { Download, Link as LinkIcon, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadInfo] = useState<any>(null);

  const handleDownload = async () => {
    if (!url || !url.includes('twitter.com')) {
      alert('有効なTwitter URLを入力してください');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate video processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract video info (simulated)
      const videoInfo = {
        title: 'Twitter動画',
        thumbnail: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=300',
        formats: [
          { quality: '720p', size: '15.2 MB', url: '#' },
          { quality: '480p', size: '8.7 MB', url: '#' },
          { quality: '360p', size: '5.3 MB', url: '#' }
        ]
      }; 
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('ダウンロードに失敗しました。再試行してください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormatDownload = (format: any) => {
    // In a real implementation, this would trigger the actual download
    alert(`${format.quality} (${format.size}) のダウンロードを開始します`);
  };

  return (
    <div className="space-y-6">
      {/* Download Input */}
      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <PlayCircle className="h-5 w-5" />
            <span>Twitter動画ダウンローダー</span>
          </CardTitle>
          <CardDescription className="text-blue-700">
            TwitterのURLを貼り付けて、動画をダウンロードしてください
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="url"
                placeholder="TwitterのURLを貼り付け（例：https://twitter.com/username/status/...）"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={handleDownload}
              disabled={isLoading || !url}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 text-base"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>処理中...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>ダウンロード</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Download Results */}
      {downloadInfo && (
        <Card className="border-green-200 shadow-lg animate-in fade-in-50 duration-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-green-900">ダウンロード準備完了</CardTitle>
            <CardDescription className="text-green-700">
              お好みの画質を選択してダウンロードしてください
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {downloadInfo.formats.map((format: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{format.quality}</h3>
                      <p className="text-sm text-gray-500">{format.size}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      format.quality === '720p' 
                        ? 'bg-blue-100 text-blue-800' 
                        : format.quality === '480p'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {format.quality === '720p' ? 'HD' : format.quality === '480p' ? '標準' : '軽量'}
                    </span>
                  </div>
                  <Button
                    onClick={() => handleFormatDownload(format)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    ダウンロード
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
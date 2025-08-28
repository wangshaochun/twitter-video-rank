'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTopVideos, VideoRecord } from '@/lib/database';

export default function VideoRankings() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const topVideos = await getTopVideos(20);
      setVideos(topVideos);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-blue-500 text-white';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>人気動画ランキング</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-24 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <TrendingUp className="h-5 w-5" />
          <span>人気動画ランキング TOP 20</span>
        </CardTitle>
        <CardDescription className="text-blue-700">
          ダウンロード数に基づく人気の動画ランキングです
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {videos.map((video, index) => {
            const rank = index + 1;
            return (
              <div
                key={video.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  <Badge className={`${getRankBadgeColor(rank)} text-sm font-bold min-w-[2rem] h-8 flex items-center justify-center`}>
                    {rank}
                  </Badge>
                </div>

                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={video.thumbnail || 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={video.title}
                    className="w-20 h-12 object-cover rounded-md border border-gray-200"
                  />
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{video.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.download_count.toLocaleString()} ダウンロード</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(video.created_at).toLocaleDateString('ja-JP')}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>表示</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Eye, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface VideoRecord {
  id: number;
  url: string;
  title: string;
  thumbnail: string;
  download_count: number;
  created_at: string;
}

export default function VideoRankings() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await fetch('/api/videos?limit=20');
      if (response.ok) {
        const topVideos = await response.json();
        setVideos(topVideos);
      } else {
        console.error('Failed to fetch videos');
      }
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
          <span>24時間 twitter 保存 ランキング</span>
        </CardTitle>
        {/* <CardDescription className="text-blue-700">
          24時間 twitter 保存 ランキング
        </CardDescription> */}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((video, index) => {
            const rank = index + 1;
            return (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block rounded-lg border transition-all duration-200 hover:shadow-lg overflow-hidden ${
                  rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                }`}
                title={video.title}
              >
                <div className="relative w-full aspect-video bg-gray-100">
                  <img
                    src={video.thumbnail || 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={video.title}
                    className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                  />
                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getRankBadgeColor(rank)} text-xs font-bold min-w-[2rem] h-7 flex items-center justify-center shadow-md`}>
                      {rank}
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 truncate" title={video.title}>{video.title}</h3>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
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
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
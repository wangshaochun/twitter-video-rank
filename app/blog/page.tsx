'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, User, Tag, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  tags: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const blogPosts = await response.json();
        setPosts(blogPosts);
      } else {
        console.error('Failed to fetch blog posts');
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">日記</h1>
            <p className="text-xl text-gray-600">Twitter動画ダウンロードに関する最新記事とお知らせ</p>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            日記
          </h1>
          <p className="text-xl text-gray-600">
            Twitter動画ダウンロードに関する最新記事とお知らせ
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="block"
            >
              <Card className="shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-start space-x-2 text-blue-900">
                    <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{post.title}</span>
                  </CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-4 text-blue-700">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(post.created_at).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">記事がありません</h2>
            <p className="text-gray-600">まだ記事が投稿されていません。しばらくお待ちください。</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-4">Twitter動画をダウンロードしてみませんか？</h2>
              <p className="text-blue-100 mb-6">
                簡単、高速、安全なダウンロードサービスをご利用ください
              </p>
              <a
                href="/"
                className="inline-block bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                ホームページへ戻る
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
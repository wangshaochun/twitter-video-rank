import { CalendarDays, User, Tag, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBlogPosts, BlogPost } from '@/lib/database';

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
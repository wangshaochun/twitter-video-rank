import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CalendarDays, User, Tag, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServerMarkdownRenderer from '@/components/ServerMarkdownRenderer';
import { getBlogPosts, BlogPost } from '@/lib/database';

import dynamic from 'next/dynamic';
const DynamicShareButtons = dynamic(() => import('@/components/ShareButtons'), { ssr: false });

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find(post => post.id === parseInt(id));
  return post || null;
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-[1200px] max-w-5xl">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-start space-x-2 text-blue-900">
              <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">{post.title}</span>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-blue-700 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(post.created_at).toISOString().split('T')[0]}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6"> 
           <ServerMarkdownRenderer content={post.content} /> 
            {post.tags && (
              <div className="flex items-center space-x-2 mt-6">
                <Tag className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 分享按钮 - 客户端组件 */}
            <DynamicShareButtons title={post.title} />
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
          <a href="/blog" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">一覧へ戻る</a>
        </div>
      </div>
    </div>
  );
}

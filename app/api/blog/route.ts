import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/database';

// 强制该路由为动态，防止静态生成时出错
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const posts = await getBlogPosts();
    if (id) {
      const post = posts.find((p: any) => String(p.id) === id);
      if (!post) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/database';

// 强制该路由为动态，防止静态生成时出错
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

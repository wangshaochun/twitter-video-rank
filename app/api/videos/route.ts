import { NextRequest, NextResponse } from 'next/server';
import { getTopVideos, addVideoDownload } from '@/lib/database';

// 强制该路由为动态，防止静态生成时出错
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const videos = await getTopVideos(limit);
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, title, thumbnail } = await request.json();
    
    if (!url || !title) {
      return NextResponse.json(
        { error: 'URL and title are required' },
        { status: 400 }
      );
    }
    
    await addVideoDownload(url, title, thumbnail);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding video download:', error);
    return NextResponse.json(
      { error: 'Failed to add video download' },
      { status: 500 }
    );
  }
}

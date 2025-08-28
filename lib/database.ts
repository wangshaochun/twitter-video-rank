let SQL: any = null;
let db: any = null;

export interface VideoRecord {
  id?: number;
  url: string;
  title: string;
  thumbnail: string;
  download_count: number;
  created_at: string;
}

export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  tags: string;
}

// Initialize database
export async function initDatabase() {
  if (SQL && db) return { SQL, db };

  try {
    const SQLJs = await import('sql.js');
    SQL = await SQLJs.default({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`
    });

    // Check if there's existing data in localStorage
    const existingData = localStorage.getItem('twitterSaveDB');
    
    if (existingData) {
      const buffer = new Uint8Array(JSON.parse(existingData));
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
      
      // Create tables
      db.run(`
        CREATE TABLE IF NOT EXISTS videos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          thumbnail TEXT,
          download_count INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          author TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          tags TEXT
        )
      `);

      // Insert sample data
      insertSampleData();
      saveDatabase();
    }

    return { SQL, db };
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

function insertSampleData() {
  if (!db) return;

  // Sample video data
  const sampleVideos = [
    { url: 'https://twitter.com/i/status/1234567890', title: '面白いネコの動画', thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 1250 },
    { url: 'https://twitter.com/i/status/1234567891', title: '桜の美しい景色', thumbnail: 'https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 980 },
    { url: 'https://twitter.com/i/status/1234567892', title: 'おいしい料理のレシピ', thumbnail: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 875 },
    { url: 'https://twitter.com/i/status/1234567893', title: '東京の夜景', thumbnail: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 756 },
    { url: 'https://twitter.com/i/status/1234567894', title: 'かわいい子犬', thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 694 },
    { url: 'https://twitter.com/i/status/1234567895', title: '日本の伝統文化', thumbnail: 'https://images.pexels.com/photos/161282/cherry-blossom-tree-flowers-pink-161282.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 623 },
    { url: 'https://twitter.com/i/status/1234567896', title: 'アニメキャラクター', thumbnail: 'https://images.pexels.com/photos/3811089/pexels-photo-3811089.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 587 },
    { url: 'https://twitter.com/i/status/1234567897', title: '日本の風景', thumbnail: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 534 },
    { url: 'https://twitter.com/i/status/1234567898', title: '音楽パフォーマンス', thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 489 },
    { url: 'https://twitter.com/i/status/1234567899', title: 'スポーツハイライト', thumbnail: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 445 },
    { url: 'https://twitter.com/i/status/1234567800', title: '日本の食文化', thumbnail: 'https://images.pexels.com/photos/792028/pexels-photo-792028.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 398 },
    { url: 'https://twitter.com/i/status/1234567801', title: '技術革新', thumbnail: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 356 },
    { url: 'https://twitter.com/i/status/1234567802', title: 'ファッショントレンド', thumbnail: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 312 },
    { url: 'https://twitter.com/i/status/1234567803', title: '自然の美しさ', thumbnail: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 289 },
    { url: 'https://twitter.com/i/status/1234567804', title: 'アートとクリエイティビティ', thumbnail: 'https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 245 },
    { url: 'https://twitter.com/i/status/1234567805', title: '日本の季節', thumbnail: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 223 },
    { url: 'https://twitter.com/i/status/1234567806', title: 'ゲームプレイ', thumbnail: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 198 },
    { url: 'https://twitter.com/i/status/1234567807', title: '教育コンテンツ', thumbnail: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 176 },
    { url: 'https://twitter.com/i/status/1234567808', title: 'コメディ動画', thumbnail: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 154 },
    { url: 'https://twitter.com/i/status/1234567809', title: 'ライフスタイル', thumbnail: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300', download_count: 132 }
  ];

  sampleVideos.forEach(video => {
    db.run(
      'INSERT OR IGNORE INTO videos (url, title, thumbnail, download_count) VALUES (?, ?, ?, ?)',
      [video.url, video.title, video.thumbnail, video.download_count]
    );
  });

  // Sample blog posts
  const samplePosts = [
    {
      title: 'Twitterから動画をダウンロードする方法',
      content: 'Twitterの動画をダウンロードする簡単な手順を紹介します。まず、動画のURLをコピーして...',
      author: '管理者',
      tags: 'ダウンロード,Twitter,動画'
    },
    {
      title: '人気動画の傾向分析',
      content: '最近の人気動画のトレンドを分析しました。ネコの動画が特に人気で...',
      author: 'データアナリスト',
      tags: '分析,トレンド,人気'
    },
    {
      title: '新機能のお知らせ',
      content: '新しい機能を追加しました。高画質でのダウンロードが可能になり...',
      author: '開発チーム',
      tags: '機能,アップデート,お知らせ'
    }
  ];

  samplePosts.forEach(post => {
    db.run(
      'INSERT INTO blog_posts (title, content, author, tags) VALUES (?, ?, ?, ?)',
      [post.title, post.content, post.author, post.tags]
    );
  });
}

function saveDatabase() {
  if (!db) return;
  
  const data = db.export();
  const buffer = Array.from(data);
  localStorage.setItem('twitterSaveDB', JSON.stringify(buffer));
}

export async function getTopVideos(limit: number = 20): Promise<VideoRecord[]> {
  const { db } = await initDatabase();
  
  const stmt = db.prepare('SELECT * FROM videos ORDER BY download_count DESC LIMIT ?');
  const result = stmt.getAsObject([limit]);
  const videos: VideoRecord[] = [];
  
  while (stmt.step()) {
    const row = stmt.getAsObject();
    videos.push(row as VideoRecord);
  }
  
  stmt.free();
  return videos;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { db } = await initDatabase();
  
  const stmt = db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC');
  const posts: BlogPost[] = [];
  
  while (stmt.step()) {
    const row = stmt.getAsObject();
    posts.push(row as BlogPost);
  }
  
  stmt.free();
  return posts;
}

export async function addVideoDownload(url: string, title: string, thumbnail?: string): Promise<void> {
  const { db } = await initDatabase();
  
  // Check if video exists
  const checkStmt = db.prepare('SELECT id, download_count FROM videos WHERE url = ?');
  checkStmt.bind([url]);
  
  if (checkStmt.step()) {
    const row = checkStmt.getAsObject();
    // Update download count
    db.run('UPDATE videos SET download_count = download_count + 1 WHERE id = ?', [row.id]);
  } else {
    // Insert new video
    db.run(
      'INSERT INTO videos (url, title, thumbnail, download_count) VALUES (?, ?, ?, 1)',
      [url, title, thumbnail || '']
    );
  }
  
  checkStmt.free();
  saveDatabase();
}
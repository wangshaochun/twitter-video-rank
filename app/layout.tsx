import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto-sans-jp' });

export const metadata: Metadata = {
  title: 'Twitter保存ランキング - 動画ダウンロード＆人気ランキング',
  description: 'Twitter動画を簡単にダウンロード。人気動画のランキングも確認できます。安全で高速なダウンロードサービス。',
  keywords: 'Twitter, 動画, ダウンロード, ランキング, 保存',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className={`${notoSansJP.className} bg-gray-50 min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-500">
                © 2025 Twitter保存ランキング. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                著作権を尊重し、適切にご利用ください。
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
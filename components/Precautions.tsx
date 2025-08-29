'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const precautionsData = [
  {
    title: '著作権侵害',
    icon: '⚠️',
    color: '',
    content: 'Twitter動画の中には著作権で守られているものがたくさんあります。作者の許可なしにダウンロードして使うのは法律違反になっちゃいます。ダウンロードする前に、その動画が本当に大丈夫かどうか確認してくださいね。怪しいと思ったらやめておきましょう。'
  },
  {
    title: 'ウイルス感染',
    icon: '🦠',
    color: '',
    content: '悪質なサイトでは、ウイルスが仕込まれた動画が配信されることがあります。そんな動画を再生すると、スマホやパソコンがウイルスに感染して、大切な個人情報が盗まれたり、システムが壊れたりする危険性があります。信頼できるサイトだけを使って、セキュリティソフトも最新版にしておきましょう。'
  },
  {
    title: '成人向けコンテンツ',
    icon: '🔞',
    color: '',
    content: 'Twitter動画ランキングサイトには、ちょっと刺激的な内容や成人向けの動画が多く含まれています。大人向けの広告もよく表示されます。なので、未成年の方にはおすすめできません。ご注意ください。'
  },
  {
    title: 'プライバシー侵害',
    icon: '🕵️',
    color: '',
    content: 'サイトによっては、あなたがどんな動画を見たか、どんな情報を入力したかを密かに記録している場合があります。それが悪用される可能性もゼロではありません。利用する前に、プライバシーポリシーをしっかり読んで、安心できるサイトかどうか確認しましょう。'
  }
];

export default function Precautions() {
  const [openItems, setOpenItems] = useState<number[]>([0, 1, 2, 3]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
        <CardTitle className="flex items-center space-x-2 text-red-900">
          <AlertTriangle className="h-5 w-5" />
          <span>Twitter動画保存ランキングサイトを使用するときの注意点</span>
        </CardTitle>
        <CardDescription className="text-red-700">
          Twitter動画保存ランキングサイトは便利ですが、利用にあたって気をつけるべきポイントがあります
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {precautionsData.map((item, index) => (
            <Collapsible key={index} open={openItems.includes(index)}>
              <CollapsibleTrigger
                onClick={() => toggleItem(index)}
                className={`flex items-center justify-between w-full text-left p-4 rounded-lg border ${item.color} hover:opacity-80 transition-all`}
                data-state={openItems.includes(index) ? "open" : "closed"}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-gray-900">{index + 1}. {item.title}</span>
                </div>
                {openItems.includes(index) ? (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4" data-state={openItems.includes(index) ? "open" : "closed"}>
                <div className="pt-2 text-gray-700 leading-relaxed pl-10">
                  {item.content}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💡</span>
            <p className="text-gray-800 font-medium">
              これらの注意点を守って、安全にTwitter動画保存ランキングサイトを楽しみましょう！
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

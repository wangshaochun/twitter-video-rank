'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const faqData = [
  {
    question: 'Twitter動画をダウンロードするのは合法ですか？',
    answer: '個人的な使用目的であれば、一般的に問題ありません。ただし、著作権で保護されたコンテンツの場合、権利者の許可なく再配布することは違法です。常に著作権を尊重し、適切な使用を心がけてください。'
  },
  {
    question: 'どのような動画形式でダウンロードできますか？',
    answer: '通常、MP4形式で複数の画質（360p、480p、720p、1080p）でダウンロード可能です。利用可能な画質は元の動画によって異なります。'
  },
  {
    question: 'ダウンロードした動画が再生されません',
    answer: 'ダウンロードが完了していない可能性があります。また、使用しているメディアプレーヤーがその形式に対応していない場合があります。VLCメディアプレーヤーなどの汎用プレーヤーを使用してみてください。'
  },
  {
    question: 'プライベートアカウントの動画もダウンロードできますか？',
    answer: 'いいえ、プライベートアカウントの動画はダウンロードできません。公開されている動画のみダウンロード可能です。'
  },
  {
    question: 'ダウンロードに時間制限はありますか？',
    answer: '通常、1日あたりのダウンロード数に制限を設けている場合があります。大量のダウンロードを行う場合は、時間を空けて実行してください。'
  },
  {
    question: 'モバイルデバイスでもダウンロードできますか？',
    answer: 'はい、スマートフォンやタブレットからもダウンロード可能です。ただし、デバイスによってはダウンロード先の指定に制限がある場合があります。'
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0, 1, 2, 3, 4, 5]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="flex items-center space-x-2 text-purple-900">
          <HelpCircle className="h-5 w-5" />
          <span>よくある質問</span>
        </CardTitle>
        <CardDescription className="text-purple-700">
          Twitter動画ダウンロードに関するよくある質問と回答
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <Collapsible key={index} open={openItems.includes(index)}>
              <CollapsibleTrigger
                onClick={() => toggleItem(index)}
                className="flex items-center justify-between w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                data-state={openItems.includes(index) ? "open" : "closed"}
              >
                <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4" data-state={openItems.includes(index) ? "open" : "closed"}>
                <div className="pt-2 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

interface ServerMarkdownRendererProps {
  content: string;
}

async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  
  return processedContent.toString();
}

const ServerMarkdownRenderer: React.FC<ServerMarkdownRendererProps> = async ({ content }) => {
  const htmlContent = await processMarkdown(content);
  
  return (
    <div 
      className="prose prose-lg max-w-none
        [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:border-b [&>h1]:border-gray-200 [&>h1]:pb-2 [&>h1:first-child]:mt-0
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h2]:border-b [&>h2]:border-gray-100 [&>h2]:pb-1
        [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-5 [&>h3]:mb-2
        [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-900 [&>h4]:mt-4 [&>h4]:mb-2
        [&>p]:text-gray-800 [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-base
        [&>ul]:list-disc [&>ul]:list-inside [&>ul]:text-gray-800 [&>ul]:mb-4 [&>ul]:space-y-1 [&>ul]:ml-4
        [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:text-gray-800 [&>ol]:mb-4 [&>ol]:space-y-1 [&>ol]:ml-4
        [&>li]:text-gray-800 [&>li]:leading-relaxed
        [&>strong]:font-semibold [&>strong]:text-gray-900
        [&>em]:italic [&>em]:text-gray-800
        [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:bg-blue-50 [&>blockquote]:py-3 [&>blockquote]:my-6 [&>blockquote]:rounded-r-lg
        [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-4
        [&>code]:bg-gray-100 [&>code]:text-red-600 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
        [&>pre>code]:bg-transparent [&>pre>code]:text-gray-100 [&>pre>code]:p-0
        [&>table]:min-w-full [&>table]:border-collapse [&>table]:border [&>table]:border-gray-300 [&>table]:mb-4
        [&>table>thead]:bg-gray-50
        [&>table>tbody]:bg-white
        [&>table_tr]:border-b [&>table_tr]:border-gray-200
        [&>table_th]:border [&>table_th]:border-gray-300 [&>table_th]:px-4 [&>table_th]:py-2 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-gray-900
        [&>table_td]:border [&>table_td]:border-gray-300 [&>table_td]:px-4 [&>table_td]:py-2 [&>table_td]:text-gray-800
        [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline [&>a]:transition-colors
        [&>hr]:border-t-2 [&>hr]:border-gray-200 [&>hr]:my-8
        [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:shadow-md [&>img]:my-4"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ServerMarkdownRenderer;

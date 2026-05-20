import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const SLUG_MAP: Record<string, string> = {
  'di-yi-ge-yuan-gong': '2026-05-20-ai-agent-first-employee',
  'shi-jian-hei-dong': '2026-05-18-time-trap',
  'po-mie-pao-mo': '2026-05-18-ai-opc-million-myth',
  'zhen-shi-zha-ji': '2026-05-17-swimming',
};

function getBlogPost(slug: string) {
  const fileSlug = SLUG_MAP[slug];
  if (!fileSlug) return null;

  const filePath = path.join(BLOG_DIR, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    title: data.title || '',
    date: data.date
      ? new Date(data.date).toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
    readTime: data.readTime || '5 分钟',
    content,
  };
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        {/* Article */}
        <article className="py-32 md:py-40">
          <div className="px-8 max-w-2xl mx-auto">
            <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)] mb-10">
              <span>{post.date}</span>
              <span>·</span>
              <span>约 {post.readTime}</span>
            </div>
            <div className="text-sm text-[var(--text-body)] leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-[1rem] font-heading font-semibold text-[var(--text-heading)] mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 last:mb-0">{children}</p>
                  ),
                  hr: () => (
                    <hr className="my-8 border-[var(--border-default)]" />
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-1 mb-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-1 mb-4">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[var(--text-heading)]">
                      {children}
                    </strong>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full text-sm border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="text-left py-2 px-3 border-b border-[var(--border-default)] text-[var(--text-secondary)] font-medium">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="py-2 px-3 border-b border-[var(--border-default)] text-[var(--text-body)]">
                      {children}
                    </td>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-[var(--color-accent)] hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <p className="text-sm text-[var(--text-heading)] font-medium mb-6">
              评估你的方向 →
            </p>
            <a
              href="/admission"
              className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors"
            >
              免费评估 →
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">
              fhopc · 一人公司孵化器
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a
                href="/"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                首页
              </a>
              <a
                href="/team"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                团队
              </a>
              <a
                href="/collab"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                协作
              </a>
              <a
                href="/insights"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                痛点
              </a>
              <a
                href="/admission"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                准入
              </a>
              <a
                href="mailto:hello@fhopc.top"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                hello@fhopc.top
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
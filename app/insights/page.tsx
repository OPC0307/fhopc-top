import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FILE_SLUG_MAP } from '@/data/blog-slugs';
import { CASES, type CaseData } from '@/data/cases';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const metadata = {
  title: '痛点与案例',
  description: '自己干遇到的那些坑——方向看不清、技术听不懂、结果不确定。每个痛点一篇千字解读。',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: '痛点与案例 | fhopc',
    description: '自己干遇到的那些坑——方向看不清、技术听不懂、结果不确定。',
    url: 'https://fhopc.top/insights',
  },
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readTime?: string;
}

function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  files.sort().reverse();
  return files.slice(0, 13).map(file => {
    const fileSlug = file.replace('.md', '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: FILE_SLUG_MAP[fileSlug] || fileSlug,
      title: data.title || '',
      date: data.date ? new Date(data.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
      summary: data.summary || '',
      readTime: data.readTime || '5 分钟',
    };
  });
}

function CaseStudy({ title, subtitle, paragraphs, keyPoint, dataSource, deliverables, referral }: {
  title: string; subtitle: string; paragraphs: string[]; keyPoint: string; dataSource?: string; deliverables?: string[]; referral?: string;
}) {
  return (
    <div className="py-16 border-t border-[var(--border-default)] first:border-t-0">
      <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-1">{title}</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">{subtitle}</p>
      <div className="space-y-3 text-sm text-[var(--text-body)] leading-relaxed max-w-2xl">
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <p className="text-xs text-[var(--color-accent)] mt-4 font-medium">{keyPoint}</p>
      {dataSource && <p className="text-[11px] text-[var(--text-tertiary)] mt-3">数据来源：{dataSource}</p>}
      {deliverables && deliverables.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--border-default)]/50">
          <p className="text-[11px] font-medium text-[var(--text-secondary)] mb-1">交付物</p>
          <div className="flex flex-wrap gap-1.5">
            {deliverables.map((d, i) => (<span key={i} className="text-[11px] text-[var(--text-tertiary)] bg-[var(--btn-hover)] px-2 py-0.5 rounded">{d}</span>))}
          </div>
        </div>
      )}
      {referral && <p className="text-[11px] text-[var(--text-tertiary)] mt-2">复购/转介绍：{referral}</p>}
    </div>
  );
}

export default function InsightsPage() {
  const posts = getBlogPosts();
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className="section-label">诊断与行动</div>
            <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">看完文章，然后做什么？</h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl mb-2">每篇文章讲一个一人公司的真实卡点。读完之后，你需要的不是一个答案，是一个针对你个人情况的判断。</p>
            <p className="text-sm text-[var(--text-tertiary)] mb-8">持续更新，不追热点。每篇一个诊断方向。</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">先评估你的方向 →</a>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="border-t border-[var(--border-default)]">
            <div className="container-content py-20">
              <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-8">最新文章</h2>
              <div className="divide-y divide-[var(--border-default)]">
                {posts.map((post) => (
                  <div key={post.slug} className="py-8 first:pt-0">
                    <h3 className="text-[1rem] font-heading font-semibold text-[var(--text-heading)] mb-2">{post.title}</h3>
                    <p className="text-sm text-[var(--text-body)] leading-relaxed mb-3">{post.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
                      <span>{post.date}</span><span>·</span><span>约 {post.readTime}</span>
                      <a href={`/content/blog/${post.slug}`} className="text-[var(--color-accent)] hover:underline">[诊断 →]</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-20">
            <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-8">真实案例</h2>
            {CASES.map((c) => (
              <CaseStudy key={c.id} title={c.title} subtitle={c.subtitle} paragraphs={c.paragraphs} keyPoint={c.keyPoint} dataSource={c.dataSource} referral={c.referral} />
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-[var(--border-default)] bg-[var(--color-foreground)]">
          <div className="container-content text-center">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--color-background)] mb-2">不确定自己适合哪个方向？</h2>
            <p className="text-sm text-[var(--color-background)]/70 mb-6">回答 5 个问题，15 秒知道答案</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-md font-medium text-sm hover:brightness-110 transition-all">免费评估 →</a>
          </div>
        </section>

        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司系统化交付</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
              <a href="/team" className="hover:text-[var(--text-heading)] transition-colors">关于</a>
              <a href="/collab" className="hover:text-[var(--text-heading)] transition-colors">合作</a>
              <a href="/admission" className="hover:text-[var(--text-heading)] transition-colors">评估</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
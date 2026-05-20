import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

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

  const FILE_SLUG_MAP: Record<string, string> = {
    '2026-05-20-ai-agent-first-employee': 'di-yi-ge-yuan-gong',
    '2026-05-18-time-trap': 'shi-jian-hei-dong',
    '2026-05-18-ai-opc-million-myth': 'po-mie-pao-mo',
    '2026-05-17-swimming': 'zhen-shi-zha-ji',
    '2026-05-20-track-assessment': 'sai-dao-san-wei-du',
    '2026-05-20-seven-day-mvp': 'qi-tian-mvp',
    '2026-05-20-three-tier-tools': 'san-ceng-gong-ju-zhan',
    '2026-05-20-platform-strategies': 'wu-da-ping-tai-huo-ke',
    '2026-05-20-delivery-sop': 'biao-zhun-hua-jiao-fu',
    '2026-05-20-side-hustle-to-main': 'fu-ye-dao-zhu-ye',
    '2026-05-20-pricing-trap': 'ding-jia-xian-jing',
    '2026-05-20-decision-burden': 'jue-ce-dai-jia',
  };

  return files.slice(0, 9).map(file => {
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
  title: string;
  subtitle: string;
  paragraphs: string[];
  keyPoint: string;
  dataSource?: string;
  deliverables?: string[];
  referral?: string;
}) {
  return (
    <div className="py-16 border-t border-[var(--border-default)] first:border-t-0">
      <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-1">{title}</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">{subtitle}</p>
      <div className="space-y-3 text-sm text-[var(--text-body)] leading-relaxed max-w-2xl">
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <p className="text-xs text-[var(--color-accent)] mt-4 font-medium">{keyPoint}</p>
      {dataSource && (
        <p className="text-[11px] text-[var(--text-tertiary)] mt-3">数据来源：{dataSource}</p>
      )}
      {deliverables && deliverables.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--border-default)]/50">
          <p className="text-[11px] font-medium text-[var(--text-secondary)] mb-1">交付物</p>
          <div className="flex flex-wrap gap-1.5">
            {deliverables.map((d, i) => (
              <span key={i} className="text-[11px] text-[var(--text-tertiary)] bg-[var(--btn-hover)] px-2 py-0.5 rounded">{d}</span>
            ))}
          </div>
        </div>
      )}
      {referral && (
        <p className="text-[11px] text-[var(--text-tertiary)] mt-2">复购/转介绍：{referral}</p>
      )}
    </div>
  );
}

export default function InsightsPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className="section-label">痛点词典</div>
            <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
              痛点词典
            </h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl mb-2">
              非技术出身的人做一人公司，卡住的不是能力，是差一层翻译。
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">每个痛点，一篇 1000 字。</p>
          </div>
        </section>

        {/* Blog articles */}
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
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>约 {post.readTime}</span>
                      <a href={`/content/blog/${post.slug}`} className="text-[var(--color-accent)] hover:underline">[阅读 →]</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Case studies */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-20">
            <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-8">真实案例</h2>
            <CaseStudy
              title="案例一：独立数据分析师"
              subtitle="从月入三万到一万，再回来。"
              paragraphs={[
                '"我想自己干，但我不知道从哪开始。"',
                '他做了九年数据分析，想独立。我们做了评估，建议暂缓。他说等不了。',
                '第一个月，靠老客户吃三万。他觉得成了。第三个月，流尽，剩一万。他回头了，这次听了诊断。',
                '花了三个月搭系统——自动化数据采集、标准化交付模板、客户续费机制。第十一个月，回到三万。这次，三万是他的系统在转。',
              ]}
              keyPoint="关键转折：从卖时间到卖系统。"
              dataSource="创始人自述 + 经营审计跟踪（2025.6-2026.4）"
              deliverables={['赛道评估报告', '自动化数据采集系统', '标准化交付模板', '客户续费机制']}
              referral="交付完成后推荐了 2 位同行客户"
            />
            <CaseStudy
              title="案例二：内容创作者"
              subtitle="两万粉丝，月入两千。"
              paragraphs={[
                '她有内容能力，有稳定粉丝，但没有收入结构。问题不在内容质量，在变现路径太单一。',
                '我们用经营审计拆了她的时间账：70% 时间在创作，15% 在运营，10% 在商务，5% 在复盘。收入全部来自单次广告，没有复购，没有订阅，没有产品。',
                '调整方案用了三个月：每周分流 15% 时间做产品化内容；从广告收入切到 70% 订阅 + 20% 增值 + 10% 广告；自动化工具链覆盖内容分发和客户跟进。',
                '第四个月，粉丝没涨，收入翻倍。',
              ]}
              keyPoint="关键转折：流量不重要，收入结构才重要。"
              dataSource="创始人经营审计报告 + 收入结构拆解（2026.1-2026.4）"
              deliverables={['收入结构诊断报告', '产品化内容模板', '订阅+增值+广告三层变现模型', '自动化分发与跟单系统']}
              referral="第四个月续费率 35%，启动了付费社群内测"
            />
            <CaseStudy
              title="案例三：电商独立卖家"
              subtitle="首发亏三万，第三个月止亏。"
              paragraphs={[
                '他说，这是他的第三次创业。前两次做了三年，难走，弃了。这次选品对了——宠物智能用品，他也算有供应链底子。问题是：成本没控住、流量靠买、复购率接近零。',
                '入局姿势就有问题：首发砸了三万在货和投流上。第一周出了一百单，看着热闹，一算账：每单亏十五。',
                '我们花了三天做经营审计。数据拆解：单品毛利 35%，但物流和退货吃掉了 12%；流量 80% 依赖平台竞价，自然流不到 20%；首单客户回访率为零——卖了就没有然后了。',
                '三个月调整方案：产品线压到 3 个 SKU，集中供应链议价；自然流运营：客户好评引导+内容投流，竞价预算砍半；建立复购机制：随单插入返现卡 + 三个月续费提醒自动触发。',
                '第五个月，月利润覆盖了首发的全部亏损。从亏到盈不是因为做对了哪一件事，是五个地方都调了半格。',
              ]}
              keyPoint="转折链：选品→成本结构→流量渠道→复购机制。"
              dataSource="经营审计跟踪 + 财务数据（2026.1-2026.5）"
              deliverables={['经营审计报告', 'SKU 精简与供应链议价方案', '自然流运营 SOP', '复购自动触发系统']}
              referral="第五个月转介绍率 12%，启动了分销机制"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[var(--border-default)] bg-[var(--color-foreground)]">
          <div className="container-content text-center">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--color-background)] mb-2">不确定自己适合哪个方向？</h2>
            <p className="text-sm text-[var(--color-background)]/70 mb-6">回答 5 个问题，15 秒知道答案</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-md font-medium text-sm hover:brightness-110 transition-all">免费评估 →</a>
          </div>
        </section>

        {/* Bottom note */}
        <section className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              持续更新，不追热点。每篇一个真实卡点，写下一个人少踩一个坑。
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司系统化交付</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
              <a href="/team" className="hover:text-[var(--text-heading)] transition-colors">团队</a>
              <a href="/collab" className="hover:text-[var(--text-heading)] transition-colors">协作</a>
              <a href="/admission" className="hover:text-[var(--text-heading)] transition-colors">准入</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
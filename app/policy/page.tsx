import { Metadata } from 'next';
import Link from 'next/link';
import { provinces, getProvincesByCategory } from '@/data/policies';

export const metadata: Metadata = {
  title: '一人公司创业政策',
  description: '全国31省AI一人公司创业补贴政策汇总——算力补贴、税收优惠、创业贷款、办公场地支持。看看你的省份能领多少钱。',
  alternates: { canonical: '/policy' },
  openGraph: {
    title: '一人公司创业政策 | fhopc',
    description: '全国31省AI一人公司创业补贴政策汇总。',
    url: 'https://fhopc.top/policy',
  },
};

const categories = [
  { key: 'star-city' as const, label: '重点城市（有专项政策）', badge: '⭐', cols: 2 },
  { key: 'has-policy' as const, label: '有扶持政策的省份', badge: '', cols: 3 },
  { key: 'no-policy' as const, label: '暂无专项政策的省份', badge: '', cols: 3 },
];

function ProvinceCard({ p }: { p: typeof provinces[0] }) {
  return (
    <Link href={`/policy/${p.slug}`} className="block border border-[var(--border-default)] rounded-lg p-5 hover:border-[var(--color-accent)] transition-colors group">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-[var(--text-heading)] group-hover:text-[var(--color-accent)] transition-colors">{p.name}</h3>
        {p.badge && <span className="text-xs">{p.badge}</span>}
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">{p.summary}</p>
      <div className="space-y-1">
        {p.highlights.slice(0, 2).map((h, i) => (
          <div key={i} className="text-[11px] text-[var(--text-tertiary)] flex items-start gap-1.5">
            <span className="text-[var(--color-accent)] mt-0.5">·</span>
            <span>{h.title} — {h.desc}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        <section className="py-24 md:py-32">
          <div className="px-8">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold text-[var(--color-accent)] mb-4 tracking-widest">创业政策</div>
              <h1 className="text-[2.5rem] md:text-[3rem] font-heading font-bold tracking-tight leading-[1.15] text-[var(--text-heading)] mb-4">你在哪个省市？看看能领多少补贴</h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">算力补贴、税收优惠、创业贷款、办公场地支持——一人公司在各地能享受的政策不一样。选你的省份，看你能拿多少。</p>
              <Link href="/policy/national" className="inline-flex items-center gap-2 border border-[var(--border-default)] text-[var(--text-secondary)] px-5 py-2.5 rounded-md text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
                先看国家通用政策 →
              </Link>
            </div>
          </div>
        </section>

        {categories.map(cat => {
          const items = getProvincesByCategory(cat.key);
          if (items.length === 0) return null;
          return (
            <section key={cat.key} className="border-t border-[var(--border-default)] py-16">
              <div className="px-8 mb-8">
                <h2 className="text-lg font-heading font-bold text-[var(--text-heading)]">{cat.label}</h2>
              </div>
              <div className={`px-8 grid grid-cols-1 md:grid-cols-${cat.cols} gap-4`}>
                {items.map(p => <ProvinceCard key={p.slug} p={p} />)}
              </div>
            </section>
          );
        })}

        <section className="border-t border-[var(--border-default)] py-20">
          <div className="px-8 text-center">
            <p className="text-sm text-[var(--text-heading)] font-medium mb-4">不确定你的方向适不适合拿补贴？</p>
            <p className="text-xs text-[var(--text-secondary)] mb-6">回答10个问题，15秒知道你该不该启动，推荐哪个方案。</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
          </div>
        </section>

        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-xs text-[var(--text-tertiary)] leading-relaxed space-y-1">
              <p>政策信息来源：各级政府公开文件，仅供参考。具体以当地主管部门最新公告为准。</p>
              <p>fhopc · 一人公司系统化交付</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { provinces, getProvince } from '@/data/policies';

interface Props { params: Promise<{ province: string }> }

export async function generateStaticParams() {
  return provinces.map(p => ({ province: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProvince((await params).province);
  if (!p) return {};
  return {
    title: `${p.name}一人公司创业补贴政策`,
    description: p.summary,
    alternates: { canonical: `/policy/${p.slug}` },
    openGraph: {
      title: `${p.name}一人公司创业补贴政策 | fhopc`,
      description: p.summary,
      url: `https://fhopc.top/policy/${p.slug}`,
    },
  };
}

export default async function ProvincePage({ params }: Props) {
  const slug = (await params).province;
  const p = getProvince(slug);
  if (!p) notFound();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        <section className="py-24 md:py-32">
          <div className="px-8">
            <Link href="/policy" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--color-accent)] transition-colors mb-6 inline-block">← 所有政策</Link>
            <div className="max-w-2xl">
              {p.badge && <span className="text-xs mb-2 inline-block">{p.badge}</span>}
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight leading-[1.15] text-[var(--text-heading)] mb-3">{p.name}一人公司创业补贴政策</h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">{p.summary}</p>
              <div className="text-[11px] text-[var(--text-tertiary)]">政策信息截至 {p.updatedAt}，以官方最新公告为准</div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border-default)] py-16">
          <div className="px-8">
            <h2 className="text-lg font-heading font-bold text-[var(--text-heading)] mb-6">核心政策</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.highlights.map((h, i) => (
                <div key={i} className="border border-[var(--border-default)] rounded-lg p-5">
                  <div className="text-xs font-semibold text-[var(--color-accent)] mb-1">{h.title}</div>
                  <p className="text-sm text-[var(--text-body)]">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border-default)] py-20">
          <div className="px-8 text-center max-w-lg mx-auto">
            <p className="text-sm text-[var(--text-heading)] font-medium mb-2">{p.name}的补贴政策适合你的方向吗？</p>
            <p className="text-xs text-[var(--text-secondary)] mb-6">回答10个问题，15秒知道你的方向值不值得做。</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
          </div>
        </section>

        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content space-y-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <Link href="/" className="hover:text-[var(--text-heading)]">首页</Link>
              <Link href="/team" className="hover:text-[var(--text-heading)]">关于</Link>
              <Link href="/collab" className="hover:text-[var(--text-heading)]">合作</Link>
              <Link href="/insights" className="hover:text-[var(--text-heading)]">痛点</Link>
              <Link href="/admission" className="hover:text-[var(--text-heading)]">准入</Link>
            </div>
            <div className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              <p>政策信息来源：各级政府公开文件，仅供参考。具体以当地主管部门最新公告为准。</p>
              <p>fhopc · 一人公司系统化交付</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
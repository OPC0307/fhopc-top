'use client';

import { useEffect, useState } from 'react';

const roles = [
  { id: '01', name: '方向审查', desc: '判断你的方向值不值得投时间——不是你能不能干，是这件事该不该干。' },
  { id: '02', name: '赛道分析', desc: '用数据和案例判断赛道空间，不画大饼只说事实。' },
  { id: '03', name: '产品规划', desc: '把想法拆成可执行的最小单元，不做大而全。' },
  { id: '04', name: '市场验证', desc: '产品出来前先验证有没有人愿付钱，只看真金白银。' },
  { id: '05', name: '自动化搭建', desc: '重复劳动交给系统——营销、数据、分发，你只管核心产出。' },
  { id: '06', name: '经营审计', desc: '定期拆你的经营数据，给你一份残酷但有用的体检报告。' },
  { id: '07', name: '交付把关', desc: '每一条产出物达标，不糊弄过程只对结果负责。' },
];

const collabModes = [
  { id: '01', title: '启动包', desc: '系统搭好，你照着跑。', painPoint: '有想法不知道怎么开始 → 30天路径+工具包，每一步写清楚。' },
  { id: '02', title: '陪跑计划', desc: '每月盯数据调方向。', painPoint: '在做但不知道对不对 → 数据告诉你哪里在漏哪里在赚。' },
  { id: '03', title: '全托管', desc: '你只管产品，其他归我。', painPoint: '一个人扛不住了 → 你冲执行，系统替你盯方向和质量。' },
];

const faqItems = [
  { q: '不适合什么样的人？', a: '还在犹豫的、想找人替你做决定的、指望一个工具年入百万的。我们直接告诉你原因。' },
  { q: '我怎么知道我准备好了？', a: '做一次免费评估。回答10个问题，从基础条件和赛道可行性综合评分。' },
  { q: '多久能看到结果？', a: '启动包最快30天出第一单。陪跑计划按月看变化。全托管按周推进。' },
  { q: '我完全不懂技术能做吗？', a: '能。技术部分由系统承担——从工具配置到自动化流程，都有人帮你搭好。' },
  { q: '自己干和找你们差在哪？', a: '自己干每天2-3小时在杂事上。找我们每天15分钟审核内容，杂事系统自动跑。' },
];

function RoleCard({ role, index }: { role: typeof roles[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200 + index * 100); return () => clearTimeout(t); }, [index]);
  return (
    <div className={`transition-all duration-600 ease-helio ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold text-[var(--text-tertiary)] tabular-nums">{role.id}</span>
        <h3 className="text-[1rem] font-heading font-semibold text-[var(--text-heading)]">{role.name}</h3>
      </div>
      <p className="text-sm text-[var(--text-body)] leading-relaxed mt-1.5">{role.desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[var(--border-default)] py-6 first:border-t-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <span className="text-sm font-medium text-[var(--text-heading)] pr-4">{q}</span>
        <span className={`text-[var(--text-tertiary)] text-lg transition-transform duration-200 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-helio ${open ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-[var(--text-body)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setHeroVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className="max-w-3xl">
              <div className={`text-xs font-semibold text-[var(--color-accent)] mb-6 tracking-widest transition-all duration-800 ease-helio ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>一人公司 · 系统化交付</div>
              <h1 className={`text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-heading font-bold tracking-tight leading-[1.15] text-[var(--text-heading)] mb-3 transition-all duration-800 ease-helio ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>有行业经验，想自己干。</h1>
              <p className={`text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-heading font-bold tracking-tight leading-[1.15] text-[var(--text-heading)] mb-6 transition-all duration-800 ease-helio delay-75ms ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>产品你来，<span className="text-[var(--color-accent)]">其他归我</span>。</p>
              <p className={`text-base text-[var(--text-secondary)] max-w-xl mb-8 leading-relaxed transition-all duration-800 ease-helio delay-150ms ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>合规、财税、内容、获客、交付——一个人开公司需要的所有配套，一套系统自动跑完。你只需要做你最擅长的那件事。</p>
              <div className={`flex flex-wrap gap-3 transition-all duration-800 ease-helio delay-200ms ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
                <a href="/collab" className="inline-flex items-center gap-2 border border-[var(--border-default)] text-[var(--text-secondary)] px-6 py-3 rounded-md font-medium text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">看怎么合作</a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-32 border-t border-[var(--border-default)]">
          <div className="px-8 pb-16"><div className="max-w-2xl"><SectionLabel>你现在的困惑</SectionLabel><SectionTitle>一个人做决定，最难的不是做什么，而是不知道对不对</SectionTitle></div></div>
          <div className="border-t border-[var(--border-default)]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
              <div className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up"><h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2">方向看不清</h3><p className="text-sm text-[var(--text-body)] leading-relaxed">市面上赛道分析很多，不知道哪个适合你。不是信息不够，是没人帮你判断该走哪条。</p></div>
              <div className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{animationDelay:'150ms'}}><h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2">技术听不懂</h3><p className="text-sm text-[var(--text-body)] leading-relaxed">AI、工具、自动化——听起来对，但不知道跟你有什么关系。不是技术难，是没人翻译成你的业务语言。</p></div>
              <div className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{animationDelay:'300ms'}}><h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2">结果不确定</h3><p className="text-sm text-[var(--text-body)] leading-relaxed">做了一段时间，有效果吗？不知道。哪里在亏哪里在赚？也不知道。不是你不努力，是没有审计系统。</p></div>
            </div>
          </div>
        </section>
        <section id="system" className="py-32 border-t border-[var(--border-default)]">
          <div className="container-content">
            <SectionLabel>七个角色，一套系统</SectionLabel><SectionTitle>你做的每一步有人替你审</SectionTitle>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mt-4">方向审查、赛道分析、合规规划、市场验证、自动化搭建、经营审计、交付把关。</p>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 mt-16">{roles.map((r,i)=> <RoleCard key={r.id} role={r} index={i}/>)}</div>
          </div>
        </section>
        <section id="collab" className="py-32 border-t border-[var(--border-default)]">
          <div className="px-8 pb-16"><div className="max-w-2xl"><SectionLabel>合作方式</SectionLabel><SectionTitle>三种深度，按需选择</SectionTitle></div></div>
          <div className="border-t border-[var(--border-default)]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
              {collabModes.map((m,i)=>(
                <div key={m.id} className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{animationDelay:i*150+'ms'}}>
                  <h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2">{m.title}</h3>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed mb-3">{m.desc}</p>
                  <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{m.painPoint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-32 border-t border-[var(--border-default)]">
          <div className="px-8 pb-16"><div className="max-w-2xl"><SectionLabel>投入与回报</SectionLabel><SectionTitle>自己干 vs 用系统</SectionTitle></div></div>
          <div className="border-t border-[var(--border-default)]">
            <div className="p-8"><table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border-default)]"><th className="text-left py-3 pr-4 text-[var(--text-secondary)] font-medium"></th><th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">自己摸索</th><th className="text-left py-3 pl-4 text-[var(--text-secondary)] font-medium">fhopc 方案</th></tr></thead>
              <tbody>{[['每日时间投入','2-3 小时','15 分钟'],['月度工具成本','乱买 ≈ 800 元','按需 ≈ 200 元'],['方向试错','3-6 个月没方向','数据跟踪及时调整'],['出单预期','不确定','30 天可见效果'],['心态损耗','高','低']].map((r,i)=>(
                <tr key={i} className="border-b border-[var(--border-default)]"><td className="py-3 pr-4 font-medium text-[var(--text-heading)]">{r[0]}</td><td className="py-3 px-4 text-[var(--text-secondary)]">{r[1]}</td><td className="py-3 pl-4 text-[var(--color-accent)]">{r[2]}</td></tr>
              ))}</tbody></table></div>
          </div>
        </section>
        <section className="py-32 border-t border-[var(--border-default)]">
          <div className="px-8 pb-16"><div className="max-w-2xl"><SectionLabel>真实案例</SectionLabel><SectionTitle>月入三万到一万，再回来</SectionTitle></div></div>
          <div className="max-w-xl px-8 space-y-5 text-sm text-[var(--text-body)] leading-relaxed">
            <p className="text-[var(--text-heading)] font-medium">他说：我想自己干，但我不知道从哪开始。</p>
            <p>做了九年数据分析，想独立。做了评估，建议暂缓。他说等不了。</p>
            <p>第一个月靠老客户吃三万。第三个月流尽剩一万。回头了。花了三个月搭系统。十一个月回到三万。这次，三万是他的系统在转。</p>
          </div>
        </section>
        <section className="py-32 border-t border-[var(--border-default)]">
          <div className="container-content"><SectionLabel>你大概想问的</SectionLabel><SectionTitle>常见问题</SectionTitle>
          <div className="max-w-2xl mt-12">{faqItems.map((item,i)=> <FaqItem key={i} q={item.q} a={item.a}/>)}</div></div>
        </section>
        <section id="cta" className="py-32 md:py-40 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <h2 className="text-[1.75rem] md:text-[2rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] mb-8">先看看你的方向对不对</h2>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-8 py-4 rounded-md font-medium text-base hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">不适合的直接告诉你原因，没有推销。</p>
          </div>
        </section>
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司系统化交付</div>
            <p className="text-xs text-[var(--text-tertiary)] mb-6">产品你来，其他归我。合规、财税、内容、获客、交付——系统自动跑完。</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/team" className="hover:text-[var(--text-heading)] transition-colors">关于</a>
              <a href="/collab" className="hover:text-[var(--text-heading)] transition-colors">合作</a>
              <a href="/insights" className="hover:text-[var(--text-heading)] transition-colors">案例</a>
              <a href="/admission" className="hover:text-[var(--text-heading)] transition-colors">评估</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
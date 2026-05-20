'use client';

import { useEffect, useState } from 'react';

/* =============================================
   Data
   ============================================= */

const roles = [
  { id: '01', name: '准入审核官', desc: '判断项目该不该孵——不是教你创业，是你的方向值不值得投时间。' },
  { id: '02', name: '赛道研判师', desc: '用数据和案例判断赛道空间和入局窗口，不画大饼只说事实。' },
  { id: '03', name: '产品架构师', desc: '把想法拆成可执行方案——最小可交付单元，不做大而全。' },
  { id: '04', name: '商业验证师', desc: '产品出来前先验证有没有人愿付钱，只看真金白银不搞问卷。' },
  { id: '05', name: '自动化工程师', desc: '重复劳动交给系统。营销、数据、分发——你只管核心产出。' },
  { id: '06', name: '经营审计师', desc: '定期拆你的经营数据，给你一份残酷但有用的体检报告。' },
  { id: '07', name: '交付监理', desc: '每一条产出物达标，不糊弄过程只对结果负责。' },
];

const collabModes = [
  {
    id: '01', title: '作业框架',
    desc: '从零到第一单客户的 30 天 SOP + 工具包，你自主推进。',
    painPoint: '有想法不知道怎么变成第一单 → 从0到出单的30天路径，每一步写清楚。',
  },
  {
    id: '02', title: '经营诊断',
    desc: '每月一次数据审计 + 复盘会，我出诊断你执行。',
    painPoint: '在做但不知道对不对 → 数据告诉你哪里在漏、哪里在赚。',
  },
  {
    id: '03', title: '深度协作',
    desc: '全流程盯控，你冲我兜底。随时可退，按月结算。',
    painPoint: '一个人扛不住了 → 你冲执行，系统替你盯方向和质量。',
  },
];

const testimonials = [
  '"第一次诊断说暂缓，我没听，三个月后回来重新做的。" — 林 / 9年数据分析',
  '"收入拆开看才知道70%时间在创造10%的价值。" — 周 / 内容创业',
  '"自动化工具体验不错，省了每周10小时的重复劳动。" — 陈 / 独立开发者',
];

const faqItems = [
  {
    q: '不适合的人什么样？',
    a: '还在犹豫的、想找人替你做决定的、指望一个工具年入百万的。我们说的"不适合"，是直接告诉你，不是劝你再考虑。',
  },
  {
    q: '我怎么知道我准备好了？',
    a: '做一次免费评估。15 分钟，回答5个问题，系统告诉你成熟度。不适合的直接说原因，没有推销。',
  },
  {
    q: '多久能看到结果？',
    a: '没有标准答案。作业框架最快 30 天出第一单。深度协作按月度看变化。不承诺结果，只承诺每步有人把关。',
  },
  {
    q: '我完全不懂技术能做吗？',
    a: '能。评估关注的是你的行业经验和执行意愿，不是你会不会写代码。',
  },
];

/* =============================================
   Components
   ============================================= */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

function RoleCard({ id, name, desc, index }: { id: string; name: string; desc: string; index: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200 + index * 100); return () => clearTimeout(t); }, [index]);
  return (
    <div className={`transition-all duration-600 ease-helio ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold text-[var(--text-tertiary)] tabular-nums">{id}</span>
        <h3 className="text-[1rem] font-heading font-semibold text-[var(--text-heading)]">{name}</h3>
      </div>
      <p className="text-sm text-[var(--text-body)] leading-relaxed mt-1.5">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[var(--border-default)] py-6 first:border-t-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-[var(--text-heading)] pr-4">{q}</span>
        <span className={`text-[var(--text-tertiary)] text-lg transition-transform duration-200 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-helio ${open ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-[var(--text-body)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* =============================================
   Page
   ============================================= */

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setHeroVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">

        {/* ======== Block 1: Hero ======== */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className="max-w-3xl">
              <h1 className={`text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-heading font-bold tracking-tight leading-[1.15] text-[var(--text-heading)] mb-4 transition-all duration-800 ease-helio ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                一人公司孵化器
              </h1>
              <p className={`text-lg md:text-xl text-[var(--text-heading)] mb-2 transition-all duration-800 ease-helio delay-100ms ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                从想法到第一笔订单，7 个节点陪你走完全程。
              </p>
              <p className={`text-sm text-[var(--text-secondary)] max-w-xl mb-8 transition-all duration-800 ease-helio delay-200ms ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                基于赛道三维度 × 7 天 MVP × 三层工具栈的验证体系。
              </p>
              <a
                href="/admission"
                className={`inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                免费评估 →
              </a>
            </div>
          </div>
        </section>

        {/* ======== Block 2: Why ======== */}
        <section className="py-32 border-t border-[var(--border-default)]">
          {/* Heading */}
          <div className="px-8 pb-16">
            <div className="max-w-2xl">
              <SectionLabel>你现在的困惑</SectionLabel>
              <SectionTitle>一个人做决定，最难的不是做什么，而是不知道对不对</SectionTitle>
            </div>
          </div>
          {/* Cards grid — stretches to border-x */}
          <div className="border-t border-[var(--border-default)]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
              <div className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up">
                <h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2 group-hover:text-[var(--text-secondary)] transition-colors">方向看不清</h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed">市面上赛道分析很多，但你不知道哪个适合你。不是信息不够，是没人帮你判断该走哪条。</p>
              </div>
              <div className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2 group-hover:text-[var(--text-secondary)] transition-colors">技术听不懂</h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed">AI、工具、自动化——这些东西听起来对，但你不知道它们跟你有什么关系。不是技术难，是没人翻译成你的业务语言。</p>
              </div>
              <div className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-2 group-hover:text-[var(--text-secondary)] transition-colors">结果不确定</h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed">做了一段时间，有效果吗？不知道。哪里在亏哪里在赚？也不知道。不是你不努力，是没有审计系统。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======== Block 3: System (7 roles) ======== */}
        <section id="system" className="py-32 border-t border-[var(--border-default)]">
          <div className="container-content">
            <SectionLabel>孵化系统</SectionLabel>
            <SectionTitle>七个角色，一个系统</SectionTitle>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mt-4">
              7个角色——诊断问题、判断方向、验证选择、把关交付。不是帮你做，是你做的每一步有人替你审。
            </p>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 mt-16">
              {roles.map((role, i) => (
                <RoleCard key={role.id} {...role} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ======== Block 4: Collaboration ======== */}
        <section id="collab" className="py-32 border-t border-[var(--border-default)]">
          {/* Heading */}
          <div className="px-8 pb-16">
            <div className="max-w-2xl">
              <SectionLabel>协作</SectionLabel>
              <SectionTitle>三种深度，按需选择</SectionTitle>
            </div>
          </div>
          {/* Cards grid — stretches to border-x */}
          <div className="border-t border-[var(--border-default)]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
              {collabModes.map((mode, i) => (
                <div key={mode.id} className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="text-xs font-semibold text-[var(--text-tertiary)] tabular-nums mb-3">{mode.id}</div>
                  <h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-3 group-hover:text-[var(--text-secondary)] transition-colors">{mode.title}</h3>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed mb-3">{mode.desc}</p>
                  <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{mode.painPoint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== Block 5: Case ======== */}
        <section className="py-32 border-t border-[var(--border-default)]">
          {/* Heading + narrative */}
          <div className="px-8 pb-16">
            <div className="max-w-2xl">
              <SectionLabel>真实案例</SectionLabel>
              <SectionTitle>一个数据分析师从月入三万到一万，然后回来。</SectionTitle>
            </div>
            <div className="max-w-xl mt-12 space-y-5 text-sm text-[var(--text-body)] leading-relaxed">
              <p className="text-[var(--text-heading)] font-medium">&ldquo;我想自己干，但我不知道从哪开始。&rdquo;</p>
              <p>他做了九年数据分析，想独立。我们做了评估，建议暂缓。他说等不了。</p>
              <p>第一个月，靠老客户吃三万。他觉得成了。第三个月，流尽，剩一万。他回头了，这次听了诊断。</p>
              <p>花了三个月搭系统——自动化数据采集、标准化交付模板、客户续费机制。第十一个月，回到三万。这次，三万是他的系统在转。</p>
            </div>
          </div>
          {/* Testimonials grid — stretches to border-x */}
          <div className="border-t border-[var(--border-default)]">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
              {testimonials.map((t, i) => (
                <div key={i} className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== Block 6: FAQ ======== */}
        <section className="py-32 border-t border-[var(--border-default)]">
          <div className="container-content">
            <SectionLabel>开始之前</SectionLabel>
            <SectionTitle>你大概想问的</SectionTitle>
            <div className="max-w-2xl mt-12">
              {faqItems.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ======== Block 7: CTA ======== */}
        <section id="cta" className="py-32 md:py-40 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <h2 className="text-[1.75rem] md:text-[2rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] mb-8">
              从想法到落地，只差一次评估
            </h2>
            <a
              href="/admission"
              className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-8 py-4 rounded-md font-medium text-base hover:bg-[var(--color-accent)] transition-colors"
            >
              免费评估 →
            </a>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">
              先评估，再出方案。不适合的直接告诉你原因。
            </p>
          </div>
        </section>

        {/* ======== Footer ======== */}
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司孵化器</div>
            <p className="text-xs text-[var(--text-tertiary)] mb-6">从想法到第一笔订单，7 个节点陪你走完全程。</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/team" className="hover:text-[var(--text-heading)] transition-colors">团队</a>
              <a href="/collab" className="hover:text-[var(--text-heading)] transition-colors">协作</a>
              <a href="/insights" className="hover:text-[var(--text-heading)] transition-colors">痛点</a>
              <a href="/admission" className="hover:text-[var(--text-heading)] transition-colors">准入</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
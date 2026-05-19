'use client';

import { useEffect, useState } from 'react';

const roles = [
  {
    id: '01', status: '生效中',
    title: '准入审核官',
    do: '判断一个项目该不该孵。不是教你创业，是你的方向值不值得投时间。创始人本身的行业经验、资源门槛、执行意愿——过一遍才决定要不要继续聊。',
    dont: '不招"试试看"的人。不为了孵化数量降门槛。不提供商业计划书辅导。评估通过才能进入系统。',
  },
  {
    id: '02', status: '生效中',
    title: '赛道研判师',
    do: '基于行业数据和真实案例，判断赛道空间、竞争格局、入局窗口期。给创始人一个清醒的判断——这个方向值不值得投入半年以上的时间。',
    dont: '不看宏观趋势报告，不讲大故事。不替代你做决定，只告诉你数据和逻辑。',
  },
  {
    id: '03', status: '生效中',
    title: '产品架构师',
    do: '把你的想法变成可执行的产品方案。功能优先级、技术选型建议、MVP 范围、迭代节奏。不做大而全，只做最小的可交付单元。',
    dont: '不堆功能，不画产品全景图。不替你做选择，只给你选项和每个选项的后果。',
  },
  {
    id: '04', status: '生效中',
    title: '商业验证师',
    do: '产品做出来之前，先验证有没有人愿意付钱。设计验证试验、跑最小交易闭环、收集真实反馈。数据说了算。',
    dont: '不搞调研问卷，不分析"意向"。只看真实交易行为。',
  },
  {
    id: '05', status: '生效中',
    title: '自动化工程师',
    do: '把重复劳动交给系统。营销自动化、客户跟进、数据采集、内容分发。你只管核心产出，剩下的事交给工具链。',
    dont: '不做大平台集成。不搭你不需要的流水线。',
  },
  {
    id: '06', status: '生效中',
    title: '经营审计师',
    do: '定期复盘你的经营数据。收入结构、成本分布、时间分配。哪些在创造价值，哪些在消耗你。给你一份残酷但有用的体检报告。',
    dont: '不做财务记账。不做安慰式复盘。',
  },
  {
    id: '07', status: '生效中',
    title: '交付监理',
    do: '保证每一条产出物到达标准。文案有没有到位、产品有没有问题、客户有没有收到。对结果负责，不从过程上糊弄。',
    dont: '不替你写代码写文案（那是你的产出）。只确保该有的东西有了、该到的到了。',
  },
];

function RoleCard({ role, index }: { role: typeof roles[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200 + index * 120); return () => clearTimeout(t); }, [index]);

  return (
    <div className={`transition-all duration-600 ease-helio ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-semibold text-[var(--text-tertiary)] tabular-nums">{role.id}</span>
        <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">{role.title}</h2>
        <span className="text-[10px] font-medium text-[var(--color-accent)] px-2 py-0.5 border border-[var(--color-accent)]/30 rounded-sm">{role.status}</span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">做什么</div>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">{role.do}</p>
        </div>
        <div>
          <div className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">不做什么</div>
          <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{role.dont}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [pageVisible, setPageVisible] = useState(false);
  useEffect(() => { setPageVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className={`transition-all duration-800 ease-helio ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="section-label">一人公司孵化器</div>
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                七个角色，一个系统
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl">
                一人公司孵化器的执行架构。
              </p>
            </div>
          </div>
        </section>

        {/* Roles */}
        <section className="pb-32 border-t border-[var(--border-default)]">
          <div className="container-content divide-y divide-[var(--border-default)]">
            {roles.map((role, i) => (
              <div key={role.id} className="py-12 first:pt-16">
                <RoleCard role={role} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <section className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
              七个角色由 AI 扮演执行。决定权在你，执行交给系统。
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司孵化器</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
              <a href="#collab" className="hover:text-[var(--text-heading)] transition-colors">协作</a>
              <a href="/insights" className="hover:text-[var(--text-heading)] transition-colors">观察</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';

const plans = [
  {
    id: '01', title: '启动包',
    desc: '系统搭好，你照着跑。',
    detail: '适合有方向、能自己推进的人。30天执行路径 + 工具包，每一步写清楚。',
    price: '3,800 元（一次性）',
    items: ['自动化系统搭建', '发布队列管理工具', '落地页系统部署', '企业微信+自动回复', '操作手册+线上培训'],
  },
  {
    id: '02', title: '陪跑计划',
    desc: '每月盯数据、调方向。',
    detail: '适合已经在做、需要优化效率的人。我出诊断你执行，哪里在漏哪里在赚，数据说话。',
    price: '1,500 元/月',
    items: ['每月数据审计报告', '每月策略复盘会', '每周内容批量生产', '系统维护与更新', '运营问题响应'],
  },
  {
    id: '03', title: '全托管',
    desc: '你只管产品，其他归我。',
    detail: '适合一个人扛不住、需要系统兜底的人。你冲执行，系统替你盯方向和质量。',
    price: '2,200 元/月',
    items: ['含启动包+陪跑计划全部内容', '日常发布执行+追踪', '客户自动应答+意向过滤', '即时问题响应'],
  },
];

const roiRows = [
  ['每日时间投入', '2-3 小时', '15 分钟'],
  ['月度工具成本', '乱买 ≈ 800 元', '按需 ≈ 200 元'],
  ['方向试错', '3-6 个月没方向', '数据跟踪，及时调整'],
  ['出单预期', '不确定', '30 天可见效果'],
  ['心态损耗', '高（一个人扛）', '低（有人把关）'],
];

export default function CollabContent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">

        <section className="py-24 md:py-32">
          <div className="px-8">
            <div className="max-w-2xl">
              <div className={`text-xs font-semibold text-[var(--color-accent)] mb-4 tracking-widest transition-all duration-800 ease-helio ${visible ? 'opacity-100' : 'opacity-0'}`}>合作方式</div>
              <h1 className={`text-[2.5rem] md:text-[3rem] font-heading font-bold tracking-tight leading-[1.15] text-[var(--text-heading)] mb-4 transition-all duration-800 ease-helio ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>三种深度，按需选择</h1>
              <p className={`text-sm text-[var(--text-secondary)] leading-relaxed transition-all duration-800 ease-helio delay-100ms ${visible ? 'opacity-100' : 'opacity-0'}`}>从自己照着跑到全托管，总有一种适合你现在的阶段。按月结算，随时可退。</p>
            </div>
          </div>
        </section>

        <section className="pb-24 border-t border-[var(--border-default)]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
            {plans.map((plan, i) => (
              <div key={plan.id} className="p-8 flex flex-col animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-xs font-semibold text-[var(--text-tertiary)] tabular-nums mb-3">{plan.id}</div>
                <h2 className="text-xl font-heading font-bold text-[var(--text-heading)] mb-2">{plan.title}</h2>
                <p className="text-sm text-[var(--text-body)] mb-1">{plan.desc}</p>
                <p className="text-xs text-[var(--text-tertiary)] mb-4">{plan.detail}</p>
                <p className="text-lg font-bold text-[var(--text-heading)] mb-6">{plan.price}</p>
                <ul className="space-y-2 mb-8">
                  {plan.items.map((item, j) => (
                    <li key={j} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--color-accent)] mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <a href="/admission" className="inline-block w-full text-center border border-[var(--border-default)] text-[var(--text-secondary)] px-4 py-2.5 rounded-md text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">先做免费评估 →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-semibold text-[var(--color-accent)] mb-4 tracking-widest">投入与回报</div>
              <h2 className="text-2xl font-heading font-bold text-[var(--text-heading)]">自己干 vs 用系统</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th className="text-left py-3 pr-4 text-[var(--text-secondary)] font-medium"></th>
                    <th className="text-left py-3 px-4 text-[var(--text-secondary)] font-medium">自己摸索</th>
                    <th className="text-left py-3 pl-4 text-[var(--text-secondary)] font-medium">fhopc 方案</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['每日时间投入', '2-3 小时', '15 分钟'],
                    ['月度工具成本', '乱买 ≈ 800 元', '按需 ≈ 200 元'],
                    ['方向试错', '3-6 个月没方向', '数据跟踪及时调整'],
                    ['出单预期', '不确定', '30 天可见效果'],
                    ['心态损耗', '高（一个人扛）', '低（有人把关）'],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border-default)]">
                      <td className="py-3 pr-4 font-medium text-[var(--text-heading)]">{row[0]}</td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{row[1]}</td>
                      <td className="py-3 pl-4 text-[var(--color-accent)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-semibold text-[var(--color-accent)] mb-4 tracking-widest">怎么选</div>
              <h2 className="text-2xl font-heading font-bold text-[var(--text-heading)]">你的阶段决定你的起点</h2>
            </div>
            <div className="space-y-4">
              {[
                { state: '有想法，不知道做不做', action: '先做免费评估', cost: '免费' },
                { state: '有方向，不知道第一单怎么出', action: '启动包', cost: '一次性' },
                { state: '已经在做，不确定对不对', action: '陪跑计划', cost: '月度' },
                { state: '一个人扛不住了', action: '全托管', cost: '月度' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-[var(--border-default)] last:border-0">
                  <span className="text-sm text-[var(--text-heading)]">{item.state}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--color-accent)]">{item.action}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{item.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <p className="text-sm text-[var(--text-secondary)] mb-6">还不确定？先做免费评估。10 分钟，系统告诉你该从哪开始。</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
          </div>
        </section>

        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司系统化交付</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
              <a href="/team" className="hover:text-[var(--text-heading)] transition-colors">团队</a>
              <a href="/insights" className="hover:text-[var(--text-heading)] transition-colors">痛点</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';

const roles = [
  {
    id: '01', status: '生效中', title: '方向审查',
    do: [
      '量化评估你的方向成熟度：需求有多迫切、实现难度多大、变现路径清不清晰',
      '判断你处于什么阶段——刚有想法、已经开始、还是扛不住了',
      '输出方向评估报告：分数、薄弱点、推荐下一步',
    ],
    dont: ['不降低标准凑数量', '不替你做创业决定'],
  },
  {
    id: '02', status: '生效中', title: '赛道分析',
    do: [
      '用数据判断赛道空间和入局窗口',
      '对照最新市场数据和竞争格局做对标',
      '识别高危禁区——从真实踩坑案例中提取的决策红线',
      '输出赛道评分报告',
    ],
    dont: ['不看宏观趋势报告', '不画大饼只说事实'],
  },
  {
    id: '03', status: '生效中', title: '合规规划',
    do: [
      '主体选择建议：个体户还是有限公司，按收入规模推荐',
      '注册城市推荐：多维度打分，推荐最优注册地',
      '财税合规框架搭建：对公账户、凭证留存、申报三条铁律',
      '合同模板设计：金额、交付、验收、退款、版权条款',
    ],
    dont: ['不替代律师提供法律意见', '不承诺节税结果'],
  },
  {
    id: '04', status: '生效中', title: '市场验证',
    do: [
      '7 天从想法到验证：痛点访谈→原型搭建→种子用户测试→收第一笔钱',
      '提供验证检查清单：可演示方案 + 至少 3 个付费意向',
      '种子用户获取渠道策略',
      '输出付费验证记录与决策报告',
    ],
    dont: ['不搞问卷调研', '不替代你执行核心产出'],
  },
  {
    id: '05', status: '生效中', title: '自动化搭建',
    do: [
      '按预算配置工具：验证期 0-500 / 稳定期 500-2000 / 增长期 2000+',
      'AI 框架选型指南：Dify / Coze / n8n 等主流方案对比',
      '成本优化：追踪表 + 预算上限 + 降级策略',
      '按职能匹配工具：内容、客服、数据、项目自动化',
    ],
    dont: ['不做大平台集成', '不搭你当前不需要的东西'],
  },
  {
    id: '06', status: '生效中', title: '经营审计',
    do: [
      '核心经营指标诊断：收入结构、成本分布、时间分配',
      '获客策略复盘与优化：哪些渠道有效、哪些在浪费',
      '标准化交付流程审计：启动→执行→内审→修订→交付',
      '复购与转介绍机制设计',
    ],
    dont: ['不做财务记账', '不做安慰式复盘'],
  },
  {
    id: '07', status: '生效中', title: '交付把关',
    do: [
      '标准化交付管理：需求确认→方案设计→执行→验收→交付',
      '每阶段验收标准与进度可视化',
      '客户满意度管理与复购闭环设计',
      '客户案例沉淀——把交付物变成获客素材',
    ],
    dont: ['不替你写代码写文案', '不外包你的核心工作'],
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
          <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">做什么</div>
          <ul className="space-y-1.5">
            {role.do.map((item, i) => (
              <li key={i} className="text-sm text-[var(--text-body)] leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">不做什么</div>
          <ul className="space-y-1.5">
            {role.dont.map((item, i) => (
              <li key={i} className="text-sm text-[var(--text-tertiary)] leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)] mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
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
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className={`transition-all duration-800 ease-helio ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="section-label">关于我们</div>
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                我们自己就是一人公司
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl">
                我们自己就是一个人跑通全流程的。所以你的每一个痛点，我们都亲自经历过。
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 border-t border-[var(--border-default)]">
          <div className="px-8 py-16">
            <div className="max-w-2xl text-sm text-[var(--text-body)] leading-relaxed space-y-4">
              <p>fhopc 本身就是一个一人公司。没有团队，没有办公室，没有融资。</p>
              <p>我们搭建这套系统，首先是为了让自己能一个人运转——内容、获客、交付、审计，全部自动化跑通。后来发现，这个过程本身可以复制给跟我们一样的人。</p>
              <p>所以我们的七个角色，不是什么咨询师团队。是一套 AI 驱动的自动化系统，在背后替你盯着每一个环节。你做决定，系统执行。</p>
            </div>
          </div>
        </section>

        <section className="pb-32 border-t border-[var(--border-default)]">
          <div className="container-content divide-y divide-[var(--border-default)]">
            {roles.map((role, i) => (
              <div key={role.id} className="py-12 first:pt-16"><RoleCard role={role} index={i} /></div>
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <p className="text-sm text-[var(--text-heading)] font-medium mb-6">先看看你的方向对不对 →</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
          </div>
        </section>

        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司系统化交付</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
              <a href="/collab" className="hover:text-[var(--text-heading)] transition-colors">合作</a>
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
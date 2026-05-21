'use client';

import { useEffect, useState } from 'react';

const roles = [
  {
    id: '01', status: '生效中',
    title: '准入审核官',
    do: [
      '用赛道自评打分表量化评估方向成熟度（需求刚性×技术成熟度×变现清晰度）',
      '对照转化 5 阶段判断你的所处位置（首次接触→需求诊断→方案报价→标准交付→复购推荐）',
      '根据百日盈利蓝图的三阶段规划推荐匹配的验证方案',
      '输出方向评估报告：分数、薄弱点、推荐方案',
    ],
    dont: [
      '不降低评估标准凑验证数量',
      '不替你做创业决定',
    ],
  },
  {
    id: '02', status: '生效中',
    title: '赛道研判师',
    do: [
      '用赛道三维度模型量化评估方向（需求刚性 × 技术成熟度 × 变现清晰度）',
      '对照 2026 年 TOP10 高潜力赛道数据和竞争格局做市场对标',
      '识别 5 类高危禁区——从真实踩坑案例中提取的决策红线',
      '输出赛道评分报告，含 23 城市 OPC 政策红利对比',
      '基于四象限商业模式和三明治定价法设计收入结构方案',
    ],
    dont: [
      '不看宏观趋势报告，不讲大故事',
      '不替你做决定，只给数据和逻辑',
    ],
  },
  {
    id: '03', status: '生效中',
    title: '合规架构师',
    do: [
      '主体选择决策（个体户 vs 有限公司，按收入规模分级推荐）',
      '城市选择矩阵（7 维度 × 7 城市打分，推荐最优注册地）',
      '财税合规体系搭建——对公账户、凭证留存、按时申报 3 条铁律',
      'AI 合规自查（大模型备案、数据合规、版权归属、算法备案适用场景）',
      'AI 服务合同模板设计（金额、交付、验收、退款、版权条款）',
    ],
    dont: [
      '不替代律师/会计师提供具体法律意见',
      '不承诺节税结果',
    ],
  },
  {
    id: '04', status: '生效中',
    title: 'MVP 验证师',
    do: [
      '7 天 MVP 验证法：Day1-2 痛点访谈 → Day3-5 原型搭建 → Day6-7 种子测试 → Day8-14 收第一笔付费',
      '提供 MVP 检查清单：可演示服务 + ≥3 个付费意向标准',
      '种子用户获取 6 大渠道策略（社群、内容、冷启动联盟等）',
      '输出付费验证记录与 Go/No-Go 决策报告',
    ],
    dont: [
      '不搞调研问卷，不分析"意向"',
      '不替代你执行核心产出',
    ],
  },
  {
    id: '05', status: '生效中',
    title: '自动化工程师',
    do: [
      '三层工具栈按预算配置（验证期 0-500 / 稳定期 500-2000 / 增长期 2000+）',
      '6 大 Agent 框架选型指南（LangChain / Dify / Coze / n8n / CrewAI / OpenClaw）',
      'AI 成本优化六技：成本追踪表 + 预算上限 + 降级策略',
      '无代码 / 低代码 / 自建三种自动化工作流方案',
      '按职能匹配工具矩阵（内容、客服、数据、项目自动化）',
    ],
    dont: [
      '不做大平台集成',
      '不搭你当前不需要的流水线',
    ],
  },
  {
    id: '06', status: '生效中',
    title: '经营审计师',
    do: [
      '核心经营指标体系诊断（收入结构、成本分布、时间分配）',
      '五大平台获客策略复盘与优化（小红书、公众号、即刻、推特、视频号）',
      '标准化交付 SOP 5 阶段审计（启动→执行→内审→修订→交付）',
      '复购与裂变机制设计（订阅制转化、会员体系、自动续费、转介绍激励）',
      '百日复盘：Go/No-Go 决策 + 下阶段计划',
    ],
    dont: [
      '不做财务记账',
      '不做安慰式复盘',
    ],
  },
  {
    id: '07', status: '生效中',
    title: '交付监理',
    do: [
      '标准化交付 5 阶段管理（需求确认→方案设计→执行→验收→交付）',
      '每阶段验收标准与进度可视化',
      'NPS 满意度管理与复购闭环设计',
      '客户案例沉淀——把交付物变成获客素材',
      '合同与收款路径设计（交付物定义、验收标准、退款条款）',
    ],
    dont: [
      '不替你写代码写文案（那是你的产出）',
      '不外包你的核心工作',
    ],
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
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className={`transition-all duration-800 ease-helio ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="section-label">一人公司系统化交付</div>
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                七个角色，一个系统
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl">
                从赛道评估到合规落地，从验证到自动化，每个节点由对应角色把关。
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
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">fhopc · 一人公司系统化交付</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
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
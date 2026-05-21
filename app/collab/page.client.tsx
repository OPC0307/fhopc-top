'use client';

import { useEffect, useState } from 'react';

export default function CollabPage() {
  const [pageVisible, setPageVisible] = useState(false);
  useEffect(() => { setPageVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className={`transition-all duration-800 ease-helio ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="section-label">协作</div>
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                三种深度，按需选择
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl">
                一人公司系统化交付不卖套餐。你的阶段决定了你需要什么深度。
              </p>
            </div>
          </div>
        </section>

        {/* Mode 1: 作业框架 */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-20">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-2">01 作业框架</h2>
            <p className="text-sm text-[var(--color-accent)] mb-4">适用阶段：有想法不知道怎么变成第一单</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">30 天从想法到第一笔订单的验证方案 SOP。含 7 天 MVP 验证法、赛道三维度评估、三层工具栈配置指南。</p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">包含内容</h3>
                <ul className="space-y-2 text-sm text-[var(--text-body)]">
                  <li>• 从零到第一单客户的 30 天 SOP（标准作业流程）</li>
                  <li>• 工具包：合同模板、报价模板、交付清单、客户跟进 SOP</li>
                  <li>• 每周自查清单 —— 不等人催，自己就知道下一步该做什么</li>
                  <li>• 30 天社群答疑（群内随时提问）</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-3">产出清单</h3>
                <ul className="space-y-2 text-sm text-[var(--text-body)]">
                  <li>• 赛道评分报告（需求刚性 × 技术成熟度 × 变现清晰度）</li>
                  <li>• MVP 原型 + 付费验证记录</li>
                  <li>• 百日计划表（Day 1-30 定位与验证）</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">不包含</h3>
                <ul className="space-y-2 text-sm text-[var(--text-tertiary)]">
                  <li>• 不涉及经营数据诊断</li>
                  <li>• 不提供 1v1 复盘会议</li>
                  <li>• 不含自动化工具搭建</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-default)] flex flex-wrap gap-x-8 gap-y-2 text-xs text-[var(--text-secondary)]">
              <span>交付方式：Notion 文档 + 模板包，自主推进</span>
              <span>预期节奏：最快 30 天出第一单</span>
              <span className="text-[var(--text-tertiary)] w-full mt-1">卡点对应：有想法不知道怎么变成第一单 → 从0到出单的30天路径，每一步写清楚。</span>
            </div>
            <div className="mt-8">
              <a
                href="/contact?plan=framework"
                className="inline-flex items-center gap-2 border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200"
              >
                选择作业框架 →
              </a>
            </div>
          </div>
        </section>

        {/* Mode 2: 经营诊断 */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-20">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-2">02 经营诊断</h2>
            <p className="text-sm text-[var(--color-accent)] mb-4">适用阶段：已经在做，但不知道对不对</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">月度经营数据审计 + 策略复盘。含核心指标体系诊断、成本控制优化、NPS 满意度管理、复购裂变设计。</p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">包含内容</h3>
                <ul className="space-y-2 text-sm text-[var(--text-body)]">
                  <li>• 每月一次完整数据审计：收入结构、成本分布、时间分配</li>
                  <li>• 核心经营指标体系诊断 —— 哪在漏、哪在赚、哪在拖</li>
                  <li>• 30 分钟复盘会，我出诊断你执行</li>
                  <li>• 经营指标看板（数据可视化）</li>
                  <li>• NPS 满意度管理与复购裂变机制设计</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-3">产出清单</h3>
                <ul className="space-y-2 text-sm text-[var(--text-body)]">
                  <li>• 月度诊断报告（含核心指标变化趋势）</li>
                  <li>• 成本优化建议书</li>
                  <li>• 复购方案（订阅制/会员体系/自动续费/转介绍激励）</li>
                  <li>• 下月行动计划</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">不包含</h3>
                <ul className="space-y-2 text-sm text-[var(--text-tertiary)]">
                  <li>• 不手把手帮你执行</li>
                  <li>• 不含自动化搭建</li>
                  <li>• 不代替你做决策</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-default)] flex flex-wrap gap-x-8 gap-y-2 text-xs text-[var(--text-secondary)]">
              <span>交付方式：月度数据报告 + 复盘会议</span>
              <span>预期节奏：月度循环</span>
              <span className="text-[var(--text-tertiary)] w-full mt-1">卡点对应：在做但不知道对不对 → 数据告诉你哪里在漏、哪里在赚。</span>
            </div>
            <div className="mt-8">
              <a
                href="/contact?plan=diagnosis"
                className="inline-flex items-center gap-2 border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200"
              >
                选择经营诊断 →
              </a>
            </div>
          </div>
        </section>

        {/* Mode 3: 深度协作 */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-20">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-2">03 深度协作</h2>
            <p className="text-sm text-[var(--color-accent)] mb-4">适用阶段：一个人扛不住了，需要系统兜底</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">全周期验证方案，每周同步。含标准化交付 5 阶段管理、客户案例沉淀、复购裂变设计、合同与收款路径设计。</p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">包含内容</h3>
                <ul className="space-y-2 text-sm text-[var(--text-body)]">
                  <li>• 全流程盯控：方向、执行、交付，每个环节有人把关</li>
                  <li>• 准入 → 赛道 → 合规 → 验证 → 自动化 → 审计 → 交付，7 个角色介入</li>
                  <li>• 标准化交付 5 阶段管理（需求确认→方案设计→执行→验收→交付）</li>
                  <li>• 每周同步 + 随时应急通道</li>
                  <li>• 随时可退，按月结算，无违约金</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-3">产出清单</h3>
                <ul className="space-y-2 text-sm text-[var(--text-body)]">
                  <li>• 周同步纪要 + 交付 SOP</li>
                  <li>• 客户案例库（交付物沉淀为获客素材）</li>
                  <li>• 合同模板（交付物定义/验收标准/退款条款）</li>
                  <li>• 收款方案设计</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">不包含</h3>
                <ul className="space-y-2 text-sm text-[var(--text-tertiary)]">
                  <li>• 不替你写代码写文案（那是你的产出）</li>
                  <li>• 不外包你的核心工作</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-default)] flex flex-wrap gap-x-8 gap-y-2 text-xs text-[var(--text-secondary)]">
              <span>交付方式：全流程跟进，你冲执行系统盯方向和质量</span>
              <span>预期节奏：按周跟进，按月结算</span>
              <span className="text-[var(--text-tertiary)] w-full mt-1">卡点对应：一个人扛不住了 → 你冲执行，系统替你盯方向和质量。</span>
            </div>
            <div className="mt-8">
              <a
                href="/contact?plan=deep"
                className="inline-flex items-center gap-2 border border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200"
              >
                选择深度协作 →
              </a>
            </div>
          </div>
        </section>

        {/* How to choose */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-6">如何选择</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th className="text-left py-3 pr-4 text-[var(--text-secondary)] font-medium">你的状态</th>
                    <th className="text-left py-3 pr-4 text-[var(--text-secondary)] font-medium">推荐模式</th>
                    <th className="text-left py-3 text-[var(--text-secondary)] font-medium">预计投入</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-body)]">
                  <tr className="border-b border-[var(--border-default)]"><td className="py-3 pr-4">有想法，在犹豫做不做</td><td className="py-3 pr-4">先做免费评估，再决定</td><td className="py-3">免费</td></tr>
                  <tr className="border-b border-[var(--border-default)]"><td className="py-3 pr-4">有方向，不知道第一单怎么做</td><td className="py-3 pr-4">作业框架</td><td className="py-3">一次性</td></tr>
                  <tr className="border-b border-[var(--border-default)]"><td className="py-3 pr-4">已经在做，不确定对不对</td><td className="py-3 pr-4">经营诊断</td><td className="py-3">月度</td></tr>
                  <tr><td className="py-3 pr-4">一个人扛不住了</td><td className="py-3 pr-4">深度协作</td><td className="py-3">月度</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <p className="text-sm text-[var(--text-secondary)] mb-6">还是不确定选哪个？先做免费评估。15 分钟，系统告诉你该从哪开始。</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
          </div>
        </section>

        {/* Footer */}
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
'use client';

import { useEffect, useState } from 'react';

const features = [
  {
    number: '01',
    title: '一人公司启动包',
    description: '从注册到报税的全流程指南，AI 工具链配置，30 天 SOP 行动计划。',
  },
  {
    number: '02',
    title: '20 城补贴查询',
    description: '全国 20 个城市创业补贴实时查询，申领条件、材料清单、实操路径全拆解。',
  },
  {
    number: '03',
    title: '赛道适配性评估',
    description: '6 大维度 30 道精选题，15 分钟发现你的独立经营天赋与商业基因。',
  },
  {
    number: '04',
    title: '工商注册代办',
    description: '专业团队协助完成个体户/一人公司注册，最快 0.5 个工作日拿执照。',
  },
  {
    number: '05',
    title: '税务合规服务',
    description: '季度报税、发票管理、税务筹划，让合规变得简单。',
  },
  {
    number: '06',
    title: '创业者社群',
    description: '加入 2000+ OPC 创业者社群，分享经验、获取资源、互相支持。',
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="features" className="border-t border-[var(--border-default)]">
      {/* Heading with padding */}
      <div className="px-8 pt-32 pb-16">
        <div className="max-w-2xl">
          <h2 className={`text-[1.75rem] md:text-[1.875rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] mb-4 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            基础设施
          </h2>
          <p className={`text-lg text-[var(--text-secondary)] transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-100ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            不是给你打鸡血，而是把路捋清楚。从注册到盈利，每一步都有人走过。
          </p>
        </div>
      </div>

      {/* Grid - stretches full width to border-x */}
      <div className="border-t border-[var(--border-default)]">
        {/* Row 1: cards 1-3 with continuous bottom border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)] border-b border-[var(--border-default)]">
          {features.slice(0, 3).map((feature, i) => (
            <div
              key={feature.number}
              className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
                {feature.number}
              </div>
              <h3 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-3 group-hover:text-[var(--text-secondary)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--text-body)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* Row 2: cards 4-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
          {features.slice(3, 6).map((feature, i) => (
            <div
              key={feature.number}
              className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up"
              style={{ animationDelay: `${640 + i * 80}ms` }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
                {feature.number}
              </div>
              <h3 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-3 group-hover:text-[var(--text-secondary)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--text-body)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
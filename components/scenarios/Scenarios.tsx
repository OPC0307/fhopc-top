'use client';

import { useEffect, useState } from 'react';

const scenarios = [
  {
    title: '刚注册，不知道做什么',
    description: '用适配性评估找到最适合你的赛道，避免盲目启动。',
    action: '开始评估',
    href: '/profile',
  },
  {
    title: '知道方向，但不会落地',
    description: '启动包提供 30 天 SOP，从注册到第一单客户。',
    action: '查看启动包',
    href: '/services',
  },
  {
    title: '想省钱，先查补贴',
    description: '20 城补贴政策实时查询，最高领 3 万元。',
    action: '查询补贴',
    href: '/subsidy',
  },
  {
    title: '怕踩坑，先看案例',
    description: '真实创业者的成功与失败，少走弯路。',
    action: '看案例',
    href: '/cases',
  },
];

export function Scenarios() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="scenarios" className="border-t border-[var(--border-default)]">
      {/* Heading with padding */}
      <div className="px-8 pt-32 pb-16">
        <div className="max-w-2xl">
          <h2 className={`text-[1.75rem] md:text-[1.875rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] mb-4 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            你在哪个阶段？
          </h2>
          <p className={`text-lg text-[var(--text-secondary)] transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-100ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            不管你现在是什么状态，都有对应的工具和路径。
          </p>
        </div>
      </div>

      {/* Grid - stretches full width to border-x */}
      <div className="border-t border-[var(--border-default)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
          {scenarios.map((scenario, i) => (
            <a
              key={scenario.title}
              href={scenario.href}
              className="group p-8 hover:bg-[var(--btn-hover)] transition-colors animate-fade-in-up"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <h3 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-3 group-hover:text-[var(--text-secondary)] transition-colors">
                {scenario.title}
              </h3>
              <p className="text-[var(--text-body)] text-sm leading-relaxed mb-4">
                {scenario.description}
              </p>
              <div className="inline-flex items-center gap-1.5 text-sm font-medium opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                <span className="text-[var(--color-accent)]">{scenario.action}</span>
                <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
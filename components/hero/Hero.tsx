'use client';

import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24" style={{ borderBottom: '1px solid var(--border-default)' }}>
      <div className="container-custom">
        <div className="max-w-3xl">
          {/* 小标签 */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-default)] mb-8 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] animate-pulse-dot" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              2026 一人公司浪潮
            </span>
          </div>

          {/* 主标题 - 左对齐 */}
          <h1 className={`text-[2.125rem] md:text-[2.5rem] lg:text-[2.625rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] leading-[1.15] mb-8 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-100ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            一人公司<br />
            <span className="text-[var(--color-foreground)]">系统化交付</span>
          </h1>

          {/* 副标题 - 左对齐 */}
          <p className={`text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-12 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-200ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            2026 年中国个体工商户突破 1.2 亿。92% 在注册后 12 个月内月收入低于 1 万元。
            我们花了一年时间，跑了 12 个行业、20 个城市——先把路捋清楚了。
          </p>

          {/* CTA 按钮组 - 左对齐 */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-300ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="/profile"
              className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-white px-6 py-3 rounded-md font-medium text-base hover:bg-[var(--color-accent)] transition-colors"
            >
              赛道适配性评估
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 ease-helio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/subsidy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-base text-[var(--text-heading)] border border-[var(--border-default)] hover:border-[var(--color-accent)] transition-colors"
            >
              查询 20 城补贴
            </a>
          </div>

          {/* 副 CTA 说明 */}
          <p className={`mt-6 text-sm text-[var(--text-tertiary)] transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-400ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            免费 · 约三分钟 · 6 大维度 30 道精选题
          </p>
        </div>
      </div>
    </section>
  );
}

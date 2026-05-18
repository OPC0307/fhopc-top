'use client';

import { useEffect, useState } from 'react';

const testimonials = [
  {
    quote: '以前觉得一人公司是画饼，现在才知道是工具。关键是你要先动起来。',
    author: '李同学',
    role: '独立数据分析师',
  },
  {
    quote: '92% 的人被建议暂缓启动，我属于那 8%。现在月入 3 万，一个人干完以前一个团队的活。',
    author: '王设计',
    role: 'UI 设计师',
  },
  {
    quote: '补贴申请真的能拿到钱，我领了 1.5 万。关键是要知道怎么申请，不是盲目填表。',
    author: '张创业',
    role: '电商卖家',
  },
];

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-32 md:py-40 border-t border-[var(--border-default)]">
      <div className="container-custom">
        <div className="max-w-2xl mb-16">
          <h2 className={`text-[1.75rem] md:text-[1.875rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] mb-4 transition-all duration-800 cubic-bezier(0.16,1,0.3,1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            他们在说什么
          </h2>
          <p className={`text-lg text-[var(--text-secondary)] transition-all duration-800 cubic-bezier(0.16,1,0.3,1) delay-100ms ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            不是成功学，是真实的声音。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`py-6 border-b border-[var(--border-default)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${400 + i * 120}ms` }}
            >
              <svg
                className="w-8 h-8 text-[var(--text-tertiary)] opacity-20 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-[var(--text-body)] leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-[var(--text-heading)] text-sm">
                  {testimonial.author}
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

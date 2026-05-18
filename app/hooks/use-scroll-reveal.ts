'use client';

import { useEffect, useRef } from 'react';

/**
 * 滚动触发动画 Hook
 * 元素进入视口时添加 is-visible 类，触发淡入动画
 */
export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
}

/**
 * 阅读进度条 Hook
 */
export function useReadingProgress() {
  useEffect(() => {
    const progressEl = document.getElementById('reading-progress');
    if (!progressEl) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressEl.style.width = `${Math.min(progress, 100)}%`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);
}

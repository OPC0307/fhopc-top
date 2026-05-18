'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { label: '团队', href: '/team' },
  { label: '协作', href: '#collab' },
  { label: '观察', href: '/insights' },
  { label: '准入', href: '#cta' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-500 cubic-bezier(0.16,1,0.3,1) ${
        scrolled
          ? 'bg-[var(--color-background)]/80 backdrop-blur-nav border-[var(--border-default)]'
          : 'bg-[var(--color-background)] border-[var(--border-default)]'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-8 h-16 flex items-center justify-between">
        <a href="/" className="font-heading text-xl font-bold text-[var(--text-heading)] tracking-tight">
          fhopc
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[var(--text-heading)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
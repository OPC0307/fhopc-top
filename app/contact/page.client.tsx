'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PLAN_LABELS: Record<string, string> = {
  framework: '启动包',
  diagnosis: '陪跑计划',
  deep: '全托管',
};

function ContactForm() {
  const searchParams = useSearchParams();
  const planSlug = searchParams.get('plan') || '';
  const planLabel = PLAN_LABELS[planSlug] || '';

  const [pageVisible, setPageVisible] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setPageVisible(true);
  }, []);

  const canSubmit = name.trim() && contact.trim() && !submitting;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, note, plan: planSlug }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '提交失败，请重试');
      }
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : '提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  }, [canSubmit, name, contact, note, planSlug]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
          <section className="py-32 md:py-40">
            <div className="px-8 max-w-xl mx-auto text-center">
              <div
                className={`transition-all duration-800 ease-helio ${
                  pageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">✓</span>
                </div>
                <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                  提交成功
                </h1>
                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-8">
                  我们会在24小时内通过你留下的联系方式和你沟通。
                  <br />
                  如果你想主动联系：
                  <a
                    href="mailto:hello@fhopc.top"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    hello@fhopc.top
                  </a>
                </p>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="/"
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-heading)] transition-colors"
                  >
                    返回首页
                  </a>
                  <span className="text-xs text-[var(--text-tertiary)]">·</span>
                  <a
                    href="/admission"
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-heading)] transition-colors"
                  >
                    重新评估
                  </a>
                </div>
              </div>
            </div>
          </section>
          <footer className="py-16 border-t border-[var(--border-default)]">
            <div className="container-content">
              <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">
                fhopc · 一人公司系统化交付
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
                <a
                  href="/"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  首页
                </a>
                <a
                  href="/team"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  关于
                </a>
                <a
                  href="/collab"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  合作
                </a>
                <a
                  href="/insights"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  痛点
                </a>
                <a
                  href="/admission"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  准入
                </a>
                <a
                  href="mailto:hello@fhopc.top"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  hello@fhopc.top
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8 max-w-xl mx-auto">
            <div
              className={`transition-all duration-800 ease-helio ${
                pageVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                提交意向
              </h1>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                我们会在24小时内联系你。
              </p>
              {planLabel && (
                <span className="inline-block text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full">
                  你选择的方案：{planLabel}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content max-w-xl py-16">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="你的名字"
                  className="w-full bg-[var(--btn-hover)] text-[var(--text-body)] text-sm rounded-lg p-4 border border-[var(--border-default)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 placeholder:text-[var(--text-tertiary)]"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  联系方式
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="手机号 / 微信号 / 邮箱"
                  className="w-full bg-[var(--btn-hover)] text-[var(--text-body)] text-sm rounded-lg p-4 border border-[var(--border-default)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 placeholder:text-[var(--text-tertiary)]"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-heading)] mb-2">
                  备注
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="想了解的更多信息（选填）"
                  rows={3}
                  className="w-full bg-[var(--btn-hover)] text-[var(--text-body)] text-sm rounded-lg p-4 border border-[var(--border-default)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 resize-none placeholder:text-[var(--text-tertiary)]"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-6 text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full bg-[var(--color-accent)] text-white font-medium text-sm px-6 py-3.5 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 flex items-center justify-center gap-2 mt-8"
            >
              {submitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  提交中...
                </>
              ) : (
                '提交意向'
              )}
            </button>

            <p className="text-xs text-[var(--text-tertiary)] mt-4 text-center leading-relaxed">
              提交即表示你同意我们处理你的联系信息，仅用于系统化交付业务沟通。
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">
              fhopc · 一人公司系统化交付
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <a
                href="/"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                首页
              </a>
              <a
                href="/team"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                关于
              </a>
              <a
                href="/collab"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                合作
              </a>
              <a
                href="/insights"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                痛点
              </a>
              <a
                href="/admission"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                准入
              </a>
              <a
                href="mailto:hello@fhopc.top"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                hello@fhopc.top
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}
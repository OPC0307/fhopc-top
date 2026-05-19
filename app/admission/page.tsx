'use client';

import { useCallback, useEffect, useState } from 'react';

type FormData = {
  direction: string;
  experience: string;
  commitment: string;
  budget: string;
  blocker: string;
};

type ResultData = {
  score: number;
  maxScore: number;
  level: string;
  levelLabel: string;
  recommendation: {
    plan: string;
    planPrice: string;
    summary: string;
  } | null;
  weakPoints: string[];
  feedback: string;
  adjustments?: string[];
};

const QUESTIONS = [
  {
    id: 'direction',
    num: '01',
    title: '方向',
    question: '你有一个明确想做的方向吗？它是什么？',
    example:
      '例："我想做AI+宠物养护咨询"、"我打算做中小企业内容代运营"\n不需要写商业计划书，但要能一句话说清你想做什么。',
  },
  {
    id: 'experience',
    num: '02',
    title: '经验',
    question: '你在这个方向上有行业经验吗？多久？',
    example:
      '例："我在宠物行业做了3年运营"、"完全没有，但我想学"\n我们看重的是你是否了解这个行业怎么运转。',
    options: [
      { value: 'none', label: '无经验' },
      { value: 'less-than-1', label: '不到1年' },
      { value: '1-3', label: '1-3年' },
      { value: '3-plus', label: '3年以上' },
    ],
  },
  {
    id: 'commitment',
    num: '03',
    title: '投入',
    question: '你每周能投入多少时间？愿意持续多久？',
    example:
      '例："每周20小时，先试3个月"、"有空才做"\n"有空才做"说明你还没准备好——这个答案我们直接告诉你。',
    options: [
      { value: 'less-than-5', label: '每周不到5h' },
      { value: '5-15', label: '5-15h' },
      { value: '15-30', label: '15-30h' },
      { value: '30-plus', label: '30h以上' },
    ],
  },
  {
    id: 'budget',
    num: '04',
    title: '资金',
    question: '你准备投入多少启动资金？',
    example:
      '例："2000/月"、"不想花钱"、"可以先接单再投入"\n不需要大资本，但需要你诚实。零启动在某些方向可行，不代表所有方向都可行。',
    options: [
      { value: 'none', label: '不想花钱' },
      { value: 'under-1000', label: '1000以下/月' },
      { value: '1000-5000', label: '1000-5000/月' },
      { value: '5000-plus', label: '5000以上/月' },
    ],
  },
  {
    id: 'blocker',
    num: '05',
    title: '卡点',
    question: '你目前卡在哪一步？',
    example: '',
    options: [
      { value: 'have-direction', label: '有方向但不知道怎么干' },
      { value: 'validating', label: '正在验证不确定对不对' },
      { value: 'unstable-income', label: '有收入但不稳定' },
      { value: 'stable-income', label: '有稳定收入想突破' },
      { value: 'other', label: '以上都不是' },
    ],
  },
];

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                selected
                  ? 'border-[var(--color-accent)]'
                  : 'border-[var(--text-tertiary)] group-hover:border-[var(--text-secondary)]'
              }`}
            >
              {selected && (
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
              )}
            </span>
            <span
              className={`text-sm transition-colors duration-200 ${
                selected
                  ? 'text-[var(--text-heading)] font-medium'
                  : 'text-[var(--text-body)]'
              }`}
            >
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export default function AdmissionPage() {
  const [pageVisible, setPageVisible] = useState(false);
  const [form, setForm] = useState<FormData>({
    direction: '',
    experience: '',
    commitment: '',
    budget: '',
    blocker: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setPageVisible(true);
  }, []);

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const canSubmit =
    form.direction.trim() &&
    form.experience &&
    form.commitment &&
    form.budget &&
    form.blocker;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '提交失败，请重试');
      }
      const data: ResultData = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  }, [canSubmit, submitting, form]);

  const handleReset = useCallback(() => {
    setForm({
      direction: '',
      experience: '',
      commitment: '',
      budget: '',
      blocker: '',
    });
    setResult(null);
    setError('');
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto md:border-x md:border-[var(--border-default)]">
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div
              className={`transition-all duration-800 ease-helio ${
                pageVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-[2rem] md:text-[2.5rem] font-heading font-bold tracking-tight text-[var(--text-heading)] mb-4">
                评估你的方向
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl">
                不是所有人都适合一个人创业，我们会直接告诉你。
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-16">
            <p className="text-sm text-[var(--text-body)] leading-relaxed max-w-2xl">
              回答以下5个问题，我们就知道你的创业方向值不值得继续。这不是问卷，是我们判断你当前状态的依据。答完这些，适合的直接告诉你推荐哪个协作模式，不适合的直接说原因。
            </p>
          </div>
        </section>

        {!result ? (
          /* Form Section */
          <section className="border-t border-[var(--border-default)]">
            <div className="container-content divide-y divide-[var(--border-default)]">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="py-12 first:pt-0">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-semibold text-[var(--color-accent)] tabular-nums">
                      {q.num}
                    </span>
                    <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">
                      {q.title}
                    </h2>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-body)] mb-3">
                    {q.question}
                  </p>

                  {q.id === 'direction' ? (
                    <textarea
                      value={form.direction}
                      onChange={(e) => updateField('direction', e.target.value)}
                      placeholder="例：我想做AI+宠物养护咨询"
                      rows={3}
                      className="w-full bg-[var(--btn-hover)] text-[var(--text-body)] text-sm rounded-lg p-4 border border-[var(--border-default)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 resize-none placeholder:text-[var(--text-tertiary)]"
                    />
                  ) : (
                    <RadioGroup
                      name={q.id}
                      options={q.options!}
                      value={form[q.id as keyof FormData] as string}
                      onChange={(v) =>
                        updateField(q.id as keyof FormData, v)
                      }
                    />
                  )}

                  {q.example && (
                    <div className="mt-3 text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed whitespace-pre-line">
                      {q.example}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="container-content py-12 border-t border-[var(--border-default)]">
              {error && (
                <p className="text-sm text-red-500 mb-4 text-center">
                  {error}
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full bg-[var(--color-accent)] text-white font-medium text-sm px-6 py-3.5 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    评估中...
                  </>
                ) : (
                  '提交评估'
                )}
              </button>
            </div>
          </section>
        ) : (
          /* Result Section */
          <section className="border-t border-[var(--border-default)]">
            <div className="container-content py-16">
              {/* Score */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[var(--color-accent)] mb-4">
                  <span className="text-2xl font-bold text-[var(--color-accent)]">
                    {result.score}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-2">
                  满分 {result.maxScore} 分
                </p>
                <span className="inline-block text-xs font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full">
                  {result.levelLabel}
                </span>
              </div>

              {/* Feedback */}
              <div className="bg-[var(--btn-hover)] rounded-lg p-6 mb-6">
                <p className="text-sm text-[var(--text-body)] leading-relaxed">
                  {result.feedback}
                </p>
              </div>

              {result.recommendation ? (
                /* Recommended */
                <>
                  {result.weakPoints.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-[var(--text-heading)] mb-2">
                        需要注意
                      </p>
                      <ul className="space-y-1">
                        {result.weakPoints.map((wp) => (
                          <li
                            key={wp}
                            className="text-xs text-[var(--text-secondary)] flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />{' '}
                            {wp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="border border-[var(--border-default)] rounded-lg p-6 mb-6">
                    <p className="text-xs text-[var(--text-tertiary)] mb-1">
                      推荐方案
                    </p>
                    <p className="text-lg font-semibold text-[var(--text-heading)] mb-1">
                      {result.recommendation.plan}
                    </p>
                    <p className="text-sm text-[var(--color-accent)] font-medium mb-3">
                      {result.recommendation.planPrice}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {result.recommendation.summary}
                    </p>
                  </div>

                  <a
                    href={result.recommendation?.plan === '深度协作' ? '/contact?plan=deep' : '/contact?plan=diagnosis'}
                    className="block w-full text-center bg-[var(--color-accent)] text-white font-medium text-sm px-6 py-3.5 rounded-lg hover:brightness-110 transition-all duration-200 mb-3"
                  >
                    选择方案 →
                  </a>
                </>
              ) : (
                /* Not ready */
                <>
                  <div className="border border-[var(--border-default)] rounded-lg p-6 mb-6">
                    <p className="text-xs font-semibold text-[var(--text-heading)] mb-3">
                      调整建议
                    </p>
                    <ul className="space-y-3">
                      {result.adjustments?.map((adj) => (
                        <li
                          key={adj}
                          className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-1 shrink-0" />
                          {adj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <button
                onClick={handleReset}
                className="block w-full text-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-heading)] transition-colors py-2"
              >
                重新评估
              </button>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <p className="text-sm text-[var(--text-heading)] font-medium mb-6">
              5个问题，知道你的方向值不值得继续。
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
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">
              fhopc · 一人公司孵化器
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
                团队
              </a>
              <a
                href="/collab"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                协作
              </a>
              <a
                href="/insights"
                className="hover:text-[var(--text-heading)] transition-colors"
              >
                痛点
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
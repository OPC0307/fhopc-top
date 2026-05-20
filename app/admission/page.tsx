'use client';

import { useCallback, useEffect, useState } from 'react';

type FormData = {
  direction: string;
  experience: string;
  commitment: string;
  budget: string;
  blocker: string;
  demand: string;
  tech: string;
  monetization: string;
  competition: string;
  fit: string;
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

const BASE_QUESTIONS = [
  {
    id: 'direction',
    num: '01',
    title: '方向',
    question: '你有一个明确想做的方向吗？它是什么？',
    example:
      '例："我想做AI+宠物养护咨询"、"我打算做中小企业内容代运营"\n需要一句话说清你想做什么、为谁做。',
  },
  {
    id: 'experience',
    num: '02',
    title: '经验',
    question: '你在这个方向上有行业经验吗？多久？',
    example: '例："我在宠物行业做了3年运营"、"完全没有，但我想学"',
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
    example: '例："每周20小时，先试3个月"\n"有空才做"说明你还没准备好。',
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
    example: '例："2000/月"\n零启动在某些方向可行，不代表所有方向都可行。',
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

const TRACK_QUESTIONS = [
  {
    id: 'demand',
    num: '06',
    title: '需求刚性',
    question: '你的目标客户对这个解决方案有多迫切？',
    example: '最真实的验证是：客户已经在为这个问题花钱。',
    options: [
      { value: 'none', label: '没有明确需求' },
      { value: 'weak', label: '有需求但不迫切' },
      { value: 'moderate', label: '有明确痛点，正在找方案' },
      { value: 'strong', label: '非常迫切，愿意立即付费' },
    ],
  },
  {
    id: 'tech',
    num: '07',
    title: '技术成熟度',
    question: '实现这个方案所需的技术成熟度如何？',
    example: '一人公司不需要自研，优先选择有成熟工具和API的方案。',
    options: [
      { value: 'none', label: '需要自研核心技术' },
      { value: 'low', label: '有开源方案但需大量定制' },
      { value: 'moderate', label: '有成熟工具/API可用' },
      { value: 'high', label: '现有AI工具可直接实现' },
    ],
  },
  {
    id: 'monetization',
    num: '08',
    title: '变现清晰度',
    question: '你的变现路径有多清晰？',
    example: '能说清"谁付多少钱买什么"比写BP更有用。',
    options: [
      { value: 'none', label: '还不知道怎么收费' },
      { value: 'vague', label: '有想法但未验证' },
      { value: 'clear', label: '有明确收费模式' },
      { value: 'proven', label: '已有付费客户' },
    ],
  },
  {
    id: 'competition',
    num: '09',
    title: '市场竞争',
    question: '目标市场的竞争格局如何？',
    example: '有竞争说明有需求，但要找到差异化切入点。',
    options: [
      { value: 'red', label: '红海市场，巨头主导' },
      { value: 'competitive', label: '竞争激烈但有机会' },
      { value: 'moderate', label: '有一定竞争' },
      { value: 'blue', label: '蓝海市场，竞品少' },
    ],
  },
  {
    id: 'fit',
    num: '10',
    title: '个人匹配度',
    question: '你的经验/资源与这个方向的匹配程度如何？',
    example: '最可靠的起点是你已经做过的事的延伸，不是从零跨界。',
    options: [
      { value: 'none', label: '跨行，从零开始' },
      { value: 'related', label: '有相关经验但非直接' },
      { value: 'direct', label: '有直接行业经验' },
      { value: 'expert', label: '有行业经验+资源积累' },
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
    demand: '',
    tech: '',
    monetization: '',
    competition: '',
    fit: '',
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

  const allRadioQuestions = [...BASE_QUESTIONS, ...TRACK_QUESTIONS].filter(q => q.id !== 'direction');
  const canSubmit =
    form.direction.trim() &&
    allRadioQuestions.every(q => form[q.id as keyof FormData]);

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
      demand: '',
      tech: '',
      monetization: '',
      competition: '',
      fit: '',
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
                10 个问题，判断你的创业成熟度 + 赛道可行性。
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content py-16">
            <p className="text-sm text-[var(--text-body)] leading-relaxed max-w-2xl mb-6">
              回答以下 10 个问题，我们就知道你的方向值不值得继续。
              5 个基础诊断 + 5 个赛道评估，覆盖个人条件和方向可行性。
              适合的直接告诉你推荐哪个协作模式，不适合的直接说原因。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full">Q1-Q5 基础诊断</span>
              <span className="text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] px-3 py-1 rounded-full">Q6-Q10 赛道评估</span>
            </div>
          </div>
        </section>

        {!result ? (
          /* Form Section */
          <section className="border-t border-[var(--border-default)]">
            <div className="container-content divide-y divide-[var(--border-default)]">
              {/* Section label: 基础诊断 */}
              <div className="py-8 first:pt-0">
                <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">第一部分：基础诊断</span>
              </div>

              {BASE_QUESTIONS.map((q) => (
                <div key={q.id} className="py-12">
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
                      onChange={(v) => updateField(q.id as keyof FormData, v)}
                    />
                  )}

                  {q.example && (
                    <div className="mt-3 text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed whitespace-pre-line">
                      {q.example}
                    </div>
                  )}
                </div>
              ))}

              {/* Section label: 赛道评估 */}
              <div className="py-8">
                <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">第二部分：赛道评估</span>
              </div>

              {TRACK_QUESTIONS.map((q) => (
                <div key={q.id} className="py-12">
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

                  <RadioGroup
                    name={q.id}
                    options={q.options!}
                    value={form[q.id as keyof FormData] as string}
                    onChange={(v) => updateField(q.id as keyof FormData, v)}
                  />

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
                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" /> {wp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommendation && (
                <div className="border border-[var(--border-default)] rounded-lg p-6 mb-6">
                  <p className="text-xs text-[var(--text-tertiary)] mb-1">
                    推荐方案
                  </p>
                  <p className="text-lg font-semibold text-[var(--text-heading)] mb-1">
                    {result.recommendation.plan}
                  </p>
                  {result.recommendation.planPrice !== '待定' && (
                    <p className="text-sm text-[var(--color-accent)] font-medium mb-3">
                      {result.recommendation.planPrice}
                    </p>
                  )}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {result.recommendation.summary}
                  </p>
                </div>
              )}

              {result.level === 'deep' && (
                <a
                  href="/contact?plan=deep"
                  className="block w-full text-center bg-[var(--color-accent)] text-white font-medium text-sm px-6 py-3.5 rounded-lg hover:brightness-110 transition-all duration-200 mb-3"
                >
                  选择深度协作 →
                </a>
              )}
              {result.level === 'diagnosis' && (
                <a
                  href="/contact?plan=diagnosis"
                  className="block w-full text-center bg-[var(--color-accent)] text-white font-medium text-sm px-6 py-3.5 rounded-lg hover:brightness-110 transition-all duration-200 mb-3"
                >
                  选择经营诊断 →
                </a>
              )}
              {result.level === 'framework' && (
                <a
                  href="/contact?plan=framework"
                  className="block w-full text-center bg-[var(--color-accent)] text-white font-medium text-sm px-6 py-3.5 rounded-lg hover:brightness-110 transition-all duration-200 mb-3"
                >
                  选择作业框架 →
                </a>
              )}

              {result.adjustments && result.adjustments.length > 0 && (
                <div className="border border-[var(--border-default)] rounded-lg p-6 mb-6">
                  <p className="text-xs font-semibold text-[var(--text-heading)] mb-3">
                    调整建议
                  </p>
                  <ul className="space-y-3">
                    {result.adjustments.map((adj) => (
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
              10 个问题，知道你的方向值不值得继续。
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
              <a href="/" className="hover:text-[var(--text-heading)] transition-colors">首页</a>
              <a href="/team" className="hover:text-[var(--text-heading)] transition-colors">团队</a>
              <a href="/collab" className="hover:text-[var(--text-heading)] transition-colors">协作</a>
              <a href="/insights" className="hover:text-[var(--text-heading)] transition-colors">痛点</a>
              <a href="mailto:hello@fhopc.top" className="hover:text-[var(--text-heading)] transition-colors">hello@fhopc.top</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
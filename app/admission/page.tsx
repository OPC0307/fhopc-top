'use client';

import { useEffect, useState } from 'react';

export default function AdmissionPage() {
  const [pageVisible, setPageVisible] = useState(false);
  useEffect(() => { setPageVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <section className="py-32 md:py-40">
          <div className="px-8">
            <div className={`transition-all duration-800 ease-helio ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

        {/* 5 Diagnostic Questions */}
        <section className="border-t border-[var(--border-default)]">
          <div className="container-content divide-y divide-[var(--border-default)]">
            {/* Q1 */}
            <div className="py-12 first:pt-0">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-semibold text-[var(--color-accent)] tabular-nums">01</span>
                <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">方向</h2>
              </div>
              <p className="text-sm font-medium text-[var(--text-body)] mb-3">你有一个明确想做的方向吗？它是什么？</p>
              <div className="text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed">
                例：&ldquo;我想做AI+宠物养护咨询&rdquo;、&ldquo;我打算做中小企业内容代运营&rdquo;<br />
                不需要写商业计划书，但要能一句话说清你想做什么。
              </div>
            </div>

            {/* Q2 */}
            <div className="py-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-semibold text-[var(--color-accent)] tabular-nums">02</span>
                <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">经验</h2>
              </div>
              <p className="text-sm font-medium text-[var(--text-body)] mb-3">你在这个方向上有行业经验吗？多久？</p>
              <div className="text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed">
                例：&ldquo;我在宠物行业做了3年运营&rdquo;、&ldquo;完全没有，但我想学&rdquo;<br />
                我们看重的是你是否了解这个行业怎么运转。
              </div>
            </div>

            {/* Q3 */}
            <div className="py-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-semibold text-[var(--color-accent)] tabular-nums">03</span>
                <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">投入</h2>
              </div>
              <p className="text-sm font-medium text-[var(--text-body)] mb-3">你每周能投入多少时间？愿意持续多久？</p>
              <div className="text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed">
                例：&ldquo;每周20小时，先试3个月&rdquo;、&ldquo;有空才做&rdquo;<br />
                &ldquo;有空才做&rdquo;说明你还没准备好——这个答案我们直接告诉你。
              </div>
            </div>

            {/* Q4 */}
            <div className="py-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-semibold text-[var(--color-accent)] tabular-nums">04</span>
                <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">资金</h2>
              </div>
              <p className="text-sm font-medium text-[var(--text-body)] mb-3">你准备投入多少启动资金？</p>
              <div className="text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed">
                例：&ldquo;2000/月&rdquo;、&ldquo;不想花钱&rdquo;、&ldquo;可以先接单再投入&rdquo;<br />
                不需要大资本，但需要你诚实。零启动在某些方向可行，不代表所有方向都可行。
              </div>
            </div>

            {/* Q5 */}
            <div className="py-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xs font-semibold text-[var(--color-accent)] tabular-nums">05</span>
                <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)]">卡点</h2>
              </div>
              <p className="text-sm font-medium text-[var(--text-body)] mb-3">你目前卡在哪一步？</p>
              <div className="text-xs text-[var(--text-tertiary)] bg-[var(--btn-hover)] rounded-md p-4 leading-relaxed">
                <ul className="space-y-1">
                  <li>• 有方向但不知道怎么做</li>
                  <li>• 已经在验证，不确定对不对</li>
                  <li>• 已经开跑了，有收入但不稳定</li>
                  <li>• 有稳定收入，想突破天花板</li>
                  <li>• 以上都不是（请在评估中说明）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content">
            <h2 className="text-[1.25rem] font-heading font-semibold text-[var(--text-heading)] mb-8">评估流程</h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[var(--color-accent)]">1</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">回答5个问题</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">在线填写。5分钟，不用准备任何材料。系统根据你的方向、经验、资源、投入判断成熟度。</p>
                  <div className="mt-2 text-xs text-[var(--text-body)]">
                    <span className="text-[var(--color-accent)]">适合</span> → 告诉你推荐哪个协作模式（作业框架 / 经营诊断 / 深度协作）<br />
                    <span className="text-[var(--color-accent)]">不适合</span> → 直接告诉你原因，附一份调整建议
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[var(--color-accent)]">2</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">验证期（30天）</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">评估通过后进入作业框架期。不是课程，是一个30天的SOP路径。边做边验证：这个方向是不是真的能跑通。</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[var(--color-accent)]">3</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">持续经营</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">方向验证通过 → 进入经营诊断或深度协作。你只管核心产出，系统负责判断方向和质量。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content">
            <h2 className="text-[1.125rem] font-heading font-semibold text-[var(--text-heading)] mb-6">常见问题</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <p className="text-sm font-medium text-[var(--text-heading)] mb-1">我不懂技术能做吗？</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">能。评估关注的是你的行业经验和执行意愿，不是你会不会写代码。</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-heading)] mb-1">评估需要准备什么？</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">不用。5个问题，想清楚你的方向、经验、自己能投入的时间和资金。不需要商业计划书，不需要PPT。</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-heading)] mb-1">如果评估不通过怎么办？</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">收到一份调整建议。不是拒绝，是指出哪块还需要准备。准备好了随时重新申请，不需要等。</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-heading)] mb-1">评估免费吗？</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">首次免费。评估结果出来之后，如果有疑问可以选一次付费深诊。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 border-t border-[var(--border-default)]">
          <div className="container-content text-center">
            <p className="text-sm text-[var(--text-heading)] font-medium mb-6">5个问题，知道你的方向值不值得继续。</p>
            <a href="/admission" className="inline-flex items-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-6 py-3 rounded-md font-medium text-sm hover:bg-[var(--color-accent)] transition-colors">免费评估 →</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-[var(--border-default)]">
          <div className="container-content">
            <div className="text-sm font-heading font-semibold text-[var(--text-heading)] mb-2">OPC 翻译层 · 一人公司孵化器</div>
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
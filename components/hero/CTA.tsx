export function CTA() {
  return (
    <section className="py-32 md:py-40 border-t border-[var(--border-default)]">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h2 className="text-[2rem] md:text-[2.25rem] font-heading font-semibold tracking-tight text-[var(--text-heading)] mb-6">
            从打工人到一人公司，只差一次测评
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
            6 大维度 · 15 道精选题 · 免费获得专属商业路线图
          </p>
          <a
            href="/profile"
            className="inline-flex items-center gap-3 bg-[var(--color-foreground)] text-white px-8 py-4 rounded-md font-semibold text-base hover:bg-[var(--color-accent)] transition-colors"
          >
            免费测评
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 ease-helio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

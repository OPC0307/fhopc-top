export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center bg-[var(--color-background)]">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h1 className="text-8xl font-heading font-bold text-[var(--color-accent)] mb-4">404</h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">页面不存在</p>
          <a href="/" className="btn btn-primary">
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

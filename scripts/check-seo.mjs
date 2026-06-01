// SEO 健康检查脚本 — 验证线上站点的 SEO 质量
// 使用: node scripts/check-seo.mjs
// 自动在 Vercel 部署后运行（GitHub Actions）

const SITE = 'https://fhopc.top';
const PAGES = [
  '/', '/team', '/collab', '/admission', '/contact', '/insights',
  '/privacy', '/policy/national',
];

let errors = 0;
let warnings = 0;

function log(ok, msg, level = 'error') {
  if (!ok) {
    if (level === 'error') { errors++; console.error(`  ❌ ${msg}`); }
    else { warnings++; console.warn(`  ⚠️  ${msg}`); }
  } else { console.log(`  ✅ ${msg}`); }
}

async function analyze(url) {
  const resp = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const html = await resp.text();
  const name = url.replace(SITE, '') || '/';

  log(resp.status === 200, `${name} → HTTP ${resp.status}`);

  const desc = html.match(/name="description" content="([^"]*)"/);
  if (desc) log(desc[1].length >= 50, `${name} description ${desc[1].length}字`, 'warning');
  if (desc) log(desc[1].length <= 160, `${name} description ≤160字`);

  const title = html.match(/<title>([^<]*)<\/title>/);
  log(title?.length > 0, `${name} 有 title`);
  if (title) log(title[1].length <= 70, `${name} title ${title[1].length}字`, 'warning');

  log(html.includes('og:title'), `${name} og:title`);
  log(html.includes('og:description'), `${name} og:description`);
  log(html.includes('twitter:card'), `${name} twitter:card`);
  log(!html.includes('noindex'), `${name} 无 noindex`);

  const h1 = html.match(/<h1[^>]*>/g);
  log(h1?.length === 1, `${name} ${h1?.length || 0} 个 H1`, 'warning');

  log(html.includes('application/ld+json'), `${name} JSON-LD`);

  const loadTime = (await resp.clone().text()).length;
  log(loadTime > 1000, `${name} 内容尺寸 ${loadTime}B`);

  return html;
}

async function main() {
  console.log(`\n🔍 SEO 健康检查 — ${SITE}\n`);

  // 1. Sitemap
  const sm = await fetch(`${SITE}/sitemap.xml`);
  const smText = await sm.text();
  const urls = smText.match(/<loc>[^<]*<\/loc>/g) || [];
  log(urls.length > 30, `sitemap 含 ${urls.length} 个 URL`);
  log(smText.includes('content/blog'), 'sitemap 含博客');
  log(smText.includes('/policy/'), 'sitemap 含政策页');

  // 2. 关键页面
  console.log('\n📄 页面检查:');
  for (const p of PAGES) {
    const h = await analyze(`${SITE}${p}`);
  }

  // 3. 随机抽样博客
  console.log('\n📝 博客抽样:');
  const blogUrls = urls.filter(u => u.includes('content/blog')).slice(0, 3);
  for (const u of blogUrls) {
    await analyze(u.replace(/<\/?loc>/g, ''));
  }

  // 4. 汇总
  console.log(`\n${'='.repeat(40)}`);
  console.log(`📊 ${errors} 错误, ${warnings} 警告`);
  if (errors + warnings === 0) console.log('🎉 全部通过');

  // 为 GitHub Actions 输出
  console.log(`::set-output name=errors::${errors}`);
  console.log(`::set-output name=warnings::${warnings}`);
  process.exit(errors > 5 ? 1 : 0);
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
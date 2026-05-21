const sharp = require('sharp');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

// Build SVG — flat vector, dark minimalist, orange accent
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0A"/>
      <stop offset="100%" stop-color="#141414"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#FB923C"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.03">
    <line x1="0" y1="210" x2="${WIDTH}" y2="210" stroke="white" stroke-width="1"/>
    <line x1="0" y1="420" x2="${WIDTH}" y2="420" stroke="white" stroke-width="1"/>
    <line x1="400" y1="0" x2="400" y2="${HEIGHT}" stroke="white" stroke-width="1"/>
    <line x1="800" y1="0" x2="800" y2="${HEIGHT}" stroke="white" stroke-width="1"/>
  </g>

  <!-- Orange geometric accent — top-right circle -->
  <circle cx="1020" cy="120" r="180" fill="none" stroke="#F97316" stroke-width="1.5" opacity="0.15"/>
  <circle cx="1020" cy="120" r="120" fill="none" stroke="#F97316" stroke-width="1" opacity="0.2"/>
  <circle cx="1020" cy="120" r="60" fill="#F97316" opacity="0.08"/>

  <!-- Orange geometric accent — bottom-left small dot pattern -->
  <circle cx="100" cy="480" r="8" fill="#F97316" opacity="0.15"/>
  <circle cx="130" cy="480" r="8" fill="#F97316" opacity="0.1"/>
  <circle cx="160" cy="480" r="8" fill="#F97316" opacity="0.15"/>
  <circle cx="100" cy="510" r="8" fill="#F97316" opacity="0.1"/>
  <circle cx="130" cy="510" r="8" fill="#F97316" opacity="0.15"/>
  <circle cx="160" cy="510" r="8" fill="#F97316" opacity="0.08"/>

  <!-- Orange line accent — left side -->
  <rect x="60" y="180" width="3" height="60" rx="1.5" fill="#F97316" opacity="0.3"/>
  <rect x="60" y="390" width="3" height="60" rx="1.5" fill="#F97316" opacity="0.3"/>

  <!-- Main title -->
  <text x="90" y="260" font-family="'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif" font-size="44" font-weight="700" fill="white" letter-spacing="1">
    fhopc
  </text>
  <text x="92" y="318" font-family="'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif" font-size="28" font-weight="400" fill="white" letter-spacing="2" opacity="0.9">
    一人公司系统化交付
  </text>

  <!-- Orange divider line -->
  <rect x="90" y="348" width="60" height="3" rx="1.5" fill="#F97316"/>

  <!-- Subtitle -->
  <text x="90" y="400" font-family="'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif" font-size="18" font-weight="400" fill="#A0A0A0" letter-spacing="1">
    从想法到第一笔订单
  </text>
  <text x="90" y="428" font-family="'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif" font-size="18" font-weight="400" fill="#A0A0A0" letter-spacing="1">
    7 个节点陪你走完全程。
  </text>

  <!-- Bottom URL -->
  <text x="90" y="530" font-family="'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif" font-size="14" font-weight="400" fill="#666666" letter-spacing="1">
    fhopc.top
  </text>
</svg>`;

async function main() {
  const buf = Buffer.from(svg);
  const outPath = path.resolve(__dirname, '..', 'public', 'og-image.png');

  await sharp(buf)
    .resize(WIDTH, HEIGHT)
    .png()
    .toFile(outPath);

  console.log('OK:', outPath);

  // Verify
  const meta = await sharp(outPath).metadata();
  console.log(`Size: ${meta.width}x${meta.height}, Format: ${meta.format}`);
}

main().catch(e => { console.error(e); process.exit(1); });
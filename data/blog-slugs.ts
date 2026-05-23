// FileSlug → URL slug mapping
export const FILE_SLUG_MAP: Record<string, string> = {
  '2026-05-17-swimming': 'zhen-shi-zha-ji',
  '2026-05-18-time-trap': 'shi-jian-hei-dong',
  '2026-05-18-ai-opc-million-myth': 'po-mie-pao-mo',
  '2026-05-19-seven-day-mvp': 'qi-tian-mvp',
  '2026-05-19-delivery-sop': 'biao-zhun-hua-jiao-fu',
  '2026-05-20-track-assessment': 'sai-dao-san-wei-du',
  '2026-05-20-three-tier-tools': 'san-ceng-gong-ju-zhan',
  '2026-05-21-ai-agent-first-employee': 'di-yi-ge-yuan-gong',
  '2026-05-21-platform-strategies': 'wu-da-ping-tai-huo-ke',
  '2026-05-22-pricing-trap': 'ding-jia-xian-jing',
  '2026-05-22-side-hustle-to-main': 'fu-ye-dao-zhu-ye',
  '2026-05-23-decision-burden': 'jue-ce-dai-jia',
  '2026-05-23-niche-selection-model': 'sai-dao-san-wei-du-mo-xing',
  '2026-05-24-policy-guide': 'yi-ren-gong-si-bu-tie',
};

// Reverse: URL slug → file slug
export const SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(FILE_SLUG_MAP).map(([k, v]) => [v, k]),
);
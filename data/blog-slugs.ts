// FileSlug -> URL slug mapping
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
  '2026-05-24-cost-breakdown': 'yi-ren-gong-si-cheng-ben',
  '2026-05-28-five-myths-opc-individual-business': 'ge-ti-hu-wu-da-yao-yan',
  '2026-05-30-customer-acquisition': 'ke-hu-cong-na-lai',
  '2026-05-30-failure-cases': 'shi-bai-an-li-fu-pan',
  '2026-05-31-second-brain-opc-2026': 'di-er-da-nao',
  '2026-06-02-midyear-checklist': 'nian-zhong-zi-cha',
  '2026-06-02-three-truths-midyear': 'san-ge-zhen-xiang',
  '2026-06-03-ai-tools-change-opc': 'ai-tools-change-opc',
  '2026-06-03-factory-legacy-opc': 'gong-si-jie-ban',
  '2026-06-04-customer-acquisition-channels': 'huo-ke-qu-dao',
  '2026-06-05-mvp-verification': 'mvp-yan-zheng',
  '2026-06-06-ai-agent-one-company': 'ai-agent-yi-ren-gong-si',
  '2026-06-06-ai-side-hustles-2026': '2026-nian-zhi-de-zuo-de-5-ge-ai-fu-ye',
  '2026-06-06-one-person-AI-million': 'yi-ge-ren-ru-he-yong-AI-nian-ru-bai-wan',
  '2026-06-10-first-product': 'yi-ren-gong-si-di-yi-ge-chan-pin',
  '2026-06-10-ai-opc-2026-h2-trends': 'ai-yi-ren-gong-sia-2026-xia-ban-nian-qu-shi',
  '2026-06-11-time-management': 'yi-ren-gong-si-de-shi-jian-guan-li',
};

// Reverse: URL slug -> file slug
export const SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(FILE_SLUG_MAP).map(([k, v]) => [v, k]),
);

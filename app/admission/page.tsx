import AdmissionContent from './page.client';

export const metadata = {
  title: '免费评估',
  description: '10 个问题判断你的创业成熟度 + 赛道可行性。基于赛道三维度 × 7 天 MVP × 三层工具栈的验证体系。',
  alternates: { canonical: '/admission' },
  openGraph: {
    title: '免费评估 | fhopc',
    description: '10 个问题判断你的方向值不值得继续。',
    url: 'https://fhopc.top/admission',
  },
};

export default function AdmissionPage() {
  return <AdmissionContent />;
}
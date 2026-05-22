import CollabContent from './page.client';

export const metadata = {
  title: '合作方式',
  description: '三种合作深度：启动包（一次性搭好）、陪跑计划（月度数据审计）、全托管（你只管产品其他归我）。按月结算随时可退。',
  alternates: { canonical: '/collab' },
  openGraph: {
    title: '合作方式 | fhopc',
    description: '三种合作深度，按需选择。启动包/陪跑计划/全托管。',
    url: 'https://fhopc.top/collab',
  },
};

export default function CollabPage() {
  return <CollabContent />;
}
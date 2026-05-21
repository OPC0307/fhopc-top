import CollabContent from './page.client';

export const metadata = {
  title: '协作',
  description: '一人公司系统化交付的三种协作深度：作业框架、经营诊断、深度协作。按需选择，按月结算。',
  alternates: { canonical: '/collab' },
  openGraph: {
    title: '协作 | fhopc',
    description: '一人公司系统化交付的三种协作深度，按需选择。',
    url: 'https://fhopc.top/collab',
  },
};

export default function CollabPage() {
  return <CollabContent />;
}
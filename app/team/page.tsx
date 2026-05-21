import TeamContent from './page.client';

export const metadata = {
  title: '团队',
  description: '了解一人公司系统化交付的七个角色：从准入审核官到交付监理，每个节点由对应角色把关。',
  alternates: { canonical: '/team' },
  openGraph: {
    title: '团队 | fhopc',
    description: '了解一人公司系统化交付的七个角色，每个节点由对应角色把关。',
    url: 'https://fhopc.top/team',
  },
};

export default function TeamPage() {
  return <TeamContent />;
}
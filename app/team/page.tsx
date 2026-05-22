import TeamContent from './page.client';

export const metadata = {
  title: '关于',
  description: 'fhopc 本身就是一个一人公司。没有团队没有办公室没有融资。七角色是AI驱动系统，做决定在你，执行交给系统。',
  alternates: { canonical: '/team' },
  openGraph: {
    title: '关于 | fhopc',
    description: '我们自己就是一人公司——你的每一个痛点我们都亲自经历过。',
    url: 'https://fhopc.top/team',
  },
};

export default function TeamPage() {
  return <TeamContent />;
}
import ContactContent from './page.client';

export const metadata = {
  title: '提交意向',
  description: '提交你的联系信息和选择方案，我们会在 24 小时内联系你。',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: '提交意向 | fhopc',
    description: '提交你的方案意向，24 小时内联系。',
    url: 'https://fhopc.top/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
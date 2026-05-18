import { Inter, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: {
    default: '一人公司孵化器 — 评估独立创业方向、协作模式和交付系统',
    template: '%s | 一人公司孵化器',
  },
  description: '评估独立创业方向、协作模式和交付系统。真实案例数据支撑。',
  authors: [{ name: '一人公司孵化器' }],
  metadataBase: new URL('https://fhopc.top'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`}>
      <body
        className={`${inter.className} ${notoSansSC.className} antialiased`}
        style={{
          fontFamily: 'var(--font-inter), var(--font-noto-sans-sc), sans-serif',
        }}
      >
        <Navigation />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
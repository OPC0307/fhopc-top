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
    default: 'OPC 翻译层 — 一人公司孵化器',
    template: '%s | OPC 翻译层',
  },
  description: '把一人公司的技术语言翻译成你能听懂的话。非技术出身也能找到自己的创业路径。',
  authors: [{ name: '一人公司孵化器' }],
  metadataBase: new URL('https://fhopc.top'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('fhopc-theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `
        }} />
      </head>
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
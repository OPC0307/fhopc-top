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
    default: 'fhopc · 一人公司系统化交付',
    template: '%s | fhopc',
  },
  description: '有行业经验，想自己干。剩下的，交给系统。',
  authors: [{ name: '一人公司系统化交付', url: 'https://fhopc.top' }],
  creator: 'fhopc',
  publisher: 'fhopc',
  metadataBase: new URL('https://fhopc.top'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'fhopc · 一人公司系统化交付',
    title: 'fhopc · 一人公司系统化交付',
    description: '有行业经验，想自己干。剩下的，交给系统。',
    url: 'https://fhopc.top',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'fhopc · 一人公司系统化交付',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fhopc · 一人公司系统化交付',
    description: '有行业经验，想自己干。剩下的，交给系统。',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
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
        <script dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a5621eae6e5f4f4f530c462888dae44f";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
          `.trim(),
        }} />
        <link rel="alternate" type="application/rss+xml" title="一人公司系统化交付 - RSS Feed" href="/feed.xml" />
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
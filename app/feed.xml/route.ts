import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://fhopc.top';
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const dynamic = 'force-static';

export async function GET() {
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).sort().reverse()
    : [];

  const items = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data } = matter(raw);
    const slug = file.replace('.md', '');
    return {
      title: data.title || '',
      date: data.date ? new Date(data.date).toUTCString() : '',
      summary: data.summary || '',
      url: `${SITE_URL}/insights`,
    };
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>一人公司系统化交付</title>
    <link>${SITE_URL}</link>
    <description>想清楚的人，我陪你走一段。</description>
    ${items.map(item => `
    <item>
      <title>${item.title}</title>
      <link>${item.url}</link>
      <description>${item.summary}</description>
      <pubDate>${item.date}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
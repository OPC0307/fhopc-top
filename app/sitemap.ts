import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FILE_SLUG_MAP } from '@/data/blog-slugs';
import type { MetadataRoute } from 'next';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://fhopc.top', changeFrequency: 'monthly', priority: 1.0 },
    { url: 'https://fhopc.top/team', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://fhopc.top/collab', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://fhopc.top/admission', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://fhopc.top/contact', changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://fhopc.top/insights', changeFrequency: 'weekly', priority: 0.9 },
  ];

  const blogPages: MetadataRoute.Sitemap = [];
  if (fs.existsSync(BLOG_DIR)) {
    const files = fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.md'))
      .sort()
      .reverse();

    for (const file of files) {
      const fileSlug = file.replace('.md', '');
      const slug = FILE_SLUG_MAP[fileSlug] || fileSlug;
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data } = matter(raw);
      blogPages.push({
        url: `https://fhopc.top/content/blog/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.7,
        lastModified: data.date ? new Date(data.date) : undefined,
      });
    }
  }

  return [...staticPages, ...blogPages];
}
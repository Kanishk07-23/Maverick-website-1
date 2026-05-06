import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.maverickdigitals.co.in';

  const mainRoutes = ['', '/about', '/services', '/team', '/contact', '/blog'];
  const serviceRoutes = [
    '/services/personal-branding',
    '/services/social-media',
    '/services/web-dev',
    '/services/seo-sem',
    '/services/performance-marketing',
    '/services/branding-strategy',
  ];

  const mapRoutes = (routes: string[], priority: number) =>
    routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : priority,
    }));

  // Dynamic blog posts
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...mapRoutes(mainRoutes, 0.8),
    ...mapRoutes(serviceRoutes, 0.9),
    ...blogRoutes,
  ];
}

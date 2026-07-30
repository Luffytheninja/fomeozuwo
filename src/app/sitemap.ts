import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://eoe.brand';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/photography`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/painting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/design`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes];
}

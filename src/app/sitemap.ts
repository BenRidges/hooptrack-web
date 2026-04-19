import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://hooptrack.app', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://hooptrack.app/features', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://hooptrack.app/support', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://hooptrack.app/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}

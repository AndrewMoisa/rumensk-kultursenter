import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rumensk-kultursenter.no'
  const locales = ['no', 'en', 'ro']
  
  // Generate URLs for each locale
  const routes = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          no: `${baseUrl}/no`,
          en: `${baseUrl}/en`,
          ro: `${baseUrl}/ro`,
        },
      },
    },
  ])
 
  return routes
}

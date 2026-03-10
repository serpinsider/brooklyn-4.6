import { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brooklynmaids.com'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join-our-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gift-cards`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

  // Service pages -- these are the highest priority after home page
  const servicePages = [
    { slug: 'deep-clean', priority: 0.9 },
    { slug: 'move-out', priority: 0.9 },
    { slug: 'apartment-cleaning', priority: 0.9 },
    { slug: 'one-time-cleaning', priority: 0.8 },
    { slug: 'event-cleaning', priority: 0.8 },
    { slug: 'airbnb', priority: 0.8 },
    { slug: 'commercial', priority: 0.8 },
    { slug: 'post-construction', priority: 0.7 },
    { slug: 'carpet-cleaning', priority: 0.7 },
    { slug: 'handyman', priority: 0.7 },
    { slug: 'car-cleaning', priority: 0.6 },
  ].map(({ slug, priority }) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  // Service quote pages
  const serviceQuotePages = [
    'airbnb', 'car-cleaning', 'carpet-cleaning', 'commercial',
    'event-cleaning', 'handyman', 'post-construction',
  ].map((service) => ({
    url: `${baseUrl}/services/${service}/quote`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  // Cross-market location pages only (boroughs, LI, Westchester, NJ)
  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...serviceQuotePages, ...locationPages]
}

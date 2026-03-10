import { Metadata } from 'next';
import CommercialCleaningService from '@/components/CommercialCleaningService';

export const metadata: Metadata = {
  title: "Commercial Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
  description: "Office and commercial cleaning in Brooklyn & NYC. Daily, weekly, or monthly service for offices and retail. Licensed & insured. Book online!",
  keywords: [
    'commercial cleaning Brooklyn',
    'office cleaning NYC',
    'business cleaning service',
    'commercial cleaning near me',
    'office cleaning Brooklyn',
    'retail space cleaning',
    'commercial janitorial services',
    'office maintenance Brooklyn',
  ],
  openGraph: {
    title: "Commercial Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional office and commercial cleaning services in Brooklyn, Manhattan & NYC. Reliable, thorough, and flexible scheduling for businesses of all sizes.",
    url: "https://brooklynmaids.com/services/commercial",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional office and commercial cleaning for businesses in Brooklyn and NYC. Daily, weekly, and monthly service options available.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/commercial',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 160,
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brooklynmaids.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brooklynmaids.com/#services" },
    { "@type": "ListItem", "position": 3, "name": "Commercial Cleaning Services", "item": "https://brooklynmaids.com/services/commercial" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercial Cleaning Services in Brooklyn & NYC",
  "serviceType": "Commercial Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Office and commercial cleaning in Brooklyn and NYC. Daily, weekly, or monthly service for offices, retail spaces, and businesses of all sizes.",
  "url": "https://brooklynmaids.com/services/commercial",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What commercial spaces do you clean?", "acceptedAnswer": { "@type": "Answer", "text": "We clean offices, retail stores, restaurants, gyms, medical offices, co-working spaces, and other commercial properties across Brooklyn and NYC." } },
    { "@type": "Question", "name": "Do you offer after-hours commercial cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer flexible scheduling including evenings and weekends so cleaning doesn't disrupt your business operations." } },
    { "@type": "Question", "name": "Can you clean our office on a recurring schedule?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We offer daily, weekly, and bi-weekly commercial cleaning contracts for offices and businesses of all sizes." } },
    { "@type": "Question", "name": "Are you insured for commercial cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Brooklyn Maids is fully insured and bonded for both residential and commercial cleaning services." } }
  ]
};

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CommercialCleaningService />
    </main>
  );
}



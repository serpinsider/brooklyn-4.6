import { Metadata } from 'next';
import AirbnbCleaningService from '@/components/AirbnbCleaningService';

export const metadata: Metadata = {
  title: "Airbnb Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Airbnb turnover cleaning in Brooklyn & NYC. Fast turnovers, linen changes, restocking, and guest-ready guarantee. Same-day service. Book online!",
  keywords: [
    'Airbnb cleaning Brooklyn',
    'vacation rental cleaning',
    'short term rental cleaning',
    'Airbnb turnover cleaning',
    'rental property cleaning',
    'guest-ready cleaning Brooklyn',
    'Airbnb cleaning service',
    'vacation rental turnover',
    'Airbnb cleaning NYC',
    'rental cleaning service',
  ],
  openGraph: {
    title: "Airbnb Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Trusted Airbnb turnover cleaning with same-day service. 24/7 availability and guest-ready guarantee for vacation rentals in Brooklyn, Manhattan & NYC.",
    url: "https://brooklynmaids.com/services/airbnb",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Airbnb Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Fast Airbnb turnover cleaning with guest-ready guarantee. 24/7 availability and same-day service in Brooklyn and NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/airbnb',
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
    { "@type": "ListItem", "position": 3, "name": "Airbnb Cleaning Services", "item": "https://brooklynmaids.com/services/airbnb" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Airbnb Cleaning Services in Brooklyn, NY",
  "serviceType": "Airbnb Turnover Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Airbnb turnover cleaning in Brooklyn and NYC. Fast turnovers, linen changes, restocking, and guest-ready guarantee. Same-day service available.",
  "url": "https://brooklynmaids.com/services/airbnb",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How quickly can you do an Airbnb turnover?", "acceptedAnswer": { "@type": "Answer", "text": "We offer same-day turnovers and can have your property guest-ready in as little as 2 hours, depending on size." } },
    { "@type": "Question", "name": "Do you handle linen changes and restocking?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we handle linen changes, towel replacement, and can restock toiletries and supplies as needed." } },
    { "@type": "Question", "name": "Do you serve Airbnb hosts across Brooklyn?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we serve Airbnb and VRBO hosts in Brooklyn, Manhattan, Queens, and surrounding NYC areas." } }
  ]
};

export default function AirbnbPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AirbnbCleaningService />
    </main>
  );
}



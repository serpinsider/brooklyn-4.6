import { Metadata } from 'next';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = {
  title: "Partner With Brooklyn Maids - Realtor & Property Manager Partnerships",
  description: "Partner with Brooklyn Maids for move-in/out cleaning, staging cleans, and turnover services. Preferred rates, priority scheduling, and dedicated account support for realtors and property managers in NYC.",
  keywords: [
    'realtor cleaning partnership NYC',
    'property manager cleaning service Brooklyn',
    'move-in cleaning service NYC',
    'staging cleaning Brooklyn',
    'realtor partnership cleaning',
    'property turnover cleaning',
    'real estate cleaning service NYC',
    'move-out cleaning Brooklyn',
    'rental turnover cleaning NYC',
    'property management cleaning partner',
  ],
  openGraph: {
    title: "Partner With Brooklyn Maids - Realtor & Property Manager Partnerships",
    description: "Preferred rates, priority scheduling, and dedicated support for realtors and property managers across NYC. Move-in/out, staging, and turnover cleaning.",
    url: "https://brooklynmaids.com/partners",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Partner With Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Brooklyn Maids - Realtor & Property Manager Partnerships",
    description: "Preferred rates, priority scheduling, and dedicated support for realtors and property managers across NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/partners',
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
    { "@type": "ListItem", "position": 2, "name": "Partners", "item": "https://brooklynmaids.com/partners" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Realtor & Property Manager Cleaning Partnerships",
  "serviceType": "Real Estate Cleaning Partnership",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": [
    { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
    { "@type": "City", "name": "Manhattan", "containedInPlace": { "@type": "State", "name": "New York" } },
    { "@type": "City", "name": "Queens", "containedInPlace": { "@type": "State", "name": "New York" } },
  ],
  "description": "Partner cleaning services for realtors and property managers. Move-in/out cleaning, staging preparation, and rental turnover services with preferred rates and priority scheduling.",
  "url": "https://brooklynmaids.com/partners",
};

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PartnersClient />
    </main>
  );
}

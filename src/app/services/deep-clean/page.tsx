import { Metadata } from 'next';
import DeepCleanService from '@/components/DeepCleanService';

export const metadata: Metadata = {
  title: "Deep Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Professional deep cleaning in Brooklyn, NY. Thorough cleaning for tough dirt, grime & buildup. Same-day service. Satisfaction guaranteed. Book online!",
  keywords: [
    'deep cleaning Brooklyn',
    'deep house cleaning service',
    'thorough cleaning Brooklyn',
    'spring cleaning Brooklyn',
    'deep clean service Brooklyn',
    'detailed house cleaning',
    'intensive cleaning service',
    'deep cleaning near me',
    'deep cleaning services brooklyn',
    'brooklyn deep cleaning',
    'heavily soiled home cleaning',
    'seasonal cleaning service'
  ],
  openGraph: {
    title: "Deep Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional deep cleaning in Brooklyn NY. Tackle tough dirt, grime & buildup with our thorough process. Same-day service, satisfaction guaranteed.",
    url: "https://brooklynmaids.com/services/deep-clean",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deep Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional deep cleaning services in Brooklyn and NYC. Thorough cleaning for a complete home refresh.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/deep-clean',
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
    { "@type": "ListItem", "position": 3, "name": "Deep Cleaning Services", "item": "https://brooklynmaids.com/services/deep-clean" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Deep Cleaning Services in Brooklyn, NY",
  "serviceType": "Deep Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Professional deep cleaning in Brooklyn, NY. Thorough cleaning for tough dirt, grime and buildup including baseboards, door frames, window sills, and more.",
  "url": "https://brooklynmaids.com/services/deep-clean",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's the difference between a standard clean and a deep clean?", "acceptedAnswer": { "@type": "Answer", "text": "Our deep cleans include everything in a standard clean plus wiping down doors, door frames, windowsills, window frames, and baseboards. We spend extra time on detailed scrubbing and getting into areas that don't get regular attention." } },
    { "@type": "Question", "name": "How long does a deep clean take?", "acceptedAnswer": { "@type": "Answer", "text": "A deep clean typically takes 4-8 hours depending on the size of your home and its condition." } },
    { "@type": "Question", "name": "How often should I get a deep clean?", "acceptedAnswer": { "@type": "Answer", "text": "We recommend a deep clean 2-4 times per year, or seasonally. Many customers book deep cleans in spring and fall, or before/after major holidays." } },
    { "@type": "Question", "name": "Do you bring your own cleaning supplies?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we bring all our own commercial-grade, pet-safe, and non-toxic cleaning supplies and equipment." } },
    { "@type": "Question", "name": "Can you clean my fridge, microwave, and oven?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Inside fridge, inside oven, and microwave cleaning are available as add-ons to any deep clean." } },
    { "@type": "Question", "name": "What areas do you serve for deep cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "We serve all of Brooklyn, Manhattan, Queens, Bronx, Staten Island, Long Island, Westchester, Jersey City, and Hoboken." } }
  ]
};

export default function DeepCleanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DeepCleanService />
    </>
  );
}


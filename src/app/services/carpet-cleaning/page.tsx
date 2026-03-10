import { Metadata } from 'next';
import CarpetCleaningService from '@/components/CarpetCleaningService';

export const metadata: Metadata = {
  title: "Professional Carpet Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
  description: "Carpet cleaning in Brooklyn & NYC. Deep steam cleaning, stain removal, pet odor treatment, and carpet protection. Same-day service. Book online!",
  keywords: [
    'carpet cleaning Brooklyn',
    'professional carpet cleaning NYC',
    'carpet cleaning service Brooklyn',
    'deep carpet cleaning',
    'carpet cleaning near me',
    'rug cleaning Brooklyn',
    'carpet steam cleaning',
    'pet stain removal',
    'carpet odor removal',
    'carpet cleaning Manhattan',
    'carpet cleaning Queens',
    'carpet cleaning Bronx',
  ],
  openGraph: {
    title: "Professional Carpet Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Carpet cleaning in Brooklyn & NYC. Deep steam cleaning, stain removal, pet odor treatment, and carpet protection. Same-day service. Book online!",
    url: "https://brooklynmaids.com/services/carpet-cleaning",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Carpet Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Carpet Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Carpet cleaning in Brooklyn & NYC. Deep steam cleaning, stain removal, pet odor treatment. Same-day service. Book online!",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/carpet-cleaning',
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
    { "@type": "ListItem", "position": 3, "name": "Carpet Cleaning Services", "item": "https://brooklynmaids.com/services/carpet-cleaning" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Carpet Cleaning Services in Brooklyn & NYC",
  "serviceType": "Carpet Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Professional carpet cleaning in Brooklyn and NYC. Deep steam cleaning, stain removal, pet odor treatment, and carpet protection. Same-day service.",
  "url": "https://brooklynmaids.com/services/carpet-cleaning",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's included in your carpet cleaning service?", "acceptedAnswer": { "@type": "Answer", "text": "Our carpet cleaning includes deep steam cleaning, stain removal, pet odor treatment, and deodorizing. We bring our own professional-grade equipment." } },
    { "@type": "Question", "name": "How long does carpet cleaning take to dry?", "acceptedAnswer": { "@type": "Answer", "text": "Most carpets dry within 4-8 hours after steam cleaning. We recommend keeping foot traffic minimal and windows open to speed drying." } },
    { "@type": "Question", "name": "Can you remove pet stains and odors from carpet?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we specialize in pet stain and odor removal. We use professional enzyme-based treatments that neutralize odors at the source." } },
    { "@type": "Question", "name": "Do you offer carpet cleaning in Brooklyn and NYC?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide carpet cleaning across Brooklyn, Manhattan, Queens, Bronx, and surrounding New York areas." } }
  ]
};

export default function CarpetCleaningPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CarpetCleaningService />
    </main>
  );
}



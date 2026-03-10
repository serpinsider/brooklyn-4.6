import { Metadata } from 'next';
import MoveOutService from '@/components/MoveOutService';

export const metadata: Metadata = {
  title: "Move Out Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Move out cleaning services in Brooklyn, NY. Spotless results to help you get your deposit back. Licensed & insured team, same-day service. Book online!",
  keywords: [
    'move out cleaning Brooklyn',
    'move in cleaning service',
    'moving cleaning Brooklyn',
    'end of lease cleaning',
    'move out cleaning near me',
    'apartment move out cleaning',
    'relocation cleaning service',
    'moving day cleaning Brooklyn',
    'security deposit cleaning',
    'tenant turnover cleaning',
    'move in cleaning brooklyn',
    'landlord cleaning service'
  ],
  openGraph: {
    title: "Move Out Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional move in/out cleaning services in Brooklyn. We ensure your property is spotless for the next occupants. Get your deposit back!",
    url: "https://brooklynmaids.com/services/move-out",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Move Out Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Move Out Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional move in/out cleaning services in Brooklyn and NYC. Get your deposit back with our thorough cleaning.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/move-out',
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
    { "@type": "ListItem", "position": 3, "name": "Move Out Cleaning Services", "item": "https://brooklynmaids.com/services/move-out" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Move-Out Cleaning Services in Brooklyn, NY",
  "serviceType": "Move-Out Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Move-out cleaning services in Brooklyn, NY. Inside cabinets, closets, appliances, and all surfaces cleaned to help tenants get their security deposit back.",
  "url": "https://brooklynmaids.com/services/move-out",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's included in a move-out cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "Our move-out cleaning includes everything in a deep clean plus inside all cabinets, closets, shelves, and appliance interiors. It's our most thorough service designed to help tenants get their security deposit back." } },
    { "@type": "Question", "name": "Will a move-out clean help me get my security deposit back?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — our move-out clean is specifically designed to meet landlord inspection standards. We clean every surface, inside appliances, inside cabinets, and all areas required for a full deposit return." } },
    { "@type": "Question", "name": "How far in advance should I book a move-out cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "We recommend booking 2-3 days in advance. We also offer same-day and next-day service when available, so contact us even if you need it urgently." } },
    { "@type": "Question", "name": "Do you need the home to be empty before cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "For the best results, yes — an empty home allows us to clean every corner thoroughly. However, we can work around furniture if necessary." } },
    { "@type": "Question", "name": "Do you serve Brooklyn and surrounding areas for move-out cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we serve Brooklyn, Manhattan, Queens, Bronx, Staten Island, Jersey City, Hoboken, and surrounding NYC metro areas." } }
  ]
};

export default function MoveOutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MoveOutService />
    </>
  );
}


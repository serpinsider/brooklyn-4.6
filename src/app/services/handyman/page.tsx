import { Metadata } from 'next';
import HandymanService from '@/components/HandymanService';

export const metadata: Metadata = {
  title: "Handyman Services in Brooklyn, NY - Brooklyn Maids",
  description: "Handyman services in Brooklyn & NYC. Furniture assembly, TV mounting, repairs, and home maintenance. Licensed & insured. Book online!",
  keywords: [
    'handyman services Brooklyn',
    'home repairs Brooklyn',
    'handyman near me',
    'Brooklyn handyman service',
    'home maintenance Brooklyn',
    'small repairs Brooklyn',
    'professional handyman Brooklyn',
    'home improvement Brooklyn',
    'furniture assembly Brooklyn',
    'TV mounting service',
  ],
  openGraph: {
    title: "Handyman Services in Brooklyn, NY - Brooklyn Maids",
    description: "Expert handyman services for home repairs, furniture assembly, TV mounting, and maintenance in Brooklyn and NYC. Same-day service available.",
    url: "https://brooklynmaids.com/services/handyman",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Handyman Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handyman Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional handyman services for repairs, assembly, and maintenance in Brooklyn and NYC. Licensed and insured with same-day availability.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/handyman',
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
    { "@type": "ListItem", "position": 3, "name": "Handyman Services", "item": "https://brooklynmaids.com/services/handyman" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Handyman Services in Brooklyn, NY",
  "serviceType": "Handyman Services",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Professional handyman services in Brooklyn and NYC. Furniture assembly, TV mounting, repairs, and home maintenance. Licensed and insured.",
  "url": "https://brooklynmaids.com/services/handyman",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What handyman services do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We offer furniture assembly, TV mounting, picture hanging, shelf installation, minor repairs, and home maintenance services in Brooklyn and NYC." } },
    { "@type": "Question", "name": "Are your handymen licensed and insured?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all our handymen are licensed, insured, and background-checked for your peace of mind." } },
    { "@type": "Question", "name": "Do you offer same-day handyman service?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer same-day handyman services when available. Contact us for urgent requests." } }
  ]
};

export default function HandymanPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HandymanService />
    </main>
  );
}



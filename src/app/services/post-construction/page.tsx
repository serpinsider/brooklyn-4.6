import { Metadata } from 'next';
import PostConstructionService from '@/components/PostConstructionService';

export const metadata: Metadata = {
  title: "Post-Construction Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
  description: "Post-construction cleaning in Brooklyn & NYC. Debris removal, dust elimination, and move-in ready results. Licensed & insured. Book online!",
  keywords: [
    'post-construction cleaning Brooklyn',
    'construction cleanup NYC',
    'after construction cleaning',
    'construction debris removal',
    'post renovation cleaning',
    'builder cleaning service',
    'construction site cleaning',
    'final construction clean',
    'dust removal service',
    'move-in ready cleaning',
  ],
  openGraph: {
    title: "Post-Construction Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Expert post-construction cleanup services. We handle construction debris removal, dust elimination, and final touches to make your space move-in ready.",
    url: "https://brooklynmaids.com/services/post-construction",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Post-Construction Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post-Construction Cleaning Services in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional post-construction cleanup. Construction debris removal and move-in ready cleaning in Brooklyn, Manhattan & NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/post-construction',
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
    { "@type": "ListItem", "position": 3, "name": "Post-Construction Cleaning", "item": "https://brooklynmaids.com/services/post-construction" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Post-Construction Cleaning in Brooklyn & NYC",
  "serviceType": "Post-Construction Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Post-construction cleaning in Brooklyn and NYC. Debris removal, dust elimination, and move-in ready results. Licensed and insured.",
  "url": "https://brooklynmaids.com/services/post-construction",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What's included in post-construction cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "We remove construction debris, dust every surface, clean windows, scrub floors, and ensure the space is move-in ready." } },
    { "@type": "Question", "name": "Can you clean after a renovation or remodel?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we handle cleanup after full renovations, kitchen and bathroom remodels, painting, and any construction work." } },
    { "@type": "Question", "name": "Do you provide post-construction cleaning in Brooklyn?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we serve Brooklyn, Manhattan, Queens, and all NYC boroughs for post-construction cleanup." } }
  ]
};

export default function PostConstructionPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PostConstructionService />
    </main>
  );
}



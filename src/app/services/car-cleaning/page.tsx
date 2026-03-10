import { Metadata } from 'next';
import CarCleaningService from '@/components/CarCleaningService';

export const metadata: Metadata = {
  title: "Mobile Car Cleaning & Detailing in Brooklyn & NYC - Brooklyn Maids",
  description: "Mobile car detailing in Brooklyn & NYC. Interior, exterior, and full detail packages. We come to you. Stain removal and odor treatment. Book online!",
  keywords: [
    'car cleaning Brooklyn',
    'mobile car detailing NYC',
    'car detailing Brooklyn',
    'auto detailing service',
    'car wash Brooklyn',
    'interior car cleaning',
    'mobile car wash',
    'car detailing near me',
    'professional car cleaning',
    'vehicle detailing Brooklyn',
  ],
  openGraph: {
    title: "Mobile Car Cleaning & Detailing in Brooklyn & NYC - Brooklyn Maids",
    description: "Professional mobile car detailing service in Brooklyn and NYC. Interior deep cleaning, exterior wash & wax, and full detailing packages at your location.",
    url: "https://brooklynmaids.com/services/car-cleaning",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Car Cleaning & Detailing Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Car Cleaning & Detailing in Brooklyn & NYC - Brooklyn Maids",
    description: "Convenient mobile car detailing in Brooklyn and NYC. Professional interior and exterior cleaning at your location.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/car-cleaning',
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
    { "@type": "ListItem", "position": 3, "name": "Car Cleaning & Detailing", "item": "https://brooklynmaids.com/services/car-cleaning" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile Car Cleaning & Detailing in Brooklyn & NYC",
  "serviceType": "Mobile Car Detailing",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Mobile car detailing in Brooklyn and NYC. Interior, exterior, and full detail packages. Stain removal and odor treatment. We come to you.",
  "url": "https://brooklynmaids.com/services/car-cleaning",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do you come to my location for car detailing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer mobile car detailing. We come to your home, office, or any location in Brooklyn and NYC with all our equipment." } },
    { "@type": "Question", "name": "What car cleaning packages do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We offer interior cleaning, exterior wash and wax, and full detail packages including leather conditioning, stain removal, and odor elimination." } },
    { "@type": "Question", "name": "Can you remove pet hair and odors from my car?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we specialize in pet hair removal and odor treatment using professional-grade products and equipment." } }
  ]
};

export default function CarCleaningPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CarCleaningService />
    </main>
  );
}


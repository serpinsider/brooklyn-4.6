import { Metadata } from 'next';
import EventCleaningService from '@/components/EventCleaningService';

export const metadata: Metadata = {
  title: "Event Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Event cleaning in Brooklyn & NYC. Pre-event setup and post-event cleanup for parties, weddings, and corporate events. Same-day available. Book online!",
  keywords: [
    'event cleaning Brooklyn',
    'party cleanup service',
    'wedding cleaning Brooklyn',
    'corporate event cleaning',
    'venue cleaning service',
    'post-event cleanup',
    'event cleanup Brooklyn',
    'party cleaning service',
    'event venue cleaning',
    'special event cleaning',
  ],
  openGraph: {
    title: "Event Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional event cleaning for weddings, parties, corporate events, and special occasions in Brooklyn, Manhattan & NYC. Pre-event, during-event, and post-event services.",
    url: "https://brooklynmaids.com/services/event-cleaning",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Event Cleaning Services - Brooklyn Maids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Pre-event, during-event, and post-event cleaning services for weddings, parties, and corporate events in Brooklyn and NYC.",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/event-cleaning',
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
    { "@type": "ListItem", "position": 3, "name": "Event Cleaning Services", "item": "https://brooklynmaids.com/services/event-cleaning" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Event Cleaning Services in Brooklyn, NY",
  "serviceType": "Event Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Event cleaning in Brooklyn and NYC. Pre-event setup and post-event cleanup for parties, weddings, and corporate events. Same-day service available.",
  "url": "https://brooklynmaids.com/services/event-cleaning",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do you offer same-day event cleanup?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer same-day and emergency event cleanup services. Contact us for urgent needs." } },
    { "@type": "Question", "name": "What types of events do you clean for?", "acceptedAnswer": { "@type": "Answer", "text": "We handle parties, weddings, corporate events, holiday gatherings, and any special occasion in Brooklyn and NYC." } },
    { "@type": "Question", "name": "Can you clean before and after an event?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer pre-event setup cleaning, during-event support, and post-event cleanup services." } }
  ]
};

export default function EventCleaningPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EventCleaningService />
    </main>
  );
}





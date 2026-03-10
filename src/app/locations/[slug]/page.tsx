import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import QuoteBar from '@/components/QuoteBar';
import ServicesSection from '@/components/ServicesSection';
import CallOrTextBar from '@/components/CallOrTextBar';
import WhatWeCleanSection from '@/components/WhatWeCleanSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import { locations, getLocationWithState } from '@/lib/locations';

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((loc) => loc.slug === slug);
  
  if (!location) {
    return { title: 'Location Not Found - Brooklyn Maids' };
  }

  const locationWithState = getLocationWithState(location.name, location.slug);
  const metaDescription = location.description || `Professional house cleaning services in ${locationWithState}. Licensed & insured maids, 100% satisfaction guarantee. Book online today!`;

  return {
    title: `House Cleaning in ${locationWithState} | Brooklyn Maids`,
    description: metaDescription,
    alternates: {
      canonical: `https://brooklynmaids.com/locations/${location.slug}`,
    },
    openGraph: {
      title: `House Cleaning in ${locationWithState} | Brooklyn Maids`,
      description: metaDescription,
      url: `https://brooklynmaids.com/locations/${location.slug}`,
      siteName: 'Brooklyn Maids',
      images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: `Brooklyn Maids - House Cleaning in ${locationWithState}` }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `House Cleaning in ${locationWithState} | Brooklyn Maids`,
      description: metaDescription,
      images: ['/ogs-image.jpg'],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = locations.find((loc) => loc.slug === slug);
  
  if (!location) {
    notFound();
  }

  const locationWithState = getLocationWithState(location.name, location.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brooklynmaids.com" },
      { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": "https://brooklynmaids.com/locations" },
      { "@type": "ListItem", "position": 3, "name": `House Cleaning in ${locationWithState}`, "item": `https://brooklynmaids.com/locations/${slug}` },
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `House Cleaning in ${locationWithState}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Brooklyn Maids",
      "url": "https://brooklynmaids.com"
    },
    "serviceType": "House Cleaning",
    "description": location.description,
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "containedInPlace": { "@type": "State", "name": location.state === "NJ" ? "New Jersey" : "New York" }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Cleaning Services in ${locationWithState}`,
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard Cleaning" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Deep Cleaning" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Move-Out Cleaning" } },
      ]
    }
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HeroSection location={location.name} />
      <QuoteBar />
      <ServicesSection location={locationWithState} />
      <CallOrTextBar />
      <WhatWeCleanSection />
      <QuoteBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <ReviewsSection location={location.name} />
      <CallOrTextBar />
      <FAQSection location={location.name} />
      <QuoteBar />
      <ContactSection />
    </main>
  );
}

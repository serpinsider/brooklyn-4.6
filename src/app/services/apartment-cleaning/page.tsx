import { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import QuoteBar from '@/components/QuoteBar';
import CallOrTextBar from '@/components/CallOrTextBar';
import WhatWeCleanSection from '@/components/WhatWeCleanSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import RelatedServicesSection from '@/components/RelatedServicesSection';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: "Apartment Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Professional apartment cleaning in Brooklyn & NYC. Studios, 1-beds, 2-beds and up. We bring all supplies. No contracts. Book online in 60 seconds!",
  keywords: [
    'apartment cleaning Brooklyn',
    'apartment cleaning service Brooklyn NY',
    'Brooklyn apartment cleaner',
    'apartment maid service Brooklyn',
    'NYC apartment cleaning',
    'studio apartment cleaning Brooklyn',
    'condo cleaning Brooklyn',
  ],
  openGraph: {
    title: "Apartment Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional apartment cleaning in Brooklyn & NYC. Studios to multi-bedroom apartments. We bring all supplies. Book online!",
    url: "https://brooklynmaids.com/services/apartment-cleaning",
    siteName: "Brooklyn Maids",
    images: [{ url: "/ogs-image.jpg", width: 1200, height: 630, alt: "Apartment Cleaning - Brooklyn Maids" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apartment Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Professional apartment cleaning in Brooklyn & NYC. Studios to multi-bedroom apartments. Book online!",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/apartment-cleaning',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": 160 } },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brooklynmaids.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brooklynmaids.com/#services" },
    { "@type": "ListItem", "position": 3, "name": "Apartment Cleaning", "item": "https://brooklynmaids.com/services/apartment-cleaning" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Apartment Cleaning Services in Brooklyn, NY",
  "serviceType": "Apartment Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "Professional apartment cleaning in Brooklyn and NYC. Studios, 1-beds, 2-beds and up. Standard, deep, and move-out cleaning for apartments of all sizes.",
  "url": "https://brooklynmaids.com/services/apartment-cleaning",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How much does apartment cleaning cost in Brooklyn?", "acceptedAnswer": { "@type": "Answer", "text": "Apartment cleaning pricing depends on the number of bedrooms, bathrooms, and the type of clean (standard, deep, or move-out). Get an instant quote in 60 seconds on our website." } },
    { "@type": "Question", "name": "Do I need to be home during apartment cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "No, many of our Brooklyn customers leave a key with the doorman or provide access instructions. We text you when we arrive and when we're done." } },
    { "@type": "Question", "name": "Do you clean studio apartments?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we clean studio apartments, 1-bedrooms, 2-bedrooms, and larger apartments across Brooklyn and NYC. Studios are our most popular booking." } },
    { "@type": "Question", "name": "Do you bring your own cleaning supplies?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we bring all supplies and equipment. Our products are eco-friendly and safe for pets and children." } },
    { "@type": "Question", "name": "What areas of Brooklyn do you serve for apartment cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "We serve all Brooklyn neighborhoods including Park Slope, Williamsburg, Brooklyn Heights, DUMBO, Crown Heights, Bushwick, Greenpoint, and more. We also serve Manhattan, Queens, and Jersey City." } },
  ]
};

export default function ApartmentCleaningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeroSection location="Brooklyn, NY" title="Apartment Cleaning Services in Brooklyn, NY" />
      <QuoteBar />

      {/* Main content section */}
      <section className="py-16" style={INLINE_STYLES.primary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#dfbd69] mb-6">
              Apartment Cleaning Tailored to Brooklyn Living
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Brooklyn apartments come in all shapes and sizes -- from cozy Williamsburg studios to spacious Park Slope brownstone floors. 
              Our cleaning service adapts to your space, whether it's a walk-up, elevator building, or doorman building. 
              We handle everything from weekly maintenance to deep cleans and move-out turnovers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <h3 className="text-lg font-serif font-bold text-white mb-3">Standard Clean</h3>
              <p className="text-white/70 text-sm mb-4">Regular apartment maintenance. Kitchens, bathrooms, bedrooms, and common areas cleaned thoroughly.</p>
              <Link href="/quote" className="text-[#dfbd69] hover:text-[#dfbd69]/80 text-sm font-semibold">Get a Quote &rarr;</Link>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <h3 className="text-lg font-serif font-bold text-white mb-3">Deep Clean</h3>
              <p className="text-white/70 text-sm mb-4">Thorough cleaning including baseboards, door frames, window sills, and hard-to-reach areas.</p>
              <Link href="/services/deep-clean" className="text-[#dfbd69] hover:text-[#dfbd69]/80 text-sm font-semibold">Learn More &rarr;</Link>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <h3 className="text-lg font-serif font-bold text-white mb-3">Move-Out Clean</h3>
              <p className="text-white/70 text-sm mb-4">Get your security deposit back. Inside cabinets, appliances, and full inspection-ready cleaning.</p>
              <Link href="/services/move-out" className="text-[#dfbd69] hover:text-[#dfbd69]/80 text-sm font-semibold">Learn More &rarr;</Link>
            </div>
          </div>

          <div className="space-y-6 text-white/80 text-base leading-relaxed">
            <h3 className="text-xl font-serif font-bold text-white">Why Brooklyn Apartments Need Specialized Cleaning</h3>
            <p>
              City living means dust accumulates faster, kitchens work harder in smaller spaces, and bathrooms need more 
              frequent attention. Whether your apartment has hardwood floors, tile, or carpet, our cleaners know how to 
              handle each surface properly. We're experienced with pre-war buildings, modern high-rises, and everything in between.
            </p>
            <p>
              Every apartment clean includes all bedrooms, bathrooms, kitchen, and living areas. We sweep, mop, vacuum, 
              dust all surfaces, clean countertops and stovetops, scrub bathrooms, make beds, and take out trash. 
              Need extras like inside the fridge, oven cleaning, or laundry? Add them on when you book.
            </p>
            <h3 className="text-xl font-serif font-bold text-white">Flexible Scheduling for Busy New Yorkers</h3>
            <p>
              We're available 7 days a week, 8 AM to 8 PM. Book a one-time clean or set up weekly, bi-weekly, or monthly 
              recurring service with no contracts. Same-day and next-day availability when our schedule allows. 
              You don't even need to be home -- just let us know how to get in.
            </p>
          </div>
        </div>
      </section>

      <CallOrTextBar />
      <WhatWeCleanSection />
      <QuoteBar />
      <HowItWorksSection />
      <CallOrTextBar />
      <AreasWeServeSection />
      <QuoteBar />
      <ReviewsSection location="Brooklyn" />
      <CallOrTextBar />
      <FAQSection location="Brooklyn" />
      <CallOrTextBar />
      <RelatedServicesSection currentService="apartment-cleaning" />
      <QuoteBar />
      <ContactSection />
    </>
  );
}

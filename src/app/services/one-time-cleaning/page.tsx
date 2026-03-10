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
  title: "One-Time Cleaning Services in Brooklyn, NY - Brooklyn Maids",
  description: "Book a one-time house cleaning in Brooklyn & NYC. No contracts, no commitments. Standard or deep clean. We bring all supplies. Book in 60 seconds!",
  keywords: [
    'one time cleaning Brooklyn',
    'one time house cleaning Brooklyn NY',
    'single cleaning service Brooklyn',
    'one time maid service Brooklyn',
    'no contract cleaning Brooklyn',
    'one time deep cleaning Brooklyn',
  ],
  openGraph: {
    title: "One-Time Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Book a one-time house cleaning in Brooklyn & NYC. No contracts, no commitments. We bring all supplies. Book online!",
    url: "https://brooklynmaids.com/services/one-time-cleaning",
    siteName: "Brooklyn Maids",
    images: [{ url: "/ogs-image.jpg", width: 1200, height: 630, alt: "One-Time Cleaning - Brooklyn Maids" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Time Cleaning Services in Brooklyn, NY - Brooklyn Maids",
    description: "Book a one-time house cleaning in Brooklyn & NYC. No contracts, no commitments. Book online!",
    images: ["/ogs-image.jpg"],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/one-time-cleaning',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": 160 } },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brooklynmaids.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brooklynmaids.com/#services" },
    { "@type": "ListItem", "position": 3, "name": "One-Time Cleaning", "item": "https://brooklynmaids.com/services/one-time-cleaning" },
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "One-Time Cleaning Services in Brooklyn, NY",
  "serviceType": "One-Time House Cleaning",
  "provider": { "@type": "LocalBusiness", "name": "Brooklyn Maids", "url": "https://brooklynmaids.com" },
  "areaServed": { "@type": "City", "name": "Brooklyn", "containedInPlace": { "@type": "State", "name": "New York" } },
  "description": "One-time house cleaning in Brooklyn and NYC. No contracts, no commitments. Standard or deep clean options. Book online in 60 seconds.",
  "url": "https://brooklynmaids.com/services/one-time-cleaning",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I book a one-time cleaning without a contract?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We never require contracts. Book a single cleaning whenever you need it -- no commitments, no recurring charges." } },
    { "@type": "Question", "name": "What's included in a one-time standard clean?", "acceptedAnswer": { "@type": "Answer", "text": "Our standard clean covers all bedrooms, bathrooms, kitchen, and living areas including sweeping, mopping, vacuuming, dusting, bathroom scrubbing, kitchen surfaces, making beds, and trash removal." } },
    { "@type": "Question", "name": "Can I upgrade a one-time clean to a deep clean?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can choose standard or deep clean when booking. Deep clean adds baseboards, door frames, window sills, and detailed attention to often-missed areas." } },
    { "@type": "Question", "name": "How quickly can I book a one-time cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "You can book online in 60 seconds. We often have same-day and next-day availability depending on our schedule." } },
    { "@type": "Question", "name": "Do you offer discounts if I switch from one-time to recurring?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, recurring customers receive discounted rates. Many customers try a one-time clean first and then switch to weekly, bi-weekly, or monthly service." } },
  ]
};

export default function OneTimeCleaningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeroSection location="Brooklyn, NY" title="One-Time House Cleaning in Brooklyn, NY" />
      <QuoteBar />

      {/* Main content section */}
      <section className="py-16" style={INLINE_STYLES.primary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#dfbd69] mb-6">
              One-Time Cleaning -- No Contracts, No Commitment
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Sometimes you just need a single clean. Maybe you're hosting guests this weekend, haven't cleaned in a while, 
              or want to try us out before committing to recurring service. Whatever the reason, we make it easy -- book once, 
              pay after we're done, and that's it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-serif font-bold text-white mb-3">One-Time Standard Clean</h3>
              <p className="text-white/70 text-sm mb-4">A thorough clean of your entire home. Perfect for regular upkeep or when your space needs a refresh.</p>
              <ul className="space-y-2 text-sm text-white/80 mb-4">
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>All rooms cleaned</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Kitchen and bathrooms scrubbed</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Floors swept, mopped, vacuumed</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>We bring all supplies</li>
              </ul>
              <Link href="/quote" className="inline-block bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#dfbd69]/90 transition-colors text-sm">Get a Quote</Link>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-serif font-bold text-white mb-3">One-Time Deep Clean</h3>
              <p className="text-white/70 text-sm mb-4">Everything in a standard clean plus detailed attention to areas that don't get regular cleaning.</p>
              <ul className="space-y-2 text-sm text-white/80 mb-4">
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Everything in standard clean</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Baseboards and door frames</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Window sills and light fixtures</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-[#dfbd69] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Detailed scrubbing throughout</li>
              </ul>
              <Link href="/services/deep-clean" className="inline-block bg-[#dfbd69] text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#dfbd69]/90 transition-colors text-sm">Learn More</Link>
            </div>
          </div>

          <div className="space-y-6 text-white/80 text-base leading-relaxed">
            <h3 className="text-xl font-serif font-bold text-white">When to Book a One-Time Clean</h3>
            <p>
              Hosting friends or family and need your place looking its best. Haven't cleaned in a few weeks and it's piling up. 
              Just moved in and want a fresh start before unpacking. Trying out a cleaning service for the first time before 
              deciding on recurring. Preparing for a special occasion or holiday. Coming back from vacation to a dusty apartment.
            </p>
            <h3 className="text-xl font-serif font-bold text-white">Try Us Once -- Many Customers Stay</h3>
            <p>
              Most of our recurring customers started with a single one-time clean. Once you see the difference, switching to 
              weekly or bi-weekly service is easy and comes with discounted rates. But there's zero pressure -- book once, and 
              if you're happy, we'll be here whenever you need us again.
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
      <RelatedServicesSection currentService="one-time-cleaning" />
      <QuoteBar />
      <ContactSection />
    </>
  );
}

import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import CallOrTextBar from '@/components/CallOrTextBar';
import QuoteBar from '@/components/QuoteBar';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WhatWeCleanSection from '@/components/WhatWeCleanSection';
import AreasWeServeSection from '@/components/AreasWeServeSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Brooklyn Maids - House Cleaning & Maid Service in Brooklyn, NYC',
  description: 'Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, and all NYC boroughs. Deep cleaning, move-out cleaning, apartment cleaning, and more. Book online in 60 seconds.',
  keywords: [
    'house cleaning Brooklyn',
    'maid service Brooklyn',
    'cleaning service Brooklyn NY',
    'house cleaning NYC',
    'Brooklyn cleaning company',
    'house cleaning near me',
    'maid service near me',
    'apartment cleaning Brooklyn',
    'deep cleaning Brooklyn',
    'move out cleaning Brooklyn',
    'cleaning service Manhattan',
    'house cleaning Queens',
  ],
  alternates: {
    canonical: 'https://brooklynmaids.com',
  },
  openGraph: {
    title: 'Brooklyn Maids - House Cleaning & Maid Service in Brooklyn, NYC',
    description: 'Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, and all NYC boroughs. Deep cleaning, move-out cleaning, and more. Book online in 60 seconds.',
    url: 'https://brooklynmaids.com',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: 'Brooklyn Maids - House Cleaning Services' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brooklyn Maids - House Cleaning & Maid Service in Brooklyn, NYC',
    description: 'Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, and all NYC boroughs. Book online in 60 seconds.',
    images: ['/ogs-image.jpg'],
  },
};

export default function Home() {
  return (
    <main id="main-content">
      <StructuredData type="faq" />
      <HeroSection location="Brooklyn, NY" />
      <QuoteBar />
      <ServicesSection location="Brooklyn, NY" />
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
      <QuoteBar />
      <ContactSection />
    </main>
  );
}

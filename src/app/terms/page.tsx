import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service - Brooklyn Maids',
  description: 'Our terms of service and service agreement for Brooklyn Maids house cleaning services.',
  openGraph: {
    title: 'Terms of Service - Brooklyn Maids',
    description: 'Our terms of service and service agreement for Brooklyn Maids house cleaning services.',
    url: 'https://brooklynmaids.com/terms',
    siteName: 'Brooklyn Maids',
    type: 'website',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: 'Terms of Service - Brooklyn Maids' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Brooklyn Maids',
    description: 'Our terms of service and service agreement for Brooklyn Maids house cleaning services.',
    images: ['/ogs-image.jpg'],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/terms',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}

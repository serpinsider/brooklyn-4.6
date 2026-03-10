import { Metadata } from 'next';
import RefundClient from './RefundClient';

export const metadata: Metadata = {
  title: 'Refund Policy - Brooklyn Maids',
  description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
  openGraph: {
    title: 'Refund Policy - Brooklyn Maids',
    description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
    url: 'https://brooklynmaids.com/refund',
    siteName: 'Brooklyn Maids',
    type: 'website',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: 'Refund Policy - Brooklyn Maids' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund Policy - Brooklyn Maids',
    description: 'Our satisfaction guarantee and cancellation policy. We make it right if the clean isn\'t to your standard.',
    images: ['/ogs-image.jpg'],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/refund',
  },
};

export default function RefundPage() {
  return <RefundClient />;
}

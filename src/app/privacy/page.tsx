import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy - Brooklyn Maids',
  description: 'How we protect and use your information. Learn about our privacy practices and your rights.',
  openGraph: {
    title: 'Privacy Policy - Brooklyn Maids',
    description: 'How we protect and use your information. Learn about our privacy practices and your rights.',
    url: 'https://brooklynmaids.com/privacy',
    siteName: 'Brooklyn Maids',
    type: 'website',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: 'Privacy Policy - Brooklyn Maids' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Brooklyn Maids',
    description: 'How we protect and use your information. Learn about our privacy practices and your rights.',
    images: ['/ogs-image.jpg'],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}

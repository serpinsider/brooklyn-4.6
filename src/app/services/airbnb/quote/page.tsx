import { Metadata } from 'next';
import AirbnbQuoteForm from '@/components/AirbnbQuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Quote - Brooklyn Maids',
  description: 'Get a free airbnb cleaning quote. Professional airbnb cleaning services in Brooklyn, NY.',
  openGraph: {
    title: 'Airbnb Cleaning Quote - Brooklyn Maids',
    description: 'Professional airbnb cleaning in Brooklyn, NY.',
    url: 'https://brooklynmaids.com/services/airbnb/quote',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Airbnb Cleaning Quote - Brooklyn Maids', images: ['/ogs-image.jpg'] },
  alternates: { canonical: 'https://brooklynmaids.com/services/airbnb/quote' },
};

export default function AirbnbQuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <AirbnbQuoteForm />
    </main>
  );
}

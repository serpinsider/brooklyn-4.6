import { Metadata } from 'next';
import CarCleaningQuoteForm from '@/components/CarCleaningQuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Car Cleaning Quote - Brooklyn Maids',
  description: 'Get a free car cleaning quote. Professional car cleaning services in Brooklyn, NY.',
  openGraph: {
    title: 'Car Cleaning Quote - Brooklyn Maids',
    description: 'Professional car cleaning in Brooklyn, NY.',
    url: 'https://brooklynmaids.com/services/car-cleaning/quote',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Car Cleaning Quote - Brooklyn Maids', images: ['/ogs-image.jpg'] },
  alternates: { canonical: 'https://brooklynmaids.com/services/car-cleaning/quote' },
};

export default function CarCleaningQuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <CarCleaningQuoteForm />
    </main>
  );
}

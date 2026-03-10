import { Metadata } from 'next';
import CommercialQuoteForm from '@/components/CommercialQuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Commercial Cleaning Quote - Brooklyn Maids',
  description: 'Get a free commercial cleaning quote. Professional commercial cleaning services in Brooklyn, NY.',
  openGraph: {
    title: 'Commercial Cleaning Quote - Brooklyn Maids',
    description: 'Professional commercial cleaning in Brooklyn, NY.',
    url: 'https://brooklynmaids.com/services/commercial/quote',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Commercial Cleaning Quote - Brooklyn Maids', images: ['/ogs-image.jpg'] },
  alternates: { canonical: 'https://brooklynmaids.com/services/commercial/quote' },
};

export default function CommercialQuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <CommercialQuoteForm />
    </main>
  );
}

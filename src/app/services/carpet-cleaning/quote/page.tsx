import { Metadata } from 'next';
import CarpetQuoteForm from '@/components/CarpetQuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Carpet Cleaning Quote - Brooklyn Maids',
  description: 'Get a free carpet cleaning quote. Professional carpet cleaning services in Brooklyn, NY.',
  openGraph: {
    title: 'Carpet Cleaning Quote - Brooklyn Maids',
    description: 'Professional carpet cleaning in Brooklyn, NY.',
    url: 'https://brooklynmaids.com/services/carpet-cleaning/quote',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Carpet Cleaning Quote - Brooklyn Maids', images: ['/ogs-image.jpg'] },
  alternates: { canonical: 'https://brooklynmaids.com/services/carpet-cleaning/quote' },
};

export default function CarpetQuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <CarpetQuoteForm />
    </main>
  );
}

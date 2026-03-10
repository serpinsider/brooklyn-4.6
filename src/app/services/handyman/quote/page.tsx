import { Metadata } from 'next';
import HandymanQuoteForm from '@/components/HandymanQuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Handyman Services Quote - Brooklyn Maids',
  description: 'Get a free handyman services quote. Professional handyman services services in Brooklyn, NY.',
  openGraph: {
    title: 'Handyman Services Quote - Brooklyn Maids',
    description: 'Professional handyman services in Brooklyn, NY.',
    url: 'https://brooklynmaids.com/services/handyman/quote',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Handyman Services Quote - Brooklyn Maids', images: ['/ogs-image.jpg'] },
  alternates: { canonical: 'https://brooklynmaids.com/services/handyman/quote' },
};

export default function HandymanQuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <HandymanQuoteForm />
    </main>
  );
}

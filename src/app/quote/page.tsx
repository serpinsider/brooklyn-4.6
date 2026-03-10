import { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Get Your Quote - Brooklyn Maids',
  description: 'Get an instant, accurate quote for house cleaning services. Fast, easy, and no obligations. Serving Brooklyn, New York.',
  openGraph: {
    title: 'Get Your Quote - Brooklyn Maids',
    description: 'Get an instant quote for your home cleaning service. Choose your cleaning type, customize your needs, and let Brooklyn Maids take care of the rest.',
    url: 'https://brooklynmaids.com/quote',
    siteName: 'Brooklyn Maids',
    images: [
      {
        url: '/ogs-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Get a Cleaning Quote',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Quote - Brooklyn Maids',
    description: 'Get an instant, accurate quote for house cleaning services. Fast, easy, and no obligations.',
    images: ['/ogs-image.jpg'],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/quote',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <QuoteForm />
    </main>
  );
}

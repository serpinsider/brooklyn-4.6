import { Metadata } from 'next';
import PostConstructionQuoteForm from '@/components/PostConstructionQuoteForm';
import { INLINE_STYLES } from '@/styles/colors';

export const metadata: Metadata = {
  title: 'Post-Construction Cleaning Quote - Brooklyn Maids',
  description: 'Get a free post-construction cleaning quote. Professional post-construction cleaning services in Brooklyn, NY.',
  openGraph: {
    title: 'Post-Construction Cleaning Quote - Brooklyn Maids',
    description: 'Professional post-construction cleaning in Brooklyn, NY.',
    url: 'https://brooklynmaids.com/services/post-construction/quote',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Post-Construction Cleaning Quote - Brooklyn Maids', images: ['/ogs-image.jpg'] },
  alternates: { canonical: 'https://brooklynmaids.com/services/post-construction/quote' },
};

export default function PostConstructionQuotePage() {
  return (
    <main className="min-h-screen" style={INLINE_STYLES.primary}>
      <PostConstructionQuoteForm />
    </main>
  );
}

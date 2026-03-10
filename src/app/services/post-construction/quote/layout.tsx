import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post-Construction Cleaning Quote - Brooklyn Maids',
  description: 'Get a quote for professional post-construction and renovation cleanup in Brooklyn & NYC. Dust removal, debris cleanup, move-in ready.',
  alternates: {
    canonical: 'https://brooklynmaids.com/services/post-construction/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

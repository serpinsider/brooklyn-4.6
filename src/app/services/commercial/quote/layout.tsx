import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Cleaning Quote - Brooklyn Maids',
  description: 'Get a quote for professional commercial and office cleaning in Brooklyn & NYC. Daily, weekly, or one-time service.',
  alternates: {
    canonical: 'https://brooklynmaids.com/services/commercial/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

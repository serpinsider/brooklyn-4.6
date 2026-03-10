import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carpet Cleaning Quote - Brooklyn Maids',
  description: 'Get a quote for professional carpet cleaning in Brooklyn & NYC. Deep steam cleaning, stain removal, pet odor treatment.',
  alternates: {
    canonical: 'https://brooklynmaids.com/services/carpet-cleaning/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Cleaning Quote - Brooklyn Maids',
  description: 'Get a quote for professional car detailing in Brooklyn & NYC. Interior, exterior, and full detail services.',
  alternates: {
    canonical: 'https://brooklynmaids.com/services/car-cleaning/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

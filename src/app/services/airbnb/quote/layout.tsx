import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Quote - Brooklyn Maids',
  description: 'Get a quote for professional Airbnb turnover cleaning in Brooklyn & NYC. Same-day service, guest-ready results.',
  alternates: {
    canonical: 'https://brooklynmaids.com/services/airbnb/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

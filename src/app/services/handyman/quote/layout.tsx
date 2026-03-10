import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handyman Services Quote - Brooklyn Maids',
  description: 'Get a quote for professional handyman services in Brooklyn & NYC. Furniture assembly, TV mounting, minor repairs, and more.',
  alternates: {
    canonical: 'https://brooklynmaids.com/services/handyman/quote',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gift Cards - Brooklyn Maids',
  description: 'Give the gift of a clean home. Purchase a Brooklyn Maids gift card for house cleaning services in Brooklyn & NYC.',
  openGraph: {
    title: 'Gift Cards - Brooklyn Maids',
    description: 'Give the gift of a clean home. Purchase a Brooklyn Maids gift card for house cleaning services in Brooklyn & NYC.',
    url: 'https://brooklynmaids.com/gift-cards',
    siteName: 'Brooklyn Maids',
    type: 'website',
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/gift-cards',
  },
};

export default function GiftCardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

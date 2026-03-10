import { Metadata } from 'next';
import EventCleaningQuoteClient from './EventCleaningQuoteClient';

export const metadata: Metadata = {
  title: 'Get Your Event Cleaning Quote - Brooklyn Maids',
  description: 'Request a quote for event cleaning services in Brooklyn & NYC. Pre-event setup, during-event support, and post-event cleanup.',
  openGraph: {
    title: 'Get Your Event Cleaning Quote - Brooklyn Maids',
    description: 'Request a quote for event cleaning services in Brooklyn & NYC.',
    url: 'https://brooklynmaids.com/services/event-cleaning/quote',
    siteName: 'Brooklyn Maids',
    type: 'website',
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/services/event-cleaning/quote',
  },
};

export default function EventCleaningQuotePage() {
  return <EventCleaningQuoteClient />;
}

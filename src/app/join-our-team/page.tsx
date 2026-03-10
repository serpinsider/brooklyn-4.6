import { Metadata } from 'next';
import JoinOurTeamClient from './JoinOurTeamClient';

export const metadata: Metadata = {
  title: 'Join Our Team - Brooklyn Maids',
  description: 'Apply to join our professional cleaning team. Competitive pay, flexible scheduling, and ongoing training. Start your career with Brooklyn Maids today.',
  openGraph: {
    title: 'Join Our Team - Brooklyn Maids',
    description: 'Apply to join our professional cleaning team. Competitive pay, flexible scheduling, and ongoing training.',
    url: 'https://brooklynmaids.com/join-our-team',
    siteName: 'Brooklyn Maids',
    type: 'website',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: 'Join Our Team - Brooklyn Maids' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Team - Brooklyn Maids',
    description: 'Apply to join our professional cleaning team. Competitive pay, flexible scheduling, and ongoing training.',
    images: ['/ogs-image.jpg'],
  },
  alternates: {
    canonical: 'https://brooklynmaids.com/join-our-team',
  },
};

export default function JoinOurTeamPage() {
  return <JoinOurTeamClient />;
}

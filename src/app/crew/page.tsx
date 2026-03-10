import { Metadata } from 'next';
import CrewClient from './CrewClient';

export const metadata: Metadata = {
  title: 'Cleaner Operations',
  robots: { index: false, follow: false },
};

export default function CrewPage() {
  return <CrewClient />;
}

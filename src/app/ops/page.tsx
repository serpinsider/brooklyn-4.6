import { Metadata } from 'next';
import OpsClient from './OpsClient';

export const metadata: Metadata = {
  title: 'Team Operations',
  robots: { index: false, follow: false },
};

export default function OpsPage() {
  return <OpsClient />;
}

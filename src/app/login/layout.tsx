import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In - Brooklyn Maids',
  description: 'Log in to your Brooklyn Maids account to manage bookings and view service history.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Brooklyn Maids',
  description: 'Create your Brooklyn Maids account to book and manage cleaning services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

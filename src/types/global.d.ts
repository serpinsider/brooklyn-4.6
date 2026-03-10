interface Window {
  fathom?: {
    trackEvent: (name: string, opts?: { _value?: number }) => void;
    trackGoal: (id: string, cents: number) => void;
  };
  gtag?: (...args: unknown[]) => void;
}

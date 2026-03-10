'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const messages = [
    { text: 'Save 10% on weekly recurring cleanings', cta: 'Get a quote', href: '/quote' },
    { text: 'Licensed, insured & bonded — serving all 5 NYC boroughs', cta: 'See areas', href: '/#areas' },
    { text: 'Get a free quote in 60 seconds — no commitment', cta: 'Start now', href: '/quote' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const current = messages[currentMessageIndex];

  return (
    <div className="bg-[#dfbd69] text-[#283845] px-4 py-2 fixed w-full top-0 z-[60] border-b border-[#c4a55a]/30">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 h-8">
        <div className={`flex items-center gap-3 transition-opacity duration-400 ${animating ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-xs sm:text-sm font-medium text-[#283845] leading-none">
            {current.text}
          </span>
          <Link
            href={current.href}
            className="hidden sm:inline-flex items-center text-xs font-bold text-[#283845] underline underline-offset-2 hover:no-underline whitespace-nowrap"
            onClick={() => { if (typeof window !== 'undefined' && window.fathom) window.fathom.trackEvent(`Banner Click - ${current.cta}`); }}
          >
            {current.cta} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

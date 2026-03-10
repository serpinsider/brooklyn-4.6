'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT_INFO } from '@/lib/contact';
import Logo from './Logo';

interface HeaderProps {
  forceCollapsed?: boolean;
}

export default function Header({ forceCollapsed = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      lastScrollY.current = window.scrollY;
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const collapsed = forceCollapsed || isScrolled;

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#how-it-works', label: 'Process' },
    { href: '/#areas', label: 'Areas' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <header
      className="fixed w-full z-50"
      style={{ top: '48px' }}
    >
      {/* ─── DESKTOP (lg+) ─── */}
      <div className="hidden lg:block">

        {/* Background layer — fades in as you scroll */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            opacity: collapsed ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Logo + icons + CTA row — always visible, shrinks on scroll */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          style={{
            height: collapsed ? '60px' : '88px',
            transition: 'height 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Left – contact icons */}
          <div className="w-1/4 flex items-center space-x-4">
            <a href={CONTACT_INFO.phone.href} aria-label="Call Brooklyn Maids" className="text-[#dfbd69] hover:text-[#dfbd69]/70 transition-colors group">
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a href={`sms:${CONTACT_INFO.phone.raw}`} aria-label="Text Brooklyn Maids" className="text-[#dfbd69] hover:text-[#dfbd69]/70 transition-colors group">
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>

          {/* Center – logo */}
          <div className="w-1/2 flex justify-center">
            <Logo size={collapsed ? 'md' : 'lg'} />
          </div>

          {/* Right – CTA */}
          <div className="w-1/4 flex justify-end">
            <Link
              href="/booking"
              className={`button-tertiary transition-all duration-300 ${collapsed ? 'px-4 py-2 text-sm' : 'px-5 py-2.5'}`}
              onClick={() => { if (typeof window !== 'undefined' && window.fathom) window.fathom.trackEvent('Book Online Click - Header'); }}
            >
              Book Online
            </Link>
          </div>
        </div>

        {/* Nav row — fades + slides up on scroll */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
          style={{
            maxHeight: collapsed ? '0px' : '48px',
            opacity: collapsed ? 0 : 1,
            transition: 'max-height 450ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <nav className="flex items-center justify-center pb-4 space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} scroll={true} className="text-white/80 hover:text-white font-medium transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

      </div>

      {/* ─── MOBILE / TABLET (below lg) ─── */}
      <div className="lg:hidden">

        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            opacity: collapsed ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 px-4">
            <div className="w-8" />
            <div className="flex-1 flex justify-center">
              <Logo size="md" />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/80 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── MOBILE DROPDOWN (shared) ─── */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-[60] transition-all duration-300 ease-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{
          top: '112px',
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white/90 hover:text-white font-medium text-lg py-2 border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center justify-center space-x-6 py-4">
            <a href={CONTACT_INFO.phone.href} aria-label="Call Brooklyn Maids" className="flex items-center text-[#dfbd69] hover:text-[#dfbd69]/80 font-medium" onClick={() => { if (typeof window !== 'undefined' && window.fathom) window.fathom.trackEvent('Phone Click'); }}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
            <a href={`sms:${CONTACT_INFO.phone.raw}`} aria-label="Text Brooklyn Maids" className="flex items-center text-[#dfbd69] hover:text-[#dfbd69]/80 font-medium" onClick={() => { if (typeof window !== 'undefined' && window.fathom) window.fathom.trackEvent('Text Click'); }}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Text
            </a>
          </div>

          <Link
            href="/booking"
            className="button-tertiary w-full py-4 text-center"
            onClick={() => { setIsMenuOpen(false); if (typeof window !== 'undefined' && window.fathom) window.fathom.trackEvent('Book Online Click - Mobile Menu'); }}
          >
            Book Online
          </Link>
        </div>
      </div>

    </header>
  );
}

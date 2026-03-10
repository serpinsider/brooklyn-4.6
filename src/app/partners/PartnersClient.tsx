'use client';

import { useState } from 'react';
import { CONTACT_INFO } from '@/lib/contact';
import { INLINE_STYLES } from '@/styles/colors';
import { TYPOGRAPHY } from '@/styles/typography';

const PARTNERSHIP_SERVICES = [
  {
    title: 'Move-In / Move-Out Cleaning',
    description: 'Floor-to-ceiling deep clean to get properties tenant-ready or return security deposits.',
    features: [
      'Full kitchen degreasing and sanitization',
      'Bathroom deep clean and descaling',
      'All surfaces, baseboards, and light fixtures',
      'Interior windows and window sills',
      'Cabinet and closet wipe-down',
    ],
  },
  {
    title: 'Staging & Showing Prep',
    description: 'Make listings shine for open houses, photos, and video tours.',
    features: [
      'Surface-level clean and polish',
      'Kitchen and bathroom sparkle',
      'Floor vacuuming and mopping',
      'Dust-free surfaces for photography',
      'Same-day availability for last-minute showings',
    ],
  },
  {
    title: 'Rental Turnover Cleaning',
    description: 'Fast turnaround between tenants for property managers and landlords.',
    features: [
      'Deep clean of entire unit',
      'Appliance interior cleaning',
      'Wall spot-cleaning and touch-ups',
      'Trash and debris removal',
      'Post-renovation dust and cleanup',
    ],
  },
];

const PARTNER_BENEFITS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Preferred Partner Rates',
    description: 'Exclusive pricing for all partner-referred cleanings. Volume discounts available for high-frequency accounts.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Priority Scheduling',
    description: 'Partner bookings get priority placement. Same-day and next-day availability for urgent turnovers and showings.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Dedicated Account Manager',
    description: 'A single point of contact who knows your properties, your preferences, and your schedule.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Fully Licensed & Insured',
    description: '$2M general liability coverage. Your clients and properties are always protected.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Before & After Photos',
    description: 'Professional photo documentation of every clean. Use them for listings, proof of work, or marketing.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Recurring & On-Demand',
    description: 'Set up recurring cleans for managed properties or book on-demand for closings and turnovers.',
  },
];

const STATS = [
  { value: '4.9', label: 'Google Rating', suffix: '/5' },
  { value: '171', label: 'Google Reviews', suffix: '+' },
  { value: '2,500', label: 'Homes Cleaned', suffix: '+' },
  { value: '5', label: 'Years Serving NYC', suffix: '+' },
];

type PartnerType = 'realtor' | 'property_manager' | 'landlord' | 'developer' | 'other';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  partnerType: PartnerType | '';
  propertiesPerMonth: string;
  areas: string;
  message: string;
}

export default function PartnersClient() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnerType: '',
    propertiesPerMonth: '',
    areas: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const partnerNumber = 'BK-PTR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const response = await fetch('https://formspree.io/f/mqazolgp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          partnerNumber,
          _subject: `Partnership Inquiry from ${formData.name} (${formData.company}) - #${partnerNumber}`,
          sourcePage: '/partners',
          type: 'partnership_inquiry',
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      setIsSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerTypeLabels: Record<PartnerType, string> = {
    realtor: 'Real Estate Agent',
    property_manager: 'Property Manager',
    landlord: 'Landlord / Building Owner',
    developer: 'Developer / Renovator',
    other: 'Other',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={INLINE_STYLES.primary}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#dfbd69] font-semibold text-sm tracking-widest uppercase mb-4">
              Partnership Program
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Your Listings Deserve a{' '}
              <span className="bg-gradient-to-r from-[#dfbd69] to-[#926f34] bg-clip-text text-transparent">
                Spotless First Impression
              </span>
            </h1>
            <p className="text-lg text-gray-100 leading-relaxed mb-8 max-w-2xl mx-auto">
              We help realtors, property managers, and landlords across NYC deliver move-in ready properties
              with preferred rates, priority scheduling, and a dedicated team that understands real estate timelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#inquiry" className="button-quaternary text-center px-8 py-4">
                Become a Partner
              </a>
              <a href={`tel:${CONTACT_INFO.phone.raw}`} className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/20 transition-colors border border-white/20">
                Call {CONTACT_INFO.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-serif font-bold text-[#dfbd69]">
                  {stat.value}<span className="text-[#926f34]">{stat.suffix}</span>
                </p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>Why Partner With Us</h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Built for the pace and standards of NYC real estate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PARTNER_BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl border border-white/10 p-8 hover:bg-[rgba(15,23,42,0.98)] hover:border-white/20 transition-all"
              >
                <div className="text-[#dfbd69] mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-serif font-bold text-[#dfbd69] mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services for Partners */}
      <section className="py-20 border-t border-white/5" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>Cleaning Services for Your Properties</h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              Every service tailored for real estate timelines and standards
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PARTNERSHIP_SERVICES.map((service, i) => (
              <div
                key={i}
                className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl shadow-xl border border-white/10 p-8 hover:bg-[rgba(15,23,42,0.98)] hover:shadow-2xl hover:shadow-black/30 transition-all flex flex-col h-full"
              >
                <div className="text-center mb-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#dfbd69] mb-3 drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md min-h-[48px]">
                    {service.description}
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start text-xs sm:text-sm text-white/90">
                      <svg className="w-3.5 h-3.5 text-[#dfbd69] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={TYPOGRAPHY.sectionTitle}>How It Works</h2>
            <p className={`${TYPOGRAPHY.description} max-w-3xl mx-auto`}>
              From first call to first clean in under 48 hours
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Get in Touch', desc: 'Fill out the form below or call us. We\'ll learn about your portfolio and needs.' },
                { step: '02', title: 'Custom Plan', desc: 'We build a cleaning plan with your preferred services, schedule, and pricing.' },
                { step: '03', title: 'Book Anytime', desc: 'Text, call, or email your account manager to schedule cleans as needed.' },
                { step: '04', title: 'We Deliver', desc: 'Your properties are cleaned on time, every time. Photos sent upon completion.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#dfbd69] to-[#926f34] flex items-center justify-center mx-auto mb-4">
                    <span className="text-slate-900 font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 border-t border-white/5" style={INLINE_STYLES.primary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#dfbd69]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-white/90 text-lg leading-relaxed italic mb-6 max-w-2xl mx-auto">
            &ldquo;Brooklyn Maids has been our go-to for every listing turnover. They understand the urgency
            of real estate -- when I need a property show-ready by tomorrow morning, they make it happen.
            The before-and-after photos are a bonus our sellers love.&rdquo;
          </blockquote>
          <p className="text-[#dfbd69] font-semibold">Brooklyn Real Estate Partner</p>
          <p className="text-white/50 text-sm">Licensed Real Estate Agent, NYC</p>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="inquiry" className="py-20 border-t border-white/5" style={INLINE_STYLES.primary}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={TYPOGRAPHY.sectionTitle}>Start a Partnership</h2>
            <p className={`${TYPOGRAPHY.description} max-w-2xl mx-auto`}>
              Tell us about your business and we&apos;ll put together a custom cleaning plan with partner pricing.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl border border-[#dfbd69]/30 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dfbd69] to-[#926f34] flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#dfbd69] mb-4">We&apos;ll Be in Touch</h3>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Thank you for your interest in partnering with Brooklyn Maids. Our partnerships team will
                reach out within 24 hours to discuss your needs and set up your account.
              </p>
              <p className="text-white/50 text-sm">
                Need something sooner? Call us at{' '}
                <a href={CONTACT_INFO.phone.href} className="text-[#dfbd69] hover:underline">
                  {CONTACT_INFO.phone.display}
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[rgba(15,23,42,0.95)] backdrop-blur-md rounded-xl border border-white/10 p-8 md:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={TYPOGRAPHY.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className={TYPOGRAPHY.label}>Company / Brokerage *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors"
                    placeholder="Compass, Corcoran, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={TYPOGRAPHY.label}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className={TYPOGRAPHY.label}>Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors"
                    placeholder="(347) 750-4380"
                  />
                </div>
              </div>

              <div>
                <label className={TYPOGRAPHY.label}>I am a... *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.entries(partnerTypeLabels) as [PartnerType, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({ ...formData, partnerType: key })}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        formData.partnerType === key
                          ? 'bg-gradient-to-r from-[#dfbd69] to-[#926f34] text-slate-900 ring-2 ring-[#dfbd69]/50'
                          : 'bg-slate-900/50 text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={TYPOGRAPHY.label}>Properties Per Month (est.)</label>
                  <select
                    value={formData.propertiesPerMonth}
                    onChange={(e) => setFormData({ ...formData, propertiesPerMonth: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors"
                  >
                    <option value="" className="bg-slate-900">Select volume</option>
                    <option value="1-3" className="bg-slate-900">1-3 properties</option>
                    <option value="4-10" className="bg-slate-900">4-10 properties</option>
                    <option value="11-25" className="bg-slate-900">11-25 properties</option>
                    <option value="25+" className="bg-slate-900">25+ properties</option>
                  </select>
                </div>
                <div>
                  <label className={TYPOGRAPHY.label}>Primary Areas</label>
                  <input
                    type="text"
                    value={formData.areas}
                    onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors"
                    placeholder="Brooklyn, Manhattan, Queens..."
                  />
                </div>
              </div>

              <div>
                <label className={TYPOGRAPHY.label}>Anything else we should know?</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#dfbd69]/50 focus:border-[#dfbd69]/50 transition-colors resize-none"
                  placeholder="Tell us about your typical cleaning needs, turnaround times, or any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.partnerType}
                className="button-quaternary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
              </button>

              <p className="text-white/40 text-xs text-center">
                We typically respond within 24 hours. For urgent needs, call{' '}
                <a href={CONTACT_INFO.phone.href} className="text-[#dfbd69] hover:underline">
                  {CONTACT_INFO.phone.display}
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 border-t border-white/5" style={INLINE_STYLES.primary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={TYPOGRAPHY.sectionTitle}>Serving All of NYC & Beyond</h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto mb-8">
            We clean properties across all five boroughs, Long Island, Westchester, and Northern New Jersey.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              'Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Staten Island',
              'Long Island', 'Westchester', 'Jersey City', 'Hoboken', 'Northern NJ',
            ].map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-white/5" style={INLINE_STYLES.primary}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-4">
            Ready to simplify your property cleaning?
          </h2>
          <p className="text-white/70 mb-8">
            Join the realtors and property managers across NYC who trust Brooklyn Maids
            to keep their properties in top condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#inquiry" className="button-quaternary text-center px-8 py-4">
              Start a Partnership
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email.raw}?subject=Partnership Inquiry`}
              className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/20 transition-colors border border-white/20"
            >
              Email {CONTACT_INFO.email.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Phone, Mail } from 'lucide-react';
import { ThemeProvider, useTheme, ThemeToggle } from '@/components/internal/theme';
import { cn } from '@/components/internal/utils';
import {
  SectionAccordion,
  ProgressBar,
  Rule,
  Checklist,
  Callout,
  SectionHeading,
  P,
  Pb,
  Li,
  InfoBox,
  InternalLayout,
} from '@/components/internal/components';

const PASSWORD = 'cleanteam';
const STORAGE_KEY = 'crew_progress';
const BRAND = 'Brooklyn Maids';
const PHONE = '(347) 750-4380';
const EMAIL = 'hello@brooklynmaids.com';
const DOMAIN = 'brooklynmaids.com';

const TOC = [
  { id: 'welcome', num: 1, title: 'Welcome' },
  { id: 'role', num: 2, title: 'Your Role' },
  { id: 'pay', num: 3, title: 'Pay & Bonuses' },
  { id: 'trial', num: 4, title: 'Trial Period' },
  { id: 'getting-started', num: 5, title: 'Getting Started' },
  { id: 'dress', num: 6, title: 'Dress Code' },
  { id: 'products', num: 7, title: 'Products & Supplies' },
  { id: 'services', num: 8, title: 'Service Types' },
  { id: 'standards', num: 9, title: 'Cleaning Standards' },
  { id: 'arrival', num: 10, title: 'Arrival & Access' },
  { id: 'afterclean', num: 11, title: 'After the Clean' },
  { id: 'materials', num: 12, title: 'Marketing Materials' },
  { id: 'issues', num: 13, title: 'Issues On-Site' },
  { id: 'communication', num: 14, title: 'Communication' },
  { id: 'bookingkoala', num: 15, title: 'Using BookingKoala' },
  { id: 'recurring', num: 16, title: 'Recurring Clients' },
  { id: 'policies', num: 17, title: 'Policies & Penalties' },
];

function ContactBar() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Crew Message from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={cn('rounded-xl border px-5 py-4 mb-6', theme === 'dark' ? 'bg-white/[0.04] border-white/10' : 'bg-gray-50 border-gray-200')}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className={cn('text-sm font-semibold', theme === 'dark' ? 'text-white' : 'text-gray-900')}>{BRAND}</p>
          <p className={cn('text-xs', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>{DOMAIN}</p>
        </div>
        <div className="text-right space-y-0.5">
          <a href={`tel:${PHONE.replace(/\D/g, '')}`} className={cn('flex items-center gap-1.5 text-sm font-mono transition-colors', theme === 'dark' ? 'text-white hover:text-emerald-400' : 'text-gray-900 hover:text-emerald-600')}>
            <Phone className="w-3.5 h-3.5" />{PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className={cn('flex items-center gap-1.5 text-xs transition-colors', theme === 'dark' ? 'text-white/60 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600')}>
            <Mail className="w-3 h-3" />{EMAIL}
          </a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <p className={cn('text-xs font-mono uppercase tracking-wider', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>Send us a message</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required
          className={cn('w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-colors', theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/20' : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300')} />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" required rows={3}
          className={cn('w-full px-3 py-2 rounded-lg text-sm focus:outline-none resize-none transition-colors', theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/20' : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300')} />
        <button type="submit" className={cn('px-4 py-2 rounded-lg text-sm transition-colors', theme === 'dark' ? 'bg-white/10 hover:bg-white/15 border border-white/10 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white')}>
          Send
        </button>
      </form>
    </div>
  );
}

function CrewContent() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const handleComplete = useCallback((id: string, done: boolean) => {
    setProgress(prev => {
      const next = { ...prev, [id]: done };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const completedCount = TOC.filter(t => progress[t.id]).length;

  const jumpTo = useCallback((id: string) => {
    setActiveSection(id);
    setTimeout(() => setActiveSection(''), 100);
  }, []);

  const handleResetProgress = useCallback(() => {
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const sections = TOC.map(t => ({
    ...t,
    completed: !!progress[t.id],
    onComplete: handleComplete,
    children: getSectionContent(t.id, theme),
  }));

  return (
    <InternalLayout
      title="Cleaner Operations"
      subtitle="Cleaner Manual"
      toc={TOC}
      progress={progress}
      completedCount={completedCount}
      search={search}
      onSearch={setSearch}
      onJumpTo={jumpTo}
      onResetProgress={handleResetProgress}
    >
      <ContactBar />

      <div className="flex items-start justify-between mb-1">
        <h1 className={cn('text-2xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Cleaner Operations</h1>
        <div className="lg:hidden"><ProgressBar completed={completedCount} total={TOC.length} /></div>
      </div>
      <p className={cn('text-sm mb-3', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>Last updated March 2026</p>

      {completedCount === 0 && (
        <Callout variant="info" title={`Welcome to ${BRAND}`}>This manual covers everything you need to know about working with us. Read through each section, mark it as understood, and refer back anytime. Your progress is saved automatically.</Callout>
      )}
      {completedCount > 0 && completedCount < TOC.length && <div className="mb-8 lg:hidden"><ProgressBar completed={completedCount} total={TOC.length} /></div>}
      {completedCount === TOC.length && <Callout variant="success" title="All sections complete">You&apos;ve reviewed the entire manual. Come back anytime to reference specific sections.</Callout>}

      <div className="mt-6">
        <SectionAccordion items={sections} activeSection={activeSection} />
      </div>

      <p className={cn('text-xs text-center mt-10 mb-20', theme === 'dark' ? 'text-white/20' : 'text-gray-300')}>v3.0 | March 2026</p>
    </InternalLayout>
  );
}

function getSectionContent(id: string, theme: string) {
  const t = theme === 'dark';
  const textClass = t ? 'text-white/60' : 'text-gray-500';
  const headClass = t ? 'text-white' : 'text-gray-900';
  const mutedClass = t ? 'text-white/40' : 'text-gray-400';
  const amberClass = t ? 'text-amber-400/80' : 'text-amber-600';

  switch (id) {
    case 'welcome':
      return (
        <div className="space-y-3">
          <Pb>Thank you for joining {BRAND}. We run a professional cleaning company across multiple cities under different brand names, but the standards are the same everywhere. Your work is the product. When you walk into a customer&apos;s home, you are the company.</Pb>
          <Pb>Read this manual carefully. If anything is unclear, call or text us at <span className={cn('font-mono text-xs', headClass)}>{PHONE}</span> or email <span className={cn('font-mono text-xs', headClass)}>{EMAIL}</span>.</Pb>
        </div>
      );

    case 'role':
      return (
        <div className="space-y-4">
          <Pb>You represent {BRAND} inside the customer&apos;s home. They don&apos;t see the office or the website. They see you. Their impression of the entire company comes from your work and how you carry yourself.</Pb>
          <div>
            <SectionHeading>What We Expect</SectionHeading>
            <ul className="space-y-2 mt-2">
              <Rule>Be professional at all times</Rule>
              <Rule>Be respectful of the customer&apos;s home and belongings</Rule>
              <Rule>Do thorough, quality work. If it&apos;s not clean, it&apos;s not done</Rule>
              <Rule>Follow the job details exactly as listed</Rule>
              <Rule>Leave the space better than you found it</Rule>
              <Rule>Never rush a job. Take the time to do it right</Rule>
              <Rule>Bring all your own cleaning supplies and equipment to every job</Rule>
            </ul>
          </div>
          <div>
            <SectionHeading>What We Don&apos;t Tolerate</SectionHeading>
            <ul className="space-y-2 mt-2">
              <Rule>Using the customer&apos;s products or supplies, ever (see Products section)</Rule>
              <Rule>Arguing with customers</Rule>
              <Rule>Discussing pay, time, or schedule with customers</Rule>
              <Rule>Using your phone excessively during a job</Rule>
              <Rule>Bringing unauthorized people to a job site</Rule>
              <Rule>Taking anything from the customer&apos;s home</Rule>
            </ul>
          </div>
        </div>
      );

    case 'pay':
      return (
        <div className="space-y-4">
          <div><SectionHeading>How Pay Works</SectionHeading><P className="mt-1">You get paid after each job is completed. Admin handles all payments. You never collect money from the customer. No cash, no Zelle, no Venmo, nothing.</P></div>
          <div><SectionHeading>Pay Schedule</SectionHeading><P className="mt-1">Tuesdays and Fridays at 9 PM. Job completed Monday = paid Tuesday. Job completed Wednesday = paid Friday.</P></div>
          <div><SectionHeading>Your Pay Amount</SectionHeading><P className="mt-1">Listed on each job in BookingKoala before you accept it. If a job runs longer because the place was dirtier than quoted, let admin know. Your pay will be adjusted for the extra work.</P></div>

          <div className={cn('border-t pt-4', t ? 'border-white/10' : 'border-gray-200')}>
            <SectionHeading>Bonuses</SectionHeading>
            <P className="mt-1">We reward great work.</P>
            <InfoBox className="mt-2">
              <div className="grid grid-cols-[1fr_auto] gap-y-2 gap-x-4 text-sm">
                <span>Before/after photos submitted</span><span className="text-emerald-500 font-semibold">+$5</span>
                <span>Customer leaves a Google review</span><span className="text-emerald-500 font-semibold">+$5</span>
                <span>Customer uses NFC card to leave review</span><span className="text-emerald-500 font-semibold">+$5</span>
                <span>Tips from customers</span><span className="text-emerald-500 font-semibold">100% yours</span>
              </div>
            </InfoBox>
          </div>

          <div><SectionHeading>Photo Bonus ($5)</SectionHeading><P className="mt-1">Take a few quick before/after photos of the main areas (kitchen, bathroom) and send them to admin after the job. This helps us verify quality and handle any disputes. Photos are optional but earn you $5 per job.</P></div>
          <div><SectionHeading>Review Bonus ($5)</SectionHeading><P className="mt-1">When a customer leaves a positive Google review after your clean, you earn $5. You don&apos;t need to ask the customer for a review. Admin handles that. Just do great work and the reviews follow.</P></div>
          <div><SectionHeading>Tips</SectionHeading><P className="mt-1">If a customer tips you, it&apos;s 100% yours. Never ask for tips, but if offered, accept graciously.</P></div>
          <div><SectionHeading>More Jobs = More Money</SectionHeading><P className="mt-1">Cleaners who are reliable, thorough, and get positive feedback get access to more jobs, higher-paying deep cleans and move-outs, and recurring clients with consistent weekly/bi-weekly schedules.</P></div>
          <div><SectionHeading>Pay Reductions</SectionHeading><P className="mt-1">Pay may be reduced for late arrival without notice, incomplete work, or customer complaints. Admin will always discuss it with you first.</P></div>
          <Callout variant="danger" title="Never discuss pay with customers">If asked: &quot;Our office handles all of that.&quot;</Callout>
        </div>
      );

    case 'trial':
      return (
        <div className="space-y-4">
          <Pb>Every new cleaner starts with a trial period. This is how we make sure you&apos;re a good fit and how you get comfortable with how we operate.</Pb>
          <div>
            <SectionHeading>During Trial (First 3-5 Jobs)</SectionHeading>
            <ul className="space-y-1.5 mt-1"><Li>Admin assigns jobs to you directly (you don&apos;t pick your own yet)</Li><Li>You&apos;ll start with standard cleans, then move to deep/move-out based on performance</Li><Li>You get paid after each job (same pay rules as everyone else)</Li><Li>After each job, we check in with the customer for feedback</Li></ul>
          </div>
          <div><SectionHeading>After You Pass</SectionHeading><P className="mt-1">You get access to self-assign jobs from our calendar based on your own availability. The more reliable and consistent you are, the more jobs you&apos;ll have access to, including higher-paying recurring clients.</P></div>
          <div>
            <SectionHeading>What We&apos;re Evaluating</SectionHeading>
            <ul className="space-y-1.5 mt-1"><Li>Consistent quality across every room</Li><Li>On-time arrival</Li><Li>Following job details and special instructions</Li><Li>Good communication with admin</Li><Li>Positive customer feedback</Li></ul>
          </div>
        </div>
      );

    case 'getting-started':
      return (
        <div className="space-y-4">
          <div><SectionHeading>BookingKoala Setup</SectionHeading><P className="mt-1">Ask admin to add you to BookingKoala. You&apos;ll get a login link and access to the dashboard where you see job details, addresses, service types, and special instructions.</P></div>
          <div>
            <SectionHeading>Before Your First Job</SectionHeading>
            <Checklist items={['BookingKoala account set up and working', 'You\'ve purchased your cleaning supplies (see Products section)', 'You have a vacuum and mop ready', 'You have reliable transportation', 'You understand standard, deep, and move-out cleans', `Admin contact saved: ${PHONE}`, 'You have your NFC review card from admin', 'You have referral cards (10+) from admin', 'You have door hangers (15+) from admin', 'You know the before/after photo procedure', 'You\'ve read this entire manual']} />
          </div>
        </div>
      );

    case 'dress':
      return (
        <div className="space-y-4">
          <Pb>You&apos;re entering someone&apos;s home. How you present yourself matters.</Pb>
          <div>
            <SectionHeading>Required</SectionHeading>
            <ul className="space-y-1.5 mt-1"><Li>Clean, presentable clothing</Li><Li>Closed-toe shoes</Li><Li>No strong perfume or cologne</Li><Li>Hair tied back if long</Li></ul>
          </div>
          <div><SectionHeading>Branded Apparel</SectionHeading><P className="mt-1">We provide a branded t-shirt, hoodie, or jacket at no cost. To request one, text or call us at <span className={cn('font-mono text-xs', headClass)}>{PHONE}</span> with your size and shipping address. Until you receive it, attend in regular professional cleaning attire.</P></div>
        </div>
      );

    case 'products':
      return (
        <div className="space-y-4">
          <Callout variant="danger" title="You are responsible for purchasing and bringing your own cleaning supplies and equipment to every job" />

          <div>
            <SectionHeading>What You Need</SectionHeading>
            <P className="mt-1">You are expected to have and bring to every job:</P>
            <ul className="space-y-1.5 mt-2"><Li>All-purpose cleaner, glass cleaner, bathroom cleaner</Li><Li>Microfiber cloths, sponges, scrub brushes</Li><Li>Mop and bucket</Li><Li>Vacuum (when the job requires it)</Li><Li>Trash bags, rubber gloves</Li></ul>
            <P className="mt-2">Showing up without your supplies is not acceptable. If you can&apos;t complete a job because you forgot equipment, that&apos;s on you.</P>
          </div>

          <div>
            <SectionHeading>Recommended Products</SectionHeading>
            <P className="mt-1">You can use any professional cleaning products you prefer, but they must be effective and safe. Here are recommendations:</P>
            <InfoBox className="mt-2 !space-y-3">
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>All-Purpose</p>
                <p className="text-sm">Fabuloso, Pine-Sol, or Mrs. Meyer&apos;s Multi-Surface. Dilute per label.</p>
              </div>
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>Glass & Mirrors</p>
                <p className="text-sm">Windex, Sprayway Glass Cleaner, or any ammonia-free glass cleaner.</p>
              </div>
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>Bathroom</p>
                <p className="text-sm">Scrubbing Bubbles, Lysol Bathroom Cleaner, or Kaboom. For heavy buildup, Bar Keepers Friend (powder).</p>
              </div>
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>Kitchen / Degreaser</p>
                <p className="text-sm">Krud Kutter, Easy-Off (for ovens), or Dawn dish soap for general degreasing.</p>
              </div>
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>Floors</p>
                <p className="text-sm">Bona (hardwood), Fabuloso or Pine-Sol (tile/vinyl), Swiffer WetJet pads as backup.</p>
              </div>
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>Sensitive Surfaces</p>
                <p className="text-sm">Method Daily Granite or StoneTech cleaner for marble/granite. pH-neutral only. Never acidic or abrasive on stone.</p>
              </div>
              <div>
                <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', t ? 'text-white/50' : 'text-gray-400')}>Disinfectant</p>
                <p className="text-sm">Lysol Disinfectant Spray or Clorox wipes for high-touch surfaces (handles, switches, remotes).</p>
              </div>
            </InfoBox>
            <Callout variant="warning" title="Eco-friendly & pet-safe preferred">
              We tell customers our team uses eco-friendly, pet-safe products. Choose non-toxic options when possible (Mrs. Meyer&apos;s, Method, Seventh Generation). Avoid harsh bleach in customer-occupied homes unless specifically needed for mold/mildew.
            </Callout>
          </div>

          <div>
            <SectionHeading>Equipment</SectionHeading>
            <InfoBox className="mt-1 !space-y-2">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                <span className={cn('font-medium', headClass)}>Vacuum</span><span>Upright or canister with attachments. Cordless stick vacuums (Dyson, Shark) work well for portability.</span>
                <span className={cn('font-medium', headClass)}>Mop</span><span>Spray mop (O-Cedar, Rubbermaid) or traditional bucket mop. Microfiber heads preferred.</span>
                <span className={cn('font-medium', headClass)}>Cloths</span><span>At least 10-15 microfiber cloths per job. Color-code: one color for bathrooms, another for kitchen, another for general.</span>
                <span className={cn('font-medium', headClass)}>Scrub brushes</span><span>Grout brush, general scrub brush, detail brush for fixtures.</span>
                <span className={cn('font-medium', headClass)}>Caddy</span><span>Carry caddy or cleaning bag to keep everything organized and portable.</span>
                <span className={cn('font-medium', headClass)}>Gloves</span><span>Rubber or nitrile gloves. Replace regularly.</span>
                <span className={cn('font-medium', headClass)}>Trash bags</span><span>Standard kitchen bags. Bring extra.</span>
              </div>
            </InfoBox>
          </div>

          <Callout variant="danger" title="NEVER use the customer's products. This is non-negotiable.">
            We have had situations where a cleaner used a product they found in a customer&apos;s home and it caused permanent damage to surfaces. When you use a customer&apos;s product, we cannot control the outcome. We don&apos;t know what&apos;s in it, whether it&apos;s safe for the surface, or whether it&apos;s even a cleaning product. The liability falls on us and it has cost us thousands of dollars. If a customer offers their product, politely decline: &quot;Thank you, but I use my own professional products to make sure everything is safe for your surfaces.&quot; If they push back, message admin.
          </Callout>

          <div>
            <SectionHeading>Sensitive Surfaces</SectionHeading>
            <P className="mt-1">Many homes have marble, granite, natural stone, specialty tile, or other delicate finishes. Using the wrong product on these can cause permanent staining, etching, or discoloration.</P>
            <ul className="space-y-1.5 mt-2"><Li>Check job notes for surface warnings before you start</Li><Li>If you see marble, stone, or any surface you&apos;re not sure about, message admin before cleaning it</Li><Li>Never use acidic or abrasive cleaners on stone</Li><Li>When in doubt, use water and a microfiber cloth until you confirm with admin</Li></ul>
          </div>
        </div>
      );

    case 'services':
      return (
        <div className="space-y-5">
          <Pb>Every job lists the service type. Know exactly what each one includes so you deliver what the customer paid for.</Pb>
          <div>
            <SectionHeading>Standard Clean</SectionHeading>
            <P className="mt-1">Routine maintenance cleaning.</P>
            <InfoBox className="mt-2"><p>All bedrooms: dust, vacuum/mop, make beds if sheets are available</p><p>All bathrooms: clean toilet, sink, mirror, tub/shower, mop floor</p><p>Kitchen: wipe counters, clean sink, wipe exterior of appliances, mop floor</p><p>Common areas: dust surfaces, vacuum/mop, wipe down tables and shelves</p><p>Take out trash if bags are available</p></InfoBox>
          </div>
          <div>
            <SectionHeading>Deep Clean</SectionHeading>
            <P className="mt-1">Everything in standard, plus detail work.</P>
            <InfoBox className="mt-2"><p>Everything in standard, plus:</p><p>Baseboards: wipe down throughout</p><p>Door frames and light switches</p><p>Windowsills</p><p>Tile and grout: scrub bathrooms and kitchen</p><p>Ceiling fans, vents, tops of door frames</p><p>Wall stain spot-cleaning</p></InfoBox>
            <p className={cn('text-xs mt-2 font-medium', amberClass)}>Baseboards, windowsills, door frames, wall stains, and tile/grout are included in deep clean. These are NOT separate add-ons.</p>
          </div>
          <div>
            <SectionHeading>Move In/Out Clean</SectionHeading>
            <P className="mt-1">The most thorough clean we offer.</P>
            <InfoBox className="mt-2"><p>Everything in deep clean, plus:</p><p>Inside all cabinets, closets, and drawers</p><p>Inside windows</p><p>Inside fridge, oven, and microwave (when included)</p><p>Wall scuffs and marks</p></InfoBox>
          </div>
          <div>
            <SectionHeading>Add-Ons</SectionHeading>
            <P className="mt-1">Some jobs have add-ons listed. Only clean what&apos;s listed. Don&apos;t skip add-ons, and don&apos;t do extras that aren&apos;t listed.</P>
            <div className={cn('grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm', textClass)}>
              <span>Inside fridge</span><span>Inside oven</span>
              <span>Microwave</span><span>Interior windows</span>
              <span>Laundry (wash/dry/fold)</span><span>Organizing</span>
              <span>Hardwood care</span><span>Carpet cleaning</span>
              <span>Basement cleaning</span><span>Pet cleaning</span>
              <span>Washer &amp; dryer</span><span>Dishwasher</span>
              <span>Kitchen cabinets</span><span>Window blinds</span>
              <span>Stairway cleaning</span><span>Office area</span>
            </div>
            <P className="mt-3">If a customer asks you to do something not on the job, say: <span className={cn('italic', t ? 'text-white/80' : 'text-gray-700')}>&quot;Let me check with our office to make sure we can add that on.&quot;</span> Then message admin.</P>
          </div>
        </div>
      );

    case 'standards':
      return (
        <div className="space-y-4">
          <Pb>If you wouldn&apos;t be satisfied with it in your own home, it&apos;s not done.</Pb>
          <div><SectionHeading>Bathrooms</SectionHeading><ul className="space-y-1 mt-1"><Li>Toilet inside and out, including base and behind</Li><Li>Sink and faucet free of spots</Li><Li>Mirror streak-free</Li><Li>Shower/tub walls and door, no soap buildup</Li><Li>Floor mopped, corners included</Li><Li>Trash emptied</Li></ul></div>
          <div><SectionHeading>Kitchen</SectionHeading><ul className="space-y-1 mt-1"><Li>Counters and backsplash wiped</Li><Li>Sink clean, faucet polished</Li><Li>Stovetop cleaned (exterior unless add-on)</Li><Li>Exterior of all appliances wiped</Li><Li>Floor mopped</Li></ul></div>
          <div><SectionHeading>Bedrooms & Living Areas</SectionHeading><ul className="space-y-1 mt-1"><Li>All surfaces dusted</Li><Li>Floors vacuumed and/or mopped</Li><Li>Under furniture edges where visible</Li><Li>Beds made if sheets are out</Li></ul></div>
          <div><SectionHeading>Before You Leave: Final Walkthrough</SectionHeading><Checklist items={['Every room checked', 'All surfaces dusted and wiped', 'All floors vacuumed/mopped', 'Bathrooms and kitchen fully done', 'Add-ons completed', 'Trash taken out', 'Doors locked (if customer isn\'t home)', 'Lights off, everything as you found it']} /></div>
        </div>
      );

    case 'arrival':
      return (
        <div className="space-y-4">
          <div><SectionHeading>Be On Time</SectionHeading><P className="mt-1">If you&apos;re going to be more than 5 minutes late, message admin immediately. They need to notify the customer before the scheduled time, not after.</P></div>
          <div><SectionHeading>Entry Instructions</SectionHeading><P className="mt-1">Every job has entry instructions in BookingKoala. Read them before you leave. If unclear, message admin. Do not call the customer directly unless told to.</P></div>
          <div><SectionHeading>Can&apos;t Get In</SectionHeading><P className="mt-1">Message admin right away. Wait 15 minutes, try again. After 30 minutes, leave.</P></div>
          <div><SectionHeading>Locking Up</SectionHeading><P className="mt-1">If the customer isn&apos;t home, lock the door behind you. If there&apos;s a lockbox, return the key and scramble the code. Double-check.</P></div>
        </div>
      );

    case 'afterclean':
      return (
        <div className="space-y-4">
          <Pb>Once you&apos;ve finished and done your walkthrough, complete these steps before leaving:</Pb>

          <div>
            <SectionHeading>1. Before/After Photos (+$5)</SectionHeading>
            <P className="mt-1">Take before/after photos and send them to admin. This is expected for every job.</P>
            <InfoBox className="mt-2">
              <p className={cn('text-xs font-semibold uppercase tracking-wide mb-2', t ? 'text-white/50' : 'text-gray-400')}>Required photos</p>
              <ul className="space-y-1">
                <Li>Kitchen (counter + sink area) -- before and after</Li>
                <Li>Bathroom (toilet + shower/tub area) -- before and after</Li>
                <Li>One &quot;wow&quot; shot if applicable (oven clean, grout transformation, etc.)</Li>
              </ul>
            </InfoBox>
            <P className="mt-2">Take the &quot;before&quot; photos when you first arrive, before you start cleaning. Take the &quot;after&quot; photos from the same angle when you finish. Good lighting (open blinds, turn on lights). No personal items or identifying info visible.</P>
          </div>

          <div>
            <SectionHeading>2. Offer the NFC Review Card</SectionHeading>
            <P className="mt-1">If the customer is home and seems happy, offer your NFC card:</P>
            <InfoBox>
              <p className="italic">&quot;If you&apos;re happy with the clean, you can tap your phone right here to leave us a quick review. It takes 30 seconds and it really helps us out.&quot;</p>
            </InfoBox>
            <P className="mt-2">If they say no or seem busy, don&apos;t push it. Just smile and move on.</P>
          </div>

          <div>
            <SectionHeading>3. Leave Referral Cards</SectionHeading>
            <P className="mt-1">Place 1-2 referral cards on the kitchen counter or near the front door. These are small cards that say &quot;$25 off for your friend, $25 credit for you.&quot; Just set them down -- you don&apos;t need to mention them.</P>
          </div>

          <div>
            <SectionHeading>4. Distribute Door Hangers</SectionHeading>
            <P className="mt-1">If the job is in a house or townhouse, hang door hangers on the 3-5 nearest neighbor doors as you leave. In apartment buildings, you can leave a few in the lobby area if allowed.</P>
            <P className="mt-2">Do not leave hangers in buildings with &quot;no solicitation&quot; signs. If a doorman says not to, respect it.</P>
          </div>

          <div>
            <SectionHeading>5. Mark Complete in BookingKoala</SectionHeading>
            <P className="mt-1">Do this before you leave the property. Admin uses this to trigger the customer check-in.</P>
          </div>

          <div>
            <SectionHeading>6. Note Any Issues</SectionHeading>
            <P className="mt-1">If anything was unusual (couldn&apos;t access a room, pre-existing damage, needed extra time, pet issues), message admin with details.</P>
          </div>

          <div>
            <SectionHeading>7. Lock Up</SectionHeading>
            <P className="mt-1">Confirm the door is locked, key returned (if applicable), and the space is secured.</P>
          </div>

          <Callout variant="info" title="What happens next">After you mark the job complete, admin sends the customer a check-in, then a review ask, then a referral offer. The referral cards you left behind reinforce the referral offer. The NFC tap you offered makes the review frictionless. Great work on your end directly leads to more jobs, bonuses, and a stronger business.</Callout>
        </div>
      );

    case 'materials':
      return (
        <div className="space-y-5">
          <P>You carry three types of marketing materials with you to every job. These help the business grow, which means more jobs and better pay for you.</P>

          <div>
            <SectionHeading>NFC Review Card</SectionHeading>
            <P className="mt-1">A small card or stand you carry. When a customer taps their phone on it, it opens the Google review page instantly. Offer it at the end of every job where the customer is present and happy.</P>
            <ul className="space-y-1.5 mt-2">
              <Rule>Keep it in your cleaning caddy or bag -- easy to grab</Rule>
              <Rule>Only offer after the clean is done, never during</Rule>
              <Rule>If the customer declines, just move on</Rule>
              <Rule>If you lose it, tell admin immediately for a replacement</Rule>
            </ul>
          </div>

          <div>
            <SectionHeading>Referral Cards</SectionHeading>
            <P className="mt-1">Small cards with the referral offer ($25 off for the friend, $25 credit for the customer). Leave 1-2 on the kitchen counter or by the front door after every job. You don&apos;t need to hand them to the customer or explain them -- just set them down.</P>
            <P className="mt-2">In apartment buildings, you can also leave a card with the doorman or concierge. They talk to residents all day and often get asked for cleaning recommendations.</P>
          </div>

          <div>
            <SectionHeading>Door Hangers</SectionHeading>
            <P className="mt-1">After every job in a house or townhouse, hang these on the 3-5 nearest neighbor doors as you leave. The hanger says &quot;Your neighbor just had their home cleaned by Brooklyn Maids&quot; with a discount offer.</P>
            <ul className="space-y-1.5 mt-2">
              <Rule>Houses/townhouses: hang on doorknobs of nearby homes</Rule>
              <Rule>Apartments: leave a few in the lobby if the building allows it</Rule>
              <Rule>Never leave hangers where there are &quot;no solicitation&quot; signs</Rule>
              <Rule>If a doorman or building manager says no, respect it</Rule>
            </ul>
          </div>

          <div>
            <SectionHeading>Keeping Stocked</SectionHeading>
            <P className="mt-1">You should have at least 10 referral cards and 10-15 door hangers before each day of jobs. If you&apos;re running low, let admin know and they&apos;ll restock you.</P>
          </div>

          <Callout variant="success" title="Why this matters to you">Every referral that books is a new job for someone on our team. Every good review improves our Google ranking, which brings in more customers, which means more work. The 5 minutes you spend distributing materials after a job directly leads to more earning opportunities for everyone.</Callout>
        </div>
      );

    case 'issues':
      return (
        <div className="space-y-4">
          <div><SectionHeading>Dirtier Than Expected</SectionHeading><P className="mt-1"><span className={cn('font-medium', headClass)}>Significantly dirtier</span> (needs a deep clean, not standard): message admin BEFORE starting extra work. Admin will contact the customer about upgrading.</P><P className="mt-1"><span className={cn('font-medium', headClass)}>A bit messier</span> (30-60 extra min): do the full job without contacting the customer. Let admin know after and your pay will be adjusted.</P></div>
          <div><SectionHeading>Pre-Existing Damage</SectionHeading><P className="mt-1">Notice something broken when you arrive? Take a photo and message admin immediately. This protects you.</P></div>
          <div><SectionHeading>Accidental Damage</SectionHeading><P className="mt-1">Do NOT hide it. Take a photo, message admin, be honest. We are fully insured. Concealing damage = immediate removal.</P></div>
          <div><SectionHeading>Customer Asks for Extra Work</SectionHeading><P className="mt-1">Say: <span className={cn('italic', t ? 'text-white/80' : 'text-gray-700')}>&quot;Let me check with our office to make sure we can add that on.&quot;</span> Then message admin.</P></div>
          <div><SectionHeading>Unsafe Situation</SectionHeading><P className="mt-1">If you feel unsafe, leave immediately. Message admin. You will never be penalized.</P></div>
        </div>
      );

    case 'communication':
      return (
        <div className="space-y-4">
          <Pb>Admin handles all customer communication: pricing, scheduling, complaints, follow-ups. You only communicate about what&apos;s happening during the job itself.</Pb>
          <div><SectionHeading>With Customers</SectionHeading><ul className="space-y-2 mt-2"><Rule>Be polite and professional</Rule><Rule>Never discuss pricing, pay, or how long the job takes</Rule><Rule>Never discuss other customers or jobs</Rule><Rule>If they ask about scheduling, pricing, or anything business-related: <span className={cn('italic', t ? 'text-white/80' : 'text-gray-700')}>&quot;I&apos;d recommend reaching out to our office, they can help with that.&quot;</span></Rule><Rule>If they have a complaint during the clean, listen politely and message admin</Rule></ul></div>
          <div><SectionHeading>With Admin</SectionHeading><P className="mt-1">Notify admin when:</P><ul className="space-y-1 mt-2"><Li>You&apos;re running late</Li><Li>You can&apos;t get in</Li><Li>Something is damaged (pre-existing or accidental)</Li><Li>The place is significantly dirtier than expected</Li><Li>Pets that weren&apos;t mentioned</Li><Li>Anything unusual or concerning</Li><Li>You need to cancel or can&apos;t make a job</Li></ul></div>
          <Callout variant="warning" title="Respond to admin messages">When admin sends you a job or asks you to confirm, respond promptly. No response = no job.</Callout>
        </div>
      );

    case 'bookingkoala':
      return (
        <div className="space-y-4">
          <div><SectionHeading>Before Each Job</SectionHeading><ul className="space-y-1 mt-1"><Li>Service type (standard, deep, move-out)</Li><Li>Add-ons</Li><Li>Address and entry instructions</Li><Li>Special notes (pets, surfaces, rooms to skip)</Li><Li>Scheduled time</Li></ul></div>
          <div><SectionHeading>After Each Job</SectionHeading><P className="mt-1">Mark complete in BookingKoala. Note any issues.</P></div>
          <div><SectionHeading>Self-Assigning (After Trial)</SectionHeading><P className="mt-1">Once you pass the trial, you can see available jobs on the calendar and assign yourself. Only take jobs you can commit to. Assigning yourself a job and then cancelling affects your reliability and the customer&apos;s experience.</P></div>
        </div>
      );

    case 'recurring':
      return (
        <div className="space-y-4">
          <Pb>Recurring customers are the backbone of the business. They book weekly, bi-weekly, or monthly and expect consistency.</Pb>
          <div><SectionHeading>Same Cleaner</SectionHeading><P className="mt-1">If a customer is happy with you, they keep you at the same rate. This is good for both of you. They get consistency, you get guaranteed regular work.</P></div>
          <div><SectionHeading>What Recurring Clients Expect</SectionHeading><ul className="space-y-1.5 mt-1"><Li>The same level of quality every visit</Li><Li>That you remember their preferences (shoes off, certain rooms first, pet areas)</Li><Li>That you show up on time, every time</Li></ul></div>
          <Callout variant="success" title="Priority access">Reliable cleaners who keep recurring clients happy get priority access to the best-paying, most consistent jobs. Losing a recurring client because of quality issues or no-shows is the quickest way to lose access to those jobs.</Callout>
        </div>
      );

    case 'policies':
      return (
        <div className="space-y-4">
          <div><SectionHeading>Cancellations</SectionHeading><P className="mt-1">Notify admin as soon as possible, ideally 24+ hours ahead. Frequent last-minute cancellations reduce jobs offered.</P></div>
          <div><SectionHeading>No-Shows</SectionHeading><P className="mt-1">Three no-shows = removal. No exceptions.</P></div>
          <div>
            <SectionHeading>Quality Strikes</SectionHeading>
            <ul className="space-y-1 mt-1"><Li>First issue: discussion and feedback</Li><Li>Second issue: written warning</Li><Li>Third issue: removal</Li></ul>
          </div>
          <div><SectionHeading>Immediate Removal</SectionHeading><P className="mt-1">Using customer products, concealing damage, theft, harassment, or bringing unauthorized people.</P></div>
          <div className={cn('border-t pt-4', t ? 'border-white/10' : 'border-gray-200')}>
            <SectionHeading>What Sets Great Cleaners Apart</SectionHeading>
            <ul className="space-y-1 mt-1"><Li>Reliable: show up on time, don&apos;t cancel</Li><Li>Thorough: don&apos;t cut corners</Li><Li>Communicative: if something is off, they tell admin</Li><Li>Consistent: recurring clients get the same quality every visit</Li></ul>
            <P className="mt-2">Those cleaners get the most jobs, the highest-paying jobs, priority recurring clients, and bonus opportunities.</P>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function CrewClient() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crew_auth');
      if (stored === PASSWORD) setAuthed(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      localStorage.setItem('crew_auth', pw);
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!authed) {
    return (
      <ThemeProvider storageKey="crew_theme">
        <LoginScreen pw={pw} setPw={setPw} error={error} setError={setError} onSubmit={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider storageKey="crew_theme">
      <CrewContent />
    </ThemeProvider>
  );
}

function LoginScreen({ pw, setPw, error, setError, onSubmit }: { pw: string; setPw: (v: string) => void; error: boolean; setError: (v: boolean) => void; onSubmit: (e: React.FormEvent) => void }) {
  const { theme } = useTheme();
  return (
    <div className={cn('min-h-screen flex items-center justify-center px-4', theme === 'dark' ? 'bg-[#0d1520]' : 'bg-gray-50')}>
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <h1 className={cn('text-xl font-semibold mb-2 text-center', theme === 'dark' ? 'text-white' : 'text-gray-900')}>{BRAND}</h1>
        <p className={cn('text-sm text-center mb-6', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>Crew Access</p>
        <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setError(false); }} placeholder="Enter password" autoFocus
          className={cn('w-full px-4 py-3 rounded-lg mb-3 focus:outline-none transition-colors', theme === 'dark' ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-white/40' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400')} />
        {error && <p className="text-red-400 text-sm mb-3">Wrong password</p>}
        <button type="submit" className={cn('w-full py-3 font-semibold rounded-lg transition-colors', theme === 'dark' ? 'bg-white text-[#0d1520] hover:bg-white/90' : 'bg-gray-900 text-white hover:bg-gray-800')}>Enter</button>
      </form>
    </div>
  );
}

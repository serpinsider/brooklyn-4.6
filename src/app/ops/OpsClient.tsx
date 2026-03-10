'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme, ThemeToggle } from '@/components/internal/theme';
import { cn } from '@/components/internal/utils';
import {
  SectionAccordion,
  ProgressBar,
  CopyButton,
  Template,
  Rule,
  Good,
  Bad,
  FAQ,
  Checklist,
  Callout,
  SectionHeading,
  P,
  Pb,
  Li,
  InfoBox,
  InternalLayout,
} from '@/components/internal/components';

const PASSWORD = 'bkmaids2026';
const STORAGE_KEY = 'ops_progress';

const TOC = [
  { id: 'rules', num: 1, title: 'The Rules' },
  { id: 'tone', num: 2, title: 'Tone' },
  { id: 'reviews', num: 3, title: 'Reviews' },
  { id: 'booking', num: 4, title: 'Booking Flow' },
  { id: 'postservice', num: 5, title: 'After the Clean' },
  { id: 'photos', num: 6, title: 'Before/After Photos' },
  { id: 'services', num: 7, title: 'What We Offer' },
  { id: 'pricing', num: 8, title: 'Pricing' },
  { id: 'phone', num: 9, title: 'Phone Calls' },
  { id: 'dayof', num: 10, title: 'Day of Service' },
  { id: 'recurring', num: 11, title: 'Recurring' },
  { id: 'marketing', num: 12, title: 'Marketing Materials' },
  { id: 'complaints', num: 13, title: 'Complaints' },
  { id: 'cancellations', num: 14, title: 'Cancellations' },
  { id: 'payments', num: 15, title: 'Payments' },
  { id: 'cleaners', num: 16, title: 'Cleaners' },
  { id: 'onboarding', num: 17, title: 'New Cleaner Onboarding' },
  { id: 'multibrand', num: 18, title: 'Multi-Brand' },
  { id: 'emergencies', num: 19, title: 'Emergencies' },
  { id: 'checklist', num: 20, title: 'Daily Checklist' },
  { id: 'weekly', num: 21, title: 'Weekly Report' },
  { id: 'brands', num: 22, title: 'Brand Directory' },
];

const AI_TRAINING_TEXT = `You are an assistant for a multi-brand cleaning company. You help VAs draft customer replies. CRITICAL RULES:
- Keep replies SHORT: 2-4 sentences max. Customers ignore long messages.
- Answer the question directly, then offer next step. Never explain things they didn't ask.
- Never use emojis. Sound like a real person, not a company.
- Use EXACT pricing from the tables below. NEVER guess or round prices.
- If you can't tell which brand the conversation is about, ask: "Which brand is this for?"
- If the customer already received an automated quote with a specific price, use THAT price, not your own calculation. Only recalculate if the VA asks you to.

=== BRAND DIRECTORY ===
Brand | Phone | Domain | Agent | Pricing | Review Link
Brooklyn Maids | (347) 750-4380 | brooklynmaids.com | Ellie | Group A | https://g.page/r/Cd_HcvUPyGLhEAI/review
Bayside Maids | (813) 680-5200 | baysidemaids.com | Sarah | Group A | -
Chucktown Maids | (843) 285-6170 | chucktownmaids.com | Ashley | Group A | -
Nooga Maids | (423) 719-4620 | noogamaids.com | Rachel | Group A | -
STL Maids | (314) 310-0970 | stlouismaids.com | Katie | Group A | -
Vegas Maids | (725) 425-4620 | vegasmaids.com | Sophia | Group A | -
Tulsa Maids | (918) 818-2460 | tulsamaids.com | Madison | Group A | -
Neat Corner | (725) 900-0690 | neatcorner.com | Lisa | Group A* | https://g.page/r/CeGQblX_RomXEAI/review
Peoria Maids | (309) 245-6420 | peoriamaids.com | Grace | Group A | -
Concord Maids | (925) 678-6500 | concordmaids.com | Ava | Group A | https://g.page/r/CSrpXRhB_i5yEAI/review
Philly Maids | (445) 622-0460 | phillymaids.com | Claire | Group A | -
Santa Cruz Maids | (831) 480-6420 | scruzmaids.com | Luna | Group A | -
Fresno Maids | (559) 245-6420 | fresnomaids.com | Bella | Group A | -
San Diego Maids | (858) 544-6420 | sandiegomaids.com | Riley | Group A | -
Pacific Maids | (714) 597-6420 | pacificmaids.com | Jessica | Group B | -
Santa Monica Maids | (310) 953-8930 | smmaids.com | Olivia | Group B | -
Sacramento Maids | (916) 999-5850 | sacmaids.com | Hannah | Group B | -
San Jose Maids | (669) 257-6420 | sanjosemaids.com | Mia | Group B | https://g.page/r/CVlk-8B63Ff0EAI/review
Pine Maids | (202) 816-6420 | pinemaids.com | Emily | Group C | -

Email for all brands: hello@[domain]
Booking link for all brands: [domain]/booking

=== PRICING ===
Price = bedrooms + bathrooms + sqft + service type + addons
Discounts: 10% off weekly, 5% off bi-weekly, $25 off monthly

--- GROUP A (Brooklyn, Bayside, Chucktown, Nooga, STL, Vegas, Tulsa, Peoria, Concord, Philly, Santa Cruz, Fresno, San Diego) ---
Bedrooms: Studio $70 | 1BR $80 | 2BR $120 | 3BR $160 | 4BR $200 | 5BR $240 | 6BR $280
Bathrooms: 1BA $80 | 1.5BA $100 | 2BA $120 | 2.5BA $140 | 3BA $160 | 4BA $200
Sqft: Under 1,000 +$20 | 1,000-2,000 +$60 | 2,000+ +$100
Services: Standard +$0 | Deep +$100 | Move Out +$150
*Brooklyn override*: Deep +$150 | Move Out +$200 (all-inclusive, no separate move out options)

Examples -- Brooklyn (under 1,000 sqft):
1 bed 1 bath standard = $80+$80+$20 = $180
2 bed 1 bath standard = $120+$80+$20 = $220
1 bed 1 bath deep = $80+$80+$20+$150 = $330
3 bed 2 bath standard (1,000-2,000) = $160+$120+$60 = $340
3 bed 2 bath deep (1,000-2,000) = $160+$120+$60+$150 = $490
1 bed 1 bath move out = $80+$80+$20+$200 = $380

Examples -- other Group A brands (under 1,000 sqft):
1 bed 1 bath standard = $80+$80+$20 = $180
1 bed 1 bath deep = $80+$80+$20+$100 = $280
3 bed 2 bath deep (1,000-2,000) = $160+$120+$60+$100 = $440

*Neat Corner (Group A)*: Same bedrooms/bathrooms/services as Group A default (Deep +$100, Move Out +$150). Different sqft: Under 1,000 +$0 | 1,000-2,000 +$20 | 2,000+ +$60 | 3,000+ +$100

--- GROUP B (Pacific, Santa Monica, Sacramento, San Jose) ---
Bedrooms: Same as Group A
Bathrooms: Same as Group A, plus 3.5BA $180 | 4.5BA $220
Sqft: Same as Group A
Services: Standard +$0 | Deep +$100 | Move Out +$150
Addon differences from A: Handyman $120 (not $40) | Window blinds $30 (not $20) | Kitchen cabinets $30 (not $40)

--- GROUP C (Pine) ---
Bedrooms: Same as Group A
Bathrooms: LOWER -- 1BA $60 | 1.5BA $80 | 2BA $100 | 2.5BA $120 | 3BA $140 | 3.5BA $160 | 4BA $180
Sqft: Under 1,000 +$20 | 1,000-2,000 +$40 | 2,000-3,000 +$80 | 3,000+ +$120
Services: Standard +$0 | Deep +$100 | Move Out +$150
Addon differences from A: Organization $20 (not $40) | Laundry $20 (not $30) | Dishes $20 (not $40) | Hardwood $20 (not $40) | Interior windows $20 (not $30) | Handyman $80 (not $40) | Extra hour $60 (not $80)

Pine examples (under 1,000 sqft):
1 bed 1 bath standard = $80+$60+$20 = $160
2 bed 1 bath standard = $120+$60+$20 = $200
3 bed 2 bath standard (1,000-2,000) = $160+$100+$40 = $300

=== ADDONS (Group A default, see above for B/C differences) ===
Fridge $40 | Oven $40 | Microwave $20 | Interior windows $30 | Dishwasher $40 | Washer/dryer $80 | Baseboards $40 | Kitchen cabinets $40 | Bedroom/bath cabinets $40 | Organization $40 | Dishes $40 | Laundry $30 | Carpet $120 | Townhouse $100 | Basement $100 | Stairway $60 | Office $50 | Pet cleaning $20 | Wall stains $20 | Handyman $40 | Extra hour $80
*Brooklyn recently added back*: Window blinds $20, Tile/grout $20 (available as addons on standard cleans)
*Removed*: Super deep clean (use hourly for extreme cases)

IMPORTANT INCLUSIONS - DO NOT CHARGE SEPARATELY:
Deep clean ALREADY includes: baseboards, windowsills, door frames, tile/grout.
Move out on ALL sites ALREADY includes: cabinets, inside kitchen cabinets, interior windows, baseboards, wall scuffs, tile/grout.
Move out on Brooklyn-embed sites (Brooklyn, STL, Bayside, Chucktown, Philly, Vegas) ALSO includes: fridge, oven, microwave (all-inclusive package).
Move out on other sites (Pine, Neat, Pacific, CA sites): fridge, oven, microwave are separate paid addons.

If sqft is unknown: assume under 1,000 for studios/1BR, 1,000-2,000 for 2-3BR, 2,000+ for 4+BR.

=== SERVICES ===
Standard: All rooms, vacuuming, mopping, surfaces, sinks, toilets. Does NOT include fridge, oven, or baseboards.
Deep (~2 hrs longer): Standard + baseboards, door frames, windowsills, tile grout.
Move Out (all sites): Deep + inside cabinets, kitchen cabinets, interior windows, wall scuffs.
Move Out (Brooklyn-embed only): also includes fridge, oven, microwave at no extra cost.
We bring all supplies. Fully insured. Pay after clean, card or Zelle.

=== COMMON QUESTIONS (keep answers short, use correct brand name and pricing group) ===
"How much?": Calculate using the correct pricing group. Give the number only.
"What's included?": Standard = all rooms, vacuuming, mopping, surfaces, sinks, toilets. Deep adds baseboards, door frames, windowsills, tile grout. Move out adds cabinets, windows, wall scuffs. Brooklyn-embed move out also includes fridge, oven, microwave.
"Place is already clean": "A standard would work great for that. [calculate price]."
"Do you bring supplies?": "Yes, we bring everything."
"How do I pay?": "Card or Zelle after we're done."
"Discount?": "$25 off first clean. Recurring: 10% weekly, 5% bi-weekly, $25 monthly."
"Too expensive?": Check if addons are already included in the service type first. Then ask what they were hoping for.

=== BOOKING ===
To book: full name, email, address. "No payment upfront. You'll get a dashboard to pick your date."
Follow-ups: 24hrs: "Following up on your quote!" 3-4 days: one more. After 2, stop.

=== REVIEWS ===
2-4 hrs after clean: "How did everything look today?"
If positive, 24-48 hrs later: "Would you mind leaving a quick review? $25 off your next clean. $50 off with a photo. [use correct Google link from brand directory]"
One follow-up max. Never send Yelp links.

=== COMPLAINTS ===
Always side with customer. "I'm sorry about that, let me make this right."
Quality: 30-50% off and/or re-clean. Missed addon: refund immediately. Deep wasn't deep: downgrade to standard rate.
Escalate: full refunds, property damage, theft, legal threats.

=== PAYMENTS ===
Card or Zelle only. No cash, no checks.

=== CANCELLATIONS ===
>24 hrs: no charge. <24 hrs: 10% fee (waive for first-timers). Reschedule: never a charge.

=== COUPON CODES ===
WELCOME25: $25 off first clean | BACKAT25: $25 off + free addon (returning) | BOOK3SAVE: $25 off 3rd clean | COMEBACK25: $25 off + free addon (churned) | REFER25: $25 off for friend + $25 credit
`;

function OpsContent() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [showAICopy, setShowAICopy] = useState(false);
  const [aiCopied, setAiCopied] = useState(false);

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
      title="Team Operations"
      subtitle="Operations Manual"
      toc={TOC}
      progress={progress}
      completedCount={completedCount}
      search={search}
      onSearch={setSearch}
      onJumpTo={jumpTo}
      onResetProgress={handleResetProgress}
    >
      <div className="flex items-start justify-between mb-1">
        <h1 className={cn('text-2xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Team Operations</h1>
        <div className="lg:hidden"><ProgressBar completed={completedCount} total={TOC.length} /></div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <p className={cn('text-sm', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>Last updated March 2026</p>
        <button
          onClick={() => setShowAICopy(true)}
          className={cn('text-xs px-3 py-1.5 rounded-lg font-medium transition-all', theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white/80' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-500 hover:text-gray-700')}
        >
          Copy for AI
        </button>
      </div>

      {showAICopy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAICopy(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className={cn('relative w-full max-w-2xl max-h-[80vh] rounded-xl border overflow-hidden flex flex-col', theme === 'dark' ? 'bg-[#0d1520] border-white/10' : 'bg-white border-gray-200')}
            onClick={e => e.stopPropagation()}
          >
            <div className={cn('flex items-center justify-between px-5 py-4 border-b shrink-0', theme === 'dark' ? 'border-white/10' : 'border-gray-200')}>
              <div>
                <h3 className={cn('text-sm font-semibold', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Copy for AI</h3>
                <p className={cn('text-xs mt-0.5', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>Paste this into ChatGPT, Claude, or any AI to teach it our ops</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(AI_TRAINING_TEXT);
                    setAiCopied(true);
                    setTimeout(() => setAiCopied(false), 2000);
                  }}
                  className={cn('text-xs px-3 py-1.5 rounded-lg font-semibold transition-all', aiCopied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : theme === 'dark' ? 'bg-white/10 hover:bg-white/15 border border-white/10 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white')}
                >
                  {aiCopied ? 'Copied' : 'Copy All'}
                </button>
                <button onClick={() => setShowAICopy(false)} className={cn('text-xs px-2 py-1.5 rounded-lg transition-colors', theme === 'dark' ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600')}>
                  Close
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-5">
              <div className={cn('text-xs rounded-lg p-4 mb-4 space-y-2', theme === 'dark' ? 'bg-white/5 border border-white/10 text-white/60' : 'bg-amber-50 border border-amber-200 text-gray-600')}>
                <p className={cn('font-semibold text-xs', theme === 'dark' ? 'text-white/80' : 'text-gray-800')}>How to use this</p>
                <p>1. Copy the text below and paste it into ChatGPT, Claude, or any AI chatbot as the first message.</p>
                <p>2. Then paste the customer conversation and ask &quot;How should I respond?&quot;</p>
                <p>3. The AI will detect the brand from context. If it can&apos;t tell, it&apos;ll ask you which brand.</p>
                <p className={cn('font-medium', theme === 'dark' ? 'text-amber-400/80' : 'text-amber-700')}>Always double-check the price against the customer&apos;s actual quote. Read every response before sending. Start a fresh chat each time. For refunds or complaints, follow the manual and check with management.</p>
              </div>
              <pre className={cn('text-xs whitespace-pre-wrap font-mono leading-relaxed', theme === 'dark' ? 'text-white/50' : 'text-gray-500')}>{AI_TRAINING_TEXT}</pre>
            </div>
          </div>
        </div>
      )}

      {completedCount === 0 && (
        <Callout variant="info" title="Welcome">Read through each section and mark it as understood when you&apos;re done. Your progress is saved automatically. Use the sidebar to jump between sections.</Callout>
      )}
      {completedCount > 0 && completedCount < TOC.length && <div className="mb-8 lg:hidden"><ProgressBar completed={completedCount} total={TOC.length} /></div>}
      {completedCount === TOC.length && <Callout variant="success" title="All sections complete">You&apos;ve reviewed the entire manual. Come back anytime to reference specific sections.</Callout>}

      <div className="mt-6">
        <SectionAccordion items={sections} activeSection={activeSection} />
      </div>

      <p className={cn('text-xs text-center mt-10 mb-20', theme === 'dark' ? 'text-white/20' : 'text-gray-300')}>v2.1 -- March 2026</p>
    </InternalLayout>
  );
}

function getSectionContent(id: string, theme: string) {
  const t = theme === 'dark';
  const textClass = t ? 'text-white/60' : 'text-gray-500';
  const headClass = t ? 'text-white' : 'text-gray-900';
  const subClass = t ? 'text-white/80' : 'text-gray-700';
  const mutedClass = t ? 'text-white/40' : 'text-gray-400';
  const amberClass = t ? 'text-amber-400/80' : 'text-amber-600';

  switch (id) {
    case 'rules':
      return (
        <div className="space-y-4">
          <p className={cn('font-semibold text-lg', subClass)}>Be nice. Be fast. Be accurate.</p>
          <ul className="space-y-2">
            <Rule>Always side with the customer</Rule>
            <Rule>Always de-escalate</Rule>
            <Rule>Never use emojis</Rule>
            <Rule>Never text/call before 8 AM or after 10 PM</Rule>
            <Rule>Never argue, never blame the cleaner by name</Rule>
            <Rule>Read the full conversation before replying</Rule>
            <Rule>Check which brand number you&apos;re texting from</Rule>
            <Rule>If you&apos;re unsure about anything, ask management first</Rule>
          </ul>
        </div>
      );

    case 'tone':
      return (
        <div className="space-y-4">
          <P>Sound like a real person, not a company. Short sentences. Contractions. Warm but professional.</P>
          <div>
            <Good>Hey Sarah, just checking in -- how did everything look today?</Good>
            <Good>I&apos;m sorry about that, let me look into it and get it sorted.</Good>
            <Good>No problem, I&apos;ll get that rescheduled for you.</Good>
          </div>
          <div>
            <Bad reason="robotic">Hello valued customer, we hope our services met your expectations.</Bad>
            <Bad reason="cold">Per our policy, damages must be reported within 24 hours.</Bad>
            <Bad reason="defensive">The cleaner said she cleaned everything so I&apos;m not sure what the issue is.</Bad>
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>When someone&apos;s upset</p>
            <Pb>&quot;I understand, let me make this right.&quot;</Pb>
            <P className="mt-1">Never say &quot;calm down&quot; or &quot;per our policy.&quot; Always offer a solution.</P>
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>When you don&apos;t know</p>
            <Pb>&quot;Let me check on that and get right back to you.&quot;</Pb>
            <P className="mt-1">Then actually follow up.</P>
          </div>
        </div>
      );

    case 'reviews':
      return (
        <div className="space-y-6">
          <P>Reviews are the single most important thing you do outside of booking cleans. Every clean is a potential review. Your job is to guide happy customers from check-in to posted review.</P>

          <div>
            <SectionHeading>Step 1: The Check-In (2-4 hours after the clean)</SectionHeading>
            <P className="mt-1">Every single job gets a check-in. This is how you find out if they&apos;re happy before you ask for a review.</P>
            <Template>{`Hi [Name], just checking in -- how did everything look today?`}</Template>
            <P className="mt-2">Do NOT ask for a review here. Do NOT mention payment. Do NOT pitch recurring. Just ask how it went and wait.</P>
            <P className="mt-2">Log their response as one of three categories:</P>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <Callout variant="success"><p className="text-xs font-semibold mb-1">POSITIVE</p><p className="text-xs opacity-70">They say it looks great, happy, love it.</p><p className="text-sm mt-2 opacity-90">&quot;That&apos;s great to hear, thank you!&quot;</p><p className="text-xs mt-1 font-medium">Move to Step 2.</p></Callout>
              <Callout variant="warning"><p className="text-xs font-semibold mb-1">NEUTRAL</p><p className="text-xs opacity-70">&quot;Fine,&quot; &quot;okay,&quot; one-word answers.</p><p className="text-sm mt-2 opacity-90">&quot;Thanks. Anything we could&apos;ve done better?&quot;</p><p className="text-xs mt-1 font-medium">Do NOT ask for a review.</p></Callout>
              <Callout variant="danger"><p className="text-xs font-semibold mb-1">NEGATIVE</p><p className="text-xs opacity-70">Unhappy, something missed, complaint.</p><p className="text-sm mt-2 opacity-90">&quot;I&apos;m sorry to hear that. Can you tell me more?&quot;</p><p className="text-xs mt-1 font-medium">Go to Complaints. No review for 2-3 cleans.</p></Callout>
            </div>
          </div>

          <div>
            <SectionHeading>Step 2: The Review Ask (24-48 hours after a positive check-in)</SectionHeading>
            <P className="mt-1">Wait at least a day. Send the review request as its own separate message. Look up the correct Google review link for their brand in the Brand Directory (section 22).</P>
            <Template>{`Glad it went well, [Name]. Would you mind leaving a quick review? Even a sentence helps us a lot.

[Google link]

$25 off your next clean as a thank you.
Include a photo and we'll make it $50 off.`}</Template>
            <Callout variant="danger" title="Google only">Never send a Yelp link. Yelp&apos;s algorithm detects solicited reviews and filters them, which hurts our profile. We want organic Yelp reviews only. Always use the Google link from the Brand Directory.</Callout>
          </div>

          <div>
            <SectionHeading>Step 3: The Follow-Up (3-5 days later, if no review)</SectionHeading>
            <P className="mt-1">If they haven&apos;t left a review, send one gentle follow-up. Check Google first.</P>
            <Template>{`Hey [Name], gentle reminder about that review when you get a chance. No pressure.

[Google link]

Your credit is ready whenever.`}</Template>
            <P className="mt-2">After this one follow-up, stop. Do not ask again for 3-4 more cleans.</P>
          </div>

          <div>
            <SectionHeading>When They Leave a Review</SectionHeading>
            <P className="mt-1">Notify management immediately with a link. Then apply credit:</P>
            <InfoBox className="mt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Text-only review</span><span className={headClass}>$25 off next clean</span>
                <span>Review with photo</span><span className={headClass}>$50 off next clean</span>
                <span>Recurring client review</span><span className={headClass}>$30 off next clean</span>
                <span>Referral that books</span><span className={headClass}>$40 off for both</span>
              </div>
            </InfoBox>
            <P className="mt-2">Let the customer know:</P>
            <Template>{`Hey [Name], saw your review -- thank you so much! I've applied $[amount] off your next clean.`}</Template>
          </div>

          <div>
            <SectionHeading>Negative Google Reviews</SectionHeading>
            <P className="mt-1">Do NOT respond publicly. Send management the review text, customer name, and any context. They will write or approve the response.</P>
          </div>

          <div>
            <SectionHeading>Owner Outreach <span className={cn('font-normal', mutedClass)}>(owner only)</span></SectionHeading>
            <P className="mt-1">For older customers who haven&apos;t been asked in a while. VAs never use the owner&apos;s name or pretend to be the owner.</P>
            <Template>{`Hey [Name], this is the owner of [Brand].

Wanted to see if you had any feedback about our service. Any input helps me improve the business. You'll get $25 off your next clean either way.

If you're happy with us, a Google review would mean a lot:

[Google link]`}</Template>
          </div>

          <Callout variant="info" title="The full timeline">
            <div className="space-y-1">
              <p>Clean completes &rarr; wait 2-4 hours &rarr; send check-in</p>
              <p>Positive response &rarr; wait 24-48 hours &rarr; send review ask</p>
              <p>No review after 3-5 days &rarr; send one follow-up</p>
              <p>Still no review &rarr; stop. Don&apos;t ask again for 3-4 cleans.</p>
              <p>Review posted &rarr; notify management, apply credit, thank customer</p>
            </div>
          </Callout>
        </div>
      );

    case 'booking':
      return (
        <div className="space-y-6">
          <div>
            <SectionHeading>How Quotes Work</SectionHeading>
            <P className="mt-1">The bot automatically texts them with pricing and what&apos;s included. You don&apos;t send the initial quote. Your job starts after -- follow up, answer questions, close the booking.</P>
            <P className="mt-1">Check Quo {'>'} DONE three times a day (9 AM, 1 PM, 5 PM).</P>
          </div>

          <div>
            <SectionHeading>When They Reply to the Quote</SectionHeading>
            <P className="mt-1 mb-3">This is the most important conversion moment.</P>

            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>They want to book</p>
            <Template>{`That's great! To get you set up I just need your full name, email, and address. The booking doesn't require payment upfront -- you'll get access to your dashboard where you can pick a date and add billing info whenever you're ready.`}</Template>

            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2 mt-4', mutedClass)}>&quot;What&apos;s included?&quot;</p>
            <P className="mb-2">Match what the bot already told them:</P>
            <InfoBox>
              <p><span className={cn('font-medium', headClass)}>Standard:</span> All bedrooms, bathrooms, kitchen, common areas -- vacuuming, mopping, wiping surfaces, sinks and toilets. Does NOT include inside fridge, oven, or baseboards (those are add-ons).</p>
              <p><span className={cn('font-medium', headClass)}>Deep:</span> Everything in standard plus extra time for baseboards, windowsills, door frames, and tile and grout. Does NOT include inside fridge or oven.</p>
              <p><span className={cn('font-medium', headClass)}>Move Out:</span> Everything in deep plus inside all cabinets and closets, inside windows. Does NOT include inside fridge or oven.</p>
            </InfoBox>

            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2 mt-4', mutedClass)}>&quot;When can you come?&quot;</p>
            <Template>{`We have flexible scheduling. What day and time work best for you? I can check availability and get you booked.`}</Template>

            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2 mt-4', mutedClass)}>&quot;Let me think about it&quot;</p>
            <Template>{`No rush at all! I'm here whenever you're ready. Just reply to this text anytime.`}</Template>
            <P className="mt-1">Then follow up in 24 hours (see below).</P>
          </div>

          <div>
            <SectionHeading>Follow-Ups <span className={cn('font-normal', mutedClass)}>(no response)</span></SectionHeading>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2 mt-2', mutedClass)}>24 hours, no response</p>
            <Template>{`Hey [Name], following up on your quote. Let me know if you have any questions!`}</Template>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2 mt-4', mutedClass)}>3-4 days later, still nothing</p>
            <Template>{`Hi [Name], checking in one more time -- let me know if we can help or if the timing doesn't work.`}</Template>
            <P className="mt-2">After two follow-ups, stop.</P>
          </div>

          <div>
            <SectionHeading>Closing the Booking</SectionHeading>
            <P className="mt-1 mb-2">Once they&apos;re interested, get three things: name, email, address.</P>
            <Template>{`To get you booked, I just need:
- Full name
- Email
- Address

No payment needed upfront. I'll send you a confirmation with a link to your dashboard.`}</Template>
          </div>

          <div>
            <SectionHeading>Upselling <span className={cn('font-normal', mutedClass)}>(once, naturally)</span></SectionHeading>
            <Template>{`A lot of our customers add [oven/fridge cleaning] -- would you like to include any extras?`}</Template>
            <P>Say it once. If they say no, drop it.</P>
          </div>

          <div>
            <SectionHeading>Booking Confirmed <span className={cn('font-normal', mutedClass)}>(send within 1 hour)</span></SectionHeading>
            <Template>{`Hey [Name], you're all set!

Date: [Date]
Time: [Time]
Service: [Type + addons]

A few quick questions:
- Any pets?
- Alarm code or entry instructions?
- Rooms to skip or focus on?
- Delicate surfaces (marble, stone, etc.)?
- Parking info?`}</Template>
            <P>Log answers. Include in cleaner briefing.</P>
          </div>

          <div>
            <SectionHeading>Day-Before Reminder <span className={cn('font-normal', mutedClass)}>(2-5 PM)</span></SectionHeading>
            <Template>{`Hey [Name], reminder your clean is tomorrow at [Time]. Let us know if anything changed!`}</Template>
          </div>
        </div>
      );

    case 'postservice':
      return (
        <div className="space-y-5">
          <P>Every clean triggers a sequence. Here&apos;s what happens after the cleaner leaves, in order.</P>

          <div>
            <SectionHeading>1. Check-In <span className={cn('font-normal', mutedClass)}>(2-4 hours after)</span></SectionHeading>
            <P className="mt-1 mb-2">Send this to every customer after every clean, no exceptions.</P>
            <Template>{`Hi [Name], just checking in -- how did everything look today?`}</Template>
            <P className="mt-2">Do not combine this with any other ask. No payment reminder, no review ask, no recurring pitch. Just the check-in.</P>
            <P className="mt-2">If they respond positively, this customer enters the review pipeline (see Reviews section). If neutral, note the feedback. If negative, move to Complaints.</P>
          </div>

          <div>
            <SectionHeading>2. Review Ask <span className={cn('font-normal', mutedClass)}>(24-48 hours after positive check-in)</span></SectionHeading>
            <P className="mt-1">Only for customers who responded positively. See Reviews section (section 3).</P>
          </div>

          <div>
            <SectionHeading>3. Recurring Pitch <span className={cn('font-normal', mutedClass)}>(5-7 days after clean)</span></SectionHeading>
            <P className="mt-1">Only for one-time customers who were happy. Never in the same message as the review ask. See Recurring section (section 11).</P>
          </div>

          <div>
            <SectionHeading>4. Payment Follow-Up <span className={cn('font-normal', mutedClass)}>(if needed)</span></SectionHeading>
            <P className="mt-1">If they haven&apos;t added a payment method, follow the Payments section (section 15) timeline. Keep this separate from the review and recurring asks.</P>
          </div>

          <Callout variant="warning" title="Key rule: one thing per message">Never ask for two things at once. Don&apos;t send a check-in and a review ask in the same message. Don&apos;t ask for payment and pitch recurring together. Each ask gets its own message on its own day. Customers stop responding when you pile things on.</Callout>

          <div>
            <SectionHeading>If They Don&apos;t Respond to the Check-In</SectionHeading>
            <P className="mt-1">No response? Don&apos;t chase it. They&apos;re probably fine. You can still ask for a review in 2-3 days since they didn&apos;t say anything negative. But if they don&apos;t respond to the review ask either, stop all outreach.</P>
          </div>
        </div>
      );

    case 'photos':
      return (
        <div className="space-y-5">
          <P>Required for every job. Cleaners send kitchen + bathroom before/after photos to admin.</P>
          <ul className="space-y-1.5 mt-2">
            <Li>Save to customer record</Li>
            <Li>Quality check the after photo</Li>
            <Li>If marketing-worthy, save to shared folder</Li>
          </ul>
          <div>
            <SectionHeading>Getting Permission for Social Media</SectionHeading>
            <Template>{`By the way, our cleaner took some great before/after photos. Would you mind if we shared them on our social media? We never include names or addresses.`}</Template>
          </div>
        </div>
      );

    case 'services':
      return (
        <div className="space-y-6">
          <div>
            <SectionHeading>Standard Clean</SectionHeading>
            <P className="mt-1">Bedrooms, bathrooms, kitchen, living areas. Vacuuming, mopping, wiping surfaces, sinks, toilets.</P>
          </div>
          <div>
            <SectionHeading>Deep Clean <span className={cn('font-normal', mutedClass)}>(~2 hours longer)</span></SectionHeading>
            <P className="mt-1">Includes everything in a standard clean, with extra time for wiping down doors, windowsills, baseboards, and cleaning tile grout in bathrooms.</P>
            <p className={cn('text-xs mt-2 font-medium', amberClass)}>Already included: baseboards, windowsills, door frames, tile/grout. Do NOT add as paid addons.</p>
          </div>
          <div>
            <SectionHeading>Move In/Out</SectionHeading>
            <P className="mt-1">Complete move in or move out clean. Includes every room top to bottom: inside all cabinets and closets, fridge, oven, microwave, baseboards, windowsills, doorframes, wall scuff removal, and full bathroom descaling. Everything is included.</P>
            <p className={cn('text-xs mt-2 font-medium', amberClass)}>Already included: fridge, oven, microwave, inside windows, all cabinets/closets, baseboards, wall scuffs. Do NOT add as paid addons.</p>
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Over-quote fix</p>
            <Template>{`I noticed [addon] was listed separately but it's already included in your [deep/move-out] clean. I've adjusted your total to $[amount].`}</Template>
          </div>

          <div className={cn('border-t pt-6', t ? 'border-white/10' : 'border-gray-200')}>
            <p className={cn('text-xs font-semibold uppercase tracking-wider mb-4', mutedClass)}>Quick responses (tap to copy)</p>

            <p className={cn('text-xs font-semibold uppercase tracking-wider mt-4 mb-2', mutedClass)}>What&apos;s included</p>
            <FAQ q="What does a standard clean include?" a="All bedrooms, bathrooms, kitchen, and common areas. We vacuum, mop, wipe down all surfaces, clean sinks and toilets. If you need extras like inside fridge, oven, or baseboards, we can add those on." />
            <FAQ q="What does a deep clean include?" a="Everything in a standard clean plus extra time for baseboards, door frames, windowsills, and tile grout. It's about 2 hours longer than a standard." />
            <FAQ q="What does a move out include?" a="Everything in a deep clean plus inside all cabinets and closets, fridge, oven, microwave, inside windows, and wall scuffs. Everything is included." />
            <FAQ q="What's the difference between standard and deep?" a="A standard covers your rooms with vacuuming, mopping, surfaces, sinks, and toilets. A deep clean adds extra time for baseboards, door frames, windowsills, and tile grout." />

            <p className={cn('text-xs font-semibold uppercase tracking-wider mt-4 mb-2', mutedClass)}>Pricing and payment</p>
            <FAQ q="How do I pay?" a="Card or Zelle after we're done. You're never charged until the clean is complete." />
            <FAQ q="Do you have any discounts?" a="$25 off your first clean. If you set up recurring, you get 10% off weekly, 5% off bi-weekly, or $25 off monthly." />
            <FAQ q="Do you bring supplies?" a="Yes, we bring everything." />
            <FAQ q="Are you insured?" a="Yes, fully insured and bonded." />

            <p className={cn('text-xs font-semibold uppercase tracking-wider mt-4 mb-2', mutedClass)}>Logistics</p>
            <FAQ q="How long does it take?" a="A standard is usually 2-3 hours for a 1-2 bed. Deep cleans add about 2 hours. Move outs depend on the size but usually 4-6 hours." />
            <FAQ q="Do I need to be home?" a="No, just leave us entry instructions. We lock up when we're done." />
            <FAQ q="Can I add extras after booking?" a="Yes, just text us and we'll update your booking." />

            <p className={cn('text-xs font-semibold uppercase tracking-wider mt-4 mb-2', mutedClass)}>After the clean</p>
            <FAQ q="Something was missed" a="I'm sorry about that. We can send someone back to take care of it, or I can adjust your bill. Which would you prefer?" />
            <FAQ q="Place is already clean, should I do standard?" a="If the place is in good shape, a standard clean would work great." />
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="space-y-6">
          <P>You have authority to adjust pricing. You don&apos;t need approval for routine price changes -- that&apos;s part of your job.</P>

          <div>
            <SectionHeading>Cleaner Pay</SectionHeading>
            <P className="mt-1">Target 40% of the job total to the cleaner. You may go over 40% if the situation calls for it -- for example, if a standard clean runs 30-60 minutes longer than expected because the place was dirtier than quoted. In that case, pay the cleaner fairly for the extra time but do NOT bill the customer extra. We eat that cost.</P>
            <P className="mt-2">However, if the place is significantly dirtier -- like it clearly needs a deep clean, not a standard -- that&apos;s different. The cleaner should let you know before starting the extra work:</P>
            <Template>{`Hey [Name], our team just arrived and the space looks like it could use a deep clean rather than a standard. A deep clean would be $[amount] instead of $[amount]. Would you like us to go ahead with the upgrade, or stick with the standard? Either way is totally fine.`}</Template>
            <P className="mt-2">If they say no, the cleaner does the standard clean as quoted.</P>
          </div>

          <div>
            <SectionHeading>Price Adjustments You Can Make</SectionHeading>
            <div className="space-y-3 mt-2 text-sm">
              {[
                { tag: 'YES', text: 'Remove addons that are already included in the service type (over-quoting)' },
                { tag: 'YES', text: 'Apply $25 off first/third clean discount' },
                { tag: 'YES', text: 'Give returning customers their old rate if they mention a price increase' },
                { tag: 'YES', text: 'Offer free addon (microwave, appliance) to convert a hesitant first-timer' },
                { tag: 'YES', text: 'Issue partial refunds for missed addons or incomplete work' },
                { tag: 'YES', text: "Downgrade a deep clean charge to standard rate if the clean wasn't up to deep clean quality" },
                { tag: 'YES', text: 'Offer 30-50% off for quality complaints' },
                { tag: 'ASK', text: 'Full refunds -- always check with management first' },
                { tag: 'ASK', text: 'Custom pricing for a customer who says our rates are too high and the gap is $20-30' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={cn('text-xs font-bold mt-1 shrink-0', item.tag === 'YES' ? 'text-emerald-500' : amberClass)}>{item.tag}</span>
                  <span className={textClass}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading>New Customer Discounts</SectionHeading>
            <P className="mt-1">$25 off first and third clean (standard offer). You can also offer a free microwave clean or free appliance addon to convert hesitant first-timers.</P>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2 mt-3', mutedClass)}>&quot;Does the quote include my discount?&quot;</p>
            <Template>{`No, I'll apply $25 off once the booking is created. Creating a booking doesn't charge you anything.`}</Template>
          </div>

          <div>
            <SectionHeading>When They Say &quot;Too Expensive&quot;</SectionHeading>
            <div className="space-y-3 mt-2">
              <P><span className={cn('font-medium', headClass)}>First:</span> Check for over-billing. Are there addons already included in the service type? Fix it and apologize.</P>
              <Template>{`I apologize, this quote was calculated incorrectly. [Window cleaning / baseboards] is already included in your deep clean. Your actual total would be $[amount], and with the $25 first-time discount it comes to $[amount].`}</Template>
              <P><span className={cn('font-medium', headClass)}>If quote is correct:</span> Ask &quot;What price range were you hoping for?&quot; or &quot;What are you currently paying?&quot;</P>
              <P><span className={mutedClass}>Gap is $20-30:</span> Forward to management with the details.</P>
              <P><span className={mutedClass}>Gap is huge:</span> &quot;Our cleans average [X] hours, so unfortunately we can&apos;t match that price. Our rates are standard for professional cleaning.&quot;</P>
            </div>
          </div>

          <div>
            <SectionHeading>Prevent Price Surprises</SectionHeading>
            <P className="mt-1 mb-2">For deep cleans and move-outs, ask at booking:</P>
            <Template>{`Could you send a few photos of the space so we can make sure our quote is accurate? If photos aren't possible, can you describe the condition -- is it regularly maintained or has it been a while?`}</Template>
          </div>
        </div>
      );

    case 'phone':
      return (
        <div className="space-y-5">
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Answering</p>
            <Template>{`Good morning/afternoon, this is [Name] from [Brand], how can I help you?`}</Template>
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Need a moment</p>
            <Template>{`Give me one second, I'll pull that up.`}</Template>
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Missed call (text within 15 min)</p>
            <Template>{`Hey, this is [Name] from [Brand], sorry I missed your call -- how can I help?`}</Template>
          </div>
        </div>
      );

    case 'dayof':
      return (
        <div className="space-y-5">
          <div>
            <SectionHeading>Morning</SectionHeading>
            <P>Confirm cleaners are on track. Verify entry instructions for every job.</P>
          </div>
          <div>
            <SectionHeading>30 Minutes Before</SectionHeading>
            <Template>{`Hey [Name], our team is on the way!`}</Template>
          </div>
          <div>
            <SectionHeading>Cleaner Late ({'>'} 10 min)</SectionHeading>
            <P className="mb-2">Notify BEFORE the scheduled time.</P>
            <Template>{`Heads up, our team is running about [X] minutes behind. Sorry for the delay.`}</Template>
          </div>
          <div>
            <SectionHeading>Can&apos;t Get In</SectionHeading>
            <P className="mb-2">Call/text customer. Wait 15 min, try again. After 30 min, cleaner leaves.</P>
            <Template>{`Hey [Name], our team arrived but couldn't get in. Give us a call and we'll reschedule free.`}</Template>
            <P>No lockout fee without management approval.</P>
          </div>
        </div>
      );

    case 'recurring':
      return (
        <div className="space-y-5">
          <P>5-7 days after a positive clean. Never in the same message as a review ask.</P>
          <Template>{`Hey [Name], we offer 10% off recurring cleans (weekly, bi-weekly, monthly). Great way to keep things clean without rebooking each time. Want to hear more?`}</Template>
          <div className="space-y-3">
            <div><span className={cn('text-xs font-semibold', mutedClass)}>Skip a week:</span><P className="ml-0 inline"> &quot;No problem, I&apos;ll skip this one and keep you for [next date].&quot; No fees.</P></div>
            <div><span className={cn('text-xs font-semibold', mutedClass)}>Schedule change:</span><P className="ml-0 inline"> &quot;Done, moved you to [new time].&quot;</P></div>
            <div><span className={cn('text-xs font-semibold', mutedClass)}>Price question:</span><P className="ml-0 inline"> Give them the old rate. Always.</P></div>
          </div>
        </div>
      );

    case 'marketing':
      return (
        <div className="space-y-5">
          <P>Cleaners carry NFC review cards, referral cards, and door hangers to every job.</P>
          <div>
            <SectionHeading>NFC Review Cards</SectionHeading>
            <P className="mt-1">Customer taps their phone to open the Google review page. Cleaners offer at the end of every job.</P>
          </div>
          <div>
            <SectionHeading>Referral Cards</SectionHeading>
            <P className="mt-1">Left on the counter after every job. &quot;$25 off for your friend, $25 credit for you. Code: REFER25.&quot;</P>
          </div>
          <div>
            <SectionHeading>Door Hangers</SectionHeading>
            <P className="mt-1">Distributed to 3-5 neighbor doors after every job in houses/townhouses. Respect building no-solicitation rules.</P>
          </div>
          <P>Track inventory. Restock when low. Verify cleaners have materials before each job.</P>
        </div>
      );

    case 'complaints':
      return (
        <div className="space-y-6">
          <Pb>Our policy is simple: always side with the customer. When something goes wrong, your first instinct should be to make it right, not to investigate who&apos;s at fault.</Pb>

          <div>
            <SectionHeading>The Mindset</SectionHeading>
            <P className="mt-1">When a customer reaches out with a problem, they&apos;re already frustrated. Your job is to make the frustration go away as fast as possible. Don&apos;t ask them to prove anything. Don&apos;t make them wait. Don&apos;t get defensive. Just fix it.</P>
            <P className="mt-2">You have full authority to issue discounts and partial refunds. The only things that need management approval are full refunds, property damage claims, theft, or legal threats.</P>
          </div>

          <div>
            <SectionHeading>How to Respond to Any Complaint</SectionHeading>
            <P className="mt-1 mb-2">Step 1 is always the same:</P>
            <Template>{`I'm really sorry about that, [Name]. That's not the experience we want you to have. Let me make this right.`}</Template>
            <P className="mt-2">Then listen. Let them tell you what happened. Once they&apos;re done, move to the resolution.</P>
          </div>

          <div>
            <SectionHeading>Issue-Specific Resolutions</SectionHeading>
            <div className="space-y-4 mt-3">
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Quality Issue (areas missed, not clean enough)</p>
                <P className="mt-1">Offer both a discount AND a re-clean. Let them pick.</P>
                <Template>{`I'm sorry about that. I'd like to offer you [30-50]% off this clean, and we can also send a team back to touch up anything that was missed -- whichever you'd prefer. If we do a re-clean, it would be a different cleaner and I'll personally make sure they know exactly what to focus on.`}</Template>
              </div>
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Deep Clean Wasn&apos;t Deep Enough</p>
                <P className="mt-1">Downgrade the charge to the standard rate immediately.</P>
                <Template>{`You're right, that's not the level of clean you paid for. I've adjusted your charge to the standard clean rate -- you'll see $[amount] refunded. I'd also like to offer a re-clean at no charge if you'd like us to come back and do it properly.`}</Template>
              </div>
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Move Out Incomplete</p>
                <P className="mt-1">Partial refund. If it&apos;s their move-out day, prioritize same-day return.</P>
                <Template>{`I'm sorry about that. I'm going to refund the portion for [what was missed] and I can try to get someone back today to take care of it. Would that work?`}</Template>
              </div>
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Missed Addon</p>
                <P className="mt-1">Refund it immediately. No investigation needed.</P>
                <Template>{`I see the [addon] was missed -- I've refunded that charge right away. I'm sorry about the oversight.`}</Template>
              </div>
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Wrong Products Used</p>
                <P className="mt-1">Serious issue. Escalate to management immediately. Do not try to resolve on your own because there may be surface damage involved.</P>
              </div>
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Property Damage</p>
                <P className="mt-1">Ask for photos. Do NOT admit fault or discuss insurance. Escalate to management.</P>
                <Template>{`I'm so sorry this happened. Could you send me some photos so I can document this? I've escalated it to my manager and he'll be in touch with you shortly to get this resolved.`}</Template>
              </div>
              <div>
                <p className={cn('text-sm font-semibold', subClass)}>Theft Reported</p>
                <P className="mt-1">Take it seriously. Escalate to management immediately. Do NOT contact the cleaner about the allegation.</P>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading>Re-Clean Protocol</SectionHeading>
            <P className="mt-1">If the customer wants a re-clean:</P>
            <ul className="space-y-1.5 mt-2"><Li>Schedule within 48 hours</Li><Li>Send a different cleaner if possible</Li><Li>Brief the new cleaner on exactly what was missed -- be specific</Li><Li>Follow up after: &quot;How did today&apos;s visit go?&quot;</Li></ul>
          </div>

          <div>
            <SectionHeading>After Any Complaint Is Resolved</SectionHeading>
            <P className="mt-1">Follow up 24 hours later. Don&apos;t ask for a review for 2-3 more cleans.</P>
          </div>

          <Callout variant="warning" title="Escalate to management">Full refund requests, property damage, theft, legal threats, negative review threats, anything involving insurance, or anything you&apos;re not sure about. Everything else -- partial refunds, discounts, re-cleans, downgrading charges -- you handle directly.</Callout>
        </div>
      );

    case 'cancellations':
      return (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className={cn('text-sm font-semibold shrink-0 w-44', subClass)}>Customer {'>'}24 hrs</span>
            <P>No charge. &quot;No problem, let us know when to reschedule!&quot;</P>
          </div>
          <div className="flex items-start gap-3">
            <span className={cn('text-sm font-semibold shrink-0 w-44', subClass)}>Customer {'<'}24 hrs</span>
            <P>10% fee. Waive for first-timers or long-time recurring.</P>
          </div>
          <div className="flex items-start gap-3">
            <span className={cn('text-sm font-semibold shrink-0 w-44', subClass)}>Reschedule</span>
            <P>No charge, ever.</P>
          </div>
          <div>
            <span className={cn('text-sm font-semibold', subClass)}>Cleaner Cancels</span>
            <P className="mt-1">Find a replacement first. If you can&apos;t:</P>
            <Template>{`We need to reschedule -- schedule shifted. Can I move you to [date/time]? We'll add a free [addon].`}</Template>
            <p className={cn('text-xs font-medium', amberClass)}>Never say &quot;the cleaner cancelled.&quot;</p>
          </div>
        </div>
      );

    case 'payments':
      return (
        <div className="space-y-6">
          <Pb>We accept credit/debit cards and Zelle. We do NOT accept cash or checks, ever. No exceptions.</Pb>

          <div>
            <SectionHeading>At Booking: Card on File</SectionHeading>
            <P className="mt-1">When a customer books, they need to add a card to their dashboard. The card is NOT charged at booking -- it&apos;s just on file.</P>
            <Template>{`To confirm your booking, we just need a card on file. You won't be charged until after the clean is complete and you're happy with the job. It's just to secure the appointment.`}</Template>
            <P className="mt-2">If they refuse to add a card entirely, they can pay via Zelle before the clean instead.</P>
          </div>

          <div>
            <SectionHeading>After the Clean: Charging</SectionHeading>
            <P className="mt-1">We charge after the clean is complete. If they don&apos;t have a card on file:</P>
            <Template>{`Hey [Name], hope everything looked great! When you get a chance, could you add a card to your dashboard so we can process billing? You can also pay via Zelle if you prefer.`}</Template>
          </div>

          <div>
            <SectionHeading>Zelle Payments</SectionHeading>
            <P className="mt-1">Preferred for cleans over $500 (move-outs, large deep cleans) because of card processing fees. Not required. Only suggest for large invoices:</P>
            <Template>{`Your total for today's clean is $[amount]. You can pay with the card on file, or if you'd prefer, we also accept Zelle -- just send to [Zelle email/number]. Either works!`}</Template>
          </div>

          <div>
            <SectionHeading>What We Do NOT Accept</SectionHeading>
            <Callout variant="danger"><span className="font-semibold">No cash. No checks.</span> If a customer asks, politely redirect:</Callout>
            <Template>{`Unfortunately we're only able to accept card or Zelle payments. You can add a card through your dashboard, or I can send you our Zelle info -- whichever is easier for you.`}</Template>
          </div>

          <div>
            <SectionHeading>When They Haven&apos;t Paid</SectionHeading>
            <P className="mt-1">Follow-up sequence:</P>
            <div className="space-y-3 mt-3">
              <div>
                <span className={cn('text-xs font-mono', mutedClass)}>SAME DAY (after the clean)</span>
                <Template>{`Hey [Name], hope everything looked great! When you get a chance, could you add a card to your dashboard so we can process billing? You can also pay via Zelle if you prefer.`}</Template>
              </div>
              <div>
                <span className={cn('text-xs font-mono', mutedClass)}>DAY 3</span>
                <Template>{`Hi [Name], just a friendly reminder to add your payment method when you get a chance. Happy to help if you have any trouble with the dashboard.`}</Template>
              </div>
              <div>
                <span className={cn('text-xs font-mono', mutedClass)}>DAY 5</span>
                <Template>{`Hey [Name], wanted to follow up on the payment for your clean on [date]. Could you add a card or send payment via Zelle today? Let me know if there's any issue.`}</Template>
              </div>
              <div>
                <span className={cn('text-xs font-mono', mutedClass)}>DAY 7+</span>
                <P className="mt-1">Notify management with the customer name, amount owed, and dates of all follow-ups.</P>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading>Applying Discounts and Credits</SectionHeading>
            <P className="mt-1">Always tell the customer explicitly what was applied and what their final charge is:</P>
            <Template>{`I've applied your $[amount] credit from [reason]. Your total for this clean is $[final amount].`}</Template>
            <P className="mt-2">Never silently adjust a price.</P>
          </div>
        </div>
      );

    case 'cleaners':
      return (
        <div className="space-y-5">
          <div>
            <SectionHeading>Assigning</SectionHeading>
            <Template>{`[Name], I have a [type] for a [beds/baths] on [date] at [time], can you take this?`}</Template>
          </div>
          <div>
            <SectionHeading>Once Confirmed</SectionHeading>
            <Template>{`Here are the details:

Client: John Smith
Date: 09/25/25 at 10 AM
Type: Deep clean + oven
Size: 2 bed, 1 bath
Address: 69 Empire Blvd, Brooklyn, NY, Apt 3J
Entry: Doorman, say Brooklyn Maids
Pets: Cat
Notes: Marble counters -- pH-neutral only
Charge: $XXX | Your Pay: $XXX`}</Template>
            <p className={cn('text-xs font-medium', amberClass)}>Always include entry, pets, and surface notes.</p>
          </div>
          <div>
            <SectionHeading>Confirming</SectionHeading>
            <Template>{`[Name], confirming your cleans:
1. John Smith -- 9/25 at 10 AM
2. Sarah James -- 9/26 at 8 AM
Please confirm.`}</Template>
            <P>No confirmation in a few hours? Follow up and find backup.</P>
          </div>
          <div>
            <SectionHeading>Cleaner Rules</SectionHeading>
            <ul className="space-y-1.5 mt-2">
              <Rule>On time (notify VA if late)</Rule>
              <Rule>ONLY their own products, NEVER customer products</Rule>
              <Rule>Complete all services and addons</Rule>
              <Rule>Notify VA if anything damaged or unusual</Rule>
              <Rule>Lock up if customer isn&apos;t home</Rule>
            </ul>
          </div>
          <div>
            <SectionHeading>Performance</SectionHeading>
            <P className="mt-1">1st issue: verbal reminder. 2nd: written warning. 3rd: report to management.</P>
            <P>Immediate escalation: theft, damage, no-show, wrong products.</P>
          </div>
        </div>
      );

    case 'onboarding':
      return (
        <div className="space-y-4">
          <P>Before first job, verify:</P>
          <Checklist items={[
            'Background check done',
            'Has transportation',
            'Knows checklists (standard/deep/move-out)',
            'Knows addon procedures',
            'Knows products policy (their own supplies only)',
            'Has their own cleaning products and equipment',
            'Knows entry/lockout protocol',
            'Emergency contact on file',
            'Pay structure agreed',
          ]} />
          <P>Watch first 3-5 cleans closely. Check in with those customers more carefully.</P>
        </div>
      );

    case 'multibrand':
      return (
        <div className="space-y-4">
          <P>Before every message, verify:</P>
          <ol className={cn('space-y-1.5 text-sm list-decimal list-inside', t ? 'text-white/70' : 'text-gray-600')}>
            <li>Right brand?</li>
            <li>Right phone number?</li>
            <li>Right name?</li>
            <li>Right review link?</li>
          </ol>
          <p className={cn('text-xs font-medium', amberClass)}>A customer who gets a text from &quot;Brooklyn Maids&quot; when they booked &quot;Pacific Maids&quot; will not trust us again. When switching brands, pause and double-check.</p>
        </div>
      );

    case 'emergencies':
      return (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className={cn('text-sm font-semibold shrink-0 w-40', subClass)}>Cleaner injured</span>
            <P>Make sure they&apos;re safe. Notify management. Tell customer clean can&apos;t be completed, will reschedule. Don&apos;t discuss liability.</P>
          </div>
          <div className="flex items-start gap-3">
            <span className={cn('text-sm font-semibold shrink-0 w-40', subClass)}>Concerning property</span>
            <P>Cleaner leaves if unsafe. Notify management. Don&apos;t contact customer.</P>
          </div>
          <div className="flex items-start gap-3">
            <span className={cn('text-sm font-semibold shrink-0 w-40', subClass)}>Harassment</span>
            <P>Cleaner leaves immediately. Notify management. Don&apos;t engage customer.</P>
          </div>
        </div>
      );

    case 'checklist':
      return (
        <div className="space-y-5">
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Morning (9-10 AM)</p>
            <Checklist items={['Check inboxes and voicemails', 'Respond to overnight messages', 'Check Quo > DONE', "Confirm today's bookings with cleaners", 'Verify entry instructions', "Follow up on yesterday's quotes"]} />
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Midday (1-2 PM)</p>
            <Checklist items={['New messages', '"On the way" texts for afternoon cleans', 'Check-ins for morning cleans', 'Payment follow-ups', 'Check Quo > DONE']} />
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>End of Day (4-5 PM)</p>
            <Checklist items={['New messages', 'Check-ins for afternoon cleans', 'Review asks (eligible customers)', "Confirm tomorrow's bookings", 'Day-before reminders', 'Check Quo > DONE']} />
          </div>
          <div>
            <p className={cn('text-xs font-mono uppercase tracking-wider mb-2', mutedClass)}>Before Signing Off</p>
            <Checklist items={['All messages answered', 'Tomorrow confirmed with cleaners', 'Escalations sent to management']} />
          </div>
        </div>
      );

    case 'weekly':
      return (
        <div className="space-y-3">
          <P>Every Friday, send management:</P>
          <ul className="space-y-1.5">
            {['Cleans completed', 'New bookings', 'Recurring conversions', 'Reviews received (links)', 'Complaints and resolutions', 'Cleaner issues', 'Payment issues', 'Anything unusual'].map((item) => (
              <Li key={item}>{item}</Li>
            ))}
          </ul>
          <P>Bullet points. Keep it short.</P>
        </div>
      );

    case 'brands':
      return (
        <div className="space-y-4">
          <InfoBox>
            <div>
              <p className={cn('font-semibold text-sm', headClass)}>Brooklyn Maids</p>
              <p className="text-sm mt-1">Brooklyn, Manhattan, Queens, Bronx, Staten Island, Jersey City</p>
              <div className="flex flex-col gap-1 mt-2">
                <a href="https://g.page/r/Cd_HcvUPyGLhEAI/review" target="_blank" rel="noopener noreferrer" className="text-emerald-500 text-sm hover:underline">Google Review Link</a>
                <a href="https://www.yelp.com/biz/brooklyn-maids-brooklyn" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">Yelp Page (do NOT send to customers)</a>
              </div>
            </div>
          </InfoBox>
          <InfoBox>
            <div>
              <p className={cn('font-semibold text-sm', headClass)}>Neat Corner (Philly)</p>
              <p className="text-sm mt-1">Philadelphia area</p>
              <div className="flex flex-col gap-1 mt-2">
                <a href="https://g.page/r/CeGQblX_RomXEAI/review" target="_blank" rel="noopener noreferrer" className="text-emerald-500 text-sm hover:underline">Google Review Link</a>
              </div>
            </div>
          </InfoBox>
          <InfoBox>
            <div>
              <p className={cn('font-semibold text-sm', headClass)}>Bayside Maids (Concord/San Jose)</p>
              <p className="text-sm mt-1">Concord, San Jose area</p>
              <div className="flex flex-col gap-1 mt-2">
                <a href="https://g.page/r/CSrpXRhB_i5yEAI/review" target="_blank" rel="noopener noreferrer" className="text-emerald-500 text-sm hover:underline">Google Review Link</a>
              </div>
            </div>
          </InfoBox>
          <div className={cn('rounded-lg p-3 text-sm border border-dashed', t ? 'bg-white/5 border-white/10 text-white/40' : 'bg-gray-50 border-gray-200 text-gray-400')}>
            Add links as Google profiles are set up: Cedar, Chucktown, Fresno, Nooga, Pacific, Pine, Sac, Santa Clarita, Santa Monica, Santa Cruz, STL, Tahoe, Valley, Poolkeeping
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function OpsClient() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ops_auth');
      if (stored === PASSWORD) setAuthed(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      localStorage.setItem('ops_auth', pw);
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!authed) {
    return (
      <ThemeProvider storageKey="ops_theme">
        <LoginScreen pw={pw} setPw={setPw} error={error} setError={setError} onSubmit={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider storageKey="ops_theme">
      <OpsContent />
    </ThemeProvider>
  );
}

function LoginScreen({ pw, setPw, error, setError, onSubmit }: { pw: string; setPw: (v: string) => void; error: boolean; setError: (v: boolean) => void; onSubmit: (e: React.FormEvent) => void }) {
  const { theme } = useTheme();
  return (
    <div className={cn('min-h-screen flex items-center justify-center px-4', theme === 'dark' ? 'bg-[#0d1520]' : 'bg-gray-50')}>
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <h1 className={cn('text-xl font-semibold mb-6 text-center', theme === 'dark' ? 'text-white' : 'text-gray-900')}>Team Access</h1>
        <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setError(false); }} placeholder="Enter password" autoFocus
          className={cn('w-full px-4 py-3 rounded-lg mb-3 focus:outline-none transition-colors', theme === 'dark' ? 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-white/40' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400')} />
        {error && <p className="text-red-400 text-sm mb-3">Wrong password</p>}
        <button type="submit" className={cn('w-full py-3 font-semibold rounded-lg transition-colors', theme === 'dark' ? 'bg-white text-[#0d1520] hover:bg-white/90' : 'bg-gray-900 text-white hover:bg-gray-800')}>Enter</button>
      </form>
    </div>
  );
}

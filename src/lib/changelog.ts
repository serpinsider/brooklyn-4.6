/**
 * BROOKLYN MAIDS CHANGELOG
 * Single source of truth for all Brooklyn Maids site changes
 */

export interface ChangelogEntry {
  id: string;
  date: string;
  version?: string;
  type: 'feature' | 'fix' | 'improvement' | 'breaking' | 'security' | 'performance' | 'seo' | 'design';
  category: 'frontend' | 'backend' | 'crm' | 'auth' | 'api' | 'database' | 'seo' | 'ui' | 'infrastructure';
  title: string;
  description: string;
  impactedFiles?: string[];
  relatedFeatures?: string[];
  author?: string;
  metrics?: {
    before?: string;
    after?: string;
    improvement?: string;
  };
  rollbackInstructions?: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    id: 'embed-iframe-rollout-all-sites-2026-03',
    date: '2026-03-08',
    version: '3.6.0',
    type: 'feature',
    category: 'frontend',
    title: 'Replaced all quote forms with centralized embed iframes across all sites',
    description: 'Swapped 131 quote pages (7 Brooklyn + 124 across 19 other sites) from individual QuoteForm/StepWizard/specialty form components to a single QuoteEmbed iframe component pointing to the centralized quote-embed app. Each page uses its site-specific businessId, which drives the correct pricing model, addon configuration, and branding. Main /quote pages and all 6 specialty service quote pages (/services/*/quote) are now embeds. SEO metadata preserved on every page. Old form components are now dead code.',
    impactedFiles: [
      'sites/*/src/components/QuoteEmbed.tsx (new, shared component)',
      'sites/*/src/app/quote/page.tsx (20 sites)',
      'sites/*/src/app/services/*/quote/page.tsx (111 specialty pages)',
    ],
    relatedFeatures: ['quote-embed', 'centralized-forms', 'iframe-integration'],
    metrics: {
      before: '131 individual form components with duplicated logic across 20 sites',
      after: '1 centralized embed app, 131 thin iframe wrapper pages',
      improvement: 'Single source of truth for all quote forms, instant updates across all sites',
    },
  },
  {
    id: 'specialty-form-fields-bot-responses-2026-03',
    date: '2026-03-08',
    version: '3.5.1',
    type: 'improvement',
    category: 'frontend',
    title: 'Optimized specialty service forms and bot responses',
    description: 'Rewrote all 6 specialty service form configs (carpet, car, handyman, commercial, airbnb, post-construction) in the quote-embed with industry-standard fields based on competitor research. Added timeline/urgency, referral source, and service-specific details to each form. Post-construction went from 2 fields to 10 (clean type, project type, sqft, floors, flooring, debris types, high ceilings, utilities). Car detailing added year/make/model, condition, specific concerns. Commercial added floors, restrooms, flooring type, preferred schedule. All bot SMS responses rewritten to be conversational, acknowledge specific details the customer provided, and set expectations for follow-up.',
    impactedFiles: [
      'tools/quote-embed/src/config/services.ts',
      'bots/formspree-quote-bot/prompts.js',
      'bots/formspree-quote-bot/server.js',
    ],
    relatedFeatures: ['quote-embed', 'formspree-bot', 'specialty-services'],
    metrics: {
      before: 'Post-construction: 2 fields, Car: 2 fields, generic bot responses',
      after: 'Post-construction: 10 fields, Car: 7 fields, all forms 5-10 fields with personalized bot responses',
      improvement: 'All 6 specialty forms now collect industry-standard information for accurate quoting',
    },
  },
  {
    id: 'dark-bg-color-standardization-2026-03',
    date: '2026-03-08',
    version: '3.5.0',
    type: 'fix',
    category: 'ui',
    title: 'Standardize dark page backgrounds across all sites',
    description: 'Fixed visual inconsistency where dark pages (quote forms, login, signup, gift cards, privacy, terms, refund, locations) used mismatched background colors. Two separate dark palettes were in use: rgba(30, 35, 40) and rgba(15, 23, 42). All dark page backgrounds now use rgba(15, 23, 42, 1) (fully opaque) matching the nav/header base color. This prevents the light body background (cream/light blue) from bleeding through semi-transparent dark overlays. Also standardized the quote-embed branding config to use the same base dark color (#0f172a) across all businesses.',
    impactedFiles: [
      'All sites: specialty quote pages, login, signup, gift-cards, booking pages',
      'All sites: colors.ts and unified-colors.ts',
      'All sites: globals.css dark mode variables',
      'tools/quote-embed/src/config/businesses.ts',
      'All sites: privacy, refund, terms, contact, locations pages',
    ],
    relatedFeatures: ['quote-embed', 'dark-theme', 'nav-consistency'],
    metrics: {
      before: 'Two dark palettes (rgba(30,35,40) and rgba(15,23,42)) with various opacities (0.90-0.98) causing cream bleed-through',
      after: 'Single unified dark color rgba(15,23,42,1) for all page backgrounds, headers retain slight transparency for blur effects',
      improvement: '~130 files standardized across 15+ sites',
    },
  },
  {
    id: 'cross-site-brooklyn-refs-audit-2026-02',
    date: '2026-02-23',
    version: '3.4.0',
    type: 'fix',
    category: 'frontend',
    title: 'Cross-site audit: removed Brooklyn/NY contamination and fixed form conditioning',
    description: 'Comprehensive audit of all 20+ sites for incorrect Brooklyn/NY references. Fixed: (1) San Jose locations/page.tsx had NY/NJ/CT state mapping logic instead of CA, causing California locations to display as "Connecticut". (2) Fresno locations/page.tsx had NY->Florida mapping instead of CA->California. (3) STL Maids locations/page.tsx had NY->Missouri and IL->New Jersey instead of MO->Missouri and IL->Illinois. (4) Neat Corner locations/page.tsx had NY->Phoenix instead of AZ->Arizona. (5) Santa Monica DeepCleanService.tsx (2 files) and MoveOutService.tsx had hardcoded "New York, NY" hero locations instead of "Santa Monica, CA". (6) Brooklyn StepWizard.tsx was missing insideKitchenCabinets and interiorWindows from move-out auto-includes -- all 19 other sites already had these, so Brooklyn was brought up to parity. (7) Created missing San Jose contact.ts (StructuredData and StepWizard imported from @/lib/contact which did not exist). (8) Rewrote San Jose README.md which still said "Pacific Maids" and referenced Southern California/Los Angeles.',
    impactedFiles: [
      'sites/san-jose-maids/src/app/locations/page.tsx',
      'sites/fresno/src/app/locations/page.tsx',
      'sites/stl-maids/src/app/locations/page.tsx',
      'sites/neat-corner/src/app/locations/page.tsx',
      'sites/santa-monica/src/components/MoveOutService.tsx',
      'sites/santa-monica/src/components/DeepCleanService.tsx',
      'sites/santa-monica/src/components/service-specific/DeepCleanService.tsx',
      'sites/brooklyn/src/components/StepWizard.tsx',
      'sites/san-jose-maids/src/lib/contact.ts',
      'sites/san-jose-maids/README.md',
    ],
    relatedFeatures: ['Locations', 'StepWizard', 'Service Pages', 'StructuredData', 'Brand Consistency'],
    metrics: {
      before: '4 sites with wrong state names, 3 files with wrong city in hero, Brooklyn missing 2 move-out addons, San Jose missing contact.ts',
      after: 'All sites display correct state/city names, move-out auto-includes consistent across all 20 sites, San Jose contact.ts created',
      improvement: 'Eliminated all customer-facing Brooklyn/NY contamination across non-Brooklyn sites',
    },
  },
  {
    id: 'brooklyn-audit-fixes-2026-02',
    date: '2026-02-23',
    version: '3.3.0',
    type: 'fix',
    category: 'frontend',
    title: 'Brooklyn site audit: 14 critical/high/moderate fixes',
    description: 'Comprehensive audit and fix of Brooklyn Maids site. Critical: fixed MM- confirmation prefix to BK-, fixed double response.json() crash on error responses, fixed dead /contact footer link (404) to /#contact, deleted fake apple-touch-icon.png and twitter-image.jpg placeholder text files, fixed service hours mismatch between contact.ts and ContactSection (now uses centralized CONTACT_INFO.hours). High: added missing zip code and square footage input fields to QuoteForm, added isSubmitting state to prevent double-submits, proper error type narrowing in catch blocks. Moderate: removed 5 undefined CSS variables from globals.css, fixed invalid lg:text-medium Tailwind class to lg:text-lg, removed duplicate INLINE_STYLES export from layouts.ts, added id=main-content for skip-link accessibility, replaced raw alert() calls with submitError state display, removed dead estimatedPrice calculation and step 5 references.',
    impactedFiles: [
      'sites/brooklyn/src/components/StepWizard.tsx',
      'sites/brooklyn/src/components/QuoteForm.tsx',
      'sites/brooklyn/src/components/Footer.tsx',
      'sites/brooklyn/src/components/ContactSection.tsx',
      'sites/brooklyn/src/app/layout.tsx',
      'sites/brooklyn/src/app/page.tsx',
      'sites/brooklyn/src/app/globals.css',
      'sites/brooklyn/src/styles/typography.ts',
      'sites/brooklyn/src/styles/layouts.ts',
    ],
    relatedFeatures: ['StepWizard', 'QuoteForm', 'Footer', 'ContactSection', 'Accessibility'],
  },
  {
    id: 'form-propagation-all-sites-2026-02',
    date: '2026-02-23',
    version: '3.3.1',
    type: 'fix',
    category: 'frontend',
    title: 'Propagated form fixes to all 15 sites',
    description: 'Applied all Brooklyn audit fixes (double json crash, confirmation prefix, zip/sqft fields, isSubmitting, error handling, dead code removal) to bayside-maids, cedar-maids, chucktown-maids, neat-corner, nooga, pacific-maids, peoria-maids, pine, sac, san-jose-maids, santa-clarita, santa-monica, stl-maids, tulsa, and vegas. Each site retains its unique branding, formspree ID, phone number, and service area text.',
    impactedFiles: [
      'sites/*/src/components/StepWizard.tsx',
      'sites/*/src/components/QuoteForm.tsx',
    ],
    relatedFeatures: ['StepWizard', 'QuoteForm', 'Form Standardization'],
  },
  {
    id: 'bot-cleanup-2026-02',
    date: '2026-02-23',
    version: '3.3.2',
    type: 'improvement',
    category: 'backend',
    title: 'Bot cleanup: dead code removal, security hardening, sqft fix',
    description: 'Removed dead code from prompts.js (BASE_PRICES, ADDON_PRICES, calculatePrice, 5 unused template functions, legacy mqazolgp form ID, PHONE_NUMBERS const). Server.js: removed DEBUG console.logs, reduced API key logging to 4 chars, fixed square footage normalization (3,000+ no longer downgraded to 2,000+), added requireAuth middleware to all notification/send endpoints to prevent unauthorized SMS sending. Simplified quote SMS template: unified all service types into single template, removed redundant includes description.',
    impactedFiles: [
      'bots/formspree-quote-bot/prompts.js',
      'bots/formspree-quote-bot/server.js',
      'bots/formspree-quote-bot/test-quotes.js',
    ],
    relatedFeatures: ['Quote Bot', 'SMS Templates', 'Security'],
    metrics: {
      before: '136 lines of dead code, 0 authenticated notification endpoints',
      after: 'Clean exports, all 17 notification endpoints authenticated',
      improvement: 'Reduced prompts.js by 108 lines, secured SMS endpoints',
    },
  },
  {
    id: 'form-standardization-all-sites-2026-02',
    date: '2026-02-25',
    version: '3.2.0',
    type: 'improvement',
    category: 'frontend',
    title: 'StepWizard + QuoteForm standardized across all 11 remaining sites',
    description: 'Replaced outdated StepWizard and QuoteForm components across san-jose-maids, tulsa, vegas, cedar-maids, chucktown-maids, nooga, stl-maids, santa-monica, santa-clarita, and sac with the Brooklyn v4 gold standard. All sites now have: frequency field, showAddonsTray with conditional display, wizardRef + stepContentRef refs, new addon fields (stairwayCleaning, dishwasher, superDeepClean), scrollIntoView error scrolling, field IDs for scroll targeting, empty serviceType default, window.scrollTo on review step. Removed legacy interestedInCarpet/interestedInHandyman fields. Each site retains its unique businessId, formspreeId, confirmation prefix, phone placeholder, business name, and service area FAQ text.',
    impactedFiles: [
      'sites/san-jose-maids/src/components/StepWizard.tsx',
      'sites/san-jose-maids/src/components/QuoteForm.tsx',
      'sites/tulsa/src/components/StepWizard.tsx',
      'sites/tulsa/src/components/QuoteForm.tsx',
      'sites/vegas/src/components/StepWizard.tsx',
      'sites/vegas/src/components/QuoteForm.tsx',
      'sites/cedar-maids/src/components/StepWizard.tsx',
      'sites/cedar-maids/src/components/QuoteForm.tsx',
      'sites/chucktown-maids/src/components/StepWizard.tsx',
      'sites/chucktown-maids/src/components/QuoteForm.tsx',
      'sites/nooga/src/components/StepWizard.tsx',
      'sites/nooga/src/components/QuoteForm.tsx',
      'sites/stl-maids/src/components/StepWizard.tsx',
      'sites/stl-maids/src/components/QuoteForm.tsx',
      'sites/santa-monica/src/components/StepWizard.tsx',
      'sites/santa-monica/src/components/QuoteForm.tsx',
      'sites/santa-clarita/src/components/StepWizard.tsx',
      'sites/santa-clarita/src/components/QuoteForm.tsx',
      'sites/sac/src/components/StepWizard.tsx',
      'sites/sac/src/components/QuoteForm.tsx',
    ],
    relatedFeatures: ['form-standardization', 'step-wizard', 'quote-form', 'cross-site-consistency'],
    metrics: {
      before: '5 of 16 sites had Brooklyn-standard forms',
      after: 'All 16 sites now have Brooklyn-standard StepWizard + QuoteForm',
      improvement: '11 sites upgraded: frequency field, addon tray, error scrolling, field IDs, scroll fixes',
    },
  },
  {
    id: 'cross-site-cleanup-batch-2026-01',
    date: '2026-01-25',
    version: '3.1.0',
    type: 'fix',
    category: 'infrastructure',
    title: 'Cross-Site Code Quality Cleanup: Neat Corner, Bayside, and All 17 Sites',
    description: `Comprehensive audit and cleanup of Neat Corner and Bayside Maids, plus batch fixes applied to all remaining sites.

**Neat Corner:**
- Removed PostHog provider wrapper and import from layout.tsx
- Removed duplicate favicon links (7 -> 4)
- Removed PostHog domains from CSP in next.config.ts
- Removed Prisma experimental config from next.config.ts
- Fixed hardcoded phone numbers in HeroSection, SuccessMessage, BaseHero, StepWizard, locations page
- Fixed duplicate scroll-behavior in globals.css
- Added SEO keywords to home page metadata

**Bayside Maids:**
- Removed duplicate favicon links (7 -> 4)
- Removed fake verification codes from metadata
- Removed PostHog domains from CSP in next.config.ts
- Removed Prisma experimental config from next.config.ts
- Fixed hardcoded phone numbers in HeroSection, SuccessMessage, StructuredData (organization schema)
- Cleaned old CRM routes from ConditionalLayout
- Removed all unused CRM dependencies from package.json (prisma, posthog, stripe, fullcalendar, etc.)
- Fixed duplicate scroll-behavior in globals.css
- Added full SEO metadata (title, description, keywords, OG, Twitter) to home page
- Added FAQ schema to home page

**All Sites Batch Fixes:**
- Removed PostHog CSP entries from all next.config.ts files (script-src and connect-src)
- Removed Prisma experimental optimizePackageImports from all next.config.ts files
- Removed duplicate favicon links from all layout.tsx files
- Fixed hardcoded phone numbers in HeroSection.tsx across all sites
- Fixed hardcoded phone numbers in SuccessMessage.tsx across all sites
- Fixed hardcoded phone numbers in BaseHero.tsx across 10 sites
- Fixed hardcoded phone numbers in StepWizard.tsx across 9 sites
- Fixed hardcoded phone numbers in BookingForm.tsx (STL Maids)
- Fixed hardcoded phone numbers in 4 Cedar Maids FAQ section components
- Fixed hardcoded phone numbers in 4 location index pages
- Fixed hardcoded phone in StructuredData.tsx organization schema (Bayside, Chucktown, Nooga, STL, Cedar)
- Zero hardcoded phone numbers remain in any src/ directory across all sites
- Zero PostHog CSP entries remain in any next.config.ts across all sites`,
    impactedFiles: [
      'all sites: src/components/HeroSection.tsx',
      'all sites: src/components/shared/SuccessMessage.tsx',
      'all sites: src/components/shared/BaseHero.tsx',
      'all sites: src/components/StepWizard.tsx',
      'all sites: src/app/layout.tsx',
      'all sites: next.config.ts',
      'bayside-maids: package.json',
      'bayside-maids: src/app/page.tsx',
      'bayside-maids: src/components/ConditionalLayout.tsx',
      'neat-corner: src/app/page.tsx',
    ],
    relatedFeatures: ['CONTACT_INFO centralization', 'CSP security', 'SEO metadata'],
    metrics: {
      before: 'Hardcoded phone numbers in 37+ files, PostHog CSP in 15 configs, duplicate favicons in all sites',
      after: 'Zero hardcoded phones in src/, zero PostHog CSP, clean favicon declarations',
      improvement: 'All sites now use centralized CONTACT_INFO for phone numbers, ensuring consistency',
    },
  },
  {
    id: 'brooklyn-seo-schema-overhaul-2026-01',
    date: '2026-01-25',
    version: '3.0.0',
    type: 'seo',
    category: 'seo',
    title: 'Brooklyn SEO Overhaul: Schema, Service Pages, Locations Hub, Home Page',
    description: `Major SEO overhaul for Brooklyn Maids, implementing the data-driven strategy from GSC analysis.

**Schema Fixes (All Sites):**
- Removed invalid SearchAction from WebSite schema across all 17 sites (no /search page exists)
- Fixed areaServed type from "State" to "City" in Service and Location schema across all 17 sites
- Replaced flat Offer arrays with proper OfferCatalog structure in Service/Location schema
- Added provider URL to all LocalBusiness references in schema

**Brooklyn Service Pages (11 pages):**
- Added Service schema (JSON-LD) to all 11 service pages: deep-clean, move-out, apartment-cleaning, one-time-cleaning, commercial, airbnb, post-construction, event-cleaning, carpet-cleaning, handyman, car-cleaning
- Each service page now has 3 schema types: BreadcrumbList + Service + FAQPage

**Brooklyn Home Page:**
- Added keywords meta tag targeting high-value queries (house cleaning Brooklyn, maid service, etc.)
- Added FAQPage schema via StructuredData component
- Improved meta description to include "all NYC boroughs"

**Brooklyn Locations Hub (/locations):**
- Rebuilt from simple grid into comprehensive Areas We Serve hub
- Lists 8 service areas (Brooklyn, Manhattan, Queens, Bronx, Staten Island, LI, Westchester, NJ)
- Each area shows neighborhood tags (35 Brooklyn neighborhoods, 15 Manhattan, 10 Queens, etc.)
- Added internal links to all 8 service pages in a services grid
- CTA section with quote link (previously only phone/email)

**Brooklyn Location [slug] Pages:**
- Now uses location.description field for richer meta descriptions
- Added Service schema with areaServed (City + containedInPlace State)
- Added OfferCatalog with service listings

**Pine Maids:**
- Fixed StructuredData (removed SearchAction, fixed areaServed types)
- Build verified clean (125 pages)

**Pacific Maids:**
- Fixed StructuredData (removed SearchAction, fixed areaServed types, hardcoded phone in Organization)
- Cleaned layout.tsx (removed duplicate favicon links, commented PostHog imports)
- Build verified clean (80 pages)`,
    impactedFiles: [
      'sites/brooklyn/src/components/StructuredData.tsx',
      'sites/brooklyn/src/app/services/*/page.tsx (all 11)',
      'sites/brooklyn/src/app/page.tsx',
      'sites/brooklyn/src/app/locations/page.tsx',
      'sites/brooklyn/src/app/locations/[slug]/page.tsx',
      'sites/pine/src/components/StructuredData.tsx',
      'sites/pacific-maids/src/components/StructuredData.tsx',
      'sites/pacific-maids/src/app/layout.tsx',
      'sites/*/src/components/StructuredData.tsx (all 17 sites)',
    ],
    relatedFeatures: ['schema', 'structured-data', 'seo', 'service-pages', 'locations'],
    metrics: {
      before: 'No Service schema on any service page, invalid SearchAction on all sites, wrong areaServed types',
      after: 'Service schema on all 11 Brooklyn service pages, clean schema across all 17 sites, proper OfferCatalog structure',
      improvement: 'Rich results eligibility for all service pages, correct schema validation',
    },
  },
  {
    id: 'peoria-site-creation-2026-02',
    date: '2026-02-23',
    version: '2.8.0',
    type: 'feature',
    category: 'frontend',
    title: 'Peoria Maids Site Created + Tulsa Updates + Bot Expansion',
    description: 'Created Peoria Maids site (peoriamaids.com, IL) from Brooklyn template with full rebranding - 15 Central Illinois locations, Brooklyn BookingKoala embed, Formspree mrbjzvde. Updated Tulsa phone to (918) 818-2460, switched Tulsa to Brooklyn BK embed, same Formspree mrbjzvde. Enabled Peoria and San Jose in formspree-quote-bot (ENABLED_BUSINESSES, phone mapping, LOCATION_DETAILS, business name mapping).',
    impactedFiles: [
      'sites/peoria-maids/* (new site)',
      'sites/tulsa/src/config/branding.ts',
      'sites/tulsa/src/components/BookingKoalaEmbed.tsx',
      'bots/formspree-quote-bot/server.js',
      'bots/formspree-quote-bot/prompts.js',
    ],
    relatedFeatures: ['site-creation', 'formspree-bot', 'booking-embed', 'tulsa-updates'],
  },
  {
    id: 'deep-seo-standardization-2026-02',
    date: '2026-02-25',
    version: '2.7.0',
    type: 'improvement',
    category: 'seo',
    title: 'Deep SEO Standardization & Infrastructure Cleanup Across All Sites',
    description: `Comprehensive second pass across all 8 fully-built sites (SM, Cedar, Bayside, Chucktown, Nooga, STL, Santa Clarita, Sac).

**www Domain Consistency (8 sites, ~140 files):**
- Replaced all bare domain URLs with www versions across metadata, canonicals, OG URLs, API routes, StructuredData
- Fixed STL layout.tsx using wrong domain (stlmaids.com -> www.stlouismaids.com)
- Santa Monica: Fixed baysidemaids.com URLs contaminating quote, booking, and locations pages

**Brand/City Contamination Cleanup:**
- Santa Monica: Removed Bayside Maids/Tampa references from 30+ files; removed Arizona/Texas/Nevada and Brooklyn/NYC from service pages; rewrote AreasWeServe, FAQ, reviews for SM/LA
- Sacramento: Fixed Bayside Maids/Tampa in quote/locations/booking; fixed DC/Baltimore FAQ; updated BookingKoala embeds
- Santa Clarita: Removed remaining NYC zip codes, Dallas/Houston review locations
- Cedar: Fixed MESA variable naming to CEDAR in API routes
- Chucktown: Rewrote from Mesa/Phoenix/Chattanooga to Charleston; replaced AZ zips with SC zips
- Nooga: Fixed Mesa references to Nooga in API routes and styles

**Layout.tsx Files Created (31 new files):**
- join-our-team/layout.tsx: 8 sites (OG, Twitter, canonical)
- gift-cards/layout.tsx: 8 sites (OG, Twitter, canonical)
- login/layout.tsx: 7 sites (robots noindex/nofollow)
- signup/layout.tsx: 8 sites (robots noindex/nofollow)
- terms/layout.tsx: 8 sites (OG, Twitter, canonical)
- privacy/layout.tsx: 8 sites (OG, Twitter, canonical)
- refund/layout.tsx: 8 sites (OG, Twitter, canonical)

**robots.txt Updated (8 sites):**
- Added Disallow: /login and Disallow: /signup

**Missing Specialty Quote Pages Created (18 pages):**
- carpet-cleaning/quote, commercial/quote, handyman/quote for 6 sites (Chucktown, Nooga, STL, Santa Clarita, Sac, SM)

**Twitter Card Metadata Added (24 pages):**
- Added twitter cards to quote, locations, and booking pages across 8 sites

**/contact -> /#contact Redirects (8 sites):**
- Added permanent redirect in next.config.ts`,
    impactedFiles: [
      'sites/*/src/app/layout.tsx',
      'sites/*/src/components/StructuredData.tsx',
      'sites/*/src/app/services/*/page.tsx',
      'sites/*/src/app/{terms,privacy,refund}/layout.tsx',
      'sites/*/src/app/{join-our-team,gift-cards,login,signup}/layout.tsx',
      'sites/*/public/robots.txt',
      'sites/*/next.config.ts',
      'sites/*/src/app/{quote,locations,booking}/page.tsx',
    ],
    relatedFeatures: ['SEO', 'Metadata', 'Canonicalization', 'Indexing', 'Brand Identity'],
    metrics: {
      before: 'Mixed www/non-www URLs, missing metadata on 50+ pages, brand contamination, indexable login/signup',
      after: 'Consistent www canonicalization, complete OG+Twitter+canonical on all pages, correct branding, noindex on auth pages',
      improvement: 'Eliminated all SEO canonicalization issues and brand contamination across 8 sites',
    },
  },
  {
    id: 'brand-city-contamination-cleanup-2026-02',
    date: '2026-02-25',
    version: '2.6.0',
    type: 'fix',
    category: 'frontend',
    title: 'Brand/City Contamination Cleanup Across Cedar, Chucktown, and Nooga Sites',
    description: `Comprehensive cleanup of cross-site brand and city contamination across three sites.

**Cedar Maids (Austin, TX):**
- Replaced all Michigan/Grand Rapids/Detroit/Ann Arbor/Cleveland references with Austin, Round Rock, Cedar Park, Georgetown, Pflugerville
- Fixed StructuredData.tsx with correct Austin geo coordinates and TX cities
- Fixed all service page descriptions, FAQ sections, AreasWeServe, Footer, layout metadata
- Fixed API routes (complete-job, submit-rating) fallback URLs from brooklynmaids.com to cedarmaids.com
- Updated contact info, locations, carpet/handyman review sections with Austin neighborhoods
- 45+ files updated

**Chucktown Maids (Charleston, SC):**
- Replaced all Chattanooga/North Shore/Southside/Red Bank references with Charleston, Mount Pleasant, West Ashley, James Island, Summerville
- Fixed API routes fallback URLs from brooklynmaids.com to chucktownmaids.com
- Updated AreasWeServeSection with proper Charleston/Lowcountry areas
- Updated carpet/handyman review sections with Charleston neighborhoods
- Fixed "Bayside Maids" references to "Chucktown Maids" in forms
- 16+ files updated

**Nooga Maids (Chattanooga, TN):**
- Replaced all Mesa/Phoenix/Tempe/Scottsdale/Arizona references with Chattanooga area cities
- Fixed "Serving Brooklyn, Tennessee" to "Serving Chattanooga, Tennessee" on quote page
- Fixed locations page from Tempe/Scottsdale to Red Bank/Signal Mountain/Hixson/Ooltewah
- Fixed API routes fallback URLs from brooklynmaids.com to noogamaids.com
- Rewrote FAQSection service areas from Greater Phoenix to Greater Chattanooga
- Rewrote AreasWeServe component from AZ cities to TN cities
- Updated all service page descriptions, review sections, constants, PostHog config
- 30+ files updated

**Common fixes across all three sites:**
- "Bayside Maids" -> correct brand name in quote/booking forms
- brooklynmaids.com fallback URLs -> correct site domains in complete-job and submit-rating routes
- Brooklyn neighborhood locations in review sections -> local neighborhoods
- auth.ts noreply email -> correct domain`,
    impactedFiles: [
      'sites/cedar-maids/src/** (45+ files)',
      'sites/chucktown-maids/src/** (16+ files)',
      'sites/nooga/src/** (30+ files)',
    ],
    relatedFeatures: ['SEO', 'Brand Identity', 'Email Notifications', 'Service Areas'],
    metrics: {
      before: 'Dozens of cross-site brand contamination instances across 3 sites',
      after: 'All customer-facing content correctly branded for each city/site',
      improvement: 'Eliminated incorrect city/brand references that could confuse customers and hurt local SEO',
    },
  },
  {
    id: 'multi-site-brooklyn-standardization-2026-02',
    date: '2026-02-24',
    version: '2.5.0',
    type: 'improvement',
    category: 'frontend',
    title: 'Brooklyn-Level Standardization Across All 14 Sites',
    description: `Comprehensive standardization of all cleaning sites to match the Brooklyn gold standard.

**San Jose Maids (New Site Completion):**
- Created 6 specialty service quote pages (carpet, car, airbnb, post-construction, commercial, handyman)
- Created 6 specialty QuoteForm components + 6 specialty StepWizard components
- Created sitemap.ts with all services, locations (15), and quote subpages
- Created join-our-team layout.tsx with full SEO metadata (OG, Twitter, canonical)
- All components branded for San Jose Maids with SJ- confirmation prefix

**StepWizard Scroll Fix (All 10 Remaining Sites):**
- Replaced inconsistent scroll behavior with window.scrollTo(0, 0) on review step
- Added error scrolling to first invalid field using requestAnimationFrame + scrollIntoView
- Added field IDs (field-serviceType, field-zipCode, etc.) for precise error targeting
- Sites: Tulsa, Vegas, Santa Monica, Cedar, Bayside, Chucktown, Nooga, STL, Santa Clarita, Sac

**Addons Standardization (All 10 Sites):**
- Added missing addons to reach Brooklyn's full 23-addon set
- New addons: dishwasher, stairwayCleaning, superDeepClean, handymanServices, townhouse, insideKitchenCabinets, extraHour
- Created new addons.ts for Vegas (had none)

**Confirmation Prefix Fixes:**
- Santa Monica: MM- -> SM-
- Cedar: MM- -> CD-
- Nooga: MM- -> NG-
- Santa Clarita: MM- -> SC-
- Sac: MM- -> SAC-
- Chucktown: MM- -> CT- (StepWizard), BK- -> CT- (QuoteForm)
- STL: MM- -> STL- (StepWizard), BK- -> STL- (QuoteForm)
- Fixed BK- prefix in QuoteForm.tsx for SM, Cedar, Nooga, SC, Sac

**BusinessId Fix:**
- STL QuoteForm: stl-maids -> stl (consistent with StepWizard)

**Bayside QuoteForm Fix:**
- Added missing _subject and business fields to form submission data

**sourcePage Tracking (All 10 Sites):**
- Added sourcePage field to StepWizard.tsx (10 sites)
- Added sourcePage field to QuoteForm.tsx (10 sites)
- Added sourcePage field to ContactSection.tsx (10 sites)
- Added sourcePage field to QuoteRequestForm.tsx (7 sites that have it)`,
    impactedFiles: [
      'sites/san-jose-maids/src/components/StepWizard.tsx',
      'sites/san-jose-maids/src/components/specialty-wizards/*.tsx',
      'sites/san-jose-maids/src/components/*QuoteForm.tsx',
      'sites/san-jose-maids/src/app/services/*/quote/page.tsx',
      'sites/san-jose-maids/src/app/sitemap.ts',
      'sites/san-jose-maids/src/app/join-our-team/layout.tsx',
      'sites/*/src/components/StepWizard.tsx',
      'sites/*/src/components/QuoteForm.tsx',
      'sites/*/src/components/ContactSection.tsx',
      'sites/*/src/components/QuoteRequestForm.tsx',
      'sites/*/src/lib/constants/addons.ts',
    ],
    relatedFeatures: ['Forms', 'Lead Tracking', 'UX', 'Addons', 'SEO'],
    metrics: {
      before: 'Inconsistent prefixes (MM-, BK-), missing addons (15-18), no sourcePage tracking, no error scrolling',
      after: 'All 14 sites: unique prefixes, 23 addons, sourcePage on all forms, scroll-to-error on validation',
      improvement: 'Complete standardization across all sites',
    },
  },
  {
    id: 'brooklyn-keyword-copy-optimization-2026-02',
    date: '2026-02-21',
    version: '2.4.0',
    type: 'seo',
    category: 'seo',
    title: 'Keyword Optimization, Copy Improvements & Accessibility',
    description: `Deep content and keyword audit with targeted improvements across the Brooklyn Maids site.

**Review Count (171 - Google GMB):**
- Updated all review counts from 3,000+ to 171 across 18+ files
- StructuredData reviewCount updated to 171
- Announcement bar updated to "4.9 stars from 171 Google reviews"

**Keyword Optimization:**
- Homepage H1: "Book a Housekeeper in 60 Seconds" changed to "Book a Housekeeper in Brooklyn in 60 Seconds"
- 6 service page hero H1s changed from "in NYC" to "in Brooklyn & NYC" (Carpet, Commercial, Handyman, Airbnb, Event, Post-Construction)
- Review locations updated with specific Brooklyn neighborhoods (Park Slope, Williamsburg, Brooklyn Heights, DUMBO, Prospect Heights, Crown Heights)

**Sitemap Cleanup:**
- Removed /login page from sitemap (shouldn't be indexed)

**Accessibility:**
- Added aria-labels to all Header icon links (Call/Text)
- Added skip navigation link to layout.tsx
- Improved image alt text from generic "Customer X" to "Brooklyn Maids customer X"`,
    impactedFiles: [
      'src/components/HeroSection.tsx',
      'src/components/ReviewsSection.tsx',
      'src/components/AnnouncementBar.tsx',
      'src/components/StructuredData.tsx',
      'src/components/Header.tsx',
      'src/components/shared/BaseHero.tsx',
      'src/components/service-specific/*Hero.tsx',
      'src/app/sitemap.ts',
      'src/app/layout.tsx',
    ],
    relatedFeatures: ['SEO', 'Local SEO', 'Accessibility', 'Keywords'],
  },
  {
    id: 'brooklyn-seo-cro-improvements-2026-02',
    date: '2026-02-21',
    version: '2.3.0',
    type: 'improvement',
    category: 'seo',
    title: 'SEO & Conversion Rate Improvements',
    description: `Comprehensive SEO and CRO improvements across the Brooklyn Maids site.

**Conversion Rate (CRO):**
- Added step progress indicator to StepWizard ("Step 1 of 2" with gold dot/line tracker)
- Standardized all review counts to 3,000+ across 15+ files (was inconsistent: 141, 267, 3,000+)
- Strengthened announcement bar: specific messages with clickable CTAs instead of vague text
- Added 3 new FAQ questions: how pricing works, satisfaction guarantee details, and clearer cancellation policy

**SEO - Meta Descriptions:**
- Deep Clean page: trimmed from 218 chars to 152 chars
- Move Out page: trimmed from 178 chars to 153 chars (both now under 155 char limit)

**SEO - Structured Data:**
- Added FAQ schema (FAQPage) to deep-clean, move-out, carpet-cleaning, and commercial service pages
- Added BreadcrumbList schema to all 4 service pages and all 26 location pages (dynamic)
- Added breadcrumb type to StructuredData component for reusability
- Updated StructuredData reviewCount from 267 to 3000 to match site-wide consistency

**Performance:**
- Added preload="none" to hero video to avoid blocking LCP on page load`,
    impactedFiles: [
      'src/components/StepWizard.tsx',
      'src/components/AnnouncementBar.tsx',
      'src/components/FAQSection.tsx',
      'src/components/StructuredData.tsx',
      'src/components/service-specific/DeepCleanReviewsSection.tsx',
      'src/components/service-specific/MoveOutReviewsSection.tsx',
      'src/components/HeroSection.tsx',
      'src/app/services/deep-clean/page.tsx',
      'src/app/services/move-out/page.tsx',
      'src/app/services/carpet-cleaning/page.tsx',
      'src/app/services/commercial/page.tsx',
      'src/app/locations/[slug]/page.tsx',
    ],
    relatedFeatures: ['SEO', 'Structured Data', 'CRO', 'FAQ Schema', 'Breadcrumbs'],
    metrics: {
      before: 'No FAQ schema on service pages, no breadcrumbs, inconsistent review counts, meta descriptions over 155 chars',
      after: 'FAQ schema on 4 service pages, breadcrumbs on all service + location pages, unified 3,000+ count, all metas under 155 chars',
    },
  },
  {
    id: 'brooklyn-header-rewrite-hardcode-cleanup-2026-02',
    date: '2026-02-21',
    version: '2.2.0',
    type: 'fix',
    category: 'ui',
    title: 'Header Rewrite & Hardcoded Values Cleanup',
    description: `Rewrote Header component with standard scroll behavior and cleaned up all hardcoded contact info across the site.

**Header Rewrite:**
- Replaced complex two-row collapsing header with single-row standard layout
- Contact icons left, centered logo, nav + CTA right on desktop/tablet
- Proper scroll behavior: transparent at top, solid dark background with blur on scroll
- Height transitions smoothly from h-20/h-24 to h-16 on scroll
- Uses Tailwind classes instead of inline style calculations
- Mobile hamburger menu unchanged

**Hardcoded Values Cleanup:**
- Replaced all hardcoded tel:/sms: hrefs with CONTACT_INFO references across 8 components
- HeroSection, BaseHero, ContactSection, StructuredData, SuccessMessage, QuoteForm, RefundClient, locations/page
- All phone display text now uses CONTACT_INFO.phone.display
- StructuredData Organization schema now uses CONTACT_INFO.phone.raw`,
    impactedFiles: [
      'src/components/Header.tsx',
      'src/components/HeroSection.tsx',
      'src/components/shared/BaseHero.tsx',
      'src/components/ContactSection.tsx',
      'src/components/StructuredData.tsx',
      'src/components/shared/SuccessMessage.tsx',
      'src/components/QuoteForm.tsx',
      'src/app/refund/RefundClient.tsx',
      'src/app/locations/page.tsx',
    ],
    relatedFeatures: ['Header', 'Navigation', 'Branding Consistency'],
  },
  {
    id: 'brooklyn-ux-responsive-fixes-2026-02',
    date: '2026-02-21',
    version: '2.1.0',
    type: 'fix',
    category: 'ui',
    title: 'UX & Responsive Design Overhaul',
    description: `Fixed critical UX issues and tablet responsive breakpoints across Brooklyn Maids site.

**Scroll Bug Fix:**
- StepWizard: Added ref-based scroll fallback so confirmation message scrolls into view on /quote page (previously only worked on homepage hero)
- Wrapped SuccessMessage in ref container for proper scroll targeting

**Tablet Breakpoint Fixes (md: 768px-1024px):**
- HeroSection: Changed from lg:grid-cols-2 to md:grid-cols-2 so hero content and form show side-by-side on tablet
- Header: Desktop navigation now shows at md breakpoint instead of lg (tablet gets proper nav, not hamburger menu)
- ContactSection: Grid changed from lg:grid-cols-2 to md:grid-cols-2
- StepWizard frequency buttons: Changed md:grid-cols-4 to lg:grid-cols-4 to avoid cramming 4 buttons on tablet
- StepWizard contact fields: Changed md:grid-cols-3 to sm:grid-cols-2 lg:grid-cols-3 for smoother progression

**Text Size Fixes:**
- QuoteBar: Increased base text from text-[10px] to text-xs (10px to 12px)
- CallOrTextBar: Same fix from text-[10px] to text-xs
- WhatWeCleanSection: Table text increased from text-[11px] to text-xs
- ServicesSection: Feature text increased from text-xs to text-sm
- HowItWorksSection: Added responsive text sizing for step titles and descriptions

**Spacing & Layout:**
- AreasWeServeSection: Added responsive card padding (p-6 md:p-5 lg:p-8) and gap sizing
- HeroSection: Removed forced min-w-[400px] on form card that broke smaller tablets
- ContactSection: Fixed redundant typography classes`,
    impactedFiles: [
      'src/components/StepWizard.tsx',
      'src/components/HeroSection.tsx',
      'src/components/Header.tsx',
      'src/components/QuoteBar.tsx',
      'src/components/CallOrTextBar.tsx',
      'src/components/ContactSection.tsx',
      'src/components/HowItWorksSection.tsx',
      'src/components/WhatWeCleanSection.tsx',
      'src/components/AreasWeServeSection.tsx',
      'src/components/ServicesSection.tsx',
    ],
    relatedFeatures: ['Responsive Design', 'UX', 'Tablet Support'],
    metrics: {
      before: 'Missing md: breakpoints, 10px text on CTAs, scroll bug on /quote, mobile menu on tablet',
      after: 'Proper tablet layouts, readable text at all sizes, scroll works everywhere, desktop nav on tablet',
    },
  },
  {
    id: 'brooklyn-full-seo-audit-2026-02',
    date: '2026-02-21',
    version: '2.0.0',
    type: 'fix',
    category: 'seo',
    title: 'Full SEO Audit & Critical Branding Fix',
    description: `Comprehensive audit and fix of Brooklyn Maids site addressing critical branding, SEO, and form submission issues.

**Critical Fixes:**
- Fixed Formspree ID: StepWizard.tsx and QuoteForm.tsx were using wrong ID (mrbjzvde), corrected to mqazolgp
- Removed ALL "Vegas Maids" references from 6 quote forms, 3 review sections, and consent text
- Fixed 12 confirmation number prefixes from VG- to BK-
- Fixed 6 zip code placeholders from 89101 (Las Vegas) to 11201 (Brooklyn)
- Fixed wrong phone numbers in StepWizard placeholder and QuoteForm href
- Fixed 6 quote layout.tsx files with unreplaced [DOMAIN] and [BUSINESS_NAME] placeholders
- Fixed broken OG image path (/og-image.jpg to /ogs-image.jpg)
- Removed all "Las Vegas" references from car cleaning hero and 5 review sections

**SEO Improvements:**
- Added canonical URLs to 18 pages that were missing them
- Added metadata to homepage (was empty), contact page, and login page
- Created proper 404 not-found page with navigation links
- Added event-cleaning and post-construction links to footer (were orphaned)
- Fixed 9 service component location defaults from "New York, NY" to "Brooklyn, NY"

**SEO Audit Results (Clean):**
- No keyword cannibalization detected across title tags
- No duplicate meta descriptions
- All pages have exactly one H1 tag
- Structured data (LocalBusiness, Organization, Website, FAQ) verified correct
- Sitemap covers all 57 pages
- robots.txt properly configured`,
    impactedFiles: [
      'src/components/StepWizard.tsx',
      'src/components/QuoteForm.tsx',
      'src/components/PostConstructionQuoteForm.tsx',
      'src/components/CommercialQuoteForm.tsx',
      'src/components/CarpetQuoteForm.tsx',
      'src/components/CarCleaningQuoteForm.tsx',
      'src/components/AirbnbQuoteForm.tsx',
      'src/components/HandymanQuoteForm.tsx',
      'src/components/Footer.tsx',
      'src/components/service-specific/*.tsx',
      'src/components/specialty-wizards/*.tsx',
      'src/app/not-found.tsx',
      'src/app/*/page.tsx',
      'src/app/services/*/quote/layout.tsx',
    ],
    relatedFeatures: ['SEO', 'Formspree', 'Branding', 'Schema'],
    metrics: {
      before: '18 pages missing canonical URLs, 6 forms with wrong branding, wrong Formspree ID on main forms',
      after: 'All pages have canonical URLs, all forms correctly branded, correct Formspree ID everywhere',
      improvement: 'Fixed critical branding issues that could confuse customers and search engines',
    },
  },
];

export default CHANGELOG;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.usefathom.com https://accounts.google.com https://apis.google.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "media-src 'self' blob:",
              "connect-src 'self' https://cdn.usefathom.com https://*.googleapis.com https://*.googleusercontent.com https://formspree.io",
              "frame-src 'self' https://accounts.google.com https://*.bookingkoala.com https://quote-embed.vercel.app http://127.0.0.1:3099 http://localhost:3099",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' }
        ]
      }
    ];
  },
  
  async redirects() {
    return [
      // ================================================================
      // LOCATION x SERVICE COMBOS → CORRESPONDING SERVICE PAGE
      // ================================================================
      // These redirect to the actual service page so Google consolidates
      // authority on /services/deep-clean instead of /locations/X/deep-clean
      { source: '/locations/:location/residential', destination: '/', permanent: true },
      { source: '/locations/:location/deep-clean', destination: '/services/deep-clean', permanent: true },
      { source: '/locations/:location/move-out', destination: '/services/move-out', permanent: true },
      { source: '/locations/:location/commercial', destination: '/services/commercial', permanent: true },
      { source: '/locations/:location/airbnb', destination: '/services/airbnb', permanent: true },
      { source: '/locations/:location/handyman', destination: '/services/handyman', permanent: true },
      { source: '/locations/:location/post-construction', destination: '/services/post-construction', permanent: true },
      { source: '/locations/:location/carpet-cleaning', destination: '/services/carpet-cleaning', permanent: true },
      { source: '/locations/:location/car-cleaning', destination: '/services/car-cleaning', permanent: true },
      { source: '/locations/:location/event-cleaning', destination: '/services/event-cleaning', permanent: true },
      { source: '/locations/:location/laundry', destination: '/', permanent: true },
      { source: '/locations/:location/real-estate', destination: '/services/commercial', permanent: true },
      { source: '/locations/:location/house-cleaning', destination: '/', permanent: true },
      { source: '/locations/:location/business', destination: '/services/commercial', permanent: true },

      // ================================================================
      // ALL BROOKLYN NEIGHBORHOODS → HOME PAGE
      // ================================================================
      // These neighborhoods are within our core Brooklyn market.
      // The home page should rank for all Brooklyn cleaning queries.
      { source: '/locations/albemarle', destination: '/', permanent: true },
      { source: '/locations/atlantic-terminal', destination: '/', permanent: true },
      { source: '/locations/bath-beach', destination: '/', permanent: true },
      { source: '/locations/bay-ridge', destination: '/', permanent: true },
      { source: '/locations/bearden', destination: '/', permanent: true },
      { source: '/locations/bedford-stuyvesant', destination: '/', permanent: true },
      { source: '/locations/bensonhurst', destination: '/', permanent: true },
      { source: '/locations/bergen-beach', destination: '/', permanent: true },
      { source: '/locations/boerum-hill', destination: '/', permanent: true },
      { source: '/locations/borough-park', destination: '/', permanent: true },
      { source: '/locations/brighton-beach', destination: '/', permanent: true },
      { source: '/locations/broadway-junction', destination: '/', permanent: true },
      { source: '/locations/brooklyn-heights', destination: '/', permanent: true },
      { source: '/locations/brooklyn-navy-yard', destination: '/', permanent: true },
      { source: '/locations/brownsville', destination: '/', permanent: true },
      { source: '/locations/bushwick', destination: '/', permanent: true },
      { source: '/locations/canarsie', destination: '/', permanent: true },
      { source: '/locations/carroll-gardens', destination: '/', permanent: true },
      { source: '/locations/city-line', destination: '/', permanent: true },
      { source: '/locations/clinton-hill', destination: '/', permanent: true },
      { source: '/locations/cobble-hill', destination: '/', permanent: true },
      { source: '/locations/columbia-street-waterfront', destination: '/', permanent: true },
      { source: '/locations/coney-island', destination: '/', permanent: true },
      { source: '/locations/crown-heights', destination: '/', permanent: true },
      { source: '/locations/cypress-hills', destination: '/', permanent: true },
      { source: '/locations/dahill', destination: '/', permanent: true },
      { source: '/locations/downtown-brooklyn', destination: '/', permanent: true },
      { source: '/locations/dumbo', destination: '/', permanent: true },
      { source: '/locations/dyker-beach-park', destination: '/', permanent: true },
      { source: '/locations/dyker-heights', destination: '/', permanent: true },
      { source: '/locations/east-flatbush', destination: '/', permanent: true },
      { source: '/locations/east-new-york', destination: '/', permanent: true },
      { source: '/locations/east-williamsburg', destination: '/', permanent: true },
      { source: '/locations/erasmus', destination: '/', permanent: true },
      { source: '/locations/farragut', destination: '/', permanent: true },
      { source: '/locations/flatbush', destination: '/', permanent: true },
      { source: '/locations/flatlands', destination: '/', permanent: true },
      { source: '/locations/floyd-bennett-field', destination: '/', permanent: true },
      { source: '/locations/fort-greene', destination: '/', permanent: true },
      { source: '/locations/fort-hamilton', destination: '/', permanent: true },
      { source: '/locations/georgetown', destination: '/', permanent: true },
      { source: '/locations/gerritsen-beach', destination: '/', permanent: true },
      { source: '/locations/gowanus', destination: '/', permanent: true },
      { source: '/locations/gravesend', destination: '/', permanent: true },
      { source: '/locations/greenpoint', destination: '/', permanent: true },
      { source: '/locations/greenwood-cemetery', destination: '/', permanent: true },
      { source: '/locations/greenwood-heights', destination: '/', permanent: true },
      { source: '/locations/highland-park', destination: '/', permanent: true },
      { source: '/locations/homecrest', destination: '/', permanent: true },
      { source: '/locations/industry-city', destination: '/', permanent: true },
      { source: '/locations/kensington', destination: '/', permanent: true },
      { source: '/locations/los-sures-southside', destination: '/', permanent: true },
      { source: '/locations/madison', destination: '/', permanent: true },
      { source: '/locations/manhattan-beach', destination: '/', permanent: true },
      { source: '/locations/mapleton', destination: '/', permanent: true },
      { source: '/locations/marine-park', destination: '/', permanent: true },
      { source: '/locations/midwood', destination: '/', permanent: true },
      { source: '/locations/midwood-park', destination: '/', permanent: true },
      { source: '/locations/mill-basin', destination: '/', permanent: true },
      { source: '/locations/navy-yard', destination: '/', permanent: true },
      { source: '/locations/new-lots', destination: '/', permanent: true },
      { source: '/locations/northside', destination: '/', permanent: true },
      { source: '/locations/ocean-hill', destination: '/', permanent: true },
      { source: '/locations/paerdegat', destination: '/', permanent: true },
      { source: '/locations/park-slope', destination: '/', permanent: true },
      { source: '/locations/parkville', destination: '/', permanent: true },
      { source: '/locations/prospect-heights', destination: '/', permanent: true },
      { source: '/locations/prospect-lefferts-gardens', destination: '/', permanent: true },
      { source: '/locations/prospect-park-south', destination: '/', permanent: true },
      { source: '/locations/red-hook', destination: '/', permanent: true },
      { source: '/locations/remsen-village', destination: '/', permanent: true },
      { source: '/locations/seagate', destination: '/', permanent: true },
      { source: '/locations/sheepshead-bay', destination: '/', permanent: true },
      { source: '/locations/south-slope', destination: '/', permanent: true },
      { source: '/locations/south-williamsburg', destination: '/', permanent: true },
      { source: '/locations/starrett-city', destination: '/', permanent: true },
      { source: '/locations/stuyvesant-heights', destination: '/', permanent: true },
      { source: '/locations/sunset-park', destination: '/', permanent: true },
      { source: '/locations/victorian-flatbush', destination: '/', permanent: true },
      { source: '/locations/vinegar-hill', destination: '/', permanent: true },
      { source: '/locations/williamsburg', destination: '/', permanent: true },
      { source: '/locations/windsor-terrace', destination: '/', permanent: true },

      // ================================================================
      // WESTCHESTER NEIGHBORHOODS → /locations/westchester
      // ================================================================
      { source: '/locations/rye', destination: '/locations/westchester', permanent: true },
      { source: '/locations/scarsdale', destination: '/locations/westchester', permanent: true },

      // ================================================================
      // REMOVED OUT-OF-MARKET LOCATIONS → HOME PAGE
      // ================================================================
      // v3 had pages for cities across the US (Boston, Chicago, etc.)
      { source: '/locations/atlanta', destination: '/', permanent: true },
      { source: '/locations/allston', destination: '/', permanent: true },
      { source: '/locations/back-bay', destination: '/', permanent: true },
      { source: '/locations/baltimore', destination: '/', permanent: true },
      { source: '/locations/beacon-hill', destination: '/', permanent: true },
      { source: '/locations/boston', destination: '/', permanent: true },
      { source: '/locations/bridgehampton', destination: '/', permanent: true },
      { source: '/locations/brighton', destination: '/', permanent: true },
      { source: '/locations/brookline', destination: '/', permanent: true },
      { source: '/locations/chicago', destination: '/', permanent: true },
      { source: '/locations/philadelphia', destination: '/', permanent: true },
      { source: '/locations/weehawken', destination: '/', permanent: true },
      { source: '/locations/fort-lee', destination: '/', permanent: true },
      { source: '/locations/edgewater', destination: '/', permanent: true },
      { source: '/locations/greenwich', destination: '/', permanent: true },
      { source: '/locations/stamford', destination: '/', permanent: true },
      { source: '/locations/norwalk', destination: '/', permanent: true },
      { source: '/locations/bayonne', destination: '/', permanent: true },
      { source: '/locations/albany', destination: '/', permanent: true },

      // ================================================================
      // DEPRECATED SERVICE PAGES → APPROPRIATE DESTINATION
      // ================================================================
      { source: '/services/residential', destination: '/', permanent: true },
      { source: '/services/residential/:path*', destination: '/', permanent: true },
      { source: '/services/laundry', destination: '/', permanent: true },
      { source: '/services/real-estate', destination: '/services/commercial', permanent: true },
      { source: '/services/office-cleaning', destination: '/services/commercial', permanent: true },
      { source: '/services/office-cleaning/:path*', destination: '/services/commercial', permanent: true },
      { source: '/services/business', destination: '/services/commercial', permanent: true },
      { source: '/services/green-cleaning', destination: '/', permanent: true },
      { source: '/services/holiday-cleaning', destination: '/', permanent: true },
      { source: '/services/spring-cleaning', destination: '/', permanent: true },
      { source: '/services/tile-grout-cleaning', destination: '/services/carpet-cleaning', permanent: true },
      { source: '/services/upholstery-cleaning', destination: '/services/carpet-cleaning', permanent: true },
      { source: '/services/moving', destination: '/services/move-out', permanent: true },
      { source: '/services/house-cleaning', destination: '/', permanent: true },

      // ================================================================
      // CONTENT PAGES → HOME PAGE
      // ================================================================
      { source: '/faq', destination: '/#faq', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/offers', destination: '/', permanent: true },
      { source: '/what-we-clean', destination: '/', permanent: true },
      { source: '/about', destination: '/', permanent: true },

      // ================================================================
      // MISC REDIRECTS
      // ================================================================
      { source: '/become-a-cleaner', destination: '/join-our-team', permanent: true },
      { source: '/commercial-quote', destination: '/services/commercial', permanent: true },
      { source: '/quote-bk', destination: '/quote', permanent: true },
      { source: '/auth', destination: '/login', permanent: true },
      { source: '/reddit-communities', destination: '/', permanent: true },
      { source: '/site-map', destination: '/', permanent: true },
      { source: '/careers', destination: '/join-our-team', permanent: true },
      { source: '/refunds', destination: '/refund', permanent: true },
      { source: '/sms-privacy', destination: '/privacy', permanent: true },
      { source: '/confirmation', destination: '/', permanent: true },
      { source: '/confirmation/:path*', destination: '/', permanent: true },

      // ================================================================
      // BLOG → HOME PAGE (0 clicks from 43K+ impressions)
      // ================================================================
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:slug*', destination: '/', permanent: true },

      // ================================================================
      // /services INDEX → HOME PAGE SERVICES SECTION
      // ================================================================
      { source: '/services', destination: '/#services', permanent: true },
    ];
  },
};

export default nextConfig;

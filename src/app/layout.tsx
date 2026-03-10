import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ConditionalLayout from "@/components/ConditionalLayout";
import ScrollRestoration from "@/components/ScrollRestoration";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brooklynmaids.com'),
  title: {
    default: "Brooklyn Maids - House Cleaning & Maid Service in NYC",
    template: "%s"
  },
  description: "Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Deep cleaning, move-out cleaning, carpet cleaning, and more. Same-day service available. Book online today!",
  authors: [{ name: "Brooklyn Maids" }],
  creator: "Brooklyn Maids",
  publisher: "Brooklyn Maids",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 160,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brooklynmaids.com",
    title: "Brooklyn Maids - House Cleaning & Maid Service in NYC",
    description: "Professional house cleaning and maid service serving Brooklyn, Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Same-day service available.",
    siteName: "Brooklyn Maids",
    images: [
      {
        url: "https://brooklynmaids.com/ogs-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brooklyn Maids - House Cleaning Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brooklyn Maids - House Cleaning & Maid Service in NYC",
    description: "Professional house cleaning and maid service in Brooklyn, Manhattan, Queens, Bronx, Long Island, Westchester, and Northern NJ. Same-day service available.",
    creator: "@brooklynmaids",
    images: ["https://brooklynmaids.com/ogs-image.jpg"],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-[#dfbd69] focus:text-slate-900 focus:px-4 focus:py-2 focus:font-semibold">Skip to main content</a>
        {/* Fathom Analytics */}
        <Script 
          src="https://cdn.usefathom.com/script.js" 
          data-site="RWJILRWV"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H9VE915XHV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H9VE915XHV');`}
        </Script>
        <ScrollRestoration />
        <StructuredData type="local-business" />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>

      </body>
    </html>
  );
}
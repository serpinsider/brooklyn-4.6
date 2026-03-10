import { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Service Areas | House Cleaning Across NYC & NJ - Brooklyn Maids',
  description: 'Brooklyn Maids serves all NYC boroughs, Long Island, Westchester, and Northern New Jersey. Find house cleaning services in Brooklyn, Manhattan, Queens, Bronx, Staten Island, Jersey City, and Hoboken.',
  alternates: {
    canonical: 'https://brooklynmaids.com/locations',
  },
  openGraph: {
    title: 'Service Areas | House Cleaning Across NYC & NJ - Brooklyn Maids',
    description: 'Brooklyn Maids serves all NYC boroughs, Long Island, Westchester, and Northern NJ. Licensed, insured, and trusted by thousands.',
    url: 'https://brooklynmaids.com/locations',
    siteName: 'Brooklyn Maids',
    images: [{ url: '/ogs-image.jpg', width: 1200, height: 630, alt: 'Brooklyn Maids Service Areas' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Areas | House Cleaning Across NYC & NJ - Brooklyn Maids',
    description: 'Brooklyn Maids serves all NYC boroughs, Long Island, Westchester, and Northern NJ.',
    images: ['/ogs-image.jpg'],
  },
};

const serviceAreas = {
  brooklyn: {
    title: "Brooklyn",
    link: "/locations/brooklyn",
    neighborhoods: [
      "Park Slope", "Williamsburg", "Brooklyn Heights", "DUMBO", "Downtown Brooklyn",
      "Fort Greene", "Prospect Heights", "Carroll Gardens", "Cobble Hill", "Boerum Hill",
      "Red Hook", "Gowanus", "Sunset Park", "Crown Heights", "Bedford-Stuyvesant",
      "Bushwick", "Greenpoint", "Clinton Hill", "Windsor Terrace", "Bay Ridge",
      "Flatbush", "Flatlands", "Bensonhurst", "Borough Park", "Brighton Beach",
      "Coney Island", "Dyker Heights", "East Flatbush", "East New York", "Kensington",
      "Marine Park", "Midwood", "Mill Basin", "Sheepshead Bay", "Canarsie"
    ]
  },
  manhattan: {
    title: "Manhattan",
    link: "/locations/manhattan",
    neighborhoods: [
      "Upper East Side", "Upper West Side", "Tribeca", "SoHo", "Chelsea",
      "West Village", "East Village", "Greenwich Village", "Midtown", "Financial District",
      "Battery Park City", "Gramercy", "Murray Hill", "Hell's Kitchen", "Harlem"
    ]
  },
  queens: {
    title: "Queens",
    link: "/locations/queens",
    neighborhoods: [
      "Astoria", "Long Island City", "Forest Hills", "Bayside", "Flushing",
      "Jamaica", "Elmhurst", "Jackson Heights", "Woodside", "Sunnyside"
    ]
  },
  bronx: {
    title: "Bronx",
    link: "/locations/bronx",
    neighborhoods: [
      "Riverdale", "Pelham Bay", "City Island", "Fordham", "Kingsbridge",
      "Morris Park", "Throgs Neck", "Co-op City", "Bedford Park", "Norwood"
    ]
  },
  statenIsland: {
    title: "Staten Island",
    link: "/locations/staten-island",
    neighborhoods: [
      "St. George", "Stapleton", "Tottenville", "Great Kills", "New Dorp", "Annadale"
    ]
  },
  longIsland: {
    title: "Long Island",
    link: "/locations/long-island",
    neighborhoods: [
      "Great Neck", "Manhasset", "Garden City", "Port Washington", "Roslyn",
      "East Hampton", "Southampton", "Bridgehampton", "Montauk", "Sag Harbor"
    ]
  },
  westchester: {
    title: "Westchester County",
    link: "/locations/westchester",
    neighborhoods: [
      "Scarsdale", "Rye", "White Plains", "Bronxville", "Yonkers",
      "New Rochelle", "Larchmont", "Mamaroneck", "Pelham", "Harrison"
    ]
  },
  newJersey: {
    title: "Northern New Jersey",
    link: "/locations/new-jersey",
    neighborhoods: [
      "Jersey City", "Hoboken", "Weehawken", "Union City", "North Bergen",
      "West New York", "Bayonne", "Secaucus", "Edgewater"
    ]
  },
};

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-on-light)] mb-6">
            Areas We Serve
          </h1>
          <p className="text-lg text-[var(--text-muted-light)] max-w-3xl mx-auto">
            Professional house cleaning services across all five NYC boroughs, Long Island, Westchester County, and Northern New Jersey. 
            Licensed, insured, and trusted by thousands of customers.
          </p>
        </div>

        <div className="space-y-8">
          {Object.values(serviceAreas).map((area) => (
            <div key={area.title} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-[var(--text-on-light)]">
                  <Link href={area.link} className="hover:text-[#dfbd69] transition-colors">
                    {area.title}
                  </Link>
                </h2>
                <Link
                  href={area.link}
                  className="text-sm font-semibold text-[#dfbd69] hover:text-[#926f34] transition-colors hidden sm:block"
                >
                  View {area.title} services
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {area.neighborhoods.map((neighborhood) => (
                  <span
                    key={neighborhood}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-serif font-bold text-[var(--text-on-light)] mb-4">
            Our Services
          </h2>
          <p className="text-[var(--text-muted-light)] mb-6">
            We offer the full range of cleaning services across all our service areas.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: "Standard Cleaning", href: "/services/one-time-cleaning" },
              { name: "Deep Cleaning", href: "/services/deep-clean" },
              { name: "Move-Out Cleaning", href: "/services/move-out" },
              { name: "Apartment Cleaning", href: "/services/apartment-cleaning" },
              { name: "Airbnb Cleaning", href: "/services/airbnb" },
              { name: "Commercial Cleaning", href: "/services/commercial" },
              { name: "Event Cleaning", href: "/services/event-cleaning" },
              { name: "Post-Construction", href: "/services/post-construction" },
            ].map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="p-3 rounded-lg border border-gray-200 text-sm font-medium text-[var(--text-on-light)] hover:border-[#dfbd69] hover:text-[#dfbd69] transition-all text-center"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-[#283845] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-4">
            Don't See Your Area?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our service areas. Contact us to check availability in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={CONTACT_INFO.phone.href}
              className="bg-[#dfbd69] text-[#283845] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Call {CONTACT_INFO.phone.display}
            </a>
            <Link 
              href="/quote"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#283845] transition-all"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

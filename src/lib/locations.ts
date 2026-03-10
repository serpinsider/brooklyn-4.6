// Location data for Brooklyn Maids
// Only cross-market locations that serve genuinely different geographic audiences.
// Brooklyn neighborhood pages have been removed to consolidate authority
// on the home page for "cleaning service brooklyn" type queries.
export interface Location {
  name: string;
  slug: string;
  state: string;
  description?: string;
}

export const locations: Location[] = [
  {
    name: "Brooklyn",
    slug: "brooklyn",
    state: "NY",
    description: "Professional house cleaning services in Brooklyn, NY. Serving Park Slope, Williamsburg, Brooklyn Heights, DUMBO, Cobble Hill, Carroll Gardens, Prospect Heights, Fort Greene, Crown Heights, Bed-Stuy, Bushwick, Greenpoint, Bay Ridge, and all Brooklyn neighborhoods. Licensed, insured, 4.9-star rated. We bring all supplies, no contracts, pay after you're satisfied."
  },
  {
    name: "Manhattan",
    slug: "manhattan",
    state: "NY",
    description: "House cleaning and maid services across Manhattan, NY. Serving the Upper East Side, Upper West Side, Tribeca, SoHo, Chelsea, West Village, East Village, Midtown, Financial District, Harlem, and all Manhattan neighborhoods. Same-day availability, licensed and insured cleaners."
  },
  {
    name: "Queens",
    slug: "queens",
    state: "NY",
    description: "Reliable house cleaning services in Queens, NY. Serving Astoria, Long Island City, Forest Hills, Bayside, Flushing, Jamaica, Jackson Heights, Woodside, Sunnyside, and all Queens neighborhoods. Trusted by hundreds of Queens homeowners."
  },
  {
    name: "Bronx",
    slug: "bronx",
    state: "NY",
    description: "Professional cleaning services for homes across the Bronx, NY. Serving Riverdale, Pelham Bay, City Island, Fordham, Kingsbridge, Morris Park, Throgs Neck, and all Bronx neighborhoods. Licensed, insured, background-checked cleaners."
  },
  {
    name: "Staten Island",
    slug: "staten-island",
    state: "NY",
    description: "House cleaning and maid services on Staten Island, NY. Serving St. George, Stapleton, Tottenville, Great Kills, New Dorp, Annadale, and all Staten Island neighborhoods. We bring all our own supplies and equipment."
  },
  {
    name: "Long Island",
    slug: "long-island",
    state: "NY",
    description: "Professional house cleaning services across Long Island, NY. Serving Nassau County, Suffolk County, Garden City, Great Neck, Manhasset, Roslyn, Huntington, and surrounding areas. Recurring and one-time cleaning available."
  },
  {
    name: "Westchester",
    slug: "westchester",
    state: "NY",
    description: "Premium house cleaning services in Westchester County, NY. Serving Yonkers, White Plains, New Rochelle, Scarsdale, Bronxville, Larchmont, Rye, and surrounding communities. Licensed, insured, satisfaction guaranteed."
  },
  {
    name: "New Jersey",
    slug: "new-jersey",
    state: "NJ",
    description: "House cleaning services in Northern New Jersey. Serving Jersey City, Hoboken, Bayonne, Weehawken, Union City, Newark, and surrounding areas. Same professional team, same standards, same satisfaction guarantee."
  },
  {
    name: "Jersey City",
    slug: "jersey-city",
    state: "NJ",
    description: "Professional house cleaning and maid services in Jersey City, NJ. Serving Downtown, Journal Square, The Heights, Bergen-Lafayette, Greenville, and all Jersey City neighborhoods. No contracts, we bring all supplies."
  },
  {
    name: "Hoboken",
    slug: "hoboken",
    state: "NJ",
    description: "House cleaning services in Hoboken, NJ. Standard cleaning, deep cleaning, and move-out cleaning for apartments and homes throughout Hoboken. Licensed, insured, 4.9-star rated."
  },
];

export function getLocationWithState(locationName: string, locationSlug?: string): string {
  let location: Location | undefined;
  
  if (locationSlug) {
    location = locations.find(loc => loc.slug === locationSlug);
  } else {
    location = locations.find(loc => loc.name === locationName);
  }
  
  if (location) {
    return `${location.name}, ${location.state}`;
  }
  
  return `${locationName}, NY`;
}

export function getLocationState(locationSlug: string): string {
  const location = locations.find(loc => loc.slug === locationSlug);
  return location?.state || "NY";
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(loc => loc.slug === slug);
}

export const popularLocations = [
  "brooklyn", "manhattan", "queens", "new-jersey", "jersey-city", "hoboken",
  "long-island", "westchester"
];

export function getLocationPath(slug: string): string {
  return `/locations/${slug}`;
}

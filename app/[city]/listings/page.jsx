import FilterClient from '@/components/FilterClient';
import { getAllListings, getAreas, getCities } from '@/lib/data';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getCities().map((c) => ({ city: c.key }));
}

export function generateMetadata({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `Tiffin Services in ${city} | Tiffin Finder`,
    description: `Discover homestyle tiffin services in ${city}. Browse by ratings, diet, and area.`
  };
}

export default function ListingsCityPage({ params, searchParams }) {
  const cityKey = params.city;
  const all = getAllListings(cityKey);
  const areas = getAreas(cityKey);
  const initialQuery = searchParams?.q || '';
  const initialArea = searchParams?.area || '';
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Tiffin Services in {cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
      </h1>
      <FilterClient
        initialListings={all}
        allAreas={areas}
        initialQuery={initialQuery}
        initialArea={initialArea}
        cityKey={cityKey}
      />
    </section>
  );
}
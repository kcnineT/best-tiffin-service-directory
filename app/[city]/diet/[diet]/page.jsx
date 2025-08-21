import FilterClient from '@/components/FilterClient';
import { getAllListings, getDiets, getAreas } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  ['mumbai','pune','bengaluru'].forEach((cityKey) => {
    getDiets(cityKey).forEach((d) => {
      params.push({ city: cityKey, diet: d.toLowerCase() });
    });
  });
  return params;
}

export function generateMetadata({ params }) {
  const d = params.diet.charAt(0).toUpperCase() + params.diet.slice(1);
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `${d} Tiffin Services in ${city} | Tiffin Finder`,
    description: `Discover ${d.toLowerCase()} homestyle tiffin services across ${city}.`
  };
}

export default function DietPage({ params }) {
  const cityKey = params.city;
  const diet = params.diet.toLowerCase();
  const all = getAllListings(cityKey).filter((l) => l.dietTags.map((x) => x.toLowerCase()).includes(diet));
  const areas = getAreas(cityKey);
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {diet.charAt(0).toUpperCase() + diet.slice(1)} Tiffin Services in {cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
      </h1>
      <FilterClient initialListings={all} allAreas={areas} cityKey={cityKey} />
    </section>
  );
}
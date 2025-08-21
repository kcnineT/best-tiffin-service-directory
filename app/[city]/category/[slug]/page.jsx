import FilterClient from '@/components/FilterClient';
import { getAllListings, getCategories, getAreas } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  ['mumbai','pune','bengaluru'].forEach((cityKey) => {
    getCategories(cityKey).forEach((cat) => {
      const slug = cat.toLowerCase().replace(/\s+/g, '-');
      params.push({ city: cityKey, slug });
    });
  });
  return params;
}

export function generateMetadata({ params }) {
  const cat = params.slug.replace(/-/g, ' ').replace(/\w/g, (c) => c.toUpperCase());
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `${cat} in ${city} | Tiffin Finder`,
    description: `Discover tiffin providers categorized under ${cat} in ${city}.`
  };
}

export default function CategoryPage({ params }) {
  const cityKey = params.city;
  const cat = params.slug.replace(/-/g, ' ');
  const all = getAllListings(cityKey).filter(
    (l) => (l.category || '').toLowerCase() === cat
  );
  const areas = getAreas(cityKey);
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        {cat.charAt(0).toUpperCase() + cat.slice(1)} in {cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
      </h1>
      <FilterClient initialListings={all} allAreas={areas} cityKey={cityKey} />
    </section>
  );
}
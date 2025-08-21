import FilterClient from '@/components/FilterClient';
import { getAllListings, getAreas } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  ['mumbai','pune','bengaluru'].forEach((cityKey) => {
    getAreas(cityKey).forEach((a) => {
      const slug = `${a.toLowerCase().replace(/\s+/g, '-')}-tiffin-services`;
      params.push({ city: cityKey, slug });
    });
  });
  return params;
}

export function generateMetadata({ params }) {
  const area = params.slug.replace(/-tiffin-services$/, '').replace(/-/g, ' ').replace(/\w/g, (c) => c.toUpperCase());
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `Tiffin Services in ${area}, ${city} | Tiffin Finder`,
    description: `Discover homestyle tiffin services in ${area}, ${city}.`
  };
}

function resolveAreaFromSlug(slug) {
  const name = slug.replace(/-tiffin-services$/, '').replace(/-/g, ' ');
  return name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function AreaPage({ params }) {
  const cityKey = params.city;
  const area = resolveAreaFromSlug(params.slug);
  const all = getAllListings(cityKey).filter(
    (l) => l.area.toLowerCase() === area.toLowerCase()
  );
  const areas = getAreas(cityKey);
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Tiffin Services in {area}, {cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
      </h1>
      <FilterClient
        initialListings={all}
        allAreas={areas}
        initialArea={area}
        cityKey={cityKey}
      />
    </section>
  );
}
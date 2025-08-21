import Image from 'next/image';
import Stars from '@/components/Stars';
import Tag from '@/components/Tag';
import MapEmbed from '@/components/MapEmbed';
import { getListingBySlug, getAllListings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  // pre-generate all listing slugs for each city
  const params = [];
  ['mumbai','pune','bengaluru'].forEach((cityKey) => {
    getAllListings(cityKey).forEach((l) => {
      params.push({ city: cityKey, slug: l.slug });
    });
  });
  return params;
}

export function generateMetadata({ params }) {
  const item = getListingBySlug(params.city, params.slug);
  if (!item) return {};
  const title = `${item.name} – Tiffin Service in ${item.area}, ${item.cityName} | Tiffin Finder`;
  const description = item.description || `Homestyle tiffin in ${item.area}, ${item.cityName}.`;
  return { title, description };
}

export default function ListingDetail({ params }) {
  const item = getListingBySlug(params.city, params.slug);
  if (!item) return <div className="max-w-6xl mx-auto px-4 py-10">Not found</div>;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: item.name,
    url: `https://example.com/${params.city}/listing/${item.slug}`,
    image: item.image,
    telephone: item.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: item.address,
      addressLocality: item.area,
      addressRegion: item.cityName,
      addressCountry: 'IN'
    },
    aggregateRating: item.rating
      ? { '@type': 'AggregateRating', ratingValue: item.rating, reviewCount: item.reviews || 0 }
      : undefined,
    sameAs: [item.website, item.mapsUrl].filter(Boolean)
  };
  const related = getAllListings(params.city).filter(
    (d) => d.area === item.area && d.slug !== item.slug
  ).slice(0, 6);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative w-full h-56 rounded-2xl overflow-hidden border">
        <Image src={item.image} alt={`${item.name} cover`} fill className="object-cover" />
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-semibold text-gray-900">{item.name}</h1>
        <div className="mt-1 text-sm text-gray-600">
          {item.area}, {item.cityName} • {item.address}
        </div>
        <div className="mt-2 flex items-center gap-3">
          {item.rating ? <Stars value={item.rating} /> : null}
          <div className="text-sm text-gray-600">{item.reviews || 0} reviews</div>
        </div>
        <p className="mt-4 text-gray-800">{item.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2 max-w-md">
          {item.phone && (
            <a
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-center"
              href={`tel:${item.phone}`}
            >
              Call Now
            </a>
          )}
          {item.phone && (
            <a
              className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-center"
              href={`https://wa.me/${item.phone.replace('+', '')}`}
              target="_blank"
              rel="noopener"
            >
              WhatsApp Order
            </a>
          )}
          {item.website && (
            <a
              className="px-4 py-2 rounded-lg border text-center"
              href={item.website}
              target="_blank"
              rel="noopener"
            >
              Website
            </a>
          )}
          {item.mapsUrl && (
            <a
              className="px-4 py-2 rounded-lg border text-center"
              href={item.mapsUrl}
              target="_blank"
              rel="noopener"
            >
              Directions
            </a>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Tags</h3>
          <div className="mt-2 flex flex-wrap">
            {item.dietTags?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
            {item.cuisineTags?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
            {item.category && <Tag>{item.category}</Tag>}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Map</h3>
          <MapEmbed mapsUrl={item.mapsUrl} />
        </div>
        {related.length ? (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Related in {item.area}
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/${params.city}/listing/${r.slug}`}
                  className="rounded-xl border p-3 hover:shadow-sm transition"
                >
                  <div className="flex gap-3">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{r.name}</div>
                      <div className="text-xs text-gray-600 truncate">{r.area}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
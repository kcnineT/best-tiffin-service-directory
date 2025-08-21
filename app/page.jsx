import SearchBarHome from '@/components/SearchBarHome';
import { getCities, getFeatured } from '@/lib/data';

export const dynamic = 'force-static';

function FeaturedRow({ title, items, cityKey }) {
  return (
    <section className="mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <a href={`/${cityKey}/listings`} className="text-emerald-700 text-sm">
            See all
          </a>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <a
              key={it.id}
              href={`/${cityKey}/listing/${it.slug}`}
              className="rounded-2xl border bg-white p-4 hover:shadow-sm transition"
            >
              <img src={it.image} alt={it.name} className="w-full h-40 object-cover rounded-xl" />
              <div className="mt-3 font-medium text-gray-900">{it.name}</div>
              <div className="text-sm text-gray-600">
                {it.area} • {it.reviews || 0} reviews
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const cities = getCities();
  const mumbai = getFeatured('mumbai');
  const pune = getFeatured('pune');
  const blr = getFeatured('bengaluru');
  return (
    <div>
      <section className="pt-8 sm:pt-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
            Find the Best Tiffin Service
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            Homestyle meals, daily dabbas, and easy discovery—now in Mumbai, Pune, and Bengaluru. Search by city, area, diet, and ratings.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 -mb-8">
          <SearchBarHome cities={cities} />
        </div>
      </section>
      <FeaturedRow title="Featured in Mumbai" items={mumbai} cityKey="mumbai" />
      <FeaturedRow title="Featured in Pune" items={pune} cityKey="pune" />
      <FeaturedRow title="Featured in Bengaluru" items={blr} cityKey="bengaluru" />
      <div className="mt-12 border-t" />
    </div>
  );
}
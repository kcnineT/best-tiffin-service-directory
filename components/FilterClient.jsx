'use client';
import { useMemo, useState } from 'react';
import ListingCard from './ListingCard';

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition ${
        active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}

export default function FilterClient({ initialListings, allAreas, initialQuery, initialArea, cityKey }) {
  const [q, setQ] = useState(initialQuery || '');
  const [area, setArea] = useState(initialArea || '');
  const [diets, setDiets] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('Best Rated');
  const toggleDiet = (d) => setDiets((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const filtered = useMemo(() => {
    let list = initialListings.slice();
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((x) =>
        x.name.toLowerCase().includes(query) ||
        x.area.toLowerCase().includes(query) ||
        x.description.toLowerCase().includes(query) ||
        x.dietTags.join(' ').toLowerCase().includes(query) ||
        x.cuisineTags.join(' ').toLowerCase().includes(query)
      );
    }
    if (area) list = list.filter((x) => x.area.toLowerCase() === area.toLowerCase());
    if (diets.length) list = list.filter((x) => x.dietTags.some((d) => diets.includes(d)));
    if (minRating > 0) list = list.filter((x) => (x.rating || 0) >= minRating);
    if (sort === 'Best Rated') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'Most Reviewed') list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    else if (sort === 'A-Z') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [initialListings, q, area, diets, minRating, sort]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 sticky top-4 h-fit bg-white border rounded-2xl p-4">
        <h4 className="font-semibold text-gray-900">Filters</h4>
        <div className="mt-3">
          <div className="text-sm font-medium mb-2">Diet</div>
          <div className="flex flex-wrap gap-2">
            {['Veg', 'Non-Veg', 'Jain', 'Vegan'].map((d) => (
              <Chip key={d} active={diets.includes(d)} onClick={() => toggleDiet(d)}>
                {d}
              </Chip>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Rating</div>
          <div className="flex gap-2 items-center">
            {[0, 4.0, 4.5].map((r) => (
              <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>
                {r === 0 ? 'Any' : `${r}+`}
              </Chip>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Area</div>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="">All Areas</option>
            {allAreas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Sort</div>
          <div className="flex flex-wrap gap-2">
            {['Best Rated', 'Most Reviewed', 'A-Z'].map((s) => (
              <Chip key={s} active={sort === s} onClick={() => setSort(s)}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      </aside>
      <section className="lg:col-span-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Listings</h2>
            <div className="text-sm text-gray-600">{filtered.length} results</div>
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">
            Tip: Use diet & rating filters to narrow down.
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {filtered.length ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((it) => (
              <ListingCard key={it.id} item={it} cityKey={cityKey} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border bg-white p-8 text-center">
            <div className="text-lg font-medium text-gray-900">
              No tiffins match those filters.
            </div>
            <div className="text-sm text-gray-600 mt-1">Try clearing filters or explore nearby areas.</div>
          </div>
        )}
      </section>
    </div>
  );
}
'use client';
import { useState } from 'react';
export default function SearchBarHome({ cities }) {
  const [q, setQ] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState(cities[0]?.key || 'mumbai');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (area) params.set('area', area);
        window.location.href = `/${city}/listings?` + params.toString();
      }}
      className="w-full bg-white/80 backdrop-blur rounded-2xl border shadow-sm p-2 flex flex-col sm:flex-row gap-2"
    >
      <div className="sm:w-48 flex items-center gap-2 px-3 py-2 rounded-xl border">
        <span className="text-gray-500">🏙️</span>
        <select aria-label="Select city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent outline-none text-gray-900">
          {cities.map((c) => (
            <option key={c.key} value={c.key}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border">
        <span className="text-gray-500">🔎</span>
        <input
          aria-label="Search by name or cuisine"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, cuisine, diet..."
          className="w-full outline-none text-gray-900 placeholder:text-gray-500"
        />
      </div>
      <div className="sm:w-64 flex items-center gap-2 px-3 py-2 rounded-xl border">
        <span className="text-gray-500">📍</span>
        <input
          aria-label="Area (optional)"
          placeholder="Area e.g., Andheri, Kothrud, HSR..."
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-900"
        />
      </div>
      <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Search</button>
    </form>
  );
}
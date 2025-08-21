'use client';
import Image from 'next/image';
import Stars from './Stars';
import Tag from './Tag';

export default function ListingCard({ item, cityKey }) {
  return (
    <a href={`/${cityKey}/listing/${item.slug}`} className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={item.image} alt={`${item.name} tiffin in ${item.area}`} fill className="object-cover group-hover:scale-[1.02] transition" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">{item.name}</h3>
          {item.rating ? <Stars value={item.rating} /> : null}
        </div>
        <div className="mt-1 text-sm text-gray-600">{item.area} • {item.reviews || 0} reviews</div>
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex flex-wrap items-center">
          {item.dietTags?.map((t) => <Tag key={t}>{t}</Tag>)}
          {item.cuisineTags?.slice(0,1).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">View Details</span>
          {item.phone && <span className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Call</span>}
        </div>
      </div>
    </a>
  );
}
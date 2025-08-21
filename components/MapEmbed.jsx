export default function MapEmbed({ mapsUrl }) {
  if (!mapsUrl) return null;
  const src = mapsUrl.includes('/maps?') ? mapsUrl + '&output=embed' : mapsUrl.replace('/maps', '/maps/embed');
  return (
    <div className="mt-2 rounded-xl overflow-hidden border">
      <iframe title="map" src={src} className="w-full h-64" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}
import { getAllListings, getAreas, getDiets, getCategories, getCities } from '@/lib/data';

export default async function sitemap() {
  const base = 'https://example.com'; // replace with your domain after deployment
  const urls = [
    { url: `${base}/`, lastModified: new Date() }
  ];
  getCities().forEach((c) => {
    urls.push({ url: `${base}/${c.key}/listings`, lastModified: new Date() });
    getAllListings(c.key).forEach((l) => {
      urls.push({ url: `${base}/${c.key}/listing/${l.slug}`, lastModified: new Date() });
    });
    getAreas(c.key).forEach((a) => {
      const slug = `${a.toLowerCase().replace(/\s+/g, '-')}-tiffin-services`;
      urls.push({ url: `${base}/${c.key}/area/${slug}`, lastModified: new Date() });
    });
    getDiets(c.key).forEach((d) => {
      urls.push({ url: `${base}/${c.key}/diet/${d.toLowerCase()}`, lastModified: new Date() });
    });
    getCategories(c.key).forEach((cat) => {
      const slug = cat.toLowerCase().replace(/\s+/g, '-');
      urls.push({ url: `${base}/${c.key}/category/${slug}`, lastModified: new Date() });
    });
  });
  return urls;
}
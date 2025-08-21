import '../styles/globals.css';

export const metadata = {
  title: 'Tiffin Finder — Mumbai, Pune, Bengaluru',
  description: 'Find the best homestyle tiffin services by city, area, and diet. Curated directory for Mumbai, Pune, and Bengaluru.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white grid place-items-center font-bold">
                TF
              </div>
              <a href="/" className="font-semibold text-gray-900">
                Tiffin Finder
              </a>
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <a className="text-gray-700 hover:text-emerald-700" href="/mumbai/listings">
                Mumbai
              </a>
              <a className="text-gray-700 hover:text-emerald-700" href="/pune/listings">
                Pune
              </a>
              <a className="text-gray-700 hover:text-emerald-700" href="/bengaluru/listings">
                Bengaluru
              </a>
              <a className="text-gray-700 hover:text-emerald-700" href="/about">
                About
              </a>
              <a className="text-gray-700 hover:text-emerald-700" href="/contact">
                Contact
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-white mt-12">
          <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold text-gray-900">Tiffin Finder</div>
              <p className="text-gray-600 mt-2">
                A curated, human-edited guide to reliable dabbas in Mumbai, Pune, and Bengaluru.
              </p>
            </div>
            <div>
              <div className="font-medium text-gray-900">Explore by City</div>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li>
                  <a className="hover:text-emerald-700" href="/mumbai/listings">Mumbai</a>
                </li>
                <li>
                  <a className="hover:text-emerald-700" href="/pune/listings">Pune</a>
                </li>
                <li>
                  <a className="hover:text-emerald-700" href="/bengaluru/listings">Bengaluru</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-gray-900">Meta</div>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li>
                  <a className="hover:text-emerald-700" href="/about">About</a>
                </li>
                <li>
                  <a className="hover:text-emerald-700" href="/contact">Contact</a>
                </li>
                <li>
                  <a className="hover:text-emerald-700" href="/submit">Submit Listing</a>
                </li>
                <li>
                  <a className="hover:text-emerald-700" href="/privacy">Privacy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
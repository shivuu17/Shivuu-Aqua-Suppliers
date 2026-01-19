import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg">
          <Home size={20} /> Go to Home
        </Link>
      </div>
    </div>
  );
}

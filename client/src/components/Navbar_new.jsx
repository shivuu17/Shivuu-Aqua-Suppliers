import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplet } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/', label: 'Custom Label' },
    { path: '/', label: 'Bulk Order' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-border-light shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-aqua-500 rounded-full p-2">
              <Droplet className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold text-navy-900">
              Shivuu Aqua Supplies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-aqua-500 bg-ice'
                    : 'text-navy-900 hover:text-aqua-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block btn-primary">
              Get Demo Bottles
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              className="md:hidden p-2 hover:bg-ice rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6 text-navy-900" /> : <Menu className="h-6 w-6 text-navy-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-ice border-t-2 border-border-light">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-aqua-500 bg-white'
                    : 'text-navy-900 hover:text-aqua-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full btn-primary mt-4">
              Get Demo Bottles
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_ADDRESS, BUSINESS_WHATSAPP } from '../utils/constants.js';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Shivuu Aqua</h3>
            <p className="text-gray-400 text-sm">
              Premium water bottle supplier with custom branding solutions for businesses across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-400" />
                <a href={`tel:${BUSINESS_PHONE}`} className="text-gray-400 hover:text-white transition-colors">
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="text-gray-400 hover:text-white transition-colors">
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-cyan-400 mt-0.5" />
                <span className="text-gray-400">{BUSINESS_ADDRESS}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get in touch with us on WhatsApp for instant support.
            </p>
            <a
              href={`https://wa.me/${BUSINESS_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Shivuu Aqua Suppliers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

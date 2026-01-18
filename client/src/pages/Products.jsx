import { useMemo, useState } from 'react';
import { Filter, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getWhatsAppLink } from '../utils/constants';

const Products = () => {
  const [activeSize, setActiveSize] = useState('All');

  const products = [
    { size: '250ml', MOQ: 500, priceRange: 'Contact for pricing', deliveryTime: '3-5 days', description: 'Perfect for cafes and small restaurants' },
    { size: '500ml', MOQ: 500, priceRange: 'Contact for pricing', deliveryTime: '3-5 days', description: 'Most popular size for restaurants and hotels' },
    { size: '1L', MOQ: 300, priceRange: 'Contact for pricing', deliveryTime: '3-5 days', description: 'Ideal for events and large gatherings' },
  ];

  const displayProducts = useMemo(() => {
    if (activeSize === 'All') return products;
    return products.filter((p) => p.size === activeSize);
  }, [activeSize]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-14 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="gradient-bg text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Choose your bottle size
              </h1>
              <p className="text-lg text-white/85">
                Waterproof labels, food-grade bottles, and crisp printing. Delivered on schedule with design assistance included.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                  <Filter className="h-4 w-4" />
                  Filter by size
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['All', '250ml', '500ml', '1L'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`rounded-xl px-3 py-3 text-sm font-semibold transition-all border ${
                      activeSize === size
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white border-transparent shadow-lg shadow-primary-600/25'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary-200 hover:text-primary-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-10 soft-shadow border border-white/60">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-primary-600 font-semibold">What's inside every bottle</p>
              <h2 className="text-3xl font-bold text-gray-900">Product Features</h2>
              <p className="text-gray-600">
                Every order includes design support, waterproof label printing, and quality checks before dispatch.
              </p>
            </div>
            <ul className="space-y-3 text-gray-800 text-sm sm:text-base">
              {[
                "Premium quality waterproof labels that won't peel or fade",
                'High-resolution logo printing for professional branding',
                'Food-grade bottles meeting safety standards',
                'Custom label design support included',
                'Flexible weekly or monthly delivery schedules',
                'Demo bottles available before bulk order commitment',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-secondary-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-lg text-primary-800 font-semibold mb-6">
            Interested in our products? Connect with us on WhatsApp for more information.
          </p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl btn-primary text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;

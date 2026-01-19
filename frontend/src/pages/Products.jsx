import { useState, useEffect } from 'react';
import { BUSINESS_WHATSAPP } from '../utils/constants.js';
import { MessageCircle, Check, Loader, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Products() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20Shivuu%20Aqua!%20I'm%20interested%20in%20custom%20branded%20water%20bottles.%20Can%20you%20provide%20pricing%20for%20your%20bottles?`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/products');
      if (response.data.success && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts(response.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const sizes = ['250ml', '500ml', '1L'];
  const filteredProducts = selectedSize
    ? products.filter(p => p.size === selectedSize)
    : products;

  const features = [
    { icon: '💧', title: 'Waterproof Labels', desc: 'Long-lasting premium labels' },
    { icon: '✨', title: 'Premium Material', desc: 'High-quality durable bottles' },
    { icon: '🎨', title: 'Custom Branding', desc: 'Full color logo printing' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'On-time shipping guaranteed' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Bottle Sizes</h1>
          <p className="text-lg text-white/90">Premium custom branded water bottles for your business</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter by Size</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedSize(null)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedSize === null
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-primary-500'
              }`}
            >
              All Sizes
            </button>
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedSize === size
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-primary-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <Loader className="animate-spin w-10 h-10 text-primary-600 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Loading products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <p className="text-red-800 font-medium mb-2">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="glass-card p-8 card-hover soft-shadow group">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.size}
                      className="h-56 w-full object-cover rounded-2xl mb-6 group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-56 flex items-center justify-center text-8xl rounded-2xl mb-6 group-hover:from-primary-200 group-hover:to-secondary-200 transition">
                      {product.size === '250ml' ? '🍶' : product.size === '500ml' ? '💧' : '🚰'}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.size}</h3>
                  <p className="text-gray-700 mb-6 font-medium">{product.description}</p>

                  <div className="bg-white/80 p-4 rounded-lg mb-6 border border-gray-100">
                    <div className="text-lg font-bold text-primary-600 mb-2">{product.price_range}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-2"><Check size={16} className="text-secondary-500" /> MOQ: {product.moq} units</p>
                      <p className="flex items-center gap-2"><Check size={16} className="text-secondary-500" /> Delivery: {product.delivery_time}</p>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className="text-gray-600 font-medium">No products found</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Highlight */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Our Bottles Stand Out</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="glass-card p-6 text-center soft-shadow card-hover">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Need Custom Branding?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Contact us for logo printing, label design, full-color branding, and more customization options.</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <MessageCircle size={20} />
            Get Quote Now
          </a>
        </div>
      </section>
    </div>
  );
}

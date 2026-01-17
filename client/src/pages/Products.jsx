import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Default products if none in database
  const defaultProducts = [
    {
      size: '250ml',
      MOQ: 500,
      priceRange: 'Contact for pricing',
      deliveryTime: '3-5 days',
      description: 'Perfect for cafes and small restaurants',
    },
    {
      size: '500ml',
      MOQ: 500,
      priceRange: 'Contact for pricing',
      deliveryTime: '3-5 days',
      description: 'Most popular size for restaurants and hotels',
    },
    {
      size: '1L',
      MOQ: 300,
      priceRange: 'Contact for pricing',
      deliveryTime: '3-5 days',
      description: 'Ideal for events and large gatherings',
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium custom branded water bottles available in three sizes. 
            All bottles feature waterproof labels and professional printing.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {displayProducts.map((product, index) => (
                <ProductCard key={product._id || index} product={product} />
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-primary-600 mb-4">
                Product Features
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Premium quality waterproof labels that won't peel or fade</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>High-resolution logo printing for professional branding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Food-grade bottles meeting all safety standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Custom label design support included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Flexible weekly or monthly delivery schedules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Demo bottles available before bulk order commitment</span>
                </li>
              </ul>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 mb-6">
                Ready to order? Get a custom quote for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/custom-label" className="btn-primary">
                  Design Your Label
                </Link>
                <Link to="/inquiry" className="btn-secondary">
                  Request Quote
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

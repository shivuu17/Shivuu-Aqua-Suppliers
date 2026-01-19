import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Droplet, Check, Users, Zap, Shield, TrendingUp, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import TestimonialCard from '../components/TestimonialCard.jsx';
import { apiService } from '../services/api.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts();
        setProducts(data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Share Your Design',
      description: 'Upload your logo and customize the label design',
      icon: '🎨'
    },
    {
      number: '02',
      title: 'Confirm Details',
      description: 'Choose bottle size, quantity, and delivery timeline',
      icon: '✓'
    },
    {
      number: '03',
      title: 'Quick Turnaround',
      description: 'Get your branded bottles in 7-10 business days',
      icon: '⚡'
    },
    {
      number: '04',
      title: 'Quality Assurance',
      description: 'Premium waterproof labels and sturdy bottles',
      icon: '⭐'
    }
  ];

  const features = [
    {
      icon: <Droplet className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'High-quality bottles with waterproof, durable labels'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Cost Effective',
      description: 'Competitive pricing with bulk order discounts'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: '7-10 days turnaround for standard orders'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Custom Design',
      description: 'Full customization of labels and branding'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Professional Support',
      description: 'Dedicated team for design and delivery support'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Trusted Partner',
      description: 'Preferred by cafés, restaurants, and offices'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Royal Café, Bangalore',
      message: 'The custom bottles elevated our brand presence significantly. The quality is outstanding and delivery was on time.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      company: 'Green Hotel, Mumbai',
      message: 'Professional team, excellent service. The bottles arrived in perfect condition and our guests loved them!',
      rating: 5
    },
    {
      name: 'Arjun Singh',
      company: 'Tech Office, Pune',
      message: 'Great experience from start to finish. Custom design support was exceptional and pricing very competitive.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'What is the minimum order quantity?',
      answer: 'Our MOQ varies by bottle size (250ml: 100 units, 500ml: 50 units, 1L: 25 units). Custom orders welcome!'
    },
    {
      question: 'How long is the delivery time?',
      answer: 'Standard delivery is 7-10 business days. Rush orders available on request with additional charges.'
    },
    {
      question: 'Can I customize the label design?',
      answer: 'Yes! You can upload your logo and customize the label design completely. Our design team can assist if needed.'
    },
    {
      question: 'What is the price per bottle?',
      answer: 'Pricing depends on bottle size, quantity, and label complexity. Get a free quote by contacting us!'
    },
    {
      question: 'Do you offer discounts for bulk orders?',
      answer: 'Yes! We offer competitive discounts for large orders. Contact us for a customized quote.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including bank transfer, card payments, and digital wallets.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-cyan-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Custom Branded
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Water Bottles
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Elevate your brand with premium custom-labeled water bottles. Perfect for cafés, restaurants, offices, and corporate gifting.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/products" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Products
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/inquiry" className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-300">
                Get a Quote
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative backdrop-blur-lg bg-white/40 border border-white/60 rounded-2xl p-12 text-center">
              <div className="text-7xl mb-4">💧</div>
              <p className="text-gray-700 font-semibold">Premium Quality Bottles</p>
              <p className="text-gray-600 text-sm mt-2">250ml, 500ml, 1L sizes available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          From design to delivery, we make the process simple and hassle-free
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-2xl p-6 h-full hover:bg-white/80 transition-all duration-300 shadow-lg">
                <div className="text-4xl font-bold text-blue-600/20 mb-2">{step.number}</div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Featured Products</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our premium range of bottle sizes
        </p>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link to="/products" className="inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300">
                View All Products
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Why Choose Us</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We deliver excellence in every bottle
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="backdrop-blur-lg bg-white/40 border border-white/30 rounded-2xl p-8 hover:bg-white/60 transition-all duration-300 shadow-lg">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Join hundreds of satisfied businesses
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12">
          Have questions? We've got answers
        </p>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="backdrop-blur-lg bg-white/40 border border-white/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/60 transition-colors duration-200"
              >
                <p className="font-semibold text-gray-900 text-left">{faq.question}</p>
                <span className={`text-blue-600 transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div className="px-6 py-4 bg-white/20 border-t border-white/20">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="backdrop-blur-lg bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-white/40 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
            Get your custom branded bottles today. Contact us for a free quote!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inquiry" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg">
              Request Quote
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

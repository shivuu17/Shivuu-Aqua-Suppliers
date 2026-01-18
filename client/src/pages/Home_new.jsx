import { useState } from 'react';
import { MessageCircle, Droplet, Shield, Truck, Tag, ChevronRight } from 'lucide-react';
import { getWhatsAppLink } from '../utils/constants';

const Home = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    bottleSize: '500ml',
    quantityWeek: '',
    city: '',
  });

  // Product cards for hero section
  const bottles = [
    { size: '250ml', description: 'Perfect for cafés' },
    { size: '500ml', description: 'Most popular' },
    { size: '1L', description: 'Family dining' },
  ];

  // Product cards section
  const productCards = [
    {
      size: '250ml',
      moq: 500,
      subtitle: 'Best for cafés & takeaway',
    },
    {
      size: '500ml',
      moq: 500,
      subtitle: 'Most common for restaurants',
    },
    {
      size: '1L',
      moq: 300,
      subtitle: 'Best for family dining & events',
    },
  ];

  // How it works
  const steps = [
    { title: 'Send your logo', icon: '📤' },
    { title: 'Get demo bottles', icon: '📦' },
    { title: 'Start bulk supply', icon: '🚀' },
  ];

  // Why choose us
  const reasons = [
    { title: 'Waterproof Labels', icon: Shield },
    { title: 'Premium Look', icon: Tag },
    { title: 'On-Time Delivery', icon: Truck },
    { title: 'Affordable Rates', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-ice">
      {/* Top Bar */}
      <div className="bg-navy-900 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 text-sm">
          <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-aqua-500 transition">
            <span>📞 Call us</span>
          </a>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-aqua-500 transition">
            <span>💬 WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20 px-4 relative overflow-hidden">
        {/* Background waves */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Custom Branded Water Bottles
                <span className="text-aqua-500"> for Restaurants & Cafés</span>
              </h1>

              <p className="text-lg text-gray-200">
                <span className="font-semibold">250ml • 500ml • 1L</span>
              </p>
              <p className="text-base text-gray-300">
                Waterproof Labels • Premium Branding • Fast Supply
              </p>

              <div className="flex gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Get Demo Bottles
                </a>
                <button className="btn-secondary text-white border-white hover:bg-white hover:text-navy-900">
                  View Bottle Sizes
                </button>
              </div>
            </div>

            {/* Right - Bottle Mockups */}
            <div className="relative h-96 flex items-end justify-center">
              {bottles.map((bottle, idx) => (
                <div
                  key={idx}
                  className="absolute transform transition-transform hover:scale-110"
                  style={{
                    left: `${idx * 60 - 60}px`,
                    zIndex: 3 - idx,
                  }}
                >
                  <div className="bg-gradient-to-br from-aqua-400 to-aqua-500 rounded-3xl w-24 h-56 shadow-2xl flex flex-col items-center justify-center text-center text-white">
                    <div className="text-3xl font-bold">{bottle.size}</div>
                    <div className="text-xs mt-2">{bottle.description}</div>
                  </div>
                </div>
              ))}
              {/* Water splash effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-48 bg-gradient-radial from-aqua-500/20 to-transparent blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="bg-white border-b-2 border-border-light py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-navy-900 font-semibold mb-6">
            ⭐ Trusted by local cafés, restaurants & event partners
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="w-24 h-12 bg-ice rounded-lg flex items-center justify-center text-navy-900 font-semibold text-sm border border-border-light"
              >
                Logo {num}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CARDS ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 mb-12 text-center">
            Choose Your Bottle Size
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {productCards.map((card) => (
              <div
                key={card.size}
                className="card-premium hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-aqua-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Droplet className="h-10 w-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-navy-900 text-center mb-2">
                  {card.size}
                </h3>
                <p className="text-gray-600 text-center mb-4">{card.subtitle}</p>

                <div className="space-y-3 mb-6">
                  <p className="text-center text-sm">
                    <span className="font-semibold text-navy-900">MOQ:</span>
                    <span className="text-gray-600"> {card.moq} bottles</span>
                  </p>
                  <p className="text-center text-sm">
                    <span className="font-semibold text-navy-900">Price:</span>
                    <span className="text-aqua-500"> Contact for pricing</span>
                  </p>
                </div>

                <button className="w-full bg-gray-100 hover:bg-aqua-500 hover:text-white text-navy-900 font-semibold py-3 rounded-xl transition-all duration-300">
                  Request Price
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-white py-20 px-4 border-t-2 border-border-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 mb-12 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-aqua-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOM BRANDING SHOWCASE ===== */}
      <section className="py-20 px-4 bg-ice">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 mb-8 text-center">
            Custom Branding Showcase
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {['Badami Sweets Bottle', 'Cafe XYZ Bottle', 'Restaurant ABC Bottle'].map((name) => (
              <div
                key={name}
                className="card-premium flex flex-col items-center justify-center h-64 bg-gradient-to-br from-aqua-400 to-aqua-500"
              >
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🍾</div>
                  <h3 className="font-bold text-lg">{name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get Your Custom Design
            </a>
          </div>
        </div>
      </section>

      {/* ===== BULK ORDER FORM ===== */}
      <section className="py-20 px-4 bg-white border-t-2 border-border-light">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center">
            Request a Quote
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-navy-900 font-semibold mb-2">Business Name *</label>
              <input
                type="text"
                placeholder="Your business name"
                className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:border-aqua-500"
              />
            </div>

            <div>
              <label className="block text-navy-900 font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:border-aqua-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-navy-900 font-semibold mb-2">Bottle Size *</label>
                <select className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:border-aqua-500">
                  <option>250ml</option>
                  <option>500ml</option>
                  <option>1L</option>
                </select>
              </div>

              <div>
                <label className="block text-navy-900 font-semibold mb-2">Quantity/Week *</label>
                <input
                  type="number"
                  placeholder="How many per week?"
                  className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:border-aqua-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-navy-900 font-semibold mb-2">City *</label>
              <input
                type="text"
                placeholder="Your city"
                className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:border-aqua-500"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-4 text-lg font-bold">
              Request Quote
            </button>
          </form>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 px-4 bg-ice">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 mb-12 text-center">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="card-premium text-center">
                <div className="icon-circle-aqua mx-auto mb-4 w-16 h-16">
                  <reason.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{reason.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Home;

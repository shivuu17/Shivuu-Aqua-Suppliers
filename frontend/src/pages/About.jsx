import { COMPANY_VALUES } from '../utils/constants.js';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';

export default function About() {
  const whyChooseUs = [
    { icon: '⏰', title: '8+ Years Experience', desc: 'Industry expertise and proven track record' },
    { icon: '👥', title: '500+ Happy Clients', desc: 'Trusted by businesses across India' },
    { icon: '🚚', title: 'Fast Turnaround', desc: '7-10 days delivery with rush options' },
    { icon: '💰', title: 'Best Pricing', desc: 'Competitive rates for bulk orders' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Shivuu Aqua</h1>
          <p className="text-lg text-white/90">Premium water bottles with custom branding since 2018</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-64 rounded-3xl flex items-center justify-center text-8xl">🏢</div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Shivuu Aqua Suppliers was founded with a mission to provide high-quality, sustainable water bottles with custom branding solutions for businesses across India.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Starting with a small team, we've grown to serve over 500 satisfied clients and delivered more than 10 million custom-branded water bottles.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our commitment to quality, competitive pricing, and excellent customer service has made us a trusted partner for corporate gifts, events, and promotional items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            To provide eco-friendly, premium quality water bottles with seamless custom branding, enabling businesses to connect with their customers in a meaningful and sustainable way.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_VALUES.map((value, i) => (
              <div key={i} className="glass-card p-8 text-center soft-shadow card-hover">
                <CheckCircle size={48} className="text-secondary-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Meet the Founder</h2>
          <div className="max-w-2xl mx-auto text-center glass-card p-10 soft-shadow">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">👤</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Shivank Katiyar</h3>
            <p className="text-lg text-primary-600 font-semibold mb-4">Founder & CEO</p>
            <p className="text-gray-700 leading-relaxed">
              With 8+ years of experience in the beverage packaging industry, Shivank founded Shivuu Aqua with the vision of revolutionizing corporate gifting through sustainable and customizable water bottles. His dedication to quality and customer satisfaction drives the company's growth.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Why Choose Shivuu Aqua?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="glass-card p-8 text-center soft-shadow card-hover">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Family</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">Become one of our 500+ satisfied clients and experience premium quality with exceptional service.</p>
          <button className="btn-secondary">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}

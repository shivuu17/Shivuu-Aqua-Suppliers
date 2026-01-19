import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_ADDRESS, BUSINESS_HOURS, BUSINESS_WHATSAPP } from '../utils/constants.js';

export default function Contact() {
  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20Shivuu%20Aqua!%20I%20would%20like%20to%20know%20more%20about%20your%20custom%20branded%20water%20bottles.`;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/90">Get in touch for inquiries, quotes, and support</p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Phone Card */}
            <div className="glass-card p-8 flex flex-col soft-shadow card-hover">
              <Phone size={40} className="text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-700 mb-6 flex-grow">Speak directly with our sales team for immediate assistance.</p>
              <a href={`tel:${BUSINESS_PHONE}`} className="text-primary-600 font-semibold hover:underline text-lg">
                {BUSINESS_PHONE}
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="glass-card p-8 flex flex-col soft-shadow card-hover">
              <MessageCircle size={40} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp</h3>
              <p className="text-gray-700 mb-6 flex-grow">Chat with us on WhatsApp for quick response and inquiries.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition shadow-md">
                <MessageCircle size={20} /> Chat Now
              </a>
            </div>

            {/* Email Card */}
            <div className="glass-card p-8 flex flex-col soft-shadow card-hover">
              <Mail size={40} className="text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-700 mb-6 flex-grow">Send us detailed inquiries and we'll respond within 24 hours.</p>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="text-primary-600 font-semibold hover:underline text-lg">
                {BUSINESS_EMAIL}
              </a>
            </div>

            {/* Location Card */}
            <div className="glass-card p-8 flex flex-col soft-shadow card-hover">
              <MapPin size={40} className="text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Location</h3>
              <p className="text-gray-700 mb-4 flex-grow">{BUSINESS_ADDRESS}</p>
              <p className="flex items-center gap-2 text-gray-900 font-semibold">
                <Clock size={20} className="text-primary-600" /> {BUSINESS_HOURS}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Contact Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 soft-shadow card-hover">
              <div className="text-5xl mb-4">📝</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Provide Details</h4>
              <p className="text-gray-700">Share your bottle size preference, quantity, and custom branding requirements.</p>
            </div>
            <div className="glass-card p-8 soft-shadow card-hover">
              <div className="text-5xl mb-4">⏰</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Fast Response</h4>
              <p className="text-gray-700">We respond to WhatsApp messages within minutes and emails within 24 hours.</p>
            </div>
            <div className="glass-card p-8 soft-shadow card-hover">
              <div className="text-5xl mb-4">✓</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Get Quote</h4>
              <p className="text-gray-700">Receive a personalized quote and delivery timeline for your order.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Before You Contact</h2>
          <div className="space-y-4">
            <details className="frosted-panel p-6 cursor-pointer group soft-shadow">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                What should I include in my inquiry?
                <span className="group-open:rotate-180 transition">▶</span>
              </summary>
              <p className="text-gray-700 mt-3">Include bottle size preference, desired quantity, custom branding details (logo, text), and your timeline.</p>
            </details>
            <details className="frosted-panel p-6 cursor-pointer group soft-shadow">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                How quickly do you respond?
                <span className="group-open:rotate-180 transition">▶</span>
              </summary>
              <p className="text-gray-700 mt-3">WhatsApp: within minutes (during business hours). Email: within 24 hours. Phone: during business hours.</p>
            </details>
            <details className="frosted-panel p-6 cursor-pointer group soft-shadow">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Can you provide samples?
                <span className="group-open:rotate-180 transition">▶</span>
              </summary>
              <p className="text-gray-700 mt-3">Yes, we offer samples. Charges apply but are credited when you place a bulk order.</p>
            </details>
            <details className="frosted-panel p-6 cursor-pointer group soft-shadow">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Do you offer rush deliveries?
                <span className="group-open:rotate-180 transition">▶</span>
              </summary>
              <p className="text-gray-700 mt-3">Yes, expedited delivery options are available. Discuss your timeline with our team.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-lg text-white/90 mb-8">Start your custom water bottle journey today!</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

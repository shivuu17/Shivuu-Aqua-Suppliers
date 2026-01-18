import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { BUSINESS_PHONE, BUSINESS_EMAIL, getWhatsAppLink } from '../utils/constants';

const Contact = () => {
  const contactInfo = [
    { icon: Phone, title: 'Phone', detail: BUSINESS_PHONE, description: 'Call us anytime between 9 AM - 9 PM', color: 'text-primary-600', bgColor: 'bg-primary-50', href: `tel:${BUSINESS_PHONE}` },
    { icon: Mail, title: 'Email', detail: BUSINESS_EMAIL, description: 'We respond within 24 hours', color: 'text-secondary-500', bgColor: 'bg-secondary-50', href: `mailto:${BUSINESS_EMAIL}` },
    { icon: MapPin, title: 'Location', detail: 'Usmanganj, Uttar Pradesh', description: 'Serving clients across the region', color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { icon: Clock, title: 'Hours', detail: 'Mon - Sun: 9:00 AM - 9:00 PM', description: 'Available 7 days a week', color: 'text-secondary-500', bgColor: 'bg-secondary-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl opacity-90">We're here to help you elevate your brand with custom water bottles</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info) => (
              <div key={info.title} className="glass-card text-center p-6 rounded-2xl soft-shadow">
                <div className={`${info.bgColor} ${info.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.href ? (
                  <a href={info.href} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors break-all">
                    {info.detail}
                  </a>
                ) : (
                  <p className="text-primary-600 font-semibold">{info.detail}</p>
                )}
                <p className="text-gray-600 text-sm mt-1">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="glass-card p-8 rounded-2xl soft-shadow">
              <div className="bg-primary-100 text-primary-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Let's Talk</h2>
              <p className="text-gray-600 mb-6">Share your requirements and we'll get back to you within 24 hours with a custom quote.</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Name</label>
                  <input type="text" className="input-primary" placeholder="Your name" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
                    <input type="tel" className="input-primary" placeholder="+91" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                    <input type="email" className="input-primary" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Business Name</label>
                  <input type="text" className="input-primary" placeholder="Your business" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Message</label>
                  <textarea rows="4" className="input-primary" placeholder="Tell us about your requirements" />
                </div>
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="glass-card p-8 rounded-2xl soft-shadow space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">What to Include</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Bottle size preferences (200ml, 250ml, 500ml)</li>
                  <li>• Label design requirements (upload existing design or need design assistance)</li>
                  <li>• Quantity needed (demo, small batch, bulk)</li>
                  <li>• Delivery location and timeline</li>
                </ul>
              </div>
              <div className="p-4 bg-primary-50 rounded-xl">
                <h4 className="text-lg font-semibold text-primary-600 mb-2">Response Time</h4>
                <p className="text-gray-700">We aim to respond within 24 hours. For urgent inquiries, please call us directly.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Service Area</h4>
                <p className="text-gray-700">Serving Usmanganj and surrounding areas. Delivery available across Uttar Pradesh.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl soft-shadow">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-8 w-8 text-secondary-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Chat on WhatsApp</h3>
              </div>
              <p className="text-gray-700 mb-6">Get instant responses. Tap below to start a WhatsApp conversation.</p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Chat Now
              </a>
            </div>

            <div className="glass-card p-8 rounded-2xl soft-shadow">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Call Us Directly</h3>
              </div>
              <p className="text-gray-700 mb-6">Prefer to talk? Call and we’ll discuss your requirements right away.</p>
              <a href={`tel:${BUSINESS_PHONE}`} className="btn-primary inline-flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>

          <div className="mt-12 glass-card p-8 rounded-2xl soft-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
            <div className="bg-white/70 rounded-xl h-96 flex items-center justify-center border border-white/60">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                <p className="text-gray-900">Usmanganj, Uttar Pradesh, India</p>
                <p className="text-sm text-gray-500 mt-2">Contact us for exact location details</p>
              </div>
            </div>
          </div>

          <div className="mt-12 frosted-panel rounded-2xl p-8 soft-shadow border border-white/60">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Before You Contact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">For Quotations:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Your business name and type</li>
                  <li>• Preferred bottle size (250ml/500ml/1L)</li>
                  <li>• Estimated quantity needed</li>
                  <li>• Delivery location</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">For Demo Bottles:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Share your logo (PNG/JPG format)</li>
                  <li>• Preferred label style</li>
                  <li>• Contact details</li>
                  <li>• Delivery address</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">Let's discuss your custom water bottle requirements today</p>
          <a href="/inquiry" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg inline-block">
            Request a Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;

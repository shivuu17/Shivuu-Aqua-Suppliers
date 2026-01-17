import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_PHONE, BUSINESS_EMAIL, getWhatsAppLink } from '../utils/constants';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl opacity-90">
            We're here to help you elevate your brand with custom water bottles
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Phone */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center card-hover">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="text-secondary-500 hover:text-secondary-600 transition-colors"
              >
                {BUSINESS_PHONE}
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center card-hover">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="text-secondary-500 hover:text-secondary-600 transition-colors break-all"
              >
                {BUSINESS_EMAIL}
              </a>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center card-hover">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                Usmanganj
                <br />
                Uttar Pradesh, India
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center card-hover">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-600">
                Mon - Sat
                <br />
                9:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* WhatsApp */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Chat on WhatsApp</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get instant response to your queries. Click below to start a WhatsApp conversation with us.
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat Now
              </a>
            </div>

            {/* Call */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Call Us Directly</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Prefer to talk? Give us a call and we'll be happy to discuss your requirements.
              </p>
              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="btn-primary inline-flex items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Usmanganj, Uttar Pradesh, India
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Contact us for exact location details
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8">
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
    </div>
  );
};

export default Contact;

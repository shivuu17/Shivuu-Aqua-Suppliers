import { Link } from 'react-router-dom';
import { Upload, Package, Truck, Shield, Award, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      icon: Upload,
      title: 'Share Your Logo',
      description: 'Upload your business logo and brand details',
    },
    {
      icon: Package,
      title: 'Get Demo Bottles',
      description: 'Receive sample bottles to check quality',
    },
    {
      icon: Truck,
      title: 'Start Bulk Supply',
      description: 'Regular weekly/monthly delivery to your location',
    },
  ];

  const products = [
    { size: '250ml', moq: 500, delivery: '3-5 days' },
    { size: '500ml', moq: 500, delivery: '3-5 days' },
    { size: '1L', moq: 300, delivery: '3-5 days' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Waterproof Labels',
      description: 'Long-lasting labels that stay perfect',
    },
    {
      icon: Award,
      title: 'Premium Branding',
      description: 'Professional design that elevates your brand',
    },
    {
      icon: Clock,
      title: 'On-Time Supply',
      description: 'Reliable delivery schedule you can count on',
    },
    {
      icon: Upload,
      title: 'Custom Design Support',
      description: 'Free design assistance for your labels',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Cafe Coffee Corner',
      text: 'Outstanding service! Our branded bottles have become a talking point with customers.',
    },
    {
      name: 'Priya Sharma',
      business: 'The Grand Hotel',
      text: 'Professional quality and timely delivery. Highly recommend for any hospitality business.',
    },
    {
      name: 'Amit Patel',
      business: 'Wellness Clinic',
      text: 'The custom labels look premium and the pricing is very competitive.',
    },
  ];

  const faqs = [
    {
      question: 'What is the minimum order quantity?',
      answer: 'Our MOQ varies by bottle size: 500 bottles for 250ml and 500ml, 300 bottles for 1L.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Demo bottles are delivered within 3-5 days. Bulk orders typically take 5-7 days.',
    },
    {
      question: 'Can you help with label design?',
      answer: 'Yes! We offer free design support. Just share your logo and brand colors.',
    },
    {
      question: 'Are the labels waterproof?',
      answer: 'Absolutely! We use premium waterproof labels that maintain quality even when wet.',
    },
    {
      question: 'Do you offer regular supply schedules?',
      answer: 'Yes, we can set up weekly or monthly delivery schedules based on your needs.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Custom Branded Water Bottles
            <br />
            for Cafés & Restaurants
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            250ml | 500ml | 1L • Waterproof Labels • Fast Delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inquiry" className="btn-primary text-lg">
              Get Demo Bottles
            </Link>
            <Link
              to="/custom-label"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Request Bulk Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-600">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-secondary-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-600">
            Our Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 card-hover">
                <div className="text-center">
                  <Package className="h-24 w-24 text-secondary-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary-600 mb-4">{product.size}</h3>
                  <p className="text-gray-600 mb-2">MOQ: {product.moq} bottles</p>
                  <p className="text-gray-600">Delivery: {product.delivery}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-600">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-600">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-600">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with demo bottles today!
          </p>
          <Link to="/inquiry" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg inline-block">
            Get Your Demo Bottles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

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
      description: 'Send us your brand logo and label design preferences',
    },
    {
      icon: Package,
      title: 'Approve Samples',
      description: 'Review and approve demo bottles before bulk production',
    },
    {
      icon: Truck,
      title: 'Receive Supply',
      description: 'Get regular deliveries as per your requirement',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Waterproof Labels',
      description: 'Premium quality labels that won\'t peel or fade in water',
    },
    {
      icon: Award,
      title: 'High Quality Printing',
      description: 'Crystal clear logo printing with vibrant colors',
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Fast production and delivery within 3-5 days',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'Consistent supply with flexible delivery schedules',
    },
  ];

  const products = [
    {
      size: '250ml',
      moq: 500,
      delivery: '3-5 days',
    },
    {
      size: '500ml',
      moq: 500,
      delivery: '3-5 days',
    },
    {
      size: '1L',
      moq: 300,
      delivery: '3-5 days',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Café Delight, Mumbai',
      text: 'The custom bottles have really elevated our brand image. Customers love them!',
    },
    {
      name: 'Priya Sharma',
      business: 'The Grand Restaurant, Delhi',
      text: 'Excellent quality and service. The waterproof labels are perfect for our needs.',
    },
    {
      name: 'Amit Patel',
      business: 'Event Solutions, Bangalore',
      text: 'Great for events! Fast delivery and professional printing quality.',
    },
  ];

  const faqs = [
    {
      question: 'What is the minimum order quantity?',
      answer: 'The minimum order quantity varies by bottle size: 500 bottles for 250ml and 500ml, and 300 bottles for 1L.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days after design approval.',
    },
    {
      question: 'Can I get a sample before ordering?',
      answer: 'Yes! We provide demo bottles with your label design before you commit to a bulk order.',
    },
    {
      question: 'Are the labels waterproof?',
      answer: 'Yes, all our labels are waterproof and resistant to condensation and moisture.',
    },
    {
      question: 'Do you provide label design services?',
      answer: 'Yes, we offer free label design assistance to help you create the perfect look for your brand.',
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
                      openFaq === index ? 'transform rotate-180' : ''
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

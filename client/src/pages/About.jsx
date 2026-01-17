import { Award, Target, Heart, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality. Every bottle meets our strict standards.',
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'Your success is our success. We work to elevate your brand.',
    },
    {
      icon: Heart,
      title: 'Passionate Service',
      description: 'We love what we do and it shows in our dedication to excellence.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build long-term relationships, not just transactions.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Shivuu Aqua Supplies</h1>
          <p className="text-xl opacity-90">
            Helping cafés and restaurants build brand identity through custom bottled water
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-primary-600 mb-6">Our Story</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Founded by <strong>Shivank Katiyar</strong> in Usmanganj, Uttar Pradesh, 
                Shivuu Aqua Supplies was born from a simple observation: businesses invest 
                heavily in branding their spaces, menus, and packaging, but often overlook 
                one of the most visible items on their tables – water bottles.
              </p>
              <p>
                We saw an opportunity to help cafés, restaurants, hotels, clinics, and event 
                venues extend their brand identity to every aspect of their customer experience. 
                Custom branded water bottles aren't just functional – they're a statement of 
                quality and attention to detail.
              </p>
              <p>
                Starting with just a vision and determination, we've grown to serve numerous 
                businesses across the region, providing them with premium quality custom 
                branded water bottles that enhance their professional image.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-600 mb-8 text-center">
            Our Mission
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8">
            <p className="text-xl text-gray-800 text-center italic">
              "To empower businesses with premium custom branded water bottles that enhance 
              their professional image, strengthen brand identity, and create memorable 
              customer experiences – all while maintaining the highest standards of quality 
              and service."
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-600 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">
              Meet Our Founder
            </h2>
            <div className="text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl font-bold text-primary-600">SK</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Shivank Katiyar</h3>
              <p className="text-gray-600 mb-4">Founder & CEO</p>
              <p className="text-gray-700 max-w-2xl mx-auto">
                With a passion for entrepreneurship and a keen eye for business opportunities, 
                Shivank founded Shivuu Aqua Supplies to help businesses create stronger brand 
                connections with their customers. His commitment to quality and customer 
                satisfaction drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-600 mb-8 text-center">
            Why Businesses Choose Us
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-secondary-500 mr-3 text-2xl">✓</span>
                <div>
                  <strong>Premium Quality:</strong> We use only food-grade bottles and 
                  waterproof labels that maintain their appearance even when wet.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-3 text-2xl">✓</span>
                <div>
                  <strong>Professional Design:</strong> Our team helps you create labels 
                  that perfectly represent your brand.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-3 text-2xl">✓</span>
                <div>
                  <strong>Reliable Supply:</strong> We understand the importance of 
                  consistency. Count on us for timely deliveries.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-3 text-2xl">✓</span>
                <div>
                  <strong>Flexible Options:</strong> From demo bottles to bulk orders, 
                  we work with your needs and budget.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-3 text-2xl">✓</span>
                <div>
                  <strong>Local Service:</strong> Based in Uttar Pradesh, we understand 
                  the local market and provide personalized service.
                </div>
              </li>
            </ul>
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
            Let's discuss how custom branded water bottles can enhance your business
          </p>
          <a href="/inquiry" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg inline-block">
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

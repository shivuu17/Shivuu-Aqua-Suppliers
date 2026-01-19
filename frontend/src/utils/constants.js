// Business Constants
export const BUSINESS_PHONE = '+919876543210';
export const BUSINESS_WHATSAPP = '919876543210';
export const BUSINESS_EMAIL = 'contact@shivuuaqua.com';
export const BUSINESS_NAME = 'Shivuu Aqua Suppliers';
export const BUSINESS_ADDRESS = 'Delhi, India';
export const BUSINESS_HOURS = '9:00 AM - 6:00 PM (Mon-Sat)';

// API
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
export default API_BASE_URL;

// Products Data
export const PRODUCTS = [
  {
    id: 1,
    size: '250ml',
    priceRange: '₹8-12 per bottle',
    moq: 1000,
    description: 'Perfect for cafes and small restaurants. Compact size ideal for quick service.',
    deliveryTime: '7-10 days',
  },
  {
    id: 2,
    size: '500ml',
    priceRange: '₹10-15 per bottle',
    moq: 500,
    description: 'Most popular size for restaurants and hotels. Great for dining tables.',
    deliveryTime: '7-10 days',
  },
  {
    id: 3,
    size: '1L',
    priceRange: '₹15-20 per bottle',
    moq: 300,
    description: 'Ideal for events and large gatherings. Premium presentation.',
    deliveryTime: '7-10 days',
  },
];

// Features
export const FEATURES = [
  { title: 'Custom Branding', description: 'Add your logo and design to make bottles unique.' },
  { title: 'Quality Materials', description: 'Premium BPA-free plastic for durability.' },
  { title: 'Fast Delivery', description: '7-10 days turnaround time.' },
  { title: 'Competitive Pricing', description: 'Bulk discounts available for large orders.' },
];

// Testimonials
export const TESTIMONIALS = [
  { name: 'Rajesh Kumar', company: 'Delhi Restaurant Group', message: 'Great quality and excellent customer service. Highly recommended!' },
  { name: 'Priya Sharma', company: 'Event Management Co.', message: 'Perfect for our corporate events. Custom branding looks amazing.' },
  { name: 'Amit Singh', company: 'Fitness Center Chain', message: 'Our customers love these bottles. Best investment for our brand.' },
];

// FAQ
export const FAQ = [
  { question: 'What is the minimum order quantity?', answer: 'MOQ varies by size: 250ml (1000 units), 500ml (500 units), 1L (300 units).' },
  { question: 'Do you offer custom branding?', answer: 'Yes! We offer logo printing, embossing, and custom label options.' },
  { question: 'How long does delivery take?', answer: 'Standard delivery is 7-10 days. Rush orders can be accommodated.' },
  { question: 'What materials do you use?', answer: 'We use premium BPA-free, food-grade plastic for all bottles.' },
  { question: 'Do you offer discounts?', answer: 'Yes, bulk discounts available. Contact us for custom pricing.' },
  { question: 'Can I get a sample?', answer: 'Yes, we offer samples. Charges apply but credited on first order.' },
];

// Company Values
export const COMPANY_VALUES = [
  { title: 'Quality', description: 'We never compromise on product quality.' },
  { title: 'Integrity', description: 'Honest dealings and transparent pricing.' },
  { title: 'Service', description: 'Customer satisfaction is our priority.' },
  { title: 'Innovation', description: 'Always improving our products and services.' },
];

// Statistics
export const STATISTICS = [
  { number: '500+', label: 'Happy Clients' },
  { number: '10M+', label: 'Bottles Delivered' },
  { number: '8+', label: 'Years in Business' },
  { number: '99%', label: 'Customer Satisfaction' },
];

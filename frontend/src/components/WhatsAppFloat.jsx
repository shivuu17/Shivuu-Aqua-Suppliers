import { MessageCircle } from 'lucide-react';
import { BUSINESS_WHATSAPP } from '../utils/constants.js';

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=Hi%20Shivuu%20Aqua!%20I%20would%20like%20to%20know%20more%20about%20your%20custom%20branded%20water%20bottles.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-40 animate-pulse hover:animate-none"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}

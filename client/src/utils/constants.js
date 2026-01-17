export const BOTTLE_SIZES = ['250ml', '500ml', '1L'];

export const LABEL_STYLES = ['Classic', 'Premium', 'Traditional'];

export const INQUIRY_STATUS = ['New', 'Contacted', 'Converted'];

// File upload configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE_MB = 5;

export const BUSINESS_PHONE = '+919876543210';
export const BUSINESS_WHATSAPP = '919876543210';
export const BUSINESS_EMAIL = 'contact@shivuuaqua.com';

// Default WhatsApp message - can be customized by business owner
export const DEFAULT_WHATSAPP_MESSAGE = 'Hi, I want demo bottles for my cafe.';

export const WHATSAPP_MESSAGE = encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);

export const getWhatsAppLink = (message = WHATSAPP_MESSAGE) => {
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

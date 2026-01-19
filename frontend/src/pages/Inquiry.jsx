import { useState } from 'react';
import { Send, Loader, Check, AlertCircle } from 'lucide-react';
import api from '../services/api';

function Inquiry() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    city: '',
    bottleSize: '500ml',
    quantity: '',
    address: '',
    message: '',
    logoUrl: '',
    labelStyle: 'Classic',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.bottleSize) newErrors.bottleSize = 'Bottle size is required';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/inquiry', formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          city: '',
          bottleSize: '500ml',
          quantity: '',
          address: '',
          message: '',
          logoUrl: '',
          labelStyle: 'Classic',
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      setError(
        err.response?.data?.message || 
        'Failed to submit inquiry. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Inquiry</h1>
          <p className="text-lg text-white/90">Tell us about your custom bottle needs</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="glass-card p-8 md:p-12 soft-shadow">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900">Inquiry Submitted Successfully!</h3>
                  <p className="text-sm text-green-800 mt-1">We'll contact you shortly to discuss your requirements.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Error</h3>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none ${
                    errors.name
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-primary-200'
                  }`}
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your business name"
                  className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none ${
                    errors.businessName
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-primary-200'
                  }`}
                />
                {errors.businessName && <p className="text-sm text-red-600 mt-1">{errors.businessName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none ${
                    errors.phone
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-primary-200'
                  }`}
                />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none ${
                    errors.city
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-primary-200'
                  }`}
                />
                {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
              </div>

              {/* Bottle Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Bottle Size *
                </label>
                <select
                  name="bottleSize"
                  value={formData.bottleSize}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none ${
                    errors.bottleSize
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-primary-200'
                  }`}
                >
                  <option value="250ml">250ml</option>
                  <option value="500ml">500ml</option>
                  <option value="1L">1L</option>
                </select>
                {errors.bottleSize && <p className="text-sm text-red-600 mt-1">{errors.bottleSize}</p>}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity *
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Number of bottles required"
                  className={`w-full px-4 py-2.5 border rounded-lg transition focus:outline-none ${
                    errors.quantity
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-2 focus:ring-primary-200'
                  }`}
                />
                {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Delivery address (optional)"
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific requirements or questions?"
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  placeholder="URL of your logo image (optional)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>

              {/* Label Style */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Label Style
                </label>
                <select
                  name="labelStyle"
                  value={formData.labelStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="Classic">Classic</option>
                  <option value="Premium">Premium</option>
                  <option value="Traditional">Traditional</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Inquiry
                  </>
                )}
              </button>

              <p className="text-xs text-gray-600 text-center">
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inquiry;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';
import { BOTTLE_SIZES, validatePhone, getWhatsAppLink } from '../utils/constants';

const Inquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Pre-fill form if coming from custom label page
  useEffect(() => {
    if (location.state) {
      const { businessName, bottleSize, labelStyle, logoUrl } = location.state;
      if (businessName) setValue('businessName', businessName);
      if (bottleSize) setValue('bottleSize', bottleSize);
      if (labelStyle) setValue('labelStyle', labelStyle);
      if (logoUrl) setValue('logoUrl', logoUrl);
    }
  }, [location.state, setValue]);

  const onSubmit = async (data) => {
    // Validate phone
    if (!validatePhone(data.phone)) {
      toast.error('Please enter a valid 10-digit Indian phone number');
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post('/inquiry', data);
      
      if (response.data.success) {
        toast.success('Inquiry submitted successfully! We will contact you soon.');
        
        // Optionally open WhatsApp
        const whatsappMessage = encodeURIComponent(
          `Hi, I've submitted an inquiry for ${data.bottleSize} bottles for my business ${data.businessName}.`
        );
        const confirmWhatsApp = window.confirm(
          'Would you like to connect with us on WhatsApp for faster response?'
        );
        
        if (confirmWhatsApp) {
          window.open(getWhatsAppLink(whatsappMessage), '_blank');
        }
        
        // Reset and redirect
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit inquiry';
      toast.error(message);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                {...register('businessName', { required: 'Business name is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your business name"
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="10-digit mobile number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                {...register('city', { required: 'City is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* Bottle Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bottle Size *
              </label>
              <select
                {...register('bottleSize', { required: 'Bottle size is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select bottle size</option>
                {BOTTLE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              {errors.bottleSize && (
                <p className="mt-1 text-sm text-red-600">{errors.bottleSize.message}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity Required *
              </label>
              <select
                {...register('quantity', { required: 'Quantity is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select quantity</option>
                <option value="500-1000 bottles/week">500-1000 bottles/week</option>
                <option value="1000-2000 bottles/week">1000-2000 bottles/week</option>
                <option value="2000-5000 bottles/week">2000-5000 bottles/week</option>
                <option value="1000-2000 bottles/month">1000-2000 bottles/month</option>
                <option value="2000-5000 bottles/month">2000-5000 bottles/month</option>
                <option value="5000+ bottles/month">5000+ bottles/month</option>
                <option value="Custom quantity">Custom quantity</option>
              </select>
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                {...register('address')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your delivery address"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests / Notes
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Any special requirements or questions?"
              />
            </div>

            {/* Hidden fields for logo and label style if coming from custom label */}
            <input type="hidden" {...register('logoUrl')} />
            <input type="hidden" {...register('labelStyle')} />

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> After submitting, you can also connect with us 
              directly on WhatsApp for faster response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;

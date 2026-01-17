import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { BOTTLE_SIZES, LABEL_STYLES, MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from '../utils/constants';

const CustomLabel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    bottleSize: '500ml',
    labelStyle: 'Classic',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!logoFile) {
      toast.error('Please select a logo file');
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('logo', logoFile);

    try {
      const response = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLogoUrl(response.data.url);
      toast.success('Logo uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload logo');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.businessName) {
      toast.error('Please enter your business name');
      return;
    }

    // Navigate to inquiry page with pre-filled data
    navigate('/inquiry', {
      state: {
        businessName: formData.businessName,
        bottleSize: formData.bottleSize,
        labelStyle: formData.labelStyle,
        logoUrl: logoUrl,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4">
            Design Your Custom Label
          </h1>
          <p className="text-xl text-gray-600">
            Upload your logo and customize your bottle labels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Label Details</h2>

            {/* Business Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your business name"
              />
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-h-32 mx-auto mb-2"
                    />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  )}
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>
              {logoFile && !logoUrl && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-3 w-full btn-primary disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload Logo'}
                </button>
              )}
              {logoUrl && (
                <p className="mt-2 text-sm text-green-600">✓ Logo uploaded successfully</p>
              )}
            </div>

            {/* Bottle Size */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bottle Size *
              </label>
              <select
                value={formData.bottleSize}
                onChange={(e) =>
                  setFormData({ ...formData, bottleSize: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {BOTTLE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Label Style */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Label Style *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {LABEL_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setFormData({ ...formData, labelStyle: style })}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      formData.labelStyle === style
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleSubmit} className="w-full btn-primary">
              Continue to Inquiry
            </button>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
            <div className="bg-gradient-to-b from-primary-50 to-secondary-50 rounded-lg p-8 text-center">
              <Package className="h-48 w-48 text-secondary-400 mx-auto mb-4" />
              {formData.businessName && (
                <p className="text-xl font-bold text-primary-600 mb-2">
                  {formData.businessName}
                </p>
              )}
              <p className="text-gray-600 mb-1">Size: {formData.bottleSize}</p>
              <p className="text-gray-600">Style: {formData.labelStyle}</p>
              {logoUrl && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <img src={logoUrl} alt="Logo" className="max-h-20 mx-auto" />
                </div>
              )}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This is a basic preview. Our design team will 
                create a professional mockup and send it for your approval before 
                production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLabel;

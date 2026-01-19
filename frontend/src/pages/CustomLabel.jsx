import { useState, useRef } from 'react';
import { Upload, Loader, Check, AlertCircle, X } from 'lucide-react';
import api from '../services/api';

function CustomLabel() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const fileInputRef = useRef(null);

  const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setError('Please upload an image file (JPG, PNG, GIF, or WebP)');
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target.result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!logoPreview) {
      setError('Please select an image file first');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Convert data URL to blob
      const response = await fetch(logoPreview);
      const blob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append('file', blob);

      // Upload file
      const uploadResponse = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (uploadResponse.data.success) {
        setSuccess('Logo uploaded successfully!');
        setUploadedUrl(uploadResponse.data.data.url);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setSuccess(null);
          setLogoPreview(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }, 3000);
      }
    } catch (err) {
      console.error('Failed to upload logo:', err);
      setError(
        err.response?.data?.message || 
        'Failed to upload logo. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setLogoPreview(null);
    setUploadedUrl(null);
    setSuccess(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="gradient-bg text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Custom Labels</h1>
          <p className="text-lg text-white/90">Upload your logo and customize bottle labels</p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="glass-card p-8 md:p-12 soft-shadow">
            {/* Status Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Error</h3>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900">Upload Successful!</h3>
                  <p className="text-sm text-green-800 mt-1">{success}</p>
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Upload Your Logo
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                  logoPreview
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-100'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {logoPreview ? (
                  <div className="space-y-4">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-h-48 mx-auto object-contain"
                    />
                    <p className="text-sm font-medium text-gray-700">
                      Logo selected. Click to change.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 mx-auto text-primary-600 opacity-50" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        JPG, PNG, GIF or WebP (max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {logoPreview && (
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Logo
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  disabled={uploading}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={18} />
                  Clear
                </button>
              </div>
            )}

            {/* Uploaded URL Display */}
            {uploadedUrl && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">Logo URL:</p>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-100 break-all">
                  <code className="text-xs text-gray-600 flex-1">{uploadedUrl}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(uploadedUrl);
                      alert('URL copied to clipboard!');
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Label Design Tips:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Use high-resolution images (300 DPI) for best printing quality</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Keep logos within safe margins to avoid cutting edges</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Supported formats: JPG, PNG, GIF, WebP</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Maximum file size: 5MB</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Test label placement on sample bottles before bulk order</span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. Upload your logo above</li>
                <li>2. Copy the URL and share it in your inquiry form</li>
                <li>3. Choose your preferred label style (Classic, Premium, Traditional)</li>
                <li>4. Submit your inquiry with the logo URL</li>
                <li>5. Our team will contact you with detailed quotes and samples</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomLabel;

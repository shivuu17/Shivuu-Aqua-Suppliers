import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  bottleSize: {
    type: String,
    required: [true, 'Bottle size is required'],
    enum: ['250ml', '500ml', '1L'],
  },
  quantity: {
    type: String,
    required: [true, 'Quantity is required'],
  },
  address: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  logoUrl: {
    type: String,
  },
  labelStyle: {
    type: String,
    enum: ['Classic', 'Premium', 'Traditional'],
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Converted'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Inquiry', inquirySchema);

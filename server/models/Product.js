import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['250ml', '500ml', '1L'],
  },
  priceRange: {
    type: String,
  },
  MOQ: {
    type: Number,
    required: [true, 'MOQ is required'],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  deliveryTime: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);

import express from 'express';
import Product from '../models/Product.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all products (Public)
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ size: 1 });
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

// Add product (Admin)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

// Update product (Admin)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

// Delete product (Admin)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

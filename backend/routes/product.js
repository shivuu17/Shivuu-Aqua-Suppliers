import express from 'express';
import { supabase } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all products (Public)
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('size', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    next(error);
  }
});

// Add product (Admin)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { size, priceRange, MOQ, description, imageUrl, deliveryTime } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert({
        size,
        price_range: priceRange,
        moq: MOQ,
        description,
        image_url: imageUrl,
        delivery_time: deliveryTime,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// Update product (Admin)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { size, priceRange, MOQ, description, imageUrl, deliveryTime } = req.body;

    const { data, error } = await supabase
      .from('products')
      .update({
        size,
        price_range: priceRange,
        moq: MOQ,
        description,
        image_url: imageUrl,
        delivery_time: deliveryTime,
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// Delete product (Admin)
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

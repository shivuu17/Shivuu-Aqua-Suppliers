import express from 'express';
import { body, validationResult } from 'express-validator';
import { getSupabase } from '../config/db.js';
import { sendInquiryConfirmation } from '../utils/email.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create inquiry (Public)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('businessName').trim().notEmpty().withMessage('Business name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('bottleSize').isIn(['250ml', '500ml', '1L']).withMessage('Invalid bottle size'),
    body('quantity').trim().notEmpty().withMessage('Quantity is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, businessName, phone, city, bottleSize, quantity, address, message, logoUrl, labelStyle } = req.body;

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          name,
          business_name: businessName,
          phone,
          city,
          bottle_size: bottleSize,
          quantity,
          address,
          message,
          logo_url: logoUrl,
          label_style: labelStyle,
          status: 'New',
        })
        .select()
        .single();

      if (error) throw error;

      // Send email notification
      try {
        await sendInquiryConfirmation(data);
      } catch (emailError) {
        console.error('Failed to send email:', emailError.message);
      }

      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get all inquiries (Admin)
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    let query = supabase
      .from('inquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((pageNum - 1) * limitNum, pageNum * limitNum - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      total: count,
    });
  } catch (error) {
    next(error);
  }
});

// Update inquiry status (Admin)
router.patch('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['New', 'Contacted', 'Converted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// Export inquiries to CSV (Admin)
router.get('/export/csv', authMiddleware, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Helper function to escape CSV fields
    const escapeCsvField = (field) => {
      if (field == null) return '';
      const str = String(field);
      // Escape double quotes and wrap in quotes if contains special chars
      if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Create CSV header
    const csvHeader = 'Name,Business Name,Phone,City,Bottle Size,Quantity,Address,Status,Created At\n';
    
    // Create CSV rows
    const csvRows = (data || []).map(inquiry => 
      [
        escapeCsvField(inquiry.name),
        escapeCsvField(inquiry.business_name),
        escapeCsvField(inquiry.phone),
        escapeCsvField(inquiry.city),
        escapeCsvField(inquiry.bottle_size),
        escapeCsvField(inquiry.quantity),
        escapeCsvField(inquiry.address),
        escapeCsvField(inquiry.status),
        escapeCsvField(inquiry.created_at)
      ].join(',')
    ).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inquiries.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

export default router;

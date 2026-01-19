import express from 'express';
import { body, validationResult } from 'express-validator';
import Inquiry from '../models/Inquiry.js';
import { sendInquiryConfirmation } from '../utils/email.js';
import { authMiddleware } from '../middleware/auth.js';
import { syncInquiryToSupabase } from '../utils/supabaseClient.js';

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

      const inquiry = await Inquiry.create(req.body);

      // Optional: replicate inquiry data to Supabase if configured
      try {
        await syncInquiryToSupabase(inquiry);
      } catch (syncError) {
        console.error('Failed to sync inquiry to Supabase:', syncError.message);
      }
      
      // Send email notification
      await sendInquiryConfirmation(inquiry);

      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry,
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
    const query = status ? { status } : {};

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Inquiry.countDocuments(query);

    res.json({
      success: true,
      data: inquiries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
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

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
});

// Export inquiries to CSV (Admin)
router.get('/export/csv', authMiddleware, async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

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
    const csvRows = inquiries.map(inquiry => 
      [
        escapeCsvField(inquiry.name),
        escapeCsvField(inquiry.businessName),
        escapeCsvField(inquiry.phone),
        escapeCsvField(inquiry.city),
        escapeCsvField(inquiry.bottleSize),
        escapeCsvField(inquiry.quantity),
        escapeCsvField(inquiry.address),
        escapeCsvField(inquiry.status),
        escapeCsvField(inquiry.createdAt)
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

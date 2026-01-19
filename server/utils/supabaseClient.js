import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

export const supabase = supabaseEnabled
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

export const syncInquiryToSupabase = async (inquiry) => {
  if (!supabaseEnabled || !supabase) return;

  const { error } = await supabase.from('inquiries').insert({
    mongo_id: inquiry._id?.toString(),
    name: inquiry.name,
    business_name: inquiry.businessName,
    phone: inquiry.phone,
    city: inquiry.city,
    bottle_size: inquiry.bottleSize,
    quantity: inquiry.quantity,
    address: inquiry.address,
    message: inquiry.message,
    label_style: inquiry.labelStyle,
    logo_url: inquiry.logoUrl,
    status: inquiry.status,
    created_at: inquiry.createdAt,
  });

  if (error) {
    console.error('Supabase sync failed:', error.message);
  }
};

import { createClient } from "@/lib/supabase/client";

export async function createBooking(data: {
  service_id: string;
  address_id: string;
  scheduled_date: string;
  scheduled_time: string;
  total_amount: number;
  payment_method: "cash" | "card" | "transfer";
  customer_notes?: string;
  promo_code_id?: string;
  discount_amount?: number;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({ ...data, customer_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return booking;
}

export async function getCustomerBookings() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(name, emoji, base_price), technicians(name, rating), addresses(street, city, state)")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTechnicianBookings(technicianId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(name, emoji), users(name, phone), addresses(street, city, state)")
    .eq("technician_id", technicianId)
    .order("scheduled_date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function saveAddress(data: {
  street: string;
  city: string;
  state: string;
  label?: string;
  is_default?: boolean;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: address, error } = await supabase
    .from("addresses")
    .insert({ ...data, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return address;
}

export async function validatePromoCode(code: string, orderAmount: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single();

  if (error || !data) return { valid: false, message: "Invalid promo code" };
  if (data.expires_at && new Date(data.expires_at) < new Date())
    return { valid: false, message: "Promo code has expired" };
  if (data.max_uses && data.used_count >= data.max_uses)
    return { valid: false, message: "Promo code has reached its limit" };
  if (orderAmount < data.min_order_amount)
    return { valid: false, message: `Minimum order of ₦${data.min_order_amount.toLocaleString()} required` };

  const discount =
    data.discount_type === "percentage"
      ? (orderAmount * data.discount_value) / 100
      : data.discount_value;

  return { valid: true, discount, promoId: data.id, message: `${data.discount_value}${data.discount_type === "percentage" ? "%" : "₦"} off applied!` };
}

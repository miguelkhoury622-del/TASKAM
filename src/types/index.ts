export type UserRole = "customer" | "technician" | "admin";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Technician {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatar_url?: string;
  bio?: string;
  status: "pending" | "approved" | "suspended" | "rejected";
  rating: number;
  total_jobs: number;
  is_available: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon_url?: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  category_id: string;
  category?: Category;
  name: string;
  description?: string;
  base_price: number;
  price_unit: "fixed" | "per_hour";
  duration_minutes?: number;
  image_url?: string;
  is_active: boolean;
  is_featured: boolean;
}

export interface Address {
  id: string;
  user_id: string;
  label?: string;
  street: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  is_default: boolean;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "on_the_way"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  customer_id: string;
  technician_id?: string;
  service_id: string;
  address_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: BookingStatus;
  total_amount: number;
  payment_method: "cash" | "card" | "transfer";
  payment_status: "unpaid" | "paid" | "refunded";
  discount_amount: number;
  customer_notes?: string;
  created_at: string;
  service?: Service;
  technician?: Technician;
  address?: Address;
}

export interface Review {
  id: string;
  booking_id: string;
  customer_id: string;
  technician_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  customer?: User;
}

export interface Message {
  id: string;
  booking_id: string;
  sender_id: string;
  sender_type: "customer" | "technician";
  content: string;
  read_at?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  receiver_id: string;
  receiver_type: "customer" | "technician" | "admin";
  title: string;
  body?: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_amount: number;
  max_uses?: number;
  used_count: number;
  expires_at?: string;
  is_active: boolean;
}

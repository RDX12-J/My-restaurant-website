export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  dietary_tags: string[];
  display_order: number;
  created_at: string;
  category?: Category;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  special_requests: string | null;
  status: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  rating: number;
  content: string;
  display_order: number;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  category: string;
  display_order: number;
  created_at: string;
}

export interface RestaurantInfo {
  id: string;
  name: string | null;
  tagline: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours_mon_fri: string | null;
  hours_sat_sun: string | null;
  hero_image_url: string | null;
  about_image_url: string | null;
}

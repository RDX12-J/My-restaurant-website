import { supabase } from './supabase';
import type {
  Category,
  MenuItem,
  Testimonial,
  GalleryImage,
  RestaurantInfo,
  Reservation,
  ContactMessage,
} from './types';

export async function fetchRestaurantInfo(): Promise<RestaurantInfo | null> {
  const { data, error } = await supabase
    .from('restaurant_info')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error('Error fetching restaurant info:', error);
    return null;
  }
  return data;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*)')
    .order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  return data;
}

export async function fetchFeaturedMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*)')
    .eq('is_featured', true)
    .order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching featured items:', error);
    return [];
  }
  return data;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data;
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
  return data;
}

export async function createReservation(
  reservation: Omit<Reservation, 'id' | 'status' | 'created_at'>
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('reservations').insert([reservation]);
  if (error) {
    console.error('Error creating reservation:', error);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

export async function createContactMessage(
  message: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('contact_messages').insert([message]);
  if (error) {
    console.error('Error creating contact message:', error);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

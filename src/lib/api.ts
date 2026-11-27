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

const demoCategories: Category[] = [
  { id: 'cat-1', name: 'Appetizers', slug: 'appetizers', display_order: 1, created_at: '' },
  { id: 'cat-2', name: 'Main Courses', slug: 'main-courses', display_order: 2, created_at: '' },
  { id: 'cat-3', name: 'Desserts', slug: 'desserts', display_order: 3, created_at: '' },
];

const demoMenuItems: MenuItem[] = [
  {
    id: 'dish-1',
    category_id: 'cat-1',
    name: 'Truffle Arancini',
    description: 'Crisp risotto bites with wild mushrooms, parmesan and truffle aioli.',
    price: 18,
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
    is_featured: true,
    is_available: true,
    dietary_tags: ['vegetarian'],
    display_order: 1,
    created_at: '',
    category: demoCategories[0],
  },
  {
    id: 'dish-2',
    category_id: 'cat-2',
    name: 'Herb-Crusted Salmon',
    description: 'Atlantic salmon, roasted asparagus, citrus beurre blanc and garden herbs.',
    price: 32,
    image_url: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
    is_featured: true,
    is_available: true,
    dietary_tags: ['gluten-free'],
    display_order: 2,
    created_at: '',
    category: demoCategories[1],
  },
  {
    id: 'dish-3',
    category_id: 'cat-2',
    name: 'Charred Ribeye',
    description: 'Prime ribeye with smoked garlic butter, seasonal vegetables and jus.',
    price: 42,
    image_url: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
    is_featured: true,
    is_available: true,
    dietary_tags: ['gluten-free'],
    display_order: 3,
    created_at: '',
    category: demoCategories[1],
  },
  {
    id: 'dish-4',
    category_id: 'cat-2',
    name: 'Wild Mushroom Pasta',
    description: 'Fresh tagliatelle, porcini cream, aged parmesan and crisp sage.',
    price: 26,
    image_url: 'https://images.pexels.com/photos/12737816/pexels-photo-12737816.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
    is_featured: false,
    is_available: true,
    dietary_tags: ['vegetarian'],
    display_order: 4,
    created_at: '',
    category: demoCategories[1],
  },
  {
    id: 'dish-5',
    category_id: 'cat-1',
    name: 'Seared Prawns',
    description: 'Jumbo prawns with chilli butter, grilled lemon and fresh herbs.',
    price: 21,
    image_url: 'https://images.pexels.com/photos/8697544/pexels-photo-8697544.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
    is_featured: false,
    is_available: true,
    dietary_tags: ['spicy', 'gluten-free'],
    display_order: 5,
    created_at: '',
    category: demoCategories[0],
  },
  {
    id: 'dish-6',
    category_id: 'cat-3',
    name: 'Chocolate Ganache',
    description: 'Dark chocolate ganache, salted caramel, cocoa crumble and vanilla cream.',
    price: 14,
    image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&h=600&w=800',
    is_featured: false,
    is_available: true,
    dietary_tags: ['vegetarian'],
    display_order: 6,
    created_at: '',
    category: demoCategories[2],
  },
];

const demoTestimonials: Testimonial[] = [
  {
    id: 'review-1',
    author_name: 'Emily Carter',
    author_role: 'Local Guide',
    rating: 5,
    content: 'An elegant evening with beautiful presentation and genuinely warm service.',
    display_order: 1,
    created_at: '',
  },
  {
    id: 'review-2',
    author_name: 'Daniel Moore',
    author_role: 'Food Enthusiast',
    rating: 5,
    content: 'The salmon was exceptional and every plate felt thoughtfully prepared.',
    display_order: 2,
    created_at: '',
  },
  {
    id: 'review-3',
    author_name: 'Sophia Lee',
    author_role: 'Regular Guest',
    rating: 5,
    content: 'Our favorite place for celebrations. Great atmosphere and outstanding desserts.',
    display_order: 3,
    created_at: '',
  },
];

const demoGallery: GalleryImage[] = [
  { id: 'gallery-1', title: 'Elegant Dining Room', image_url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', category: 'interior', display_order: 1, created_at: '' },
  { id: 'gallery-2', title: 'Chef at Work', image_url: 'https://images.pexels.com/photos/4253309/pexels-photo-4253309.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', category: 'chef', display_order: 2, created_at: '' },
  { id: 'gallery-3', title: 'Signature Salmon', image_url: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', category: 'food', display_order: 3, created_at: '' },
  { id: 'gallery-4', title: 'Fresh Ingredients', image_url: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', category: 'food', display_order: 4, created_at: '' },
  { id: 'gallery-5', title: 'Private Dining', image_url: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', category: 'interior', display_order: 5, created_at: '' },
  { id: 'gallery-6', title: 'Dessert Selection', image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', category: 'food', display_order: 6, created_at: '' },
];

const demoRestaurantInfo: RestaurantInfo = {
  id: 'restaurant-1',
  name: 'Saveur',
  tagline: 'Modern Fine Dining',
  description: 'Where culinary artistry meets warm hospitality. Experience unforgettable flavors crafted with locally-sourced ingredients.',
  address: '128 Maple Grove Avenue, San Francisco, CA',
  phone: '(415) 555-0192',
  email: 'hello@saveurrestaurant.com',
  hours_mon_fri: '11:30 AM – 10:00 PM',
  hours_sat_sun: '5:00 PM – 11:30 PM',
  hero_image_url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600',
  about_image_url: 'https://images.pexels.com/photos/4253309/pexels-photo-4253309.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
};

export async function fetchRestaurantInfo(): Promise<RestaurantInfo | null> {
  if (!supabase) return demoRestaurantInfo;

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
  if (!supabase) return demoCategories;

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
  if (!supabase) return demoMenuItems;

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
  if (!supabase) return demoMenuItems.filter((item) => item.is_featured);

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
  if (!supabase) return demoTestimonials;

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
  if (!supabase) return demoGallery;

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
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured.' };
  }

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
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  const { error } = await supabase.from('contact_messages').insert([message]);
  if (error) {
    console.error('Error creating contact message:', error);
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

import { useState, useEffect } from 'react';
import { Star, ArrowRight, Quote, Award, Leaf, Flame } from 'lucide-react';
import type { Page } from '@/lib/useNavigation';
import type { MenuItem, Testimonial, RestaurantInfo } from '@/lib/types';
import { fetchFeaturedMenuItems, fetchTestimonials, fetchRestaurantInfo } from '@/lib/api';
import Loading from '@/components/Loading';

interface HomeProps {
  navigate: (page: Page) => void;
}

const tagIcons: Record<string, typeof Leaf> = {
  vegetarian: Leaf,
  vegan: Leaf,
  'gluten-free': Award,
  spicy: Flame,
};

export default function Home({ navigate }: HomeProps) {
  const [featured, setFeatured] = useState<MenuItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [feat, test, restInfo] = await Promise.all([
        fetchFeaturedMenuItems(),
        fetchTestimonials(),
        fetchRestaurantInfo(),
      ]);
      setFeatured(feat);
      setTestimonials(test);
      setInfo(restInfo);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading message="Preparing your table..." />;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={info?.hero_image_url || 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600'}
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6">
              {info?.tagline || 'Modern Fine Dining'}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight mb-8 text-balance">
              A Culinary Journey
              <span className="block text-accent italic">Worth Savoring</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              {info?.description || 'Where culinary artistry meets warm hospitality. Experience unforgettable flavors crafted with locally-sourced ingredients.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('reservation')}
                className="group px-8 py-4 bg-accent text-black text-sm font-semibold tracking-wide uppercase hover:bg-accent-light transition-all duration-300 flex items-center gap-2"
              >
                Reserve a Table
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('menu')}
                className="px-8 py-4 border border-white/30 text-white text-sm font-semibold tracking-wide uppercase hover:border-accent hover:text-accent transition-all duration-300"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
      </section>

      {/* Featured Dishes */}
      <section className="py-24 md:py-32 bg-[#0c0c0c]">
        <div className="section-padding">
          <div className="text-center mb-16">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Chef's Selection</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
              Signature Dishes
            </h2>
            <div className="w-16 h-px bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-[#1a1a1a] rounded-sm cursor-pointer"
                onClick={() => navigate('menu')}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image_url || ''}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-accent text-black px-3 py-1 text-sm font-semibold">
                    ${item.price}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-accent text-xs tracking-wider uppercase mb-2">
                    {item.category?.name}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {item.dietary_tags.map((tag) => {
                      const Icon = tagIcons[tag];
                      return Icon ? (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs text-gray-500 capitalize"
                        >
                          <Icon className="w-3 h-3" />
                          {tag}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('menu')}
              className="group inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase hover:gap-4 transition-all duration-300"
            >
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-[#131313] relative overflow-hidden">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-slide-in-left">
              <div className="relative">
                <img
                  src={info?.about_image_url || 'https://images.pexels.com/photos/4253309/pexels-photo-4253309.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200'}
                  alt="Our chefs at work"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent text-black p-6 w-40 h-40 flex flex-col items-center justify-center">
                  <span className="font-serif text-5xl font-bold">12+</span>
                  <span className="text-xs tracking-wider uppercase mt-1">Years of<br />Excellence</span>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                A Passion for the
                <span className="block text-accent italic">Extraordinary</span>
              </h2>
              <div className="w-16 h-px bg-accent mb-8" />
              <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light">
                {info?.description}
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our kitchen is led by award-winning chefs who blend classical techniques with modern innovation. Every dish is a celebration of seasonal, locally-sourced ingredients and the artistry of fine cooking. We believe dining is more than a meal — it is an experience that engages all the senses.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="border-l-2 border-accent pl-4">
                  <p className="font-serif text-3xl text-white font-semibold">50+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Menu Items</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="font-serif text-3xl text-white font-semibold">15K+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Guests Served</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="font-serif text-3xl text-white font-semibold">8</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Awards Won</p>
                </div>
              </div>
              <button
                onClick={() => navigate('gallery')}
                className="group inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wide uppercase hover:gap-4 transition-all duration-300"
              >
                Explore Gallery
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-[#0c0c0c]">
        <div className="section-padding">
          <div className="text-center mb-16">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Guest Voices</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
              What Our Guests Say
            </h2>
            <div className="w-16 h-px bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {testimonials.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="bg-[#1a1a1a] p-8 border border-white/5 hover:border-accent/30 transition-colors duration-500 group"
              >
                <Quote className="w-8 h-8 text-accent/40 mb-4 group-hover:text-accent/70 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'fill-accent text-accent' : 'text-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm font-light italic">
                  "{t.content}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-medium">{t.author_name}</p>
                  <p className="text-xs text-accent tracking-wider uppercase mt-1">{t.author_role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/20184692/pexels-photo-20184692.jpeg?auto=compress&cs=tinysrgb&h=800&w=1600"
            alt="Reserve"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 text-center section-padding">
          <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-6 text-balance">
            Reserve Your<br />
            <span className="text-accent italic">Unforgettable Evening</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Join us for an extraordinary dining experience. Whether it's a celebration or an intimate dinner, we'll make it memorable.
          </p>
          <button
            onClick={() => navigate('reservation')}
            className="group px-10 py-4 bg-accent text-black text-sm font-semibold tracking-wide uppercase hover:bg-accent-light transition-all duration-300 inline-flex items-center gap-2"
          >
            Book Your Table
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}

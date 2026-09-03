import { useState, useEffect, useMemo } from 'react';
import { Leaf, Award, Flame, Wheat, Search } from 'lucide-react';
import type { Category, MenuItem } from '@/lib/types';
import { fetchCategories, fetchMenuItems } from '@/lib/api';
import Loading from '@/components/Loading';

const tagIcons: Record<string, typeof Leaf> = {
  vegetarian: Leaf,
  vegan: Leaf,
  'gluten-free': Award,
  spicy: Flame,
};

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      const [cats, menuItems] = await Promise.all([
        fetchCategories(),
        fetchMenuItems(),
      ]);
      setCategories(cats);
      setItems(menuItems);
      setLoading(false);
    })();
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;
    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category?.slug === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description?.toLowerCase().includes(query) ?? false)
      );
    }
    return result;
  }, [items, activeCategory, searchQuery]);

  if (loading) return <Loading message="Crafting the menu..." />;

  return (
    <div className="pt-24">
      {/* Menu Header */}
      <section className="py-16 md:py-24 bg-[#0c0c0c] text-center">
        <div className="section-padding">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Menu</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6">
            A Symphony of <span className="italic text-accent">Flavors</span>
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Each dish is thoughtfully crafted using the finest seasonal ingredients. Explore our curated selection of appetizers, mains, and desserts.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="sticky top-16 z-30 bg-[#0c0c0c]/95 backdrop-blur-md border-y border-white/10 py-4">
        <div className="section-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-accent text-black'
                    : 'border border-white/15 text-gray-400 hover:border-accent hover:text-accent'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                    activeCategory === cat.slug
                      ? 'bg-accent text-black'
                      : 'border border-white/15 text-gray-400 hover:border-accent hover:text-accent'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <section className="py-16 md:py-24 bg-[#0c0c0c] min-h-[50vh]">
        <div className="section-padding">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No dishes found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-5 group animate-fade-in-up"
                  style={{ animationDelay: `${(index % 4) * 0.1}s`, opacity: 0 }}
                >
                  <div className="shrink-0 w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-sm">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                        <span className="text-gray-600 text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-accent transition-colors duration-300">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-accent text-lg font-serif font-semibold">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 h-px border-b border-dashed border-white/10 -mt-1 mb-2" />
                    <p className="text-sm text-gray-400 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {item.dietary_tags.map((tag) => {
                        const Icon = tagIcons[tag];
                        return (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-xs text-gray-500 capitalize"
                          >
                            {Icon && <Icon className="w-3 h-3" />}
                            {tag}
                          </span>
                        );
                      })}
                      {item.is_featured && (
                        <span className="text-xs text-accent tracking-wider uppercase font-medium">
                          Chef's Pick
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

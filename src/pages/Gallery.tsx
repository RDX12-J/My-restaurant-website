import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import type { GalleryImage } from '@/lib/types';
import { fetchGalleryImages } from '@/lib/api';
import Loading from '@/components/Loading';

const categoryLabels: Record<string, string> = {
  all: 'All',
  interior: 'Interior',
  food: 'Food',
  chef: 'In the Kitchen',
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory);

  if (loading) return <Loading message="Curating the gallery..." />;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#0c0c0c] text-center">
        <div className="section-padding">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Visual Journey</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6">
            The <span className="italic text-accent">Gallery</span>
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Step inside Saveur through our lens. Explore the ambiance, the cuisine, and the craftsmanship that define us.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-[#0c0c0c]/95 backdrop-blur-md border-y border-white/10 py-4">
        <div className="section-padding flex items-center justify-center gap-2 flex-wrap">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-accent text-black'
                  : 'border border-white/15 text-gray-400 hover:border-accent hover:text-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-[#0c0c0c] min-h-[50vh]">
        <div className="section-padding">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
              {filtered.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden cursor-pointer ${
                    index % 5 === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                  onClick={() => setLightbox(image)}
                >
                  <div className={`overflow-hidden ${index % 5 === 0 ? 'h-64 sm:h-80' : 'h-64'}`}>
                    <img
                      src={image.image_url}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <ZoomIn className="w-8 h-8 text-accent" />
                    <p className="text-white font-serif text-lg">{image.title}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      {categoryLabels[image.category] || image.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-accent transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image_url}
              alt={lightbox.title || 'Gallery image'}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="text-white font-serif text-xl">{lightbox.title}</p>
              <p className="text-accent text-xs uppercase tracking-wider mt-1">
                {categoryLabels[lightbox.category] || lightbox.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

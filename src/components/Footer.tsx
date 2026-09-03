import { MapPin, Phone, Mail, Clock, UtensilsCrossed, Instagram, Facebook, Twitter } from 'lucide-react';
import type { Page } from '@/lib/useNavigation';
import type { RestaurantInfo } from '@/lib/types';

interface FooterProps {
  navigate: (page: Page) => void;
  info: RestaurantInfo | null;
}

export default function Footer({ navigate, info }: FooterProps) {
  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Reservations', page: 'reservation' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <UtensilsCrossed className="w-6 h-6 text-accent" />
              <span className="font-serif text-2xl font-semibold text-white">
                {info?.name || 'Saveur'}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {info?.tagline}. {info?.description?.slice(0, 120)}...
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-colors duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-colors duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm text-gray-400 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Visit Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{info?.address || '128 Maple Grove Avenue, San Francisco, CA'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${info?.phone}`} className="hover:text-accent transition-colors">
                  {info?.phone || '(415) 555-0192'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${info?.email}`} className="hover:text-accent transition-colors">
                  {info?.email || 'hello@saveurrestaurant.com'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Hours
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Mon – Fri</p>
                  <p>{info?.hours_mon_fri || '11:30 AM – 10:00 PM'}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Sat – Sun</p>
                  <p>{info?.hours_sat_sun || '5:00 PM – 11:30 PM'}</p>
                </div>
              </li>
            </ul>
            <button
              onClick={() => navigate('reservation')}
              className="mt-6 px-6 py-2.5 border border-accent text-accent text-xs font-medium tracking-wide uppercase hover:bg-accent hover:text-black transition-all duration-300"
            >
              Reserve Now
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {info?.name || 'Saveur'} Restaurant. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Crafted with passion for fine dining.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import type { Page } from '@/lib/useNavigation';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  restaurantName: string;
}

const navItems: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Menu', page: 'menu' },
  { label: 'Reservations', page: 'reservation' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, navigate, restaurantName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-[#0c0c0c]/95 backdrop-blur-md shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-padding flex items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group"
        >
          <UtensilsCrossed className="w-7 h-7 text-accent transition-transform group-hover:rotate-12" />
          <span className="font-serif text-2xl font-semibold tracking-wide text-white">
            {restaurantName}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                currentPage === item.page
                  ? 'text-accent'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 right-0 h-px bg-accent transition-transform duration-300 origin-left ${
                  currentPage === item.page ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
          <button
            onClick={() => handleNavClick('reservation')}
            className="px-6 py-2.5 border border-accent text-accent text-sm font-medium tracking-wide uppercase hover:bg-accent hover:text-black transition-all duration-300"
          >
            Book a Table
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0c0c0c]/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <div className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  currentPage === item.page ? 'text-accent' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('reservation')}
              className="px-8 py-3 border border-accent text-accent text-sm font-medium tracking-wide uppercase hover:bg-accent hover:text-black transition-all duration-300"
            >
              Book a Table
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

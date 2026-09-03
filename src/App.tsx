import { useState, useEffect } from 'react';
import { useNavigation } from '@/lib/useNavigation';
import { fetchRestaurantInfo } from '@/lib/api';
import type { RestaurantInfo } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Reservation from '@/pages/Reservation';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';

export default function App() {
  const { currentPage, navigate } = useNavigation();
  const [info, setInfo] = useState<RestaurantInfo | null>(null);

  useEffect(() => {
    fetchRestaurantInfo().then(setInfo);
  }, []);

  const restaurantName = info?.name || 'Saveur';

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navbar currentPage={currentPage} navigate={navigate} restaurantName={restaurantName} />

      <main>
        {currentPage === 'home' && <Home navigate={navigate} />}
        {currentPage === 'menu' && <Menu />}
        {currentPage === 'reservation' && <Reservation navigate={navigate} />}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <Footer navigate={navigate} info={info} />
    </div>
  );
}

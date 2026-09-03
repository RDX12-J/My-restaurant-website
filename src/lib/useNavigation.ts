import { useState, useEffect, useCallback } from 'react';

export type Page = 'home' | 'menu' | 'reservation' | 'gallery' | 'contact';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hash = window.location.hash.slice(1) as Page;
    return ['home', 'menu', 'reservation', 'gallery', 'contact'].includes(hash)
      ? hash
      : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (['home', 'menu', 'reservation', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return { currentPage, navigate };
}

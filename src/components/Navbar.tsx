import React, { useState, useEffect } from 'react';
import { ShoppingBag, Moon, Sun, Menu, X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onSectionClick?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, activeSection, onSectionClick }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Initialize Dark Mode based on preference or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Beranda' },
    { id: 'produk', label: 'Koleksi' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'faq', label: 'FAQ' },
    { id: 'kontak', label: 'Kontak Kami' },
  ];

  const handleScrollTo = (id: string) => {
    if (onSectionClick) {
      onSectionClick(id);
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Delay closing the mobile menu slightly so the mobile browser's smooth scroll isn't interrupted by DOM / layout recalculation
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 150);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/85 dark:bg-surface-container/85 backdrop-blur-xl border-b border-outline-variant/30 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleScrollTo('hero')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="bg-primary hover:bg-primary-container p-2 rounded-xl transition-colors text-on-primary">
              <Cookie className="w-6 h-6 animate-spin-slow group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary block leading-none">
                Sweet Crumbs
              </span>
              <span className="text-[10px] font-sans font-medium text-on-surface-variant uppercase tracking-widest block mt-0.5">
                Premium Artisanal
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`text-sm font-semibold tracking-wide cursor-pointer py-1 transition-all relative ${
                  activeSection === link.id
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-all cursor-pointer"
              title={isDarkMode ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-900" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-all cursor-pointer relative"
              title="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  id="cart-badge-count"
                  className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-surface dark:border-surface-container"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-primary md:hidden hover:bg-surface-container-high dark:hover:bg-surface-container-low transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-outline-variant/30 bg-surface dark:bg-surface-container shadow-inner overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activeSection === link.id
                      ? 'bg-primary/10 text-primary border-l-4 border-primary pl-3'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

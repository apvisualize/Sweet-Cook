import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { CartSidebar } from './components/CartSidebar';
import { Checkout } from './components/Checkout';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';

export default function App() {
  const [cart, setCart] = useState<{ [id: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('sweetcrumbs_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<any>(null);

  const handleSectionClick = useCallback((id: string) => {
    setActiveSection(id);
    isScrollingRef.current = true;
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  // Persist cart items to local storage
  useEffect(() => {
    localStorage.setItem('sweetcrumbs_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle active navigation highlighting with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'produk', 'testimoni', 'faq', 'kontak'];
    const observerOptions = {
      root: null,
      rootMargin: '-85px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('kontak');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    setCart((prev) => {
      const currentQty = prev[product.id] || 0;
      const newQty = Math.max(0, currentQty + quantity);
      
      const updated = { ...prev };
      if (newQty === 0) {
        delete updated[product.id];
      } else {
        updated[product.id] = newQty;
      }

      // Display beautiful toast alert
      if (quantity > 0) {
        showToast(`${product.name} berhasil ditambahkan ke keranjang!`, 'success');
      } else if (quantity < 0) {
        showToast(`Jumlah ${product.name} dikurangi dalam keranjang.`, 'success');
      }

      return updated;
    });
  }, [showToast]);

  const handleRemoveFromCart = useCallback((productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
    if (product) {
      showToast(`${product.name} telah dihapus dari keranjang.`, 'success');
    }
  }, [showToast]);

  const handleClearCart = useCallback(() => {
    setCart({});
  }, []);

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum: number, qty: number) => sum + qty, 0);
  }, [cart]);

  // Convert key-value cart state into fully populated CartItem list
  const cartItemsList: CartItem[] = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return null;
        return { product, quantity };
      })
      .filter((item): item is CartItem => item !== null);
  }, [cart]);

  const handleProceedToCheckout = useCallback(() => {
    setIsCartOpen(false);
    // Smooth scroll down to checkout
    const checkoutElement = document.getElementById('checkout');
    if (checkoutElement) {
      checkoutElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div id="root-app-container" className="min-h-screen bg-background text-on-background font-sans transition-colors duration-300">
      
      {/* Sticky Global Navigation header */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      {/* Hero Header Section */}
      <Hero
        onExploreProducts={() => {
          handleSectionClick('produk');
          const element = document.getElementById('produk');
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
        }}
      />

      {/* Dynamic Features List */}
      <Features />

      {/* Products Catalog Display */}
      <Products
        onAddToCart={handleAddToCart}
        cartItems={cart}
      />

      {/* Customer Testimonials reviews slider */}
      <Testimonials />

      {/* Premium Step-by-Step Checkout section */}
      <Checkout
        cartItemsList={cartItemsList}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* FAQ Accordions block */}
      <FAQ />

      {/* Location Map & direct contact form */}
      <Contact onShowToast={showToast} />

      {/* Solid Footer with links and copyrights */}
      <Footer />

      {/* Interactive Cart Sidebar Drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItemsList={cartItemsList}
        onUpdateQuantity={handleAddToCart}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Floating Global Toast notification alerts */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

    </div>
  );
}

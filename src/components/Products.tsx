import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, ShoppingCart, Sparkles, Filter, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductsProps {
  onAddToCart: (product: Product, quantity: number) => void;
  cartItems: { [id: string]: number };
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Varian' },
    { id: 'classic', label: 'Classic Series' },
    { id: 'premium', label: 'Premium Traditional' },
    { id: 'special', label: 'Special Series' }
  ];

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Format currency helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="produk" className="py-16 sm:py-20 lg:py-24 bg-surface-container-low/30 dark:bg-surface-container/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">Koleksi Terlaris</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
            Pilih Kelezatan Favorit Anda
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
            Mulai dari klasik hingga eksklusif tradisional, rasakan perpaduan tekstur lembut premium dengan bahan kualitas terbaik dari resep rahasia dapur Sweet Crumbs.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-10 sm:mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-md shadow-primary/10'
                    : 'bg-surface hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary'
                }`}
              >
                {cat.id === 'all' && <Filter className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Cari cookies favoritmu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 sm:pl-12 sm:py-3 bg-surface border border-outline-variant/30 rounded-2xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium text-sm sm:text-base transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-primary hover:text-primary-container"
              >
                Reset
              </button>
            )}
          </div>

        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => {
                const quantityInCart = cartItems[product.id] || 0;
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="group flex flex-col justify-between bg-surface dark:bg-surface-container border border-outline-variant/25 rounded-[24px] sm:rounded-[28px] overflow-hidden custom-shadow hover:shadow-2xl transition-all duration-300 relative"
                  >
                    
                    {/* Top badging */}
                    {product.isBestSeller && (
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                        <span>Best Seller</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/20 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[11px] sm:text-xs font-bold text-on-surface">{product.rating.toFixed(1)}</span>
                    </div>

                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Dark Overlay on Hover for premium details - hidden on small touch devices */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 lg:group-hover:opacity-100 transition-opacity hidden lg:flex items-center justify-center">
                        <button
                          onClick={() => onAddToCart(product, 1)}
                          className="px-6 py-3 bg-white text-primary hover:bg-primary hover:text-on-primary font-bold rounded-xl text-sm transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2 cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Cepat Tambah</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Description and details */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-primary">
                          {product.category === 'classic' ? 'Classic Series' : product.category === 'premium' ? 'Premium Wijsman' : 'Special Collection'}
                        </span>
                        
                        <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing and cart controls */}
                      <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-outline-variant/10">
                        <div>
                          <p className="text-[9px] sm:text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">Harga Toples</p>
                          <p className="text-base sm:text-lg font-extrabold text-primary">{formatIDR(product.price)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {quantityInCart > 0 ? (
                            <div className="flex items-center bg-primary/10 border border-primary/20 rounded-xl overflow-hidden p-0.5 sm:p-1 gap-2 sm:gap-2.5">
                              <button
                                onClick={() => onAddToCart(product, -1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface hover:bg-primary-container hover:text-on-primary text-primary font-bold flex items-center justify-center transition-colors cursor-pointer text-xs sm:text-sm"
                              >
                                -
                              </button>
                              <span className="text-xs sm:text-sm font-bold text-primary w-4 text-center">{quantityInCart}</span>
                              <button
                                onClick={() => onAddToCart(product, 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface hover:bg-primary-container hover:text-on-primary text-primary font-bold flex items-center justify-center transition-colors cursor-pointer text-xs sm:text-sm"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => onAddToCart(product, 1)}
                              className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                            >
                              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>Beli</span>
                            </button>
                          )}
                        </div>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 border border-dashed border-outline-variant rounded-3xl bg-surface p-8 max-w-lg mx-auto space-y-4"
            >
              <AlertCircle className="w-12 h-12 text-on-surface-variant/40 mx-auto" />
              <h3 className="text-lg font-bold text-on-surface">Cookies Tidak Ditemukan</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Maaf, tidak ada varian cookies yang cocok dengan pencarian "{searchQuery}" atau kategori yang dipilih. Silakan reset pencarian Anda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer"
              >
                Lihat Semua Varian
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

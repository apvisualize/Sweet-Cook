import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItemsList: CartItem[];
  onUpdateQuantity: (productId: string, amount: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cartItemsList,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  // Format currency helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const totalCartPrice = cartItemsList.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Free shipping threshold at Rp 250,000
  const freeShippingThreshold = 250000;
  const isEligibleForFreeShipping = totalCartPrice >= freeShippingThreshold;
  const progressToFreeShipping = Math.min((totalCartPrice / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = freeShippingThreshold - totalCartPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            id="cart-sidebar"
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface dark:bg-surface-container border-l border-outline-variant/30 z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <ShoppingBag className="w-5 h-5" />
                <h3 className="font-display text-xl font-bold text-on-surface">Keranjang Belanja</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {cartItemsList.length} Item
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Free Shipping Milestone */}
            {cartItemsList.length > 0 && (
              <div className="px-6 py-4 bg-primary/5 dark:bg-primary/10 border-b border-outline-variant/20 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  {isEligibleForFreeShipping ? (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Gift className="w-4 h-4" />
                      <span>Selamat! Anda mendapat Gratis Ongkir Paxel!</span>
                    </div>
                  ) : (
                    <div className="text-on-surface-variant font-medium">
                      Belanja <span className="font-bold text-primary">{formatIDR(remainingForFreeShipping)}</span> lagi untuk <strong>Gratis Ongkir</strong>
                    </div>
                  )}
                </div>
                {/* Progress bar */}
                <div className="w-full bg-surface-container-high dark:bg-surface-container-low rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItemsList.length > 0 ? (
                cartItemsList.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 items-start pb-6 border-b border-outline-variant/10 last:border-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-2xl object-cover bg-surface-container-low shrink-0 border border-outline-variant/10"
                    />

                    {/* Product Metadata */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-on-surface text-sm sm:text-base leading-tight group-hover:text-primary transition-colors">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-on-surface-variant hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-bold text-primary">
                        {formatIDR(item.product.price)}
                      </p>

                      {/* Quantity Toggler */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-outline-variant/30 rounded-lg p-0.5 bg-surface-container-high dark:bg-surface-container-low overflow-hidden gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-7 h-7 rounded-md bg-surface hover:bg-primary/10 hover:text-primary text-on-surface-variant font-bold flex items-center justify-center transition-colors cursor-pointer text-xs"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="text-xs font-bold text-on-surface w-4 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-7 h-7 rounded-md bg-surface hover:bg-primary/10 hover:text-primary text-on-surface-variant font-bold flex items-center justify-center transition-colors cursor-pointer text-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-on-surface text-right">
                          {formatIDR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-bounce">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-on-surface text-lg">Keranjang Belanja Kosong</h4>
                  <p className="text-sm text-on-surface-variant max-w-xs font-medium leading-relaxed">
                    Anda belum memasukkan varian cookies lezat ke dalam keranjang belanja. Jelajahi katalog kami sekarang!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs cursor-pointer shadow-md"
                  >
                    Mulai Belanja Varian
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer with calculation summary */}
            {cartItemsList.length > 0 && (
              <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low dark:bg-surface-container-low/50 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-medium text-on-surface-variant">
                    <span>Subtotal Produk</span>
                    <span className="font-bold text-on-surface">{formatIDR(totalCartPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium text-on-surface-variant">
                    <span>Diskon & Voucher</span>
                    <span className="text-emerald-600 font-bold">Rp 0 (Tidak ada)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-on-surface pt-2 border-t border-outline-variant/10">
                    <span>Perkiraan Total</span>
                    <span className="text-primary text-lg font-extrabold">{formatIDR(totalCartPrice)}</span>
                  </div>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 group"
                >
                  <span>Lanjut Ke Checkout</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

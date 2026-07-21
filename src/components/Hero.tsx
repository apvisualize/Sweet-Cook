import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Cookie } from 'lucide-react';
import heroCookiesImg from '../assets/images/hero_cookies_caroline_1784360365916.jpg';

interface HeroProps {
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-surface-container-low/40 via-surface to-surface"
    >
      {/* Dynamic Background Blur Shapes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">

            {/* Display Typography Title */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.2] lg:leading-[1.12]"
              >
                <span className="block">Freshly Baked</span>
                <span className="text-primary italic font-medium block mt-1 lg:mt-2">Made to Make You Smile</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                Kami percaya cookies terbaik bukan soal bahan yang paling mahal, tetapi tentang proses yang konsisten, resep yang tepat, dan rasa yang selalu membuatmu ingin kembali.
              </motion.p>
            </div>

            {/* Interactive CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Lihat Koleksi Cookies</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('testimoni');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl border border-outline-variant hover:border-primary bg-surface/40 hover:bg-surface-container-low text-on-surface-variant hover:text-primary font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer text-center"
              >
                Testimoni Pelanggan
              </button>
            </motion.div>

            {/* Small trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 grid grid-cols-3 gap-2 sm:gap-6 max-w-lg sm:max-w-2xl mx-auto lg:mx-0 border-t border-outline-variant/10 lg:border-0"
            >
              <div className="flex flex-col items-center lg:flex-row lg:items-center text-center lg:text-left gap-2 lg:gap-3.5">
                <div className="p-2 rounded-xl bg-surface-container-high dark:bg-surface-container-lowest text-primary shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-on-surface leading-tight">Freshly Baked</h4>
                  <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium mt-0.5 lg:mt-1">Dipanggang Setiap Hari</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:flex-row lg:items-center text-center lg:text-left gap-2 lg:gap-3.5">
                <div className="p-2 rounded-xl bg-surface-container-high dark:bg-surface-container-lowest text-primary shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-on-surface leading-tight">Soft & Gooey</h4>
                  <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium mt-0.5 lg:mt-1">Lembut di Dalam</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:flex-row lg:items-center text-center lg:text-left gap-2 lg:gap-3.5">
                <div className="p-2 rounded-xl bg-surface-container-high dark:bg-surface-container-lowest text-primary shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-on-surface leading-tight">No Preservatives</h4>
                  <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-medium mt-0.5 lg:mt-1">Tanpa Bahan Pengawet</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Glowing Accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Decorative frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative p-2.5 sm:p-3 bg-surface-container-high dark:bg-surface-container-lowest border border-outline-variant/30 rounded-[28px] sm:rounded-[32px] shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md lg:max-w-lg"
            >
              <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] aspect-[4/3] group">
                <img
                  src={heroCookiesImg}
                  alt="Freshly baked assorted luxury cookies Caroline in."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Floating Best Seller Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-container/90 backdrop-blur-md text-primary font-bold text-[10px] sm:text-xs tracking-wide shadow-md">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>PREMIUM SERIES</span>
                </div>
              </div>

              {/* Float Mini info banner inside frame */}
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-surface/50 dark:bg-surface-container-low/50 backdrop-blur-sm border border-outline-variant/20 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">Penawaran Spesial</p>
                  <h3 className="text-xs sm:text-sm font-bold text-on-surface mt-0.5">Dapatkan Free Giftbox Elegan</h3>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-[10px] sm:text-xs font-bold shrink-0">
                  S&K Berlaku
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

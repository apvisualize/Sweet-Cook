import React from 'react';
import { Cookie, Instagram, Facebook, Heart, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Col 1: About the brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl text-on-primary">
                <Cookie className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-primary leading-none">
                Sweet Crumbs
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              Sweet Crumbs menghadirkan cookies premium berkualitas internasional yang dipanggang segar setiap pagi khusus untuk keluarga Indonesia tercinta.
            </p>

            {/* Social media handles */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all shadow-sm border border-outline-variant/20"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all shadow-sm border border-outline-variant/20"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest border-b border-outline-variant/10 pb-2">
              Menu Navigasi
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'hero', label: 'Beranda Utama' },
                { id: 'produk', label: 'Koleksi Cookies' },
                { id: 'testimoni', label: 'Testimoni Pelanggan' },
                { id: 'faq', label: 'Pertanyaan Umum (FAQ)' },
                { id: 'kontak', label: 'Hubungi Kami' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact quick information */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest border-b border-outline-variant/10 pb-2">
              Workshop & Kontak resmi
            </h4>
            
            <ul className="space-y-3.5">
              <li className="flex gap-3 items-start text-xs sm:text-sm text-on-surface-variant font-medium">
                <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <span>Jl. Meruya Ilir Raya No. 45, Kembangan, Jakarta Barat, DKI Jakarta, 11620</span>
              </li>
              <li className="flex gap-3 items-center text-xs sm:text-sm text-on-surface-variant font-medium">
                <Phone className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>+62 812-3456-789 (WhatsApp / Telp)</span>
              </li>
              <li className="flex gap-3 items-center text-xs sm:text-sm text-on-surface-variant font-medium">
                <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>hello@sweetcrumbs.id / order@sweetcrumbs.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom divider and info */}
        <div className="pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <p className="text-[11px] text-on-surface-variant font-medium text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong>Sweet Crumbs Premium Indonesia</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>

          {/* Payment Badges & Shipping badges */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {['BCA', 'MANDIRI', 'QRIS', 'JNE', 'J&T', 'PAXEL'].map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 text-[10px] font-extrabold bg-surface dark:bg-surface-container border border-outline-variant/20 rounded-md text-on-surface-variant/80 font-sans tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-on-surface-variant font-semibold flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>untuk Sweet Crumbs Lover</span>
          </p>

        </div>

      </div>
    </footer>
  );
};

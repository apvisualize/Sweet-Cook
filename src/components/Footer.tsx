import React from 'react';
import { Instagram, Heart, MapPin, Phone, Mail } from 'lucide-react';
import logoCarolineImg from '../assets/images/logo_caroline_1784360349102.jpg';
import { SvgBca, SvgQris, SvgJne, SvgJnt, SvgPaxel } from './SvgIcons';

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
              <div className="overflow-hidden rounded-xl w-9 h-9 border border-outline-variant/30 flex items-center justify-center bg-white shrink-0">
                <img src={logoCarolineImg} alt="Caroline in. Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-primary leading-none">
                Caroline in.
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              Caroline in. menghadirkan cookies premium berkualitas internasional yang dipanggang segar setiap pagi khusus untuk keluarga Indonesia tercinta.
            </p>

            {/* Social media handles */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com/caroline__cin"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-surface hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all shadow-sm border border-outline-variant/20"
              >
                <Instagram className="w-4 h-4" />
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
                <span>+62 851-2440-6221 (WhatsApp / Telp)</span>
              </li>
              <li className="flex gap-3 items-center text-xs sm:text-sm text-on-surface-variant font-medium">
                <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>hello@carolinein.id / order@carolinein.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom divider and info */}
        <div className="pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <p className="text-[11px] text-on-surface-variant font-medium text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong>Caroline in. Premium Indonesia</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>

          {/* Payment Badges & Shipping badges */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <div className="hover:scale-105 transition-transform"><SvgBca className="h-6 w-auto" /></div>
            <div className="hover:scale-105 transition-transform"><SvgQris className="h-6 w-auto" /></div>
            <div className="hover:scale-105 transition-transform"><SvgJne className="h-6 w-auto" /></div>
            <div className="hover:scale-105 transition-transform"><SvgJnt className="h-6 w-auto" /></div>
            <div className="hover:scale-105 transition-transform"><SvgPaxel className="h-6 w-auto" /></div>
          </div>

          <p className="text-[11px] text-on-surface-variant font-semibold flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>untuk Caroline in. Lover</span>
          </p>

        </div>

      </div>
    </footer>
  );
};

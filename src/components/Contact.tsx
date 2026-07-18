import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Mohon isi nama, email, dan pesan Anda!', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request send
    setTimeout(() => {
      onShowToast('Pesan Anda berhasil dikirim! Admin kami akan menghubungi Anda segera.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfos = [
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: 'Workshop Bakehouse',
      details: 'Jl. Meruya Ilir Raya No. 45, Kembangan, Jakarta Barat, DKI Jakarta, 11620'
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: 'Customer Support / WA',
      details: '+62 851-2440-6221 (Senin - Kamis)'
    },
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      title: 'Hubungi Email',
      details: 'hello@sweetcrumbs.id / order@sweetcrumbs.id'
    },
  ];

  return (
    <section id="kontak" className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">Hubungi Kami</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            Mari Berbincang Bersama Kami
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
            Ingin berkonsultasi mengenai pesanan dalam jumlah besar, hampers lebaran custom, atau sekadar menanyakan status kiriman Anda? Kami siap menyambut Anda dengan hangat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfos.map((info, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-container-low dark:bg-surface-container/20 border border-outline-variant/15 flex gap-4 items-start custom-shadow"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-wide mb-1">
                      {info.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                      {info.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Maps Mockup (SVG Illustration / Elegant display) */}
            <div className="p-2 rounded-2xl bg-surface-container-high dark:bg-surface-container-lowest border border-outline-variant/20 custom-shadow overflow-hidden">
              <div className="bg-surface rounded-xl p-4 flex flex-col justify-between items-center text-center space-y-4 min-h-[160px] relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-container/10 pointer-events-none" />
                <MapPin className="w-10 h-10 text-primary animate-bounce relative z-10" />
                <div className="space-y-1 relative z-10">
                  <h4 className="font-bold text-sm text-on-surface">Peta Lokasi Caroline in.</h4>
                  <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed max-w-xs mx-auto">
                    Kembangan, Jakarta Barat (Pengiriman instant menjangkau seluruh wilayah Jabodetabek)
                  </p>
                </div>
                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-lg text-xs transition-colors cursor-pointer relative z-10"
                >
                  Buka Google Maps
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-container-low dark:bg-surface-container/30 border border-outline-variant/20 rounded-[32px] p-6 sm:p-8 custom-shadow">
            <h3 className="font-display text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/15 pb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>Kirim Pesan Langsung</span>
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nama Anda *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Amanda"
                    className="w-full px-4 py-3 bg-surface border border-outline-variant/40 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email Anda *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Contoh: amanda@gmail.com"
                    className="w-full px-4 py-3 bg-surface border border-outline-variant/40 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Subjek Pesan</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Contoh: Pertanyaan hampers lebaran corporate"
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/40 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Detail Pesan *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Ketikkan pesan lengkap Anda di sini..."
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/40 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Submit Query Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesanan'}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

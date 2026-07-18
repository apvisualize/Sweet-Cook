import React from 'react';
import { motion } from 'motion/react';
import { Award, Cookie, Gift, ShieldAlert, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const listFeatures = [
    {
      icon: <Award className="w-6 h-6" />,
      title: '100% Butter Wijsman',
      description: 'Aroma mentega Wijsman Belanda premium yang melimpah memberikan wangi harum legendaris dan rasa lumer autentik di lidah.'
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: 'Cokelat Belgia Murni',
      description: 'Isian dark chocolate Belgia murni berkualitas tinggi (callebaut style) untuk rasa cokelat mewah yang kaya dan tidak bikin eneg.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Freshly Baked Daily',
      description: 'Setiap toples cookies dipanggang segar setiap pagi sesuai pesanan (made-to-order) sehingga kualitas kesegaran selalu terjaga.'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Hampers Premium Box',
      description: 'Dikemas cantik dengan toples silinder tebal kedap udara berlapis segel alumunium dan gift box tebal mewah, sangat layak untuk hantaran.'
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: 'Garansi Kirim Utuh',
      description: 'Dilengkapi kardus double-wall dan bubble wrap super tebal. Jika toples pecah atau hancur di jalan, kami kirim ulang gratis!'
    }
  ];

  return (
    <section id="fitur" className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">Alasan Memilih Kami</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            Kualitas Tanpa Kompromi, Rasa Mewah yang Autentik
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Caroline in. bukan sekadar kue kering biasa. Kami mendedikasikan waktu, keahlian, dan bahan-bahan terbaik dunia untuk menghadirkan mahakarya cookies premium di rumah Anda.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {listFeatures.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-surface-container-low dark:bg-surface-container-low/40 border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container transition-all duration-300 group custom-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                {feat.icon}
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {feat.title}
              </h3>
              
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                {feat.description}
              </p>
            </motion.div>
          ))}
          
          {/* Quick interactive order encouragement banner */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-8 rounded-3xl bg-primary text-on-primary flex flex-col justify-between border border-primary/20 custom-shadow md:col-span-2 lg:col-span-1 relative overflow-hidden group"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide uppercase">Dipesan Sekarang</span>
              <h3 className="font-display text-2xl font-bold leading-tight">
                Ingin custom hampers & pemesanan jumlah besar?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                Kami siap membantu menyediakan hampers cantik berlogo perusahaan Anda untuk event besar, pernikahan, lebaran, natal, atau imlek.
              </p>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById('kontak');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-6 w-full py-3.5 rounded-xl bg-white text-primary hover:bg-primary-container hover:text-on-primary transition-colors text-sm font-bold shadow-md cursor-pointer relative z-10"
            >
              Hubungi Corporate Service
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

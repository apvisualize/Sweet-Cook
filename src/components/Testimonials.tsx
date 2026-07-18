import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">Kisah Manis Mereka</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            Apa Kata Pencinta Cookies Kami?
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
            Kepuasan pelanggan adalah bumbu rahasia terbaik kami. Simak ulasan tulus dari para pelanggan setia Caroline in. di berbagai wilayah Indonesia.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 sm:p-8 rounded-3xl bg-surface-container-low dark:bg-surface-container-low/40 border border-outline-variant/20 flex flex-col justify-between relative custom-shadow hover:shadow-2xl hover:border-primary/30 transition-all duration-300 ${
                index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Giant quote background symbol */}
              <div className="absolute top-6 right-6 text-primary/10 pointer-events-none">
                <Quote className="w-16 h-16 transform rotate-180" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* 5-star review ratings */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-on-surface leading-relaxed font-semibold italic text-justify">
                  "{test.quote}"
                </p>
              </div>

              {/* Reviewer Metadata */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-outline-variant/10 relative z-10">
                <img
                  src={test.image}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant/20 bg-surface-container shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-on-surface leading-tight">{test.name}</h4>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">
                    {test.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Quick social CTA banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl bg-primary-container/20 dark:bg-surface-container-high/30 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="p-3.5 rounded-2xl bg-primary/10 text-primary shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface">Bagikan pengalaman manis Anda!</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5 leading-relaxed">
                Punya saran, cerita, atau ingin mengunggah kelezatan cookies kami di Instagram? Tag kami di <strong>@caroline__cin</strong>!
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com/caroline__cin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
          >
            Ikuti Instagram Kami
          </a>
        </motion.div>

      </div>
    </section>
  );
};

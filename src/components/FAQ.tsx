import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export const FAQ: React.FC = () => {
  const [openFAQId, setOpenFAQId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-surface-container-low/20 dark:bg-surface-container/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">Pertanyaan Umum</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
            Ingin tahu lebih banyak tentang proses pemanggangan kami, ketahanan cookies, atau jangkauan kurir pengiriman? Temukan semua jawaban lengkapnya di bawah ini.
          </p>
        </div>

        {/* FAQ Accordions Stack */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFAQId === faq.id;
            
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-outline-variant/20 overflow-hidden bg-surface dark:bg-surface-container-low custom-shadow"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-surface-container-high/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-bold text-sm sm:text-base text-on-surface leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`p-1 rounded-lg bg-surface-container-high dark:bg-surface-container-lowest text-on-surface-variant transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-primary bg-primary/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-semibold border-t border-outline-variant/10 text-justify">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

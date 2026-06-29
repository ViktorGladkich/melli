"use client";

import { motion } from "framer-motion";

export function AboutMosaicSection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* Left Tall Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group overflow-hidden bg-gray-100 h-[450px] md:h-[650px] lg:h-[750px] rounded-xl"
        >
          <img 
            src="/products/abaya_beige_front.jpg" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" 
            alt="30+ artisans" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-end text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-8xl font-light mb-4 md:mb-6"
            >
              30+ <br className="hidden md:block" /> Experten
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl max-w-sm text-white/90 leading-relaxed font-light"
            >
              arbeiten täglich daran, jedes unserer Kleidungsstücke mit höchster Sorgfalt und Präzision von Hand zu fertigen.
            </motion.p>
          </div>
        </motion.div>

        {/* Right Column Stack */}
        <div className="grid grid-cols-1 grid-rows-2 gap-4 md:gap-6 h-[800px] md:h-auto">
          
          {/* Top Right Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative group overflow-hidden bg-gray-200 rounded-xl"
          >
            <img 
              src="/products/hijab_champagne_front.png" 
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-[1.5s] group-hover:scale-[1.03]" 
              alt="40% less water" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-light mb-3"
              >
                40%
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg max-w-xs text-white/90 font-light"
              >
                weniger Wasser verbrauchen wir in unserer Produktion im Vergleich zu herkömmlichen Herstellungsmethoden.
              </motion.p>
            </div>
          </motion.div>

          {/* Bottom Right Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative group overflow-hidden bg-gray-900 rounded-xl"
          >
            <img 
              src="/products/abaya_black_front.jpg" 
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-80 transition-transform duration-[1.5s] group-hover:scale-[1.03]" 
              alt="99% recycled fabrics" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-colors duration-700" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl font-light mb-3"
              >
                99%
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-base md:text-lg max-w-xs text-white/90 font-light"
              >
                unserer hochwertigen Stoffe stammen aus verantwortungsvollen, nachhaltigen oder recycelten Quellen.
              </motion.p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

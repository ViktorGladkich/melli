"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

export function CollectionsGridSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Item 1: Abayas collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link 
            href="/collections/abayas" 
            className="relative block w-full h-[60vh] md:h-[80vh] overflow-hidden group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                src="/video_collections/left_collection.MP4"
                className="w-full h-full object-cover object-[50%_30%] transition-transform duration-[3s] ease-out group-hover:scale-105"
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-60 transition-opacity duration-1000 group-hover:opacity-80" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 text-center z-10 p-6">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl md:text-[40px] text-white uppercase tracking-[0.1em] font-light mb-6 drop-shadow-sm"
              >
                Neue Kollektion
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="relative inline-flex overflow-hidden border border-white px-8 py-3.5 text-sm font-medium uppercase tracking-wider cursor-pointer">
                  <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                  <span className="relative z-10 text-white transition-colors duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:text-black">
                    <AnimatedText text="Jetzt Entdecken" />
                  </span>
                </span>
              </motion.div>
            </div>
          </Link>
        </motion.div>

        {/* Item 2: Hijabs collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link 
            href="/collections/hijabs" 
            className="relative block w-full h-[60vh] md:h-[80vh] overflow-hidden group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <picture>
                <img 
                  src="/products/hijab_champagne_front.png" 
                  alt="Elegante Hijabs"
                  loading="lazy"
                  className="w-full h-full object-cover object-[50%_20%] transition-transform duration-[3s] ease-out group-hover:scale-105"
                />
              </picture>
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/0 to-transparent opacity-60 transition-opacity duration-1000 group-hover:opacity-80" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 text-center z-10 p-6">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl md:text-[40px] text-black uppercase tracking-[0.1em] font-light mb-6"
              >
                Elegante Hijabs
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="relative inline-flex overflow-hidden border border-black px-8 py-3.5 text-sm font-medium uppercase tracking-wider cursor-pointer">
                  <span className="absolute inset-0 bg-black translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                  <span className="relative z-10 text-black transition-colors duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:text-white">
                    <AnimatedText text="Hijabs Shoppen" />
                  </span>
                </span>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

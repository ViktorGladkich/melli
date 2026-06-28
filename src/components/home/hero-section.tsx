"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Фон постепенно уходит в полную темноту
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Параллакс Фон */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Жесткий темный градиент-оверлей, чтобы текст всегда читался 100% идеально */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
        <img 
          src="/hero-bg.png" 
          alt="Premium Cleaning" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-6 max-w-7xl mx-auto pt-20">
        
        <motion.span 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
          className="block text-sm md:text-base font-bold tracking-[0.3em] uppercase text-white/70 mb-6"
        >
          Premium & Nachhaltig
        </motion.span>
        {/* Убрали огромный текст Neue Kollektion, так как теперь сверху нависает огромный логотип MELLI. */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 mt-10 max-w-xl mx-auto font-medium"
        >
          Redefine Your Elegance
          <br />
          <span className="text-4xl md:text-6xl font-light tracking-widest uppercase mt-4 block text-white">
            Dresses You'll Adore
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.6 }}
          className="flex items-center gap-4 mt-8"
        >
          <Link 
            href="/catalog" 
            className="bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-widest transition-transform hover:scale-105 shadow-xl"
          >
            Shop Dress
          </Link>
          <Link 
            href="/catalog?category=bags" 
            className="bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-widest transition-transform hover:scale-105 shadow-xl"
          >
            Shop Bags
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

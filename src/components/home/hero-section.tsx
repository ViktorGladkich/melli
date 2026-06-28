"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { AnimatedText } from "../ui/animated-text";


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
    <section ref={containerRef} className="relative h-dvh min-h-[500px] w-full bg-black text-white overflow-hidden">
      {/* Параллакс Фон */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Легкий градиент снизу, чтобы текст читался (убрали общее затемнение) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/video_hero/hero.mp4" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-4 md:px-6 pb-20 sm:pb-16 md:pb-24 pt-20 w-full">
        
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="text-white/90 text-xs sm:text-sm md:text-base tracking-widest uppercase mb-3 md:mb-4"
          >
            <p>Modest Fashion für dich</p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-widest uppercase text-white mb-8 md:mb-10 px-2"
          >
            Elegante Abayas & Hijabs
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-2 sm:px-0"
          >
            <Link 
              href="/collections/abayas" 
              className="bg-white text-black px-6 sm:px-8 md:px-12 py-3.5 md:py-4 font-normal text-[13px] sm:text-sm tracking-widest hover:bg-white/90 transition-colors uppercase w-full sm:w-auto min-w-[180px] group cursor-pointer flex items-center justify-center"
            >
              <AnimatedText text="Abayas shoppen" />
            </Link>
            <Link 
              href="/collections/hijabs" 
              className="bg-white text-black px-6 sm:px-8 md:px-12 py-3.5 md:py-4 font-normal text-[13px] sm:text-sm tracking-widest hover:bg-white/90 transition-colors uppercase w-full sm:w-auto min-w-[180px] group cursor-pointer flex items-center justify-center"
            >
              <AnimatedText text="Hijabs shoppen" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

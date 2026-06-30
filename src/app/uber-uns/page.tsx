"use client";

import React from "react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-text";
import { motion } from "framer-motion";
import { AboutMosaicSection } from "@/components/home/about-mosaic-section";
import { FeaturesBannerSection } from "@/components/home/features-banner-section";
import { ScrollingTextSection } from "@/components/home/scrolling-text-section";
import { CollectionFeatureSection } from "@/components/home/collection-feature-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function AboutUsPage() {
  return (
    <div className="w-full flex-1 flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Images */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Mobile Image */}
          <img
            src="/about/heroabout-mobile.jpg"
            alt="Über uns Hintergrundbild"
            className="w-full h-full object-cover md:hidden"
          />
          {/* Desktop Image */}
          <img
            src="/about/heroabout-desktop.jpg"
            alt="Über uns Hintergrundbild Desktop"
            className="w-full h-full object-cover hidden md:block"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 text-center md:text-left text-white flex flex-col items-center md:items-start justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="text-5xl md:text-7xl lg:text-[7rem] font-light tracking-wide uppercase mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}
          >
            über uns
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="text-base md:text-lg font-light max-w-lg mb-10 leading-relaxed tracking-wide text-center md:text-left"
          >
            Unterstreichen Sie Ihren Stil mit erstklassigen und langlebigen Luxusartikeln.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
          >
            <Link 
              href="/collections/all"
              className="bg-white text-black px-12 py-4 uppercase tracking-widest text-sm font-medium hover:bg-white/90 transition-all duration-300 group cursor-pointer flex items-center justify-center"
            >
              <AnimatedText text="Produkte ansehen" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Additional About Us content can go here */}
      <section className="py-24 md:py-40 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="text-lg md:text-xl tracking-widest uppercase mb-10 text-black font-medium"
          >
            Unsere Geschichte
          </motion.h3>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] leading-[1.4] md:leading-[1.3] font-light text-black text-center mx-auto max-w-[1100px]"
          >
            MILLY steht für 
            <motion.span 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.7, 0, 0.2, 1] }}
              className="inline-block mx-2 md:mx-4 align-middle overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-500"
            >
              <motion.img 
                initial={{ scale: 1.3 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.7, 0, 0.2, 1] }}
                src="/products/abaya_beige_front.jpg" 
                alt="Abaya" 
                className="w-20 h-14 sm:w-24 sm:h-16 md:w-32 md:h-20 object-cover object-[center_20%]" 
              />
            </motion.span> 
            zeitlose Eleganz und kompromisslose Qualität im Bereich der Modest Fashion. Wir glauben daran, dass 
            <motion.span 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.7, 0, 0.2, 1] }}
              className="inline-block mx-2 md:mx-4 align-middle overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-500"
            >
              <motion.img 
                initial={{ scale: 1.3 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.7, 0, 0.2, 1] }}
                src="/products/abaya_black_front.jpg" 
                alt="Abaya Black" 
                className="w-20 h-14 sm:w-24 sm:h-16 md:w-32 md:h-20 object-cover object-[center_20%]" 
              />
            </motion.span>
            wahrer Stil keine Jahreszeiten kennt und echte Schönheit in der Schlichtheit liegt. Jedes unserer Stücke wird mit 
            <motion.span 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.7, 0, 0.2, 1] }}
              className="inline-block mx-2 md:mx-4 align-middle overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-500"
            >
              <motion.img 
                initial={{ scale: 1.3 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.7, 0, 0.2, 1] }}
                src="/products/hijab_champagne_front.png" 
                alt="Hijab" 
                className="w-20 h-14 sm:w-24 sm:h-16 md:w-32 md:h-20 object-cover object-[center_20%] bg-gray-100" 
              />
            </motion.span>
            höchster Sorgfalt ausgewählt, um Ihnen Langlebigkeit und höchsten Tragekomfort zu garantieren.
          </motion.h2>
        </div>
      </section>

      <AboutMosaicSection />
      
      <ScrollingTextSection />
      
      <CollectionFeatureSection />
      
      <FeaturesBannerSection />
      <NewsletterSection />
    </div>
  );
}

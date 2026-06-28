"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

export function CuratedSliderSection() {
  const items = [
    {
      id: 1,
      title: "Desert Sand",
      image: "/products/abaya_beige_front.jpg",
      link: "/products/abaya-beige"
    },
    {
      id: 2,
      title: "Classic Black",
      image: "/products/abaya_black_front.jpg",
      link: "/products/abaya-black"
    },
    {
      id: 3,
      title: "Smaragd Traum",
      image: "/products/abaya_green_front.jpg",
      link: "/products/abaya-green"
    },
    {
      id: 4,
      title: "Dusty Pink",
      image: "/products/abaya_pink_front.jpg",
      link: "/products/abaya-pink"
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    // Calculate which slide is currently most visible
    const index = Math.round(scrollLeft / clientWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    scrollContainerRef.current.scrollTo({ left: index * clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="w-full py-16 md:py-24 overflow-hidden bg-[#f4f4f4]">
      <div className="container mx-auto px-0 md:px-4 lg:px-8">
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[13px] md:text-3xl font-light uppercase tracking-widest text-center mb-8 md:mb-16 text-black"
        >
          Unsere Favoriten
        </motion.h2>

        {/* Slider */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory md:gap-6 pb-4 md:pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex-shrink-0 snap-center md:snap-start group w-full md:w-auto md:min-w-[320px] lg:min-w-[calc(25%-18px)]"
            >
              {/* === MOBILE CARD === */}
              <div className="md:hidden flex flex-col items-center px-8 w-full">
                <Link href={item.link} className="w-full flex flex-col items-center">
                  <div className="w-full aspect-[4/5] overflow-hidden mb-6 relative">
                    <picture>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    </picture>
                  </div>
                  <span className="text-black uppercase tracking-widest text-[13px] border-b border-black pb-1">
                    {item.title}
                  </span>
                </Link>
              </div>

              {/* === DESKTOP CARD === */}
              <Link href={item.link} className="hidden md:block w-full h-full aspect-[4/5] relative overflow-hidden">
                <picture>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-8">
                  <span className="relative inline-flex overflow-hidden border border-white px-6 py-3 text-sm font-medium uppercase tracking-wider text-white">
                    <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                    <span className="relative z-10 transition-colors duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:text-black">
                      <AnimatedText text={item.title} />
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden relative z-10 justify-center items-center gap-3 mt-8 pb-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 ${
                activeIndex === i ? "bg-[#212121]" : "bg-[#d6d6d6]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

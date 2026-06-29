"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

export function PromoSliderSection() {
  const promos = [
    {
      id: 1,
      title: "Elegante Tuniken",
      subtitle: "Für jeden Anlass das Richtige",
      buttonText: "Jetzt Shoppen",
      image: "/products/tunic_modest.png",
      link: "/collections/tunics"
    },
    {
      id: 2,
      title: "Moderne Kleider",
      subtitle: "Die neue Saison ist da",
      buttonText: "Entdecken",
      image: "/products/maxi_dress_hijab.png",
      link: "/collections/dresses"
    },
    {
      id: 3,
      title: "Premium Hijabs",
      subtitle: "Leichte Stoffe für den Sommer",
      buttonText: "Zum Shop",
      image: "/products/hijab_silk_1782661455762.png", // I'll use a placeholder from earlier
      link: "/collections/hijabs"
    }
  ];

  // Replacing the third image with one we definitely have
  promos[2].image = "/products/hijab_silk.png";

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85)); // 0.85 is for the 85vw card width plus gap
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    // calculate offset considering 85vw width and 16px gap approximately
    const scrollAmount = index * (clientWidth * 0.85 + 16); 
    scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="w-full pt-4 pb-16 md:pt-4 md:pb-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
          >
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="w-[85vw] min-w-[85vw] md:w-auto md:min-w-[350px] lg:min-w-[calc(33.333%-16px)] snap-center md:snap-start flex flex-col group shrink-0"
              >
              <Link href={promo.link} className="block w-full flex flex-col">
                <div className="relative w-full aspect-3/4 md:aspect-4/5 bg-gray-100 overflow-hidden">
                  <picture>
                    <img 
                      src={promo.image} 
                      alt={promo.title} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[3s] ease-out group-hover:scale-105"
                    />
                  </picture>
                </div>

                <div className="flex flex-col items-center pt-6 md:pt-8 text-center">
                  <h3 className="text-xl md:text-2xl text-black uppercase tracking-widest font-light mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {promo.subtitle}
                  </p>
                  
                  <span className="relative inline-flex overflow-hidden border border-black px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-black transition-colors">
                    <span className="absolute inset-0 bg-black translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                    <span className="relative z-10 transition-colors duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:text-white">
                      <AnimatedText text={promo.buttonText} />
                    </span>
                  </span>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden relative z-10 justify-center items-center gap-3 mt-2 pb-4">
          {promos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 ${
                activeIndex === i ? "bg-black" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-text";

export function ParallaxSaleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image 1 (Left): Comes from bottom (100vh) and moves up off-screen (-100vh) in the first half of the scroll
  const y1 = useTransform(scrollYProgress, [0, 0.5], ["100vh", "-100vh"]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.5], [-15, 5]);
  
  // Image 2 (Right): Comes from bottom (100vh) and moves up off-screen (-100vh) in the second half of the scroll
  const y2 = useTransform(scrollYProgress, [0.5, 1], ["100vh", "-100vh"]);
  const rotate2 = useTransform(scrollYProgress, [0.5, 1], [15, -5]);

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-[#f4f0eb]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Parallax Images Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Left Image */}
          <motion.div 
            style={{ y: y1, rotate: rotate1 }}
            className="absolute left-[5%] md:left-[10%] top-[20%] md:top-[15%] w-[50vw] md:w-[25vw] aspect-4/5 shadow-2xl"
          >
            <picture>
              <img 
                src="/products/abaya_blue_front.jpg" 
                alt="Best Sellers"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </picture>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            style={{ y: y2, rotate: rotate2 }}
            className="absolute right-[5%] md:right-[10%] top-[25%] md:top-[20%] w-[45vw] md:w-[22vw] aspect-3/4 shadow-2xl"
          >
            <picture>
              <img 
                src="/products/tunic_blush_front.png" 
                alt="Sale Collection"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </picture>
          </motion.div>
        </div>

        {/* Text Content Layer */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl pointer-events-auto mix-blend-multiply">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xs md:text-sm uppercase tracking-[0.2em] mb-6 text-black/80"
          >
            Discover the best deal
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wider leading-[1.15] mb-12 text-black"
          >
            SALE up to 50% <br /> for all collections
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Link href="/collections/sale" className="relative inline-flex overflow-hidden border border-black px-12 py-4 text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-black group bg-transparent">
              <span className="absolute inset-0 bg-black translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:text-white">
                <AnimatedText text="Check Now" />
              </span>
            </Link>
          </motion.div>

          {/* Scrolling indicator arrow */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-16 text-black/40"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

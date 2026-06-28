"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";

export function FeaturedVideoSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-100">
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[80vh]">
        
        {/* Left Column - Image + Text Overlay */}
        <div className="relative w-full md:w-1/2 h-[60vh] md:h-full group">
          <img 
            src="/products/abaya_beige_front.jpg" 
            alt="Eleganz & Komfort Kollektion" 
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

          {/* Content */}
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end md:justify-center items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-md"
            >
              <p className="text-xs md:text-sm font-medium tracking-wide mb-3 md:mb-4 text-white drop-shadow-sm">
                Beliebte Kollektionen
              </p>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wide leading-[1.1] mb-8 md:mb-12 text-white drop-shadow-md">
                Eleganz & <br /> Komfort
              </h2>
              
              <Link 
                href="/collections/abayas" 
                className="inline-flex items-center justify-center bg-white text-black px-8 py-4 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
              >
                <span>Jetzt entdecken</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Video */}
        <div className="relative hidden md:block md:w-1/2 h-[50vh] md:h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            src="/video_collections/left_collection.MP4" 
            className="w-full h-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}

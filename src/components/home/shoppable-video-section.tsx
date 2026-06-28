"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export function ShoppableVideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const products = [
    {
      id: "abaya-beige",
      brand: "MELLI",
      title: "Desert Sand Abaya",
      price: "€129.00",
      image: "/products/abaya_beige_front.jpg",
      link: "/products/abaya-beige",
    },
    {
      id: "abaya-black",
      brand: "MELLI",
      title: "Classic Black Abaya",
      price: "€129.00",
      image: "/products/abaya_black_front.jpg",
      link: "/products/abaya-black",
    },
    {
      id: "abaya-green",
      brand: "MELLI",
      title: "Smaragd Traum",
      price: "€139.00",
      image: "/products/abaya_green_front.jpg",
      link: "/products/abaya-green",
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[760px] overflow-hidden bg-black">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      >
        <source src="/shoppable_video/shoppable_video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for readability at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Play/Pause Button */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-10">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M8 5V19L19 12L8 5Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Products Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 lg:p-12 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full flex overflow-x-auto gap-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pointer-events-auto pb-4"
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-[280px] md:w-[340px] bg-white/95 backdrop-blur-sm snap-start p-3 md:p-4 flex gap-4 items-stretch group/card transition-transform hover:-translate-y-1 shadow-xl border border-white/20"
            >
              <Link href={product.link} className="flex-none w-[80px] md:w-[100px] relative overflow-hidden bg-gray-100 block shrink-0">
                <picture>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover/card:scale-110" 
                  />
                </picture>
              </Link>
              <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
                <Link href={product.link} className="text-sm md:text-base font-medium text-black truncate hover:text-gray-600 transition-colors mb-2 block" title={product.title}>
                  {product.title}
                </Link>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                  <span className="text-sm font-semibold text-black">{product.price}</span>
                  <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="Add to cart">
                    <svg className="w-[16px] h-[16px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.63 17.47l-.6-11a.51.51 0 00-.5-.47h-2v-.43a3.5 3.5 0 00-7 0V6h-2a.51.51 0 00-.5.47l-.62 11a.49.49 0 00.49.53h12.3a.49.49 0 00.43-.53zm-12.31-.42L4.9 7h10.2l.56 10.1-11.34-.05zM7.5 5.57a2.5 2.5 0 115 0V6h-5v-.43z" fill="currentColor"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Empty space at the end to allow scrolling past the last item */}
          <div className="flex-none w-4 md:w-12" />
        </motion.div>
      </div>
    </section>
  );
}

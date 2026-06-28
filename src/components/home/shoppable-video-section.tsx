"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
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
        poster="//wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/cb71f93f95a94b7e9d069d767db8ba2a.thumbnail.0000000000_600x.jpg?v=1708382598"
      >
        {/* Placeholder video from Shopify CDN. Replace with your own video URL. */}
        <source src="https://cdn.shopify.com/videos/c/vp/cb71f93f95a94b7e9d069d767db8ba2a/cb71f93f95a94b7e9d069d767db8ba2a.HD-1080p-7.2Mbps-24784977.mp4" type="video/mp4" />
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
          {products.map((product, index) => (
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
                  <span className="text-sm font-semibold">{product.price}</span>
                  <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="Add to cart">
                    <ShoppingBag className="w-4 h-4" />
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

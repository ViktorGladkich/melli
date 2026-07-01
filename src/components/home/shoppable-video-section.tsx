"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useQuickAddStore } from "@/store/quick-add-store";

interface ShoppableVideoSectionProps {
  variant?: "shoppable" | "text";
}

export function ShoppableVideoSection({ variant = "shoppable" }: ShoppableVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openQuickAdd } = useQuickAddStore();

  const products = [
    {
      id: "abaya-beige",
      brand: "MILLY",
      title: "Wüstensand Abaya",
      price: "€129.00",
      image: "/products/abaya_beige_front.jpg",
      link: "/product/abaya-beige",
      handle: "abaya-beige",
    },
    {
      id: "abaya-black",
      brand: "MILLY",
      title: "Klassische Schwarze Abaya",
      price: "€129.00",
      image: "/products/abaya_black_front.jpg",
      link: "/product/abaya-black",
      handle: "abaya-black",
    },
    {
      id: "abaya-green",
      brand: "MILLY",
      title: "Smaragd Traum",
      price: "€139.00",
      image: "/products/abaya_green_front.jpg",
      link: "/product/abaya-green",
      handle: "abaya-green",
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

  const handleQuickAdd = (
    product: { id: string; handle: string; brand: string; title: string; price: string; image: string; link: string }, 
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd({
      id: String(product.id),
      handle: product.handle,
      brand: "MILLY",
      title: product.title,
      category: "Video",
      price: product.price,
      images: [{ url: product.image, altText: product.title }],
      variants: [],
      options: [],
    });
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
        <source src="/video_hero/hero2.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for readability at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

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
      {variant === "shoppable" && (
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none pb-4 md:pb-8 lg:pb-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              }
            }
          }}
          className="w-full flex overflow-x-auto gap-4 snap-x snap-mandatory [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden pointer-events-auto px-4 md:px-8 lg:px-12"
        >
          {/* Empty space at the beginning to push the first card to the right side */}
          <div className="flex-none w-[10%] md:w-[calc(100%-360px)] snap-start" />

          {products.map((product) => (
            <motion.div 
              key={product.id} 
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
                }
              }}
              whileHover={{ y: -4 }}
              className="flex-none w-[280px] md:w-[340px] bg-white/95 backdrop-blur-sm snap-start p-3 md:p-4 flex gap-4 items-stretch group/card shadow-xl border border-white/20"
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
                  <button 
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer shrink-0" 
                    aria-label="Add to cart"
                  >
                    <svg className="w-[16px] h-[16px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.63 17.47l-.6-11a.51.51 0 00-.5-.47h-2v-.43a3.5 3.5 0 00-7 0V6h-2a.51.51 0 00-.5.47l-.62 11a.49.49 0 00.49.53h12.3a.49.49 0 00.43-.53zm-12.31-.42L4.9 7h10.2l.56 10.1-11.34-.05zM7.5 5.57a2.5 2.5 0 115 0V6h-5v-.43z" fill="currentColor"></path></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Empty space at the end to allow scrolling past the last item */}
          <div className="flex-none w-4 md:w-12" />
        </motion.div>
      </div>
      )}

      {/* Text Overlay Variant */}
      {variant === "text" && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 pointer-events-none z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white text-sm md:text-base font-medium tracking-widest mb-4"
          >
            Nachhaltigkeit & Qualität
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-wide leading-tight max-w-4xl"
          >
            Unsere Stoffe werden exklusiv für uns entwickelt. Wir fertigen nur hochwertige Mode, die bleibt.
          </motion.h2>
        </div>
      )}
    </section>
  );
}

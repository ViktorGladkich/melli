"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/mock-products";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && product) {
      setLightboxIndex((lightboxIndex + 1) % product.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && product) {
      setLightboxIndex((lightboxIndex - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-[60%] flex flex-col gap-4">
        {/* Mobile Horizontal Scroll */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 scrollbar-hide">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              className="min-w-full w-full snap-center shrink-0 bg-gray-50 aspect-[3/4] cursor-zoom-in"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img.url}
                alt={img.altText}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop Vertical Stack */}
        <div className="hidden md:flex flex-col gap-4">
          {product.images.map((img, idx) => (
            <div 
              key={idx} 
              className="w-full bg-gray-50 aspect-[3/4] cursor-zoom-in"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img.url}
                alt={img.altText}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-[110] p-2 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-10 text-white hover:text-gray-300 z-[110] p-2 cursor-pointer"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            <img
              src={product.images[lightboxIndex].url}
              alt={product.images[lightboxIndex].altText}
              className="max-h-full max-w-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-10 text-white hover:text-gray-300 z-[110] p-2 cursor-pointer"
            >
              <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

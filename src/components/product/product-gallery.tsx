"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/mock-products";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeMobileImageIndex, setActiveMobileImageIndex] = useState(0);
  const [activeDesktopImageIndex, setActiveDesktopImageIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

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

  useEffect(() => {
    // Setup intersection observer for desktop images
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveDesktopImageIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".desktop-gallery-img").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [product.images]);

  const scrollToImage = (index: number) => {
    const el = document.getElementById(`desktop-img-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

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

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== activeMobileImageIndex) {
      setActiveMobileImageIndex(index);
    }
  };

  return (
    <>
      <div 
        className="w-full md:w-1/2 lg:w-[60%] flex flex-col gap-4 relative"
        onMouseEnter={() => setIsGalleryHovered(true)}
        onMouseLeave={() => setIsGalleryHovered(false)}
      >
        {/* Mobile Horizontal Scroll */}
        <div className="relative md:hidden -mx-4 mb-4">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={handleMobileScroll}
          >
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
          
          {/* Mobile Image Counter */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-[11px] tracking-widest font-medium rounded-full z-10 pointer-events-none">
            {activeMobileImageIndex + 1} / {product.images.length}
          </div>
        </div>

        {/* Desktop Vertical Stack */}
        <div className="hidden md:flex flex-col gap-4">
          {product.images.map((img, idx) => (
            <div 
              key={idx} 
              id={`desktop-img-${idx}`}
              data-index={idx}
              className="w-full bg-gray-50 aspect-[3/4] cursor-zoom-in desktop-gallery-img"
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

        {/* Desktop Hover Floating Thumbnails */}
        <div 
          className={cn(
            "hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300",
            isGalleryHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
          )}
        >
          <div className="flex gap-4 h-[300px]">
            {/* Thumbnails List */}
            <div className="flex flex-col gap-2 overflow-hidden w-[50px] py-2 h-full justify-center">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => scrollToImage(idx)}
                  className={cn(
                    "w-full aspect-[3/4] shrink-0 cursor-pointer transition-all duration-300 overflow-hidden",
                    activeDesktopImageIndex === idx ? "border border-black" : "opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Custom Scrollbar / Indicator */}
            <div className="w-0.5 bg-gray-200 h-full relative rounded-full overflow-hidden">
              <div 
                className="absolute w-full bg-black transition-all duration-300 rounded-full"
                style={{
                  height: `${100 / product.images.length}%`,
                  top: `${(activeDesktopImageIndex / product.images.length) * 100}%`
                }}
              />
            </div>
          </div>
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

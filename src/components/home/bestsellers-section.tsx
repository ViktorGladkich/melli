"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/shopify";

import { ProductCard } from "@/components/product/product-card";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BestsellersSection({ products: _products }: { products?: Product[] }) {
  const [activeTab, setActiveTab] = useState("Abayas");
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabs = ["Abayas", "Tuniken", "Hijabs"];

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  useEffect(() => {
    // Сбрасываем кнопки прокрутки при переключении вкладки асинхронно
    const timer = setTimeout(() => {
      setCanScrollLeft(false);
      setCanScrollRight(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 306; // Width of one card + margin
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const categorizedProducts: Record<string, Product[]> = {
    "Abayas": [
      { id: "abaya-black", handle: "abaya-black", title: "Classic Black Abaya", priceRange: { minVariantPrice: { amount: "129.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v1", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/abaya_black_front.jpg", altText: "Abaya Black Front" } }, { node: { url: "/products/abaya_black_back.jpg", altText: "Abaya Black Back" } }] }, options: [{ name: "Color", values: ["Black", "Beige", "Green", "Pink", "Blue"] }] },
      { id: "abaya-pink", handle: "abaya-pink", title: "Dusty Pink Abaya", priceRange: { minVariantPrice: { amount: "149.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v4", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/abaya_pink_front.jpg", altText: "Abaya Pink Front" } }, { node: { url: "/products/abaya_pink_back.jpg", altText: "Abaya Pink Back" } }] }, options: [{ name: "Color", values: ["Pink", "Beige", "Blue"] }] },
      { id: "abaya-green", handle: "abaya-green", title: "Olive Green Modest Dress", priceRange: { minVariantPrice: { amount: "139.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v3", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/abaya_green_front.jpg", altText: "Abaya Green Front" } }, { node: { url: "/products/abaya_green_back.jpg", altText: "Abaya Green Back" } }] }, options: [{ name: "Color", values: ["Green", "Blue", "Black"] }] },
      { id: "abaya-beige", handle: "abaya-beige", title: "Desert Sand Abaya", priceRange: { minVariantPrice: { amount: "129.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v2", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/abaya_beige_front.jpg", altText: "Abaya Beige Front" } }, { node: { url: "/products/abaya_beige_back.jpg", altText: "Abaya Beige Back" } }] }, options: [{ name: "Color", values: ["Beige", "Black", "Pink"] }] },
      { id: "abaya-blue", handle: "abaya-blue", title: "Pastel Blue Maxi", priceRange: { minVariantPrice: { amount: "145.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v5", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/abaya_blue_front.jpg", altText: "Abaya Blue Front" } }, { node: { url: "/products/abaya_blue_back.jpg", altText: "Abaya Blue Back" } }] }, options: [{ name: "Color", values: ["Blue", "Green", "Pink"] }] }
    ],
    "Tuniken": [
      { id: "tunic-1", handle: "tunic-modest", title: "Modest Everyday Tunic", priceRange: { minVariantPrice: { amount: "89.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v1", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/tunic_modest.png", altText: "Tunic Modest" } }] }, options: [{ name: "Color", values: ["Beige", "Black"] }] },
      { id: "tunic-2", handle: "tunic-hijab", title: "Tunic & Hijab Set", priceRange: { minVariantPrice: { amount: "119.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v1", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/tunic_modest_hijab.png", altText: "Tunic with Hijab" } }] }, options: [{ name: "Color", values: ["Beige", "Pink"] }] },
      { id: "tunic-3", handle: "maxi-dress", title: "Casual Maxi Dress", priceRange: { minVariantPrice: { amount: "129.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v1", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/maxi_dress.png", altText: "Maxi Dress" } }] }, options: [{ name: "Color", values: ["Black", "Green"] }] },
      { id: "tunic-4", handle: "maxi-dress-hijab", title: "Maxi Dress & Hijab Set", priceRange: { minVariantPrice: { amount: "149.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v1", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/maxi_dress_hijab.png", altText: "Maxi Dress Hijab" } }] }, options: [{ name: "Color", values: ["Beige", "Blue"] }] },
      { id: "tunic-5", handle: "tunic-black-modest", title: "Classic Tunic Black", priceRange: { minVariantPrice: { amount: "119.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v5", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/tunic_black_front.png", altText: "Black Tunic Front" } }, { node: { url: "/products/tunic_black_back.png", altText: "Black Tunic Back" } }] }, options: [{ name: "Color", values: ["Black", "Beige"] }] }
    ],
    "Hijabs": [
      { id: "hijab-champagne", handle: "hijab-champagne", title: "Champagne Silk Hijab", priceRange: { minVariantPrice: { amount: "49.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v1", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/hijab_champagne_front.png", altText: "Champagne Hijab" } }, { node: { url: "/products/hijab_champagne_back.png", altText: "Champagne Hijab Back" } }] }, options: [{ name: "Color", values: ["Beige", "Pink"] }] },
      { id: "hijab-2", handle: "hijab-chiffon-pink", title: "Chiffon Hijab Pink", priceRange: { minVariantPrice: { amount: "29.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v2", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/hijab_chiffon_pink_front.png", altText: "Pink Hijab Front" } }, { node: { url: "/products/hijab_chiffon_pink_back.png", altText: "Pink Hijab Back" } }] }, options: [{ name: "Color", values: ["Pink", "Beige"] }] },
      { id: "hijab-3", handle: "hijab-jersey-green", title: "Jersey Hijab Olive", priceRange: { minVariantPrice: { amount: "25.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v3", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/hijab_jersey_olive_front.png", altText: "Olive Hijab Front" } }, { node: { url: "/products/hijab_jersey_olive_back.png", altText: "Olive Hijab Back" } }] }, options: [{ name: "Color", values: ["Green", "Black"] }] },
      { id: "hijab-4", handle: "hijab-jersey-beige", title: "Jersey Hijab Sand", priceRange: { minVariantPrice: { amount: "25.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v4", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/hijab_jersey_sand_front.png", altText: "Sand Hijab Front" } }, { node: { url: "/products/hijab_jersey_sand_back.png", altText: "Sand Hijab Back" } }] }, options: [{ name: "Color", values: ["Beige", "White"] }] },
      { id: "hijab-5", handle: "hijab-silk-black", title: "Premium Silk Black", priceRange: { minVariantPrice: { amount: "49.00", currencyCode: "EUR" } }, variants: { edges: [{ node: { id: "v5", title: "Default" } }] }, images: { edges: [{ node: { url: "/products/hijab_silk_black_front.png", altText: "Black Silk Hijab Front" } }, { node: { url: "/products/hijab_silk_black_back.png", altText: "Black Silk Hijab Back" } }] }, options: [{ name: "Color", values: ["Black", "Green"] }] }
    ]
  };

  const products = categorizedProducts[activeTab] || categorizedProducts["Abayas"];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden text-black">
      <div className="flex flex-col items-center mb-10 md:mb-16 px-4">
        
        {/* Title exactly like HTML Example */}
        <div className="headline scroll-trigger animate--slide-in mb-8 text-center md:text-left w-full md:w-auto">
          <h2 className="headline__title text-3xl md:text-4xl font-normal tracking-wide uppercase text-center">
            Unsere Bestseller
          </h2>
        </div>
        
        {/* Tabs */}
        <div className="wt-tabs class=wt-tabs flex gap-6 md:gap-10 overflow-x-auto max-w-full no-scrollbar px-4">
          <div className="wt-tabs__header">
            <div className="wt-tabs__tablist flex gap-6 md:gap-10" role="tablist">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  role="tab"
                  id={`wt-tab-collection_tab_${i}`}
                  aria-selected={activeTab === tab}
                  tabIndex={activeTab === tab ? 0 : -1}
                  onClick={() => setActiveTab(tab)}
                  className={`wt-tabs__tab pb-3 text-[13px] md:text-sm uppercase tracking-widest whitespace-nowrap transition-colors relative ${
                    activeTab === tab 
                      ? "text-black" 
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  <span>{tab}</span>
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full relative max-w-[1340px] mx-auto px-4 md:px-12 group/slider">
        
        {canScrollLeft && (
          <button onClick={() => scroll('left')} className="absolute left-0 top-[40%] -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all hover:scale-110 pointer-events-auto hidden md:block cursor-pointer">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} className="absolute right-0 top-[40%] -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all hover:scale-110 pointer-events-auto hidden md:block cursor-pointer">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}

        <div className="overflow-hidden max-w-[1216px] mx-auto pb-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              ref={scrollRef} 
              onScroll={handleScroll}
              onAnimationComplete={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              data-swiper-container="" 
              role="list" 
              className="swiper-wrapper wt-slider__wrapper flex overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-8 justify-start cursor-grab active:cursor-grabbing" 
              id="swiper-wrapper-105d76f741f8afbc2" 
              aria-live="polite"
            >
            {/* Slides */}
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} total={products.length} />
            ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

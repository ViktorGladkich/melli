"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_PRODUCTS, type Product } from "@/lib/mock-products";

import { ProductCard } from "@/components/product/product-card";

interface BestsellersSectionProps {
  title?: string;
  showTabs?: boolean;
  products?: Product[];
}

export function BestsellersSection({ 
  title = "Unsere Bestseller", 
  showTabs = true,
  products: propProducts 
}: BestsellersSectionProps) {
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

  const displayProducts = propProducts || (showTabs ? MOCK_PRODUCTS.filter(p => p.category === activeTab) : MOCK_PRODUCTS.slice(0, 8));

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden text-black">
      <div className="flex flex-col items-center mb-10 md:mb-16 px-4">
        
        {/* Title exactly like HTML Example */}
        <div className="headline scroll-trigger animate--slide-in mb-8 text-center md:text-left w-full md:w-auto">
          <h2 className="headline__title text-3xl md:text-4xl font-normal tracking-wide uppercase text-center">
            {title}
          </h2>
        </div>
        
        {/* Tabs */}
        {showTabs && (
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
        )}
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
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} total={displayProducts.length} />
            ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

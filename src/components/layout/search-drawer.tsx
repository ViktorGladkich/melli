"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Data
import { MOCK_PRODUCTS } from "@/lib/mock-products";

const MOCK_SUGGESTIONS = [
  "Abaya",
  "Black Abaya",
  "Silk Hijab",
  "Tunic Set",
];

const MOCK_ARTICLES = [
  "Wie man Abayas stylt",
  "Die neue Sommerkollektion",
];

const MOCK_COLLECTIONS = [
  "Abayas",
  "Hijabs",
  "Tuniken",
];

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Clear query after drawer closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setQuery(""), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.brand.toLowerCase().includes(query.toLowerCase())
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <strong key={i} className="font-bold text-black">{part}</strong> : <span key={i} className="text-gray-600">{part}</span>
        )}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-100 bg-white flex flex-col overflow-y-auto overflow-x-hidden font-sans"
        >
          {/* Header Area */}
          <div className="w-full flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-gray-100 shrink-0 sticky top-0 bg-white z-10">
            
            {/* Empty left spacer to center input */}
            <div className="w-10 hidden md:block"></div>

            {/* Search Input Container */}
            <div className="flex-1 max-w-3xl mx-auto flex items-center justify-center relative">
              <div className="w-full relative">
                <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Suchen..."
                  className="w-full h-[50px] pl-12 pr-12 border border-gray-300 focus:outline-none focus:border-black transition-colors text-[16px]"
                />
                <AnimatePresence>
                  {query.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center bg-[#ccc] hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="ml-4 p-2 -mr-2 text-gray-500 hover:text-black transition-colors cursor-pointer group"
            >
              <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1} />
            </button>
          </div>

          {/* Content Area */}
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
            {query.length === 0 ? (
              // Empty State: Top Sellers
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
                }}
                className="flex flex-col items-center"
              >
                <motion.h3 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="text-[14px] font-medium tracking-widest uppercase mb-10 text-gray-800 text-center"
                >
                  Top Sellers
                </motion.h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
                  {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                    <motion.div 
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                      }}
                    >
                      <Link 
                        href={`/product/${product.handle}`} 
                        onClick={onClose}
                        className="flex flex-col group items-center text-center h-full"
                      >
                        <div className="w-full aspect-3/4 bg-gray-50 mb-4 overflow-hidden">
                          <img 
                            src={product.images[0]?.url || ""} 
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <span className="text-[13px] text-gray-800 group-hover:underline">
                          {product.title}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // Search Results State
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full">
                {/* Left Column: Products */}
                <div className="flex-1">
                  <h3 className="text-[13px] font-medium tracking-widest uppercase mb-8 text-gray-800">
                    Produkte
                  </h3>
                  
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 gap-y-12">
                      {filteredProducts.map((product) => (
                        <Link 
                          href={`/product/${product.handle}`} 
                          key={product.id}
                          onClick={onClose}
                          className="flex gap-4 group"
                        >
                          <div className="w-[120px] h-[160px] bg-gray-50 shrink-0 overflow-hidden">
                            <img 
                              src={product.images[0]?.url || ""} 
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-col py-1">
                            <span className="text-[11px] text-gray-400 font-medium tracking-widest uppercase mb-1">
                              {product.brand || "MILLY"}
                            </span>
                            <span className="text-[14px] font-medium text-black group-hover:underline mb-2">
                              {highlightText(product.title, query)}
                            </span>
                            <span className="text-[14px] font-medium text-black">
                              {product.price}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-gray-500 text-[14px]">
                      Keine Ergebnisse für &quot;{query}&quot; gefunden.
                    </div>
                  )}
                </div>

                {/* Right Column: Suggestions, Articles, Collections */}
                <div className="w-full md:w-[320px] shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-10 md:pt-0 md:pl-12 flex flex-col gap-10">
                  
                  {/* Suggestions */}
                  <div>
                    <h3 className="text-[13px] font-medium tracking-widest uppercase mb-6 text-gray-800">
                      Vorschläge
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {MOCK_SUGGESTIONS.map((suggestion, i) => (
                        <li key={i}>
                          <button 
                            onClick={() => setQuery(suggestion)}
                            className="text-[15px] hover:opacity-70 transition-opacity cursor-pointer text-left w-full"
                          >
                            {highlightText(suggestion, query)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full h-px bg-gray-100"></div>

                  {/* Articles */}
                  <div>
                    <h3 className="text-[13px] font-medium tracking-widest uppercase mb-6 text-gray-800">
                      Artikel
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {MOCK_ARTICLES.map((article, i) => (
                        <li key={i}>
                          <Link 
                            href="#" 
                            onClick={onClose}
                            className="text-[15px] hover:opacity-70 transition-opacity cursor-pointer text-gray-600 block"
                          >
                            {highlightText(article, query)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full h-px bg-gray-100"></div>

                  {/* Collections */}
                  <div>
                    <h3 className="text-[13px] font-medium tracking-widest uppercase mb-6 text-gray-800">
                      Kollektionen
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {MOCK_COLLECTIONS.map((collection, i) => (
                        <li key={i}>
                          <Link 
                            href="#" 
                            onClick={onClose}
                            className="text-[15px] hover:opacity-70 transition-opacity cursor-pointer text-gray-600 block"
                          >
                            {highlightText(collection, query)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

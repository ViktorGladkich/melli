"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface FilterState {
  inStock: boolean;
  outOfStock: boolean;
  colors: string[];
  sizes: string[];
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  availableColors: { name: string; count: number }[];
  availableSizes: { name: string; count: number }[];
  inStockCount: number;
  outOfStockCount: number;
  onApply: () => void;
  onClear: () => void;
}

const getColorStyle = (color: string) => {
  const c = color.toLowerCase();
  if (c === "multicolor" || c === "mehrfarbig") return { backgroundImage: "url(/multicolor.png)", backgroundColor: "#ccc" };
  if (c === "blue" || c === "blau") return { backgroundColor: "#6091B8" };
  if (c === "green" || c === "grün") return { backgroundColor: "#588157" };
  if (c === "beige") return { backgroundColor: "#f3d9c6" };
  if (c === "olive") return { backgroundColor: "#6a7b76" };
  if (c === "black" || c === "schwarz") return { backgroundColor: "black" };
  if (c === "white" || c === "weiß") return { backgroundColor: "white" };
  if (c === "red" || c === "rot") return { backgroundColor: "red" };
  if (c === "pink") return { backgroundColor: "pink" };
  if (c === "sand") return { backgroundColor: "#c2b280" };
  return { backgroundColor: "#ccc" }; // fallback
};

export function FilterDrawer({
  isOpen,
  onClose,
  filterState,
  setFilterState,
  availableColors,
  availableSizes,
  inStockCount,
  outOfStockCount,
  onApply,
  onClear
}: FilterDrawerProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    availability: true,
    color: true,
    size: true
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleColor = (color: string) => {
    setFilterState(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const toggleSize = (size: string) => {
    setFilterState(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-60 w-full md:w-[420px] bg-white shadow-2xl flex flex-col text-black font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-[15px] font-normal tracking-widest uppercase">
                FILTER
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 transition-transform duration-300 hover:rotate-90 cursor-pointer"
                aria-label="Schließen"
              >
                <X className="w-6 h-6" strokeWidth={1} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Availability */}
              <div className="border-b border-gray-100 pb-6">
                <button 
                  onClick={() => toggleSection('availability')}
                  className="w-full flex items-center justify-between py-2 mb-4 cursor-pointer"
                >
                  <span className="text-[13px] tracking-widest uppercase">VERFÜGBARKEIT</span>
                  {openSections.availability ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {openSections.availability && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-4"
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 border-gray-300 rounded-none accent-black"
                          checked={filterState.inStock}
                          onChange={(e) => setFilterState(prev => ({ ...prev, inStock: e.target.checked }))}
                        />
                        <span className="text-[14px]">Auf Lager ({inStockCount})</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 border-gray-300 rounded-none accent-black"
                          checked={filterState.outOfStock}
                          onChange={(e) => setFilterState(prev => ({ ...prev, outOfStock: e.target.checked }))}
                        />
                        <span className="text-[14px]">Ausverkauft ({outOfStockCount})</span>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Color */}
              {availableColors.length > 0 && (
                <div className="border-b border-gray-100 pb-6">
                  <button 
                    onClick={() => toggleSection('color')}
                    className="w-full flex items-center justify-between py-2 mb-4 cursor-pointer"
                  >
                    <span className="text-[13px] tracking-widest uppercase">FARBE</span>
                    {openSections.color ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {openSections.color && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-3">
                          {availableColors.map((colorObj) => {
                            const isSelected = filterState.colors.includes(colorObj.name);
                            return (
                              <button
                                key={colorObj.name}
                                onClick={() => toggleColor(colorObj.name)}
                                className={cn(
                                  "w-8 h-8 rounded-full border-2 transition-all p-0.5 cursor-pointer",
                                  isSelected ? "border-black" : "border-transparent hover:border-gray-200"
                                )}
                                title={`${colorObj.name} (${colorObj.count})`}
                              >
                                <div
                                  className="w-full h-full rounded-full border border-gray-100"
                                  style={getColorStyle(colorObj.name)}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Size */}
              {availableSizes.length > 0 && (
                <div className="border-b border-gray-100 pb-6">
                  <button 
                    onClick={() => toggleSection('size')}
                    className="w-full flex items-center justify-between py-2 mb-4 cursor-pointer"
                  >
                    <span className="text-[13px] tracking-widest uppercase">GRÖSSE</span>
                    {openSections.size ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {openSections.size && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-4 pt-2"
                      >
                        {availableSizes.map((sizeObj) => (
                          <label key={sizeObj.name} className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 border-gray-300 rounded-none accent-black"
                              checked={filterState.sizes.includes(sizeObj.name)}
                              onChange={() => toggleSize(sizeObj.name)}
                            />
                            <span className="text-[14px]">
                              {sizeObj.name} ({sizeObj.count})
                            </span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

            </div>

            {/* Footer Buttons */}
            <div className="p-6 bg-white border-t border-gray-100 mt-auto">
              <button 
                onClick={handleApply}
                className="w-full bg-[#222] text-white py-4 text-[14px] font-medium tracking-widest uppercase hover:bg-black transition-colors flex justify-center items-center mb-4 cursor-pointer group"
              >
                <div className="relative overflow-hidden h-5 w-full flex justify-center">
                  <span className="absolute transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-2">
                    Anwenden
                  </span>
                  <span className="absolute translate-y-full transition-transform duration-500 group-hover:translate-y-0 flex items-center gap-2">
                    Anwenden
                  </span>
                </div>
              </button>
              <button 
                onClick={onClear}
                className="w-full text-center text-[13px] text-gray-500 underline hover:text-black transition-colors cursor-pointer"
              >
                Alle entfernen
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

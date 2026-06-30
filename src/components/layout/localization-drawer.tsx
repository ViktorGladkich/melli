"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Country } from "@/lib/shopify";

interface LocalizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countries?: Country[];
  selectedCountry?: Country | null;
  onSelectCountry?: (isoCode: string) => void;
}

function getFlagEmoji(countryCode: string) {
  if (!countryCode) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function LocalizationDrawer({ 
  isOpen, 
  onClose, 
  countries = [],
  selectedCountry,
  onSelectCountry
}: LocalizationDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="fixed inset-y-0 right-0 z-60 w-full md:w-[480px] bg-white shadow-2xl flex flex-col text-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-sm font-semibold tracking-widest uppercase">
                Lokalisierungsoptionen
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex px-6 pt-4 border-b border-gray-100">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-black">
                Land/Region
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
                Sprache
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Current Selection */}
              {selectedCountry && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 font-medium mb-2">
                    <span className="text-xl">{getFlagEmoji(selectedCountry.isoCode)}</span>
                    <span>{selectedCountry.name} | {selectedCountry.currency.isoCode} {selectedCountry.currency.symbol}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Sie versenden derzeit nach {selectedCountry.name} und Ihre Bestellung wird in {selectedCountry.currency.isoCode} {selectedCountry.currency.symbol} abgerechnet.
                  </p>
                </div>
              )}

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Standort suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 text-[16px] md:text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Countries List */}
              <ul className="space-y-4">
                {filteredCountries.map((country) => (
                  <li 
                    key={country.isoCode}
                    onClick={() => onSelectCountry?.(country.isoCode)}
                    className={`flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-md transition-colors ${selectedCountry?.isoCode === country.isoCode ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getFlagEmoji(country.isoCode)}</span>
                      <span className="text-sm font-medium group-hover:text-gray-600 transition-colors">
                        {country.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{country.currency.isoCode} {country.currency.symbol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

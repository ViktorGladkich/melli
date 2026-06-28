"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface LocalizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { flag: "🇦🇫", name: "Afghanistan", currency: "AFN ؋" },
  { flag: "🇦🇽", name: "Åland Islands", currency: "EUR €" },
  { flag: "🇦🇱", name: "Albania", currency: "ALL L" },
  { flag: "🇩🇿", name: "Algeria", currency: "DZD د.ج" },
  { flag: "🇦🇩", name: "Andorra", currency: "EUR €" },
  { flag: "🇦🇴", name: "Angola", currency: "USD $" },
  { flag: "🇦🇮", name: "Anguilla", currency: "XCD $" },
  { flag: "🇦🇬", name: "Antigua & Barbuda", currency: "XCD $" },
  { flag: "🇦🇷", name: "Argentina", currency: "USD $" },
  { flag: "🇦🇺", name: "Australia", currency: "AUD $" },
  { flag: "🇦🇹", name: "Austria", currency: "EUR €" },
  { flag: "🇩🇪", name: "Germany", currency: "EUR €" },
];

export function LocalizationDrawer({ isOpen, onClose }: LocalizationDrawerProps) {
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
                Localization Options
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex px-6 pt-4 border-b border-gray-100">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-black">
                Country/region
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
                Language
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Current Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-2 font-medium mb-2">
                  <span className="text-xl">🇩🇪</span>
                  <span>Germany | EUR €</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You are currently shipping to Germany and your order will be billed in EUR €.
                </p>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Countries List */}
              <ul className="space-y-4">
                {filteredCountries.map((country) => (
                  <li 
                    key={country.name}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm font-medium group-hover:text-gray-600 transition-colors">
                        {country.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{country.currency}</span>
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

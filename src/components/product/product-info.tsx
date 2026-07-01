"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/lib/mock-products";
import { SizeGuideModal } from "./size-guide-modal";
import { WishlistButton } from "./wishlist-button";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const colorOptionName = product?.options.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'farbe')?.name;
  const sizeOptionName = product?.options.find(o => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'größe')?.name;

  const [selectedColor, setSelectedColor] = useState<string | null>(
    colorOptionName ? product?.options.find((o) => o.name === colorOptionName)?.values[0] || null : null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizeOptionName ? product?.options.find((o) => o.name === sizeOptionName)?.values[0] || null : null,
  );
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Find currently selected variant
  let selectedVariant = product.variants[0]; // fallback
  if (product.variants.length > 1) {
    selectedVariant = product.variants.find((variant) => {
      const matchesColor = selectedColor 
        ? variant.selectedOptions?.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'farbe')?.value === selectedColor 
        : true;
      const matchesSize = selectedSize 
        ? variant.selectedOptions?.find(o => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'größe')?.value === selectedSize 
        : true;
      return matchesColor && matchesSize;
    }) || product.variants[0];
  }

  const isCurrentVariantAvailable = selectedVariant?.availableForSale ?? false;

  const handleAddToCart = () => {
    if (!isCurrentVariantAvailable) return;
    const variantId = selectedVariant.id;
    addItem(variantId, 1);
  };

  const isColorAvailable = (color: string) => {
    return product.variants.some((variant) => {
      const isThisColor = variant.selectedOptions?.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'farbe')?.value === color;
      return isThisColor && variant.availableForSale;
    });
  };

  const isSizeAvailable = (size: string) => {
    return product.variants.some((variant) => {
      const isThisColor = selectedColor 
        ? variant.selectedOptions?.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'farbe')?.value === selectedColor 
        : true;
      const isThisSize = variant.selectedOptions?.find(o => o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'größe')?.value === size;
      return isThisColor && isThisSize && variant.availableForSale;
    });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const hasColors = !!colorOptionName;
  const hasSizes = !!sizeOptionName;
  const colors = colorOptionName ? product.options.find((o) => o.name === colorOptionName)?.values || [] : [];
  const sizes = sizeOptionName ? product.options.find((o) => o.name === sizeOptionName)?.values || [] : [];

  return (
    <div className="w-full md:w-1/2 lg:w-[40%] relative">
      <div className="sticky top-32 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-4">
          {product.title}
        </h1>

        <p className="text-[15px] font-medium mb-10">{product.price}</p>

        {/* Color Selector */}
        {hasColors && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] tracking-widest uppercase">
                Farbe: {selectedColor}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => {
                const available = isColorAvailable(color);
                return (
                  <button
                    key={color}
                    onClick={() => available && setSelectedColor(color)}
                    disabled={!available}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColor === color ? "border-black p-0.5" : "border-transparent hover:border-gray-200"
                    } ${!available ? "cursor-not-allowed" : ""}`}
                    aria-label={`Farbe ${color} ${!available ? "(Nicht verfügbar)" : ""}`}
                  >
                    <div
                      className={`w-full h-full rounded-full border border-gray-100 ${!available ? "opacity-50" : ""}`}
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "beige"
                            ? "#f5f5dc"
                            : color.toLowerCase() === "olive"
                              ? "#808000"
                              : color.toLowerCase() === "sand"
                                ? "#c2b280"
                                : color.toLowerCase(),
                      }}
                    />
                    {!available && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[120%] h-[1.5px] bg-black rotate-45 transform origin-center" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {hasSizes && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] tracking-widest uppercase">
                Größe
              </span>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[12px] text-gray-500 underline hover:text-black cursor-pointer"
              >
                Größentabelle
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((size) => {
                const available = isSizeAvailable(size);
                return (
                  <button
                    key={size}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    className={`relative py-3 text-[13px] tracking-widest uppercase border transition-colors ${
                      !available 
                        ? "border-gray-200 text-gray-400 bg-gray-50/50 cursor-not-allowed" 
                        : selectedSize === size 
                          ? "border-black bg-black text-white cursor-pointer" 
                          : "border-gray-300 text-black hover:border-black cursor-pointer"
                    }`}
                  >
                    <span className={!available ? "line-through opacity-70" : ""}>{size}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add to Cart & Wishlist */}
        <div className="flex gap-3 mb-12 items-stretch">
          <button
            onClick={handleAddToCart}
            disabled={!isCurrentVariantAvailable}
            className={`flex-1 py-4 text-[14px] font-medium tracking-widest uppercase transition-colors flex justify-center items-center group ${
              isCurrentVariantAvailable 
                ? "bg-[#222] text-white hover:bg-black cursor-pointer" 
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isCurrentVariantAvailable ? (
              <div className="relative overflow-hidden h-5 w-full flex justify-center">
                <span className="absolute transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-2">
                  In den Warenkorb
                </span>
                <span className="absolute translate-y-full transition-transform duration-500 group-hover:translate-y-0 flex items-center gap-2">
                  In den Warenkorb
                </span>
              </div>
            ) : (
              <div className="h-5 flex items-center justify-center">
                AUSVERKAUFT
              </div>
            )}
          </button>
          
          <WishlistButton 
            product={product} 
            className="w-[54px] h-auto rounded-none bg-white border border-gray-200 hover:border-black shadow-none backdrop-blur-none hover:bg-gray-50 flex-shrink-0 hover:scale-100"
            iconClassName="w-5 h-5 scale-100 group-hover:scale-100 group-hover:opacity-60 transition-opacity"
          />
        </div>

        {/* Accordions */}
        <div className="border-t border-gray-200">
          {/* Description */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("description")}
              className="w-full py-5 flex justify-between items-center text-left hover:opacity-70 transition-opacity cursor-pointer"
            >
              <span className="text-[13px] tracking-widest uppercase">
                Beschreibung
              </span>
              {openAccordion === "description" ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
            <AnimatePresence>
              {openAccordion === "description" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[14px] text-gray-600 leading-relaxed">
                    {product.description ||
                      "Entdecke zeitlose Eleganz mit unserer exklusiven Kollektion. Jedes Stück wird mit höchster Präzision und Liebe zum Detail gefertigt, um dir den perfekten Mix aus Stil und Komfort zu bieten."}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Material & Pflege */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("material")}
              className="w-full py-5 flex justify-between items-center text-left hover:opacity-70 transition-opacity cursor-pointer"
            >
              <span className="text-[13px] tracking-widest uppercase">
                Material & Pflege
              </span>
              {openAccordion === "material" ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
            <AnimatePresence>
              {openAccordion === "material" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[14px] text-gray-600 leading-relaxed">
                    {product.material ||
                      "Hochwertige Stoffmischung. Wir empfehlen sanfte Handwäsche oder Maschinenwäsche bei 30 Grad. Nicht im Trockner trocknen."}
                    
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 text-black">
                      {/* Iron (Low Heat) */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Bügeln bei niedriger Temperatur">
                        <path d="M4 17h16.5c1 0 1.5-.9 1-1.7l-3.5-5.3C17.4 9 16.5 8 15 8H8c-2.2 0-4 1.8-4 4v5z"/>
                        <path d="M4 12h14.5"/>
                        <circle cx="12" cy="14.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                      
                      {/* Do Not Tumble Dry */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Nicht im Trockner trocknen">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="12" cy="12" r="6"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                        <line x1="22" y1="2" x2="2" y2="22"/>
                      </svg>

                      {/* Dry Clean P */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Professionelle Textilreinigung">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M10 16V8h3a3 3 0 0 1 0 6h-3"/>
                      </svg>

                      {/* Do Not Bleach */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Nicht bleichen">
                        <polygon points="12 3 21 19 3 19"/>
                        <line x1="3" y1="3" x2="21" y2="21"/>
                        <line x1="21" y1="3" x2="3" y2="21"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Versand */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion("shipping")}
              className="w-full py-5 flex justify-between items-center text-left hover:opacity-70 transition-opacity cursor-pointer"
            >
              <span className="text-[13px] tracking-widest uppercase">
                Versand & Rückgabe
              </span>
              {openAccordion === "shipping" ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
            <AnimatePresence>
              {openAccordion === "shipping" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-[14px] text-gray-600 leading-relaxed">
                    Kostenloser Versand ab 80€ Bestellwert. Rückgabe
                    innerhalb von 30 Tagen möglich. Die Rücksendekosten
                    trägt der Käufer.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
      />
    </div>
  );
}

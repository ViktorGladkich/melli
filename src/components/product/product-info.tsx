"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/lib/mock-products";
import { SizeGuideModal } from "./size-guide-modal";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.options.find((o) => o.name === "Color")?.values[0] || null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.options.find((o) => o.name === "Size")?.values[0] || null,
  );
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    // Find the correct variant based on selected options
    let selectedVariant = product.variants[0]; // fallback
    
    if (product.variants.length > 1) {
      selectedVariant = product.variants.find((variant) => {
        const matchesColor = selectedColor 
          ? variant.selectedOptions?.find(o => o.name === 'Color' || o.name === 'Farbe')?.value === selectedColor 
          : true;
        const matchesSize = selectedSize 
          ? variant.selectedOptions?.find(o => o.name === 'Size' || o.name === 'Größe')?.value === selectedSize 
          : true;
        
        return matchesColor && matchesSize;
      }) || product.variants[0];
    }

    const variantId = selectedVariant.id;

    addItem(variantId, 1);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const hasColors = product.options.some((o) => o.name === "Color");
  const hasSizes = product.options.some((o) => o.name === "Size");
  const colors = product.options.find((o) => o.name === "Color")?.values || [];
  const sizes = product.options.find((o) => o.name === "Size")?.values || [];

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
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${selectedColor === color ? "border-black p-0.5" : "border-transparent hover:border-gray-200"}`}
                >
                  <div
                    className="w-full h-full rounded-full border border-gray-100"
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
                  ></div>
                </button>
              ))}
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
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-[13px] tracking-widest uppercase border transition-colors cursor-pointer ${selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 text-black hover:border-black"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#222] text-white py-4 text-[14px] font-medium tracking-widest uppercase hover:bg-black transition-colors mb-12 flex justify-center items-center group cursor-pointer"
        >
          <div className="relative overflow-hidden h-5 w-full flex justify-center">
            <span className="absolute transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-2">
              In den Warenkorb
            </span>
            <span className="absolute translate-y-full transition-transform duration-500 group-hover:translate-y-0 flex items-center gap-2">
              In den Warenkorb
            </span>
          </div>
        </button>

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

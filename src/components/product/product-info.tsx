"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/lib/mock-products";

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

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    // Generate a unique ID based on selections
    const variantId = `${product.id}-${selectedColor || "default"}-${selectedSize || "default"}`;
    const variantTitle = [selectedColor, selectedSize].filter(Boolean).join(" / ");

    addItem({
      id: variantId, // Using variantId as the unique cart item id
      variantId,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0]?.url || "",
      variantTitle: variantTitle || "Default",
    });

    openCart();
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
              <button className="text-[12px] text-gray-500 underline hover:text-black cursor-pointer">
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
    </div>
  );
}

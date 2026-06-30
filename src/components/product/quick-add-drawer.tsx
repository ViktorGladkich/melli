"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQuickAddStore } from "@/store/quick-add-store";
import { useCartStore } from "@/store/cart-store";
import { AnimatedText } from "@/components/ui/animated-text";
import { getProductByHandle } from "@/lib/mock-products";
import { SizeGuideModal } from "./size-guide-modal";

export function QuickAddDrawer() {
  const { isOpen, product, closeQuickAdd } = useQuickAddStore();
  const { addItem, openCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<string>("36");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // SIZES array removed because it's unused (product.sizes is used instead in the real component if it exists)

  // Note: We don't reset the selectedSize in a useEffect to avoid cascading renders
  // and because it's fine for the size to persist between openings.

  const fullProduct = product ? getProductByHandle(product.handle) : undefined;
  
  const productColors = fullProduct?.options.find((o) => o.name === "Color")?.values || ["Black"];
  const productSizes = fullProduct?.options.find((o) => o.name === "Size")?.values || [];
  
  const selectedColor = productColors[0];
  const currentSize = productSizes.includes(selectedSize) ? selectedSize : (productSizes[0] || "");

  const handleAddToCart = () => {
    if (!product) return;
    
    const variantIdStr = currentSize ? `${product.id}-${selectedColor}-${currentSize}` : `${product.id}-${selectedColor}`;
    const variantTitleStr = currentSize ? `${selectedColor} / ${currentSize}` : selectedColor;

    addItem(variantIdStr, 1);
    
    closeQuickAdd();
    openCart();
  };

  return (
    <>
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeQuickAdd}
            className="fixed inset-0 z-60 bg-black/50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-y-0 right-0 z-60 w-full md:w-[420px] bg-white flex flex-col text-black font-sans shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickAdd}
              className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-black transition-colors cursor-pointer group bg-white/80 rounded-full"
              aria-label="Close"
            >
              <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
              {/* Product Image */}
              <div className="w-full bg-gray-50 aspect-3/4">
                <img 
                  src={product.image || (fullProduct?.images && fullProduct.images[0]?.url) || ""} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 block">
                  {product.brand}
                </span>
                <h2 className="text-[15px] font-normal tracking-widest uppercase mb-3">
                  {product.title}
                </h2>
                <div className="text-[14px] font-normal mb-8">
                  {product.price}
                </div>

                {/* Color Selector */}
                <div className="mb-6">
                  <span className="text-[12px] text-gray-600 block mb-3">
                    Farbe: <span className="text-black font-medium">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-black p-[2px] cursor-pointer">
                      <span 
                        className="w-full h-full rounded-full block" 
                        style={{ backgroundColor: selectedColor.toLowerCase() === 'beige' ? '#f5f5dc' : selectedColor.toLowerCase() === 'pink' ? '#ffc0cb' : selectedColor.toLowerCase() === 'green' ? '#556b2f' : selectedColor.toLowerCase() === 'blue' ? '#4682b4' : selectedColor.toLowerCase() === 'white' ? '#ffffff' : '#000000', border: selectedColor.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none' }}
                      />
                    </button>
                  </div>
                </div>

                {/* Size Selector */}
                {productSizes.length > 0 && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[12px] text-gray-600">
                        Größe: <span className="text-black font-medium">{currentSize}</span>
                      </span>
                      <button 
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[12px] underline text-gray-600 hover:text-black transition-colors cursor-pointer"
                      >
                        Größentabelle
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {productSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] h-10 border text-[12px] transition-colors cursor-pointer
                            ${currentSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black'}
                          `}
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
                  className="w-full bg-[#222] text-white h-[50px] text-[14px] font-medium transition-colors hover:bg-black mb-6 cursor-pointer group flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <AnimatedText text="In den Warenkorb" />
                </button>

                {/* View Details Link */}
                <Link 
                  href={`/product/${product.handle}`}
                  onClick={closeQuickAdd}
                  className="text-[13px] underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Alle Details ansehen
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <SizeGuideModal 
      isOpen={isSizeGuideOpen} 
      onClose={() => setIsSizeGuideOpen(false)} 
    />
    </>
  );
}

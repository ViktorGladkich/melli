"use client";

import { useCartStore } from "@/store/cart-store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ChevronUp, FileText, Tag, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const drawerVariants = {
  hidden: { x: "100%", transition: { duration: 0.4, ease: [0.36, 0, 0.66, -0.56] } },
  visible: { 
    x: "0%", 
    transition: { 
      duration: 0.5, 
      ease: [0.34, 1.56, 0.64, 1], // bouncy ease out
    } 
  },
};

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const [isGiftWrapping, setIsGiftWrapping] = useState(false);

  const total = items.reduce((acc, item) => {
    const match = item.price.match(/[\d.,]+/);
    if (!match) return acc;
    const priceNumber = parseFloat(match[0].replace(',', '.'));
    return acc + (isNaN(priceNumber) ? 0 : priceNumber) * item.quantity;
  }, 0);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[420px] bg-white flex flex-col text-black font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0">
              <h2 className="text-[13px] font-medium tracking-[0.1em] uppercase">
                Your cart ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 -m-2 text-gray-500 hover:text-black transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
              
              {/* Free Shipping Bar */}
              <div className="px-6 py-5 shrink-0">
                <p className="text-[13px] font-medium mb-3">
                  You have unlocked free shipping!
                </p>
                <div className="w-full h-1 bg-gray-200">
                  <div className="h-full bg-[#222] w-full"></div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="px-6 flex-1">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <p className="text-gray-500 text-sm">Your cart is currently empty.</p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-6 pb-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        {/* Image */}
                        <div className="w-[100px] h-[130px] shrink-0 bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col flex-1 py-1">
                          <h3 className="text-[14px] font-medium text-black">
                            {item.title}
                          </h3>
                          <div className="text-[13px] text-gray-500 mt-1 space-y-0.5">
                            <p>Color: Black</p>
                            <p>Size: {item.variantTitle || '38'}</p>
                          </div>

                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Quantity Counter */}
                              <div className="flex items-center border border-gray-200 h-9">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-black"
                                >
                                  <Minus className="w-3 h-3" strokeWidth={1.5} />
                                </button>
                                <span className="w-8 text-center text-[13px]">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-black"
                                >
                                  <Plus className="w-3 h-3" strokeWidth={1.5} />
                                </button>
                              </div>
                              
                              {/* Delete Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-black transition-colors"
                              >
                                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                            
                            <span className="text-[14px] font-medium">{item.price}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cross Sell Section */}
              <div className="bg-[#f7f7f7] mt-auto shrink-0 border-t border-gray-200">
                <button className="w-full flex items-center justify-between px-6 py-4 text-[13px] font-medium">
                  You might also like
                  <ChevronUp className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </button>
              </div>
              
              {/* Footer Area inside scroll to stick to bottom naturally */}
              <div className="shrink-0 bg-white border-t border-gray-200">
                {/* Gift Wrapping */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 cursor-pointer" onClick={() => setIsGiftWrapping(!isGiftWrapping)}>
                  <div className={`w-5 h-5 border flex items-center justify-center rounded-sm transition-colors ${isGiftWrapping ? 'border-black bg-black' : 'border-gray-300'}`}>
                    {isGiftWrapping && <X className="w-3 h-3 text-white" strokeWidth={3} />} {/* Checkmark ideally, using X as placeholder or implement custom check */}
                    {isGiftWrapping && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-[13px]">Gift wrapping</span>
                </div>

                {/* Features Row */}
                <div className="flex border-b border-gray-100">
                  <button className="flex-1 flex flex-col items-center justify-center py-4 gap-2 text-[11px] font-medium border-r border-gray-100 hover:bg-gray-50">
                    <FileText className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    Order Note
                  </button>
                  <button className="flex-1 flex flex-col items-center justify-center py-4 gap-2 text-[11px] font-medium border-r border-gray-100 hover:bg-gray-50">
                    <Tag className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    Discount Code
                  </button>
                  <button className="flex-1 flex flex-col items-center justify-center py-4 gap-2 text-[11px] font-medium hover:bg-gray-50">
                    <Truck className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    Shipping
                  </button>
                </div>

                {/* Subtotal */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[15px] font-medium">Subtotal</span>
                    <span className="text-[15px] font-medium">{total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                  </div>
                  <p className="text-[12px] text-gray-500 mb-5">Shipping & taxes calculated at checkout</p>
                  
                  <button className="w-full bg-[#222] text-white h-[50px] text-[14px] font-medium transition-colors hover:bg-black flex items-center justify-center">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

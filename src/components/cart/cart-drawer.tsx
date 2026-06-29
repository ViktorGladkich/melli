"use client";

import { useCartStore } from "@/store/cart-store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ChevronDown, FileText, Tag, Truck, Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatedText } from "@/components/ui/animated-text";

import { CartCrossSell } from "./cart-cross-sell";
import { CartShippingOverlay, CartDiscountOverlay, CartNoteOverlay } from "./cart-overlays";
const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const drawerVariants = {
  hidden: { x: "100%", transition: { duration: 0.4, ease: [0.36, 0, 0.66, -0.56] as const } },
  visible: { 
    x: "0%", 
    transition: { 
      duration: 0.5, 
      ease: [0.34, 1.56, 0.64, 1] as const, // bouncy ease out
    } 
  },
};

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();
  const [isGiftWrapping, setIsGiftWrapping] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [shippingCountry, setShippingCountry] = useState("Deutschland");
  const [shippingZip, setShippingZip] = useState("");
  const [showShippingRate, setShowShippingRate] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [isCrossSellOpen, setIsCrossSellOpen] = useState(false);

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
              <h2 className="text-[13px] font-medium tracking-widest uppercase">
                Dein Warenkorb ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 -m-2 text-gray-500 hover:text-black transition-colors cursor-pointer group"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1} />
              </button>
            </div>

            {/* Scrollable Content */}
            {items.length === 0 ? (
              <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 text-center">
                <ShoppingBag className="w-10 h-10 text-black mb-4" strokeWidth={1} />
                <h3 className="text-[14px] font-normal tracking-widest uppercase mb-6 text-black">
                  Dein Warenkorb ist leer
                </h3>
                <button 
                  onClick={closeCart} 
                  className="w-full max-w-[280px] bg-[#222] text-white h-[50px] text-[14px] font-medium transition-colors hover:bg-black mb-8 cursor-pointer group flex items-center justify-center"
                >
                  <AnimatedText text="Weiter einkaufen" />
                </button>
                <div className="w-full max-w-[200px] h-px bg-gray-200 mb-8"></div>
                <p className="text-[13px] text-black mb-1 font-medium">Hast du ein Konto?</p>
                <p className="text-[13px] text-black">
                  <Link href="/login" onClick={closeCart} className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Anmelden
                  </Link>
                  , um schneller zur Kasse zu gehen.
                </p>
              </div>
            ) : (
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
              
              {/* Free Shipping Bar */}
              <div className="px-6 py-5 shrink-0">
                <p className="text-[13px] font-medium mb-3">
                  {total < 80 
                    ? `Noch ${(80 - total).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € bis zum kostenlosen Versand!`
                    : "Du hast kostenlosen Versand freigeschaltet!"}
                </p>
                <div className="w-full h-1 bg-gray-200">
                  <div 
                    className="h-full bg-[#222] transition-all duration-500 ease-out" 
                    style={{ width: `${Math.min(100, (total / 80) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="px-6 flex-1">
                <ul className="flex flex-col gap-6 pb-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        {/* Image */}
                        <Link href={`/product/${item.handle || item.title.toLowerCase().replace(/\\s+/g, '-')}`} onClick={() => closeCart()} className="w-[100px] h-[130px] shrink-0 bg-gray-50 cursor-pointer block">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex flex-col flex-1 py-1">
                          <Link href={`/product/${item.handle || item.title.toLowerCase().replace(/\\s+/g, '-')}`} onClick={() => closeCart()} className="text-[14px] font-medium text-black hover:underline cursor-pointer block">
                            {item.title}
                          </Link>
                          <div className="text-[13px] text-gray-500 mt-1 space-y-0.5">
                            {item.variantTitle ? (
                              item.variantTitle.includes(' / ') ? (
                                <>
                                  <p>Farbe: {item.variantTitle.split(' / ')[0]}</p>
                                  <p>Größe: {item.variantTitle.split(' / ')[1]}</p>
                                </>
                              ) : (
                                <p>Variante: {item.variantTitle}</p>
                              )
                            ) : (
                              <>
                                <p>Farbe: Schwarz</p>
                                <p>Größe: 38</p>
                              </>
                            )}
                          </div>

                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Quantity Counter */}
                              <div className="flex items-center border border-gray-200 h-9">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" strokeWidth={1.5} />
                                </button>
                                <span className="w-8 text-center text-[13px]">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" strokeWidth={1.5} />
                                </button>
                              </div>
                              
                              {/* Delete Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-black transition-colors cursor-pointer"
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
              </div>

              {/* Cross Sell Section */}
              <CartCrossSell />
              
              {/* Footer Area inside scroll to stick to bottom naturally */}
              <div className="shrink-0 bg-white border-t border-gray-200">
                {/* Gift Wrapping */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 cursor-pointer" onClick={() => setIsGiftWrapping(!isGiftWrapping)}>
                  <div className={`w-5 h-5 border flex items-center justify-center rounded-sm transition-colors ${isGiftWrapping ? 'border-black bg-black' : 'border-gray-300'}`}>
                    {isGiftWrapping && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-[13px]">Geschenkverpackung</span>
                </div>

                {/* Features Row */}
                <div className="flex border-b border-gray-100">
                  <button 
                    onClick={() => setIsNoteOpen(true)}
                    className="flex-1 flex flex-col items-center justify-center py-4 gap-2 text-[11px] font-medium border-r border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <FileText className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    Bestellnotiz
                  </button>
                  <button 
                    onClick={() => setIsDiscountOpen(true)}
                    className="flex-1 flex flex-col items-center justify-center py-4 gap-2 text-[11px] font-medium border-r border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Tag className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    Rabattcode
                  </button>
                  <button 
                    onClick={() => setIsShippingOpen(true)}
                    className="flex-1 flex flex-col items-center justify-center py-4 gap-2 text-[11px] font-medium hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Truck className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    Versand
                  </button>
                </div>

                {/* Subtotal */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[15px] font-medium">Zwischensumme</span>
                    <div className="flex flex-col items-end">
                      {discountApplied && (
                        <span className="text-[13px] text-gray-500 line-through">{total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                      )}
                      <span className="text-[15px] font-medium">
                        {(discountApplied ? total * 0.9 : total).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
                      </span>
                    </div>
                  </div>
                  <p className="text-[12px] text-gray-500 mb-5">Versand & Steuern werden an der Kasse berechnet</p>
                  
                  <button className="w-full bg-[#222] text-white h-[50px] text-[14px] font-medium transition-colors hover:bg-black flex items-center justify-center group cursor-pointer">
                    <AnimatedText text="Zur Kasse" />
                  </button>
                </div>
              </div>
            </div>
            )}

            <AnimatePresence>
              <CartShippingOverlay 
                key="shipping-overlay"
                isOpen={isShippingOpen} 
                onClose={() => setIsShippingOpen(false)}
                country={shippingCountry}
                setCountry={setShippingCountry}
                zip={shippingZip}
                setZip={setShippingZip}
                showRate={showShippingRate}
                setShowRate={setShowShippingRate}
              />
              <CartDiscountOverlay 
                key="discount-overlay"
                isOpen={isDiscountOpen} 
                onClose={() => setIsDiscountOpen(false)}
                code={discountCode}
                setCode={setDiscountCode}
                error={discountError}
                setError={setDiscountError}
                applied={discountApplied}
                setApplied={setDiscountApplied}
              />
              <CartNoteOverlay 
                key="note-overlay"
                isOpen={isNoteOpen} 
                onClose={() => setIsNoteOpen(false)}
                note={orderNote}
                setNote={setOrderNote}
              />
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

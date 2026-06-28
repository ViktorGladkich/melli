"use client";

import { useCartStore } from "@/store/cart-store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

// Продвинутые ease функции для ощущения "дороговизны" как на awwwards
const easing = [0.32, 0.72, 0, 1] as const;

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.4, ease: easing } },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easing } },
};

const drawerVariants = {
  hidden: { x: "100%", transition: { duration: 0.6, ease: easing } },
  visible: { 
    x: "0%", 
    transition: { 
      duration: 0.6, 
      ease: easing,
      staggerChildren: 0.08, // Каскадное появление элементов
      delayChildren: 0.2
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
};

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore();

  const total = items.reduce((acc, item) => {
    const priceStr = item.price.replace(/\D/g, "");
    return acc + parseInt(priceStr || "0") * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Стеклянный Фон */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md"
          />

          {/* Сама Панель Корзины */}
          <motion.div
            variants={drawerVariants}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-60 w-full md:w-[480px] bg-white/70 backdrop-blur-3xl shadow-2xl border-l border-white/50 flex flex-col text-black"
          >
            {/* Шапка Корзины */}
            <div className="flex items-center justify-between p-6 md:p-8">
              <h2 className="text-2xl font-black tracking-tight uppercase">Warenkorb</h2>
              <button
                onClick={closeCart}
                className="p-2 -m-2 text-gray-400 transition-colors hover:text-black hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Контент */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8 scrollbar-hide">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-6 text-gray-400"
                >
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 stroke-1" />
                  </div>
                  <div>
                    <p className="text-xl font-medium text-gray-900 mb-2">Dein Warenkorb ist leer</p>
                    <p className="text-sm">Es sieht so aus, als hättest du noch nichts hinzugefügt.</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className="mt-4 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider hover:bg-black/80 transition-colors"
                  >
                    Weiter einkaufen
                  </button>
                </motion.div>
              ) : (
                <ul className="flex flex-col gap-8">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        layout // Магия Framer Motion для плавного схлопывания при удалении
                        variants={itemVariants}
                        key={item.id}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex gap-6 group"
                      >
                        {/* Изображение Товара с зумом при ховере */}
                        <div className="relative w-28 h-32 bg-gray-100 overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Информация */}
                        <div className="flex flex-col flex-1 py-1">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-bold text-gray-900 leading-tight uppercase tracking-tight text-sm">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-300 hover:text-black transition-colors"
                            >
                              <X className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-end justify-between">
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-3 text-gray-400 hover:text-black transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-3 text-gray-400 hover:text-black transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-lg">{item.price}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Подвал с кнопкой Чекаута (Стиль Awwwards) */}
            {items.length > 0 && (
              <motion.div 
                layout
                className="p-6 md:p-8 bg-white/40 backdrop-blur-md border-t border-white/60"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Zwischensumme</span>
                  <span className="text-3xl font-black">{total.toLocaleString('de-DE')} €</span>
                </div>
                
                {/* Анимированная кнопка Checkout (тоже стеклянная) */}
                <button className="w-full h-16 bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-black transition-colors duration-700 relative overflow-hidden group rounded-2xl shadow-xl">
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
                    Zur Kasse
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] translate-y-full group-hover:translate-y-0">
                    Zur Kasse
                  </span>
                </button>
                <p className="text-center text-xs text-gray-500 mt-4 font-medium">Steuern und Versandkosten werden beim Checkout berechnet</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

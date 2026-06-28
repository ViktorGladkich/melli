"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { motion } from "framer-motion";

export function CartButton() {
  const openCart = useCartStore((state) => state.openCart);
  
  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center p-2 opacity-70 transition-opacity hover:opacity-100 cursor-pointer"
    >
      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full"
        >
          {itemCount}
        </motion.div>
      )}
    </button>
  );
}

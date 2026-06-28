"use client";

import { useCartStore } from "@/store/cart-store";
import { motion } from "framer-motion";

export function CartButton() {
  const openCart = useCartStore((state) => state.openCart);
  
  const itemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <button
      onClick={openCart}
      className="p-1 relative hover:opacity-70 transition-opacity"
    >
      <svg className="w-[20px] h-[20px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.63 17.47l-.6-11a.51.51 0 00-.5-.47h-2v-.43a3.5 3.5 0 00-7 0V6h-2a.51.51 0 00-.5.47l-.62 11a.49.49 0 00.49.53h12.3a.49.49 0 00.43-.53zm-12.31-.42L4.9 7h10.2l.56 10.1-11.34-.05zM7.5 5.57a2.5 2.5 0 115 0V6h-5v-.43z" fill="currentColor"></path></svg>
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

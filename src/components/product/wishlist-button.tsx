"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/lib/mock-products";
import { cn } from "@/lib/utils";

export function WishlistButton({ product, className, iconClassName }: { product: Product, className?: string, iconClassName?: string }) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);
  
  const inWishlist = isMounted ? isInWishlist(product.id) : false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        "flex items-center justify-center w-[28px] h-[28px] rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:bg-white/60 hover:scale-110 active:scale-95 group cursor-pointer",
        className
      )}
      aria-label={inWishlist ? "Aus dem Wunschzettel entfernen" : "Zum Wunschzettel hinzufügen"}
    >
      <Heart
        strokeWidth={1.5}
        className={cn(
          "w-4 h-4 transition-all duration-300", 
          inWishlist 
            ? "fill-black text-black scale-110" 
            : "text-black group-hover:scale-110",
          iconClassName
        )}
      />
    </button>
  );
}

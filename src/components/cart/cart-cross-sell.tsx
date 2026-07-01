import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useQuickAddStore } from "@/store/quick-add-store";

const CROSS_SELL_PRODUCTS = [
  {
    id: 1,
    brand: "MILLY",
    name: "Classic Black Abaya",
    price: "89,95 €",
    image: "/products/abaya_black_front.jpg",
    handle: "abaya-black"
  },
  {
    id: 2,
    brand: "MILLY",
    name: "Premium Beige Abaya",
    price: "112,00 €",
    image: "/products/abaya_beige_front.jpg",
    handle: "abaya-beige"
  },
  {
    id: 3,
    brand: "MILLY",
    name: "Midnight Blue Abaya",
    price: "145,50 €",
    image: "/products/abaya_blue_front.jpg",
    handle: "abaya-blue"
  },
  {
    id: 4,
    brand: "MILLY",
    name: "Champagne Silk Hijab",
    price: "39,90 €",
    image: "/products/hijab_champagne_front.png",
    handle: "hijab-champagne"
  }
];

export function CartCrossSell() {
  const [isOpen, setIsOpen] = useState(false);
  const { closeCart } = useCartStore();
  const { openQuickAdd } = useQuickAddStore();

  const handleQuickAdd = (
    product: { id: number; handle: string; brand: string; name: string; price: string; image: string }, 
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickAdd({
      id: String(product.id),
      handle: product.handle,
      brand: product.brand,
      title: product.name,
      category: "Cross-sell",
      price: product.price,
      images: [{ url: product.image, altText: product.name }],
      variants: [],
      options: [],
    });
  };

  return (
    <div className="bg-[#f7f7f7] mt-auto shrink-0 border-t border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-[13px] font-medium cursor-pointer hover:bg-gray-200 transition-colors"
      >
        Das könnte dir auch gefallen
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 overflow-x-auto px-6 pb-6 pt-2 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {CROSS_SELL_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white flex items-center p-3 gap-4 min-w-[280px] snap-start shadow-sm border border-transparent hover:border-gray-200 transition-colors">
                  <Link href={`/product/${product.handle}`} onClick={() => { setIsOpen(false); closeCart(); }} className="w-[60px] h-[80px] bg-gray-100 shrink-0 cursor-pointer block">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{product.brand}</span>
                    <Link href={`/product/${product.handle}`} onClick={() => { setIsOpen(false); closeCart(); }} className="text-[12px] font-medium leading-tight mb-1 line-clamp-2 hover:underline cursor-pointer block">
                      {product.name}
                    </Link>
                    <span className="text-[13px] font-medium">{product.price}</span>
                  </div>
                  <button 
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 shrink-0 hover:bg-black hover:border-black transition-colors cursor-pointer text-gray-600 hover:text-white"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

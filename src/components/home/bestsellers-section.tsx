"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const mockProducts = [
  {
    id: "p1",
    title: "Minimalist Linen Shirt",
    price: "89,00 €",
    variant: "Sand / M",
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p2",
    title: "Classic Trench Coat",
    price: "249,00 €",
    variant: "Beige / L",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p3",
    title: "Wool Blend Sweater",
    price: "129,00 €",
    variant: "Charcoal / S",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p4",
    title: "Straight Fit Trousers",
    price: "119,00 €",
    variant: "Olive / 32",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p5",
    title: "Essential Cotton Tee",
    price: "45,00 €",
    variant: "White / M",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "p6",
    title: "Leather Crossbody Bag",
    price: "189,00 €",
    variant: "Black / One Size",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
  },
];

export function BestsellersSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      variant: product.variant,
      quantity: 1,
    });
    openCart();
  };

  return (
    <section className="py-24 md:py-32 bg-gray-50 overflow-hidden text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            Bestsellers
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-md">
            Entdecken Sie die beliebtesten Stücke der aktuellen Saison.
          </p>
        </div>
        <button className="self-start md:self-auto text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
          Alle ansehen
        </button>
      </div>

      <div className="pl-4 md:pl-8">
        <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
            className="flex gap-6 md:gap-8 pr-8"
            style={{ width: "max-content" }}
          >
            {mockProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
                className="w-[280px] md:w-[400px] shrink-0 group flex flex-col"
              >
                {/* Картинка */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-6 rounded-sm">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                  />
                  {/* Оверлей при ховере */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Кнопка добавления в корзину */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out px-6">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-white/90 backdrop-blur-md text-black py-4 px-6 flex items-center justify-center gap-2 rounded-full font-bold uppercase text-xs tracking-wider shadow-xl hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      In den Warenkorb
                    </button>
                  </div>
                </div>

                {/* Инфо */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold tracking-tight uppercase text-gray-900 leading-tight">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm font-medium mt-1">
                    <span className="text-gray-500">{product.variant}</span>
                    <span className="text-black font-bold">{product.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

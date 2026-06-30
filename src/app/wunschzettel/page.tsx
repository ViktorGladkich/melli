"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";
import { motion } from "framer-motion";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function WunschzettelPage() {
  const { items } = useWishlistStore();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <div className="pt-[120px] pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full flex-grow">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Zurück zum Shop
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-black">Wunschzettel</h1>
          <p className="mt-4 text-neutral-500 text-sm md:text-base uppercase tracking-widest font-medium">
            Ihre persönlichen Favoriten
          </p>
        </motion.div>
        
        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-10 md:py-16 px-6 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-8 border border-neutral-100">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-neutral-400" strokeWidth={1.2} />
            </div>
            <h2 className="text-xl md:text-2xl font-light mb-4 text-black uppercase tracking-widest">
              Noch keine Favoriten
            </h2>
            <p className="text-neutral-500 mb-10 max-w-md mx-auto leading-relaxed text-sm md:text-base">
              Speichern Sie Ihre Lieblingsartikel, um sie später schnell wiederzufinden. Klicken Sie dazu einfach auf das Herz-Symbol bei einem Produkt.
            </p>
            <Link href="/" className="inline-flex items-center justify-center bg-black text-white px-10 py-4 text-sm font-medium transition-all hover:bg-neutral-900 group uppercase tracking-widest min-w-[200px]">
              <AnimatedText text="Jetzt entdecken" />
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16"
          >
            {items.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx} 
                total={items.length} 
                isGrid={true}
              />
            ))}
          </motion.div>
        )}
      </div>
      <NewsletterSection />
    </div>
  );
}

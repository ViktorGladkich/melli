"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FeaturesBannerSection } from "@/components/home/features-banner-section";

export default function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = use(params);
  const handle = resolvedParams.handle.toLowerCase();

  let products = [];
  let title = "";

  if (handle === "sale") {
    title = "Sale";
    // Mocking some sale items
    products = MOCK_PRODUCTS.slice(0, 8);
  } else if (handle === "abayas") {
    title = "Abayas";
    products = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === "abayas");
  } else if (handle === "hijabs") {
    title = "Hijabs";
    products = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === "hijabs");
  } else if (handle === "tunics" || handle === "tuniken") {
    title = "Tuniken";
    products = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === "tuniken" || p.category.toLowerCase() === "tunics");
  } else {
    title = "Kollektion";
    products = MOCK_PRODUCTS;
  }

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-0 font-sans text-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-24">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] md:text-[12px] text-gray-500 uppercase tracking-widest mb-8 md:mb-12">
          <Link href="/" className="hover:text-black transition-colors">
            Startseite
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{title}</span>
        </nav>

        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            {title}
          </h1>
          <p className="text-[14px] text-gray-500 max-w-xl">
            Entdecke unsere exklusive Auswahl an {title}. Jedes Stück wurde mit Sorgfalt entworfen, um dir den perfekten Mix aus Komfort und Stil zu bieten.
          </p>
          <div className="mt-4 text-[12px] text-gray-400 uppercase tracking-widest">
            {products.length} Produkte
          </div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {products.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx} 
                total={products.length} 
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            Keine Produkte in dieser Kollektion gefunden.
          </div>
        )}
      </div>

      <FeaturesBannerSection />
      <NewsletterSection />
    </div>
  );
}

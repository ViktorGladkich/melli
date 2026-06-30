import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductByHandle, getProducts } from "@/lib/shopify";

import { FeaturesBannerSection } from "@/components/home/features-banner-section";
import { ShoppableVideoSection } from "@/components/home/shoppable-video-section";
import { BestsellersSection } from "@/components/home/bestsellers-section";
import { FeaturedVideoSection } from "@/components/home/featured-video-section";
import { CuratedSliderSection } from "@/components/home/curated-slider-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";

export const revalidate = 0; // Disable cache for development

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-light tracking-widest uppercase mb-4">
          Produkt nicht gefunden
        </h1>
        <Link
          href="/"
          className="text-[13px] underline hover:no-underline uppercase tracking-widest"
        >
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  const allProducts = await getProducts(10);
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 8);

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-24 font-sans text-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] md:text-[12px] text-gray-500 uppercase tracking-widest mb-8 md:mb-12">
          <Link href="/" className="hover:text-black transition-colors">
            Startseite
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-black transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{product.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>

      <FeaturesBannerSection />
      <ShoppableVideoSection variant="text" />

      {relatedProducts.length > 0 && (
        <BestsellersSection
          title="Das könnte dir auch gefallen"
          showTabs={false}
          products={relatedProducts}
        />
      )}
      
      <FeaturedVideoSection />
      <CuratedSliderSection />
      <NewsletterSection />
    </div>
  );
}

import { HeroSection } from "@/components/home/hero-section";
import { BestsellersSection } from "@/components/home/bestsellers-section";
import { CollectionsGridSection } from "@/components/home/collections-grid-section";
import { CuratedSliderSection } from "@/components/home/curated-slider-section";
import { ShoppableVideoSection } from "@/components/home/shoppable-video-section";
import { PromoSliderSection } from "@/components/home/promo-slider-section";
import { ParallaxSaleSection } from "@/components/home/parallax-sale-section";
import { FeaturedVideoSection } from "@/components/home/featured-video-section";
import { RichTextSection } from "@/components/home/rich-text-section";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getProducts();

  return (
    <main id="root" role="main" tabIndex={-1}>
      <HeroSection />
      <BestsellersSection products={products} />
      <CollectionsGridSection />
      <CuratedSliderSection />
      <ShoppableVideoSection />
      <RichTextSection />
      <PromoSliderSection />
      <ParallaxSaleSection />
      <FeaturedVideoSection />
    </main>
  );
}

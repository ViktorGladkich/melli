import { HeroSection } from "@/components/home/hero-section";
import { BestsellersSection } from "@/components/home/bestsellers-section";
import { CollectionsGridSection } from "@/components/home/collections-grid-section";
import { CuratedSliderSection } from "@/components/home/curated-slider-section";
import { ShoppableVideoSection } from "@/components/home/shoppable-video-section";
import { PromoSliderSection } from "@/components/home/promo-slider-section";
import { ParallaxSaleSection } from "@/components/home/parallax-sale-section";
import { FeaturedVideoSection } from "@/components/home/featured-video-section";
import { RichTextSection } from "@/components/home/rich-text-section";
import { VideoReelsSection } from "@/components/home/video-reels-section";
import { BlogPostsSection } from "@/components/home/blog-posts-section";
import { MarqueeImagesSection } from "@/components/home/marquee-images-section";
import { FeaturesBannerSection } from "@/components/home/features-banner-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
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
      <VideoReelsSection />
      <BlogPostsSection />
      <MarqueeImagesSection />
      <FeaturesBannerSection />
      <NewsletterSection />
    </main>
  );
}

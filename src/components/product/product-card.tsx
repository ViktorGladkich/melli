import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock-products";

const getColorStyle = (color: string) => {
  const c = color.toLowerCase();
  if (c === "multicolor" || c === "mehrfarbig") return { backgroundImage: "url(/multicolor.png)", backgroundColor: "#ccc" };
  if (c === "blue" || c === "blau") return { backgroundColor: "#6091B8" };
  if (c === "green" || c === "grün") return { backgroundColor: "#588157" };
  if (c === "beige") return { backgroundColor: "#f3d9c6" };
  if (c === "olive") return { backgroundColor: "#6a7b76" };
  if (c === "black" || c === "schwarz") return { backgroundColor: "black" };
  if (c === "white" || c === "weiß") return { backgroundColor: "white" };
  if (c === "red" || c === "rot") return { backgroundColor: "red" };
  if (c === "pink") return { backgroundColor: "pink" };
  return { backgroundColor: "#ccc" }; // fallback
};

export function ProductImage({ imageUrl, hoverImageUrl, alt }: { imageUrl: string, hoverImageUrl: string, alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, [imageUrl]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        className={cn(
          "card__img absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          hoverImageUrl === imageUrl ? "group-hover:scale-105 transition-transform" : ""
        )}
        onLoad={() => setIsLoading(false)}
      />
      {hoverImageUrl && hoverImageUrl !== imageUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hoverImageUrl}
            alt={alt}
            className="card__img--hover absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          />
        </>
      )}
    </>
  );
}

export function ProductCard({ product, index, total }: { product: Product, index: number, total: number }) {
  const imageUrl = product.images?.[0]?.url || "";
  const hoverImageUrl = product.images?.[1]?.url || imageUrl; 

  const colorOption = product.options?.find(
    (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "farbe" || opt.name.toLowerCase() === "couleur"
  );
  const colors = colorOption ? colorOption.values : [];

  // Parse price number
  const priceValue = parseFloat(product.price.replace(/[^\d.-]/g, ''));

  return (
    <div
      data-swiper-slide=""
      role="group"
      className="swiper-slide wt-slider__slide swiper-slide-visible w-[280px] md:w-[298px] shrink-0 group flex flex-col snap-start mr-2"
      aria-label={`${index + 1} / ${total}`}
    >
      {/* Картинка */}
      <a href={`/product/${product.handle}`} className="relative block aspect-2/3 overflow-hidden bg-gray-100 mb-4">
        {imageUrl ? (
          <ProductImage imageUrl={imageUrl} hoverImageUrl={hoverImageUrl} alt={product.title} />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
        )}
        
        {/* Badges */}
        {index === 0 && (
          <div className="card__badges absolute top-3 left-3 bg-white/90 text-black text-[10px] px-2 py-1 uppercase tracking-widest font-medium">
            Sale
          </div>
        )}
        {index === 2 && (
          <div className="card__badges absolute top-3 left-3 bg-white/90 text-black text-[10px] px-2 py-1 uppercase tracking-widest font-medium">
            Neu
          </div>
        )}
      </a>

      {/* Инфо */}
      <div className="flex flex-col text-center px-2">
        <a href={`/product/${product.handle}`} className="vendor-link text-[11px] text-gray-500 uppercase tracking-widest mb-1 hover:underline">
          {product.brand || "MILLY"}
        </a>
        
        <h3 className="text-sm font-normal text-black mb-2 line-clamp-1">
          <a href={`/product/${product.handle}`} className="hover:underline underline-offset-4">
            {product.title}
          </a>
        </h3>
        
        <div className={cn("text-sm font-normal price", index === 0 && "price--on-sale")}>
          <span className={cn("mr-2", index === 0 ? "text-red-600 price__sale" : "text-black")}>€{priceValue.toFixed(2)}</span>
          {index === 0 && <s className="price__regular text-gray-400">€{(priceValue + 70).toFixed(2)}</s>}
        </div>

        {/* Swatches */}
        {colors.length > 0 && (
          <div className="card__color-swatcher--container center mt-4 min-h-[24px] md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" tabIndex={-1} data-options-as-color-swatches="Color">
            <div className="color-swatcher--wrapper rounded flex justify-center gap-2">
              {colors.map((color, i) => (
                <div 
                  key={i}
                  className="color-swatcher w-[16px] h-[16px] rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform" 
                  data-color={color}
                  style={getColorStyle(color)}
                  title={color} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

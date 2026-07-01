"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal, Grid2X2, Square } from "lucide-react";
import { Product } from "@/lib/shopify";
import { ProductCard } from "@/components/product/product-card";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FeaturesBannerSection } from "@/components/home/features-banner-section";
import { FilterDrawer, FilterState } from "@/components/collections/filter-drawer";
import { cn } from "@/lib/utils";

type SortOption = "alpha-asc" | "alpha-desc" | "price-asc" | "price-desc";

interface CollectionClientProps {
  initialProducts: Product[];
  title: string;
}

export function CollectionClient({ initialProducts, title }: CollectionClientProps) {
  // --- 2. Filter State & Drawer ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    inStock: false,
    outOfStock: false,
    colors: [],
    sizes: []
  });
  
  // Temporary state for the drawer (so changes only apply when "Apply" is clicked)
  const [tempFilterState, setTempFilterState] = useState<FilterState>(filterState);

  const openFilter = () => {
    setTempFilterState(filterState);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setFilterState(tempFilterState);
  };

  const clearFilters = () => {
    const emptyState = { inStock: false, outOfStock: false, colors: [], sizes: [] };
    setTempFilterState(emptyState);
    setFilterState(emptyState);
    setIsFilterOpen(false);
  };

  // --- 3. Compute Available Options ---
  const availableColors = useMemo(() => {
    const colorCounts: Record<string, number> = {};
    initialProducts.forEach(p => {
      const colorOpt = p.options.find(o => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "farbe");
      if (colorOpt) {
        colorOpt.values.forEach(c => {
          colorCounts[c] = (colorCounts[c] || 0) + 1;
        });
      }
    });
    return Object.entries(colorCounts).map(([name, count]) => ({ name, count }));
  }, [initialProducts]);

  const availableSizes = useMemo(() => {
    const sizeCounts: Record<string, number> = {};
    initialProducts.forEach(p => {
      const sizeOpt = p.options.find(o => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "größe");
      if (sizeOpt) {
        sizeOpt.values.forEach(s => {
          sizeCounts[s] = (sizeCounts[s] || 0) + 1;
        });
      }
    });
    return Object.entries(sizeCounts).map(([name, count]) => ({ name, count }));
  }, [initialProducts]);

  // --- 4. Filtering Logic ---
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // Colors
      if (filterState.colors.length > 0) {
        const pColors = p.options.find(o => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "farbe")?.values || [];
        if (!pColors.some(c => filterState.colors.includes(c))) return false;
      }
      // Sizes
      if (filterState.sizes.length > 0) {
        const pSizes = p.options.find(o => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "größe")?.values || [];
        if (!pSizes.some(s => filterState.sizes.includes(s))) return false;
      }
      return true;
    });
  }, [initialProducts, filterState]);

  // --- 5. Sorting Logic ---
  const [sortOption, setSortOption] = useState<SortOption>("alpha-asc");

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === "alpha-asc") return a.title.localeCompare(b.title, "de");
      if (sortOption === "alpha-desc") return b.title.localeCompare(a.title, "de");
      
      const priceA = parseFloat(a.price.replace(/[^0-9,.-]/g, "").replace(",", "."));
      const priceB = parseFloat(b.price.replace(/[^0-9,.-]/g, "").replace(",", "."));
      
      if (sortOption === "price-asc") return priceA - priceB;
      if (sortOption === "price-desc") return priceB - priceA;
      return 0;
    });
  }, [filteredProducts, sortOption]);

  // --- 6. Grid Layout (Mobile) ---
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2);

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-0 font-sans text-black">
      <FilterDrawer 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterState={tempFilterState}
        setFilterState={setTempFilterState}
        availableColors={availableColors}
        availableSizes={availableSizes}
        inStockCount={initialProducts.length}
        outOfStockCount={0}
        onApply={applyFilters}
        onClear={clearFilters}
      />

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
        <div className="mb-8 md:mb-12 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            {title}
          </h1>
          <p className="text-[14px] text-gray-500 max-w-xl">
            Finde das perfekte Kleidungsstück für jeden Anlass – entdecke unsere exklusive Auswahl für deinen individuellen Stil.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-b border-gray-100 py-3 md:py-4 mb-8">
          
          {/* Mobile Product Count (Top row on mobile) */}
          <div className="md:hidden text-[13px] text-gray-600 text-center pb-3 border-b border-gray-100 mb-3">
            {sortedProducts.length} Produkte
          </div>

          {/* Desktop Product Count */}
          <div className="hidden md:block text-[13px] text-gray-600 font-medium">
            {sortedProducts.length} Produkte
          </div>

          {/* Actions: Filter, Sort, Grid */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 md:gap-8">
            
            <button 
              onClick={openFilter}
              className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>

            <div className="hidden md:block w-px h-4 bg-gray-200" />

            <div className="flex items-center gap-2 text-[13px] text-gray-500">
              <span className="hidden md:inline">Sortieren nach:</span>
              <span className="md:hidden">So...</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-transparent text-black outline-none cursor-pointer truncate max-w-[100px] md:max-w-none"
              >
                <option value="alpha-asc">Alphabetisch, A-Z</option>
                <option value="alpha-desc">Alphabetisch, Z-A</option>
                <option value="price-asc">Preis, aufsteigend</option>
                <option value="price-desc">Preis, absteigend</option>
              </select>
            </div>

            {/* Mobile Grid Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => setMobileGridCols(2)}
                className={cn("p-1 transition-opacity", mobileGridCols === 2 ? "opacity-100" : "opacity-30")}
              >
                <Grid2X2 className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setMobileGridCols(1)}
                className={cn("p-1 transition-opacity", mobileGridCols === 1 ? "opacity-100" : "opacity-30")}
              >
                <Square className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

          </div>
        </div>

        {/* Grid */}
        {sortedProducts.length > 0 ? (
          <div className={cn(
            "grid gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12",
            mobileGridCols === 1 ? "grid-cols-1" : "grid-cols-2",
            "md:grid-cols-3 lg:grid-cols-4"
          )}>
            {sortedProducts.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx} 
                total={sortedProducts.length} 
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

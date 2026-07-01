"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { CartButton } from "@/components/cart/cart-button";
import { AnimatedText } from "@/components/ui/animated-text";
import { LocalizationDrawer } from "./localization-drawer";
import { AnnouncementBar } from "./announcement-bar";
import { SearchDrawer } from "./search-drawer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Country } from "@/lib/shopify";
import { useCartStore } from "@/store/cart-store";

export function Navbar({ countries = [] }: { countries?: Country[] }) {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("DE");

  const isSolidMode = isScrolled || pathname !== "/";

  useEffect(() => {
    const saved = localStorage.getItem("user_country");
    if (saved) {
      setTimeout(() => setSelectedCountryCode(saved), 0);
    }
    useCartStore.getState().initCart();
  }, []);

  const handleCountryChange = (isoCode: string) => {
    setSelectedCountryCode(isoCode);
    localStorage.setItem("user_country", isoCode);
    setIsLocOpen(false); // Close drawer on selection
  };

  const selectedCountry = countries?.find(c => c.isoCode === selectedCountryCode) || countries?.[0] || null;

  useMotionValueEvent(scrollY, "change", (latest) => {
    // previous scroll value was unused
    // Эффект стекла при скролле вниз (согласно HTML: --header-bg-opacity: 0.65; blur 35px)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Прячем шапку, когда доходим до самого низа страницы (футера)
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const isAtBottom = window.innerHeight + latest >= document.body.offsetHeight - 100;
      setIsHidden(isAtBottom);
    } else {
      setIsHidden(false);
    }
  });

  // Logo animation is now handled via animate props based on isScrolled
  return (
    <>
      <LocalizationDrawer 
        isOpen={isLocOpen} 
        onClose={() => setIsLocOpen(false)} 
        countries={countries} 
        selectedCountry={selectedCountry}
        onSelectCountry={handleCountryChange}
      />
      <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        isSolidMode 
          ? "bg-white/65 backdrop-blur-[35px] border-b border-gray-100 shadow-sm text-black py-0" 
          : "bg-transparent text-white py-0"
      )}
    >
      <div className={cn("transition-all duration-500 overflow-hidden", isSolidMode ? "h-0 opacity-0" : "h-8 opacity-100")}>
        <AnnouncementBar />
      </div>
      <div className="w-full px-4 md:px-8 py-2">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Left: Burger & Links */}
          <div className="flex items-center gap-4 flex-1 justify-start">
            <MobileMenu />
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 md:hidden hover:opacity-70 transition-opacity cursor-pointer"
            >
              <svg className="w-[20px] h-[20px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.17 16.48L12 11.36a5.5 5.5 0 10-4.22 2 5.41 5.41 0 003.51-1.27l5.14 5.13a.51.51 0 00.7 0 .5.5 0 00.04-.74zm-9.35-4.15a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" fill="currentColor"></path></svg>
            </button>
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>

          {/* Center: Logo (Animated into Hero) */}
          <div className="flex flex-1 justify-center pointer-events-none">
            {/* Mobile Logo */}
            <motion.div
              animate={{ 
                scale: isSolidMode ? 1 : 2.2,
                y: isSolidMode ? 0 : 40
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="origin-top pointer-events-auto md:hidden"
            >
              <Link href="/" className="block">
                <img 
                  src="/logo.png" 
                  alt="MILLY" 
                  className={cn(
                    "h-6 w-auto transition-all duration-500",
                    isSolidMode ? "invert" : ""
                  )}
                />
              </Link>
            </motion.div>
            {/* Desktop Logo */}
            <motion.div
              animate={{ 
                scale: isSolidMode ? 1 : 3,
                y: isSolidMode ? 0 : 40
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="origin-top pointer-events-auto hidden md:block"
            >
              <Link href="/" className="block">
                <img 
                  src="/logo.png" 
                  alt="MILLY" 
                  className={cn(
                    "h-10 w-auto transition-all duration-500",
                    isSolidMode ? "invert" : ""
                  )}
                />
              </Link>
            </motion.div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
            <button 
              onClick={() => setIsLocOpen(true)}
              className="hidden lg:flex items-center text-sm hover:opacity-70 transition-opacity uppercase cursor-pointer group"
            >
              <AnimatedText text={selectedCountry ? selectedCountry.currency.isoCode : "EUR"} />
              <svg className="w-4 h-4 ml-1.5" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><g transform="rotate(-90 -0.00000157361 72)"><g><rect x="0" y="72" fill="none" height="72" width="72"></rect><path d="m48.688,81.162l0.876,0.876a1.487,1.487 0 0 1 0,2.1l-24.222,24.225l24.223,24.223a1.487,1.487 0 0 1 0,2.1l-0.876,0.876a1.487,1.487 0 0 1 -2.1,0l-26.154,-26.148a1.487,1.487 0 0 1 0,-2.1l26.151,-26.153a1.487,1.487 0 0 1 2.1,0l0.002,0.001z" fill="currentColor"></path></g></g></svg>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hidden md:block hover:opacity-70 transition-opacity cursor-pointer"
            >
              <svg className="w-[20px] h-[20px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.17 16.48L12 11.36a5.5 5.5 0 10-4.22 2 5.41 5.41 0 003.51-1.27l5.14 5.13a.51.51 0 00.7 0 .5.5 0 00.04-.74zm-9.35-4.15a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" fill="currentColor"></path></svg>
            </button>
            <a href="https://shopify.com/100255105398/account" className="p-1 hover:opacity-70 transition-opacity cursor-pointer">
              <svg className="w-[20px] h-[20px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0-7a3 3 0 110 6 3 3 0 010-6zM10 11c-5 0-7 2-7 7h14c0-5-2-7-7-7zm0 1c4.08 0 5.73 1.33 6 5H4c.27-3.67 1.92-5 6-5z" fill="currentColor"></path></svg>
            </a>
            <div className="cursor-pointer">
              <CartButton />
            </div>
          </div>

        </div>
      </div>
    </motion.header>
    <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

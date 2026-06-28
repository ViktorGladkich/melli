"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { CartButton } from "@/components/cart/cart-button";
import { LocalizationDrawer } from "./localization-drawer";
import { Search, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Эффект стекла при скролле вниз (согласно HTML: --header-bg-opacity: 0.65; blur 35px)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Прячем шапку при скролле вниз, показываем при скролле вверх
    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const logoScale = useTransform(scrollY, [0, 150], [4, 1]);
  const logoY = useTransform(scrollY, [0, 150], [60, 0]);

  return (
    <>
      <LocalizationDrawer isOpen={isLocOpen} onClose={() => setIsLocOpen(false)} />
      <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        isScrolled 
          ? "bg-white/65 backdrop-blur-[35px] border-b border-gray-100 shadow-sm text-black py-0" 
          : "bg-transparent text-white py-2"
      )}
    >
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Burger & Links */}
          <div className="flex items-center gap-6 flex-1 justify-start">
            <MobileMenu />
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>

          {/* Center: Logo (Animated into Hero) */}
          <div className="flex flex-1 justify-center pointer-events-none">
            <motion.div
              style={{ scale: logoScale, y: logoY }}
              className="origin-top pointer-events-auto"
            >
              <Link href="/" className="text-3xl font-light tracking-[0.2em] uppercase">
                MELLI.
              </Link>
            </motion.div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-5 md:gap-6 flex-1">
            <button 
              onClick={() => setIsLocOpen(true)}
              className="hidden lg:flex items-center gap-1 text-sm font-semibold hover:opacity-70 transition-opacity"
            >
              EUR <ChevronDown className="w-4 h-4" />
            </button>
            <button className="p-1 hidden md:block hover:opacity-70 transition-opacity cursor-pointer">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button className="p-1 hidden sm:block hover:opacity-70 transition-opacity cursor-pointer">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <CartButton />
          </div>

        </div>
      </div>
    </motion.header>
    </>
  );
}

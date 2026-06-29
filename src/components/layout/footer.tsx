"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "@/components/ui/animated-text";

export function Footer() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.target.getBoundingClientRect().height);
      }
    });

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: footerHeight > 0 ? `${footerHeight}px` : 'auto' }} className="w-full bg-transparent" />
      <footer ref={footerRef} className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pt-16 md:pt-20 overflow-hidden z-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-14">
          
          {/* Column 1: Products */}
          <div>
            <h3 className="font-medium text-[13px] tracking-[0.15em] uppercase mb-7 text-black">Produkte</h3>
            <ul className="space-y-3.5 text-[14px] text-gray-600">
              <li><Link href="/collections/abayas" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Abayas" /></Link></li>
              <li><Link href="/collections/kleider" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Kleider" /></Link></li>
              <li><Link href="/collections/zweiteiler" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Zweiteiler" /></Link></li>
              <li><Link href="/collections/hosen" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Hosen" /></Link></li>
              <li><Link href="/collections/pullover" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Pullover" /></Link></li>
            </ul>
          </div>

          {/* Column 2: Service */}
          <div>
            <h3 className="font-medium text-[13px] tracking-[0.15em] uppercase mb-7 text-black">Kundenservice</h3>
            <ul className="space-y-3.5 text-[14px] text-gray-600">
              <li><Link href="/pages/faq" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="FAQ" /></Link></li>
              <li><Link href="/pages/kontakt" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Kontakt" /></Link></li>
              <li><Link href="/pages/versand" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Versand & Lieferung" /></Link></li>
              <li><Link href="/pages/retouren" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Retouren" /></Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="font-medium text-[13px] tracking-[0.15em] uppercase mb-7 text-black">Informationen</h3>
            <ul className="space-y-3.5 text-[14px] text-gray-600">
              <li><Link href="/uber-uns" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Über uns" /></Link></li>
              <li><Link href="/pages/widerrufsbelehrung" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Widerrufsbelehrung" /></Link></li>
              <li><Link href="/pages/agb" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="AGB" /></Link></li>
              <li><Link href="/pages/impressum" className="group inline-block relative hover:text-black transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"><AnimatedText text="Impressum" /></Link></li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="font-medium text-[13px] tracking-[0.15em] uppercase mb-7 text-black">Über Melli</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Entdecke die Welt von Melli Fashion. Besuche unsere <Link href="/uber-uns" className="text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all duration-500">Über uns Seite</Link>, um mehr über unsere Geschichte und unsere liebevoll ausgewählten Produkte zu erfahren.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-6 border-t border-gray-200 gap-6">
          {/* Left: Language + Social */}
          <div className="flex items-center gap-8">
            {/* Language Selector */}
            <button className="flex items-center gap-1.5 text-sm text-black hover:opacity-70 transition-opacity cursor-pointer">
              <span className="tracking-wide">DE</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              {/* Facebook */}
              <Link href="#" className="text-black hover:opacity-60 transition-opacity" aria-label="Facebook">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/>
                </svg>
              </Link>
              {/* X / Twitter */}
              <Link href="#" className="text-black hover:opacity-60 transition-opacity" aria-label="X">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="https://www.instagram.com/mellifashion" className="text-black hover:opacity-60 transition-opacity" aria-label="Instagram">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              {/* Pinterest */}
              <Link href="#" className="text-black hover:opacity-60 transition-opacity" aria-label="Pinterest">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </Link>
              {/* TikTok */}
              <Link href="#" className="text-black hover:opacity-60 transition-opacity" aria-label="TikTok">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Payment Icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end">
            {/* Visa */}
            <div className="w-[42px] h-[26px] bg-white border border-gray-200 rounded flex items-center justify-center">
              <svg className="w-8 h-5" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#1532CB"/><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#1532CB"/><path d="M29.59 10.22h-.32c-.42 1.05-.74 1.58-1.05 3.16h2l-.31-1.58c0-.74 0-1.48-.32-1.58zm3.06 6.22h-1.79l-.11-.11-.21-.95-.11-.21h-2.53l-.11.21-.32.95c0 .11-.11.11-.11.11h-2.22l.21-.53 3.06-7.18c0-.53.32-.74.85-.74h1.58l.11.21 1.48 6.86c.1.42.21.74.21 1.16 0 .11 0 .11 0 .21zM18.51 16.13l.42-1.9c.11 0 .21.11.21.11.74.32 1.48.53 2.22.42.21 0 .53-.11.74-.21.53-.21.53-.74.11-1.16-.21-.21-.53-.32-.85-.53-.42-.21-.85-.42-1.16-.74-1.27-1.05-.84-2.58-.11-3.32.63-.42.95-.84 1.79-.84 1.27 0 2.64 0 3.27.21h.11c-.11.63-.21 1.16-.42 1.79-.53-.21-1.05-.42-1.58-.42-.32 0-.63 0-.95.11-.21 0-.32.11-.42.21-.21.21-.21.53 0 .74l.53.42c.42.21.85.42 1.16.63.53.32 1.05.84 1.16 1.52.21.95-.11 1.79-.95 2.42-.53.42-.74.63-1.48.63-1.48 0-2.64.11-3.58-.21 0 .21 0 .21-.11.11zM14.82 16.44l.11-.74.11-.32c.53-2.32 1.05-4.74 1.48-7.07.1-.21.1-.32.32-.32h1.9c-.21 1.27-.42 2.22-.74 3.38-.32 1.58-.63 3.16-1.05 4.74 0 .21-.11.21-.32.21l-1.79.11zM5 8.21l.11-.21.21-.21h3.58c.53 0 .95.32 1.06.84l.95 4.64.11.21.11.11L14.34 8.21l-.11-.21h2.32v.21L13.49 15.92c-.11.21-.11.32-.21.42-.11.11-.32 0-.53 0H11.16l-.21-.21-1.69-6.55c-.21-.21-.53-.53-.95-.63-.63-.32-1.79-.53-2-.53L5 8.21z" fill="white"/></svg>
            </div>
            {/* Mastercard */}
            <div className="w-[42px] h-[26px] bg-white border border-gray-200 rounded flex items-center justify-center">
              <svg className="w-8 h-5" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.5a7 7 0 00-2.5 5.5 7 7 0 002.5 5.5 7 7 0 002.5-5.5A7 7 0 0019 6.5z" fill="#FF5F00"/></svg>
            </div>
            {/* Amex */}
            <div className="w-[42px] h-[26px] bg-[#016FD0] border border-gray-200 rounded flex items-center justify-center">
              <span className="text-white text-[7px] font-bold tracking-tight leading-none">AMEX</span>
            </div>
            {/* PayPal */}
            <div className="w-[42px] h-[26px] bg-white border border-gray-200 rounded flex items-center justify-center">
              <svg className="w-8 h-5" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"/><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"/><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"/></svg>
            </div>
            {/* Diners Club */}
            <div className="w-[42px] h-[26px] bg-white border border-gray-200 rounded flex items-center justify-center">
              <svg className="w-6 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0079BE"/>
                <path d="M12 3.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5-3.81-8.5-8.5-8.5z" fill="white"/>
                <path d="M9.5 6.5v11a5.5 5.5 0 000-11zM14.5 6.5v11a5.5 5.5 0 000-11z" fill="#0079BE"/>
              </svg>
            </div>
            {/* Discover */}
            <div className="w-[42px] h-[26px] bg-white border border-gray-200 rounded flex items-center justify-center">
              <span className="text-[#FF6000] text-[6px] font-bold tracking-tight leading-none">DISCOVER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Brand Name */}
      <div className="w-full flex justify-center items-end overflow-hidden pt-6 pb-4 bg-white">
        <img 
          src="/logo1_cropped.png" 
          alt="MELLI" 
          className="w-[80vw] md:w-[70vw] h-auto invert select-none pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </footer>
    </>
  );
}

"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#fcfcfc] border-t border-gray-100 pt-16 md:pt-24 overflow-hidden mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-16">
          
          {/* Column 1: Products */}
          <div>
            <h3 className="font-medium text-[13px] md:text-sm tracking-widest uppercase mb-6 text-black">Produkte</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/collections/abayas" className="hover:text-black hover:underline transition-colors">Abayas</Link></li>
              <li><Link href="/collections/kleider" className="hover:text-black hover:underline transition-colors">Kleider</Link></li>
              <li><Link href="/collections/zweiteiler" className="hover:text-black hover:underline transition-colors">Zweiteiler</Link></li>
              <li><Link href="/collections/hosen" className="hover:text-black hover:underline transition-colors">Hosen</Link></li>
              <li><Link href="/collections/pullover" className="hover:text-black hover:underline transition-colors">Pullover</Link></li>
            </ul>
          </div>

          {/* Column 2: Service */}
          <div>
            <h3 className="font-medium text-[13px] md:text-sm tracking-widest uppercase mb-6 text-black">Kundenservice</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/pages/faq" className="hover:text-black hover:underline transition-colors">FAQ</Link></li>
              <li><Link href="/pages/kontakt" className="hover:text-black hover:underline transition-colors">Kontakt</Link></li>
              <li><Link href="/pages/versand" className="hover:text-black hover:underline transition-colors">Versand & Lieferung</Link></li>
              <li><Link href="/pages/retouren" className="hover:text-black hover:underline transition-colors">Retouren</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="font-medium text-[13px] md:text-sm tracking-widest uppercase mb-6 text-black">Informationen</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/uber-uns" className="hover:text-black hover:underline transition-colors">Über uns</Link></li>
              <li><Link href="/pages/widerrufsbelehrung" className="hover:text-black hover:underline transition-colors">Widerrufsbelehrung</Link></li>
              <li><Link href="/pages/agb" className="hover:text-black hover:underline transition-colors">AGB</Link></li>
              <li><Link href="/pages/impressum" className="hover:text-black hover:underline transition-colors">Impressum</Link></li>
            </ul>
          </div>

          {/* Column 4: About text */}
          <div>
            <h3 className="font-medium text-[13px] md:text-sm tracking-widest uppercase mb-6 text-black">Über Melli</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Entdecke die Welt von Melli Fashion. Besuche unsere <Link href="/uber-uns" className="text-black underline">Über uns Seite</Link>, um mehr über unsere Geschichte und unsere liebevoll ausgewählten Produkte zu erfahren.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Language, Social, Payments */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-8 border-t border-gray-200 gap-8 lg:gap-6">
          <div className="flex items-center gap-2 text-sm text-black cursor-pointer hover:opacity-70 transition-opacity">
            <span className="tracking-widest">DE</span>
            <ArrowDown className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-black hover:opacity-70 transition-opacity">
              {/* Facebook */}
              <svg className="w-5 h-5" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-black hover:opacity-70 transition-opacity">
              {/* Instagram */}
              <svg className="w-5 h-5" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-black hover:opacity-70 transition-opacity">
              {/* Twitter / X */}
              <svg className="w-5 h-5" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </Link>
            <Link href="#" className="text-black hover:opacity-70 transition-opacity">
              {/* TikTok */}
              <svg className="w-5 h-5" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M480.32 128.39c-29.22 0-56.18-9.68-77.83-26.01-24.83-18.72-42.67-46.18-48.97-77.83-1.56-7.82-2.4-15.89-2.48-24.16h-83.47v228.08l-.1 124.93c0 33.4-21.75 61.72-51.9 71.68-8.75 2.89-18.2 4.26-28.04 3.72-12.56-.69-24.33-4.48-34.56-10.6-21.77-13.02-36.53-36.64-36.93-63.66-.63-42.23 33.51-76.66 75.71-76.66 8.33 0 16.33 1.36 23.82 3.83v-62.34-22.41c-7.9-1.17-15.94-1.78-24.07-1.78-46.19 0-89.39 19.2-120.27 53.79-23.34 26.14-37.34 59.49-39.5 94.46-2.83 45.94 13.98 89.61 46.58 121.83 4.79 4.73 9.82 9.12 15.08 13.17 27.95 21.51 62.12 33.17 98.11 33.17 8.13 0 16.17-.6 24.07-1.77 33.62-4.98 64.64-20.37 89.12-44.57 30.08-29.73 46.7-69.2 46.88-111.21l-.43-186.56c14.35 11.07 30.04 20.23 46.88 27.34 26.19 11.05 53.96 16.65 82.54 16.64v-60.61-22.49c.02.02-.22.02-.24.02z"></path>
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Visa */}
            <svg className="w-10 h-6" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" fill="none"><rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"></rect><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#142FBD"></path><path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#1532CB"></path><path d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z" fill="white"></path></svg>
            {/* Mastercard */}
            <svg className="w-10 h-6" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" fill="none"><rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"></rect><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#1C1C1C"></path><path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#232323"></path><path d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z" fill="#EB001B"></path><path d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z" fill="#F79E1B"></path><path d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z" fill="#FF5F00"></path></svg>
            {/* Amex */}
            <svg className="w-10 h-6" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" fill="none"><rect x=".5" y=".5" width="37" height="23" rx="2.5" stroke="#000" strokeOpacity=".07" fill="none"></rect><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#0071CE"></path><path d="M3 0.5H35C36.3348 0.5 37.5 1.58692 37.5 3V21C37.5 22.4239 36.4239 23.5 35 23.5H3C1.66524 23.5 0.5 22.4131 0.5 21V3C0.5 1.57614 1.57614 0.5 3 0.5Z" stroke="black" strokeOpacity="0.07"></path><path d="M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z" fill="white"></path></svg>
            {/* PayPal */}
            <svg className="w-10 h-6" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
          </div>
        </div>
      </div>

      {/* Giant Logo */}
      <div className="w-full flex justify-center items-end bg-[#fcfcfc] overflow-hidden pt-8">
        <h1 className="text-[25vw] leading-[0.75] font-light tracking-tighter text-black select-none pointer-events-none mb-[-2vw]" style={{ marginLeft: '-0.02em', marginRight: '-0.02em' }}>
          MELLI
        </h1>
      </div>
    </footer>
  );
}

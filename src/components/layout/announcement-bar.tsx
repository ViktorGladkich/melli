"use client";

import Link from "next/link";
import { AnimatedText } from "../ui/animated-text";


export function AnnouncementBar() {
  const items = [
    { text: "Registrieren & 10% Rabatt sichern", link: "/register", hasArrow: true },
    { text: "Kostenlose Rückgabe innerhalb von 30 Tagen", link: null, hasArrow: false },
    { text: "Registrieren & 10% Rabatt sichern", link: "/register", hasArrow: true },
    { text: "Kostenlose Rückgabe innerhalb von 30 Tagen", link: null, hasArrow: false },
    { text: "Registrieren & 10% Rabatt sichern", link: "/register", hasArrow: true },
    { text: "Kostenlose Rückgabe innerhalb von 30 Tagen", link: null, hasArrow: false },
    { text: "Registrieren & 10% Rabatt sichern", link: "/register", hasArrow: true },
    { text: "Kostenlose Rückgabe innerhalb von 30 Tagen", link: null, hasArrow: false },
  ];

  return (
    <div className="bg-[#212121] text-white w-full overflow-hidden flex items-center h-8 border-b border-black/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* First set of items */}
        <div className="flex items-center justify-around min-w-full shrink-0">
          {items.map((item, i) => (
            <div key={i} className="flex items-center px-8 text-[10px] md:text-xs uppercase tracking-widest font-medium">
              {item.link ? (
                <Link href={item.link} className="flex items-center hover:opacity-70 transition-opacity group cursor-pointer">
                  <AnimatedText text={item.text} />
                  {item.hasArrow && (
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
                      <g transform="translate(108 583) rotate(180)">
                        <g transform="translate(23289 11206)">
                          <g>
                            <rect width="72" height="72" transform="translate(-23253 -10695)" fill="none"></rect>
                            <path d="M35.628,87.789l.876-.876a1.487,1.487,0,0,0,0-2.1L12.281,60.587,36.5,36.365a1.487,1.487,0,0,0,0-2.1l-.876-.876a1.487,1.487,0,0,0-2.1,0L7.375,59.536a1.487,1.487,0,0,0,0,2.1l26.15,26.15a1.487,1.487,0,0,0,2.1,0Z" transform="translate(-23239.939 -10719.95)" fill="currentColor"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}
                </Link>
              ) : (
                <span className="flex items-center group cursor-pointer">
                  <AnimatedText text={item.text} />
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Duplicate set of items for seamless scrolling */}
        <div className="flex items-center justify-around min-w-full shrink-0">
          {items.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center px-8 text-[10px] md:text-xs uppercase tracking-widest font-medium">
              {item.link ? (
                <Link href={item.link} className="flex items-center hover:opacity-70 transition-opacity group cursor-pointer">
                  <AnimatedText text={item.text} />
                  {item.hasArrow && (
                    <svg className="w-4 h-4 ml-2" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
                      <g transform="translate(108 583) rotate(180)">
                        <g transform="translate(23289 11206)">
                          <g>
                            <rect width="72" height="72" transform="translate(-23253 -10695)" fill="none"></rect>
                            <path d="M35.628,87.789l.876-.876a1.487,1.487,0,0,0,0-2.1L12.281,60.587,36.5,36.365a1.487,1.487,0,0,0,0-2.1l-.876-.876a1.487,1.487,0,0,0-2.1,0L7.375,59.536a1.487,1.487,0,0,0,0,2.1l26.15,26.15a1.487,1.487,0,0,0,2.1,0Z" transform="translate(-23239.939 -10719.95)" fill="currentColor"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}
                </Link>
              ) : (
                <span className="flex items-center group cursor-pointer">
                  <AnimatedText text={item.text} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

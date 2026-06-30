"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (menu: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(expanded === menu ? null : menu);
  };

  const drawerContent = (
    <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="fixed inset-y-0 left-0 z-60 w-[90%] max-w-[450px] bg-white text-black overflow-y-auto drawer-container"
            >
              <style dangerouslySetInnerHTML={{ __html: `
                .drawer-container {
                  --font-headline: Outfit,sans-serif;
                  --font-navigation: Outfit,sans-serif;
                  --color-text: #212121;
                  --color-border: #dddddd;
                  --font-navigation-size: 15px;
                  --color-menu-text: #212121;
                  font-family: var(--font-navigation);
                }
                .wt-drawer__title {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 24px;
                  border-bottom: 1px solid var(--color-border);
                  font-size: 18px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                .wt-drawer__close {
                  cursor: pointer;
                }
                .wt-page-nav-mega__list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                }
                .wt-page-nav-mega__item {
                  border-bottom: 1px solid var(--color-border);
                }
                .wt-page-nav-mega__link {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 20px 24px;
                  text-decoration: none;
                  color: var(--color-menu-text);
                  font-size: var(--font-navigation-size);
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  position: relative;
                  overflow: hidden;
                  z-index: 1;
                  transition: color 0.3s ease;
                }
                .wt-page-nav-mega__link::before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  width: 0;
                  background-color: #000;
                  transition: width 0.3s ease-out;
                  z-index: -1;
                }
                .wt-page-nav-mega__link:hover {
                  color: #fff;
                }
                .wt-page-nav-mega__link:hover::before {
                  width: 100%;
                }
                .wt-page-nav-mega__link__text--underline {
                  position: relative;
                }
                .wt-page-nav-mega__sublist__wrapper {
                  display: none;
                  background: #f9f9f9;
                  padding: 10px 24px 20px;
                }
                .wt-page-nav-mega__sublist__wrapper.is-open {
                  display: block;
                }
                .wt-page-nav-mega__sublist {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                }
                .wt-page-nav-mega__sublist__link {
                  display: block;
                  padding: 10px 0;
                  color: #555;
                  font-size: 14px;
                  text-decoration: none;
                }
                .wt-page-nav-mega__sublist__link:hover {
                  color: #000;
                }
                .mega-menu__gallery--stack {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 16px;
                  margin-top: 16px;
                  list-style: none;
                  padding: 0;
                }
                .mega-menu__gallery__picture img {
                  width: 100%;
                  aspect-ratio: 2/3;
                  object-fit: cover;
                }
                .mega-menu__gallery__caption {
                  font-size: 12px;
                  margin-top: 8px;
                  color: #333;
                }
                .wt-page-nav-mega__aside {
                  padding: 24px;
                  background: #f4f4f4;
                }
                .wt-page-nav-mega__aside-list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                }
                .wt-page-nav-mega__aside-list__item {
                  padding: 10px 0;
                }
                .wt-page-nav-mega__aside-list__link {
                  color: #555;
                  text-decoration: none;
                  font-size: 14px;
                }
              `}} />

              <div className="wt-drawer__content" style={{ paddingTop: 0 }}>
                <div className="wt-drawer__title">
                  <div className="wt-drawer__title__text">Menü</div>
                  <div className="wt-drawer__close" tabIndex={0} role="button" aria-label="Toggle menu" onClick={() => setIsOpen(false)}>
                    <svg className="svg-icon svg-icon--close w-6 h-6" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                      <g transform="rotate(-90 -0.00000157361 72)"><rect x="0" y="72" fill="none" height="72" width="72"></rect><path d="m58.76152,133.58844l-22.762,-22.577l-22.762,22.577a1.413,1.413 0 0 1 -1.994,0l-0.828,-0.824a1.381,1.381 0 0 1 0,-1.976l22.973,-22.787l-22.973,-22.788a1.387,1.387 0 0 1 0,-1.98l0.828,-0.824a1.422,1.422 0 0 1 1.994,0l22.764,22.579l22.76,-22.579a1.425,1.425 0 0 1 2,0l0.828,0.824a1.39,1.39 0 0 1 0,1.98l-22.969,22.788l22.969,22.787a1.389,1.389 0 0 1 0,1.979l-0.828,0.82a1.415,1.415 0 0 1 -2,0l0,0.001z" fill="currentColor"></path></g>
                    </svg>
                  </div>
                </div>

                <div className="mega-menu">
                  <nav className="wt-page-nav-mega">
                    <ul className="wt-page-nav-mega__list wt-page-nav-mega__list--center">
                      
                      {/* ABAYAS */}
                      <li className="wt-page-nav-mega__item">
                        <Link href="/collections/abayas" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__link">
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Abayas</span>
                        </Link>
                      </li>

                      {/* HIJABS */}
                      <li className="wt-page-nav-mega__item">
                        <Link href="/collections/hijabs" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__link">
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Hijabs</span>
                        </Link>
                      </li>

                      {/* TUNIKEN */}
                      <li className="wt-page-nav-mega__item">
                        <Link href="/collections/tuniken" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__link">
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Tuniken</span>
                        </Link>
                      </li>

                      {/* BESTSELLERS */}
                      <li className="wt-page-nav-mega__item wt-page-nav-mega__item--parent wt-page-nav-mega__item--mega">
                        <div 
                          className="wt-page-nav-mega__link wt-page-nav-mega__link--parent cursor-pointer"
                          onClick={(e) => toggleExpand("bestsellers", e)}
                        >
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Bestseller</span>
                          {expanded === "bestsellers" ? (
                            <svg className="svg-icon svg-icon--minus w-5 h-5" viewBox="0 0 72 72"><rect width="54" height="4" rx="2" y="34" x="9" fill="currentColor"></rect></svg>
                          ) : (
                            <svg className="svg-icon svg-icon--plus w-5 h-5" viewBox="0 0 72 72"><rect width="54" height="4" rx="2" y="34" x="9" fill="currentColor"></rect><rect width="4" height="54" rx="2" y="9" x="34" fill="currentColor"></rect></svg>
                          )}
                        </div>
                        <div className={cn("wt-page-nav-mega__sublist__wrapper wt-page-nav-mega__sublist__wrapper--mega", expanded === "bestsellers" && "is-open")}>
                          <ul className="wt-page-nav-mega__sublist">
                            <li className="wt-page-nav-mega__sublist__item">
                              <Link href="/collections/bestseller" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__sublist__link">Alle Bestseller ansehen</Link>
                            </li>
                            <li className="wt-page-nav-mega__sublist__item wt-page-nav-mega__sublist__item--gallery">
                              <ul className="mega-menu__gallery mega-menu__gallery--stack">
                                <li className="mega-menu__gallery__item">
                                  <Link href="/products/abaya-black" onClick={() => setIsOpen(false)}>
                                    <picture className="mega-menu__gallery__picture">
                                      <img src="/products/abaya_black_front.jpg" alt="Black Abaya" />
                                      <p className="mega-menu__gallery__caption">Klassische Schwarze Abaya</p>
                                    </picture>
                                  </Link>
                                </li>
                                <li className="mega-menu__gallery__item">
                                  <Link href="/products/abaya-beige" onClick={() => setIsOpen(false)}>
                                    <picture className="mega-menu__gallery__picture">
                                      <img src="/products/abaya_beige_front.jpg" alt="Beige Abaya" />
                                      <p className="mega-menu__gallery__caption">Wüstensand Abaya</p>
                                    </picture>
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* SALE */}
                      <li className="wt-page-nav-mega__item">
                        <Link href="/collections/sale" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__link">
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Sale</span>
                        </Link>
                      </li>


                      {/* LOOKBOOK */}
                      <li className="wt-page-nav-mega__item">
                        <Link href="/pages/lookbook" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__link">
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Lookbook</span>
                        </Link>
                      </li>

                      {/* ABOUT US */}
                      <li className="wt-page-nav-mega__item">
                        <Link href="/uber-uns" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__link">
                          <span className="wt-page-nav-mega__link__text wt-page-nav-mega__link__text--underline">Über uns</span>
                        </Link>
                      </li>

                    </ul>
                  </nav>

                  {/* ASIDE (Footer of drawer) */}
                  <aside className="wt-page-nav-mega__aside">
                    <ul className="wt-page-nav-mega__aside-list">
                      <li className="wt-page-nav-mega__aside-list__item">
                        <Link href="/faq" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__aside-list__link">FAQ</Link>
                      </li>
                      <li className="wt-page-nav-mega__aside-list__item">
                        <Link href="/kontakt" onClick={() => setIsOpen(false)} className="wt-page-nav-mega__aside-list__link">Kontakt</Link>
                      </li>
                      <li className="wt-page-nav-mega__aside-list__item flex items-center gap-2 mt-4 text-sm cursor-pointer">
                        <svg className="w-5 h-5" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0-7a3 3 0 110 6 3 3 0 010-6zM10 11c-5 0-7 2-7 7h14c0-5-2-7-7-7zm0 1c4.08 0 5.73 1.33 6 5H4c.27-3.67 1.92-5 6-5z" fill="currentColor"></path></svg>
                        Anmelden
                      </li>
                    </ul>
                  </aside>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  );

  return (
    <div className="flex items-center">
      <button onClick={() => setIsOpen(true)} className="flex items-center justify-center p-2 -m-2 text-inherit hover:opacity-70 transition-opacity cursor-pointer">
        <svg className="w-[24px] h-[24px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g id="Navi"><rect id="ico_bar_1" height="1.5" width="22.3555" y="11.69497" x="4.82225" fill="currentColor"></rect><rect id="ico_bar_3" height="1.5" width="22.3555" y="19.65072" x="4.82225" fill="currentColor"></rect></g></svg>
      </button>

      {mounted && typeof document !== "undefined" ? createPortal(drawerContent, document.body) : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Startseite", href: "/" },
  { name: "Katalog", href: "/catalog" },
  { name: "Über uns", href: "/about" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2 -m-2 inherit hover:opacity-70 transition-opacity">
        <Menu className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-60 w-4/5 max-w-sm bg-white/70 backdrop-blur-3xl shadow-2xl flex flex-col border-r border-white/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-lg font-bold tracking-tight">Menü</span>
                <button onClick={() => setIsOpen(false)} className="p-2 -m-2 text-gray-500 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-6">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 transition-colors hover:text-black"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

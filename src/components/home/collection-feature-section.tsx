"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const collections = [
  {
    title: "Abayas",
    href: "/collections/abayas",
    image: "/categories/abayas.png"
  },
  {
    title: "Kleider",
    href: "/collections/kleider",
    image: "/categories/kleider.png"
  },
  {
    title: "Zweiteiler",
    href: "/collections/zweiteiler",
    image: "/categories/zweiteiler.png"
  },
  {
    title: "Hijabs",
    href: "/collections/hijabs",
    image: "/categories/hijabs.png"
  }
];

export function CollectionFeatureSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF9F8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-black">
            Entdecke unsere Kollektionen
          </h2>
        </motion.div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {collections.map((collection, index) => (
            <motion.li
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={collection.href} className="group flex flex-col items-center text-center w-full">
                <div className="relative w-full max-w-[280px] aspect-square rounded-full overflow-hidden mb-6 bg-white shadow-sm border border-gray-100">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                </div>
                <span className="text-lg md:text-xl font-light uppercase tracking-widest text-black transition-colors duration-300 group-hover:text-gray-500">
                  {collection.title}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

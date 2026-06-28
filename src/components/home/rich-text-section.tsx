"use client";

import { motion } from "framer-motion";

export function RichTextSection() {
  return (
    <section className="w-full pt-16 pb-8 md:pt-24 md:pb-12 bg-white text-center flex flex-col items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-gray-500 uppercase tracking-[0.2em] text-sm md:text-base font-light mb-4">
            Herbst / Winter
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black uppercase tracking-[0.1em] font-light">
            Kollektion-Styles
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

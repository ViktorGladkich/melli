"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "../ui/animated-text";

export function NewsletterSection() {
  return (
    <section className="w-full py-20 md:py-32" style={{ backgroundColor: "#f4f0eb" }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-light tracking-tight mb-4 uppercase text-black"
          >
            Newsletter Abonnieren
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-gray-700 text-sm md:text-base mb-10"
          >
            Erfahren Sie als Erste von neuen Kollektionen und exklusiven Angeboten.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-xl flex flex-col sm:flex-row gap-3 sm:gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="E-Mail Adresse"
              required
              className="flex-1 bg-white border border-gray-200 px-6 py-4 text-sm text-black focus:outline-hidden focus:border-black transition-colors rounded-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 font-normal text-sm tracking-widest hover:bg-gray-900 transition-colors uppercase min-w-[180px] flex items-center justify-center group"
            >
              <AnimatedText text="Abonnieren" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { CreditCard, Truck, Leaf, Gift } from "lucide-react";

const features = [
  {
    icon: <CreditCard strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10 mb-4 text-black" />,
    title: "Zahlung",
    text: "Kreditkarte & PayPal",
  },
  {
    icon: <Leaf strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10 mb-4 text-black" />,
    title: "Lieferung",
    text: "Klimaneutraler Versand",
  },
  {
    icon: <Gift strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10 mb-4 text-black" />,
    title: "Milly Card",
    text: "Exklusive Club-Rabatte",
  },
  {
    icon: <Truck strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10 mb-4 text-black" />,
    title: "Versand",
    text: "Kostenloser Standardversand",
  },
];

export function FeaturesBannerSection() {
  return (
    <section className="w-full bg-[#fafafa] py-12 md:py-20 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-[13px] md:text-sm font-medium tracking-widest uppercase mb-2 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

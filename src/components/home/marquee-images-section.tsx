"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "../ui/animated-text";

const marqueeImages = [
  { id: 1, src: "/marquee/marquee_1.png", link: "/collections/dress" },
  { id: 2, src: "/marquee/marquee_2.png", link: "/collections/blazer" },
  { id: 3, src: "/marquee/marquee_3.png", link: "/collections/accessories" },
  { id: 4, src: "/marquee/marquee_4.png", link: "/collections/trousers" },
  { id: 5, src: "/blog/blog_office_style.png", link: "/collections/bags" },
  { id: 6, src: "/blog/blog_skirt_length.png", link: "/collections/trousers" },
  { id: 7, src: "/blog/blog_blazer_style.png", link: "/collections/blazer" },
];

// Duplicate the array multiple times to ensure it's wide enough for ultra-wide screens
const duplicatedImages = [...marqueeImages, ...marqueeImages, ...marqueeImages, ...marqueeImages];

export function MarqueeImagesSection() {
  return (
    <section className="w-full overflow-hidden bg-white pb-8 md:pb-16 pt-4">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          /* We translate by 50%, which equals exactly 2 sets of our images */
          animation: marquee 90s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      <div className="flex flex-col items-center text-center mb-8 md:mb-12 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-black text-sm md:text-base mb-2 font-medium uppercase tracking-[0.1em]"
        >
          Folge uns
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-black tracking-tight"
        >
          @mellifashion
        </motion.h2>
      </div>
      <div className="relative flex w-full flex-nowrap overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-[4px]">
          {duplicatedImages.map((image, index) => (
            <div 
              key={`${image.id}-${index}`}
              className="relative h-[200px] w-[150px] sm:h-[250px] sm:w-[200px] md:h-[360px] md:w-[280px] flex-none overflow-hidden"
            >
              <Link href={image.link} className="group block h-full w-full">
                <img
                  src={image.src}
                  alt="Instagram style feed"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-8 md:mt-12 flex justify-center px-4"
      >
        <Link 
          href="/uber-uns" 
          className="bg-black text-white px-8 sm:px-12 py-3.5 md:py-4 font-normal text-[13px] sm:text-sm tracking-widest hover:bg-black/90 transition-colors uppercase min-w-[200px] flex items-center justify-center group cursor-pointer"
        >
          <AnimatedText text="Folge uns" />
        </Link>
      </motion.div>
    </section>
  );
}

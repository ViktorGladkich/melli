"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-text";

const storyData = [
  {
    id: 1,
    title: "Unsere Philosophie",
    text: "Geboren aus der Leidenschaft für zeitlosen Stil und moderne Eleganz, ist unsere Marke darauf ausgerichtet, Mode zu kreieren, die inspiriert und stärkt. Wir glauben, dass Kleidung nicht nur wunderschön aussehen, sondern Ihnen in jedem Moment Selbstbewusstsein verleihen sollte.",
    image: "/about/story-1.png"
  },
  {
    id: 2,
    title: "Wofür wir stehen",
    text: "Wir kuratieren sorgfältig Kleidungsstücke, die Qualität, Komfort und Raffinesse vereinen. Jedes Detail zählt – vom Design bis zur Handwerkskunst –, um sicherzustellen, dass unsere Stücke Ihre Garderobe nachhaltig bereichern. Bei uns einzukaufen ist ein Erlebnis, das Individualität und Stil feiert.",
    image: "/about/story-2.png"
  },
  {
    id: 3,
    title: "Unser Versprechen",
    text: "Bei MILLY steht die Frau im Mittelpunkt. Jedes unserer Designs wird so entworfen, dass es Ihre Werte respektiert, ohne Kompromisse in Sachen Ästhetik einzugehen. Wir versprechen Ihnen zeitlose Begleiter für jeden Anlass, die Sie jahrelang lieben werden.",
    image: "/about/story-3.png"
  }
];

interface StoryItem {
  id: number;
  title: string;
  text: string;
  image: string;
}

function TextBlock({ item, index, onEnter }: { item: StoryItem, index: number, onEnter: (index: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onEnter(index);
    }
  }, [isInView, onEnter, index]);

  return (
    <div ref={ref} className="min-h-auto md:min-h-[80vh] flex flex-col justify-center px-4 md:px-12 py-16 md:py-20">
      
      {/* Mobile Image (hidden on desktop) */}
      <div className="md:hidden relative w-full max-w-[320px] aspect-4/5 mx-auto bg-white p-3 shadow-xl rounded-sm mb-12 transform -rotate-1">
        <img 
          src={item.image} 
          alt={item.title} 
          className="absolute top-3 left-3 right-3 bottom-16 object-cover w-[calc(100%-1.5rem)] h-[calc(100%-4.75rem)]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left flex flex-col items-center md:items-start"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest mb-6 text-black">
          {item.title}
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10 max-w-lg font-light">
          {item.text}
        </p>
        <Link 
          href="/collections/all"
          className="inline-flex items-center justify-center bg-white text-black border border-black px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300 group"
        >
          <AnimatedText text="Entdecken" />
        </Link>
      </motion.div>
    </div>
  );
}

export function ScrollingTextSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section className="relative w-full bg-[#f4f0eb]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row">
        
        {/* Left Side: Sticky Image Container (Desktop Only) */}
        <div className="hidden md:flex w-full md:w-1/2 md:h-screen sticky md:top-0 items-center justify-center md:p-10 lg:p-20 z-10 md:pt-10">
          <div className="relative w-full max-w-[450px] aspect-4/5 bg-white p-5 shadow-xl rounded-sm transform -rotate-2 transition-transform duration-700 hover:rotate-0">
             {storyData.map((item, index) => (
                <motion.img 
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className="absolute top-5 left-5 right-5 bottom-24 object-cover w-[calc(100%-2.5rem)] h-[calc(100%-7.25rem)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex >= index ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
             ))}
          </div>
        </div>

        {/* Right Side: Scrolling Text */}
        <div className="w-full md:w-1/2 pb-12 md:pb-[30vh] pt-4 md:pt-[10vh]">
          {storyData.map((item, index) => (
            <TextBlock 
              key={item.id} 
              item={item} 
              index={index} 
              onEnter={handleEnter} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

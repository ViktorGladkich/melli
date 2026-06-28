"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How to Dress for the Office?",
    excerpt: "Choosing the right outfit for the office can sometimes be a challenge...",
    image: "https://images.unsplash.com/photo-1485230895905-ef08ba37e509?q=80&w=800&auto=format&fit=crop",
    link: "/blogs/news/dress-for-work",
  },
  {
    id: 2,
    title: "How to Choose the Right Skirt Length?",
    excerpt: "The right skirt length can enhance your figure...",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac661?q=80&w=800&auto=format&fit=crop",
    link: "/blogs/news/skirt-length",
  },
  {
    id: 3,
    title: "Blazer and Office Style",
    excerpt: "The blazer is a staple piece in office fashion...",
    image: "https://images.unsplash.com/photo-1590162562479-58edbb817342?q=80&w=800&auto=format&fit=crop",
    link: "/blogs/news/blazer-style",
  }
];

export function BlogPostsSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-gray-500 text-sm md:text-base uppercase tracking-[0.2em] mb-3 font-medium"
          >
            Journal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4"
          >
            News & Inspiration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto"
          >
            Entdecken Sie unsere neuesten Beiträge, Styling-Tipps und Inspirationen für Ihren eleganten Alltag.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex overflow-x-auto gap-4 md:gap-6 lg:gap-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {blogPosts.map((post) => (
            <div key={post.id} className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] lg:flex-1 snap-center group">
              <Link href={post.link} className="block relative aspect-square overflow-hidden mb-6 bg-gray-100">
                <div className="absolute top-4 left-4 z-10 bg-white text-black text-[10px] sm:text-xs font-semibold px-3 py-1 uppercase tracking-widest">
                  Blog
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-col items-center text-center px-2">
                <h3 className="text-xl md:text-2xl font-light mb-3">
                  <Link href={post.link} className="hover:text-gray-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link 
                  href={post.link}
                  className="text-xs sm:text-sm font-medium uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
          {/* Empty space at the end to allow scrolling past the last item on mobile */}
          <div className="flex-none w-4 md:hidden" />
        </motion.div>
      </div>
    </section>
  );
}

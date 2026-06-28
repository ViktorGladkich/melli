"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

// Mock data representing the video reels and their associated products
const reels = [
  {
    id: 1,
    video: "/shoppable_video/shoppable_video.mp4",
    product: {
      brand: "MELLI",
      title: "Desert Sand Abaya",
      price: "€129.00",
      image: "/products/abaya_beige_front.jpg",
      link: "/products/desert-sand-abaya",
    }
  },
  {
    id: 2,
    video: "/video_hero/hero.mp4",
    product: {
      brand: "MELLI",
      title: "Classic Black Abaya",
      price: "€129.00",
      image: "/products/tunic_olive_front.png", // Reusing image
      link: "/products/classic-black-abaya",
    }
  },
  {
    id: 3,
    video: "/reels_video/reels_video3.mp4",
    product: {
      brand: "MELLI",
      title: "Smaragd Traum",
      price: "€139.00",
      image: "/products/abaya_beige_back.jpg",
      link: "/products/smaragd-traum",
    }
  },
  {
    id: 4,
    video: "/video_hero/hero.mp4",
    product: {
      brand: "MELLI",
      title: "Olive Elegance",
      price: "€149.00",
      image: "/products/tunic_olive_back.png",
      link: "/products/olive-elegance",
    }
  }
];

function ReelCard({ reel }: { reel: typeof reels[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex-none w-[260px] md:w-[300px] snap-start relative group flex flex-col gap-3">
      {/* Video Container */}
      <div 
        className="relative aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={reel.video}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-colors"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          
          <button 
            onClick={toggleMute}
            className="absolute bottom-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Shoppable Product Card attached below the video */}
      <Link href={reel.product.link} className="block bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group/card">
        <div className="flex gap-4">
          <div className="w-[60px] h-[80px] md:w-[70px] md:h-[90px] relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
            <img 
              src={reel.product.image} 
              alt={reel.product.title}
              className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">{reel.product.brand}</p>
            <h4 className="text-sm font-medium text-gray-900 truncate mb-1">{reel.product.title}</h4>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm font-semibold text-gray-900">{reel.product.price}</span>
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                {/* Standardized Cart Icon */}
                <svg className="w-[16px] h-[16px]" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.63 17.47l-.6-11a.51.51 0 00-.5-.47h-2v-.43a3.5 3.5 0 00-7 0V6h-2a.51.51 0 00-.5.47l-.62 11a.49.49 0 00.49.53h12.3a.49.49 0 00.43-.53zm-12.31-.42L4.9 7h10.2l.56 10.1-11.34-.05zM7.5 5.57a2.5 2.5 0 115 0V6h-5v-.43z" fill="currentColor"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function VideoReelsSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-gray-500 text-sm md:text-base uppercase tracking-[0.2em] mb-4 font-medium"
          >
            Instagram
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-gray-900 text-4xl md:text-6xl lg:text-7xl font-light tracking-wide"
          >
            Unsere Looks
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
          {/* Empty space at the end to allow scrolling past the last item */}
          <div className="flex-none w-4 md:w-12" />
        </motion.div>
      </div>
    </section>
  );
}

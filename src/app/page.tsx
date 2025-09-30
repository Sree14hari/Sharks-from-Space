
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';
import FuturisticButton from '@/components/ui/futuristic-button';

export default function Home() {

  return (
    <motion.div 
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-8 left-8 z-20">
        <FuturisticButton text="Members" href="/members" />
      </div>
      <div className="absolute top-8 right-8 z-20">
        <FuturisticButton text="Documentation" href="/info" />
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/world.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h1 
          className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl lg:text-7xl animate-glow flex flex-col sm:flex-row flex-wrap justify-center overflow-hidden"
        >
          <span>SHARKS FROM</span>
          <span className="sm:ml-4">
            SPACE
          </span>
        </h1>
        <p className="mt-4 max-w-2xl px-4 text-xs text-slate-300 sm:text-sm md:text-base">
          Using satellite data to predict shark habitats and protect marine
          ecosystems.
        </p>
        <div className="mt-12 flex w-full items-center justify-center space-x-4 font-nav text-base text-white sm:space-x-8 sm:text-lg">
          <Link href="/info" className="transition-all hover:text-primary">
            <CyberpunkHover text="Info" />
          </Link>
          <Link href="/map" className="transition-all hover:text-primary">
            <CyberpunkHover text="Map" />
          </Link>
          <Link href="/brain" className="transition-all hover:text-primary">
            <CyberpunkHover text="Brain" />
          </Link>
          <Link href="#" className="transition-all hover:text-primary">
            <CyberpunkHover text="SharkTag" />
          </Link>
        </div>
      </div>
      
      <footer className="absolute bottom-4 z-10 text-center text-xs text-slate-400/50 font-nav">
        <CyberpunkHover text="Space Hustle Researchers" />
      </footer>

    </motion.div>
  );
}

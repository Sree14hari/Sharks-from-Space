
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const text = "SHARKS FROM SPACE";

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://iili.io/K1iHzen.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <motion.h1 
          className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl lg:text-7xl animate-glow flex flex-wrap justify-center overflow-hidden"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {text.split('').map((char, index) => (
            <motion.span key={index} variants={child} style={{ marginRight: char === ' ' ? '1rem' : '0' }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-4 max-w-2xl px-4 text-xs text-slate-300 sm:text-sm md:text-base">
          Using satellite data to predict shark habitats and protect marine
          ecosystems.
        </p>
        <div className="mt-12 flex w-full items-center justify-center space-x-4 font-nav text-base text-white sm:space-x-8 sm:text-lg">
          <motion.div whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}>
            <Link href="/info" className="transition-all hover:text-primary">Info</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}>
            <Link href="#" className="transition-all hover:text-primary">Map</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}>
            <Link href="#" className="transition-all hover:text-primary">Brain</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}>
            <Link href="#" className="transition-all hover:text-primary">SharkTag</Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

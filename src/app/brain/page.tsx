
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../../../public/json/Brain.json';

export default function BrainPage() {
  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.postimg.cc/mDdxvDCH/Screenshot-2025-09-28-130448.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>

      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="inline-flex items-center text-primary transition-colors hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-lg h-full">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </motion.div>
  );
}

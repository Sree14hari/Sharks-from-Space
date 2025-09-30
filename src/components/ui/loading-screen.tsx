
'use client';

import { motion } from 'framer-motion';
import CyberpunkHover from './cyberpunk-hover';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="text-center text-primary">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            <CyberpunkHover text="LOADING..." playOnLoad={true} />
        </h1>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

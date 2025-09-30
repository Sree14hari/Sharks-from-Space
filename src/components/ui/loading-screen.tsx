
'use client';

import { motion } from 'framer-motion';
import CyberpunkHover from './cyberpunk-hover';
import { cn } from '@/lib/utils';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: 'easeInOut' }}
    >
      <div className="text-center text-white">
        <div
            className={cn(
                'group relative inline-block p-4 text-white font-headline text-2xl sm:text-4xl md:text-5xl'
            )}
        >
            <span className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-current transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
            <span className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-current transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-current transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-current transition-all duration-300 group-hover:h-4 group-hover:w-4"></span>
            <CyberpunkHover text="Space Hustle Researchers" playOnLoad={true} />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

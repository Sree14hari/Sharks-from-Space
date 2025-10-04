
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import CyberpunkHover from './cyberpunk-hover';

interface FuturisticButtonProps {
  text: string;
  href: string;
  className?: string;
}

const FuturisticButton = ({ text, href, className }: FuturisticButtonProps) => {
  const isExternal = href.startsWith('http');

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'group relative inline-block p-2 sm:p-3 text-white font-nav text-xs sm:text-base transition-all duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]',
        className
      )}
    >
      <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-current transition-all duration-300 group-hover:h-3 group-hover:w-3"></span>
      <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-current transition-all duration-300 group-hover:h-3 group-hover:w-3"></span>
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-current transition-all duration-300 group-hover:h-3 group-hover:w-3"></span>
      <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-current transition-all duration-300 group-hover:h-3 group-hover:w-3"></span>
      <CyberpunkHover text={text} />
    </Link>
  );
};

export default FuturisticButton;

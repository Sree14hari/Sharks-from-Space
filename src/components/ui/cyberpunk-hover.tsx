
'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CyberpunkHoverProps {
  text: string;
  className?: string;
}

const CyberpunkHover = ({ text, className }: CyberpunkHoverProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let iteration = 0;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((_letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }

      iteration += 1 / 3;
    }, 30);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  };

  return (
    <div
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={cn('transition-colors duration-300', className)}
    >
      {displayText}
    </div>
  );
};

export default CyberpunkHover;

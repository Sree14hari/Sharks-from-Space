
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CyberpunkHoverProps {
  text: string;
  className?: string;
  playOnLoad?: boolean;
}

const CyberpunkHover = ({ text, className, playOnLoad = false }: CyberpunkHoverProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayText, setDisplayText] = useState(playOnLoad ? '' : text);
  const hasPlayedOnLoad = useRef(false);

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

  useEffect(() => {
    if (playOnLoad && !hasPlayedOnLoad.current) {
      setTimeout(scramble, 500); // Small delay to make it more visible
      hasPlayedOnLoad.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playOnLoad]);

  return (
    <div
      onMouseEnter={!playOnLoad ? scramble : undefined}
      onMouseLeave={!playOnLoad ? stopScramble : undefined}
      className={cn('transition-colors duration-300', className)}
    >
      {displayText}
    </div>
  );
};

export default CyberpunkHover;

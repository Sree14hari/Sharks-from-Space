
'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundContext } from '@/hooks/use-sound-context';
import { Button } from './button';

const VolumeControl = () => {
  const { isMuted, setIsMuted } = useSoundContext();

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getVolumeIcon = () => {
    if (isMuted) {
      return <VolumeX className="h-5 w-5" />;
    }
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="ghost"
          className="bg-neutral-900/50 backdrop-blur-sm border border-primary/20 text-primary hover:bg-neutral-800/70 hover:text-white"
          onClick={toggleMute}
        >
          {getVolumeIcon()}
          <span className="ml-2 font-nav text-sm">Sound: {isMuted ? 'Off' : 'On'}</span>
        </Button>
    </div>
  );
};

export default VolumeControl;

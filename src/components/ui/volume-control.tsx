
'use client';

import React from 'react';
import { Volume1, Volume2, VolumeX, Volume } from 'lucide-react';
import { useSoundContext } from '@/hooks/use-sound-context';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from './button';

const VolumeControl = () => {
  const { volume, setVolume, isMuted, setIsMuted } = useSoundContext();

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="h-5 w-5" />;
    }
    if (volume < 0.5) {
      return <Volume1 className="h-5 w-5" />;
    }
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="bg-neutral-900/50 backdrop-blur-sm border border-primary/20 text-primary hover:bg-neutral-800/70 hover:text-white rounded-full w-12 h-12"
            onClick={toggleMute}
          >
            {getVolumeIcon()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-neutral-900/80 backdrop-blur-md border-primary/30 text-white p-4 rounded-lg shadow-lg mr-4">
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2">
                <Volume className="h-4 w-4 text-primary" />
                <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.05}
                    className="w-full"
                />
            </div>
            <span className="text-center text-xs text-slate-400">
                {isMuted ? 'Muted' : `Volume: ${Math.round(volume * 100)}%`}
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VolumeControl;

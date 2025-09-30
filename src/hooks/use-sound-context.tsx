
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type SoundContextType = {
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  bgMusic: HTMLAudioElement | null;
  setBgMusic: (audio: HTMLAudioElement) => void;
  clickSound: HTMLAudioElement | null;
  setClickSound: (audio: HTMLAudioElement) => void;
  hoverSound: HTMLAudioElement | null;
  setHoverSound: (audio: HTMLAudioElement) => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [volume, setVolumeState] = useState(0.1);
  const [isMuted, setIsMutedState] = useState(false);
  const [bgMusic, setBgMusic] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (bgMusic) {
      bgMusic.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMutedState(false);
    }
  };

  const setIsMuted = (muted: boolean) => {
    setIsMutedState(muted);
    if (bgMusic) {
      bgMusic.muted = muted;
    }
    if (!muted && volume === 0) {
      setVolume(0.1);
    }
  };

  return (
    <SoundContext.Provider value={{ volume, setVolume, isMuted, setIsMuted, bgMusic, setBgMusic, clickSound, setClickSound, hoverSound, setHoverSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

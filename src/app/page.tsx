
'use client';

import { Brain, Info, Map, Tag } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://iili.io/K1iHzen.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl lg:text-8xl">
          SHARKS FROM SPACE
        </h1>
        <p className="mt-4 max-w-2xl text-xs text-slate-300 md:text-sm">
          Using satellite data to predict shark habitats and protect marine
          ecosystems.
        </p>
      </div>
      <div className="absolute bottom-10 z-10 flex w-full items-center justify-center space-x-12 text-white">
        <div className="flex flex-col items-center space-y-2">
          <Info className="h-8 w-8" />
          <span>Info</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Map className="h-8 w-8" />
          <span>Map</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Brain className="h-8 w-8" />
          <span>Brain</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Tag className="h-8 w-8" />
          <span>SharkTag</span>
        </div>
      </div>
    </div>
  );
}

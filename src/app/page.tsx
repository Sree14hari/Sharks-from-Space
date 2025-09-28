
'use client';

import Link from 'next/link';

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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-5xl md:text-5xl lg:text-8xl">
          SHARKS FROM SPACE
        </h1>
        <p className="mt-4 max-w-2xl text-xs text-slate-300 sm:text-base">
          Using satellite data to predict shark habitats and protect marine
          ecosystems.
        </p>
        <div className="mt-12 flex w-full items-center justify-center space-x-4 font-nav text-base text-white sm:space-x-12 sm:text-lg">
          <Link href="/info" className="transition-colors hover:text-primary">Info</Link>
          <Link href="#" className="transition-colors hover:text-primary">Map</Link>
          <Link href="#" className="transition-colors hover:text-primary">Brain</Link>
          <Link href="#" className="transition-colors hover:text-primary">SharkTag</Link>
        </div>
      </div>
    </div>
  );
}

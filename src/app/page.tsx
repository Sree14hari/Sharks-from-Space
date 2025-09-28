
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/dashboard');
  };

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
        <h1 className="font-headline text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] md:text-6xl lg:text-8xl">
          SHARKS FROM SPACE
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
          Using satellite data to predict shark habitats and protect marine
          ecosystems.
        </p>
        <Button
          onClick={handleEnter}
          className="mt-8 rounded-full px-8 py-6 text-lg font-semibold"
          size="lg"
        >
          Enter SharkTrack
        </Button>
      </div>
    </div>
  );
}

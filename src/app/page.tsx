
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
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543414242-65f651a084c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] md:text-8xl">
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

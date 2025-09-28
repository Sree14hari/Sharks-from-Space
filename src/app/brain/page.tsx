
'use client';

import Link from 'next/link';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const Neuron = ({ delay, duration, from, to }: { delay: number; duration: number; from: { x: string; y: string }; to: { x: string; y: string } }) => (
  <motion.circle
    cx={from.x}
    cy={from.y}
    r="3"
    fill="hsl(var(--primary))"
    animate={{
      x: [from.x, to.x],
      y: [from.y, to.y],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      delay,
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    }}
    className="neon-glow"
  />
);

export default function BrainPage() {
  const neuronPaths = [
    { from: { x: '50%', y: '10%' }, to: { x: '35%', y: '40%' }, delay: 0, duration: 2.5 },
    { from: { x: '50%', y: '10%' }, to: { x: '65%', y: '40%' }, delay: 0.2, duration: 2.5 },
    { from: { x: '35%', y: '40%' }, to: { x: '25%', y: '70%' }, delay: 0.5, duration: 3 },
    { from: { x: '65%', y: '40%' }, to: { x: '75%', y: '70%' }, delay: 0.7, duration: 3 },
    { from: { x: '25%', y: '70%' }, to: { x: '50%', y: '90%' }, delay: 1, duration: 2 },
    { from: { x: '75%', y: '70%' }, to: { x: '50%', y: '90%' }, delay: 1.2, duration: 2 },
    { from: { x: '50%', y: '50%' }, to: { x: '20%', y: '50%' }, delay: 0.3, duration: 4 },
    { from: { x: '50%', y: '50%' }, to: { x: '80%', y: '50%' }, delay: 0.6, duration: 4 },
    { from: { x: '20%', y: '50%' }, to: { x: '50%', y: '10%' }, delay: 1.5, duration: 3.5 },
    { from: { x: '80%', y: '50%' }, to: { x: '50%', y: '10%' }, delay: 1.8, duration: 3.5 },
  ];

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.postimg.cc/mDdxvDCH/Screenshot-2025-09-28-130448.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center text-primary transition-colors hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
            <BrainCircuit className="h-8 w-8 text-primary animate-glow" />
            <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl animate-glow">
                The AI Brain
            </h1>
        </div>
        
        <p className="mb-8 text-slate-300 max-w-prose">
            This animation represents the LightGBM model processing data. Each pulse is a decision, and each path is a feature interaction, culminating in a prediction.
        </p>

        <div className="relative w-full h-[60vh] rounded-lg border-2 border-primary/50 shadow-2xl neon-glow bg-card/20 backdrop-blur-sm overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            {/* Brain shape with pulsating effect */}
            <motion.path
              d="M200,40 C120,40 100,120 100,200 C100,280 120,360 200,360 C280,360 300,280 300,200 C300,120 280,40 200,40 Z"
              fill="none"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="2"
              initial={{ pathLength: 1, opacity: 0.7 }}
              animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M200,80 C150,80 140,140 140,200 C140,260 150,320 200,320 C250,320 260,260 260,200 C260,140 250,80 200,80 Z"
              fill="hsl(var(--primary) / 0.1)"
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth="1"
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Neuron Connections */}
            {neuronPaths.map((path, i) => (
                <line key={`line-${i}`} x1={path.from.x} y1={path.from.y} x2={path.to.x} y2={path.to.y} stroke="hsl(var(--primary) / 0.1)" strokeWidth="1" />
            ))}

            {/* Neuron Nodes */}
            {neuronPaths.map((path, i) => (
                <circle key={`node-from-${i}`} cx={path.from.x} cy={path.from.y} r="4" fill="hsl(var(--primary) / 0.3)" />
            ))}
             {neuronPaths.map((path, i) => (
                <circle key={`node-to-${i}`} cx={path.to.x} cy={path.to.y} r="4" fill="hsl(var(--primary) / 0.3)" />
            ))}

            {/* Animated Neurons */}
            {neuronPaths.map((path, i) => (
              <Neuron key={`neuron-${i}`} {...path} />
            ))}
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

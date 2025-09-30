
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, Cpu, Satellite, Thermometer, Gauge, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';
import Image from 'next/image';

const hardwareComponents = [
    {
        icon: <Cpu className="h-8 w-8 text-primary" />,
        name: "Microcontroller Unit (MCU)",
        spec: "Low-power ARM Cortex-M4",
        description: "The 'brain' of the tag, processing sensor data and managing power consumption."
    },
    {
        icon: <Satellite className="h-8 w-8 text-primary" />,
        name: "GPS & Satellite Transmitter",
        spec: "Iridium SBD Module",
        description: "Provides precise location data and transmits summarized data packets via the Iridium satellite network."
    },
    {
        icon: <Gauge className="h-8 w-8 text-primary" />,
        name: "9-Axis IMU",
        spec: "Accelerometer, Gyroscope, Magnetometer",
        description: "Tracks fine-scale movement, orientation, and heading to infer behaviors like hunting and resting."
    },
    {
        icon: <Thermometer className="h-8 w-8 text-primary" />,
        name: "Environmental Sensors",
        spec: "Pressure, Temperature",
        description: "Measures depth and water temperature, providing crucial context for the shark's habitat."
    },
    {
        icon: <Battery className="h-8 w-8 text-primary" />,
        name: "Power System",
        spec: "Lithium-ion Battery Pack",
        description: "Designed for long-duration missions, with a lifespan of over 12 months."
    },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function SharkTagPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-y-auto p-4 sm:p-6 md:p-8">
        <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/world.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <Link href="/" className="inline-flex items-center text-primary transition-all hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <CyberpunkHover text="Back to Home" />
        </Link>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl animate-glow">
          The SharkTag Project
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base md:text-lg max-w-3xl">
          A conceptual, next-generation data logger designed to unlock the secrets of shark behavior through advanced sensor fusion and satellite telemetry.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Image 
            src="https://picsum.photos/seed/sharktag/600/400"
            alt="Conceptual Shark Tag Design"
            width={600}
            height={400}
            data-ai-hint="futuristic device"
            className="rounded-lg border-2 border-primary/30 shadow-2xl neon-glow object-cover"
          />
        </motion.div>
        <div className="text-slate-300 space-y-4 text-center lg:text-left">
            <h2 className="font-headline text-2xl text-primary">Mission Briefing</h2>
            <p>The SharkTag is more than just a tracker. It's a comprehensive behavioral analysis unit. By integrating high-resolution motion sensors with environmental data, it aims to create a complete picture of a shark's life—identifying not just where they go, but what they are doing.</p>
            <p>The data collected by this tag provides the raw input for the machine learning models that predict foraging hotspots, contributing directly to conservation efforts.</p>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto py-16">
          <h2 className="font-headline text-3xl text-center text-white mb-10 animate-glow">Hardware & Systems Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {hardwareComponents.map((component, i) => (
                  <motion.div
                    key={component.name}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Card className="h-full bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 text-slate-200 transform transition-all duration-300 hover:bg-neutral-900/70 hover:scale-105 hover:border-primary/50">
                        <CardHeader className="items-center text-center">
                            {component.icon}
                            <CardTitle className="text-lg font-headline text-white mt-4">{component.name}</CardTitle>
                            <p className="text-sm text-primary">{component.spec}</p>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-slate-300">
                            <p>{component.description}</p>
                        </CardContent>
                    </Card>
                  </motion.div>
              ))}
          </div>
      </div>

    </div>
  );
}

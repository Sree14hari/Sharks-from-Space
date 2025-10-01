
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, Cpu, Satellite, Thermometer, Gauge, Battery, HardDrive, RadioTower, BatteryFull, Fan, Waves, CircuitBoard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';
import Image from 'next/image';

const hardwareComponents = [
    {
        icon: <Cpu className="h-8 w-8 text-primary" />,
        name: "Microcontroller",
        spec: "Arduino Uno",
        description: "The 'brain' of the tag, processing sensor data and managing all other components."
    },
    {
        icon: <Satellite className="h-8 w-8 text-primary" />,
        name: "GPS Module",
        spec: "NEO-6M",
        description: "Provides precise latitude and longitude coordinates to track the shark's location."
    },
    {
        icon: <Gauge className="h-8 w-8 text-primary" />,
        name: "6-Axis IMU",
        spec: "MPU6050 Accelerometer & Gyroscope",
        description: "Captures fine-grained motion and orientation data to help infer different behaviors."
    },
    {
        icon: <Thermometer className="h-8 w-8 text-primary" />,
        name: "Environmental Sensor",
        spec: "DS18B20 Waterproof Temperature Probe",
        description: "Measures the ambient water temperature to provide environmental context."
    },
    {
        icon: <HardDrive className="h-8 w-8 text-primary" />,
        name: "Data Storage",
        spec: "MicroSD Card Module",
        description: "Provides robust onboard storage for logging high-frequency sensor data."
    },
    {
        icon: <RadioTower className="h-8 w-8 text-primary" />,
        name: "Data Transmitter",
        spec: "LoRa Module (Ra-01)",
        description: "Simulates the long-range transmission of data packets to a satellite or gateway."
    },
    {
        icon: <BatteryFull className="h-8 w-8 text-primary" />, // Using a different battery icon
        name: "Power Source",
        spec: "2x 18650 Li-ion Cells",
        description: "Provides the main power for the tag's electronics and sensors."
    },
    {
        icon: <Fan className="h-8 w-8 text-primary" />, // Icon for the turbine/motor
        name: "Hydro-Generator",
        spec: "Water Flow Turbine & DC Motor",
        description: "Captures kinetic energy from water flow, spinning a DC motor that acts as a power generator."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary" />, // Icon for power conditioning
        name: "Power Conditioning",
        spec: "Bridge Rectifier & Capacitor",
        description: "Converts the generator's fluctuating output into a stable DC voltage."
    },
    {
        icon: <CircuitBoard className="h-8 w-8 text-primary" />,
        name: "Charging Module",
        spec: "TP4056-based board",
        description: "Safely manages the charging process to protect the Li-ion batteries from overcharging."
    }
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
          The "FinSight"
        </h1>
        <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl animate-glow">
          Smart Tag: A Conceptual Design
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
            src="/images/circuit_image.png"
            alt="Conceptual Shark Tag Design"
            width={600}
            height={400}
            data-ai-hint="futuristic device"
            className="rounded-lg border-2 border-primary/30 shadow-2xl neon-glow object-cover"
          />
        </motion.div>
        <div className="text-slate-300 space-y-4 text-center lg:text-left">
            <h2 className="font-headline text-2xl text-primary">Mission Briefing</h2>
            <p>The "FinSight" Smart Tag is a next-generation animal telemetry device designed to overcome the primary limitations of current tracking technology: battery life and data granularity. Its mission is to provide long-term, high-fidelity data on shark movement and behavior by integrating a comprehensive sensor suite with a novel energy harvesting system.</p>
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

      <div className="relative z-10 w-full max-w-4xl mx-auto py-16 text-slate-200">
        <h2 className="font-headline text-3xl text-center font-bold text-white mb-10 animate-glow">The Story of Our Project: Decoding the Hunt</h2>
        
        <div className="space-y-8 text-sm sm:text-base text-slate-300">
          <div>
            <h3 className="font-headline text-xl text-primary mb-2">The Mission: From Dots on a Map to Actionable Insight</h3>
            <p>Our mission began with a fundamental challenge in marine biology: we can track sharks from space, but we can't easily know what they're doing. The "Movements of blue sharks" dataset gave us thousands of satellite pings—dots on a map showing where sharks have been. But to protect a species, we need to protect their critical habitats, especially the feeding grounds where they sustain themselves. Our goal was to transform those simple dots into a predictive map of behavior, answering the question: "Can we use AI to find a shark's dining room in the vastness of the ocean?"</p>
          </div>
          
          <div>
            <h3 className="font-headline text-xl text-primary mb-2">The Initial Challenge: An AI That Couldn't Learn</h3>
            <p>We began by processing the raw data, calculating each shark's speed and turning angle to create our own labels for "Traveling" versus "Foraging" behavior. We then fed this data into standard machine learning models.</p>
            <p className="mt-2">The initial results were not promising. With accuracies hovering around 60-65%, our models were barely better than a coin flip. We tried different architectures, from Random Forests to complex Neural Networks, but we consistently hit a wall. This told us a crucial lesson: the problem wasn't the model's ability to learn; it was the simplicity of the information we were giving it. The AI was looking at a single snapshot in time and couldn't see the full story.</p>
          </div>

          <div>
            <h3 className="font-headline text-xl text-primary mb-2">The Breakthrough: Teaching the AI to See Context</h3>
            <p>The turning point came with advanced feature engineering. We realized that a shark's current behavior is deeply connected to its recent behavior. We developed a script to create over 20 new features for every single data point, giving our model the context it was missing. These included:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li><b>Rolling Statistics:</b> Instead of just one speed reading, the model could now see the average speed and the variability of turning over the last 30 minutes. A high variability in turning is a huge indicator of hunting.</li>
              <li><b>Movement Dynamics:</b> We added features like speed_change and movement_efficiency to describe the shark's motion in more detail.</li>
              <li><b>Cyclical Time:</b> We encoded the time of day and month of the year so the model could learn daily and seasonal patterns.</li>
            </ul>
            <p className="mt-2">Simultaneously, we tackled the severe class imbalance in our data using the SMOTETomek technique, which gave our model a balanced curriculum to learn from. Armed with this richer, cleaner data, we tested our models again. This time, a Light Gradient Boosting Machine (LightGBM), after extensive tuning, produced a breakthrough.</p>
          </div>

          <div>
            <h3 className="font-headline text-xl text-primary mb-2">The Result: A High-Fidelity Predictive Map</h3>
            <p>Our final, tuned LightGBM model achieved 77.4% accuracy. More importantly, it became truly effective at identifying the rare "Foraging" events, with a balanced 62% precision and 63% recall. We had successfully built a reliable "brain."</p>
            <p className="mt-2">To make this result useful, we used our model to predict the probability of foraging across thousands of points in the North Atlantic. We used geospatial filtering to remove all landmasses, ensuring our map was geographically accurate. The final output was a GeoJSON file, which we visualized as a dynamic, interactive heatmap using Leaflet.js—the centerpiece of our project.</p>
          </div>

          <div>
            <h3 className="font-headline text-xl text-primary mb-2">The Vision for the Future: The "FinSight" Smart Tag</h3>
            <p>This entire process highlighted the limits of current telemetry data. To truly push beyond 80% or 90% accuracy, we need better, more direct data from the animal itself. This led to the final component of our project: the conceptual design for the "FinSight" Smart Tag.</p>
            <p className="mt-2">This next-generation device features a comprehensive suite of sensors and, most notably, a hydro-powered energy harvesting system. By using a micro-turbine to recharge its batteries as the shark swims, the tag's operational life could be extended from months to years. This design represents the future of marine research, enabling the long-term, high-fidelity data collection needed to truly protect these magnificent ocean predators.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

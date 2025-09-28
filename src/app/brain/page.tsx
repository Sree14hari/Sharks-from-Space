
'use client';

import Link from 'next/link';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../../../public/json/Brain.json';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const specs = [
  {
    label: 'Model Architecture',
    value: 'Light Gradient Boosting Machine (LightGBM)',
  },
  {
    label: 'Input Features',
    value: 'A set of 20+ engineered features, including movement dynamics, rolling statistics of speed/turning angle, and cyclical time representations.',
  },
  {
    label: 'Training Strategy',
    value: 'Class imbalance was handled using the SMOTETomek resampling technique.',
  },
  {
    label: 'Optimization',
    value: "The model's hyperparameters were tuned using RandomizedSearchCV.",
  },
  {
    label: 'Final Accuracy',
    value: '77.4%',
  },
  {
    label: '"Foraging" Class Performance',
    value: '62% Precision and 63% Recall.',
  },
  {
    label: 'Output',
    value: 'The model generates a probability score (from 0.0 to 1.0) indicating the likelihood of foraging behavior for any given location and time.',
  },
];

export default function BrainPage() {
  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-4 sm:p-8"
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

      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="inline-flex items-center text-red-500 transition-colors hover:text-red-400">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        <div className="w-full max-w-md lg:max-w-lg">
          <Lottie animationData={animationData} loop={true} />
        </div>
        
        <Card className="w-full max-w-md bg-neutral-900/50 backdrop-blur-sm border-neutral-700/50 text-slate-200">
          <CardHeader className="flex flex-row items-center gap-4">
            <BrainCircuit className="h-6 w-6 text-red-500" />
            <CardTitle className="text-xl font-headline text-white">The AI Brain: Technical Specs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="font-semibold text-red-400">{spec.label}</p>
                <p className="text-slate-300">{spec.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

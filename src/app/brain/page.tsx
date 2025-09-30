
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, BarChart, Radar } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from 'recharts';
import Lottie from 'lottie-react';
import animationData from '../../../public/json/Brain.json';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

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

const chartContainerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.5,
    },
  },
};

const chartItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BrainPage() {
  const [chartData, setChartData] = useState([]);
  const [radarData, setRadarData] = useState([]);

  const chartsRef = React.useRef(null);
  const isInView = useInView(chartsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    fetch('/json/hotspots.geojson')
      .then((response) => response.json())
      .then((data) => {
        const probabilities = data.features.map(
          (feature: any) => feature.properties.foraging_prob
        );
        
        // Prepare data for Bar Chart
        const bins = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
        const binnedData = bins.slice(0, -1).map((binStart, index) => {
          const binEnd = bins[index + 1];
          const count = probabilities.filter(
            (p: number) => p >= binStart && p < binEnd
          ).length;
          return {
            name: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`,
            count: count,
          };
        });
        setChartData(binnedData as any);

        // Prepare data for Radar Chart
        const highConfidenceCount = probabilities.filter((p: number) => p > 0.8).length;
        const mediumConfidenceCount = probabilities.filter((p: number) => p > 0.6 && p <= 0.8).length;
        const lowConfidenceCount = probabilities.filter((p: number) => p > 0.4 && p <= 0.6).length;
        const totalPoints = probabilities.length;
        
        setRadarData([
          { subject: 'High Confidence (>0.8)', value: highConfidenceCount, fullMark: totalPoints },
          { subject: 'Medium Confidence (0.6-0.8)', value: mediumConfidenceCount, fullMark: totalPoints },
          { subject: 'Low Confidence (0.4-0.6)', value: lowConfidenceCount, fullMark: totalPoints },
          { subject: 'Highest Density', value: Math.max(...binnedData.map(d => d.count)), fullMark: Math.max(...binnedData.map(d => d.count)) },
        ] as any);

      });
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-y-auto p-4 sm:p-8">
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
      
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl min-h-[80vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      <motion.div
        ref={chartsRef}
        className="relative z-10 w-full max-w-6xl mt-16 lg:mt-24 space-y-12"
        variants={chartContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={chartItemVariants}>
          <Card className="bg-neutral-900/50 backdrop-blur-sm border-neutral-700/50 text-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <BarChart className="h-6 w-6 text-red-500" />
              <CardTitle className="text-xl font-headline text-white">Foraging Probability Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                    <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
                    <Tooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" name="Data Points" barSize={30} className="neon-glow" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={chartItemVariants}>
          <Card className="bg-neutral-900/50 backdrop-blur-sm border-neutral-700/50 text-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <Radar className="h-6 w-6 text-red-500" />
              <CardTitle className="text-xl font-headline text-white">Hotspot Confidence Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="hsl(var(--muted) / 0.5)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fill: 'transparent' }} />
                    <RechartsRadar name="Value" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.6)" fillOpacity={0.6} className="neon-glow" />
                    <Tooltip content={<ChartTooltipContent />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

    
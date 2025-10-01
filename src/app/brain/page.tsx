
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, BarChart, Radar, ChevronDown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from 'recharts';
import Lottie from 'lottie-react';
import animationData from '../../../public/json/Brain.json';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';

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
    fetch('/hotspots.geojson') // Make sure this path is correct for your project
      .then((response) => response.json())
      .then((data) => {
        // The property in your GeoJSON is named 'probability'
        const probabilities = data.features.map(
          (feature: any) => feature.properties.probability 
        );
        
        // Filter out any invalid probability values
        const validProbabilities = probabilities.filter((p: number | null | undefined) => p != null && !isNaN(p));

        // --- CHANGE IS HERE: We've created more detailed bins between 0.8 and 1.0 ---
        const bins = [0.84, 0.86, 0.88, 0.90, 0.92, 0.94, 0.96, 0.98, 1.01]; // Use 1.01 to ensure 1.0 is included
        
        const binnedData = bins.slice(0, -1).map((binStart, index) => {
          const binEnd = bins[index + 1];
          const count = validProbabilities.filter(
            (p: number) => p >= binStart && p < binEnd
          ).length;
          return {
            name: `${binStart.toFixed(2)}-${binEnd.toFixed(2)}`, // Display with more precision
            count: count,
          };
        });
        setChartData(binnedData as any);

        // Radar chart logic remains the same
        const highConfidenceCount = validProbabilities.filter((p: number) => p > 0.8).length;
        const mediumConfidenceCount = validProbabilities.filter((p: number) => p > 0.6 && p <= 0.8).length;
        const lowConfidenceCount = validProbabilities.filter((p: number) => p > 0.4 && p <= 0.6).length;
        const totalPoints = validProbabilities.length;
        
        const maxBinnedCount = Math.max(...binnedData.map(d => d.count), 0);

        setRadarData([
          { subject: 'High Confidence (>0.8)', value: highConfidenceCount, fullMark: totalPoints },
          { subject: 'Medium Confidence (0.6-0.8)', value: mediumConfidenceCount, fullMark: totalPoints },
          { subject: 'Low Confidence (0.4-0.6)', value: lowConfidenceCount, fullMark: totalPoints },
          { subject: 'Peak Density', value: maxBinnedCount, fullMark: maxBinnedCount > 0 ? maxBinnedCount : 1 },
        ] as any);

      })
      .catch(error => console.error("Error fetching or parsing GeoJSON:", error));
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-y-auto p-4 sm:p-6 md:p-8">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <Link href="/" className="inline-flex items-center text-primary transition-all hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <CyberpunkHover text="Back to Home" />
        </Link>
      </div>
      
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-6xl min-h-[90vh] pt-16 sm:pt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <Lottie animationData={animationData} loop={true} />
        </div>
        
        <Card className="w-full max-w-md bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 text-slate-200">
          <CardHeader className="flex flex-row items-center gap-4">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg sm:text-xl font-headline text-white">The AI Brain: Technical Specs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="font-semibold text-primary">{spec.label}</p>
                <p className="text-slate-300">{spec.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <ChevronDown className="h-8 w-8 text-slate-400/50" />
        </motion.div>

      </motion.div>

      <motion.div
        ref={chartsRef}
        className="relative z-10 w-full max-w-6xl mt-16 space-y-12"
        variants={chartContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={chartItemVariants}>
          <Card className="bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 text-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <BarChart className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg sm:text-xl font-headline text-white">Foraging Probability Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }} />
                    <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }} />
                    <Tooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" name="Data Points" barSize={20} className="neon-glow" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-xs sm:text-sm text-slate-300 mt-4 p-4 sm:px-6 sm:pb-6">
                This bar chart breaks down the distribution of our model's high-confidence predictions. Each bar represents a narrow probability range (e.g., 0.90-0.92) and shows the number of hotspots predicted within that specific range. This visualization highlights that when our model identifies a potential hotspot, it often does so with a very high degree of certainty, as shown by the concentration of data in the upper ranges.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={chartItemVariants}>
          <Card className="bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 text-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <Radar className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg sm:text-xl font-headline text-white">Hotspot Confidence Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="hsl(var(--muted) / 0.5)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fill: 'transparent' }} />
                    <RechartsRadar name="Value" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.6)" fillOpacity={0.6} className="neon-glow" />
                    <Tooltip content={<ChartTooltipContent />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-xs sm:text-sm text-slate-300 mt-4 p-4 sm:px-6 sm:pb-6">
                This radar chart provides a high-level summary of the model's confidence. Each axis represents a different metric: the total number of hotspots predicted at 'High' (&gt;80%), 'Medium' (60-80%), and 'Low' (40-60%) confidence levels. The 'Peak Density' axis shows the count from the single most populated bin in the bar chart above. Together, these points give an at-a-glance understanding of the overall predictive patterns.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

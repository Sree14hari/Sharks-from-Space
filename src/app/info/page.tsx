
'use client';

import Link from 'next/link';
import { ArrowLeft, Target, ClipboardList, Database, BrainCircuit, Cpu, AreaChart, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';

const MotionCard = motion(Card);

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

const sections = [
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: 'Project Mission',
    content: `To effectively protect vulnerable shark populations, we first need to understand their behavior. This project leverages machine learning to analyze raw satellite tracking data of blue sharks, aiming to identify and predict their elusive foraging hotspots in the North Atlantic. By transforming movement data into behavioral insights, we can provide a valuable tool for marine conservation, helping to identify key areas that may require protection.`,
  },
  {
    icon: <ClipboardList className="h-6 w-6 text-primary" />,
    title: 'Methodology',
    content: `This project followed a complete data science pipeline, transforming raw data points into an interactive, predictive map.`,
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: '1. Data Source & Preparation',
    content: `The foundation of this project is the publicly available "Movements of blue sharks in the North Atlantic Ocean using satellite telemetry, 2014-2017" dataset. Raw CSV files containing timestamped latitude and longitude pings were loaded, cleaned, and unified into a single dataset.`,
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: '2. Advanced Feature Engineering',
    content: `To allow a machine learning model to understand behavior, we engineered a rich set of features from the raw tracking data, including: Movement Dynamics, Rolling Statistics, Cyclical Time Features, and Advanced Metrics to give the model the deepest possible insight into the shark's recent activity.`,
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: '3. Machine Learning Model',
    content: `After experimenting with multiple architectures—including Random Forests, Artificial Neural Networks (ANNs), and sequential LSTMs—a LightGBM (Light Gradient Boosting Machine) model provided the best performance. It achieved 77.4% accuracy with a well-balanced precision and recall on the crucial "Foraging" class.`,
  },
  {
    icon: <AreaChart className="h-6 w-6 text-primary" />,
    title: '4. Interactive Visualization',
    content: `The model's predictions were exported as a GeoJSON file containing the probability of foraging at thousands of points across the North Atlantic. This data is rendered on the website as a dynamic and interactive heatmap using the Leaflet.js library, with "X" markers highlighting the most intense hotspot zones.`,
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: 'Key Technologies Used',
    content: 'Python, Pandas, NumPy, Scikit-learn, LightGBM, imblearn, Leaflet.js, GeoJSON',
  },
];

export default function InfoPage() {
  return (
    <motion.div
      className="relative min-h-screen w-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "public/images/world.png",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center text-primary transition-colors hover:text-primary/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <CyberpunkHover text="Back to Home" />
        </Link>
        
        <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl animate-glow">
          AI for Ocean Predators
        </h1>
        <h2 className="mt-2 font-headline text-xl text-primary sm:text-2xl">
          Predicting Shark Foraging Hotspots
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((section, i) => (
            <MotionCard
              key={section.title}
              className="bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 transform transition-all duration-300 hover:bg-neutral-900/70 hover:scale-105"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {section.icon}
                <CardTitle className="text-xl font-headline text-white">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-slate-300">
                <p>{section.content}</p>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

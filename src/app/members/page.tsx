
'use client';

import Link from 'next/link';
import { ArrowLeft, User, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';
import Image from 'next/image';

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

const members = [
  {
    name: 'John Doe',
    role: 'Lead AI Engineer',
    avatar: 'https://picsum.photos/seed/1/200/200',
    bio: 'Specializing in deep learning and predictive modeling for ecological systems. John designed the core architecture of the shark tracking AI.',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Jane Smith',
    role: 'Data Scientist & Marine Biologist',
    avatar: 'https://picsum.photos/seed/2/200/200',
    bio: 'Bridging the gap between data and marine conservation. Jane curated the dataset and provided critical biological insights for feature engineering.',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Alex Johnson',
    role: 'Full-Stack Developer',
    avatar: 'https://picsum.photos/seed/3/200/200',
    bio: 'Bringing the data to life. Alex developed the interactive map visualization and the overall web application interface.',
    linkedin: '#',
    github: '#',
  },
    {
    name: 'Emily White',
    role: 'UI/UX Designer',
    avatar: 'https://picsum.photos/seed/4/200/200',
    bio: 'Crafting intuitive and engaging user experiences. Emily designed the futuristic aesthetic and ensured the platform is both beautiful and functional.',
    linkedin: '#',
    github: '#',
  },
];

export default function MembersPage() {
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
          backgroundImage: "url('/images/world.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-slate-200 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center text-primary transition-all hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <CyberpunkHover text="Back to Home" />
        </Link>
        
        <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl animate-glow">
          Meet the Researchers
        </h1>
        <h2 className="mt-2 font-headline text-lg text-primary sm:text-2xl">
          The Minds Behind the Mission
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {members.map((member, i) => (
            <MotionCard
              key={member.name}
              className="bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 text-slate-200 overflow-hidden transform transition-all duration-300 hover:bg-neutral-900/70 hover:scale-105"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <CardHeader className="flex flex-col items-center gap-4 p-6 text-center bg-neutral-950/30">
                <Image src={member.avatar} alt={member.name} width={100} height={100} className="rounded-full border-2 border-primary/50" />
                <div>
                    <CardTitle className="text-xl font-headline text-white">{member.name}</CardTitle>
                    <p className="text-sm text-primary">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm sm:text-base text-slate-300 mb-4">{member.bio}</p>
                <div className="flex justify-center gap-4">
                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-all hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]">
                        <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-all hover:drop-shadow-[0_0_8px_hsl(var(--foreground))]">
                        <Github className="h-6 w-6" />
                    </Link>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

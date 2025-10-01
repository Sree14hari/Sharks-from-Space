
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
    name: 'Sreehari R',
    role: 'Lead AI Engineer and Web Dev',
    avatar: '/images/sreehari.png',
    bio: 'Machine Learning |Deep Learning | Flutter | CSE (AI & ML) Undergrad Sree Buddha College of engineering',
    linkedin: 'https://www.linkedin.com/in/sree14hari',
    github: 'https://github.com/Sree14hari',
  },
  {
    name: 'Abhinav R',
    role: 'AI Enthusiast & Designer ',
    avatar: '/images/abhinav.jpg',
    bio: 'Graphic Designer | AI & ML | CSE (AI & ML) Undergrad Sree Buddha College of engineering',
    linkedin: 'https://www.linkedin.com/in/abhinav-r-a2b970286',
    github: '#',
  },
  {
    name: 'Avanthika T',
    role: 'Lead Hardware & Systems Architect',
    avatar: '/images/minnu.jpg',
    bio: 'Circuit Design | Embedded Systems | Sensor Integration | ECE Undergrad at Undergrad Sree Buddha College of engineering',
    linkedin: 'https://www.linkedin.com/in/avanthika08t/',
    github: '#',
  },
    {
    name: 'Devasena.S.P',
    role: 'Hardware & Systems Architect',
    avatar: '/images/dev.jpg',
    bio: 'Circuit design | Embedded system | Sensor integration | ECE Undergrad at Undergrad Sree Buddha College of engineering',
    linkedin: 'https://www.linkedin.com/in/devasena-s-p-3b666534a',
    github: '#',
  },
  {
    name: 'Riya Mansoor',
    role: 'Electronics Design | Power Systems',
    avatar: '/images/riya.jpg',
    bio: 'Circuit design | Embedded system | Sensor integration | ECE Undergrad at Undergrad Sree Buddha College of engineering',
    linkedin: 'https://www.linkedin.com/in/riya-mansoor-3bb06234a/',
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
                <p className="text-sm sm:text-base text-slate-300 mb-4 text-center">{member.bio}</p>
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

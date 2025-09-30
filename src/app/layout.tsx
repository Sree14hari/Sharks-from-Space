
'use client';

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import useSound from "@/hooks/use-sound";
import { SoundProvider } from "@/hooks/use-sound-context";
import VolumeControl from "@/components/ui/volume-control";
import LoadingScreen from "@/components/ui/loading-screen";
import { AnimatePresence, motion } from "framer-motion";

function SoundInitializer({ children }: { children: React.ReactNode }) {
  useSound(); // Hook to enable sound effects
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Shark from Space</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>
        
        <SoundProvider>
          <SoundInitializer>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              transition={{ delay: loading ? 0 : 3, duration: 1 }}
            >
              {!loading && (
                <>
                  {children}
                  <VolumeControl />
                </>
              )}
            </motion.div>
          </SoundInitializer>
        </SoundProvider>
        <Toaster />
      </body>
    </html>
  );
}

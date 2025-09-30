
'use client';

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import useSound from "@/hooks/use-sound";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useSound(); // Hook to enable sound effects

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

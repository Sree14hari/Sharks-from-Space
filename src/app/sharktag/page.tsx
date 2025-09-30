
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader, Shark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CyberpunkHover from '@/components/ui/cyberpunk-hover';
import { identifyShark, IdentifySharkOutput } from '@/ai/flows/shark-tag-flow';
import Image from 'next/image';

export default function SharkTagPage() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdentifySharkOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };
  
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image file.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const photoDataUri = await fileToDataUri(file);
      const aiResult = await identifyShark({
        photoDataUri,
        description,
      });
      setResult(aiResult);
    } catch (err) {
      setError('AI analysis failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };


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
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="font-headline text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl animate-glow">
          AI Shark Identifier
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base md:text-lg max-w-2xl">
          Upload an image of a shark to have our AI model identify its species and provide fascinating details.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card className="bg-neutral-900/50 backdrop-blur-[1px] border-neutral-700/50 text-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-headline text-white"><Upload /> Submit for Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-primary mb-2">Shark Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-neutral-700 hover:border-primary transition-all">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                          <Image src={previewUrl} alt="Preview" width={400} height={200} className="mx-auto h-32 w-auto object-contain rounded-md" />
                      ) : (
                        <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      <div className="flex text-sm text-slate-500">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary hover:text-white">
                          <span>Upload a file</span>
                          <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">Optional Description</label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., 'Spotted in the Atlantic, approx 3 meters long.'"
                    className="bg-neutral-950/50 border-neutral-700 focus:border-primary focus:ring-primary"
                  />
                </div>
                 <Button type="submit" className="w-full text-lg font-nav" disabled={isLoading}>
                  {isLoading ? <><Loader className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</> : "Submit to AI"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <AnimatePresence>
        {isLoading && (
            <motion.div
                className="flex flex-col items-center justify-center space-y-4 md:mt-24"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <Loader className="h-16 w-16 text-primary animate-spin" />
                <p className="text-primary font-nav">AI is analyzing the image...</p>
            </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
              <Card className="bg-neutral-900/50 backdrop-blur-[1px] border-primary/50 text-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline text-white"><Shark /> Analysis Complete</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary">Identified Species</h3>
                    <p className="text-lg text-white">{result.identification.speciesName}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Confidence Score</h3>
                    <p className="text-lg text-white">{(result.identification.confidence * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Interesting Facts</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      {result.facts.map((fact, index) => <li key={index}>{fact}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Conservation Status</h3>
                    <p className="text-slate-300">{result.conservationStatus}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {error && (
             <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
              <Card className="bg-destructive/20 border-destructive text-destructive-foreground">
                <CardHeader>
                  <CardTitle>Analysis Failed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{error}</p>
                </CardContent>
              </Card>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

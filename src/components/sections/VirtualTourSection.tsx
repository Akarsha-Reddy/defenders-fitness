'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Dynamically import Pannellum to avoid SSR issues with window
const PannellumWrapper = dynamic(() => import('@/components/ui/PannellumWrapper'), {
  ssr: false,
});

const HOTSPOTS = [
  { label: 'Equipment Floor', yaw: 0, pitch: 0 },
  { label: 'Free Weights', yaw: 90, pitch: -10 },
  { label: 'Boxing Ring', yaw: 180, pitch: 0 },
  { label: 'Locker Rooms', yaw: -90, pitch: 5 },
];

export default function VirtualTourSection() {
  // Toggle this flag when a real equirectangular image is added to public/images/tour/tour.jpg
  const HAVE_REAL_TOUR = false; 

  const [viewpoint, setViewpoint] = useState({ yaw: 0, pitch: 0 });

  return (
    <section id="tour" className="relative w-full bg-[#0A0A0A] py-24 md:py-32 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 z-10 flex flex-col items-center">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[4px] mb-4"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C9A84C' }}
          >
            Virtual Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="uppercase leading-none text-white max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            ENTER THE <span style={{ color: '#E94560' }}>FORTRESS.</span>
          </motion.h2>
        </div>

        {/* 360 Viewer Container */}
        <div className="w-full relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden border border-[#2A2A3E] bg-[#1A1A2E] shadow-2xl">
          
          {/* Rotating 360 Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center w-14 h-14 bg-black/50 backdrop-blur-md rounded-full shadow-lg">
              <span className="text-white font-bold leading-none" style={{ fontFamily: 'var(--font-hero)', fontSize: '18px' }}>
                360&deg;
              </span>
              <div 
                className="absolute inset-0" 
                style={{
                  border: '2px dashed #E94560',
                  borderRadius: '50%',
                  animation: 'spin-badge 8s linear infinite',
                }}
              />
            </div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin-badge { 
              100% { transform: rotate(360deg); } 
            }
          `}} />

          {HAVE_REAL_TOUR ? (
            <PannellumWrapper 
              image="/images/tour/tour.jpg"
              yaw={viewpoint.yaw}
              pitch={viewpoint.pitch}
            />
          ) : (
            /* Placeholder State */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm p-6 text-center z-10">
              <div className="mb-6 p-4 rounded-full bg-[#E94560]/10 text-[#E94560]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <h3 className="text-white text-2xl md:text-3xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-head)' }}>
                Full 360° tour coming soon — visit us in Vijaya Bank Layout
              </h3>
              <p className="text-[#AAAAAA] max-w-lg mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                We are currently capturing an immersive panoramic experience of our facility. Check back shortly to explore the gym floor digitally.
              </p>
              
              {/* Developer Note */}
              <div className="max-w-md mx-auto p-4 border border-[#C9A84C]/30 bg-[#C9A84C]/5 rounded font-mono text-xs text-[#C9A84C] text-left">
                <strong>[DEV NOTE]</strong><br/>
                Shoot 360° with Google Photosphere or Ricoh Theta. Drop equirectangular JPG in <code className="text-white bg-black/20 px-1 py-0.5 rounded">public/images/tour/tour.jpg</code> and toggle <code>HAVE_REAL_TOUR = true</code> in VirtualTourSection.tsx.
              </div>
            </div>
          )}

          {/* Fallback pattern background if pannellum isn't active */}
          {!HAVE_REAL_TOUR && (
            <div className="absolute inset-0 opacity-[0.4]" style={{
               backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0a 100%)'
            }} />
          )}

          {/* Instruction Text Overlay */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <span className="bg-black/80 backdrop-blur text-[#D0D0D0] text-sm uppercase tracking-widest px-6 py-2 rounded-full border border-white/10 shadow-xl" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              Drag to look around &middot; Click hotspots to explore
            </span>
          </div>

        </div>

        {/* Hotspot Controls UI (Below the viewer) */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TooltipProvider delay={100}>
            {HOTSPOTS.map((hotspot) => (
              <Tooltip key={hotspot.label}>
                <TooltipTrigger
                  render={
                    <Button 
                      variant="outline" 
                      className="border-[#2A2A3E] text-[#AAAAAA] hover:text-white hover:border-[#E94560] bg-[#12121E] transition-all rounded-none uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                      onClick={() => {
                        if (!HAVE_REAL_TOUR) {
                          alert("The 360 Tour is coming soon! These hotspots will navigate the real viewer once added.");
                        } else {
                          setViewpoint({ yaw: hotspot.yaw, pitch: hotspot.pitch });
                        }
                      }}
                    />
                  }
                >
                  {hotspot.label}
                </TooltipTrigger>
                <TooltipContent className="bg-[#E94560] text-white border-none font-mono text-xs tracking-wider uppercase">
                  Jump to {hotspot.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

      </div>
    </section>
  );
}

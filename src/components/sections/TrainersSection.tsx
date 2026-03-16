'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trainers } from '@/lib/data/trainers';

// ─────────────────────────────────────────────
// Trainer Card with 3D Tilt, Hover Border, and Slide-Up Panel
// ─────────────────────────────────────────────
function TrainerCard({ trainer, index }: { trainer: typeof trainers[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Spring
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { damping: 30, stiffness: 300 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }}
      className="w-full h-full perspective-[1200px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative aspect-square w-full rounded-none overflow-hidden group cursor-pointer"
      >
        {/* Aceternity Moving Border effect (simulated via conic gradient spin on padded container) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 0deg, transparent 60%, #C9A84C 100%)',
              animation: 'border-beam-spin 3s linear infinite',
            }}
          />
        </div>

        {/* Inner Card Container (1px padding to show border) */}
        <div className="absolute inset-[1.5px] z-10 bg-[#0A0A0A] overflow-hidden">
          
          {/* Main Portrait Image */}
          <Image
            src={trainer.image || '/images/placeholder/trainer.svg'} // Fallback if specific doesn't exist
            alt={trainer.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:blur-[2px]"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Default Info (Bottom, visible when NOT hovered) */}
          <motion.div
            className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end"
            animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(30px)' }}
          >
            <p
              className="mb-1"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: '#C9A84C',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {trainer.specialty}
            </p>
            <h3
              className="leading-none text-white"
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(28px, 3vw, 36px)',
              }}
            >
              {trainer.name}
            </h3>
          </motion.div>

          {/* Slide-up Details Panel (visible on hover) */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-full p-6 flex flex-col justify-center bg-[#0A0A0A]/90 backdrop-blur-sm border-t border-[#C9A84C]/20"
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? '0%' : '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'translateZ(40px)' }}
          >
            <h3
              className="mb-2 text-white leading-none"
              style={{ fontFamily: 'var(--font-hero)', fontSize: '32px' }}
            >
              {trainer.name}
            </h3>
            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#E94560',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {trainer.experience} Experience
            </p>

            <ul className="space-y-3 mb-8">
              {trainer.certifications.map((cert, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: isHovered ? 0.2 + i * 0.1 : 0 }}
                  className="flex items-start gap-2 text-[#D0D0D0]"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}
                >
                  <Award className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                  <span>{cert}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              className="w-full h-12 rounded-none bg-white text-[#E94560] hover:bg-[#E94560] hover:text-white transition-colors uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-hero)', fontSize: '16px' }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://wa.me/919XXXXXXXXX?text=Hi, I'd like to book a session with ${trainer.name}`, '_blank');
              }}
            >
              Book Session
            </Button>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Trainers Section
// ─────────────────────────────────────────────
export default function TrainersSection() {
  return (
    <section
      id="trainers"
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="uppercase tracking-[4px] mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#C9A84C',
              }}
            >
              Expert Roster
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="uppercase leading-none text-white max-w-2xl"
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(40px, 5vw, 64px)',
              }}
            >
              MEET YOUR <span style={{ color: '#E94560' }}>COMMANDERS.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="rounded-none border-white/20 text-white hover:bg-white/5 uppercase tracking-[2px]"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}
            >
              View Full Schedule <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* 4-col Grid Desktop / Horizontal Scroll Mobile */}
        <motion.div
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible gap-4 pb-12 lg:pb-0 snap-x snap-mandatory hide-scrollbar"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trainers.map((trainer, idx) => (
            <div key={trainer.id} className="min-w-[85vw] sm:min-w-[320px] lg:min-w-0 snap-center shrink-0 lg:shrink">
              <TrainerCard trainer={trainer} index={idx} />
            </div>
          ))}
        </motion.div>

      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}

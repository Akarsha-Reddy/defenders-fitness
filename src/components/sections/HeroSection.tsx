'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Dynamic import of Three.js canvas (ssr: false)
const GymParticleField = dynamic(
  () => import('@/components/three/GymParticleField'),
  { ssr: false }
);

// ─────────────────────────────────────────────
// Wavy SVG underline for "LEGACY"
// ─────────────────────────────────────────────
function WavyUnderline() {
  return (
    <svg
      className="absolute -bottom-3 left-0 w-full h-4"
      viewBox="0 0 300 12"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M0,6 C20,-2 40,14 60,6 C80,-2 100,14 120,6 C140,-2 160,14 180,6 C200,-2 220,14 240,6 C260,-2 280,14 300,6"
        stroke="#E94560"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Scroll indicator at bottom-center
// ─────────────────────────────────────────────
function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0, 1]),
    { stiffness: 300, damping: 30 }
  );

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span
        className="text-[10px] uppercase tracking-[4px] text-white/40"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Scroll
      </span>
      <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#E94560] origin-top"
          style={{ scaleY, height: '100%' }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Slider Data
// ─────────────────────────────────────────────
const SLIDER_IMAGES = [
  '/images/banner/vf_Finally_it’s_time_❤️💪🏻💥__Event_details____Date__1st_November_2025_Timing___6pm_to_7pm_Address__6th_cross,_Kodichikkanahalli_road,_above_Sri_Bhagya__18500.jpeg',
  '/images/banner/vf_Finally_it’s_time_❤️💪🏻💥__Event_details____Date__1st_November_2025_Timing___6pm_to_7pm_Address__6th_cross,_Kodichikkanahalli_road,_above_Sri_Bhagya__22500.jpeg',
  '/images/banner/vf_Finally_it’s_time_❤️💪🏻💥__Event_details____Date__1st_November_2025_Timing___6pm_to_7pm_Address__6th_cross,_Kodichikkanahalli_road,_above_Sri_Bhagya__25000.jpeg',
  '/images/banner/vf_Welcome_to_Defenders_Fitness_🔥__—_where_your_transformation_begins!_💪__DM_to_know_more_💥✅_10000.jpeg',
  '/images/banner/vf_Welcome_to_Defenders_Fitness_🔥__—_where_your_transformation_begins!_💪__DM_to_know_more_💥✅_13500.jpeg',
];

// ─────────────────────────────────────────────
// Main Hero Section
// ─────────────────────────────────────────────
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [videoExists, setVideoExists] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Check if hero video exists
  useEffect(() => {
    fetch('/videos/Defender-Fitness.mp4', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setVideoExists(true);
      })
      .catch(() => { });
  }, []);

  // Auto-swipe right side images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GSAP load timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline words animate in
      const words = headlineRef.current?.querySelectorAll('.hero-word');
      if (words && words.length > 0) {
        tl.from(words, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
        }, 0);
      }

      // Sub fades in
      if (subRef.current) {
        tl.from(subRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
        }, 0.8);
      }

      // CTAs slide up
      if (ctaRef.current) {
        tl.from(ctaRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
        }, 1.1);
      }

      // ScrollTrigger: parallax at 0.4x
      if (headlineRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (headlineRef.current) {
              headlineRef.current.style.transform = `translateY(${progress * 40}%)`;
            }
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#080808]"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Layer 1: Aurora atmospheric layer ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(233,69,96,0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(201,168,76,0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* ── Layer 2: Three.js Particle Field ── */}
      {/* <Suspense fallback={null}>
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <GymParticleField />
        </div>
      </Suspense> */}

      {/* ── Main Content Container: 3-column Grid ── */}
      <div className="relative z-10 w-full h-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8 px-4 sm:px-8 py-24 xl:px-16">
        
        {/* 1. Left side: Video */}
        <div className="w-full h-full max-h-[50vh] xl:max-h-[60vh] flex items-center justify-center pt-10 lg:pt-0">
          {videoExists ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-[#E94560]/10 border border-[#2A2A3E]/50">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/Defender-Fitness.mp4" type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="w-full h-full border border-dashed border-[#2A2A3E] rounded-2xl flex items-center justify-center text-[#AAAAAA] text-sm uppercase tracking-widest font-mono p-4 text-center">
              Video Placeholder
            </div>
          )}
        </div>

        {/* 2. Center: Headline & CTAs */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Eyebrow */}
          <motion.p
            className="mb-4 xl:mb-6"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#C9A84C',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            VIJAYA BANK LAYOUT · BENGALURU
          </motion.p>

          {/* Headline */}
          <div ref={headlineRef} className="overflow-hidden">
            <h1 className="flex flex-col items-center leading-none">
              <span className="flex gap-2 sm:gap-3">
                <span
                  className="hero-word text-[60px] sm:text-[90px] xl:text-[130px] text-white"
                  style={{ fontFamily: 'var(--font-hero)', lineHeight: 1 }}
                >
                  FORGE
                </span>
                <span
                  className="hero-word text-[60px] sm:text-[90px] xl:text-[130px] text-white"
                  style={{ fontFamily: 'var(--font-hero)', lineHeight: 1 }}
                >
                  YOUR
                </span>
              </span>
              <span className="relative inline-block mt-0">
                <span
                  className="hero-word text-[100px] sm:text-[150px] xl:text-[190px]"
                  style={{
                    fontFamily: 'var(--font-hero)',
                    color: '#E94560',
                    lineHeight: 0.9,
                  }}
                >
                  LEGACY
                </span>
                <WavyUnderline />
              </span>
            </h1>
          </div>

          {/* Sub text */}
          <p
            ref={subRef}
            className="mt-6 md:mt-8 text-sm sm:text-base xl:text-lg max-w-sm text-balance"
            style={{
              fontFamily: 'var(--font-body)',
              color: '#AAAAAA',
            }}
          >
            Elite training. Real results. No excuses.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-8 flex flex-col gap-4 w-full sm:w-auto px-4 sm:px-0">
            <ShimmerButton
              className="h-12 sm:h-14 px-8 w-full"
              background="#E94560"
              shimmerColor="#C9A84C"
            >
              <span
                className="text-white tracking-[0.08em]"
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: '16px',
                }}
              >
                START FREE TRIAL
              </span>
            </ShimmerButton>

            <Button
              variant="outline"
              className="h-12 sm:h-14 px-8 w-full border-white/40 text-white hover:bg-white/5 rounded-none uppercase tracking-[0.08em]"
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: '16px',
              }}
            >
              WATCH THE TOUR
            </Button>
          </div>
        </div>

        {/* 3. Right side: Auto-Swiping Image Banner */}
        <div className="relative w-full h-full min-h-[40vh] max-h-[50vh] xl:max-h-[60vh] pb-20 lg:pb-0 overflow-hidden rounded-2xl shadow-2xl shadow-[#E94560]/10 border border-[#2A2A3E]/50">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, x: 50, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={SLIDER_IMAGES[currentSlideIndex]}
                fill
                alt={`Highlight banner ${currentSlideIndex + 1}`}
                className="object-cover"
              />
              {/* Overlay Gradient to blend with background if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent pointer-events-none" />
              
              {/* Overlay Text placeholder on banner */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h4 className="text-white font-mono text-xs tracking-widest uppercase mb-1">
                  Highlight {currentSlideIndex + 1}
                </h4>
                <div className="h-[2px] w-12 bg-[#E94560] mb-2" />
                <p className="text-sm font-medium text-[#AAAAAA] drop-shadow-md">
                  Discover more about Defenders Fitness facilities.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}

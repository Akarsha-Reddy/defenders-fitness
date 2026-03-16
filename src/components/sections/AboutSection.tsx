'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

// ─────────────────────────────────────────────
// Animated Number Counter (replaces Magic UI
// Number Ticker — same spec, no extra dep)
// ─────────────────────────────────────────────
interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  triggered: boolean;
}

function AnimatedCounter({ to, suffix = '', duration = 1800, triggered }: CounterProps) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * to));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggered, to, duration]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────
interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  triggered: boolean;
}

function StatCard({ value, suffix, label, triggered }: StatProps) {
  return (
    <div className="flex flex-col items-start">
      <span
        className="leading-none tabular-nums"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(36px, 4.5vw, 56px)',
          color: '#C9A84C',
        }}
      >
        <AnimatedCounter to={value} suffix={suffix} triggered={triggered} />
      </span>
      <span
        className="mt-1 uppercase tracking-[3px]"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: '#666666',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Image card with react-spring hover lift
// ─────────────────────────────────────────────
function HoverImage({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    y: hovered ? -4 : 0,
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div
      style={{ ...style, y: spring.y }}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </animated.div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  // Framer Motion slide variants
  const slideLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const slideRight = {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-32"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20 lg:items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex-1 flex flex-col"
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Eyebrow */}
            <p
              className="mb-5 uppercase tracking-[4px]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#C9A84C',
              }}
            >
              Our Story
            </p>

            {/* Heading */}
            <h2
              className="mb-6 leading-none uppercase"
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(40px, 5vw, 60px)',
                color: '#ffffff',
              }}
            >
              Built for Defenders.{' '}
              <span style={{ color: '#E94560' }}>Designed</span> for Results.
            </h2>

            {/* Gradient separator */}
            <div
              className="mb-8 h-px w-40"
              style={{
                background: 'linear-gradient(to right, #E94560, transparent)',
              }}
            />

            {/* Body paragraphs */}
            <div
              className="flex flex-col gap-5 mb-10 max-w-lg"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: '#AAAAAA',
                lineHeight: 1.75,
              }}
            >
              <p>
                Defenders Fitness was born from a simple belief: elite training isn't just for
                professional athletes. Everyone who walks through our doors deserves world-class
                coaching, premium equipment, and a community that pushes them further than they
                thought possible.
              </p>
              <p>
                Located in the heart of Vijaya Bank Layout, Bengaluru, we've been transforming
                lives since 2016. Our science-backed programs blend strength, conditioning, and
                recovery into a single, seamless experience tailored to every individual.
              </p>
              <p>
                Whether you're a first-time gym-goer or a seasoned athlete, we meet you where
                you are — and take you somewhere you've never been.
              </p>
            </div>

            {/* Stats row */}
            <div ref={statsRef} className="flex gap-10 mb-10">
              <StatCard value={98} label="Members" triggered={statsInView} />
              <StatCard value={8} suffix="+" label="Years" triggered={statsInView} />
              <StatCard value={12} label="Trainers" triggered={statsInView} />
            </div>

            {/* Founder blockquote */}
            <blockquote
              className="pl-5 py-1"
              style={{
                borderLeft: '4px solid #C9A84C',
                maxWidth: '460px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: '#D0D0D0',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                }}
              >
                "We didn't build a gym. We built a fortress — where ordinary people come to
                become extraordinary."
              </p>
              <footer
                className="mt-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#C9A84C',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                — Founder, Defenders Fitness
              </footer>
            </blockquote>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            className="flex-1 relative min-h-[520px] lg:min-h-[640px]"
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* about-main: large, top-left */}
            <HoverImage
              src="/images/placeholder/about-main.svg"
              alt="Defenders Fitness main gym floor"
              className="absolute top-0 left-0 w-[72%] h-[58%] overflow-hidden"
              style={{ position: 'absolute' }}
            />

            {/* about-2: overlaps main, slight rotation */}
            <HoverImage
              src="/images/placeholder/about-2.svg"
              alt="Personal training session at Defenders Fitness"
              className="absolute top-[30%] right-0 w-[52%] h-[44%] overflow-hidden"
              style={{
                position: 'absolute',
                transform: 'rotate(2deg)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                zIndex: 2,
              }}
            />

            {/* about-3: bottom left, gold left border */}
            <HoverImage
              src="/images/placeholder/about-3.svg"
              alt="Defenders Fitness community class"
              className="absolute bottom-0 left-[8%] w-[48%] h-[36%] overflow-hidden"
              style={{
                position: 'absolute',
                borderLeft: '6px solid #C9A84C',
                zIndex: 1,
              }}
            />

            {/* EST. badge */}
            <div
              className="absolute top-[48%] left-[56%] z-10 flex flex-col items-center justify-center px-4 py-3"
              style={{
                background: 'rgba(10,10,10,0.92)',
                border: '1px solid rgba(201,168,76,0.3)',
                transform: 'rotate(-4deg)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: '#C9A84C',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                }}
              >
                Est.
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontSize: '28px',
                  color: '#C9A84C',
                  lineHeight: 1,
                }}
              >
                2016
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

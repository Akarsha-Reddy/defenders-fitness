'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/data/services';

// ─────────────────────────────────────────────
// Service Card with 3D Tilt & Hover Border Gradient
// ─────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: typeof services[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Tilt logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { damping: 30, stiffness: 300 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }}
      style={{ perspective: 1000 }}
      className="h-full w-full block"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full rounded-[4px] p-8 flex flex-col items-start transition-shadow duration-300"
      >
        {/* Base Background & Border */}
        <div
          className="absolute inset-0 rounded-[4px] pointer-events-none z-0 transition-shadow duration-500 will-change-transform"
          style={{
            background: '#1E1E2E',
            border: '1px solid #2A2A3E',
            boxShadow: hovered ? '0 0 24px rgba(201,168,76,0.3)' : 'none',
          }}
        />

        {/* Hover Border Gradient pseudo-element */}
        <div
          className="absolute inset-0 rounded-[4px] pointer-events-none z-0 overflow-hidden"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 0deg, transparent 60%, #C9A84C 100%)',
              animation: 'border-beam-spin 3s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px', // Border width equivalent
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* CSS for gradient spin animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes border-beam-spin {
            from { transform: rotate(0deg) scale(1.5); }
            to { transform: rotate(360deg) scale(1.5); }
          }
        `}} />

        {/* Content (Z-10, pushed forward in 3D space) */}
        <div className="relative z-10 w-full" style={{ transform: 'translateZ(30px)' }}>
          {/* Icon Square */}
          <div
            className="w-12 h-12 rounded flex items-center justify-center mb-6 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #E94560 0%, #C9A84C 100%)',
            }}
          >
            <motion.div
              animate={{ rotate: hovered ? 180 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          <h3
            className="mb-3 text-white tracking-wide"
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: '20px',
              textTransform: 'none', // Assuming Space Grotesk SemiBold shouldn't strictly be uppercase like Bebas
              fontWeight: 600,
            }}
          >
            {service.title}
          </h3>

          <p
            className="mb-8"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#9CA3AF', // matches muted
              lineHeight: 1.6,
            }}
          >
            {service.description}
          </p>

          <div className="mt-auto pt-2 flex items-center text-[#E94560] font-medium text-sm transition-colors group cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>
            <span className="group-hover:text-[#C9A84C] transition-colors">Learn More</span>
            <motion.div
              animate={{ x: hovered ? 4 : 0 }}
              className="ml-1 flex items-center group-hover:text-[#C9A84C] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Services Section
// ─────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-32"
    >
      {/* CSS grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-24">
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
            OUR SERVICES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="uppercase leading-none text-white mx-auto max-w-2xl"
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: 'clamp(40px, 5vw, 64px)',
            }}
          >
            TRAIN LIKE A <span style={{ color: '#E94560' }}>PRO.</span><br />
            RECOVER LIKE AN <span style={{ color: '#C9A84C' }}>ATHLETE.</span>
          </motion.h2>
        </div>

        {/* 3-col Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((svc, idx) => (
            <ServiceCard key={svc.id} service={svc} index={idx} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

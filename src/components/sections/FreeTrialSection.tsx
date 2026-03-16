'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

// shadcn/ui components
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

// React Bits Noise overlay
import Noise from '@/components/ui/react-bits/Noise';

// ─────────────────────────────────────────────
// Zod schema — Indian mobile number
// ─────────────────────────────────────────────
const schema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
});
type FormValues = z.infer<typeof schema>;

// ─────────────────────────────────────────────
// Trust badges
// ─────────────────────────────────────────────
const BADGES = [
  'Cancel Anytime',
  'All Equipment',
  'Trainer Guidance',
  'First Week Free',
];

// ─────────────────────────────────────────────
// Border Beam (inline — no external dep)
// ─────────────────────────────────────────────
function BorderBeam() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-none overflow-hidden"
    >
      <span
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 40%, rgba(233,69,96,0.6) 60%, transparent 80%)',
          animation: 'border-beam-spin 3s linear infinite',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />
      <style>{`
        @keyframes border-beam-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </span>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function FreeTrialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phone: '' },
  });

  // Fire confetti from CTA button
  function fireConfetti() {
    if (!ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x, y },
      colors: ['#E94560', '#C9A84C', '#ffffff'],
      zIndex: 9999,
    });
  }

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch('/api/trial-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: data.phone }),
      });

      if (!res.ok) throw new Error('Server error');

      // Success
      fireConfetti();
      form.reset();
      toast.success("Welcome to Defenders Fitness! 🎉", {
        description: "We'll call you shortly to confirm your free trial.",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or WhatsApp us directly.",
      });
    }
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="free-trial"
        className="relative w-full overflow-hidden"
        style={{ minHeight: '480px' }}
        aria-label="Start your free 7-day trial"
      >
        {/* ── Left panel ── */}
        <motion.div
          className="absolute inset-0 flex items-center"
          style={{
            background: '#1A1A2E',
            clipPath: 'polygon(0 0, 78% 0, 68% 100%, 0 100%)',
            zIndex: 1,
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.04 }}>
            <Noise patternAlpha={255} patternRefreshInterval={3} />
          </div>

          {/* Border Beam on left panel */}
          <BorderBeam />

          {/* Left content — shifted left of the clip boundary */}
          <div className="relative z-10 px-10 md:px-16 lg:px-24 py-16 max-w-[65%]">
            <h2
              className="mb-4 leading-none uppercase"
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                color: '#ffffff',
              }}
            >
              START YOUR FREE<br />7-DAY TRIAL
            </h2>

            <p
              className="mb-8 max-w-md"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: '#AAAAAA',
                lineHeight: 1.6,
              }}
            >
              No lock-ins. No credit card. Just show up.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {BADGES.map((label) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="flex items-center gap-1.5 border-white/20 text-white bg-white/5 px-3 py-1.5 text-[13px] rounded-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: '#C9A84C' }}
                  />
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right panel ── */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center"
          style={{
            background: '#E94560',
            width: '42%',
            zIndex: 0,
          }}
          initial={{ x: '100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="w-full px-10 md:px-12 py-16 max-w-sm mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Phone field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="Your mobile number"
                          className="h-14 rounded-none border-0 border-b-2 border-white/40 bg-transparent text-white text-lg placeholder:text-white/50 focus:border-white  focus-visible:ring-0 focus-visible:ring-offset-0"
                          style={{ fontFamily: 'var(--font-body)' }}
                        />
                      </FormControl>
                      <FormMessage className="text-white/80 text-sm" />
                    </FormItem>
                  )}
                />

                {/* CTA button */}
                <button
                  ref={ctaBtnRef}
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-14 mt-2 cursor-pointer uppercase tracking-widest transition-all duration-200 active:scale-95 hover:bg-white/90 disabled:opacity-60"
                  style={{
                    background: '#ffffff',
                    color: '#E94560',
                    fontFamily: 'var(--font-hero)',
                    fontSize: '18px',
                    border: 'none',
                    letterSpacing: '0.1em',
                  }}
                >
                  {form.formState.isSubmitting
                    ? 'SENDING...'
                    : 'CLAIM MY FREE TRIAL'}
                </button>

                {/* WhatsApp fallback */}
                <a
                  href="https://wa.me/919XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-1 text-white/80 hover:text-white transition-colors text-[14px]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Or WhatsApp us →
                </a>
              </form>
            </Form>
          </div>
        </motion.div>
      </section>

      {/* Toast provider */}
      <Toaster />
    </>
  );
}

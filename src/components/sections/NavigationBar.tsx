'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { X, Menu, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/index';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Plans', href: '#plans' },
  { label: 'Contact', href: '#contact' },
];

const SCROLL_THRESHOLD = 80;

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/defendersfitness/' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
];

// ─────────────────────────────────────────────
// ScrollProgressBar
// ─────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: '#E94560',
      }}
    />
  );
}

// ─────────────────────────────────────────────
// AnnouncementStrip
// ─────────────────────────────────────────────
function AnnouncementStrip({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      key="strip"
      initial={{ height: 'auto', opacity: 1 }}
      exit={{
        height: 0,
        opacity: 0,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      }}
      className="overflow-hidden"
    >
      <div
        className="relative flex items-center justify-center px-4 py-2.5 text-center"
        style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,168,76,0.2)' }}
      >
        {/* Gold shimmer text */}
        <p
          className="text-xs sm:text-sm font-medium tracking-widest uppercase"
          style={{
            color: '#C9A84C',
            fontFamily: 'var(--font-head, sans-serif)',
            letterSpacing: '0.12em',
          }}
        >
          🛡️&nbsp; FREE 7-DAY TRIAL — No Credit Card Required &nbsp;🛡️
        </p>

        {/* Dismiss button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-[#C9A84C] hover:text-white hover:bg-transparent opacity-70 hover:opacity-100"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Desktop Nav Link with clip-path underline
// ─────────────────────────────────────────────
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="nav-link group relative px-1 py-0.5 text-[11px] font-medium uppercase tracking-[2px] text-[#F0F0F0]/80 transition-colors duration-300 hover:text-white"
      style={{ fontFamily: 'var(--font-head, var(--font-body, sans-serif))' }}
    >
      {label}
      {/* Clip-path underline draws from left */}
      <span
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        style={{ background: '#E94560' }}
        aria-hidden
      />
    </a>
  );
}

// ─────────────────────────────────────────────
// Mobile Sheet Link (stagger child)
// ─────────────────────────────────────────────
const mobileChildVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.div variants={mobileChildVariants}>
      <a
        href={href}
        onClick={onClick}
        className="block py-3 text-2xl uppercase tracking-[0.12em] text-white/80 hover:text-white transition-colors border-b border-white/5"
        style={{ fontFamily: 'var(--font-hero, sans-serif)' }}
      >
        {label}
      </a>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function NavigationBar() {
  const [stripVisible, setStripVisible] = useState(false);
  const [stripDismissed, setStripDismissed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // ── sessionStorage: read dismissed state on mount ──
  useEffect(() => {
    const dismissed = sessionStorage.getItem('df-strip-dismissed') === 'true';
    setStripDismissed(dismissed);
    // Show strip after small delay (avoids layout flash)
    if (!dismissed) {
      setStripVisible(true);
    }
  }, []);

  // ── Track scroll threshold ──
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      setScrolled(v > SCROLL_THRESHOLD);
    });
    return unsubscribe;
  }, [scrollY]);

  // ── Animated nav style values ──
  const navBackground = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD, SCROLL_THRESHOLD + 20],
    ['rgba(10,10,10,0)', 'rgba(10,10,10,0)', 'rgba(10,10,10,0.88)']
  );
  const navBlur = useTransform(
    scrollY,
    [SCROLL_THRESHOLD, SCROLL_THRESHOLD + 20],
    ['blur(0px)', 'blur(20px)']
  );
  const navBorder = useTransform(
    scrollY,
    [SCROLL_THRESHOLD, SCROLL_THRESHOLD + 20],
    ['rgba(233,69,96,0)', 'rgba(233,69,96,0.3)']
  );

  function handleDismiss() {
    setStripDismissed(true);
    sessionStorage.setItem('df-strip-dismissed', 'true');
  }

  return (
    <>
      {/* ── Scroll Progress Bar (absolute top of viewport) ── */}
      <ScrollProgressBar />

      {/* ── Wrapper: announcement + nav stacked ── */}
      <div className="fixed top-[2px] left-0 right-0 z-50">
        {/* ── Announcement Strip ── */}
        <AnimatePresence initial={false}>
          {stripVisible && !stripDismissed && (
            <AnnouncementStrip onDismiss={handleDismiss} />
          )}
        </AnimatePresence>

        {/* ── NavBar ── */}
        <motion.nav
          style={{
            background: navBackground,
            backdropFilter: navBlur,
            WebkitBackdropFilter: navBlur,
            borderBottomColor: navBorder,
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
          }}
          className="relative flex items-center justify-between px-4 md:px-8 lg:px-12 py-3"
        >
          {/* ── LEFT: Logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" aria-label="Defenders Fitness Home">
              <Image 
                src='/logo/logo-full.svg' width={160} height={56}
                alt='Defenders Fitness' priority className='hidden md:block object-contain' />
              <Image 
                src='/logo/logo-icon.svg' width={40} height={40}
                alt='Defenders Fitness' className='block md:hidden object-contain' />
            </Link>
          </motion.div>

          {/* ── CENTER: Nav Links (desktop) ── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* ── RIGHT: CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* CTA Button (desktop) */}
            <ShimmerButton
              className="hidden md:inline-flex items-center h-10"
              background="#E94560"
              shimmerColor="#C9A84C"
              onClick={() => {}}
              aria-label="Join Free Trial"
            >
              <span
                className="text-white font-medium tracking-[0.08em]"
                style={{
                  fontFamily: 'var(--font-hero, sans-serif)',
                  fontSize: '18px',
                }}
              >
                JOIN FREE TRIAL
              </span>
            </ShimmerButton>

            {/* Hamburger (mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 h-9 w-9"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile Sheet Drawer ── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[360px] border-l border-white/10 bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Image
              src="/logo/logo-full.svg"
              width={140}
              height={48}
              alt="Defenders Fitness"
              className="object-contain"
            />
          </SheetHeader>

          {/* Staggered nav links */}
          <motion.div
            className="flex flex-col flex-1"
            initial="hidden"
            animate={mobileOpen ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
          >
            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => setMobileOpen(false)}
              />
            ))}

            {/* CTA inside sheet */}
            <motion.div
              variants={mobileChildVariants}
              className="mt-8"
            >
              <ShimmerButton
                className="w-full justify-center h-12"
                background="#E94560"
                shimmerColor="#C9A84C"
                aria-label="Join Free Trial"
              >
                <span
                  className="text-white tracking-[0.08em]"
                  style={{ fontFamily: 'var(--font-hero, sans-serif)', fontSize: '20px' }}
                >
                  JOIN FREE TRIAL
                </span>
              </ShimmerButton>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={mobileChildVariants}
              className="mt-auto pt-8 flex items-center gap-5 border-t border-white/10"
            >
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/50 hover:text-[#E94560] transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </>
  );
}

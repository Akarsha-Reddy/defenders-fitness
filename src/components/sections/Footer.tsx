'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  MessageCircle, 
  Send,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/defendersfitness/', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/91XXXXXXXXXX', label: 'WhatsApp' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Plans', href: '#plans' },
  { name: 'Contact', href: '#contact' },
];

const openingHours = [
  { day: 'Mon-Sat', time: '5:30 AM – 10:00 PM' },
  { day: 'Sunday', time: '6:00 AM – 8:00 PM' },
  { day: 'Public Holidays', time: '7:00 AM – 8:00 PM' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        toast.error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A2E] pt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Column 1: Logo & Social */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <Link href="/" className="inline-block transform transition-transform hover:scale-105 origin-left">
              <Image src='/logo/logo-full.svg' width={180} height={64}
                alt='Defenders Fitness' className='object-contain mb-4' />
            </Link>
            <p className="text-[#AAAAAA] text-sm leading-relaxed max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>
              Built for Defenders. Designed for Results. Join the community and transform your life with expert guidance and premium facilities.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-[#1A1A2E] border border-[#2A2A3E] flex items-center justify-center text-[#AAAAAA] transition-all hover:bg-[#E94560] hover:text-white hover:border-[#E94560]"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-[#AAAAAA] text-sm transition-colors hover:text-[#E94560]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Opening Hours */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              Opening Hours
            </h4>
            <div className="flex flex-col gap-4">
              {openingHours.map((item) => (
                <div key={item.day} className="flex flex-col gap-1">
                  <span className="text-[#E94560] text-xs font-mono uppercase tracking-widest">
                    {item.day}
                  </span>
                  <span className="text-white text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              Get Fitness Tips
            </h4>
            <p className="text-[#AAAAAA] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Subscribe to get latest gym updates, health tips, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative group">
                <Input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="bg-[#1A1A2E] border-[#2A2A3E] text-white rounded-none h-12 focus:border-[#E94560] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#E94560] text-white hover:bg-[#D4344E] rounded-none h-12 uppercase tracking-widest font-bold transition-all"
                style={{ fontFamily: 'var(--font-head)' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing
                  </>
                ) : (
                  <>
                    Subscribe <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1A1A2E] py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#AAAAAA] text-xs font-mono tracking-wider">
            &copy; 2026 Defenders Fitness. All rights reserved.
          </p>
          <p className="text-[#AAAAAA] text-xs font-mono tracking-wider flex items-center gap-2">
            Made with strength in Bengaluru <span className="text-[#E94560]">💪</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

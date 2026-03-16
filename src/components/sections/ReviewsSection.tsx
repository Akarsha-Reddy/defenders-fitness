'use client';

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceDetails, Review } from '@/app/api/reviews/route';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Helper to truncate text
const truncate = (str: string, length: number) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// ─────────────────────────────────────────────
// Single Review Card
// ─────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[350px] md:w-[420px] shrink-0 p-6 rounded-2xl bg-[#12121E] border border-[#2A2A3E] relative flex flex-col justify-between shadow-lg">
      
      {/* Header: Avatar, Name, Stars */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <Avatar className="w-12 h-12 border border-[#C9A84C]/20">
            <AvatarImage src={review.profile_photo_url} alt={review.author_name} />
            <AvatarFallback className="bg-[#1A1A2E] text-white" style={{ fontFamily: 'var(--font-head)' }}>
              {review.author_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white font-bold leading-none mb-1" style={{ fontFamily: 'var(--font-head)' }}>
              {review.author_name}
            </span>
            <span className="text-[#AAAAAA] text-xs font-mono tracking-widest uppercase">
              {review.relative_time_description}
            </span>
          </div>
        </div>
        
        {/* Google Badge (Visual placeholder) */}
        <Badge variant="outline" className="border-none bg-black/40 text-white/80 gap-1 px-2 py-0.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>
          <span className="text-[#4285F4] font-bold text-sm leading-none">G</span> Review
        </Badge>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < review.rating ? 'fill-[#C9A84C] text-[#C9A84C]' : 'fill-transparent text-[#2A2A3E]'}`} 
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-[#D0D0D0] text-sm leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-body)' }}>
        "{truncate(review.text, 180)}"
      </p>

    </div>
  );
}

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
export default function ReviewsSection() {
  const { data, isLoading } = useSWR<PlaceDetails>('/api/reviews', fetcher);

  // Default aggregate stats while loading
  const rating = data?.rating || 4.9;
  const totalReviews = data?.user_ratings_total || 400;
  const reviewsSafe = data?.reviews || [];

  // Duplicate reviews for infinite scroll illusion if we have less than 10
  // to ensure smooth continuous marquee filling the screen
  const infiniteReviewsList = [...reviewsSafe, ...reviewsSafe, ...reviewsSafe].slice(0, 15);

  return (
    <section id="reviews" className="relative w-full bg-[#0A0A0A] py-24 md:py-32 overflow-hidden border-t border-[#1A1A2E]">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        background: 'radial-gradient(circle at 100% 50%, #E94560 0%, transparent 40%), radial-gradient(circle at 0% 50%, #C9A84C 0%, transparent 40%)',
        filter: 'blur(100px)'
      }} />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        
        {/* Header Title (Centered Top) */}
        <div className="text-center mb-16 px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[4px] mb-4 flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C9A84C' }}
          >
            <Quote className="w-4 h-4" /> Word on the Street
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="uppercase leading-none text-white max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            NOTHING BUT <span style={{ color: '#E94560' }}>RESULTS.</span>
          </motion.h2>
        </div>

        {/* Aggregate Stats Area */}
        <div className="flex flex-col items-center justify-center mb-20 px-6">
          <div className="flex items-center gap-6 md:gap-8 mb-6">
            
            {/* The Huge Rating Number */}
            <span 
              className="text-[#C9A84C] tracking-tighter"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: 1 }}
            >
              {isLoading ? (
                <span>-.-</span>
              ) : (
                <CountUp end={rating} decimals={1} duration={2} />
              )}
            </span>

            <div className="flex flex-col gap-2">
              {/* 5 Filled Gold Stars */}
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-[#C9A84C] text-[#C9A84C] drop-shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
                ))}
              </div>
              <p className="text-[#AAAAAA] uppercase tracking-widest text-xs md:text-sm font-mono mt-1">
                Based on <span className="text-white font-bold">{totalReviews}</span> Google Reviews
              </p>
            </div>

          </div>

          <Button 
            className="bg-white text-[#E94560] hover:bg-[#E94560] hover:text-white transition-colors duration-300 rounded-none h-14 px-8 uppercase tracking-[3px] shadow-[0_4px_20px_rgba(233,69,96,0.2)]"
            style={{ fontFamily: 'var(--font-hero)', fontSize: '18px' }}
            onClick={() => window.open('https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4', '_blank')}
          >
            Write a Review
          </Button>
        </div>

        {/* Infinite Moving Cards Strip */}
        <div className="relative w-full overflow-hidden flex pt-4 pb-12 mask-edges">
          {isLoading ? (
             <div className="w-full flex justify-center py-10">
               <div className="w-8 h-8 rounded-full border-t-2 border-[#C9A84C] animate-spin" />
             </div>
          ) : reviewsSafe.length === 0 ? (
             <div className="w-full text-center text-[#AAAAAA] py-10 font-mono text-sm">No reviews found.</div>
          ) : (
            <motion.div 
              className="flex gap-6 px-6"
              animate={{ x: [0, -2000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {infiniteReviewsList.map((review, i) => (
                <ReviewCard key={`rev-${i}`} review={review} />
              ))}
            </motion.div>
          )}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Fades out the left and right edges of the scrolling strip naturally */
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
}

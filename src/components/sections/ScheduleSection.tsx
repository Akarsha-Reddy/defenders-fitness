'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ScheduleClass } from '@/lib/data/schedule';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
type DayTuple = typeof DAYS[number];
const CATEGORIES = ['All', 'Strength', 'Cardio', 'HIIT', 'Boxing', 'Yoga'] as const;

// ─────────────────────────────────────────────
// Class Card Component
// ─────────────────────────────────────────────
function ClassCard({ cls }: { cls: ScheduleClass }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const spotsLeft = cls.maxSpots - cls.currentEnrollment;
  const isFull = spotsLeft <= 0;

  let badgeColor = 'bg-[#10B981] text-white hover:bg-[#10B981]/90'; // Green
  let spotsText = `${spotsLeft} Spots Left`;

  if (isFull) {
    badgeColor = 'bg-[#E94560] text-white hover:bg-[#E94560]/90'; // Red
    spotsText = 'Full';
  } else if (spotsLeft <= 5) {
    badgeColor = 'bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90'; // Amber
    spotsText = `Only ${spotsLeft} Left!`;
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate booking API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      toast.success(`Successfully booked ${cls.title}!`, {
        description: `Your spot for ${cls.time} on ${cls.day} is confirmed.`,
      });
    }, 1000);
  };

  return (
    <Card className="bg-[#1A1A2E]/80 border-[#2A2A3E] backdrop-blur-sm hover:border-[#E94560]/50 transition-colors">
      <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Time & Title Info */}
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <span
              className="text-[#E94560] leading-none"
              style={{ fontFamily: 'var(--font-hero)', fontSize: '28px' }}
            >
              {cls.time.split(' ')[0]}
            </span>
            <span className="text-[#AAAAAA] text-sm font-bold uppercase mt-1">
              {cls.time.split(' ')[1]}
            </span>
          </div>
          
          <div className="h-12 w-px bg-[#2A2A3E] hidden md:block" />

          <div className="flex flex-col">
            <h4
              className="text-white text-xl font-bold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              {cls.title}
            </h4>
            <div className="flex items-center gap-3 text-sm text-[#AAAAAA]">
              <span>{cls.duration} Min</span>
              <span className="w-1 h-1 rounded-full bg-[#E94560]" />
              <span className="text-[#C9A84C] uppercase text-xs tracking-wider">{cls.category}</span>
            </div>
          </div>
        </div>

        {/* Trainer & Actions */}
        <div className="flex flex-row md:flex-col lg:flex-row items-center justify-between w-full md:w-auto gap-6 shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-[#2A2A3E] md:border-t-0">
          
          <div className="flex items-center gap-3 min-w-[140px]">
            <Avatar className="h-10 w-10 border border-[#C9A84C]/30">
              <AvatarImage src={cls.trainer.image} alt={cls.trainer.name} className="object-cover" />
              <AvatarFallback className="bg-[#0A0A0A] text-[#C9A84C]">
                {cls.trainer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-white font-medium">{cls.trainer.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={`${badgeColor} border-none pointer-events-none uppercase px-3 py-1 font-mono text-[10px] tracking-wider`}>
              {spotsText}
            </Badge>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger 
                render={
                  <Button
                    disabled={isFull}
                    className="bg-white text-[#E94560] hover:bg-[#E94560] hover:text-white transition-colors uppercase tracking-widest text-xs h-9 rounded-[4px] px-6"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  />
                }
              >
                Book
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#0A0A0A] border-[#2A2A3E] text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl" style={{ fontFamily: 'var(--font-hero)' }}>
                    Book <span className="text-[#E94560]">{cls.title}</span>
                  </DialogTitle>
                  <DialogDescription className="text-[#AAAAAA]">
                    Reserve your spot for {cls.day} at {cls.time}. Currently {spotsLeft} spots remaining.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBook} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-[#C9A84C]">Full Name</Label>
                    <Input id="name" required placeholder="John Doe" className="bg-[#1A1A2E] border-[#2A2A3E] text-white focus-visible:ring-[#E94560]" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-[#C9A84C]">Phone Number</Label>
                    <Input id="phone" type="tel" required placeholder="+91 90000 00000" className="bg-[#1A1A2E] border-[#2A2A3E] text-white focus-visible:ring-[#E94560]" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="mt-4 bg-[#E94560] text-white hover:bg-[#E94560]/90">
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Slide variants
// ─────────────────────────────────────────────
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

// ─────────────────────────────────────────────
// Main Schedule Section
// ─────────────────────────────────────────────
export default function ScheduleSection() {
  const { data: schedule, isLoading } = useSWR<ScheduleClass[]>('/api/schedule', fetcher);
  
  const [[activeDayIndex, direction], setDayState] = useState([0, 0]); // 0 = Mon
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All');

  const activeDay = DAYS[activeDayIndex];

  const handleDayChange = (newDay: string) => {
    const newIndex = DAYS.indexOf(newDay as DayTuple);
    if (newIndex === -1 || newIndex === activeDayIndex) return;
    setDayState([newIndex, newIndex > activeDayIndex ? 1 : -1]);
  };

  // Filter logic
  const filteredClasses = useMemo(() => {
    if (!schedule) return [];
    return schedule.filter((cls) => {
      const matchesDay = cls.day === activeDay;
      const matchesCategory = activeCategory === 'All' || cls.category === activeCategory;
      return matchesDay && matchesCategory;
    });
  }, [schedule, activeDay, activeCategory]);

  return (
    <section id="schedule" className="relative w-full bg-[#0A0A0A] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[4px] mb-4"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C9A84C' }}
          >
            Class Schedule
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="uppercase leading-none text-white max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            FIND YOUR <span style={{ color: '#E94560' }}>BATTLEGROUND.</span>
          </motion.h2>
        </div>

        {/* Day Tabs */}
        <div className="flex justify-center mb-12">
          <Tabs value={activeDay} onValueChange={handleDayChange} className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <TabsList className="bg-[#1A1A2E] border border-[#2A2A3E] h-14 p-1 rounded-full flex mx-auto w-max min-w-full sm:min-w-0">
              {DAYS.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="rounded-full px-6 text-sm font-medium transition-all data-[state=active]:bg-[#E94560] data-[state=active]:text-white text-[#AAAAAA] hover:text-white"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-mono transition-colors border ${
                activeCategory === cat
                  ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-[#2A2A3E] text-[#AAAAAA] hover:border-[#AAAAAA]/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schedule List Area (with AnimatePresence) */}
        <div className="relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-t-2 border-[#E94560] animate-spin" />
            </div>
          ) : (
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeDayIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full flex flex-col gap-4"
              >
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <ClassCard key={cls.id} cls={cls} />
                  ))
                ) : (
                  <div className="text-center py-20 text-[#AAAAAA] border border-dashed border-[#2A2A3E] rounded-xl flex flex-col items-center">
                    <p className="text-lg mb-2">No classes found for {activeDay}.</p>
                    <p className="text-sm">Try selecting a different category or day.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </section>
  );
}

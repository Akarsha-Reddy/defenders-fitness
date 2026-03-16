'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instagram, ArrowRight } from 'lucide-react';

import { LeaderboardEntry, Milestone, InstagramPost, milestones } from '@/lib/data/community';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CommunitySection() {
  const { data, isLoading } = useSWR('/api/community', fetcher);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const leaderboard: LeaderboardEntry[] = data?.leaderboard || [];
  const instagram: InstagramPost[] = data?.instagram || [];

  return (
    <section id="community" className="w-full bg-[#0A0A0A] py-24 md:py-32 overflow-hidden border-t border-[#1A1A2E]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[4px] mb-4"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C9A84C' }}
          >
            Join The Ranks
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="uppercase leading-none text-white mx-auto"
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            OUR COMM<span style={{ color: '#E94560' }}>UNITY.</span>
          </motion.h2>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <TabsList className="bg-[#1A1A2E] border border-[#2A2A3E] h-14 p-1 rounded-full flex mx-auto w-max min-w-full sm:min-w-0">
              <TabsTrigger
                value="leaderboard"
                className="rounded-full px-8 text-sm font-medium transition-all data-[state=active]:bg-[#E94560] data-[state=active]:text-white text-[#AAAAAA] hover:text-white"
              >
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="milestones"
                className="rounded-full px-8 text-sm font-medium transition-all data-[state=active]:bg-[#E94560] data-[state=active]:text-white text-[#AAAAAA] hover:text-white"
              >
                Milestones
              </TabsTrigger>
              <TabsTrigger
                value="instagram"
                className="rounded-full px-8 text-sm font-medium transition-all data-[state=active]:bg-[#E94560] data-[state=active]:text-white text-[#AAAAAA] hover:text-white"
              >
                Instagram
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[500px]">
          {isLoading && !hasMounted ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-t-2 border-[#E94560] animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">

              {/* TAB 1: LEADERBOARD =============================================== */}
              {activeTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl mx-auto"
                >
                  <p className="text-center text-[#AAAAAA] mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                    Top 5 members by check-ins this month. Pushing limits daily.
                  </p>

                  {/* Simulated Magic UI Animated List */}
                  <div className="flex flex-col gap-3">
                    <AnimatePresence>
                      {leaderboard.map((entry, index) => {
                        let rankDisplay = `${index + 1}th`;
                        if (index === 0) rankDisplay = '🥇';
                        if (index === 1) rankDisplay = '🥈';
                        if (index === 2) rankDisplay = '🥉';

                        return (
                          <motion.div
                            key={entry.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                            className="relative flex items-center justify-between p-4 md:p-5 rounded-lg bg-[#12121E] border border-[#2A2A3E] hover:border-[#C9A84C]/50 transition-colors group overflow-hidden"
                          >
                            <div className="flex items-center gap-4 md:gap-6 relative z-10">
                              <div className="w-10 text-center font-mono text-2xl">
                                {rankDisplay}
                              </div>
                              <div className="h-10 w-px bg-[#2A2A3E]" />
                              <div>
                                <h4 className="text-lg font-bold text-white leading-none mb-1" style={{ fontFamily: 'var(--font-head)' }}>
                                  {entry.firstName}
                                </h4>
                                <Badge variant="secondary" className="bg-[#1A1A2E] text-[#AAAAAA] font-mono text-[10px] tracking-wider uppercase border-[#2A2A3E]">
                                  {entry.goalBadge}
                                </Badge>
                              </div>
                            </div>

                            <div className="text-right relative z-10">
                              <span className="text-[#E94560] text-3xl font-bold leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                                <CountUp end={entry.checkIns} duration={2.5} />
                              </span>
                              <p className="text-[#AAAAAA] text-xs uppercase tracking-widest mt-1 font-mono">
                                Check-ins
                              </p>
                            </div>
                            
                            {/* Subtle hover gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button variant="ghost" className="text-[#C9A84C] hover:text-white hover:bg-transparent tracking-widest uppercase font-mono text-xs">
                      Want to make the board? Join now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MILESTONES =============================================== */}
              {activeTab === 'milestones' && (
                <motion.div
                  key="milestones"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto py-8"
                >
                  {/* Simulated Preline UI Timeline */}
                  <div className="relative pl-6 md:pl-0">
                    {/* Vertical line for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E94560] via-[#C9A84C] to-transparent transform -translate-x-1/2" />
                    {/* Vertical line for mobile */}
                    <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-[#E94560] via-[#C9A84C] to-transparent" />

                    {milestones.map((ms, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <div key={ms.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 last:mb-0`}>
                          
                          {/* Dot */}
                          <div className={`absolute left-[-5px] md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#1A1A2E] border-2 border-[#E94560] flex items-center justify-center text-sm z-10 shadow-[0_0_15px_rgba(233,69,96,0.3)]`}>
                            {ms.icon}
                          </div>

                          {/* Content Card (Magic UI Border Beam simulation) */}
                          <div className={`w-full md:w-[calc(50%-3rem)] pl-10 md:pl-0 ${!isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                            <motion.div
                              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-50px' }}
                              className="relative overflow-hidden bg-[#12121E] border border-[#2A2A3E]/50 rounded-xl p-6"
                            >
                              {/* Simulated Border Beam */}
                              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0" style={{
                                  background: 'conic-gradient(from 0deg, transparent 60%, rgba(201,168,76,0.4) 100%)',
                                  animation: 'border-beam-spin 4s linear infinite',
                                }} />
                              </div>
                              
                              <div className="relative z-10 bg-[#12121E]">
                                <span className="text-[#E94560] font-mono text-xs uppercase tracking-widest">{ms.date}</span>
                                <h4 className="text-white text-xl font-bold mt-2 leading-none" style={{ fontFamily: 'var(--font-head)' }}>{ms.title}</h4>
                                <Badge variant="outline" className="my-3 border-[#C9A84C]/30 text-[#C9A84C] bg-[#C9A84C]/5 text-[10px] uppercase font-mono tracking-wider">
                                  {ms.memberName}
                                </Badge>
                                <p className="text-[#AAAAAA] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                  {ms.story}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes border-beam-spin { 
                      100% { transform: rotate(360deg); } 
                    }
                  `}} />
                </motion.div>
              )}

              {/* TAB 3: INSTAGRAM =============================================== */}
              {activeTab === 'instagram' && (
                <motion.div
                  key="instagram"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center mb-10">
                    <p className="text-center text-[#AAAAAA] mb-6 max-w-lg" style={{ fontFamily: 'var(--font-body)' }}>
                      Vibes from the floor. Live updates, PRs, and behind the scenes footage directly from our Instagram.
                    </p>
                    <Button
                      className="bg-[#E94560] text-white hover:bg-[#E94560]/90 rounded-full px-8 uppercase tracking-widest mt-2"
                      onClick={() => window.open('https://www.instagram.com/defendersfitness/', '_blank')}
                    >
                      <Instagram className="w-4 h-4 mr-2" /> Follow @DefendersFitness
                    </Button>
                  </div>

                  {/* 3x2 Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {instagram.map((post, idx) => (
                      <motion.a
                        key={post.id}
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-[#1A1A2E] border border-[#2A2A3E]"
                      >
                        <Image
                          src={post.thumbnail}
                          alt={`Instagram post ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Instagram className="w-10 h-10 text-white" />
                        </div>
                        {/* Likes Badge */}
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/60 backdrop-blur border-none text-white gap-1.5 font-mono text-[10px] pointer-events-none">
                            <span className="text-[#E94560]">♥</span> {post.likes}
                          </Badge>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

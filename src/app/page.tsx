'use client';

import NavigationBar from "@/components/sections/NavigationBar";
import HeroSection from "@/components/sections/HeroSection";
import FreeTrialSection from "@/components/sections/FreeTrialSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TrainersSection from "@/components/sections/TrainersSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import FAQSection from "@/components/sections/FAQSection";
import VirtualTourSection from "@/components/sections/VirtualTourSection";
import CommunitySection from "@/components/sections/CommunitySection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main className="flex flex-col bg-background text-foreground">
        
        {/* Hero — full viewport */}
        <HeroSection />

        {/* Free Trial section */}
        <FreeTrialSection />

        {/* About section */}
        <AboutSection />

        {/* Services section */}
        <ServicesSection />

        {/* Trainers section */}
        <TrainersSection />

        {/* Schedule section */}
        <ScheduleSection />

        {/* FAQ section */}
        <FAQSection />

        {/* Virtual Tour section */}
        <VirtualTourSection />

        {/* Community section */}
        <CommunitySection />

        {/* Reviews section */}
        <ReviewsSection />

        {/* Final CTA Section */}
        <section className="py-24 px-8 md:px-24 text-center bg-[#0A0A0A] border-t border-[#1A1A2E]">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-hero mb-6 tracking-tighter leading-none text-white"
            style={{ fontFamily: 'var(--font-hero)' }}
          >
            READY TO JOIN THE <span className="text-[#E94560]">DEFENDERS?</span>
          </motion.h2>
          <p className="text-lg md:text-xl font-body text-[#AAAAAA] mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the elite training facility in Bengaluru. No lock-ins. No credit card. Just pure grit.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Button size="lg" className="bg-[#E94560] hover:bg-[#D4344E] text-white px-10 py-7 rounded-none font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#E94560]/20 text-lg">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-[#2A2A3E] text-white hover:bg-white hover:text-black px-10 py-7 rounded-none font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 text-lg">
              View Plans
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

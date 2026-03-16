'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/lib/data/faq';

export default function FAQSection() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <section id="faq" className="w-full bg-[#0A0A0A] py-24 md:py-32">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[4px] mb-4"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C9A84C' }}
          >
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="uppercase leading-none text-white mx-auto"
            style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            FREQUENTLY ASKED <span style={{ color: '#E94560' }}>QUESTIONS.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Accordion className="w-full flex flex-col gap-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none rounded overflow-hidden bg-[#12121e] transition-colors data-[state=open]:bg-[#1E1E2E] data-[state=open]:border-l-[4px] data-[state=open]:border-[#C9A84C]"
              >
                <AccordionTrigger
                  className="px-6 py-5 text-left text-white hover:no-underline hover:text-white"
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-6 text-[#AAAAAA]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    lineHeight: 1.6,
                  }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Global CSS for the default chevron provided by shadcn's AccordionTrigger to match the Gold requirement */}
      <style dangerouslySetInnerHTML={{ __html: `
        .lucide-chevron-down {
          color: #C9A84C !important;
          transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1) !important;
        }
      `}} />
    </section>
  );
}

"use client";
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text = "",
  className = "",
  delay = 0,
  animation = { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 },
  scrollTrigger = false,
  onComplete = () => {},
  tag = 'p',
  style = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [splitText, setSplitText] = useState<any>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const split = new GSAPSplitText(ref.current, { type: 'lines,words,chars' });
    setSplitText(split);

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger ? {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      } : undefined,
      onComplete
    });

    tl.from(split.chars, {
      ...animation,
      delay: delay,
    });

    return () => {
      split.revert();
    };
  }, { scope: ref, dependencies: [text, animation, delay, scrollTrigger] });

  const Tag = tag as any;
  return (
    <Tag ref={ref} style={style} className={`split-parent ${className}`}>
      {text}
    </Tag>
  );
};

export default SplitText;

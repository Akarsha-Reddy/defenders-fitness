"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltedCard = ({
  imageSrc,
  altText = "Tilted card image",
  captionText,
  containerHeight = 300,
  containerWidth = 300,
  imageHeight = 300,
  imageWidth = 300,
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: any) => {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [rotateAmplitude, -rotateAmplitude]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-rotateAmplitude, rotateAmplitude]), { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <figure
       ref={ref}
       className="relative perspective-[1000px] cursor-pointer"
       style={{ height: containerHeight, width: containerWidth }}
       onMouseMove={handleMouseMove}
       onMouseEnter={() => scale.set(scaleOnHover)}
       onMouseLeave={() => {
         scale.set(1);
         mouseX.set(0.5);
         mouseY.set(0.5);
       }}
    >
      <motion.div className="transform-style-3d relative w-full h-full" style={{ rotateX, rotateY, scale }}>
        <motion.img 
          src={imageSrc} 
          alt={altText} 
          className="rounded-xl object-cover absolute inset-0" 
          style={{ height: imageHeight, width: imageWidth }} 
        />
        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 transform translate-z-[20px]">
            {overlayContent}
          </div>
        )}
      </motion.div>
      {showTooltip && captionText && (
        <figcaption className="absolute text-center w-full mt-4 text-sm font-mono text-muted-foreground pointer-events-none">
          {captionText}
        </figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;

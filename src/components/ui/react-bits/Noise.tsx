"use client";
import React, { useRef, useEffect } from 'react';

const Noise = ({
  patternRefreshInterval = 2,
  patternAlpha = 15
}) => {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let frame = 0;
    let animationId: number;
    const canvasSize = 1024;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas 
      className="fixed inset-0 pointer-events-none z-[9999]" 
      ref={grainRef} 
      style={{ imageRendering: 'pixelated' }} 
    />
  );
};

export default Noise;

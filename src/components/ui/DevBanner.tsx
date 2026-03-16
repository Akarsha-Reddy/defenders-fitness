import React from 'react';

const DevBanner = () => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="bg-yellow-400 text-black text-[10px] font-bold py-1 px-4 flex items-center justify-center gap-2 select-none z-50 overflow-hidden">
      <span className="whitespace-nowrap uppercase tracking-widest">
        DEV MODE - PLACEHOLDER IMAGES IN USE
      </span>
      <div className="flex gap-4 animate-pulse">
        <span>⚠️</span>
        <span>⚠️</span>
        <span>⚠️</span>
      </div>
    </div>
  );
};

export default DevBanner;

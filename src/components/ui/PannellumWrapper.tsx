'use client';
import React, { useEffect, useRef } from 'react';

// Require Pannellum CSS if available (it might be in 'pannellum/src/css/pannellum.css' depending on the package)
import 'pannellum/build/pannellum.css'; 

export default function PannellumWrapper({
  image,
  yaw = 0,
  pitch = 0,
}: {
  image: string;
  yaw?: number;
  pitch?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    let viewer: any = null;

    const loadPannellum = async () => {
      // @ts-ignore - pannellum doesn't have official TS types in this version
      const pannellumModule = await import('pannellum');
      
      if (typeof window !== 'undefined' && (window as any).pannellum && containerRef.current) {
        viewer = (window as any).pannellum.viewer(containerRef.current.id, {
          type: 'equirectangular',
          panorama: image,
          autoLoad: true,
          yaw: yaw,
          pitch: pitch,
          mouseZoom: false,
          compass: false,
          showFullscreenCtrl: false,
        });
        viewerRef.current = viewer;
      }
    };

    loadPannellum();

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          console.warn("Error destroying pannellum viewer", e);
        }
      }
    };
  }, [image]);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.setYaw(yaw);
      viewerRef.current.setPitch(pitch);
    }
  }, [yaw, pitch]);

  return <div id="pannellum-tour-container" ref={containerRef} className="w-full h-full" />;
}

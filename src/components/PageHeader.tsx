"use client";

import { useEffect, useRef } from "react";

export default function PageHeader(): JSX.Element {
  const heroRef = useRef<HTMLElement>(null);
  const shutterLeftRef = useRef<HTMLDivElement>(null);
  const shutterRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !shutterLeftRef.current || !shutterRightRef.current) return;
      
      const scrollPos = window.scrollY;
      
      // Shutter Effect Trigger (match reference HTML logic)
      if (scrollPos > 100) {
        const progress = Math.min((scrollPos - 100) / 400, 1);
        shutterLeftRef.current.style.transform = `translateX(-${progress * 100}%)`;
        shutterRightRef.current.style.transform = `translateX(${progress * 100}%)`;
      } else {
        shutterLeftRef.current.style.transform = `translateX(0)`;
        shutterRightRef.current.style.transform = `translateX(0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      ref={heroRef}
      className="min-h-[280px] md:min-h-[380px] md:h-[460px] relative flex flex-col justify-center px-6 md:px-12 dot-grid border-b border-outline-variant z-10 overflow-hidden" 
      id="hero-section"
    >

      <h1 className="font-syne text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-3xl relative z-10">
        <span style={{ color: "#F5F5F0" }}>The people</span> <br/>
        <span className="text-primary">building access</span>
      </h1>
      
      <p className="mt-6 font-body text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed relative z-10">
        Roboticists, engineers, and builders on a mission to put a snake-arm in every industrial machine.
      </p>

      {/* Mechanical Shutter Panels */}
      <div className="absolute inset-0 z-0 flex pointer-events-none" id="shutter-container">
        <div 
          ref={shutterLeftRef}
          className="w-1/2 h-full bg-surface-dim border-r border-outline-variant shutter-panel" 
          id="shutter-left"
        ></div>
        <div 
          ref={shutterRightRef}
          className="w-1/2 h-full bg-surface-dim shutter-panel" 
          id="shutter-right"
        ></div>
      </div>
    </header>
  );
}

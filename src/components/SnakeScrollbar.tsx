"use client";

import { useEffect, useState, useRef } from "react";

interface SnakeScrollbarProps {
  isHidden?: boolean;
}

export default function SnakeScrollbar({ isHidden = false }: SnakeScrollbarProps): JSX.Element {
  const [scrollPercent, setScrollPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const numSegments = 20;

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollPercent(Math.min(1, Math.max(0, percent)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = Math.floor(scrollPercent * (numSegments - 1));

  // Calculate percentage label position based on active index
  // 12px height per segment + 16px gap roughly
  const containerHeight = containerRef.current?.offsetHeight || 0;
  // If we can't measure yet, fallback to percentage-based positioning
  const topOffset = containerHeight 
    ? (containerHeight / numSegments) * activeIndex + 2
    : `${(activeIndex / numSegments) * 100}%`;

  return (
    <div 
      className={`fixed right-4 top-1/2 -translate-y-1/2 h-[70vh] w-12 z-[100] flex flex-col items-center pointer-events-none transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`} 
      id="snake-scrollbar"
    >
      {/* Spine */}
      <div className="absolute inset-y-0 w-[1px] bg-outline-variant left-1/2 -translate-x-1/2"></div>
      
      {/* Percentage Label */}
      <div 
        className="absolute -left-10 font-mono text-[9px] text-primary whitespace-nowrap transition-opacity duration-300"
        style={{
          top: typeof topOffset === 'number' ? `${topOffset}px` : topOffset,
          opacity: scrollPercent > 0.01 ? 1 : 0
        }}
      >
        {Math.round(scrollPercent * 100).toString().padStart(3, '0')}%
      </div>

      {/* Segments Container */}
      <div 
        ref={containerRef}
        className="flex flex-col justify-between h-full w-full py-4 relative" 
        id="segments-container"
      >
        {Array.from({ length: numSegments }).map((_, idx) => {
          const isActive = idx === activeIndex;
          const isPassed = idx < activeIndex;
          
          let className = "w-[4px] h-[12px] mx-auto z-10 transition-colors duration-200 ";
          
          if (isActive) {
            className += "bg-primary snake-head-pulse";
          } else if (isPassed) {
            className += "bg-primary";
          } else {
            className += "bg-outline-variant";
          }

          return <div key={idx} className={className} />;
        })}
      </div>
    </div>
  );
}

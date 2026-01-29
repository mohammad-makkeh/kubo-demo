/**
 * KOBO — Preloader
 * Cinematic entrance sequence
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback((currentTime: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = currentTime;
    }
    
    const elapsed = currentTime - startTimeRef.current;
    const duration = 2000; // 2 seconds
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const currentCount = Math.round(eased * 100);
    
    setCount(currentCount);
    
    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Start exit animation
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 600);
    }
  }, [onComplete]);

  useEffect(() => {
    // Start animation
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-kobo-black flex flex-col items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Counter */}
      <div className="relative font-display text-[15vw] md:text-[12vw] font-light tracking-tighter text-kobo-white">
        <span className="tabular-nums">{count.toString().padStart(3, '0')}</span>
        <span className="text-[5vw] md:text-[4vw] opacity-30 ml-2">%</span>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-[15vh] flex flex-col items-center gap-4">
        <span className="font-body text-xs uppercase tracking-widest text-kobo-white/30">
          Loading experience
        </span>
        
        {/* Progress bar */}
        <div className="w-48 h-px bg-kobo-white/10 overflow-hidden">
          <div 
            className="h-full bg-kobo-white origin-left transition-transform duration-100"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>

      {/* Corner markers */}
      <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-kobo-white/10" />
      <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-kobo-white/10" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-kobo-white/10" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-kobo-white/10" />
    </div>
  );
}

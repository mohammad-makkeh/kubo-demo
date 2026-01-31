import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const proxy = { value: 0 };

    const countTween = gsap.to(proxy, {
      value: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(proxy.value)),
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    gsap.to(progressBarRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power2.out",
    });

    return () => {
      countTween.kill();
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-kobo-black flex flex-col items-center justify-center"
    >
      <div className="relative font-display text-[15vw] md:text-[12vw] font-light tracking-tighter text-kobo-white">
        <span className="tabular-nums">{count.toString().padStart(3, '0')}</span>
        <span className="text-[5vw] md:text-[4vw] opacity-30 ml-2">%</span>
      </div>

      <div className="absolute bottom-[15vh] flex flex-col items-center gap-4">
        <span className="font-body text-xs uppercase tracking-widest text-kobo-white/30">
          Loading experience
        </span>
        <div className="w-48 h-px bg-kobo-white/10 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-kobo-white origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-kobo-white/10" />
      <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-kobo-white/10" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-kobo-white/10" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-kobo-white/10" />
    </div>
  );
}

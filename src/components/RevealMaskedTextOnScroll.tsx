import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import cn from '../utils/cn';

export interface RevealMaskedTextOnScrollProps {
  text: string;
  className?: string;
  textClassName?: string;
  start?: string;
  end?: string;
}

export default function RevealMaskedTextOnScroll({
  text,
  className,
  textClassName,
  start,
  end
}: RevealMaskedTextOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const splitInstance = useRef<SplitText | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;
    if (splitInstance.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    splitInstance.current = SplitText.create(textElement, {
      type: "words,lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (instance) => {
        gsap.set(instance.lines, { yPercent: 120 });

        const tween = gsap.to(instance.lines, {
          yPercent: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: container,
            scrub: true,
            invalidateOnRefresh: true,
            start: start || "clamp(top center)",
            end: end || "clamp(bottom center)",
          }
        });

        scrollTriggerRef.current = tween.scrollTrigger as ScrollTrigger;
        return tween;
      }
    });

    return () => {
      scrollTriggerRef.current?.kill();
      splitInstance.current?.revert();
      splitInstance.current = null;
    };
  }, { scope: containerRef, dependencies: [start, end] });

  return (
    <div ref={containerRef} className={cn("w-full flex items-center justify-center", className)}>
      <div ref={textRef} className={cn("text-white", textClassName)}>{text}</div>
    </div>
  );
}

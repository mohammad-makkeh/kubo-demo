import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
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
  const isSplit = useRef<boolean>(false);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;
    if (isSplit.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    SplitText.create(textElement, {
      type: "words,lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (instance) => {
        return gsap.from(instance.lines, {
          yPercent: 120,
          stagger: 0.2,
          scrollTrigger: {
            trigger: container,
            scrub: true,
            start: start || "clamp(top center)",
            end: end || "clamp(bottom center)"
          }
        });
      }
    });

    isSplit.current = true;
  }, { scope: containerRef, dependencies: [start, end] });

  return (
    <div ref={containerRef} className={cn("w-full flex items-center justify-center", className)}>
      <div ref={textRef} className={cn("text-white", textClassName)}>{text}</div>
    </div>
  );
}

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useLayoutEffect, useRef } from 'react';
import cn from '../utils/cn';

export interface IRevealMaskedTextOnScrollProps {
    text: string;
    className?: string;
    textClassName?: string;
    start?: string;
    end?: string;
}

export default function RevealMaskedTextOnScroll({ text, className, textClassName, start, end }: IRevealMaskedTextOnScrollProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isSplit = useRef<boolean>(false);

    useLayoutEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const container = containerRef.current;
        const text = textRef.current;

        if (isSplit.current) return;
        SplitText.create(text, {
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
    }, [end, start]);

    return (
        <div ref={containerRef} className={cn("w-full flex items-center justify-center", className)}>
            <div ref={textRef} className={cn("text-white", textClassName)}>{text}</div>
        </div>
    );
}

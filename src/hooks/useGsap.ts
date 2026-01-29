/**
 * KOBO — Custom GSAP Hooks
 * Production-grade React hooks for GSAP animations
 */

import { useEffect, useRef, useLayoutEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// ============================================
// Core GSAP Context Hook
// ============================================

/**
 * Creates a GSAP context scoped to a container element
 * Automatically handles cleanup on unmount
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    contextRef.current = gsap.context(() => {}, containerRef);

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  const addAnimation = useCallback((callback: () => void) => {
    if (contextRef.current) {
      contextRef.current.add(callback);
    }
  }, []);

  return { containerRef, addAnimation, context: contextRef };
}

// ============================================
// Timeline Hook
// ============================================

/**
 * Creates and manages a GSAP timeline
 */
export function useTimeline(
  config?: gsap.TimelineVars,
  dependencies: unknown[] = []
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useIsomorphicLayoutEffect(() => {
    timelineRef.current = gsap.timeline({
      paused: true,
      ...config,
    });

    return () => {
      timelineRef.current?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const play = useCallback(() => timelineRef.current?.play(), []);
  const pause = useCallback(() => timelineRef.current?.pause(), []);
  const reverse = useCallback(() => timelineRef.current?.reverse(), []);
  const restart = useCallback(() => timelineRef.current?.restart(), []);
  const progress = useCallback((value: number) => timelineRef.current?.progress(value), []);

  return {
    timeline: timelineRef,
    play,
    pause,
    reverse,
    restart,
    progress,
  };
}

// ============================================
// ScrollTrigger Hook
// ============================================

/**
 * Creates a ScrollTrigger instance with automatic cleanup
 */
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  config: ScrollTrigger.Vars,
  dependencies: unknown[] = []
) {
  const triggerRef = useRef<T>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!triggerRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      ...config,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { triggerRef, scrollTrigger: scrollTriggerRef };
}

// ============================================
// Scroll Progress Hook
// ============================================

/**
 * Returns the scroll progress (0-1) of a section
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: {
    start?: string;
    end?: string;
  } = {}
) {
  const triggerRef = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!triggerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => st.kill();
  }, [options.start, options.end]);

  return { triggerRef, progress };
}

// ============================================
// Reveal Animation Hook
// ============================================

/**
 * Creates a reveal animation triggered on scroll
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    from?: gsap.TweenVars;
    start?: string;
    end?: string;
    once?: boolean;
  } = {}
) {
  const elementRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        ...options.from,
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start || 'top 85%',
          end: options.end || 'top 20%',
          toggleActions: options.once 
            ? 'play none none none' 
            : 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [options.from, options.start, options.end, options.once]);

  return elementRef;
}

// ============================================
// Parallax Hook
// ============================================

/**
 * Creates a parallax effect on an element
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5,
  options: {
    start?: string;
    end?: string;
  } = {}
) {
  const elementRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const distance = speed * 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: elementRef.current,
            start: options.start || 'top bottom',
            end: options.end || 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, options.start, options.end]);

  return elementRef;
}

// ============================================
// Magnetic Effect Hook
// ============================================

/**
 * Adds a magnetic hover effect to an element
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.3
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
}

// ============================================
// Split Text Hook
// ============================================

/**
 * Splits text into animatable spans
 */
export function useSplitText<T extends HTMLElement = HTMLDivElement>(
  type: 'chars' | 'words' | 'lines' = 'chars'
) {
  const containerRef = useRef<T>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const text = container.textContent || '';
    container.innerHTML = '';

    const elements: HTMLElement[] = [];

    if (type === 'chars') {
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char inline-block';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.willChange = 'transform, opacity';
        container.appendChild(span);
        elements.push(span);
      });
    } else if (type === 'words') {
      text.split(' ').forEach((word, i, arr) => {
        const span = document.createElement('span');
        span.className = 'word inline-block';
        span.textContent = word;
        span.style.willChange = 'transform, opacity';
        container.appendChild(span);
        elements.push(span);

        if (i < arr.length - 1) {
          container.appendChild(document.createTextNode(' '));
        }
      });
    }

    elementsRef.current = elements;
  }, [type]);

  return { containerRef, elements: elementsRef };
}

// ============================================
// Mouse Position Hook
// ============================================

/**
 * Tracks mouse position normalized to 0-1
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

// ============================================
// Window Size Hook
// ============================================

/**
 * Tracks window dimensions with debounce
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return size;
}

// ============================================
// Intersection Observer Hook
// ============================================

/**
 * Tracks element visibility
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { elementRef, isInView };
}

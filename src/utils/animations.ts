/**
 * KOBO — Animation Utilities
 * Production-grade GSAP animation presets and helpers
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// Easing presets (GSAP format)
// ============================================

export const easing = {
  // Smooth & elegant
  smooth: 'power2.out',
  smoothInOut: 'power2.inOut',
  
  // Dramatic & cinematic
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
  
  // Bouncy & playful
  elastic: 'elastic.out(1, 0.5)',
  
  // Sharp & snappy
  circ: 'circ.out',
  circInOut: 'circ.inOut',
  
  // Custom bezier curves
  custom: {
    reveal: 'M0,0 C0.25,0 0,1 1,1',
    bounce: 'M0,0 C0.5,0.5 0.5,1 1,1',
  }
} as const;

// ============================================
// Duration presets (in seconds)
// ============================================

export const duration = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  dramatic: 1.5,
  cinematic: 2,
  epic: 3,
} as const;

// ============================================
// Stagger presets
// ============================================

export const stagger = {
  fast: 0.02,
  normal: 0.05,
  slow: 0.1,
  dramatic: 0.15,
  
  // Grid staggers
  grid: {
    from: 'center',
    amount: 0.5,
  },
  
  // Wave effect
  wave: {
    from: 'start',
    amount: 0.8,
    ease: 'power2.inOut',
  }
} as const;

// ============================================
// Animation presets (gsap.from() configs)
// ============================================

export const fromPresets = {
  // Fade in
  fadeIn: {
    opacity: 0,
    duration: duration.normal,
    ease: easing.smooth,
  },
  
  // Slide up and fade
  slideUp: {
    y: 100,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Slide down and fade
  slideDown: {
    y: -100,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Slide from left
  slideLeft: {
    x: -100,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Slide from right
  slideRight: {
    x: 100,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Scale up
  scaleUp: {
    scale: 0.8,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Scale down
  scaleDown: {
    scale: 1.2,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Reveal from mask (clip-path)
  revealUp: {
    clipPath: 'inset(100% 0 0 0)',
    duration: duration.dramatic,
    ease: easing.expoInOut,
  },
  
  // Character reveal
  charReveal: {
    y: '110%',
    rotationX: -90,
    opacity: 0,
    duration: duration.slow,
    ease: easing.expo,
  },
  
  // Blur in
  blurIn: {
    filter: 'blur(20px)',
    opacity: 0,
    duration: duration.slow,
    ease: easing.smooth,
  },
  
  // 3D rotate in
  rotate3D: {
    rotationY: 90,
    opacity: 0,
    duration: duration.dramatic,
    ease: easing.expo,
  },
  
  // Perspective tilt
  perspectiveTilt: {
    rotationX: 45,
    y: 100,
    opacity: 0,
    transformOrigin: 'center bottom',
    duration: duration.dramatic,
    ease: easing.expo,
  },
} as const;

// ============================================
// ScrollTrigger defaults
// ============================================

export const scrollDefaults = {
  // Basic reveal on scroll
  reveal: {
    start: 'top 85%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
  },
  
  // Scrub animation
  scrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  
  // Smooth scrub
  smoothScrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 2,
  },
  
  // Pin section
  pin: {
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1,
  },
  
  // Long pin (multiple screens worth)
  longPin: {
    start: 'top top',
    end: '+=300%',
    pin: true,
    scrub: 1,
  },
} as const;

// ============================================
// Helper functions
// ============================================

/**
 * Split text into spans for animation
 */
export function splitText(element: HTMLElement, type: 'chars' | 'words' | 'lines' = 'chars'): HTMLElement[] {
  const text = element.textContent || '';
  element.innerHTML = '';
  
  const elements: HTMLElement[] = [];
  
  if (type === 'chars') {
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.willChange = 'transform, opacity';
      element.appendChild(span);
      elements.push(span);
    });
  } else if (type === 'words') {
    text.split(' ').forEach((word, i, arr) => {
      const span = document.createElement('span');
      span.className = 'word inline-block';
      span.textContent = word;
      span.style.willChange = 'transform, opacity';
      element.appendChild(span);
      elements.push(span);
      
      if (i < arr.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  } else if (type === 'lines') {
    // For lines, we need a different approach
    const words = text.split(' ');
    const wrapper = document.createElement('span');
    wrapper.className = 'line inline-block';
    wrapper.textContent = text;
    wrapper.style.willChange = 'transform, opacity';
    element.appendChild(wrapper);
    elements.push(wrapper);
  }
  
  return elements;
}

/**
 * Create a reveal animation for an element
 */
export function createRevealAnimation(
  element: HTMLElement | string,
  options: {
    from?: gsap.TweenVars;
    scrollTrigger?: ScrollTrigger.Vars;
    delay?: number;
  } = {}
): gsap.core.Tween {
  return gsap.from(element, {
    ...fromPresets.slideUp,
    ...options.from,
    delay: options.delay || 0,
    scrollTrigger: {
      trigger: element,
      ...scrollDefaults.reveal,
      ...options.scrollTrigger,
    },
  });
}

/**
 * Create a parallax effect
 */
export function createParallax(
  element: HTMLElement | string,
  speed: number = 0.5,
  options: ScrollTrigger.Vars = {}
): gsap.core.Tween {
  const distance = speed * 100;
  
  return gsap.fromTo(
    element,
    { y: -distance },
    {
      y: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        ...scrollDefaults.scrub,
        ...options,
      },
    }
  );
}

/**
 * Create a pinned scroll sequence
 */
export function createPinSequence(
  trigger: HTMLElement | string,
  timeline: gsap.core.Timeline,
  options: {
    duration?: string;
    scrub?: number | boolean;
    anticipatePin?: number;
  } = {}
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: options.duration || '+=200%',
    pin: true,
    scrub: options.scrub ?? 1,
    anticipatePin: options.anticipatePin ?? 1,
    animation: timeline,
  });
}

/**
 * Batch animations for performance
 */
export function batchReveal(
  elements: HTMLElement[] | string,
  options: {
    from?: gsap.TweenVars;
    stagger?: number | gsap.StaggerVars;
    batchSize?: number;
  } = {}
): void {
  ScrollTrigger.batch(elements, {
    onEnter: (batch) => {
      gsap.from(batch, {
        ...fromPresets.slideUp,
        ...options.from,
        stagger: options.stagger || stagger.normal,
      });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, {
        opacity: 0,
        y: 30,
        stagger: stagger.fast,
      });
    },
  });
}

/**
 * Create magnetic effect for element
 */
export function createMagnetic(
  element: HTMLElement,
  strength: number = 0.3
): () => void {
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
      ease: easing.smooth,
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: easing.elastic,
    });
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Kill all ScrollTriggers (cleanup utility)
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

/**
 * Refresh all ScrollTriggers
 */
export function refreshScrollTriggers(): void {
  ScrollTrigger.refresh();
}

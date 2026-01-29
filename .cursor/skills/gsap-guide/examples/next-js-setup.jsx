/**
 * GSAP with Next.js
 * Handling SSR, hydration, and proper setup
 *
 * 📖 Documentation:
 * - Next.js Guide: frameworks/nextjs.md (MUST READ for SSR)
 * - React Guide: frameworks/react.md
 * - ScrollTrigger: plugins/scroll-trigger.md
 * - Core Methods: reference/core-methods.md
 *
 * ⚠️  Critical for Next.js:
 * - Add "use client" directive
 * - Use useGSAP hook with scope
 * - Handle hydration properly
 * - Call ScrollTrigger.refresh() after DOM changes
 * - Use process.env.NODE_ENV for development-only features
 */

import {useEffect, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register plugins at module level (before any component)
gsap.registerPlugin(ScrollTrigger);

// ============================================
// 1. Safe Client-Side Animation (useGSAP)
// ============================================
export function SafeAnimation() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".element", {duration: 1, opacity: 1, y: 0});
    },
    {scope: container}
  );

  return (
    <div ref={container} style={{opacity: 0, transform: "translateY(20px)"}}>
      <h1>This animates safely in Next.js</h1>
    </div>
  );
}

// ============================================
// 2. Handling Hydration (useEffect approach)
// ============================================
export function HydrationSafeAnimation() {
  const [isMounted, setIsMounted] = useState(false);
  const boxRef = useRef(null);

  // Ensure client-side only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isMounted) return;

      gsap.from(boxRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      });
    },
    {dependencies: [isMounted]}
  );

  if (!isMounted) {
    return <div ref={boxRef}>Loading...</div>;
  }

  return <div ref={boxRef}>Animated content</div>;
}

// ============================================
// 3. ScrollTrigger in Next.js (with refresh)
// ============================================
export function NextScrollTrigger() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".scroll-item", {
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: process.env.NODE_ENV === "development",
        },
        opacity: 1,
        y: 0,
        duration: 1,
      });

      // Refresh after layout shift
      ScrollTrigger.refresh();
    },
    {scope: container}
  );

  return (
    <div ref={container} className="scroll-container">
      <div className="scroll-item" style={{opacity: 0, transform: "translateY(20px)"}}>
        Scroll item
      </div>
    </div>
  );
}

// ============================================
// 4. Dynamic Content with Context
// ============================================
export function DynamicContentAnimation() {
  const [items, setItems] = useState([1, 2, 3]);
  const container = useRef(null);

  useGSAP(
    () => {
      // Animate newly added items
      gsap.to(".dynamic-item", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });

      // Important: Refresh ScrollTriggers when DOM changes
      ScrollTrigger.refresh();
    },
    {dependencies: [items], scope: container}
  );

  const addItem = () => {
    setItems([...items, items.length + 1]);
  };

  return (
    <div ref={container}>
      <button onClick={addItem}>Add Item</button>
      <div>
        {items.map((item) => (
          <div
            key={item}
            className="dynamic-item"
            style={{opacity: 0, transform: "translateY(20px)"}}
          >
            Item {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 5. Image Load Handler
// ============================================
export function ImageAnimationWithLoad() {
  const container = useRef(null);

  const handleImageLoad = () => {
    // Refresh ScrollTriggers when image loads (prevents layout shift issues)
    ScrollTrigger.refresh();
  };

  useGSAP(
    () => {
      gsap.to(".image-container", {
        scrollTrigger: {
          trigger: ".image-container",
          start: "top 80%",
        },
        opacity: 1,
        duration: 1,
      });
    },
    {scope: container}
  );

  return (
    <div ref={container}>
      <div className="image-container" style={{opacity: 0}}>
        <img
          src="/image.jpg"
          alt="Animated image"
          onLoad={handleImageLoad}
          style={{maxWidth: "100%"}}
        />
      </div>
    </div>
  );
}

// ============================================
// 6. Responsive Animation with matchMedia
// ============================================
export function ResponsiveAnimation() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Desktop animation
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.to(".box", {
          x: 100,
          duration: 1,
        });
      });

      // Mobile animation
      gsap.matchMedia().add("(max-width: 767px)", () => {
        gsap.to(".box", {
          x: 50,
          duration: 1,
        });
      });
    },
    {scope: container}
  );

  return (
    <div ref={container}>
      <div className="box" style={{backgroundColor: "blue", width: "50px", height: "50px"}} />
    </div>
  );
}

// ============================================
// 7. Animation Layout Shift Prevention
// ============================================
export function PreventLayoutShift() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Use will-change to hint GPU acceleration
      gsap.set(".animated-item", {willChange: "transform, opacity"});

      gsap.to(".animated-item", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        onComplete: () => {
          // Remove will-change after animation
          gsap.set(".animated-item", {willChange: "auto"});
        },
      });
    },
    {scope: container}
  );

  return (
    <div ref={container}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animated-item"
          style={{opacity: 0, transform: "translateY(20px)", height: "100px"}}
        >
          Item {i}
        </div>
      ))}
    </div>
  );
}

// ============================================
// 8. Page Transition Animation
// ============================================
import Link from "next/link";

export function PageTransition() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Fade in animation when page loads
      gsap.from(container.current, {
        opacity: 0,
        duration: 0.5,
      });
    },
    {scope: container}
  );

  return (
    <div ref={container}>
      <h1>Page Content</h1>
      <Link href="/next-page">Go to next page</Link>
    </div>
  );
}

// ============================================
// Best Practices Summary
// ============================================
/*

1. ✅ Always use useGSAP hook in React/Next.js
   - Handles cleanup automatically
   - Prevents memory leaks
   - Manages context properly

2. ✅ Register plugins at module level
   - Before any component definitions
   - Only once per file

3. ✅ Use {scope: container} with useGSAP
   - Limits animation scope
   - Prevents conflicts

4. ✅ Refresh ScrollTrigger after DOM changes
   - When adding/removing elements
   - When images load
   - When dynamic content updates

5. ✅ Handle hydration properly
   - Use useState + useEffect if needed
   - Or rely on useGSAP with scope

6. ✅ Use will-change sparingly
   - Set before animation
   - Remove after completion
   - Can impact performance if overused

7. ✅ Test on mobile devices
   - ScrollTrigger behavior differs on mobile
   - Use matchMedia for responsive animations
   - Consider touch events

8. ✅ Lazy load heavy plugins
   - Only register when needed
   - Use dynamic imports for large plugins

*/

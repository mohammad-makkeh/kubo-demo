# GSAP with Next.js

Handle SSR, hydration, and App Router with GSAP.

## Installation

```bash
npm install gsap @gsap/react
```

## The Key Challenge

Next.js renders on the server where `window` and DOM don't exist. GSAP needs the DOM.

## Solution 1: useGSAP (Recommended)

```javascript
"use client"; // Required for App Router

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AnimatedComponent() {
  const container = useRef(null);

  useGSAP(() => {
    // Safe - only runs on client
    gsap.to(".box", { x: 100, duration: 1 });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="box">Animated</div>
    </div>
  );
}
```

## Solution 2: Dynamic Import (No SSR)

```javascript
import dynamic from "next/dynamic";

const AnimatedSection = dynamic(
  () => import("@/components/AnimatedSection"),
  { ssr: false }
);

export default function Page() {
  return <AnimatedSection />;
}
```

## Plugin Registration

Create a separate file for registration:

```javascript
// lib/gsap.js
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, useGSAP, ScrollTrigger };
```

Then import from this file:

```javascript
"use client";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
```

## ScrollTrigger in Next.js

```javascript
"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function ScrollSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to(".box", {
      x: 500,
      scrollTrigger: {
        trigger: ".box",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ height: "200vh" }}>
      <div className="box">Scroll to animate</div>
    </div>
  );
}
```

## App Router vs Pages Router

### App Router (app/)

Always add `"use client"` directive:

```javascript
"use client";

import { useGSAP } from "@gsap/react";
// ...
```

### Pages Router (pages/)

No directive needed, but use dynamic import for heavy animations:

```javascript
import dynamic from "next/dynamic";

const HeavyAnimation = dynamic(
  () => import("../components/HeavyAnimation"),
  { ssr: false }
);
```

## Handling Layout Shifts

Prevent flash of unstyled content:

```javascript
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FadeIn({ children }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      duration: 0.5
    });
  });

  return (
    <div ref={container} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
```

Or use CSS:

```css
.animate-on-load {
  opacity: 0;
}

.animate-on-load.loaded {
  opacity: 1;
}
```

## ScrollTrigger Refresh on Route Change

```javascript
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

// Add to layout.js
export default function Layout({ children }) {
  return (
    <>
      <ScrollRefresh />
      {children}
    </>
  );
}
```

## Page Transitions

```javascript
"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageTransition({ children }) {
  const container = useRef(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 20,
      duration: 0.5
    });
  }, { dependencies: [pathname] });

  return <div ref={container}>{children}</div>;
}
```

## Common Patterns

### Animated Hero
```javascript
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-title", { y: 50, opacity: 0, duration: 0.8 })
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-cta", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2");
  }, { scope: container });

  return (
    <div ref={container}>
      <h1 className="hero-title">Welcome</h1>
      <p className="hero-subtitle">Subtitle here</p>
      <button className="hero-cta">Get Started</button>
    </div>
  );
}
```

### Scroll-triggered Cards
```javascript
"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function Cards() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".card").forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
  }, { scope: container });

  return (
    <div ref={container}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="card">Card {i}</div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### "window is not defined"
- Add `"use client"` directive
- Or use dynamic import with `ssr: false`

### Animations not running
- Check if component is client-side
- Ensure plugins are registered
- Call `ScrollTrigger.refresh()` after content loads

### Hydration mismatch
- Don't conditionally render based on window
- Use `useEffect` or `useGSAP` for client-only logic
- Set initial styles in CSS, not inline

### ScrollTrigger positions wrong
- Call `ScrollTrigger.refresh()` after images load
- Use `ScrollTrigger.refresh(true)` for force recalculation

## Tips

1. Always use `"use client"` for components with GSAP
2. Register plugins in a separate file
3. Use `useGSAP` for automatic cleanup
4. Refresh ScrollTrigger on route changes
5. Use dynamic imports for heavy animation components

# GSAP with Vanilla JavaScript

Best practices for GSAP without frameworks.

## Installation

### NPM
```bash
npm install gsap
```

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### CDN
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<script>
  gsap.registerPlugin(ScrollTrigger);
</script>
```

## gsap.context() - Grouping & Cleanup

```javascript
// Create a context for a section
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
  gsap.to(".circle", { y: 50 });

  ScrollTrigger.create({
    trigger: ".section",
    // ...
  });
});

// Later, clean up everything at once
ctx.revert();
```

### With Scope
```javascript
const section = document.querySelector(".my-section");

const ctx = gsap.context(() => {
  // ".box" only selects elements inside section
  gsap.to(".box", { x: 100 });
}, section);

ctx.revert(); // Cleanup
```

## gsap.matchMedia() - Responsive Animations

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Desktop animations
  gsap.to(".box", { x: 500 });

  return () => {
    // Cleanup function (optional)
  };
});

mm.add("(max-width: 767px)", () => {
  // Mobile animations
  gsap.to(".box", { x: 100 });
});

// Revert all
mm.revert();
```

### With Conditions Object
```javascript
const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 1024px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isMobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

  if (reduceMotion) {
    // Skip animations
    return;
  }

  if (isDesktop) {
    gsap.to(".box", { x: 500 });
  } else if (isTablet) {
    gsap.to(".box", { x: 300 });
  } else {
    gsap.to(".box", { x: 100 });
  }
});
```

## Common Patterns

### DOM Ready
```javascript
document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1
  });
});
```

### Wait for Images
```javascript
window.addEventListener("load", () => {
  // All images loaded, safe to calculate positions
  ScrollTrigger.refresh();

  gsap.from(".gallery-item", {
    opacity: 0,
    y: 50,
    stagger: 0.1
  });
});
```

### Scroll Animations with Batch
```javascript
ScrollTrigger.batch(".fade-in", {
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.1
    });
  },
  start: "top 85%"
});

// Set initial state
gsap.set(".fade-in", { opacity: 0, y: 50 });
```

### Navigation Animation
```javascript
const nav = document.querySelector(".nav");
let lastScroll = 0;

ScrollTrigger.create({
  start: "top -80",
  onUpdate: (self) => {
    const currentScroll = self.scroll();

    if (currentScroll > lastScroll) {
      // Scrolling down - hide nav
      gsap.to(nav, { y: -100, duration: 0.3 });
    } else {
      // Scrolling up - show nav
      gsap.to(nav, { y: 0, duration: 0.3 });
    }

    lastScroll = currentScroll;
  }
});
```

### Hover Effects
```javascript
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      duration: 0.3
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.3
    });
  });
});
```

### Page Load Sequence
```javascript
const tl = gsap.timeline();

tl.from(".logo", { opacity: 0, y: -20, duration: 0.5 })
  .from(".nav-item", { opacity: 0, y: -20, stagger: 0.1 }, "-=0.2")
  .from(".hero-content", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
  .from(".hero-image", { opacity: 0, scale: 0.9, duration: 0.6 }, "-=0.4");
```

### Lazy Load Animations
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, {
        opacity: 1,
        y: 0,
        duration: 0.6
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".animate-on-scroll").forEach(el => {
  gsap.set(el, { opacity: 0, y: 50 });
  observer.observe(el);
});
```

### Smooth Scroll Links
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));

    gsap.to(window, {
      scrollTo: {
        y: target,
        offsetY: 80 // Account for fixed header
      },
      duration: 1,
      ease: "power2.inOut"
    });
  });
});
```

### Parallax Background
```javascript
gsap.to(".parallax-bg", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### Text Reveal on Scroll
```javascript
gsap.utils.toArray(".reveal-text").forEach(text => {
  gsap.from(text, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: text,
      start: "top 80%"
    }
  });
});
```

## Module Pattern

```javascript
// animations.js
export function initHeroAnimations() {
  const tl = gsap.timeline();
  tl.from(".hero-title", { opacity: 0, y: 50 })
    .from(".hero-cta", { opacity: 0, y: 30 });
  return tl;
}

export function initScrollAnimations() {
  gsap.utils.toArray(".fade-in").forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: el,
        start: "top 80%"
      }
    });
  });
}

// main.js
import { initHeroAnimations, initScrollAnimations } from "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimations();
  initScrollAnimations();
});
```

## Performance Tips

1. Use `gsap.set()` for initial states (not CSS)
2. Use `will-change: transform` sparingly
3. Prefer `x`, `y`, `scale`, `rotation` over `left`, `top`, `width`
4. Kill tweens when no longer needed: `gsap.killTweensOf(".element")`
5. Use `ScrollTrigger.batch()` for many similar elements
6. Use `gsap.context()` for cleanup

## Tips

1. Always register plugins before using them
2. Use `gsap.context()` for grouped cleanup
3. Use `gsap.matchMedia()` for responsive animations
4. Wait for DOM/images before animating
5. Use `gsap.defaults()` for common properties

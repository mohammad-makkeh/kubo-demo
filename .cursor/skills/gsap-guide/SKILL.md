---
name: gsap-animation-helper
description: Expert guidance for GSAP animations. Use when users want to create smooth animations, build interactive timelines, implement scroll-triggered effects, or work with GSAP plugins. Helps with Tweens, Timelines, ScrollTrigger, and other GSAP features across vanilla JS, React, Next.js, and other frameworks.
---

# GSAP Animation Helper Skill

A comprehensive guide for creating professional-grade animations using GSAP (GreenSock Animation Platform).

## When to Use This Skill

**Trigger conditions:**
- User mentions "GSAP" or "GreenSock"
- User wants to create animations: "smooth animation", "fade in effect", "scroll animation"
- User mentions specific GSAP features: "Timeline", "Tween", "ScrollTrigger", "stagger"
- User is struggling with animation performance or timing
- User wants to integrate GSAP into React, Next.js, or other frameworks

---

## Quick Decision Tree

### What does the user want to do?

**Basic Animation**
→ Read: `reference/core-methods.md`

**Scroll-based Animation**
→ Read: `plugins/scroll-trigger.md`
→ Smooth scroll needed? Also read: `plugins/scroll-smoother.md`

**Text Animation**
→ Character/word split: `plugins/split-text.md`
→ Typewriter/scramble: `plugins/text-plugins.md`

**SVG Animation**
→ Stroke drawing: `plugins/draw-svg.md`
→ Shape morphing: `plugins/morph-svg.md`
→ Path following: `plugins/motion-path.md`

**User Interaction**
→ Draggable elements: `plugins/draggable.md`
→ Input handling (wheel/touch/pointer): `plugins/observer.md`

**Layout Animation**
→ FLIP technique: `plugins/flip.md`

**Physics-based**
→ Read: `plugins/physics.md`

**Framework-specific**
→ React: `frameworks/react.md`
→ Next.js: `frameworks/nextjs.md`
→ Vanilla JS: `frameworks/vanilla.md`

**Easing/Timing**
→ Read: `reference/easing.md`

**Utility Functions**
→ Read: `reference/utilities.md`

---

## Core Concepts (Essential)

### Installation

```bash
npm install gsap
```

```javascript
import gsap from "gsap";
```

### Tween - Basic Animation

```javascript
// Animate TO a state
gsap.to(".box", { duration: 1, x: 100, opacity: 0.5 });

// Animate FROM a state
gsap.from(".box", { duration: 1, y: -50, opacity: 0 });

// Animate FROM one state TO another
gsap.fromTo(".box", { opacity: 0 }, { duration: 1, opacity: 1 });
```

### Timeline - Sequence Animations

```javascript
const tl = gsap.timeline();

tl.to(".box1", { duration: 1, x: 100 })
  .to(".box2", { duration: 1, x: 100 })      // After box1
  .to(".box3", { duration: 1, x: 100 }, "<")  // Same time as box2
  .to(".box4", { duration: 1, x: 100 }, "-=0.5"); // 0.5s before previous ends
```

### Stagger - Animate Multiple Elements

```javascript
gsap.to(".item", {
  duration: 0.5,
  y: 20,
  opacity: 1,
  stagger: 0.1  // 0.1s delay between each
});
```

### Plugin Registration

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## Common Patterns

### Fade In on Load
```javascript
gsap.from(".element", { duration: 0.6, opacity: 0, y: 20 });
```

### Scroll-triggered Fade In
```javascript
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%"
  }
});
```

### Staggered List
```javascript
gsap.from(".list-item", {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.1
});
```

### Hover Animation
```javascript
const box = document.querySelector(".box");
box.addEventListener("mouseenter", () => gsap.to(box, { scale: 1.1, duration: 0.3 }));
box.addEventListener("mouseleave", () => gsap.to(box, { scale: 1, duration: 0.3 }));
```

---

## Performance Tips

1. **Use transforms** (`x`, `y`, `scale`, `rotation`) instead of `left`, `top`, `width`
2. **Use `opacity`** - GPU accelerated
3. **Avoid animating `box-shadow`** - expensive
4. **Use `will-change: transform`** CSS for animated elements
5. **Kill unused tweens**: `gsap.killTweensOf(".element")`

---

## File Structure

```
gsap-skill/
├── SKILL.md                 # This file (entry point)
├── plugins/
│   ├── scroll-trigger.md    # ScrollTrigger plugin
│   ├── scroll-smoother.md   # ScrollSmoother plugin
│   ├── split-text.md        # SplitText plugin
│   ├── flip.md              # Flip plugin
│   ├── draggable.md         # Draggable + Inertia
│   ├── observer.md          # Observer plugin
│   ├── draw-svg.md          # DrawSVG plugin
│   ├── morph-svg.md         # MorphSVG plugin
│   ├── motion-path.md       # MotionPath plugin
│   ├── text-plugins.md      # Text + ScrambleText plugins
│   └── physics.md           # Physics2D + PhysicsProps
├── frameworks/
│   ├── react.md             # React + useGSAP
│   ├── nextjs.md            # Next.js SSR handling
│   └── vanilla.md           # Vanilla JS patterns
├── reference/
│   ├── core-methods.md      # gsap.to, set, quickTo, etc.
│   ├── utilities.md         # gsap.utils methods
│   └── easing.md            # All easing functions
└── examples/
    └── ...
```

---

## Quick Reference Table

| Goal | File to Read |
|------|--------------|
| Basic tween/timeline | `reference/core-methods.md` |
| Scroll animations | `plugins/scroll-trigger.md` |
| Smooth scrolling | `plugins/scroll-smoother.md` |
| Text effects | `plugins/split-text.md` |
| SVG drawing | `plugins/draw-svg.md` |
| Shape morphing | `plugins/morph-svg.md` |
| Path animation | `plugins/motion-path.md` |
| Layout animations | `plugins/flip.md` |
| Drag & drop | `plugins/draggable.md` |
| Input handling | `plugins/observer.md` |
| Physics | `plugins/physics.md` |
| React | `frameworks/react.md` |
| Next.js | `frameworks/nextjs.md` |
| Easing functions | `reference/easing.md` |
| Utility methods | `reference/utilities.md` |

---

## Helpful Resources

- **Official Docs:** https://gsap.com/docs/v3/
- **Cheatsheet:** https://gsap.com/cheatsheet
- **Easing Visualizer:** https://gsap.com/docs/v3/Eases/

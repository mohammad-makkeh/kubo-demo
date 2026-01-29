# ScrollTrigger Plugin

Trigger animations based on scroll position. The most popular GSAP plugin.

## Installation

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

## Basic Usage

```javascript
gsap.to(".box", {
  x: 500,
  duration: 1,
  scrollTrigger: {
    trigger: ".box",      // Element that triggers
    start: "top center",  // "trigger viewport" - when top of .box hits center of viewport
    end: "bottom center", // When bottom of .box hits center of viewport
    markers: true         // Debug markers (remove in production)
  }
});
```

## Start/End Position Syntax

Format: `"trigger-position viewport-position"`

```javascript
start: "top center"     // top of trigger hits center of viewport
start: "top 80%"        // top of trigger hits 80% down viewport
start: "top top"        // top of trigger hits top of viewport
start: "center center"  // center of trigger hits center of viewport
start: "top bottom-=100" // top of trigger hits 100px above bottom
```

## Scrub - Link Animation to Scroll

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "bottom bottom",
    scrub: true,     // Animation follows scroll directly
    // scrub: 0.5,   // Smoothing (0.5 second delay)
    // scrub: 1,     // More smoothing
  }
});
```

## Pin - Fix Element While Scrolling

```javascript
gsap.to(".panel", {
  x: 500,
  scrollTrigger: {
    trigger: ".panel",
    start: "top top",
    end: "+=500",        // Pin for 500px of scroll
    pin: true,           // Pin the trigger element
    pinSpacing: true,    // Add spacing (default)
    // pinSpacing: false // No spacing added
  }
});
```

## Timeline with ScrollTrigger

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "+=2000",
    scrub: 1,
    pin: true
  }
});

tl.to(".box1", { x: 500 })
  .to(".box2", { y: 300 })
  .to(".box3", { rotation: 360 });
```

## Toggle Actions

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  // Format: "onEnter onLeave onEnterBack onLeaveBack"
  toggleActions: "play pause reverse reset"
  // Options: play, pause, resume, reset, restart, complete, reverse, none
}
```

## Toggle Class

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  toggleClass: "active"           // Add/remove class
  // toggleClass: {
  //   targets: ".other-element", // Different target
  //   className: "active"
  // }
}
```

## Callbacks

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  onEnter: () => console.log("entered"),
  onLeave: () => console.log("left"),
  onEnterBack: () => console.log("entered from bottom"),
  onLeaveBack: () => console.log("left going up"),
  onUpdate: (self) => console.log("progress:", self.progress),
  onToggle: (self) => console.log("toggled:", self.isActive),
  onRefresh: () => console.log("refreshed")
}
```

## Snap to Sections

```javascript
scrollTrigger: {
  trigger: ".container",
  start: "top top",
  end: "+=3000",
  snap: {
    snapTo: 1/3,           // Snap to thirds
    // snapTo: [0, 0.5, 1], // Snap to specific points
    duration: 0.5,
    ease: "power2.inOut"
  }
}
```

## Horizontal Scroll

```javascript
const sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```

## Batch Animations

```javascript
ScrollTrigger.batch(".box", {
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.1
    });
  },
  onLeave: (elements) => {
    gsap.to(elements, { opacity: 0, y: 100 });
  }
});
```

## Refresh and Resize

```javascript
// Recalculate all ScrollTriggers
ScrollTrigger.refresh();

// After DOM changes
ScrollTrigger.refresh(true); // Force recalc

// On resize (automatic, but can customize)
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
});
```

## Kill and Cleanup

```javascript
// Kill specific ScrollTrigger
const st = ScrollTrigger.create({ ... });
st.kill();

// Kill all
ScrollTrigger.killAll();

// Get all ScrollTriggers
const allTriggers = ScrollTrigger.getAll();
```

## Common Patterns

### Fade In On Scroll
```javascript
gsap.utils.toArray(".fade-in").forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    }
  });
});
```

### Parallax Effect
```javascript
gsap.to(".parallax-bg", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### Progress Indicator
```javascript
gsap.to(".progress-bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3
  }
});
```

## Debugging Tips

1. Always use `markers: true` during development
2. Check `start` and `end` positions carefully
3. Use `onUpdate: (self) => console.log(self.progress)` to debug
4. Remember: ScrollTrigger calculates positions on page load
5. Call `ScrollTrigger.refresh()` after dynamic content loads

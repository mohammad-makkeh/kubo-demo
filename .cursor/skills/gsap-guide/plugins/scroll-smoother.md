# ScrollSmoother Plugin

Creates smooth, buttery scrolling effects. Requires ScrollTrigger.

## Installation

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
```

## Required HTML Structure

```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- All your content here -->
  </div>
</div>
```

## Basic Setup

```javascript
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1,              // Smoothing duration in seconds
  effects: true           // Enable data-speed and data-lag
});
```

## Configuration Options

```javascript
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,            // Smoothness (higher = smoother)
  effects: true,          // Enable parallax attributes
  smoothTouch: 0.1,       // Touch device smoothing (0 to disable)
  normalizeScroll: true,  // Prevent address bar issues on mobile
  ignoreMobileResize: true // Ignore resize on mobile keyboard
});
```

## Parallax Effects with Data Attributes

```html
<!-- Faster scroll (parallax forward) -->
<div data-speed="1.5">Moves faster</div>

<!-- Slower scroll (parallax back) -->
<div data-speed="0.5">Moves slower</div>

<!-- Lag effect (smooth delay) -->
<div data-lag="0.5">Lags behind 0.5s</div>

<!-- Combined -->
<div data-speed="0.8" data-lag="0.2">Combined effect</div>
```

## Programmatic Control

```javascript
const smoother = ScrollSmoother.create({ ... });

// Scroll to element
smoother.scrollTo(".section3", true, "center center");
// Args: target, smooth animation, position

// Scroll to position
smoother.scrollTo(500, true);

// Get current scroll position
const scrollPos = smoother.scrollTop();

// Pause/resume
smoother.paused(true);  // Pause
smoother.paused(false); // Resume

// Get smoother instance
const instance = ScrollSmoother.get();
```

## Effects Method

```javascript
// Programmatically add parallax
smoother.effects(".parallax-element", {
  speed: 0.5,
  lag: 0.1
});

// Different effects for different elements
smoother.effects("[data-parallax='slow']", { speed: 0.5 });
smoother.effects("[data-parallax='fast']", { speed: 1.5 });
```

## With ScrollTrigger

```javascript
// ScrollTrigger works normally with ScrollSmoother
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
```

## Common Patterns

### Smooth Anchor Links
```javascript
const smoother = ScrollSmoother.create({ ... });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    smoother.scrollTo(target, true, "top top");
  });
});
```

### Parallax Hero Section
```html
<section class="hero">
  <div class="hero-bg" data-speed="0.5"></div>
  <h1 data-speed="0.8" data-lag="0.1">Hero Title</h1>
  <p data-speed="0.9">Subtitle text</p>
</section>
```

### Disable on Mobile
```javascript
let smoother;

if (window.innerWidth > 768) {
  smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true
  });
}
```

## Required CSS

```css
#smooth-wrapper {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#smooth-content {
  overflow: visible;
  width: 100%;
}
```

## Troubleshooting

1. **Content not showing**: Check wrapper/content structure
2. **Jumpy scroll**: Increase `smooth` value
3. **Mobile issues**: Use `normalizeScroll: true` and `smoothTouch: 0.1`
4. **Elements not parallaxing**: Ensure `effects: true` is set
5. **ScrollTrigger not working**: Both plugins must be registered

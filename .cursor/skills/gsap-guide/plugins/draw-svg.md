# DrawSVG Plugin

Animate SVG strokes being drawn.

**Note:** DrawSVG is a premium plugin (Club GSAP membership required).

## Installation

```javascript
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
```

## Basic Usage

```javascript
// Draw the stroke from 0% to 100%
gsap.from("path", { drawSVG: 0, duration: 2 });

// Or use .to()
gsap.to("path", { drawSVG: "100%", duration: 2 });
```

## Value Formats

```javascript
// Percentage
gsap.to("path", { drawSVG: "50%" });      // Draw to 50%
gsap.to("path", { drawSVG: "0% 50%" });   // Draw from 0% to 50%
gsap.to("path", { drawSVG: "25% 75%" });  // Draw middle 50%

// Pixels
gsap.to("path", { drawSVG: "100" });       // Draw 100px
gsap.to("path", { drawSVG: "50 150" });    // From 50px to 150px

// From center
gsap.from("path", { drawSVG: "50% 50%" }); // Expand from center
```

## Common Patterns

### Draw On Scroll
```javascript
gsap.from("path", {
  drawSVG: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "svg",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});
```

### Handwriting Effect
```javascript
gsap.from(".handwriting path", {
  drawSVG: 0,
  duration: 2,
  stagger: 0.5,
  ease: "power2.inOut"
});
```

### Draw and Fill
```javascript
const tl = gsap.timeline();

tl.from("path", { drawSVG: 0, duration: 2 })
  .to("path", { fill: "#ff0000", duration: 0.5 });
```

### Loop Animation
```javascript
gsap.fromTo("path",
  { drawSVG: "0% 0%" },
  {
    drawSVG: "0% 100%",
    duration: 2,
    repeat: -1,
    ease: "none"
  }
);
```

### Multiple Paths with Stagger
```javascript
gsap.from("svg path", {
  drawSVG: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: "power2.inOut"
});
```

### Draw from Center Outward
```javascript
gsap.from("path", {
  drawSVG: "50% 50%",
  duration: 1.5,
  ease: "power2.out"
});
```

### Erase and Redraw
```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to("path", { drawSVG: "100% 100%", duration: 1 })  // Erase
  .set("path", { drawSVG: "0% 0%" })                   // Reset
  .to("path", { drawSVG: "0% 100%", duration: 1 });    // Redraw
```

## SVG Requirements

```html
<!-- Path must have stroke and no fill -->
<svg viewBox="0 0 100 100">
  <path
    d="M10,10 L90,10 L90,90 L10,90 Z"
    stroke="#000"
    stroke-width="2"
    fill="none"
  />
</svg>
```

## CSS for Best Results

```css
path {
  fill: none;
  stroke: #000;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

## Get Path Length

```javascript
// Get total length of path
const length = DrawSVGPlugin.getLength("path");
console.log("Path length:", length);
```

## With Timeline

```javascript
const tl = gsap.timeline();

tl.from("#outline", { drawSVG: 0, duration: 1 })
  .from("#detail1", { drawSVG: 0, duration: 0.5 }, "-=0.3")
  .from("#detail2", { drawSVG: 0, duration: 0.5 }, "-=0.3")
  .to("svg", { fill: "#333", duration: 0.5 });
```

## Tips

1. Use `stroke-linecap: round` for smooth line endings
2. For complex SVGs, order paths logically in the SVG
3. Use `getLength()` to calculate percentage values
4. Combine with ScrollTrigger for scroll-driven drawing
5. Use `stagger` for multiple paths

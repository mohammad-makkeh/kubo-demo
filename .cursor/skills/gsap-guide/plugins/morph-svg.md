# MorphSVG Plugin

Morph between SVG shapes smoothly.

**Note:** MorphSVG is a premium plugin (Club GSAP membership required).

## Installation

```javascript
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);
```

## Basic Usage

```javascript
// Morph one shape into another
gsap.to("#circle", {
  morphSVG: "#star",
  duration: 2
});
```

## Morph Options

```javascript
gsap.to("#shape1", {
  morphSVG: {
    shape: "#shape2",
    type: "rotational",    // "rotational" or "linear"
    origin: "50% 50%",     // Transform origin
    shapeIndex: 0,         // Starting point alignment
    map: "complexity"      // Point mapping strategy
  },
  duration: 2
});
```

## Shape Index

```javascript
// Auto find best match
gsap.to("#shape1", {
  morphSVG: { shape: "#shape2", shapeIndex: "auto" }
});

// Specific index (experiment to find best)
gsap.to("#shape1", {
  morphSVG: { shape: "#shape2", shapeIndex: 5 }
});
```

## Morph Type

```javascript
// Linear (default) - direct point-to-point
gsap.to("#shape", {
  morphSVG: { shape: "#target", type: "linear" }
});

// Rotational - curved paths (often looks better)
gsap.to("#shape", {
  morphSVG: { shape: "#target", type: "rotational" }
});
```

## Common Patterns

### Simple Shape Morph
```javascript
gsap.to("#circle", {
  morphSVG: "#square",
  duration: 1.5,
  ease: "power2.inOut"
});
```

### Morph Through Multiple Shapes
```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to("#shape", { morphSVG: "#circle", duration: 1 })
  .to("#shape", { morphSVG: "#square", duration: 1 })
  .to("#shape", { morphSVG: "#star", duration: 1 })
  .to("#shape", { morphSVG: "#heart", duration: 1 });
```

### Morph on Hover
```javascript
const element = document.querySelector("#morph-shape");

element.addEventListener("mouseenter", () => {
  gsap.to("#morph-shape", { morphSVG: "#hover-shape", duration: 0.3 });
});

element.addEventListener("mouseleave", () => {
  gsap.to("#morph-shape", { morphSVG: "#original-shape", duration: 0.3 });
});
```

### Morph on Scroll
```javascript
gsap.to("#shape", {
  morphSVG: "#target-shape",
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});
```

### With Color Change
```javascript
gsap.to("#shape", {
  morphSVG: "#target",
  fill: "#ff0000",
  stroke: "#000",
  duration: 1.5
});
```

## Converting Shapes to Paths

```javascript
// Convert primitive shapes to paths for morphing
MorphSVGPlugin.convertToPath("circle, rect, ellipse, polygon, polyline, line");

// Now they can be morphed
gsap.to("circle", { morphSVG: "rect", duration: 1 });
```

## Get Raw Path Data

```javascript
// Get path data as array
const rawPath = MorphSVGPlugin.getRawPath("#myPath");
console.log(rawPath);

// Useful for custom manipulation
```

## Morphing Text to Shape

```javascript
// First convert text to path (do this in design tool)
// Then morph like any other path
gsap.to("#text-path", {
  morphSVG: "#logo-shape",
  duration: 2
});
```

## Multiple Paths

```html
<svg>
  <g id="icon1">
    <path id="icon1-part1" d="..." />
    <path id="icon1-part2" d="..." />
  </g>
  <g id="icon2">
    <path id="icon2-part1" d="..." />
    <path id="icon2-part2" d="..." />
  </g>
</svg>
```

```javascript
// Morph corresponding paths
gsap.to("#icon1-part1", { morphSVG: "#icon2-part1", duration: 1 });
gsap.to("#icon1-part2", { morphSVG: "#icon2-part2", duration: 1 });
```

## SVG Requirements

```html
<!-- Best results with similar complexity paths -->
<svg viewBox="0 0 100 100">
  <!-- Source shape (visible) -->
  <path id="circle" d="M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10" fill="#333"/>

  <!-- Target shape (can be hidden) -->
  <path id="star" d="M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z" fill="none" visibility="hidden"/>
</svg>
```

## Tips

1. Shapes with similar point counts morph better
2. Use `type: "rotational"` for curved paths
3. Experiment with `shapeIndex` for best results
4. Use `convertToPath()` for primitive shapes
5. Keep target shapes hidden with `visibility="hidden"`
6. Match fill/stroke between source and target

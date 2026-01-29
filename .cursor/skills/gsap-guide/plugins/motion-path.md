# MotionPath Plugin

Animate elements along SVG paths or custom paths.

## Installation

```javascript
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
```

## Basic Usage

```javascript
gsap.to(".element", {
  motionPath: {
    path: "#myPath",
    align: "#myPath",
    alignOrigin: [0.5, 0.5]
  },
  duration: 5
});
```

## Path Options

### Using SVG Path
```javascript
gsap.to(".ball", {
  motionPath: {
    path: "#flight-path",    // SVG path element
    align: "#flight-path",   // Align element to path
    alignOrigin: [0.5, 0.5], // Center of element
    autoRotate: true         // Rotate along path direction
  },
  duration: 3
});
```

### Using Path String
```javascript
gsap.to(".element", {
  motionPath: {
    path: "M0,0 C100,0 100,100 200,100",
    autoRotate: true
  },
  duration: 2
});
```

### Using Coordinates Array
```javascript
gsap.to(".element", {
  motionPath: [
    { x: 100, y: 0 },
    { x: 200, y: 100 },
    { x: 300, y: 50 },
    { x: 400, y: 0 }
  ],
  duration: 3
});
```

## MotionPath Options

```javascript
gsap.to(".element", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],  // Transform origin [x, y] (0-1)
    autoRotate: true,          // Follow path direction
    // autoRotate: 90,         // Add offset angle
    start: 0,                  // Start position (0-1)
    end: 1,                    // End position (0-1)
    offsetX: 10,               // X offset from path
    offsetY: 10                // Y offset from path
  },
  duration: 3
});
```

## Common Patterns

### Follow Path with Auto-rotate
```javascript
gsap.to(".airplane", {
  motionPath: {
    path: "#flight-path",
    align: "#flight-path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  },
  duration: 5,
  ease: "power1.inOut"
});
```

### Partial Path Animation
```javascript
gsap.to(".element", {
  motionPath: {
    path: "#path",
    start: 0.2,   // Start at 20%
    end: 0.8      // End at 80%
  },
  duration: 2
});
```

### Loop Along Path
```javascript
gsap.to(".element", {
  motionPath: {
    path: "#circular-path",
    align: "#circular-path",
    alignOrigin: [0.5, 0.5]
  },
  duration: 3,
  repeat: -1,
  ease: "none"
});
```

### Scroll-linked Path Animation
```javascript
gsap.to(".element", {
  motionPath: {
    path: "#scroll-path",
    align: "#scroll-path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  },
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});
```

### Multiple Elements Staggered
```javascript
gsap.to(".dot", {
  motionPath: {
    path: "#path",
    align: "#path"
  },
  duration: 3,
  stagger: {
    each: 0.2,
    repeat: -1
  },
  ease: "none"
});
```

### Custom Rotation Offset
```javascript
gsap.to(".arrow", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],
    autoRotate: 90  // 90° offset
  },
  duration: 3
});
```

## Convert Coordinates to Path

```javascript
// Convert array to path data
const path = MotionPathPlugin.arrayToRawPath([
  { x: 0, y: 0 },
  { x: 100, y: 50 },
  { x: 200, y: 0 }
]);
```

## Get Point on Path

```javascript
// Get position at specific progress
const point = MotionPathPlugin.getRelativePosition(
  "#path",
  "#element",
  [0.5, 0.5],  // alignOrigin
  0.5          // progress (0-1)
);
console.log(point.x, point.y, point.rotation);
```

## Curved Path Between Points

```javascript
// Create curved path between points
gsap.to(".element", {
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 100, y: -50 },  // Control point
      { x: 200, y: 0 }
    ],
    curviness: 1.5  // Curve intensity
  },
  duration: 2
});
```

## MotionPathHelper (Dev Tool)

```javascript
// Visual path editor (development only)
import { MotionPathHelper } from "gsap/MotionPathHelper";
gsap.registerPlugin(MotionPathHelper);

MotionPathHelper.create(".element", {
  path: "#path"
});
// Creates visual UI to edit path
```

## SVG Path Example

```html
<svg viewBox="0 0 500 300">
  <!-- The path (can be invisible) -->
  <path
    id="myPath"
    d="M50,150 Q150,50 250,150 T450,150"
    fill="none"
    stroke="#ccc"
  />
</svg>

<!-- Element to animate -->
<div class="ball"></div>
```

```javascript
gsap.to(".ball", {
  motionPath: {
    path: "#myPath",
    align: "#myPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  },
  duration: 4,
  repeat: -1,
  ease: "none"
});
```

## Tips

1. Use `align` to position element on path start
2. `alignOrigin: [0.5, 0.5]` centers the element
3. `autoRotate: true` makes element face direction of travel
4. For closed paths, use `repeat: -1` for seamless loops
5. Use `ease: "none"` for constant speed along path

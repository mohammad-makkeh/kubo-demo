# GSAP Utility Methods

Helpful functions in `gsap.utils`.

## gsap.utils.toArray()

Convert selectors/NodeLists to arrays.

```javascript
const boxes = gsap.utils.toArray(".box");
// Now you can use array methods
boxes.forEach(box => gsap.to(box, { x: 100 }));
```

## gsap.utils.selector()

Scoped element selection.

```javascript
const container = document.querySelector(".container");
const q = gsap.utils.selector(container);

// Only selects .box inside container
gsap.to(q(".box"), { x: 100 });
```

## gsap.utils.clamp()

Constrain value to range.

```javascript
gsap.utils.clamp(0, 100, 150);  // Returns 100
gsap.utils.clamp(0, 100, -20);  // Returns 0
gsap.utils.clamp(0, 100, 50);   // Returns 50

// Create reusable clamper
const clamp = gsap.utils.clamp(0, 100);
clamp(150);  // 100
clamp(-20);  // 0
```

## gsap.utils.mapRange()

Map value from one range to another.

```javascript
// Map 50 from [0,100] to [0,500]
gsap.utils.mapRange(0, 100, 0, 500, 50);  // Returns 250

// Create reusable mapper
const mapper = gsap.utils.mapRange(0, 100, 0, 500);
mapper(50);   // 250
mapper(100);  // 500
```

## gsap.utils.normalize()

Convert value to 0-1 range.

```javascript
gsap.utils.normalize(0, 100, 50);    // Returns 0.5
gsap.utils.normalize(100, 200, 150); // Returns 0.5
gsap.utils.normalize(0, 100, 0);     // Returns 0
gsap.utils.normalize(0, 100, 100);   // Returns 1
```

## gsap.utils.interpolate()

Blend between values.

```javascript
// Numbers
gsap.utils.interpolate(0, 100, 0.5);  // 50

// Colors
gsap.utils.interpolate("red", "blue", 0.5);  // Purple-ish

// Objects
gsap.utils.interpolate(
  { x: 0, y: 0 },
  { x: 100, y: 200 },
  0.5
);  // { x: 50, y: 100 }

// Arrays - returns interpolator function
const colors = ["red", "green", "blue"];
const getColor = gsap.utils.interpolate(colors);
getColor(0);    // "red"
getColor(0.5);  // "green"
getColor(1);    // "blue"
```

## gsap.utils.random()

Generate random values.

```javascript
// Random between range
gsap.utils.random(0, 100);      // e.g., 42.7

// Random from array
gsap.utils.random(["red", "green", "blue"]);  // e.g., "green"

// Snapped random
gsap.utils.random(0, 100, 5);   // Multiple of 5, e.g., 35

// Reusable function
const randomX = gsap.utils.random(0, 500, true);
randomX();  // Different each call
randomX();  // Different each call
```

## gsap.utils.snap()

Snap value to increment or array.

```javascript
// Snap to increment
gsap.utils.snap(10, 23);   // 20
gsap.utils.snap(10, 27);   // 30

// Snap to array
gsap.utils.snap([0, 50, 100], 43);  // 50
gsap.utils.snap([0, 50, 100], 80);  // 100

// Create reusable snapper
const snap = gsap.utils.snap(10);
snap(23);  // 20
snap(27);  // 30

// Snap with radius
gsap.utils.snap({
  values: [0, 50, 100],
  radius: 10  // Only snap if within 10 of a value
}, 43);  // 43 (not close enough to snap)
```

## gsap.utils.wrap()

Wrap value within range (loops).

```javascript
gsap.utils.wrap(0, 100, 150);  // 50
gsap.utils.wrap(0, 100, 250);  // 50
gsap.utils.wrap(0, 100, -20);  // 80

// With array
gsap.utils.wrap(["a", "b", "c"], 0);  // "a"
gsap.utils.wrap(["a", "b", "c"], 3);  // "a"
gsap.utils.wrap(["a", "b", "c"], 4);  // "b"

// Create reusable wrapper
const wrap = gsap.utils.wrap(0, 360);
wrap(400);  // 40
wrap(-30);  // 330
```

## gsap.utils.wrapYoyo()

Wrap with back-and-forth (bounces).

```javascript
gsap.utils.wrapYoyo(0, 100, 150);  // 50 (bounced back)
gsap.utils.wrapYoyo(0, 100, 250);  // 50 (bounced again)
gsap.utils.wrapYoyo(0, 100, 350);  // 50

// Useful for looping animations that reverse
```

## gsap.utils.distribute()

Distribute values across elements.

```javascript
gsap.to(".box", {
  x: gsap.utils.distribute({
    base: 0,
    amount: 500,    // Total distribution
    from: "center", // "start", "end", "center", "edges", "random"
    ease: "power2"
  })
});

// Grid distribution
gsap.to(".grid-item", {
  scale: gsap.utils.distribute({
    base: 0.5,
    amount: 1,
    from: "center",
    grid: "auto"
  })
});
```

## gsap.utils.pipe()

Chain utility functions.

```javascript
const transform = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.mapRange(0, 100, 0, 1),
  (v) => Math.round(v * 100) / 100
);

transform(150);  // 1
transform(-50);  // 0
transform(50);   // 0.5
```

## gsap.utils.shuffle()

Randomize array order (in place).

```javascript
const arr = [1, 2, 3, 4, 5];
gsap.utils.shuffle(arr);
// arr is now randomized, e.g., [3, 1, 5, 2, 4]
```

## gsap.utils.splitColor()

Parse color to RGB/HSL array.

```javascript
gsap.utils.splitColor("red");           // [255, 0, 0]
gsap.utils.splitColor("#ff0000");       // [255, 0, 0]
gsap.utils.splitColor("rgb(255,0,0)");  // [255, 0, 0]
gsap.utils.splitColor("hsl(0,100%,50%)", true);  // [0, 100, 50] (HSL)
```

## gsap.utils.unitize()

Add unit to function output.

```javascript
const clampPx = gsap.utils.unitize(
  gsap.utils.clamp(0, 100),
  "px"
);

clampPx(50);   // "50px"
clampPx(150);  // "100px"
```

## gsap.utils.checkPrefix()

Get vendor-prefixed CSS property.

```javascript
gsap.utils.checkPrefix("transform");  // "transform" or "-webkit-transform"
```

## Common Patterns

### Progress-based Animation
```javascript
const mapProgress = gsap.utils.pipe(
  gsap.utils.clamp(0, 1),
  gsap.utils.mapRange(0, 1, 0, 500)
);

ScrollTrigger.create({
  onUpdate: (self) => {
    const x = mapProgress(self.progress);
    gsap.set(".box", { x });
  }
});
```

### Random Particle Positions
```javascript
const particles = gsap.utils.toArray(".particle");

particles.forEach(p => {
  gsap.set(p, {
    x: gsap.utils.random(0, window.innerWidth),
    y: gsap.utils.random(0, window.innerHeight),
    scale: gsap.utils.random(0.5, 1.5)
  });
});
```

### Grid Stagger from Center
```javascript
gsap.from(".grid-item", {
  scale: 0,
  stagger: {
    amount: 1,
    grid: "auto",
    from: "center"
  }
});
```

### Scroll-linked Color
```javascript
const colors = ["#ff0000", "#00ff00", "#0000ff"];
const getColor = gsap.utils.interpolate(colors);

ScrollTrigger.create({
  trigger: ".container",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const color = getColor(self.progress);
    gsap.set(".box", { backgroundColor: color });
  }
});
```

### Snap to Grid Positions
```javascript
const snapX = gsap.utils.snap(100);  // 100px grid
const snapY = gsap.utils.snap(100);

Draggable.create(".box", {
  type: "x,y",
  snap: {
    x: snapX,
    y: snapY
  }
});
```

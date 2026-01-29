# Observer Plugin

Unified handling for wheel, touch, pointer, and scroll events.

## Installation

```javascript
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);
```

## Basic Usage

```javascript
Observer.create({
  target: window,
  type: "wheel,touch,pointer",
  onUp: () => console.log("up"),
  onDown: () => console.log("down")
});
```

## Event Types

```javascript
Observer.create({
  type: "wheel",      // Mouse wheel
  type: "touch",      // Touch events
  type: "pointer",    // Mouse/pointer events
  type: "scroll",     // Scroll events
  type: "wheel,touch,pointer",  // Combined (most common)
  type: "wheel,touch,pointer,scroll"  // All
});
```

## Directional Callbacks

```javascript
Observer.create({
  target: window,
  type: "wheel,touch,pointer",

  // Vertical
  onUp: (self) => console.log("moving up"),
  onDown: (self) => console.log("moving down"),

  // Horizontal
  onLeft: (self) => console.log("moving left"),
  onRight: (self) => console.log("moving right"),

  // Any direction
  onChange: (self) => console.log("changed", self.deltaY),

  // Press/release
  onPress: (self) => console.log("pressed"),
  onRelease: (self) => console.log("released"),

  // Hover
  onHover: (self) => console.log("hover"),
  onHoverEnd: (self) => console.log("hover end"),

  // Stop (no movement detected)
  onStop: (self) => console.log("stopped"),
  onStopDelay: 0.25  // Delay before onStop fires
});
```

## Callback Parameters

```javascript
Observer.create({
  onDown: (self) => {
    self.deltaX;       // Horizontal movement
    self.deltaY;       // Vertical movement
    self.velocityX;    // Horizontal velocity
    self.velocityY;    // Vertical velocity
    self.event;        // Original event
    self.isPressed;    // Is pointer pressed
    self.startX;       // Start x position
    self.startY;       // Start y position
    self.x;            // Current x position
    self.y;            // Current y position
  }
});
```

## Configuration Options

```javascript
Observer.create({
  target: window,
  type: "wheel,touch,pointer",

  // Thresholds
  tolerance: 10,        // Minimum movement to trigger
  wheelSpeed: -1,       // Wheel speed multiplier (-1 inverts)

  // Behavior
  preventDefault: true, // Prevent default events
  capture: false,       // Use capture phase
  debounce: true,       // Debounce events

  // Axis locking
  axis: "y",            // Only track vertical ("y") or horizontal ("x")
  lockAxis: true,       // Lock to first direction detected

  // Ignore certain elements
  ignore: "input, textarea",
  dragMinimum: 3        // Minimum drag distance
});
```

## Common Patterns

### Section Navigation
```javascript
let currentSection = 0;
const sections = document.querySelectorAll(".section");

Observer.create({
  target: window,
  type: "wheel,touch,pointer",
  onUp: () => {
    if (currentSection > 0) {
      currentSection--;
      goToSection(currentSection);
    }
  },
  onDown: () => {
    if (currentSection < sections.length - 1) {
      currentSection++;
      goToSection(currentSection);
    }
  },
  tolerance: 100,
  preventDefault: true
});

function goToSection(index) {
  gsap.to(window, {
    scrollTo: sections[index],
    duration: 1
  });
}
```

### Full-screen Slider
```javascript
let currentSlide = 0;
const slides = gsap.utils.toArray(".slide");
const totalSlides = slides.length;
let animating = false;

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => !animating && gotoSlide(currentSlide + 1, 1),
  onUp: () => !animating && gotoSlide(currentSlide - 1, -1),
  tolerance: 10,
  preventDefault: true
});

function gotoSlide(index, direction) {
  if (index < 0 || index >= totalSlides) return;

  animating = true;
  currentSlide = index;

  gsap.to(slides, {
    yPercent: -100 * currentSlide,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => animating = false
  });
}
```

### Horizontal Drag Scroll
```javascript
const container = document.querySelector(".horizontal-container");
let startX = 0;

Observer.create({
  target: container,
  type: "touch,pointer",
  onPress: (self) => {
    startX = self.x;
  },
  onChange: (self) => {
    gsap.to(container, {
      scrollLeft: container.scrollLeft - self.deltaX,
      duration: 0.3
    });
  }
});
```

### Custom Scroll Progress
```javascript
Observer.create({
  type: "wheel,touch",
  onChange: (self) => {
    const progress = gsap.utils.clamp(0, 1, self.deltaY / 100);
    gsap.to(".progress-bar", { scaleX: progress });
  }
});
```

### Disable During Animation
```javascript
let observer;

observer = Observer.create({
  type: "wheel,touch,pointer",
  onDown: () => {
    observer.disable();  // Disable during animation

    gsap.to(".element", {
      y: 100,
      onComplete: () => observer.enable()  // Re-enable after
    });
  }
});
```

## Methods

```javascript
const observer = Observer.create({ ... });

// Enable/disable
observer.enable();
observer.disable();

// Kill
observer.kill();

// Get all observers
Observer.getAll();
```

## Integration with ScrollTrigger

```javascript
// Observer works alongside ScrollTrigger
gsap.registerPlugin(ScrollTrigger, Observer);

// Use Observer for custom interactions
Observer.create({
  type: "wheel,touch",
  onDown: () => {
    // Custom behavior that doesn't interfere with ScrollTrigger
  }
});

// ScrollTrigger for scroll-linked animations
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    scrub: true
  }
});
```

## Tips

1. Use `tolerance` to prevent accidental triggers
2. Set `preventDefault: true` for full control
3. Use `wheelSpeed: -1` to invert wheel direction
4. Combine with GSAP animations for smooth transitions
5. Disable observer during animations to prevent double-triggers

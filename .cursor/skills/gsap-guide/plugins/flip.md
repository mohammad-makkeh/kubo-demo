# Flip Plugin

Animate between layout states with the FLIP (First, Last, Invert, Play) technique.

## Installation

```javascript
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
```

## Basic Concept

1. **First**: Capture initial state
2. **Last**: Make DOM/CSS changes
3. **Invert & Play**: Animate from old state to new

## Basic Usage

```javascript
// 1. Get initial state
const state = Flip.getState(".box");

// 2. Make changes (move element, change class, etc.)
document.querySelector(".box").classList.toggle("active");

// 3. Animate from old state to new
Flip.from(state, {
  duration: 0.5,
  ease: "power2.inOut"
});
```

## getState Options

```javascript
const state = Flip.getState(".elements", {
  props: "backgroundColor, borderRadius", // Track these CSS props too
  simple: true  // Only track transforms (faster)
});
```

## Flip.from Options

```javascript
Flip.from(state, {
  duration: 0.6,
  ease: "power2.inOut",
  absolute: true,        // Use absolute positioning during flip
  scale: true,           // Animate scale changes
  nested: true,          // Handle nested flip elements
  prune: true,           // Remove elements that aren't changing
  onEnter: elements => { // New elements entering
    return gsap.from(elements, { opacity: 0, scale: 0 });
  },
  onLeave: elements => { // Elements being removed
    return gsap.to(elements, { opacity: 0, scale: 0 });
  },
  spin: true,            // Allow rotation during flip
  // spin: 1,            // Specific rotation amount
  stagger: 0.05
});
```

## Common Patterns

### Toggle Layout
```javascript
const boxes = gsap.utils.toArray(".box");
const container = document.querySelector(".container");

container.addEventListener("click", () => {
  const state = Flip.getState(boxes);

  container.classList.toggle("grid-layout");

  Flip.from(state, {
    duration: 0.6,
    ease: "power2.inOut",
    stagger: 0.05
  });
});
```

### Move Element Between Containers
```javascript
function moveToContainer(element, newContainer) {
  const state = Flip.getState(element);

  newContainer.appendChild(element);

  Flip.from(state, {
    duration: 0.5,
    ease: "power2.out"
  });
}
```

### Filter/Sort Items
```javascript
function filterItems(category) {
  const items = gsap.utils.toArray(".item");
  const state = Flip.getState(items);

  items.forEach(item => {
    const show = category === "all" || item.dataset.category === category;
    item.classList.toggle("hidden", !show);
  });

  Flip.from(state, {
    duration: 0.6,
    scale: true,
    ease: "power2.inOut",
    stagger: 0.05,
    onEnter: elements => gsap.from(elements, { opacity: 0, scale: 0.8 }),
    onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8 })
  });
}
```

### Expand Card
```javascript
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const state = Flip.getState(card);

    card.classList.toggle("expanded");

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: true
    });
  });
});
```

### Image Gallery
```javascript
const thumbnails = document.querySelectorAll(".thumbnail");
const fullview = document.querySelector(".fullview");

thumbnails.forEach(thumb => {
  thumb.addEventListener("click", () => {
    const state = Flip.getState(thumb);

    fullview.appendChild(thumb);
    thumb.classList.add("full");

    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true
    });
  });
});
```

## With ScrollTrigger

```javascript
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  onEnter: () => {
    const state = Flip.getState(".boxes");
    document.querySelector(".boxes").classList.add("scattered");
    Flip.from(state, { duration: 1, stagger: 0.1 });
  }
});
```

## Flip.fit()

Fit one element to another's size/position:

```javascript
// Make .box fit exactly where .target is
Flip.fit(".box", ".target", {
  duration: 0.5,
  scale: true
});
```

## Flip.to()

Animate to a specific state (reverse of Flip.from):

```javascript
const state = Flip.getState(".box");
// ... make changes
Flip.to(state, { duration: 0.5 });
```

## Tips

1. Use `absolute: true` when elements might overlap during animation
2. For complex layouts, track specific `props` needed
3. Use `stagger` for multiple elements
4. `onEnter`/`onLeave` are powerful for add/remove animations
5. Combine with ScrollTrigger for scroll-based layout changes

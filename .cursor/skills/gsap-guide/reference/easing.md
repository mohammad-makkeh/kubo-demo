# GSAP Easing Functions

Control animation timing and feel.

## Built-in Eases

### Linear
```javascript
ease: "none"  // Constant speed
```

### Power Eases
```javascript
ease: "power1"     // Subtle
ease: "power2"     // Moderate (default)
ease: "power3"     // Strong
ease: "power4"     // Very strong
```

### Special Eases
```javascript
ease: "back"       // Overshoot
ease: "bounce"     // Bouncy
ease: "elastic"    // Spring-like
ease: "sine"       // Gentle sine wave
ease: "expo"       // Exponential
ease: "circ"       // Circular
```

## Ease Directions

```javascript
ease: "power2.in"     // Start slow, end fast
ease: "power2.out"    // Start fast, end slow (most natural)
ease: "power2.inOut"  // Slow start and end
```

### Visual Guide
```
.in     = slow → fast     (accelerate)
.out    = fast → slow     (decelerate)
.inOut  = slow → fast → slow
```

## Configurable Eases

### Back (Overshoot)
```javascript
ease: "back"           // Default overshoot
ease: "back.out(1.7)"  // Custom overshoot amount
ease: "back.in(2)"     // Larger overshoot
ease: "back.inOut(3)"  // Very dramatic
```

### Elastic (Springy)
```javascript
ease: "elastic"                  // Default
ease: "elastic.out(1, 0.3)"      // amplitude, period
ease: "elastic.in(1.2, 0.5)"     // More bouncy, longer period
```

### Bounce
```javascript
ease: "bounce"          // Default bounce
ease: "bounce.out"      // Bounce at end (most common)
ease: "bounce.in"       // Bounce at start
ease: "bounce.inOut"    // Bounce both ends
```

## Steps (Stepped Animation)

```javascript
ease: "steps(5)"        // 5 discrete steps
ease: "steps(10)"       // 10 steps
ease: "steps(1)"        // Jump instantly (no in-between)
```

## Ease Visualizer

See all eases: https://gsap.com/docs/v3/Eases/

---

## CustomEase (Plugin)

Create custom easing curves.

### Installation
```javascript
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
```

### From SVG Path
```javascript
CustomEase.create("myEase",
  "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"
);

gsap.to(".box", { x: 500, ease: "myEase" });
```

### From Existing Ease
```javascript
CustomEase.create("customBounce", "bounce.out");
```

### Visual Editor
Use the online editor: https://gsap.com/docs/v3/Eases/CustomEase/

---

## CustomWiggle (Plugin)

Oscillating/wiggle eases.

```javascript
import { CustomWiggle } from "gsap/CustomWiggle";
gsap.registerPlugin(CustomEase, CustomWiggle);

CustomWiggle.create("wiggle", {
  wiggles: 8,
  type: "uniform"  // "uniform", "random", "easeOut", "anticipate"
});

gsap.to(".box", { rotation: 30, ease: "wiggle", duration: 2 });
```

### Wiggle Types
```javascript
type: "uniform"     // Even wiggles
type: "random"      // Random amplitudes
type: "easeOut"     // Start strong, fade out
type: "anticipate"  // Build up then settle
```

---

## CustomBounce (Plugin)

Configurable bounce easing.

```javascript
import { CustomBounce } from "gsap/CustomBounce";
gsap.registerPlugin(CustomEase, CustomBounce);

CustomBounce.create("myBounce", {
  strength: 0.6,    // Bounce intensity
  squash: 3,        // Squash/stretch amount
  squashID: "myBounce-squash"  // ID for squash ease
});

// Use bounce ease
gsap.to(".ball", { y: 300, ease: "myBounce", duration: 2 });

// Use matching squash ease
gsap.to(".ball", {
  scaleX: 1.4,
  scaleY: 0.6,
  ease: "myBounce-squash",
  duration: 2
});
```

---

## EasePack (Plugin)

Additional easing functions.

```javascript
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);
```

### Rough Ease
Imperfect, organic movement.

```javascript
ease: "rough({ strength: 1, points: 20, template: none, taper: none, randomize: true })"

// Options
strength: 1,      // Jitter amount
points: 20,       // Number of points
template: "none", // Base ease to apply jitter to
taper: "none",    // "none", "in", "out", "both"
randomize: true   // Randomize on each use
```

### Slow Ease
Slow start and end, fast middle.

```javascript
ease: "slow(0.7, 0.7, false)"

// Parameters
// slow(linearRatio, power, yoyoMode)
slow(0.7, 0.7, false)  // 70% linear, power 0.7, no yoyo
```

### ExpoScale Ease
Exponential with scale.

```javascript
ease: "expoScale(1, 2)"

// Good for scaling animations
gsap.to(".box", { scale: 2, ease: "expoScale(1, 2)" });
```

---

## Ease Functions

Use functions for dynamic easing.

```javascript
gsap.to(".box", {
  x: 500,
  ease: (progress) => {
    // progress is 0-1
    return progress * progress;  // Quadratic in
  }
});
```

---

## Common Patterns

### Natural Movement
```javascript
// Most natural for UI
ease: "power2.out"
ease: "power3.out"
```

### Playful/Bouncy
```javascript
ease: "back.out(1.7)"
ease: "elastic.out(1, 0.5)"
ease: "bounce.out"
```

### Smooth/Elegant
```javascript
ease: "sine.inOut"
ease: "power1.inOut"
ease: "circ.inOut"
```

### Dramatic
```javascript
ease: "expo.out"
ease: "power4.out"
```

### Technical/UI
```javascript
ease: "power2.inOut"  // Smooth in and out
ease: "circ.out"      // Quick settle
```

---

## Quick Reference

| Ease | Feel | Use Case |
|------|------|----------|
| `none` | Linear | Progress bars, continuous |
| `power1.out` | Subtle | Subtle UI transitions |
| `power2.out` | Natural | Default, most transitions |
| `power3.out` | Snappy | Emphasis, attention |
| `power4.out` | Dramatic | Hero animations |
| `back.out` | Overshoot | Playful, bouncy UI |
| `elastic.out` | Springy | Playful, attention |
| `bounce.out` | Bouncy | Drop effects, playful |
| `expo.out` | Fast start | Page transitions |
| `circ.out` | Smooth | Cards, modals |
| `sine.inOut` | Gentle | Hover effects, subtle |

---

## Tips

1. **Default**: `power2.out` works for most cases
2. **UI Elements**: Use `.out` variants (fast → slow)
3. **Emphasis**: Use `back`, `elastic`, or `bounce`
4. **Elegance**: Use `sine` or `circ`
5. **Test**: Use the visualizer to find the right feel

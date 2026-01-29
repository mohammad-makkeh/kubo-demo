# GSAP Core Methods

Essential GSAP methods and concepts.

## Tween Methods

### gsap.to()
Animate TO specified values.

```javascript
gsap.to(".box", {
  duration: 1,
  x: 100,
  opacity: 0.5,
  ease: "power2.out"
});
```

### gsap.from()
Animate FROM specified values to current state.

```javascript
gsap.from(".box", {
  duration: 1,
  x: -100,
  opacity: 0
});
```

### gsap.fromTo()
Animate FROM one state TO another.

```javascript
gsap.fromTo(".box",
  { x: 0, opacity: 0 },           // From
  { duration: 1, x: 100, opacity: 1 } // To
);
```

### gsap.set()
Instantly set properties (no animation).

```javascript
gsap.set(".box", { x: 100, opacity: 0 });

// Multiple elements
gsap.set([".box1", ".box2"], { scale: 0 });
```

## Timeline

Create sequences of animations.

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { x: 100, duration: 1 })      // After box1
  .to(".box3", { x: 100, duration: 1 }, "<")  // Same time as box2
  .to(".box4", { x: 100, duration: 1 }, "-=0.5"); // Overlap
```

### Position Parameter

```javascript
tl.to(".a", { x: 100 })
  .to(".b", { x: 100 })       // After previous
  .to(".c", { x: 100 }, 2)    // At 2 seconds
  .to(".d", { x: 100 }, "+=1") // 1 second after previous ends
  .to(".e", { x: 100 }, "-=1") // 1 second before previous ends
  .to(".f", { x: 100 }, "<")   // Same start as previous
  .to(".g", { x: 100 }, "<1")  // 1 second after previous starts
  .to(".h", { x: 100 }, ">")   // After previous ends (same as default)
```

### Timeline Options

```javascript
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" },
  paused: true,
  repeat: -1,
  yoyo: true,
  onComplete: () => console.log("done")
});
```

### Timeline Controls

```javascript
tl.play();
tl.pause();
tl.resume();
tl.reverse();
tl.restart();
tl.seek(2);        // Go to 2 seconds
tl.progress(0.5);  // Go to 50%
tl.timeScale(2);   // Double speed
```

## Common Tween Properties

### Transform
```javascript
gsap.to(".box", {
  x: 100,          // translateX
  y: 100,          // translateY
  xPercent: 50,    // translateX in %
  yPercent: 50,    // translateY in %
  rotation: 360,   // rotate in degrees
  rotationX: 45,   // 3D rotate X
  rotationY: 45,   // 3D rotate Y
  scale: 2,        // scaleX and scaleY
  scaleX: 1.5,
  scaleY: 1.5,
  skewX: 10,
  skewY: 10,
  transformOrigin: "center center"
});
```

### CSS Properties
```javascript
gsap.to(".box", {
  width: 200,
  height: 100,
  padding: 20,
  margin: 10,
  borderRadius: 10,
  backgroundColor: "#ff0000",
  color: "#fff",
  fontSize: 24,
  opacity: 0.5
});
```

### Special Properties
```javascript
gsap.to(".box", {
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
  repeat: 2,           // Repeat 2 times (3 total plays)
  repeat: -1,          // Infinite
  yoyo: true,          // Reverse on repeat
  repeatDelay: 0.5,    // Delay between repeats
  stagger: 0.1,        // Stagger multiple elements
  overwrite: "auto"    // Handle conflicting tweens
});
```

## Stagger

Animate multiple elements with delay.

```javascript
// Simple stagger
gsap.to(".item", {
  x: 100,
  stagger: 0.1  // 0.1s between each
});

// Advanced stagger
gsap.to(".item", {
  x: 100,
  stagger: {
    each: 0.1,
    from: "center",     // "start", "end", "center", "edges", "random", or index
    grid: "auto",       // For grid layouts
    ease: "power2.in",
    repeat: -1,
    yoyo: true
  }
});
```

## Callbacks

```javascript
gsap.to(".box", {
  x: 100,
  onStart: () => console.log("started"),
  onUpdate: function() {
    console.log("progress:", this.progress());
  },
  onComplete: () => console.log("complete"),
  onRepeat: () => console.log("repeating"),
  onReverseComplete: () => console.log("reverse complete"),

  // With parameters
  onComplete: myFunc,
  onCompleteParams: ["arg1", "arg2"],
  callbackScope: myObject
});
```

## Keyframes

Multiple states in one tween.

```javascript
// Array format
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 1 },
    { y: 100, duration: 0.5 },
    { rotation: 360, duration: 1 }
  ]
});

// Percentage format
gsap.to(".box", {
  keyframes: {
    "0%": { x: 0 },
    "50%": { x: 100 },
    "100%": { x: 50 }
  },
  duration: 2
});
```

## Quick Methods

### gsap.quickTo()
Optimized for frequent updates (cursor follow, etc.).

```javascript
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.5, ease: "power3" });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.5, ease: "power3" });

document.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

### gsap.quickSetter()
Fastest way to set properties (no tweening).

```javascript
const setX = gsap.quickSetter(".box", "x", "px");
const setRotation = gsap.quickSetter(".box", "rotation", "deg");

gsap.ticker.add(() => {
  setX(mouseX);
  setRotation(angle);
});
```

## Control Methods

### Get Property
```javascript
const x = gsap.getProperty(".box", "x");
const bg = gsap.getProperty(".box", "backgroundColor");
const width = gsap.getProperty(".box", "width", "px");
```

### Kill Tweens
```javascript
gsap.killTweensOf(".box");
gsap.killTweensOf(".box", "x,y");  // Kill specific properties
```

### Check Tweening
```javascript
if (gsap.isTweening(".box")) {
  console.log("animation in progress");
}
```

### Get Tweens
```javascript
const tweens = gsap.getTweensOf(".box");
tweens.forEach(tween => tween.pause());
```

## Global Timeline

```javascript
// Export all animations
const allAnimations = gsap.exportRoot();
allAnimations.pause();
allAnimations.timeScale(0.5);
```

## Ticker

```javascript
// Add to animation loop
gsap.ticker.add(myFunction);

// Remove
gsap.ticker.remove(myFunction);

// Limit FPS
gsap.ticker.fps(30);

// Get info
gsap.ticker.add((time, deltaTime, frame) => {
  console.log("Frame:", frame, "Delta:", deltaTime);
});
```

## Delayed Call

```javascript
gsap.delayedCall(2, myFunction);
gsap.delayedCall(1, greet, ["Hello", "World"]);

// Controllable
const delayed = gsap.delayedCall(3, callback);
delayed.kill();
```

## Defaults

```javascript
gsap.defaults({
  duration: 0.5,
  ease: "power2.out"
});

// All tweens now use these defaults
gsap.to(".box", { x: 100 });  // duration: 0.5, ease: power2.out
```

## Register Effects

```javascript
gsap.registerEffect({
  name: "fadeIn",
  effect: (targets, config) => {
    return gsap.from(targets, {
      opacity: 0,
      y: config.y || 50,
      duration: config.duration || 1
    });
  },
  defaults: { y: 50, duration: 1 },
  extendTimeline: true
});

// Use effect
gsap.effects.fadeIn(".box");
gsap.effects.fadeIn(".box", { y: 100, duration: 2 });

// In timeline
tl.fadeIn(".box");
```

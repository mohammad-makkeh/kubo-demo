/**
 * Basic GSAP Tween Example
 * Demonstrates fundamental GSAP animation concepts
 *
 * 📖 Documentation:
 * - Core Methods: reference/core-methods.md
 * - Easing: reference/easing.md
 * - Vanilla JS: frameworks/vanilla.md
 */

// 1. Simple gsap.to() - Animate TO values
gsap.to(".box", {
  duration: 1,
  opacity: 0,
  x: 100, // Moves right 100px
  rotation: 360,
});

// 2. gsap.from() - Animate FROM values
gsap.from(".box", {
  duration: 1,
  opacity: 0, // Starts invisible, animates to visible
  y: -50,
});

// 3. gsap.fromTo() - Define both FROM and TO
gsap.fromTo(
  ".box",
  {opacity: 0, x: -50}, // FROM values
  {opacity: 1, x: 0, duration: 1} // TO values
);

// 4. Multiple elements with stagger
gsap.to(".item", {
  duration: 0.6,
  opacity: 1,
  y: 0,
  stagger: 0.1, // Each item starts 100ms after the previous
});

// 5. With callbacks
gsap.to(".box", {
  duration: 1,
  opacity: 0,
  onStart() {
    console.log("Animation started");
  },
  onUpdate() {
    console.log("Frame update");
  },
  onComplete() {
    console.log("Animation finished");
  },
});

// 6. With easing
gsap.to(".box", {
  duration: 1,
  x: 100,
  ease: "power2.inOut", // Different easing functions
});

// 7. Delay before animation starts
gsap.to(".box", {
  duration: 1,
  opacity: 1,
  delay: 0.5, // Wait 500ms before starting
});

// 8. Repeat and yoyo
gsap.to(".box", {
  duration: 1,
  x: 100,
  repeat: 2, // Repeat 2 times (3 total)
  yoyo: true, // Reverse on repeat
});

// 9. Animate numeric values (not just CSS)
let counter = {value: 0};
gsap.to(counter, {
  duration: 2,
  value: 100,
  onUpdate() {
    document.querySelector(".counter").textContent = Math.floor(counter.value);
  },
});

// 10. Cleanup with context (recommended)
let ctx = gsap.context(() => {
  gsap.to(".box", {duration: 1, opacity: 0});
  gsap.to(".box", {duration: 1, x: 100});
});

// Later: Clean up all animations and event listeners
// ctx.revert();

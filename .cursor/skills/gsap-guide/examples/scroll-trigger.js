/**
 * GSAP ScrollTrigger Examples
 * Trigger animations based on scroll position
 *
 * 📖 Documentation:
 * - ScrollTrigger: plugins/scroll-trigger.md
 * - Core Methods: reference/core-methods.md
 * - Vanilla JS: frameworks/vanilla.md
 *
 * 💡 Key concepts:
 * - Start/End position syntax
 * - Scrub for scroll-linked animations
 * - Pin for fixed positioning
 * - Callbacks for events
 * - Refresh for dynamic content
 */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================
// 1. Basic Scroll Animation
// ============================================
gsap.to(".fade-in", {
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top center", // When top of element hits center of viewport
    end: "bottom center",
    markers: true, // Debug markers (remove in production)
  },
  opacity: 1,
  duration: 1,
});

// ============================================
// 2. Parallax Effect
// ============================================
gsap.to(".parallax-item", {
  y: 200,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top center",
    end: "bottom center",
    scrub: 1, // Smooth scrubbing (1 = 1 second lag)
    markers: true,
  },
});

// ============================================
// 3. Animated Counter on Scroll
// ============================================
const counter = {value: 0};

gsap.to(counter, {
  value: 1000,
  duration: 2,
  scrollTrigger: {
    trigger: ".counter-section",
    start: "top 80%",
    onEnter: () => console.log("Counter section entered"),
    onLeave: () => console.log("Counter section left"),
  },
  onUpdate() {
    document.querySelector(".counter-display").textContent =
      Math.floor(counter.value);
  },
});

// ============================================
// 4. Pin Element During Scroll
// ============================================
gsap.to(".pinned-element", {
  scrollTrigger: {
    trigger: ".pinned-element",
    start: "top 10%",
    end: "bottom 10%",
    pin: true, // Keep element fixed while scrolling
    pinSpacing: true, // Add spacing to prevent layout shift
    markers: true,
  },
});

// ============================================
// 5. Horizontal Scroll Animation
// ============================================
gsap.to(".horizontal-scroll", {
  x: -500,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    markers: true,
  },
});

// ============================================
// 6. Staggered Scroll Animation
// ============================================
gsap.to(".list-item", {
  scrollTrigger: {
    trigger: ".list-container",
    start: "top 80%",
  },
  opacity: 1,
  x: 0,
  duration: 0.8,
  stagger: 0.1, // Each item delays by 100ms
});

// ============================================
// 7. Advanced: Timeline with ScrollTrigger
// ============================================
const scrollTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".advanced-section",
    start: "top center",
    end: "center center",
    scrub: 1,
    markers: true,
  },
});

scrollTl
  .to(".box-1", {duration: 1, x: 100, opacity: 1})
  .to(".box-2", {duration: 1, x: -100, opacity: 1}, 0)
  .to(".box-3", {duration: 1, rotation: 360}, "-=0.5");

// ============================================
// 8. Callback Functions
// ============================================
gsap.to(".callback-box", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".callback-section",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      console.log("Element entered viewport");
      document.querySelector(".callback-box").style.color = "green";
    },
    onLeave: () => console.log("Element left viewport (downward)"),
    onEnterBack: () => {
      console.log("Element entered viewport (upward)");
      document.querySelector(".callback-box").style.color = "blue";
    },
    onLeaveBack: () => console.log("Element left viewport (upward)"),
  },
  duration: 1,
});

// ============================================
// 9. Refresh ScrollTrigger (when DOM changes)
// ============================================
function addNewElement() {
  const newEl = document.createElement("div");
  newEl.className = "new-item";
  document.body.appendChild(newEl);

  // Refresh all ScrollTriggers after DOM change
  ScrollTrigger.refresh();
}

// ============================================
// 10. Cleanup ScrollTriggers
// ============================================
function cleanupScrollTriggers() {
  // Kill specific ScrollTrigger
  // ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Or use context for automatic cleanup
  let ctx = gsap.context(() => {
    gsap.to(".element", {
      scrollTrigger: {
        trigger: ".element",
        start: "top center",
      },
      opacity: 1,
    });
  });

  // Later: ctx.revert(); will clean up everything
}

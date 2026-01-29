# GSAP Examples

Working code examples demonstrating GSAP patterns and concepts.

## 📂 Files

### `basic-tween.js`
Fundamental GSAP concepts:
- `gsap.to()`, `gsap.from()`, `gsap.fromTo()`
- Stagger effects
- Callbacks (onStart, onUpdate, onComplete)
- Easing functions
- Delay and repeat
- Numeric value animation
- Context-based cleanup

**Reference:** `reference/core-methods.md`

---

### `react-timeline.jsx`
Timeline sequencing in React:
- Creating timelines with `gsap.timeline()`
- Position parameters (0, +=, -=, <, >)
- Adding labels
- Timeline controls (play, pause, reverse)
- Using `useGSAP` hook
- Ref-based targeting
- Automatic cleanup

**Reference:** `reference/core-methods.md` + `frameworks/react.md`

---

### `scroll-trigger.js`
Scroll-based animations:
- Basic scroll triggering
- Parallax effects with `scrub`
- Counter animation on scroll
- Pinning elements
- Horizontal scroll animation
- Staggered scroll animations
- Timeline with ScrollTrigger
- Callback functions (onEnter, onLeave, etc.)
- Refresh for dynamic content
- Cleanup patterns

**Reference:** `plugins/scroll-trigger.md`

---

### `next-js-setup.jsx`
Next.js and SSR-safe patterns:
- Safe client-side animation with `useGSAP`
- Hydration handling
- ScrollTrigger in Next.js
- Dynamic content animation
- Image load handling
- Responsive animation with `matchMedia`
- Layout shift prevention
- Page transition animations
- Best practices summary

**Reference:** `frameworks/nextjs.md` (⚠️ READ THIS FIRST)

---

## 🚀 Getting Started

### Option 1: Try in Your Project
Copy any example code into your project and adapt it.

### Option 2: Standalone Testing
Create a simple HTML file and test locally:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background: blue;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <script>
    // Paste example code here
  </script>
</body>
</html>
```

---

## 📖 Using with Documentation

Each example file has a header comment showing which docs to reference:

```javascript
/**
 * Example Name
 *
 * 📖 Documentation:
 * - Type: file/path.md
 * - Topic: topic/area.md
 */
```

**Always read the referenced documentation** for deeper understanding:

1. **Core Concepts** → `reference/core-methods.md`
2. **Plugin Details** → `plugins/{plugin-name}.md`
3. **Framework Guide** → `frameworks/{framework}.md`
4. **Easing Options** → `reference/easing.md`
5. **Utility Functions** → `reference/utilities.md`

---

## ✅ Testing Checklist

When trying examples:

- [ ] GSAP library loaded (CDN or npm)
- [ ] Required plugins registered
- [ ] HTML elements with correct class names exist
- [ ] No console errors
- [ ] Animation plays smoothly
- [ ] Framework-specific setup done (React hooks, Next.js "use client", etc.)

---

## 🔧 Common Customizations

### Change Duration
```javascript
gsap.to(".box", {
  duration: 2,  // Change this
  x: 100
});
```

### Change Easing
```javascript
gsap.to(".box", {
  ease: "bounce.out",  // Try different eases
  x: 100
});
```

### Target Different Elements
```javascript
gsap.to(".your-class", {  // Change selector
  duration: 1,
  opacity: 0
});
```

### Adjust Delay
```javascript
gsap.to(".box", {
  delay: 1,  // Change this
  x: 100
});
```

---

## 🐛 Troubleshooting

### Animation doesn't play
1. Check element selector matches HTML
2. Verify GSAP library is loaded
3. Check browser console for errors
4. Ensure z-index isn't hiding element

### ScrollTrigger not triggering
1. Remove `markers: true` if present (debug only)
2. Call `ScrollTrigger.refresh()` after DOM changes
3. Check `start` and `end` positions
4. Verify element is visible on scroll

### React/Next.js issues
1. Use `useGSAP` hook, not useEffect
2. Add `"use client"` directive for Next.js
3. Always use `scope` parameter
4. Call `ScrollTrigger.refresh()` after state changes

---

## 📚 Next Steps

After reviewing examples:

1. **Read** the documentation files referenced
2. **Modify** examples to fit your use case
3. **Combine** patterns from different examples
4. **Reference** official GSAP docs: https://gsap.com/docs/v3/

---

## 📄 License

These examples are MIT licensed - feel free to use and modify!

---

**Happy animating!** ✨

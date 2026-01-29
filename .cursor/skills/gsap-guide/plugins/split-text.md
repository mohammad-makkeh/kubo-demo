# SplitText Plugin

Split text into characters, words, or lines for granular animation control.

**Note:** SplitText is a premium plugin (Club GSAP membership required).

## Installation

```javascript
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
```

## Basic Usage

```javascript
// Split into characters
const split = new SplitText(".headline", { type: "chars" });

// Animate each character
gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  duration: 0.5,
  stagger: 0.02
});
```

## Split Types

```javascript
// Characters only
new SplitText(".text", { type: "chars" });

// Words only
new SplitText(".text", { type: "words" });

// Lines only
new SplitText(".text", { type: "lines" });

// Combined (most common)
new SplitText(".text", { type: "chars, words, lines" });
```

## Access Split Elements

```javascript
const split = new SplitText(".text", { type: "chars, words, lines" });

split.chars;  // Array of character elements
split.words;  // Array of word elements
split.lines;  // Array of line elements
```

## Custom Class Names

```javascript
const split = new SplitText(".text", {
  type: "chars, words",
  charsClass: "char",      // Class for each character
  wordsClass: "word",      // Class for each word
  linesClass: "line"       // Class for each line
});
```

## Positioning Options

```javascript
const split = new SplitText(".text", {
  type: "chars",
  position: "relative"  // or "absolute"
});
```

## Revert (Restore Original)

```javascript
const split = new SplitText(".text", { type: "chars" });

// Later, restore original text
split.revert();
```

## Common Patterns

### Character Reveal
```javascript
const split = new SplitText(".headline", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  y: 100,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.5,
  ease: "back.out"
});
```

### Word-by-Word Reveal
```javascript
const split = new SplitText(".paragraph", { type: "words" });

gsap.from(split.words, {
  opacity: 0,
  y: 20,
  stagger: 0.05,
  duration: 0.3
});
```

### Line-by-Line Reveal
```javascript
const split = new SplitText(".content", { type: "lines" });

gsap.from(split.lines, {
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 0.6
});
```

### Wave Effect
```javascript
const split = new SplitText(".wave-text", { type: "chars" });

gsap.to(split.chars, {
  y: -20,
  stagger: {
    each: 0.05,
    repeat: -1,
    yoyo: true
  },
  duration: 0.3
});
```

### Scroll-triggered Text
```javascript
const split = new SplitText(".scroll-text", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  stagger: 0.02,
  scrollTrigger: {
    trigger: ".scroll-text",
    start: "top 80%"
  }
});
```

### Typewriter Effect
```javascript
const split = new SplitText(".typewriter", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  stagger: 0.05,
  duration: 0.01  // Instant appear
});
```

## With Timeline

```javascript
const split = new SplitText(".multi-line", { type: "chars, words, lines" });

const tl = gsap.timeline();

tl.from(split.lines, { opacity: 0, y: 50, stagger: 0.1 })
  .from(split.words, { color: "red", stagger: 0.02 }, "-=0.5")
  .to(split.chars, {
    color: "blue",
    stagger: { each: 0.01, from: "random" }
  });
```

## Responsive Handling

```javascript
let split;

function initSplit() {
  // Revert previous split if exists
  if (split) split.revert();

  // Create new split
  split = new SplitText(".responsive-text", { type: "lines" });

  gsap.from(split.lines, { opacity: 0, y: 50, stagger: 0.1 });
}

// Init on load
initSplit();

// Re-init on resize (debounced)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSplit, 250);
});
```

## Nested Splits

```javascript
// Split into lines first, then chars within lines
const splitLines = new SplitText(".text", { type: "lines" });
const splitChars = new SplitText(splitLines.lines, { type: "chars" });

// Animate
gsap.from(splitChars.chars, {
  opacity: 0,
  y: 20,
  stagger: 0.01
});

// Revert in reverse order
splitChars.revert();
splitLines.revert();
```

## Tips

1. Always `revert()` before re-splitting (especially on resize)
2. Use `will-change: transform` CSS on parent for performance
3. For long text, consider splitting words/lines instead of chars
4. Remember to handle the split instance for cleanup

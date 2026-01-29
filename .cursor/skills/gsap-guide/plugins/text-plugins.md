# Text Plugins

TextPlugin and ScrambleTextPlugin for text content animations.

## TextPlugin

Animate text content character by character.

### Installation

```javascript
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);
```

### Basic Usage

```javascript
// Replace text character by character
gsap.to(".heading", {
  text: "New heading text",
  duration: 2,
  ease: "none"
});
```

### Configuration

```javascript
gsap.to(".element", {
  text: {
    value: "New text content",
    delimiter: "",        // "" = character by character (default)
    // delimiter: " ",    // Word by word
    newClass: "new-text", // Class for new characters
    oldClass: "old-text", // Class for old characters
    padSpace: true        // Pad with spaces to prevent layout shift
  },
  duration: 2
});
```

### Common Patterns

#### Typewriter Effect
```javascript
gsap.to(".typewriter", {
  text: "Hello, I'm typing this out...",
  duration: 3,
  ease: "none"
});
```

#### Word by Word
```javascript
gsap.to(".text", {
  text: {
    value: "This appears word by word",
    delimiter: " "
  },
  duration: 2
});
```

#### With Cursor
```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to(".text", { text: "Typing...", duration: 2, ease: "none" })
  .to(".cursor", { opacity: 0, repeat: 3, yoyo: true, duration: 0.5 })
  .to(".text", { text: "", duration: 1, ease: "none" });
```

---

## ScrambleTextPlugin

Animated text scrambling/decoding effect.

**Note:** ScrambleText is a premium plugin (Club GSAP membership required).

### Installation

```javascript
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);
```

### Basic Usage

```javascript
gsap.to(".text", {
  scrambleText: "DECODED TEXT",
  duration: 2
});
```

### Configuration

```javascript
gsap.to(".element", {
  scrambleText: {
    text: "Final text here",
    chars: "upperCase",    // Character set for scramble
    revealDelay: 0.5,      // Delay before revealing
    speed: 0.3,            // Scramble speed
    newClass: "revealed",  // Class for revealed text
    oldClass: "scrambled", // Class for scrambled text
    tweenLength: true      // Animate length change
  },
  duration: 2
});
```

### Character Sets

```javascript
// Preset character sets
chars: "upperCase"      // A-Z
chars: "lowerCase"      // a-z
chars: "upperAndLowerCase"  // A-Z, a-z

// Custom characters
chars: "01"             // Binary look
chars: "!@#$%^&*()"     // Symbols
chars: "アイウエオ"      // Custom characters
chars: "XO"             // Simple alternation
```

### Common Patterns

#### Matrix/Hacker Effect
```javascript
gsap.to(".hacker-text", {
  scrambleText: {
    text: "ACCESS GRANTED",
    chars: "01",
    speed: 1
  },
  duration: 2
});
```

#### Reveal on Scroll
```javascript
gsap.to(".scramble", {
  scrambleText: {
    text: "Welcome to our site",
    chars: "lowerCase",
    revealDelay: 0.3
  },
  duration: 1.5,
  scrollTrigger: {
    trigger: ".scramble",
    start: "top 80%"
  }
});
```

#### Sequential Scramble
```javascript
const elements = gsap.utils.toArray(".scramble-item");

elements.forEach((el, i) => {
  gsap.to(el, {
    scrambleText: el.dataset.text,
    duration: 1,
    delay: i * 0.3
  });
});
```

#### Hover Scramble
```javascript
const element = document.querySelector(".hover-text");
const originalText = element.textContent;

element.addEventListener("mouseenter", () => {
  gsap.to(element, {
    scrambleText: {
      text: "HOVER TEXT",
      chars: "upperCase"
    },
    duration: 0.5
  });
});

element.addEventListener("mouseleave", () => {
  gsap.to(element, {
    scrambleText: {
      text: originalText,
      chars: "upperCase"
    },
    duration: 0.5
  });
});
```

#### Loading Text
```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to(".loading", {
    scrambleText: { text: "Loading.", chars: "." }
  }, 0.3)
  .to(".loading", {
    scrambleText: { text: "Loading..", chars: "." }
  }, 0.3)
  .to(".loading", {
    scrambleText: { text: "Loading...", chars: "." }
  }, 0.3);
```

## Combining Both

```javascript
const tl = gsap.timeline();

// First scramble reveal
tl.to(".title", {
  scrambleText: {
    text: "Welcome",
    chars: "upperCase"
  },
  duration: 1
})
// Then type subtitle
.to(".subtitle", {
  text: "to our amazing website",
  duration: 1.5,
  ease: "none"
});
```

## Tips

1. **TextPlugin**: Use `ease: "none"` for consistent typing speed
2. **ScrambleText**: Higher `speed` = faster scrambling
3. Both work great with ScrollTrigger
4. Use `delimiter: " "` for word-by-word reveals
5. Combine with CSS animations for cursor effects

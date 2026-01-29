# GSAP with React

Best practices for using GSAP in React applications.

## Installation

```bash
npm install gsap @gsap/react
```

## The useGSAP Hook (Recommended)

The official `useGSAP` hook handles cleanup automatically.

```javascript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function MyComponent() {
  const container = useRef(null);

  useGSAP(() => {
    // All GSAP animations here
    gsap.to(".box", { x: 100, duration: 1 });
  }, { scope: container }); // Scoped to container

  return (
    <div ref={container}>
      <div className="box">Animated</div>
    </div>
  );
}
```

## Why useGSAP?

1. **Automatic Cleanup** - Kills animations on unmount
2. **Scoping** - Targets only elements within container
3. **Dependency Array** - React-style reactivity
4. **SSR Safe** - Works with Next.js

## With Dependencies

```javascript
useGSAP(() => {
  gsap.to(".box", { x: position, duration: 0.5 });
}, { dependencies: [position], scope: container });

// Or shorthand
useGSAP(() => {
  gsap.to(".box", { x: position, duration: 0.5 });
}, [position]); // Without scope, uses document
```

## Register Plugins

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register outside component (once)
gsap.registerPlugin(useGSAP, ScrollTrigger);
```

## Common Patterns

### Animation on Mount
```javascript
function FadeIn({ children }) {
  const el = useRef(null);

  useGSAP(() => {
    gsap.from(el.current, {
      opacity: 0,
      y: 20,
      duration: 0.6
    });
  }, { scope: el });

  return <div ref={el}>{children}</div>;
}
```

### Animation on State Change
```javascript
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);
  const box = useRef(null);

  useGSAP(() => {
    gsap.to(box.current, {
      height: isOpen ? "auto" : 0,
      duration: 0.3
    });
  }, { dependencies: [isOpen] });

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <div ref={box} style={{ overflow: "hidden" }}>
        Content here
      </div>
    </>
  );
}
```

### Staggered List
```javascript
function StaggeredList({ items }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5
    });
  }, { scope: container, dependencies: [items] });

  return (
    <ul ref={container}>
      {items.map((item, i) => (
        <li key={i} className="item">{item}</li>
      ))}
    </ul>
  );
}
```

### Timeline
```javascript
function Timeline() {
  const container = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline()
      .to(".box1", { x: 100 })
      .to(".box2", { x: 100 })
      .to(".box3", { x: 100 });
  }, { scope: container });

  const handleReverse = () => tl.current.reverse();
  const handlePlay = () => tl.current.play();

  return (
    <div ref={container}>
      <div className="box1" />
      <div className="box2" />
      <div className="box3" />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleReverse}>Reverse</button>
    </div>
  );
}
```

### With ScrollTrigger
```javascript
function ScrollAnimation() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to(".box", {
      x: 500,
      scrollTrigger: {
        trigger: ".box",
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="box">Scroll me</div>
    </div>
  );
}
```

### Hover Animation
```javascript
function HoverBox() {
  const box = useRef(null);

  const { contextSafe } = useGSAP({ scope: box });

  const onEnter = contextSafe(() => {
    gsap.to(box.current, { scale: 1.1, duration: 0.3 });
  });

  const onLeave = contextSafe(() => {
    gsap.to(box.current, { scale: 1, duration: 0.3 });
  });

  return (
    <div
      ref={box}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      Hover me
    </div>
  );
}
```

## contextSafe for Event Handlers

When creating animations in event handlers, use `contextSafe`:

```javascript
function Component() {
  const container = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  // Safe event handler
  const handleClick = contextSafe(() => {
    gsap.to(".box", { rotation: 360 });
  });

  return (
    <div ref={container}>
      <button onClick={handleClick}>Animate</button>
      <div className="box" />
    </div>
  );
}
```

## Using Refs for Direct Targeting

```javascript
function DirectRef() {
  const boxRef = useRef(null);

  useGSAP(() => {
    gsap.to(boxRef.current, { x: 100 });
  });

  return <div ref={boxRef}>Box</div>;
}
```

## Multiple Refs with useRef

```javascript
function MultipleRefs() {
  const boxesRef = useRef([]);

  useGSAP(() => {
    gsap.to(boxesRef.current, {
      x: 100,
      stagger: 0.1
    });
  });

  return (
    <div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => (boxesRef.current[i] = el)}
        >
          Box {i}
        </div>
      ))}
    </div>
  );
}
```

## Without useGSAP (Manual Cleanup)

If not using `@gsap/react`:

```javascript
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Component() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".box", { x: 100 });
    }, container);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div ref={container}>
      <div className="box" />
    </div>
  );
}
```

## Tips

1. Always use `scope` or `gsap.context()` for proper cleanup
2. Register plugins once, outside components
3. Use `contextSafe` for event handlers
4. Use refs for elements that need precise control
5. Timeline refs (`useRef`) allow external control (play/pause)

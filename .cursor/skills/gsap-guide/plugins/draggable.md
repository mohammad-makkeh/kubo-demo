# Draggable Plugin

Make elements draggable with full control over bounds, snapping, and inertia.

## Installation

```javascript
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// Optional: For throw/momentum
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(InertiaPlugin);
```

## Basic Usage

```javascript
Draggable.create(".box");

// With options
Draggable.create(".box", {
  type: "x,y",
  bounds: "#container"
});
```

## Drag Types

```javascript
// Horizontal only
Draggable.create(".slider", { type: "x" });

// Vertical only
Draggable.create(".slider", { type: "y" });

// Both directions
Draggable.create(".box", { type: "x,y" });

// Rotation
Draggable.create(".knob", { type: "rotation" });

// Scroll container
Draggable.create(".scroll-area", { type: "scroll" });
// Or specific direction
Draggable.create(".scroll-area", { type: "scrollLeft" });
Draggable.create(".scroll-area", { type: "scrollTop" });
```

## Bounds

```javascript
// Element bounds
Draggable.create(".box", {
  type: "x,y",
  bounds: "#container"
});

// Custom bounds
Draggable.create(".box", {
  type: "x,y",
  bounds: { minX: 0, maxX: 500, minY: 0, maxY: 300 }
});

// Window bounds
Draggable.create(".box", {
  type: "x,y",
  bounds: window
});
```

## Inertia (Throw)

```javascript
Draggable.create(".box", {
  type: "x,y",
  inertia: true,  // Requires InertiaPlugin
  bounds: "#container"
});

// Configure inertia
Draggable.create(".box", {
  inertia: true,
  throwResistance: 1000,  // Higher = more resistance
  maxDuration: 1,         // Max throw duration
  minDuration: 0.2        // Min throw duration
});
```

## Snapping

```javascript
// Snap to increment
Draggable.create(".box", {
  type: "x",
  snap: {
    x: function(value) {
      return Math.round(value / 100) * 100;  // Snap to 100px grid
    }
  }
});

// Snap to array of values
Draggable.create(".slider", {
  type: "x",
  snap: [0, 100, 200, 300, 400]
});

// Snap rotation to angles
Draggable.create(".dial", {
  type: "rotation",
  snap: function(value) {
    return Math.round(value / 45) * 45;  // Snap to 45° increments
  }
});
```

## Callbacks

```javascript
Draggable.create(".box", {
  type: "x,y",
  onDragStart: function() {
    console.log("Started dragging");
  },
  onDrag: function() {
    console.log("x:", this.x, "y:", this.y);
    console.log("deltaX:", this.deltaX, "deltaY:", this.deltaY);
  },
  onDragEnd: function() {
    console.log("Stopped dragging");
  },
  onPress: function() {
    console.log("Pressed");
  },
  onRelease: function() {
    console.log("Released");
  },
  onClick: function() {
    console.log("Clicked (no drag)");
  },
  onThrowUpdate: function() {
    console.log("Throw updating");  // During inertia
  },
  onThrowComplete: function() {
    console.log("Throw complete");
  }
});
```

## Properties in Callbacks

```javascript
Draggable.create(".box", {
  onDrag: function() {
    this.x;          // Current x position
    this.y;          // Current y position
    this.deltaX;     // Change in x since last event
    this.deltaY;     // Change in y since last event
    this.rotation;   // Current rotation (for type: "rotation")
    this.isDragging; // Boolean
    this.target;     // The draggable element
    this.pointerX;   // Pointer x position
    this.pointerY;   // Pointer y position
  }
});
```

## Methods

```javascript
const draggable = Draggable.create(".box")[0];

// Enable/disable
draggable.disable();
draggable.enable();

// Update bounds
draggable.applyBounds("#new-container");

// Kill/destroy
draggable.kill();

// Check state
draggable.isDragging;
draggable.isThrowing;
draggable.isPressed;

// Get instance
const instance = Draggable.get(".box");
```

## Common Patterns

### Slider
```javascript
const slider = Draggable.create(".handle", {
  type: "x",
  bounds: ".track",
  onDrag: function() {
    const progress = this.x / this.maxX;
    console.log("Progress:", progress);
  }
})[0];
```

### Sortable List
```javascript
Draggable.create(".list-item", {
  type: "y",
  bounds: ".list",
  onDrag: function() {
    const items = document.querySelectorAll(".list-item");
    // Sort logic based on position
  }
});
```

### Rotation Dial
```javascript
Draggable.create(".dial", {
  type: "rotation",
  inertia: true,
  snap: function(angle) {
    return Math.round(angle / 30) * 30;  // 30° increments
  },
  onDrag: function() {
    const value = Math.round(this.rotation / 30);
    console.log("Value:", value);
  }
});
```

### Scroll Container
```javascript
Draggable.create(".scroll-content", {
  type: "y",
  bounds: ".scroll-container",
  inertia: true,
  edgeResistance: 0.65
});
```

### Drag Handle
```javascript
Draggable.create(".modal", {
  type: "x,y",
  trigger: ".modal-header",  // Only drag from header
  bounds: window
});
```

## Touch Options

```javascript
Draggable.create(".box", {
  type: "x,y",
  allowContextMenu: true,     // Allow right-click
  allowNativeTouchScrolling: true,  // Allow scroll on touch
  dragClickables: true,       // Drag even if clicking button/link
  force3D: true               // Use 3D transforms
});
```

## Hit Testing

```javascript
Draggable.create(".draggable", {
  type: "x,y",
  onDrag: function() {
    if (this.hitTest(".dropzone", "50%")) {
      // 50% overlap with .dropzone
      gsap.to(".dropzone", { backgroundColor: "green" });
    }
  },
  onDragEnd: function() {
    if (this.hitTest(".dropzone")) {
      console.log("Dropped in zone!");
    }
  }
});
```

## Tips

1. Use `inertia: true` for natural feel on touch devices
2. Combine with `hitTest()` for drag-and-drop
3. Use `trigger` option for drag handles
4. `edgeResistance` makes bounds feel more natural
5. Use `liveSnap: true` for real-time snapping feedback

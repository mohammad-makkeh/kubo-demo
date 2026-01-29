# Physics Plugins

Physics2D and PhysicsProps for physics-based animations.

**Note:** Physics plugins are premium (Club GSAP membership required).

## Physics2DPlugin

2D physics with velocity, gravity, and friction.

### Installation

```javascript
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);
```

### Basic Usage

```javascript
gsap.to(".ball", {
  duration: 2,
  physics2D: {
    velocity: 300,     // Initial velocity (pixels/second)
    angle: -60,        // Direction in degrees (0 = right, -90 = up)
    gravity: 400       // Gravity (pixels/second²)
  }
});
```

### Configuration

```javascript
gsap.to(".element", {
  physics2D: {
    velocity: 500,        // Initial speed
    angle: -45,           // Launch angle
    gravity: 980,         // Gravity strength
    friction: 0.05,       // Air resistance (0-1)
    accelerationX: 0,     // Constant X acceleration
    accelerationY: 0      // Constant Y acceleration
  },
  duration: 3
});
```

### Common Patterns

#### Projectile Motion
```javascript
gsap.to(".projectile", {
  physics2D: {
    velocity: 400,
    angle: -60,
    gravity: 500
  },
  duration: 2
});
```

#### Falling Object
```javascript
gsap.to(".drop", {
  physics2D: {
    velocity: 0,
    angle: 90,
    gravity: 980
  },
  duration: 1.5
});
```

#### Explosion Effect
```javascript
const particles = document.querySelectorAll(".particle");

particles.forEach(particle => {
  gsap.to(particle, {
    physics2D: {
      velocity: gsap.utils.random(200, 600),
      angle: gsap.utils.random(0, 360),
      gravity: 500,
      friction: 0.1
    },
    duration: 2,
    opacity: 0
  });
});
```

#### Bouncing Ball
```javascript
function bounce() {
  gsap.to(".ball", {
    physics2D: {
      velocity: 300,
      angle: -80,
      gravity: 800
    },
    duration: 1,
    onComplete: () => {
      // Reverse with less energy
      gsap.to(".ball", {
        physics2D: {
          velocity: 200,
          angle: -80,
          gravity: 800
        },
        duration: 0.8,
        onComplete: bounce
      });
    }
  });
}
```

#### Confetti
```javascript
function createConfetti(count) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = "50%";
    confetti.style.top = "50%";
    document.body.appendChild(confetti);

    gsap.to(confetti, {
      physics2D: {
        velocity: gsap.utils.random(300, 600),
        angle: gsap.utils.random(-120, -60),
        gravity: 400,
        friction: 0.02
      },
      rotation: gsap.utils.random(-360, 360),
      duration: 2,
      onComplete: () => confetti.remove()
    });
  }
}
```

---

## PhysicsPropsPlugin

Apply physics to individual properties.

### Installation

```javascript
import gsap from "gsap";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";

gsap.registerPlugin(PhysicsPropsPlugin);
```

### Basic Usage

```javascript
gsap.to(".spinner", {
  duration: 5,
  physicsProps: {
    rotation: {
      velocity: 360,     // Degrees per second
      friction: 0.1      // Slowdown rate
    }
  }
});
```

### Configuration

```javascript
gsap.to(".element", {
  physicsProps: {
    property: {
      velocity: 100,        // Initial velocity
      acceleration: 50,     // Constant acceleration
      friction: 0.1         // Resistance (0-1)
    }
  },
  duration: 3
});
```

### Common Patterns

#### Spinning Wheel
```javascript
gsap.to(".wheel", {
  physicsProps: {
    rotation: {
      velocity: 720,    // Fast spin
      friction: 0.05    // Slow deceleration
    }
  },
  duration: 10
});
```

#### Momentum Scroll
```javascript
gsap.to(".content", {
  physicsProps: {
    x: {
      velocity: -500,
      friction: 0.15
    }
  },
  duration: 3
});
```

#### Combined Properties
```javascript
gsap.to(".element", {
  physicsProps: {
    x: {
      velocity: 200,
      friction: 0.1
    },
    rotation: {
      velocity: 360,
      friction: 0.05
    },
    scale: {
      velocity: 0.5,
      acceleration: -0.1
    }
  },
  duration: 4
});
```

#### Slot Machine
```javascript
function spinSlot(element, finalValue) {
  gsap.to(element, {
    physicsProps: {
      y: {
        velocity: -2000,
        friction: 0.1
      }
    },
    duration: 3,
    onComplete: () => {
      // Snap to final position
      gsap.to(element, { y: finalValue, duration: 0.2 });
    }
  });
}
```

## Combining Physics Plugins

```javascript
// Use Physics2D for trajectory, PhysicsProps for spin
gsap.to(".ball", {
  physics2D: {
    velocity: 400,
    angle: -45,
    gravity: 500
  },
  physicsProps: {
    rotation: {
      velocity: 720,
      friction: 0.02
    }
  },
  duration: 2
});
```

## Tips

1. **Physics2D**: Best for projectile motion, gravity effects
2. **PhysicsProps**: Best for spinning, momentum on single properties
3. Use `friction` for natural deceleration
4. Combine with `onComplete` for chained physics animations
5. `gsap.utils.random()` is great for particle effects

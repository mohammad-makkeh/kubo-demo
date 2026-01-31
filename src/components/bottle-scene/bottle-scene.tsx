import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import BottleModel from './bottle-model';
import DynamicLighting from './dynamic-lighting';

export interface BottleSceneProps {
  setBottleHorizontal: (value: boolean) => void;
}

function Scene({ setBottleHorizontal, triggerRef }: BottleSceneProps & { triggerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <group position={[0, 0, 0]}>
      <DynamicLighting />
      <BottleModel setBottleHorizontal={setBottleHorizontal} triggerRef={triggerRef} />
    </group>
  );
}

export default function BottleScene({ setBottleHorizontal }: BottleSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      id="bottle-scene"
      className="fixed inset-0 pointer-events-none z-10 animate-fade-in delay-1000"
    >
      <Canvas
        camera={{ position: [0, -1, 6], fov: 50 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene setBottleHorizontal={setBottleHorizontal} triggerRef={containerRef} />
      </Canvas>
    </div>
  );
}

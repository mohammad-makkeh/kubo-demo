import { Canvas } from '@react-three/fiber';
import BottleModel from './bottle-model';
import DynamicLighting from './dynamic-lighting';

export interface BottleSceneProps {
  setBottleHorizontal: (value: boolean) => void;
}

function Scene({ setBottleHorizontal }: BottleSceneProps) {
  return (
    <group position={[0, 0, 0]}>
      <DynamicLighting />
      <BottleModel setBottleHorizontal={setBottleHorizontal} />
    </group>
  );
}

export default function BottleScene({ setBottleHorizontal }: BottleSceneProps) {
  return (
    <div id="bottle-scene" className="fixed inset-0 pointer-events-none z-10 animate-fade-in delay-1000">
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
        <Scene setBottleHorizontal={setBottleHorizontal} />
      </Canvas>
    </div>
  );
}

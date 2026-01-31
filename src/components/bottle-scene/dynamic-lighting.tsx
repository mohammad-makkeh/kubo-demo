import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MIN_INTENSITY = 0.2;
const MAX_INTENSITY = 3;
const SPEED = 3;

export default function DynamicLighting() {
  const ambientLight = useRef<THREE.AmbientLight>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const rimLight = useRef<THREE.SpotLight>(null);

  const startColor = useMemo(() => new THREE.Color('#dedcdc'), []);
  const endColor = useMemo(() => new THREE.Color('#7883ff'), []);
  const currentColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    if (!ambientLight.current || !rimLight.current) return;

    const t = clock.getElapsedTime();
    const wave = (Math.sin(t * SPEED) + 1) / 2;

    ambientLight.current.intensity = MIN_INTENSITY + wave * (MAX_INTENSITY - MIN_INTENSITY);
    currentColor.lerpColors(startColor, endColor, wave);
    rimLight.current.color.copy(currentColor);
  });

  return (
    <>
      <ambientLight ref={ambientLight} intensity={0.2} />
      <spotLight
        ref={keyLight}
        position={[0, 1.2, 10]}
        angle={Math.PI / 10}
        penumbra={1}
        decay={0.1}
        intensity={100}
        color="#dedcdc"
      />
      <spotLight
        ref={rimLight}
        position={[-5, 8, 10]}
        angle={Math.PI / 10}
        penumbra={1}
        decay={0.1}
        intensity={80}
        color="#dedcdc"
      />
    </>
  );
}

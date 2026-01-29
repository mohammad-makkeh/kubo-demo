import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function DynamicLighting() {
  const ambientLight = useRef<THREE.AmbientLight>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const rimLight = useRef<THREE.SpotLight>(null);

  const minIntensity = 0.2;
  const maxIntensity = 3;
  const speed = 5;

  useFrame(({ clock }) => {
    if (!ambientLight.current) return;

    const t = clock.getElapsedTime();
    const wave = (Math.sin(t * speed) + 1) / 2;
    const color = gsap.utils.interpolate('#dedcdc', '#7883ff', wave);

    ambientLight.current.intensity = minIntensity + wave * (maxIntensity - minIntensity);

    if (!rimLight.current) return;
    rimLight.current.color = new THREE.Color(color);
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

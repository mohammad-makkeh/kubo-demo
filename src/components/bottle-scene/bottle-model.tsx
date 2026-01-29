import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bottleModelUrl from '../../assets/bottle.glb?url';

export interface BottleModelProps {
  setBottleHorizontal: (value: boolean) => void;
}

export default function BottleModel({ setBottleHorizontal }: BottleModelProps) {
  const { scene: bottle } = useGLTF(bottleModelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef({ y: 0, scale: 1, rotateX: 0, x: -2, rotateZ: 0 });
  const calledOnHorizontal = useRef(false);

  const clonedBottle = useMemo(() => {
    const clone = bottle.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 20;
          mat.roughness = 0;
          mat.metalness = 0.4;
        }
      }
    });
    return clone;
  }, [bottle]);

  useGSAP(() => {
    const bottleTl = gsap.timeline({
      defaults: { ease: "none" },
    });

    bottleTl.fromTo(progress.current, { y: -3 }, { y: -6 });
    bottleTl.to(progress.current, { x: -6 });
    bottleTl.addPause("+=0.3");
    bottleTl.to(progress.current, {
      rotateZ: -Math.PI / 2,
      y: 2.5,
      x: -3.8,
    });
    bottleTl.addLabel("on:horizontal");
    bottleTl.to(progress.current, {
      y: -10,
      opacity: 0,
    });

    const st = ScrollTrigger.create({
      trigger: '#bottle-scene',
      start: '10% top',
      end: '300% bottom',
      scrub: true,
      animation: bottleTl,
      onUpdate() {
        const p = bottleTl.progress();
        const totalDuration = bottleTl.duration();
        const horizontalLabelTime = bottleTl.labels["on:horizontal"];
        const horizontalLabelProgress = horizontalLabelTime / totalDuration;

        if (p >= horizontalLabelProgress && !calledOnHorizontal.current) {
          calledOnHorizontal.current = true;
          setBottleHorizontal?.(true);
        } else if (p < horizontalLabelProgress && calledOnHorizontal.current) {
          calledOnHorizontal.current = false;
          setBottleHorizontal?.(false);
        }
      }
    });

    return () => st.kill();
  }, [setBottleHorizontal]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = progress.current.x;
    groupRef.current.position.y = progress.current.y;
    groupRef.current.rotation.x = progress.current.rotateX;
    groupRef.current.rotation.z = progress.current.rotateZ;
  });

  return (
    <group ref={groupRef} position={[-2, 1, 0]} scale={1}>
      <primitive object={clonedBottle} />
    </group>
  );
}

useGLTF.preload(bottleModelUrl);

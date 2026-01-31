import { useRef, useMemo, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bottleModelUrl from '../../assets/bottle.glb?url';

export interface BottleModelProps {
  setBottleHorizontal: (value: boolean) => void;
  triggerRef: RefObject<HTMLDivElement | null>;
}

export default function BottleModel({ setBottleHorizontal, triggerRef }: BottleModelProps) {
  const { scene: bottle } = useGLTF(bottleModelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef({ y: 0, scale: 1, rotateX: 0, x: -2, rotateZ: 0 });
  const calledOnHorizontal = useRef(false);
  const bottleTimeline = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

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
    if (!triggerRef.current) return;

    bottleTimeline.current = gsap.timeline({
      defaults: { ease: "none" },
    });

    bottleTimeline.current.fromTo(progress.current, { y: -3 }, { y: -6 });
    bottleTimeline.current.to(progress.current, { x: -6 });
    bottleTimeline.current.addPause("+=0.3");
    bottleTimeline.current.to(progress.current, {
      rotateZ: -Math.PI / 2,
      y: 2.5,
      x: -3.8,
    });
    bottleTimeline.current.addLabel("on:horizontal");
    bottleTimeline.current.to(progress.current, {
      y: -10,
      opacity: 0,
    });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: '10% top',
      end: '300% bottom',
      scrub: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      animation: bottleTimeline.current,
      onUpdate() {
        if (!bottleTimeline.current) return;
        const p = bottleTimeline.current.progress();
        const totalDuration = bottleTimeline.current.duration();
        const horizontalLabelTime = bottleTimeline.current.labels["on:horizontal"];
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

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [setBottleHorizontal, triggerRef]);

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

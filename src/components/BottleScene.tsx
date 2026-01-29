/**
 * KOBO — Persistent 3D Bottle Scene
 * A commanding bottle presence that lives across the entire scroll experience
 */

import { useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls, useHelper, useGLTF } from '@react-three/drei';
import { SpotLightHelper, PointLightHelper, AxesHelper } from 'three';


// Import the GLB model
import bottleModelUrl from '../assets/bottle.glb?url';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);



// 3D Bottle Model
function BottleModel({ setBottleHorizontal }: { setBottleHorizontal: (value: boolean) => void }) {
  const { scene: bottle } = useGLTF(bottleModelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef({ y: 0, scale: 1, rotateX: 0, x: -2, rotateZ: 0 });
  const calledOnHorizontal = useRef(false);
  // Clone and setup scene
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

  useLayoutEffect(() => {
    const bottleTl = gsap.timeline({
      defaults: {
        ease: "none",
      },
    });
    bottleTl.fromTo(progress.current, { y: -3 }, { y: -6 });
    bottleTl.to(progress.current, { x: -6 });
    bottleTl.addPause("+=0.3");
    bottleTl.to(
      progress.current,
      {
        rotateZ: -Math.PI / 2,
        y: 2.5,
        x: -3.8,
      },
    );
    bottleTl.addLabel("on:horizontal")
    bottleTl.to(
      progress.current,
      {
        y: -10,
        opacity: 0,
      },
    );

    ScrollTrigger.create({
      trigger: '#bottle-scene',
      start: '10% top',
      end: '300% bottom',
      scrub: true,
      animation: bottleTl,
      onUpdate() {
        const p = bottleTl.progress();
        const totalDuration = bottleTl.duration();          // timeline duration in seconds

        const horizontalLabelTime = bottleTl.labels["on:horizontal"]; // returns time in seconds


        const horizontalLabelProgress = horizontalLabelTime / totalDuration;   // normalized 0 → 1
        if (p >= horizontalLabelProgress && !calledOnHorizontal.current) {
          calledOnHorizontal.current = true;
          setBottleHorizontal?.(true);
        }
        else if (p < horizontalLabelProgress && calledOnHorizontal.current) {
          calledOnHorizontal.current = false;
          setBottleHorizontal?.(false);
        }
      }
    });
  }, []);

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

// Dynamic lighting that responds to scroll
function DynamicLighting() {
  const ambientLight = useRef<THREE.AmbientLight>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const rimLight = useRef<THREE.SpotLight>(null);


  // Light helpers (DEV ONLY – remove in prod)
  // useHelper(keyLight, SpotLightHelper, 'cyan');
  // useHelper(rimLight, SpotLightHelper, 'yellow');

  const minIntensity = 0.2;
  const maxIntensity = 3;
  const speed = 1;


  useFrame(({ clock }) => {
    if (!ambientLight.current) return;

    const t = clock.getElapsedTime();

    // Normalize sine from [-1, 1] → [0, 1]
    const wave = (Math.sin(t * speed) + 1) / 2;
    const color = gsap.utils.interpolate('#dedcdc', '#7883ff', wave);

    // Map to intensity range
    ambientLight.current.intensity =
      minIntensity + wave * (maxIntensity - minIntensity);

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


// Main scene component
function Scene({ setBottleHorizontal }: { setBottleHorizontal: (value: boolean) => void }) {
  return (
    <>
      {/* World axes: X = red, Y = green, Z = blue */}
      {/* <primitive object={new AxesHelper(5)} /> */}

      <group position={[0, 0, 0]}>
        <DynamicLighting />
        <BottleModel setBottleHorizontal={setBottleHorizontal} />
      </group>
    </>
  );
}

// Exported persistent bottle component
export default function BottleScene({ setBottleHorizontal }: { setBottleHorizontal: (value: boolean) => void }) {
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
        {/* DEV CONTROLS */}
        {/* <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.1}
          makeDefault
        /> */}
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload(bottleModelUrl);

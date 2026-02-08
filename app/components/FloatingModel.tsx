"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 1.25;
    group.current.rotation.x = clock.getElapsedTime() * 0.5;
    group.current.rotation.z = clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={group} scale={0.7}>
      <primitive object={scene} />
    </group>
  );
}

export default function FloatingModel({ url }: { url: string }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [5, 8, 4], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 30, 3]} intensity={0.1} />
        <Environment preset="city" />

        <Float speed={9.2} rotationIntensity={1.6} floatIntensity={2.8}>
          <Model url={url} />
        </Float>

        {/* optional: controls, but pointerEvents is none so it won’t interfere */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/model.glb");

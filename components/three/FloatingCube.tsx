"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingCube() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.3;
    mesh.current.rotation.y = t * 0.5;
    mesh.current.position.y = Math.sin(t * 0.8) * 0.3;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#7c5cfc"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.85}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

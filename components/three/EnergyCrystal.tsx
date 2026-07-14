"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function EnergyCrystal() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    ref.current.position.y = Math.sin(t * 0.6) * 0.2;
  });

  return (
    <group>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#7c5cfc"
          emissive="#7c5cfc"
          emissiveIntensity={5}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

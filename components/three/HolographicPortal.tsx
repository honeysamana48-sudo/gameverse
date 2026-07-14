"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HolographicPortal() {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!groupRef.current || !ringRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.2;
    ringRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#7c5cfc"
          emissive="#7c5cfc"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[1.1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#7c5cfc"
          emissive="#7c5cfc"
          emissiveIntensity={4}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

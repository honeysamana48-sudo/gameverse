"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GamingController() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.3;
    groupRef.current.position.x = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Controller body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Left grip */}
      <mesh position={[-1.1, -0.3, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.5, 0.8, 0.7]} />
        <meshStandardMaterial
          color="#16162a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Right grip */}
      <mesh position={[1.1, -0.3, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.5, 0.8, 0.7]} />
        <meshStandardMaterial
          color="#16162a"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* D-pad */}
      <mesh position={[-0.6, 0.28, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
        <meshStandardMaterial
          color="#2a2a4a"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      {/* Buttons */}
      {[0.5, 0.7, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.28, -0.15 + i * 0.15]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
          <meshStandardMaterial
            color={i === 0 ? "#7c5cfc" : i === 1 ? "#fb7185" : "#22d3ee"}
            emissive={i === 0 ? "#7c5cfc" : i === 1 ? "#fb7185" : "#22d3ee"}
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
      {/* Left stick */}
      <mesh position={[-0.6, 0.28, 0.25]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
        <meshStandardMaterial color="#333355" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Right stick */}
      <mesh position={[0.6, 0.28, 0.25]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
        <meshStandardMaterial color="#333355" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Neon accent strips */}
      <mesh position={[0, 0.26, -0.5]}>
        <boxGeometry args={[1.8, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#7c5cfc"
          emissive="#7c5cfc"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[0, -0.26, 0]}>
        <boxGeometry args={[1.8, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

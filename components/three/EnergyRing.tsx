"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnergyRingProps {
  radius?: number;
  tube?: number;
  color?: string;
  speed?: number;
  rotSpeed?: number;
}

export default function EnergyRing({
  radius = 2,
  tube = 0.03,
  color = "#22d3ee",
  speed = 1,
  rotSpeed = 0.5,
}: EnergyRingProps) {
  const ref = useRef<THREE.Mesh>(null!);

  const geom = useMemo(
    () => new THREE.TorusGeometry(radius, tube, 16, 100),
    [radius, tube]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * rotSpeed;
    ref.current.rotation.z = t * rotSpeed * 0.7;
    ref.current.scale.setScalar(1 + Math.sin(t * speed) * 0.05);
  });

  return (
    <mesh ref={ref} geometry={geom}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.7}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

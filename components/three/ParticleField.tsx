"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
  speed?: number;
}

export default function ParticleField({
  count = 200,
  color = "#7c5cfc",
  size = 0.015,
  spread = 10,
  speed = 0.3,
}: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * speed * 60 * delta;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * speed * 60 * delta;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * speed * 60 * delta;
      if (Math.abs(arr[i * 3]) > spread / 2) velocities[i * 3] *= -1;
      if (Math.abs(arr[i * 3 + 1]) > spread / 2) velocities[i * 3 + 1] *= -1;
      if (Math.abs(arr[i * 3 + 2]) > spread * 0.25) velocities[i * 3 + 2] *= -1;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

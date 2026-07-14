"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingGrid() {
  const ref = useRef<THREE.GridHelper>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.z = -5 + (t * 0.3) % 2;
  });

  const gridMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#7c5cfc",
        transparent: true,
        opacity: 0.08,
        wireframe: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <mesh ref={ref as unknown as React.RefObject<THREE.Mesh>} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <primitive object={gridMaterial} attach="material" />
    </mesh>
  );
}

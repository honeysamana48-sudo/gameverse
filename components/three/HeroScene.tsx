"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ParticleField from "./ParticleField";
import EnergyRing from "./EnergyRing";
import GamingController from "./GamingController";
import EnergyCrystal from "./EnergyCrystal";

function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    target.current.x += (mouse.current.x * 0.3 - target.current.x) * 0.05;
    target.current.y += (mouse.current.y * 0.2 - target.current.y) * 0.05;
    group.current.rotation.y = target.current.x;
    group.current.rotation.x = target.current.y;
  });

  return <group ref={group}>{children}</group>;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1a1a3e" />
      <pointLight position={[3, 3, 5]} intensity={1.5} color="#7c5cfc" distance={20} decay={2} />
      <pointLight position={[-3, 2, -3]} intensity={1} color="#22d3ee" distance={15} decay={2} />
      <pointLight position={[0, -2, 2]} intensity={0.5} color="#7c5cfc" distance={10} decay={2} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
        distance={15}
        decay={2}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <MouseParallax>
            <group position={[1.5, 0.3, 0]}>
              <GamingController />
            </group>
            <group position={[-2, 0, -1]}>
              <EnergyCrystal />
            </group>
            <group position={[0, -0.5, -2]}>
              <EnergyRing radius={2.2} tube={0.025} color="#7c5cfc" speed={0.8} rotSpeed={0.4} />
            </group>
            <group position={[0, 0.8, -1]}>
              <EnergyRing radius={1.6} tube={0.015} color="#22d3ee" speed={1.2} rotSpeed={-0.3} />
            </group>
            <ParticleField count={300} color="#7c5cfc" size={0.02} spread={12} speed={0.4} />
            <ParticleField count={150} color="#22d3ee" size={0.012} spread={10} speed={0.6} />
          </MouseParallax>
        </Suspense>
      </Canvas>
    </div>
  );
}

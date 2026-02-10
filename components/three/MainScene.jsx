"use client";

import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const GoldSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Slow, majestic rotation
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 12]} /> {/* Higher detail geometry */}
        <MeshDistortMaterial
          color="#D4AF37" // Rich Gold
          envMapIntensity={2.5} // High reflectivity
          clearcoat={1} // Glossy finish
          clearcoatRoughness={0.1}
          metalness={1}
          roughness={0.15}
          distort={0.4} // Organic liquid movement
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

// Subtle background particles to add depth without distraction
const AmbientDust = () => {
  const count = 50;
  const mesh = useRef();

  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 15;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 15;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C6A665"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

export const MainScene = ({ className }) => {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className || ""}`}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 2]} // High resolution
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#C6A665" />

        <Suspense fallback={null}>
          <GoldSphere />
          <AmbientDust />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

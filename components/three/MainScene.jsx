"use client";

import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const smoothstep = (x) => {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
};

const GoldSphere = ({ scrollRef }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const localTimeRef = useRef(0);
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const normal = new THREE.Vector3();

    for (let i = 0; i < pos.count; i += 1) {
      vertex.fromBufferAttribute(pos, i);
      normal.copy(vertex).normalize();

      // Deterministic pseudo-noise from a few sine layers + per-vertex jitter.
      const a = Math.sin(vertex.x * 4.1 + vertex.y * 2.7 + vertex.z * 3.3);
      const b = Math.sin(vertex.x * 8.3 - vertex.y * 6.1 + vertex.z * 5.5);
      const c = Math.sin(vertex.y * 11.1 + vertex.z * 7.7);
      // Use position-based hash (not vertex index) to avoid a visible seam.
      const hash =
        Math.sin(vertex.x * 12.9898 + vertex.y * 78.233 + vertex.z * 37.719) *
        43758.5453123;
      const jitter = hash - Math.floor(hash) - 0.5;
      const n = a * 0.55 + b * 0.3 + c * 0.15 + jitter * 0.12;

      vertex.addScaledVector(normal, n * 0.045);
      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);
  const velocityRef = useRef(new THREE.Vector3());
  const targetPositionRef = useRef(new THREE.Vector3());
  const forceRef = useRef(new THREE.Vector3());
  const offsetRef = useRef(new THREE.Vector3());
  const scrollFactorRef = useRef(0);

  useFrame((state, delta) => {
    const t = localTimeRef.current;
    localTimeRef.current += delta;
    const rawScroll = THREE.MathUtils.clamp(
      scrollRef?.current?.progress ?? 0,
      0,
      1,
    );
    const targetScroll = smoothstep(rawScroll);
    scrollFactorRef.current = THREE.MathUtils.damp(
      scrollFactorRef.current,
      targetScroll,
      4.6,
      delta,
    );
    const scroll = scrollFactorRef.current;
    const scrollDepth = scroll * scroll;

    if (meshRef.current) {
      const targetPosition = targetPositionRef.current;
      const velocity = velocityRef.current;
      const force = forceRef.current;
      const offset = offsetRef.current;

      const baseAmplitude = THREE.MathUtils.lerp(1, 0.72, scrollDepth);

      const wobbleX = Math.sin(t * 0.27) * 0.18;
      const wobbleY = Math.sin(t * 0.2) * 0.13 + Math.sin(t * 0.6) * 0.03;
      const wobbleZ = Math.sin(t * 0.25) * 0.12;

      targetPosition.set(
        wobbleX * baseAmplitude - scroll * 0.3,
        wobbleY * baseAmplitude - scroll * 1.2,
        wobbleZ * baseAmplitude - scroll * 0.45,
      );

      const subSteps = Math.min(5, Math.max(1, Math.ceil(delta / (1 / 60))));
      const dt = delta / subSteps;
      const stiffness = 13.8;
      const damping = 7.6;

      for (let i = 0; i < subSteps; i += 1) {
        offset.subVectors(targetPosition, meshRef.current.position);
        force.copy(offset).multiplyScalar(stiffness);
        force.addScaledVector(velocity, -damping);

        velocity.addScaledVector(force, dt);
        meshRef.current.position.addScaledVector(velocity, dt);
      }

      const baseRotationY = t * 0.1;
      const baseRotationX = Math.sin(t * 0.05) * 0.05;
      const targetRotationY =
        baseRotationY +
        meshRef.current.position.x * 0.22 +
        velocity.x * 0.052 -
        scroll * 0.38;
      const targetRotationX =
        baseRotationX -
        meshRef.current.position.y * 0.16 -
        velocity.y * 0.044 -
        scroll * 0.18;

      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        targetRotationY,
        2.8,
        delta,
      );
      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        targetRotationX,
        2.8,
        delta,
      );

      const targetScale = THREE.MathUtils.lerp(2.2, 1.05, scrollDepth);
      const nextScale = THREE.MathUtils.damp(
        meshRef.current.scale.x,
        targetScale,
        4.8,
        delta,
      );
      meshRef.current.scale.setScalar(nextScale);

      if (materialRef.current) {
        offset.subVectors(targetPosition, meshRef.current.position);
        const displacement = offset.length();
        const kinetic = velocity.length();
        const strain = THREE.MathUtils.clamp(
          displacement * 0.46 + kinetic * 0.16,
          0,
          1,
        );
        const targetDistort =
          (0.028 + strain * 0.022) * THREE.MathUtils.lerp(1, 0.9, scrollDepth);
        const targetSpeed = THREE.MathUtils.lerp(
          0.18 + strain * 0.18,
          0.14,
          scrollDepth,
        );
        const targetEnv = THREE.MathUtils.lerp(2.1, 1.85, scrollDepth);

        materialRef.current.distort = THREE.MathUtils.damp(
          materialRef.current.distort,
          targetDistort,
          3.2,
          delta,
        );
        materialRef.current.speed = THREE.MathUtils.damp(
          materialRef.current.speed,
          targetSpeed,
          3.2,
          delta,
        );
        materialRef.current.envMapIntensity = THREE.MathUtils.damp(
          materialRef.current.envMapIntensity,
          targetEnv,
          2.8,
          delta,
        );
      }

      state.camera.position.y = THREE.MathUtils.damp(
        state.camera.position.y,
        scroll * 0.42,
        3.8,
        delta,
      );
      state.camera.position.z = THREE.MathUtils.damp(
        state.camera.position.z,
        THREE.MathUtils.lerp(8, 9.15, scrollDepth),
        3.8,
        delta,
      );
      state.camera.lookAt(0, -scroll * 0.2, 0);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={2}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#C9A336" // Darker gold
        envMapIntensity={2.1}
        clearcoat={1}
        clearcoatRoughness={0.12}
        metalness={1}
        roughness={0.18}
        distort={0.028}
        speed={0.18}
      />
    </mesh>
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

export const MainScene = ({ className, scrollRef }) => {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className || ""}`}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 2]}
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
          intensity={2.4}
          color="#ffffff"
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={1.25}
          color="#C6A665"
        />

        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        <GoldSphere scrollRef={scrollRef} />
        <AmbientDust />
      </Canvas>
    </div>
  );
};

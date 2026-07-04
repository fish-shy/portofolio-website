"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

const PARTICLE_COUNT = 1200;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/* Rotates the whole scene gently toward the cursor. Listens on window
   because the canvas itself is pointer-events: none. */
function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.25,
      2.5,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      pointer.current.y * 0.15,
      2.5,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}

function Core({ color }: { color: string }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const bob = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    if (outer.current) {
      outer.current.rotation.x += delta * 0.06;
      outer.current.rotation.y += delta * 0.09;
      outer.current.position.y = bob;
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.12;
      inner.current.rotation.y -= delta * 0.08;
      inner.current.position.y = bob;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={0.28} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function OrbitRing({
  color,
  tilt,
  speed,
  offset = 0,
  radius = 3.1,
}: {
  color: string;
  tilt: number;
  speed: number;
  offset?: number;
  radius?: number;
}) {
  const dot = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (dot.current) {
      dot.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Particles({ color }: { color: string }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 3.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  const color = theme === "dark" ? "#4ade80" : "#16a34a";
  const particleColor = theme === "dark" ? "#34d399" : "#10b981";

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Rig>
        <Core color={color} />
        <OrbitRing color={color} tilt={Math.PI / 3.2} speed={0.35} />
        <OrbitRing color={color} tilt={-Math.PI / 4.5} speed={-0.28} offset={2.5} radius={3.6} />
        <Particles color={particleColor} />
      </Rig>
    </Canvas>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

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

type Palette = { accent: string; accentDeep: string; ink: string; pale: string };

/* Leans the whole group toward the cursor. Listens on window because the
   canvas ignores pointer events so it never blocks scrolling. */
function Rig({ children, still }: { children: ReactNode; still: boolean }) {
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
    if (!group.current || still) return;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.35, 2.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.2, 2.5, delta);
  });

  return <group ref={group}>{children}</group>;
}

/** The centrepiece: a slow-turning knot with a clearcoat and a thin-film sheen. */
function Knot({ palette, still }: { palette: Palette; still: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || still) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
  });
  return (
    <mesh ref={ref} rotation={[0.4, 0.2, 0]} scale={0.82}>
      <torusKnotGeometry args={[1.05, 0.34, 320, 48, 2, 3]} />
      <meshPhysicalMaterial
        color={palette.accent}
        roughness={0.18}
        metalness={0.25}
        clearcoat={1}
        clearcoatRoughness={0.08}
        iridescence={0.7}
        iridescenceIOR={1.4}
        iridescenceThicknessRange={[200, 600]}
      />
    </mesh>
  );
}

/** Smaller pieces drifting around the knot, each its own shape and finish. */
function Satellites({ palette, still, spread }: { palette: Palette; still: boolean; spread: number }) {
  const pieces: { pos: [number, number, number]; speed: number; node: ReactNode }[] = [
    {
      pos: [-2.1 * spread, 1.3, -0.6],
      speed: 1.4,
      node: (
        <mesh>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial color={palette.ink} roughness={0.3} metalness={0.6} clearcoat={1} flatShading />
        </mesh>
      ),
    },
    {
      pos: [2.0 * spread, 1.05, -0.3],
      speed: 1.8,
      node: (
        <mesh>
          <sphereGeometry args={[0.32, 48, 48]} />
          <meshPhysicalMaterial color={palette.pale} roughness={0.12} metalness={0.05} clearcoat={1} />
        </mesh>
      ),
    },
    {
      pos: [2.15 * spread, -1.15, 0.4],
      speed: 1.2,
      node: (
        <RoundedBox args={[0.62, 0.62, 0.62]} radius={0.12} smoothness={5} rotation={[0.5, 0.6, 0.2]}>
          <meshPhysicalMaterial color={palette.accentDeep} roughness={0.25} metalness={0.3} clearcoat={1} />
        </RoundedBox>
      ),
    },
    {
      pos: [-1.9 * spread, -1.2, 0.5],
      speed: 1.6,
      node: (
        <mesh rotation={[1.1, 0.3, 0]}>
          <torusGeometry args={[0.36, 0.13, 32, 64]} />
          <meshPhysicalMaterial color={palette.accent} roughness={0.15} metalness={0.4} clearcoat={1} iridescence={0.6} />
        </mesh>
      ),
    },
    {
      pos: [0.35 * spread, 1.95, -1.4],
      speed: 2.0,
      node: (
        <mesh rotation={[0.3, 0, 0.8]}>
          <capsuleGeometry args={[0.13, 0.5, 8, 24]} />
          <meshPhysicalMaterial color={palette.pale} roughness={0.2} metalness={0.1} clearcoat={1} />
        </mesh>
      ),
    },
    {
      pos: [-0.5 * spread, -1.85, 1.0],
      speed: 1.7,
      node: (
        <mesh>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshPhysicalMaterial color={palette.accent} roughness={0.1} metalness={0.2} clearcoat={1} />
        </mesh>
      ),
    },
  ];

  return (
    <>
      {pieces.map((p, i) => (
        <Float key={i} enabled={!still} speed={p.speed} rotationIntensity={1.2} floatIntensity={1.4}>
          <group position={p.pos}>{p.node}</group>
        </Float>
      ))}
    </>
  );
}

/** Pulls the side pieces in on narrow (phone-shaped) canvases so they stay in frame. */
function useSpread() {
  const { size } = useThree();
  return THREE.MathUtils.clamp(size.width / size.height, 0.62, 1.1);
}

function Scene({ still, dark }: { still: boolean; dark: boolean }) {
  const palette: Palette = dark
    ? { accent: "#4ade80", accentDeep: "#15803d", ink: "#1f2522", pale: "#eef1ec" }
    : { accent: "#22c55e", accentDeep: "#166534", ink: "#1b1f1d", pale: "#ffffff" };
  const spread = useSpread();

  return (
    <>
      <ambientLight intensity={dark ? 0.3 : 0.6} />
      <directionalLight position={[3, 5, 4]} intensity={dark ? 1.6 : 2} />
      <pointLight position={[-3, -2, 3]} intensity={dark ? 10 : 5} color={palette.accent} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={2} color={palette.accent} position={[4, 1, -2]} rotation-y={-Math.PI / 2} scale={3} />
        <Lightformer form="rect" intensity={0.8} color="#a5f3fc" position={[0, -4, 2]} rotation-x={Math.PI / 2} scale={[6, 2, 1]} />
      </Environment>

      <Rig still={still}>
        <Float enabled={!still} speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
          <Knot palette={palette} still={still} />
        </Float>
        <Satellites palette={palette} still={still} spread={spread} />
      </Rig>

      <ContactShadows position={[0, -2.4, 0]} opacity={dark ? 0.5 : 0.25} scale={8} blur={3} far={4} />
    </>
  );
}

export default function Hero3D() {
  const { theme } = useTheme();
  const still = usePrefersReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering once the hero is off screen.
  useEffect(() => {
    if (!wrapper.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 40 }}
        dpr={[1, 1.75]}
        frameloop={still ? "demand" : visible ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene still={still} dark={theme === "dark"} />
        </Suspense>
      </Canvas>
    </div>
  );
}

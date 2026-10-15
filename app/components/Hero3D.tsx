"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
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

/* Leans toward the cursor, and eases back and down as the hero scrolls away.
   Listens on window because the canvas ignores pointer events. */
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
    const scrolled = Math.min(window.scrollY / window.innerHeight, 1);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.3, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.15 + scrolled * 0.4, 3, delta);
    const s = THREE.MathUtils.damp(g.scale.x, 1 - scrolled * 0.25, 4, delta);
    g.scale.setScalar(s);
  });

  return <group ref={group}>{children}</group>;
}

function Scene({ still, dark }: { still: boolean; dark: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ring.current && !still) ring.current.rotation.z += delta * 0.15;
  });

  return (
    <>
      <ambientLight intensity={dark ? 0.25 : 0.55} />
      <directionalLight position={[3, 5, 4]} intensity={dark ? 1.4 : 1.8} />

      {/* Asymmetric light: one broad key overhead, a cool fill low left, a green rim behind right. */}
      <Environment resolution={256}>
        <Lightformer form="circle" intensity={2.6} position={[-1.5, 5, 2]} scale={6} />
        <Lightformer form="rect" intensity={0.9} color="#64d2ff" position={[-6, -2, 1]} rotation-y={Math.PI / 2.4} scale={[10, 3, 1]} />
        <Lightformer form="ring" intensity={3} color="#30d158" position={[4, 2, -4]} scale={4} />
        <Lightformer form="rect" intensity={0.6} position={[0, 0, 8]} scale={[4, 10, 1]} />
      </Environment>

      <Rig still={still}>
        <Float enabled={!still} speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh>
            <sphereGeometry args={[1.35, 160, 160]} />
            <MeshDistortMaterial
              distort={still ? 0.3 : 0.38}
              speed={still ? 0 : 1.1}
              color={dark ? "#1f7a3c" : "#24a148"}
              roughness={0.12}
              metalness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.05}
              iridescence={1}
              iridescenceIOR={1.35}
              iridescenceThicknessRange={[150, 520]}
            />
          </mesh>
        </Float>
        <mesh ref={ring} rotation={[1.25, 0.25, 0]}>
          <torusGeometry args={[2.15, 0.035, 32, 256]} />
          <meshPhysicalMaterial color={dark ? "#d1d1d6" : "#f5f5f7"} metalness={1} roughness={0.15} clearcoat={1} />
        </mesh>
      </Rig>

      <ContactShadows position={[0, -2.1, 0]} opacity={dark ? 0.6 : 0.28} scale={7} blur={2.8} far={3.5} />
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
        camera={{ position: [0, 0, 6.6], fov: 40 }}
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

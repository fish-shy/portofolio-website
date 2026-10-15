"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.35, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.18 + scrolled * 0.35, 3, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 1 - scrolled * 0.2, 4, delta));
  });

  return <group ref={group}>{children}</group>;
}

/** A radial falloff drawn once to a canvas, shared by every glow. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.75)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/** Soft coloured light behind the glass; the glass bends it, which is what makes it read as glass. */
function Glow({
  color,
  position,
  size,
  still,
  speed,
  texture,
}: {
  color: string;
  position: [number, number, number];
  size: number;
  still: boolean;
  speed: number;
  texture: THREE.Texture;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || still) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = position[0] + Math.sin(t) * 0.6;
    ref.current.position.y = position[1] + Math.cos(t * 0.8) * 0.4;
  });
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial color={color} map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* Transmission renders what's behind the glass into a buffer; it has to be
   told the page colour, or empty space behind the glass shows up black. */
function Glass({ thickness = 0.6, page }: { thickness?: number; page: THREE.Color }) {
  return (
    <MeshTransmissionMaterial
      samples={6}
      resolution={512}
      transmission={1}
      thickness={thickness}
      roughness={0.18}
      ior={1.3}
      chromaticAberration={0.06}
      anisotropicBlur={0.15}
      distortion={0.1}
      distortionScale={0.3}
      temporalDistortion={0}
      backside
      backsideThickness={0.3}
      background={page}
      transparent
    />
  );
}

function Scene({ still, dark }: { still: boolean; dark: boolean }) {
  const slab = useRef<THREE.Mesh>(null);
  // Pull the side pieces in on narrow (phone-shaped) canvases so they stay in frame.
  const { size } = useThree();
  const spread = THREE.MathUtils.clamp(size.width / size.height / 1.4, 0.62, 1);
  const page = useMemo(() => new THREE.Color(dark ? "#000000" : "#fbfbfd"), [dark]);
  const glow = useGlowTexture();
  useFrame((_, delta) => {
    if (slab.current && !still) slab.current.rotation.y += delta * 0.18;
  });

  return (
    <>
      <ambientLight intensity={dark ? 0.4 : 0.8} />
      <directionalLight position={[3, 5, 5]} intensity={1.5} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="circle" intensity={2} position={[5, -1, 3]} rotation-y={-Math.PI / 2} scale={3} />
      </Environment>

      {/* The coloured light the glass refracts. */}
      <Glow texture={glow} color="#2997ff" position={[-0.9, 0.5, -2.4]} size={4.2} still={still} speed={0.35} />
      <Glow texture={glow} color="#64d2ff" position={[1.3, -0.7, -2.6]} size={3.4} still={still} speed={0.28} />
      <Glow texture={glow} color={dark ? "#e8f2ff" : "#ffffff"} position={[0.3, 1.4, -2.8]} size={2} still={still} speed={0.42} />
      {/* Small glows behind the side pieces, so they refract colour instead of the black page. */}
      <Glow texture={glow} color="#64d2ff" position={[1.95 * spread, 1.05, -0.6]} size={1.6} still={still} speed={0.5} />
      <Glow texture={glow} color="#2997ff" position={[-1.95 * spread, -1.0, -0.5]} size={1.8} still={still} speed={0.45} />

      <Rig still={still}>
        <Float enabled={!still} speed={1} rotationIntensity={0.25} floatIntensity={0.5}>
          <RoundedBox ref={slab} args={[2.6, 2.6, 0.5]} radius={0.5} smoothness={8} rotation={[0.18, -0.4, 0.06]}>
            <Glass thickness={0.8} page={page} />
          </RoundedBox>
        </Float>
        <Float enabled={!still} speed={1.6} rotationIntensity={1} floatIntensity={1.1}>
          <mesh position={[1.95 * spread, 1.05, 0.7]}>
            <sphereGeometry args={[0.42, 64, 64]} />
            <Glass thickness={0.5} page={page} />
          </mesh>
        </Float>
        <Float enabled={!still} speed={1.3} rotationIntensity={1.2} floatIntensity={1}>
          <mesh position={[-1.95 * spread, -1.0, 0.8]} rotation={[1.1, 0.4, 0]}>
            <torusGeometry args={[0.5, 0.17, 48, 96]} />
            <Glass thickness={0.4} page={page} />
          </mesh>
        </Float>
      </Rig>
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

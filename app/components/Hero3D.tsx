"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Real screenshots from the Work section, served through the Next image
// optimizer so the GPU gets a 1200px texture instead of the 2.5k originals.
const SCREENS = [
  { src: "/assets/images/smartcal.png", aspect: 2550 / 1432 },
  { src: "/assets/images/sipandai.png", aspect: 2559 / 1310 },
  { src: "/assets/images/clinicalgo.png", aspect: 2540 / 1306 },
];
const textureUrl = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=80`;

// Resting pose of each sheet: [x, y, z] and Y rotation, front sheet first.
const LAYOUT = [
  { pos: [0.55, -0.45, 0.9], rotY: -0.32 },
  { pos: [-0.2, 0.4, -0.2], rotY: -0.22 },
  { pos: [1.05, 1.0, -1.3], rotY: -0.12 },
] as const;
const WIDTH = 3.1;

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

/* Tilts the stack toward the cursor and fans the sheets apart as the hero
   scrolls away. Listens on window because the canvas ignores pointer events. */
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
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.35, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.2, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

function Sheet({
  texture,
  aspect,
  index,
  frameColor,
  still,
}: {
  texture: THREE.Texture;
  aspect: number;
  index: number;
  frameColor: string;
  still: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const { pos, rotY } = LAYOUT[index];
  const height = WIDTH / aspect;

  useFrame((state, delta) => {
    if (!ref.current || still) return;
    const t = state.clock.elapsedTime;
    const spread = Math.min(window.scrollY / window.innerHeight, 1);
    // Each layer drifts at its own phase so the depth reads on touch screens too.
    const float = Math.sin(t * 0.6 + index * 1.3) * 0.06;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, pos[1] + float + spread * index * 0.5, 4, delta);
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, pos[2] - spread * index * 1.2, 4, delta);
  });

  return (
    <group ref={ref} position={[pos[0], pos[1], pos[2]]} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[WIDTH + 0.08, height + 0.08]} />
        <meshBasicMaterial color={frameColor} toneMapped={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[WIDTH, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Stack({ frameColor, still }: { frameColor: string; still: boolean }) {
  const urls = useMemo(() => SCREENS.map((s) => textureUrl(s.src)), []);
  const textures = useLoader(THREE.TextureLoader, urls);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      t.needsUpdate = true;
    });
  }, [textures]);

  // Draw back to front so the front sheet is never hidden by a later one.
  return (
    <>
      {[2, 1, 0].map((i) => (
        <Sheet key={i} index={i} texture={textures[i]} aspect={SCREENS[i].aspect} frameColor={frameColor} still={still} />
      ))}
    </>
  );
}

export default function Hero3D() {
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering once the hero is off screen.
  useEffect(() => {
    if (!wrapper.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  const frameColor = theme === "dark" ? "#26302b" : "#dcdcd3";

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        flat
        camera={{ position: [0, 0.3, 5.8], fov: 40 }}
        dpr={[1, 1.75]}
        frameloop={reducedMotion ? "demand" : visible ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Rig still={reducedMotion}>
            <Stack frameColor={frameColor} still={reducedMotion} />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  );
}

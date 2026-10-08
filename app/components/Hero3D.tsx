"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

export const WEB_SCREENS = [
  // Wider than the screen, so it is shown whole on a dark backing instead of cropped.
  { title: "CreativeChain", src: "/assets/images/creativechain.png", w: 480, h: 252, contain: true },
  { title: "Village Budget Monitoring", src: "/assets/images/sipandai.png", w: 2559, h: 1310 },
  { title: "CLINICALgo", src: "/assets/images/clinicalgo.png", w: 2540, h: 1306 },
  { title: "SmartCal", src: "/assets/images/smartcal.png", w: 2550, h: 1432 },
];
const PHONE_SCREEN = { src: "/assets/images/learnfy.png", w: 277, h: 238 };

// The optimizer hands the GPU a 1200px texture instead of the 2.5k originals.
const textureUrl = (src: string, w = 1200) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=80`;

/** Height of the stage disc; the portrait in Hero.tsx is placed to stand on it. */
const PLATFORM_Y = -1.75;
const SCREEN_W = 3.0;
const SCREEN_H = 1.86;

/** Crop a texture like CSS object-fit: cover, anchored to the top edge. */
function coverTop(tex: THREE.Texture, imgAspect: number, planeAspect: number) {
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  if (imgAspect > planeAspect) {
    tex.repeat.set(planeAspect / imgAspect, 1);
    tex.offset.set((1 - tex.repeat.x) / 2, 0);
  } else {
    tex.repeat.set(1, imgAspect / planeAspect);
    tex.offset.set(0, 1 - tex.repeat.y);
  }
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
}

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

type Palette = { body: string; deck: string; bezel: string; accent: string };

function Laptop({ active, palette, still }: { active: number; palette: Palette; still: boolean }) {
  const lid = useRef<THREE.Group>(null);
  const textures = useLoader(
    THREE.TextureLoader,
    WEB_SCREENS.map((s) => textureUrl(s.src))
  );

  useMemo(() => {
    textures.forEach((t, i) => {
      const s = WEB_SCREENS[i];
      if ("contain" in s) {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        t.needsUpdate = true;
      } else {
        coverTop(t, s.w / s.h, SCREEN_W / SCREEN_H);
      }
    });
  }, [textures]);

  // The lid starts shut and opens once on load; scrolling past the hero closes it again.
  const OPEN = -0.28;
  const SHUT = -Math.PI / 2 + 0.02;
  useEffect(() => {
    if (lid.current) lid.current.rotation.x = still ? OPEN : SHUT;
  }, [still, OPEN, SHUT]);

  useFrame((_, delta) => {
    if (!lid.current || still) return;
    const scrolled = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
    const target = THREE.MathUtils.lerp(OPEN, SHUT * 0.55, scrolled);
    lid.current.rotation.x = THREE.MathUtils.damp(lid.current.rotation.x, target, 3.2, delta);
  });

  return (
    <group>
      {/* Base */}
      <RoundedBox args={[3.3, 0.12, 2.25]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color={palette.body} metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* Keyboard well and trackpad */}
      <mesh position={[0, 0.061, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.85, 1.05]} />
        <meshStandardMaterial color={palette.deck} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.061, 0.68]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 0.6]} />
        <meshStandardMaterial color={palette.deck} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Lid hinged on the back edge of the base */}
      <group ref={lid} position={[0, 0.06, -1.1]}>
        <RoundedBox args={[3.3, 2.15, 0.07]} radius={0.04} smoothness={4} position={[0, 1.075, -0.035]}>
          <meshStandardMaterial color={palette.body} metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 1.075, 0.002]}>
          <planeGeometry args={[3.2, 2.05]} />
          <meshStandardMaterial color={palette.bezel} roughness={0.4} />
        </mesh>
        {WEB_SCREENS.map((s, i) =>
          "contain" in s ? (
            <group key={s.src} visible={i === active}>
              <mesh position={[0, 1.1, 0.003]}>
                <planeGeometry args={[SCREEN_W, SCREEN_H]} />
                <meshBasicMaterial color="#090a12" toneMapped={false} />
              </mesh>
              <mesh position={[0, 1.1, 0.004]}>
                <planeGeometry args={[SCREEN_W, SCREEN_W / (s.w / s.h)]} />
                <meshBasicMaterial map={textures[i]} toneMapped={false} />
              </mesh>
            </group>
          ) : (
            <mesh key={s.src} position={[0, 1.1, 0.004]} visible={i === active}>
              <planeGeometry args={[SCREEN_W, SCREEN_H]} />
              <meshBasicMaterial map={textures[i]} toneMapped={false} />
            </mesh>
          )
        )}
      </group>
    </group>
  );
}

function Phone({ palette }: { palette: Palette }) {
  const tex = useLoader(THREE.TextureLoader, textureUrl(PHONE_SCREEN.src, 640));
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  }, [tex]);
  const imgW = 0.78;
  const imgH = imgW / (PHONE_SCREEN.w / PHONE_SCREEN.h);

  return (
    <group>
      <RoundedBox args={[0.98, 2.0, 0.1]} radius={0.12} smoothness={6}>
        <meshStandardMaterial color={palette.body} metalness={0.7} roughness={0.3} />
      </RoundedBox>
      {/* Splash screen: the e-learning app's own artwork on white */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[0.88, 1.9]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.05, 0.052]}>
        <planeGeometry args={[imgW, imgH]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.86, 0.053]}>
        <planeGeometry args={[0.26, 0.07]} />
        <meshBasicMaterial color="#0b0d0c" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Leans the whole stage toward the cursor. Listens on window because the
   portrait sits on top of the canvas and takes the pointer events. */
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
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.22, 2.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.08, 2.5, delta);
  });

  return <group ref={group}>{children}</group>;
}

/** The disc the portrait stands on, with a lit rim so the person reads as on stage. */
function Platform({ palette }: { palette: Palette }) {
  return (
    <group position={[0, PLATFORM_Y, 0]}>
      <mesh>
        <cylinderGeometry args={[1.55, 1.65, 0.16, 96]} />
        <meshStandardMaterial color={palette.body} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.081, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.42, 1.5, 96]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.13, 128]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** One tilted ring around the figure with a marker travelling along it. */
function Orbit({ palette, still }: { palette: Palette; still: boolean }) {
  const dot = useRef<THREE.Mesh>(null);
  const R = 2.05;
  useFrame((state) => {
    if (!dot.current) return;
    const t = still ? 1.2 : state.clock.elapsedTime * 0.45;
    dot.current.position.set(Math.cos(t) * R, 0, Math.sin(t) * R);
  });
  return (
    <group position={[0, -0.2, 0]} rotation={[1.32, 0, 0.18]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.007, 8, 160]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Pulls the devices in on narrow (phone-shaped) canvases so they stay in frame. */
function useSpread() {
  const { size } = useThree();
  return THREE.MathUtils.clamp(size.width / size.height / 0.9, 0.62, 1.15);
}

function Scene({ active, still, dark }: { active: number; still: boolean; dark: boolean }) {
  const palette: Palette = dark
    ? { body: "#2c322f", deck: "#1b201e", bezel: "#0b0d0c", accent: "#4ade80" }
    : { body: "#c9ccc6", deck: "#9da19b", bezel: "#0f1211", accent: "#15803d" };
  const spread = useSpread();

  return (
    <>
      <ambientLight intensity={dark ? 0.35 : 0.65} />
      <directionalLight position={[4, 6, 5]} intensity={dark ? 1.4 : 1.8} />
      <pointLight position={[0, -1.2, 1.5]} intensity={dark ? 6 : 3} color={palette.accent} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color={palette.accent} position={[5, 1, -2]} rotation-y={-Math.PI / 2} scale={[4, 1, 1]} />
      </Environment>

      <Rig still={still}>
        <Platform palette={palette} />
        <Orbit palette={palette} still={still} />

        <Float enabled={!still} speed={1.1} rotationIntensity={0.12} floatIntensity={0.4}>
          <group position={[-1.1 * spread, 1.05, -1.7]} rotation={[0.12, 0.55, 0]} scale={0.56}>
            <Laptop active={active} palette={palette} still={still} />
          </group>
        </Float>
        <Float enabled={!still} speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
          <group position={[1.5 * spread, -0.35, 0.6]} rotation={[0.04, -0.5, 0.06]} scale={0.62}>
            <Phone palette={palette} />
          </group>
        </Float>
      </Rig>

      <ContactShadows position={[0, PLATFORM_Y + 0.09, 0]} opacity={dark ? 0.55 : 0.3} scale={5} blur={2.4} far={3} />
    </>
  );
}

export default function Hero3D({ active }: { active: number }) {
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
        camera={{ position: [0, 0, 7], fov: 38 }}
        dpr={[1, 1.75]}
        frameloop={still ? "demand" : visible ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene active={active} still={still} dark={theme === "dark"} />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  PresentationControls,
  RoundedBox,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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

function Scene({ active, still, dark, draggable }: { active: number; still: boolean; dark: boolean; draggable: boolean }) {
  const palette: Palette = dark
    ? { body: "#3a403d", deck: "#202523", bezel: "#0b0d0c", accent: "#4ade80" }
    : { body: "#c9ccc6", deck: "#9da19b", bezel: "#0f1211", accent: "#15803d" };

  return (
    <>
      <ambientLight intensity={dark ? 0.35 : 0.6} />
      <directionalLight position={[4, 6, 5]} intensity={dark ? 1.4 : 1.8} />
      <pointLight position={[-4, 2, -3]} intensity={dark ? 18 : 8} color={palette.accent} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color={palette.accent} position={[5, 1, -2]} rotation-y={-Math.PI / 2} scale={[4, 1, 1]} />
      </Environment>

      <PresentationControls
        enabled={draggable && !still}
        global={false}
        cursor
        snap
        speed={1.2}
        rotation={[0.18, -0.35, 0]}
        polar={[-0.15, 0.3]}
        azimuth={[-0.7, 0.5]}
      >
        <Float enabled={!still} speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
          <group position={[-0.45, -0.55, 0]}>
            <Laptop active={active} palette={palette} still={still} />
          </group>
        </Float>
        <Float enabled={!still} speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
          <group position={[2.05, -0.3, 0.85]} rotation={[0.05, -0.5, 0.04]} scale={0.82}>
            <Phone palette={palette} />
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -1.25, 0]} opacity={dark ? 0.6 : 0.35} scale={9} blur={2.6} far={3} />
    </>
  );
}

export default function Hero3D({ active }: { active: number }) {
  const { theme } = useTheme();
  const still = usePrefersReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Dragging is mouse-only so a thumb on the canvas still scrolls the page.
  const [draggable, setDraggable] = useState(false);
  useEffect(() => setDraggable(window.matchMedia("(pointer: fine)").matches), []);

  // Stop rendering once the hero is off screen.
  useEffect(() => {
    if (!wrapper.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0 touch-pan-y">
      <Canvas
        camera={{ position: [0, 1.1, 6.6], fov: 38 }}
        dpr={[1, 1.75]}
        frameloop={still ? "demand" : visible ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <Scene active={active} still={still} dark={theme === "dark"} draggable={draggable} />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useExperience } from "@/context/ExperienceContext";

/** Procedural iris texture — striations, crypts, collarette ring, limbal darkening */
function makeIrisTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const ctx = c.getContext("2d")!;
  const cx = 512, cy = 512;

  // Base radial gradient — deep ice blue to luminous cyan with a golden center
  const g = ctx.createRadialGradient(cx, cy, 30, cx, cy, 500);
  g.addColorStop(0, "#06182e");
  g.addColorStop(0.12, "#3d2b00"); // Golden inner ring
  g.addColorStop(0.25, "#0a2540");
  g.addColorStop(0.45, "#0d3a5c");
  g.addColorStop(0.72, "#1a6b8a");
  g.addColorStop(0.92, "#3fb8d4");
  g.addColorStop(1, "#8fe0f0");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 1024);

  // Striations — radiating fibres (increased density and detail)
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 800; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r1 = 90 + Math.random() * 80; // Start closer to pupil
    const r2 = 350 + Math.random() * 160;
    const x1 = cx + Math.cos(angle) * r1;
    const y1 = cy + Math.sin(angle) * r1;
    const x2 = cx + Math.cos(angle) * r2;
    const y2 = cy + Math.sin(angle) * r2;
    
    // Mix of ice blue and golden/amber fibres
    const isGold = Math.random() > 0.85;
    const hue = isGold ? 45 + Math.random() * 20 : 180 + Math.random() * 30;
    const sat = isGold ? 90 : 70;
    const light = 40 + Math.random() * 45;
    
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${0.05 + Math.random() * 0.25})`;
    ctx.lineWidth = 0.3 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    
    // Zig-zag / organic curving
    const cmid = angle + (Math.random() - 0.5) * 0.15;
    const rmid = (r1 + r2) / 2;
    ctx.quadraticCurveTo(cx + Math.cos(cmid) * rmid, cy + Math.sin(cmid) * rmid, x2, y2);
    ctx.stroke();
  }

  // Crypts of Fuchs — intricate web-like pits
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 120; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 130 + Math.random() * 300;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    const rad = 5 + Math.random() * 40;
    const cg = ctx.createRadialGradient(x, y, 0, x, y, rad);
    cg.addColorStop(0, "rgba(8, 20, 35, 0.85)");
    cg.addColorStop(1, "rgba(8, 20, 35, 0)");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Crypts — darker pits
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 150 + Math.random() * 260;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    const rad = 8 + Math.random() * 32;
    const cg = ctx.createRadialGradient(x, y, 0, x, y, rad);
    cg.addColorStop(0, "rgba(18,38,58,0.7)");
    cg.addColorStop(1, "rgba(18,38,58,0)");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Collarette ring
  ctx.globalCompositeOperation = "screen";
  const ring = ctx.createRadialGradient(cx, cy, 180, cx, cy, 245);
  ring.addColorStop(0, "rgba(120,200,220,0)");
  ring.addColorStop(0.5, "rgba(150,215,235,0.28)");
  ring.addColorStop(1, "rgba(120,200,220,0)");
  ctx.fillStyle = ring;
  ctx.fillRect(0, 0, 1024, 1024);

  // Dark pupil edge
  ctx.globalCompositeOperation = "source-over";
  const pupilEdge = ctx.createRadialGradient(cx, cy, 95, cx, cy, 155);
  pupilEdge.addColorStop(0, "rgba(0,0,0,0.92)");
  pupilEdge.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = pupilEdge;
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer dark rim (limbal)
  const limbal = ctx.createRadialGradient(cx, cy, 460, cx, cy, 500);
  limbal.addColorStop(0, "rgba(0,0,0,0)");
  limbal.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = limbal;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle noise
  const img = ctx.getImageData(0, 0, 1024, 1024);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 16;
    img.data[i] = Math.max(0, Math.min(255, img.data[i]! + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1]! + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2]! + n));
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function EyeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const irisRef = useRef<THREE.Mesh>(null);
  const pupilRef = useRef<THREE.Mesh>(null);
  const { isEyeOpened } = useExperience();
  const { pointer } = useThree();

  // Procedural iris texture (memoized, created once client-side)
  const irisTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    return makeIrisTexture();
  }, []);

  // Lerp targets
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Pupil dilation animation state
  const [dilating, setDilating] = useState(false);
  const pupilScale = useRef(1);
  const pupilTarget = useRef(1);
  const emissiveIntensityRef = useRef(0.1); // Start low in the dark

  // On openEye: miosis → mydriasis
  useEffect(() => {
    if (!isEyeOpened) return;
    setDilating(true);
    pupilTarget.current = 0.35; // miosis
    emissiveIntensityRef.current = 0.8; // Set to normal immediately, no flash
    const t1 = setTimeout(() => { pupilTarget.current = 3.4; }, 90); // mydriasis
    const t2 = setTimeout(() => {
      pupilTarget.current = 1;
      const t3 = setTimeout(() => setDilating(false), 900);
      return () => clearTimeout(t3);
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isEyeOpened]);

  useFrame((state, delta) => {
    if (!groupRef.current || !irisRef.current || !pupilRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Lerp emissive intensity down to base 0.8
    const material = (irisRef.current.material as THREE.MeshPhysicalMaterial);
    if (material && material.emissiveIntensity !== undefined) {
      emissiveIntensityRef.current = THREE.MathUtils.lerp(emissiveIntensityRef.current, isEyeOpened ? 0.8 : 0.1, 0.04);
      material.emissiveIntensity = emissiveIntensityRef.current;
    }

    // 12-second breath cycle, 1.5% amplitude
    const baseScale = 1;
    const breath = Math.sin(t * (Math.PI * 2 / 12)) * 0.015;
    groupRef.current.scale.setScalar(baseScale + breath);

    // Mouse Tracking Mechanics
    // Only track if the intro veil is lifted (isEyeOpened is true)
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Map pointer coordinates (-1 to +1) to rotation angles in radians
    // Restrict the maximum gaze angle so it looks realistic
    const maxAngleX = 0.45; // Up/Down limit
    const maxAngleY = 0.55; // Left/Right limit
    
    targetRotationX = state.pointer.y * -maxAngleX;
    targetRotationY = state.pointer.x * maxAngleY;

    // Add a very slow autonomic drift (saccades/idle motion) when not tracking heavily
    const driftX = Math.sin(t * 0.4) * 0.02;
    const driftY = Math.cos(t * 0.3) * 0.03;

    // Smoothly interpolate current rotation towards target rotation
    // Lerp factor of 0.05 gives that heavy, velvety inertia described in Chapter II
    const lerpFactor = 0.05;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX + driftX,
      lerpFactor
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY + driftY,
      lerpFactor
    );

    // Pupil
    if (dilating) {
      pupilScale.current += (pupilTarget.current - pupilScale.current) * 0.18;
      pupilRef.current.scale.setScalar(pupilScale.current);
    } else {
      pupilRef.current.scale.setScalar(1 + breath);
    }
  });

  return (
    <group ref={groupRef}>
      {/* SCLERA — wet biological bulb */}
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          color="#f5f2ec"
          roughness={0.22}
          clearcoat={1.0}
          clearcoatRoughness={0.18}
          sheen={0.6}
          sheenRoughness={0.5}
          sheenColor={new THREE.Color("#cfe0e8")}
          envMapIntensity={0.75}
        />
      </mesh>

      {/* LIMBAL RING — subtle dark ring around iris */}
      <mesh position={[0, 0, 0.9]}>
        <ringGeometry args={[0.395, 0.5, 128]} />
        <meshBasicMaterial
          color="#1a1410"
          transparent
          opacity={0.45}
          blending={THREE.MultiplyBlending}
        />
      </mesh>

      {/* IRIS — procedural texture with physical depth */}
      <mesh ref={irisRef} position={[0, 0, 0.905]}>
        <circleGeometry args={[0.42, 128]} />
        {irisTex ? (
          <meshPhysicalMaterial
            map={irisTex}
            bumpMap={irisTex}
            bumpScale={0.015}
            emissive={new THREE.Color("#1a4f6b")}
            emissiveMap={irisTex}
            emissiveIntensity={0.8}
            roughness={0.4}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
          />
        ) : (
          <meshStandardMaterial color="#0d3a5c" />
        )}
      </mesh>

      {/* PUPIL — deep black */}
      <mesh ref={pupilRef} position={[0, 0, 0.908]}>
        <circleGeometry args={[0.16, 64]} />
        <meshBasicMaterial color="#020203" />
      </mesh>

      {/* CORNEA — physical glass with real IOR 1.376 */}
      <mesh position={[0, 0, 0.78]}>
        <sphereGeometry args={[0.5, 96, 96]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={1}
          thickness={0.7}
          ior={1.376}
          transparent
          opacity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1.9}
          side={THREE.DoubleSide}
          specularIntensity={1}
        />
      </mesh>
      {/* ENVIRONMENT for ultra-realistic reflections */}
      <Environment preset="city" />
    </group>
  );
}

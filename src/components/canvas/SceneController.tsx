"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import EyeModel from "./EyeModel";
import * as THREE from "three";

export default function SceneController() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 34 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      className="w-full h-full"
    >
      {/* Ambient — low, cold, clinical */}
      <ambientLight intensity={0.25} color="#3a5060" />

      {/* Key light — warm white from upper right */}
      <pointLight position={[3, 4, 5]} intensity={45} distance={30} color="#dfeeff" />

      {/* Fill — cyan from lower left */}
      <pointLight position={[-4, -1, 3]} intensity={18} distance={25} color="#3fb8d4" />

      {/* Rim — white backlight */}
      <pointLight position={[-1, 3, -5]} intensity={28} distance={25} color="#ffffff" />

      {/* Bottom — deep blue accent */}
      <pointLight position={[0, -4, 2]} intensity={12} distance={25} color="#1a4a6b" />

      <Suspense fallback={null}>
        <EyeModel />
      </Suspense>
    </Canvas>
  );
}

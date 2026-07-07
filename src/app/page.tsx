"use client";
import { useExperience } from "@/context/ExperienceContext";
import { motion } from "framer-motion";
import SceneController from "@/components/canvas/SceneController";
import IntroSequence from "@/components/sections/IntroSequence";
import CornerHUD from "@/components/ui/CornerHUD";
import DynamicField from "@/components/ui/DynamicField";
import Overlays from "@/components/ui/Overlays";
import EditorialSections from "@/components/sections/EditorialSections";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const { isEyeOpened } = useExperience();

  return (
    <>
      {/* ── Layer 1: 3D Eye canvas (z-5, fixed background) ── */}
      <div className="fixed inset-0 z-[5] h-screen w-screen pointer-events-none">
        <SceneController />
      </div>

      {/* ── Layer 2: Dynamic field + decorative overlays ── */}
      <DynamicField />
      <Overlays />

      {/* ── Layer 3: Intro sequence (veil z-30, pulse z-25, text z-28, button z-20) ── */}
      <IntroSequence />

      {/* ── Layer 4: Corner HUD labels (z-18) ── */}
      <CornerHUD />

      {/* ── Layer 5: Editorial content (z-6) ── */}
      {isEyeOpened && (
        <motion.main
          className="relative z-[6]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <EditorialSections />
          <Footer />
        </motion.main>
      )}
    </>
  );
}

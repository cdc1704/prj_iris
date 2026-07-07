"use client";
import { useExperience } from "@/context/ExperienceContext";

/**
 * Overlays — vignette, film grain, and scroll hint.
 * These are purely decorative fixed layers that frame the experience.
 */
export default function Overlays() {
  const { isEyeOpened } = useExperience();

  return (
    <>
      {/* Vignette — radial darkening around edges */}
      <div className="vignette" />

      {/* Film grain — SVG noise texture */}
      <div className="grain" />

      {/* Scroll hint — animated line, shown only after eye opens */}
      <div
        className={`fixed left-1/2 bottom-[4vh] -translate-x-1/2 z-[19] pointer-events-none transition-opacity duration-1000 ${
          isEyeOpened ? "opacity-50" : "opacity-0"
        }`}
      >
        <div className="scroll-hint-line" />
      </div>
    </>
  );
}

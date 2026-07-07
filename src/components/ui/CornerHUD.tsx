"use client";
import { useExperience } from "@/context/ExperienceContext";
import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * CornerHUD — four fixed-position HUD labels with staggered fade-in.
 * Visibility toggles via the CSS .shown class when the intro advances.
 */
export default function CornerHUD() {
  const { introPhase, isEyeOpened } = useExperience();
  const visible = introPhase === "hud" || introPhase === "open";
  const dimmed = isEyeOpened;

  return (
    <>
      <div
        className={`corner tl ${visible ? "shown" : ""}`}
        style={dimmed ? { opacity: 0.22 } : undefined}
      >
        <span className="dot" />
        {visible ? <ScrambleText key={`tl-${isEyeOpened}`} text="IRIS — PROCEDURAL OCULAR ENGINE" delay={200} /> : "IRIS — PROCEDURAL OCULAR ENGINE"}
      </div>
      <div
        className={`corner tr ${visible ? "shown" : ""}`}
        style={dimmed ? { opacity: 0.22 } : undefined}
      >
        {visible ? <ScrambleText key={`tr1-${isEyeOpened}`} text="v.0.42" delay={400} /> : "v.0.42"}
        <span className="dim"> // </span>
        {visible ? <ScrambleText key={`tr2-${isEyeOpened}`} text="CALIBRAZIONE EMOTIVA" delay={600} /> : "CALIBRAZIONE EMOTIVA"}
      </div>
      <div
        className={`corner bl ${visible ? "shown" : ""}`}
        style={dimmed ? { opacity: 0.22 } : undefined}
      >
        {visible ? <ScrambleText key={`bl1-${isEyeOpened}`} text="SISTEMA" delay={800} /> : "SISTEMA"}
        <span className="dim"> · </span>
        {visible ? <ScrambleText key={`bl2-${isEyeOpened}`} text="ATTIVO" delay={1000} /> : "ATTIVO"}
      </div>
      <div
        className={`corner br ${visible ? "shown" : ""}`}
        style={dimmed ? { opacity: 0.22 } : undefined}
      >
        {visible ? <ScrambleText key={`br1-${isEyeOpened}`} text="LAT 45.46°" delay={1200} /> : "LAT 45.46°"}
        <span className="dim"> · </span>
        {visible ? <ScrambleText key={`br2-${isEyeOpened}`} text="LON 9.19°" delay={1400} /> : "LON 9.19°"}
      </div>
    </>
  );
}

"use client";
import { useEffect, useRef, useCallback } from "react";
import { useExperience } from "@/context/ExperienceContext";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

/**
 * IntroSequence — veil → pulse → text → HUD → button choreography.
 * Mirrors the reference sketch while driving shared experience state.
 */
export default function IntroSequence() {
  const { introPhase, isEyeOpened, openEye, setIntroPhase } = useExperience();

  const veilRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const hudWrapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEyeOpened) {
      document.body.classList.remove("locked");
      return;
    }

    document.body.classList.add("locked");
    setIntroPhase("pulse");

    const t1 = setTimeout(() => {
      setIntroPhase("text1");
      line1Ref.current?.classList.remove("opacity-0");
      line1Ref.current?.classList.add("opacity-100");
    }, 300);

    // Show line 2
    const t2 = setTimeout(() => {
      line2Ref.current?.classList.remove("opacity-0");
      line2Ref.current?.classList.add("opacity-100");
    }, 1800);

    // Hide both lines
    const t2b = setTimeout(() => {
      line1Ref.current?.classList.replace("opacity-100", "opacity-0");
      line2Ref.current?.classList.replace("opacity-100", "opacity-0");
    }, 3500);

    const t3 = setTimeout(() => {
      setIntroPhase("eye");
      veilRef.current?.classList.add("lifted");
      if (pulseRef.current) pulseRef.current.style.opacity = "0";
    }, 4500);

    const t4 = setTimeout(() => {
      setIntroPhase("hud");
      if (hudWrapRef.current) {
        hudWrapRef.current.classList.add("shown");
        hudWrapRef.current.style.opacity = "1";
        hudWrapRef.current.style.pointerEvents = "auto";
      }
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.classList.remove("locked");
    };
  }, [isEyeOpened, setIntroPhase]);

  const handleEnter = useCallback(() => {
    setTimeout(() => {
      openEye();
      if (hudWrapRef.current) {
        hudWrapRef.current.style.opacity = "0";
        hudWrapRef.current.style.pointerEvents = "none";
      }
    }, 420);
  }, [openEye]);

  return (
    <div style={{ pointerEvents: isEyeOpened ? "none" : "auto" }}>
      <div 
        ref={veilRef} 
        className={`veil ${isEyeOpened ? "lifted" : ""}`} 
        aria-hidden="true" 
        style={{ transition: "opacity 2.5s ease" }} 
      />

      <div
        ref={pulseRef}
        className="fixed inset-0 z-[25] flex items-center justify-center pointer-events-none"
        style={{ transition: "opacity 1.2s ease" }}
        aria-hidden="true"
      >
        <svg className="sine" viewBox="0 0 440 80" preserveAspectRatio="none">
          <path d="M0,40 Q18.3,8 36.6,40 T73.3,40 T110,40 T146.6,40 T183.3,40 T220,40 T256.6,40 T293.3,40 T330,40 T366.6,40 T403.3,40 T440,40" />
        </svg>
      </div>

      <div className="fixed inset-0 z-[28] flex flex-col items-center justify-center pointer-events-none font-mono" aria-live="polite">
        <div ref={line1Ref} className="intro-line text-cyan-400 tracking-widest mb-4 opacity-0 transition-opacity duration-500">
          <TextReveal text="> INIZIALIZZAZIONE SISTEMA..." delay={0.2} />
        </div>
        <div ref={line2Ref} className="intro-line text-cyan-500 tracking-widest text-sm opacity-0 transition-opacity duration-500">
          <TextReveal text="[ SCANSIONE RETINICA IN CORSO ]" delay={0.4} />
        </div>
        
        {/* Retinal Scan Sweep Beam */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.8)] opacity-0 transition-opacity duration-300 ${introPhase === "text1" ? "opacity-100 animate-scan" : ""}`} />
      </div>

      <div
        ref={hudWrapRef}
        className="fixed left-1/2 bottom-[13vh] -translate-x-1/2 z-20 opacity-0 pointer-events-none"
        style={{ transition: "opacity 1s ease 0.4s" }}
      >
        <MagneticWrapper strength={0.4}>
          <button className="hud-btn" onClick={handleEnter} aria-label="Entra nell'esperienza IRIS">
            <span className="hud-dot" aria-hidden="true" />
            <TextReveal text="ACCEDI AL TERMINALE" delay={0.8} />
          </button>
        </MagneticWrapper>
      </div>
    </div>
  );
}

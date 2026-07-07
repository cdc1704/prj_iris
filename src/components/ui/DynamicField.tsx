"use client";
import { CSSProperties, useEffect, useRef } from "react";
import { useExperience } from "@/context/ExperienceContext";

/**
 * DynamicField adds non-interactive cinematic energy around the eye:
 * rotating calibration rings, scanning beams, data particles, and cursor-reactive drift.
 */
export default function DynamicField() {
  const { isEyeOpened } = useExperience();
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onPointerMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth - 0.5) * 2;
      ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      field.style.setProperty("--mx", x.toFixed(3));
      field.style.setProperty("--my", y.toFixed(3));
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className={`dynamic-field ${isEyeOpened ? "field-open" : ""}`}
      aria-hidden="true"
    >
      <div className="iris-aura" />
      <div className="calibration-ring ring-outer" />
      <div className="calibration-ring ring-mid" />
      <div className="calibration-ring ring-inner" />
      <div className="scan-beam beam-a" />
      <div className="scan-beam beam-b" />
      <div className="data-particles">
        {Array.from({ length: 18 }).map((_, index) => (
          <i key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

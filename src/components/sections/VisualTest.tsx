"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

type Defect = "normal" | "miopia" | "astigmatismo" | "ipermetropia";

const DEFECTS: { id: Defect; label: string; tag: string }[] = [
  { id: "normal",       label: "Visione Pura",   tag: "20/20" },
  { id: "miopia",       label: "Miopia",          tag: "SPH −3.00" },
  { id: "astigmatismo", label: "Astigmatismo",    tag: "CYL −1.50" },
  { id: "ipermetropia", label: "Ipermetropia",    tag: "SPH +2.00" },
];

function useOpticalEffect(defect: Defect, intensity: number): React.CSSProperties {
  const n = intensity / 100;
  if (defect === "normal")       return { filter: "blur(0px) contrast(1.08)" };
  if (defect === "miopia")       return { filter: `blur(${n * 14}px)` };
  if (defect === "astigmatismo") return { filter: `blur(${n * 3}px)`, transform: `skewX(${n * 9}deg) scaleY(${1 - n * 0.08})` };
  if (defect === "ipermetropia") return { filter: `blur(${n * 5}px) contrast(${1 + n * 0.3})` };
  return {};
}

export default function VisualTest() {
  const [defect, setDefect] = useState<Defect>("normal");
  const [intensity, setIntensity] = useState(30);
  const opticalStyle = useOpticalEffect(defect, defect === "normal" ? 0 : intensity);

  return (
    <section className="relative z-10 w-full min-h-screen flex items-center px-6 md:px-20 py-40">
      <div className="max-w-[1480px] w-full mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-20 items-center">

          {/* ─── LEFT: Controls (5 col) ─── */}
          <div className="lg:col-span-5 flex flex-col">

            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] text-[#00E5FF] tracking-[0.45em] uppercase font-mono mb-7 block"
            >
              // OPTICAL_SIMULATOR &nbsp; 06.CHAPTER
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              className="text-[clamp(2.8rem,6vw,6rem)] font-display font-thin uppercase leading-[0.88] tracking-[-0.02em] text-white mb-14"
            >
              Percezione<br />
              <span className="text-white/25">Alterata.</span>
            </motion.h2>

            {/* Defect selector — precision tab strip */}
            <div className="flex flex-col gap-2 mb-10">
              {DEFECTS.map((d) => {
                const active = defect === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setDefect(d.id);
                      if (d.id === "normal") setIntensity(0);
                      else if (intensity === 0) setIntensity(30);
                    }}
                    className={`relative flex items-center justify-between px-7 py-4 rounded-2xl border text-left transition-all duration-500 overflow-hidden ${
                      active
                        ? "border-[#00E5FF]/35 bg-[#00E5FF]/[0.028]"
                        : "border-white/[0.045] bg-transparent hover:border-white/[0.1] hover:bg-white/[0.012]"
                    }`}
                  >
                    {/* Active left-edge accent bar */}
                    {active && (
                      <motion.div
                        layoutId="defectBar"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00E5FF] shadow-[2px_0_12px_rgba(0,229,255,0.6)]"
                      />
                    )}

                    <span className={`text-[11px] font-mono tracking-[0.32em] uppercase transition-colors duration-400 ${active ? "text-[#00E5FF]" : "text-white/45"}`}>
                      {d.label}
                    </span>
                    <span className={`text-[9px] font-mono tracking-[0.25em] transition-colors duration-400 ${active ? "text-[#00E5FF]/60" : "text-white/20"}`}>
                      {d.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Slider — only shown when a defect is active */}
            <AnimatePresence>
              {defect !== "normal" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono tracking-[0.42em] uppercase text-white/35">Intensità</span>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-[#00E5FF]">{intensity}%</span>
                  </div>
                  {/* Custom-styled range — removes all browser chrome */}
                  <div className="relative h-[1px] bg-white/10 w-full rounded-full">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#00E5FF]/40 rounded-full transition-all duration-100"
                      style={{ width: `${intensity}%` }}
                    />
                    <input
                      type="range"
                      min={0} max={100} value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-ew-resize h-6 -top-[11px]"
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#070707] border border-[#00E5FF]/70 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)] pointer-events-none transition-all duration-100"
                      style={{ left: `calc(${intensity}% - 6px)` }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── RIGHT: Optotype panel (7 col) ─── */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <GlassCard animate className="w-full max-w-[560px] aspect-[4/5] flex flex-col items-center justify-center px-12 py-16">
              <motion.div
                style={{ ...opticalStyle, transition: "filter 0.12s ease-out, transform 0.12s ease-out" }}
                className="font-display font-light text-white tracking-[0.55em] uppercase flex flex-col items-center gap-6 select-none w-full text-center"
              >
                {/* Chart rows with progressive opacity attenuation */}
                <div className="text-[clamp(5rem,14vw,9rem)] leading-none">E</div>
                <div className="text-[clamp(2.8rem,7vw,5rem)] leading-none">F P</div>
                <div className="text-[clamp(1.8rem,4vw,3rem)] leading-none text-white/85">T O Z</div>
                <div className="text-[clamp(1.2rem,2.5vw,2rem)] leading-none text-white/60">L P E D</div>
                <div className="text-[clamp(0.8rem,1.6vw,1.25rem)] leading-none text-white/35">P E C F D</div>

                {/* Calibration line — scientific UI detail */}
                <div className="w-full border-t border-white/[0.07] mt-4 pt-6">
                  <span className="text-[9px] font-mono tracking-[0.45em] text-[#00E5FF]/50 uppercase">
                    Snellen · 20/{defect === "normal" ? "20" : defect === "miopia" ? "200" : defect === "astigmatismo" ? "100" : "50"}
                  </span>
                </div>
              </motion.div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}

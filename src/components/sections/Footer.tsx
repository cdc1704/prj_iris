"use client";

import { SnellenText } from "@/components/ui/SnellenText";

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto py-20 border-t border-white/5"
      style={{ background: "var(--void)" }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <div className="font-editorial text-3xl mb-8">Iris</div>
          
          {/* Snellen Booking CTA */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-sm font-mono-ui" style={{ color: "var(--muted)" }}>/// VISION EXAM</span>
            <SnellenText 
              text="PRENOTA UNA VISITA" 
              className="text-2xl md:text-4xl text-cyan-400 hover:text-white transition-colors"
              scrambleSpeed={25}
              revealDuration={1200}
            />
          </div>

          <div className="font-mono-ui mt-2" style={{ color: "var(--muted)" }}>
            Procedural Ocular Engine
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <div className="font-mono-ui" style={{ color: "var(--muted)" }}>
            © MMXXV
          </div>
          <div className="font-mono-ui" style={{ color: "var(--muted)" }}>
            Tutti gli sguardi riservati
          </div>
        </div>
      </div>
    </footer>
  );
}

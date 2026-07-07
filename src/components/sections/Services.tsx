"use client";
import { IRIS_CONFIG } from "@/config/iris.config";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

const CHAPTER_META = "// SYSTEM_FOCUS";

const serviceData = IRIS_CONFIG.services.map((s, i) => ({
  ...s,
  index: i,
  tag: ["OPTOMETRIC", "LENS.DESIGN", "NEURO.VIS", "DIAGNOSTIC"][i] ?? "ANALYSIS",
}));

export default function Services() {
  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col justify-center px-6 md:px-20 py-40">
      <div className="max-w-[1480px] w-full mx-auto">

        {/* Section header — extreme scale contrast */}
        <div className="mb-28 flex flex-col gap-6 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] text-[#00E5FF] tracking-[0.45em] uppercase font-mono"
          >
            {CHAPTER_META} &nbsp; 04.ECOSISTEMI
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-[clamp(3rem,8vw,7.5rem)] font-display font-thin uppercase leading-[0.88] tracking-[-0.02em] text-white"
          >
            Ecosistemi<br />
            <span className="text-white/25">della Visione.</span>
          </motion.h2>
        </div>

        {/* Grid — asymmetric 4-col with staggered entry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {serviceData.map((service, i) => (
            <GlassCard key={service.id} animate tilt className="h-[420px] flex flex-col justify-between p-10">
              {/* Upper metadata row */}
              <div className="flex items-start justify-between">
                <span className="text-[9px] font-mono tracking-[0.38em] text-[#00E5FF]/55 uppercase">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span className="text-[8px] font-mono tracking-[0.3em] text-white/20 uppercase">
                  {service.tag}
                </span>
              </div>

              {/* Title + description block */}
              <div className="flex flex-col gap-5">
                <h3 className="text-[1.4rem] font-display font-light uppercase tracking-[-0.01em] leading-tight text-white group-hover:text-[#E3F2FD] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-[0.8rem] text-white/38 font-body leading-relaxed tracking-[0.01em]">
                  {service.description}
                </p>
              </div>

              {/* Footer divider with hover-reactive dot */}
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.05] group-hover:border-white/[0.09] transition-colors duration-500">
                <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-white/25">
                  Precision
                </span>
                {/* Status dot — accent only on hover */}
                <div className="w-[5px] h-[5px] rounded-full bg-white/18 group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_10px_3px_rgba(0,229,255,0.45)] transition-all duration-500" />
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
}

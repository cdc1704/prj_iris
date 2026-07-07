"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ServiceCard({ id, title, description, index }: any) {
  // Effetto Parallasse 3D sul movimento del mouse dentro la card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="perspective-1000 w-full h-[360px]">
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full p-8 rounded-2xl bg-gradient-to-br from-[rgba(255,255,255,0.03)] to-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.05)] backdrop-blur-xl group cursor-pointer flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[rgba(0,229,255,0.2)]"
      >
        {/* Riflesso di luce dinamico interno (Light Leak) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(0,229,255,0.02)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Struttura Numerica ad Alto Contrasto */}
        <div className="flex justify-between items-start font-display">
          <span className="text-[10px] tracking-[0.3em] text-[#00E5FF] font-bold opacity-60">
            [ 0{index + 1} ]
          </span>
          <span className="text-[10px] tracking-[0.2em] text-[rgba(255,255,255,0.2)] uppercase">
            Iris Premium
          </span>
        </div>

        {/* Blocco Testo Clean */}
        <div>
          <h3 className="text-xl font-display font-light text-white tracking-tight uppercase mb-4 group-hover:text-[#00E5FF] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-[rgba(255,255,255,0.4)] font-body leading-relaxed tracking-wide group-hover:text-[rgba(255,255,255,0.7)] transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Micro-Dettaglio Tecnico */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-4 flex justify-between items-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.3)]">
            Analisi Ottica Avanzata
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)] group-hover:bg-[#00E5FF] transition-colors duration-300 group-hover:scale-125" />
        </div>
      </motion.div>
    </div>
  );
}

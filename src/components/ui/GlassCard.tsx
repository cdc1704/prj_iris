"use client";
import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  tilt?: boolean;
}

export default function GlassCard({ children, className = "", animate = false, tilt = false }: GlassCardProps) {

  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], tilt ? ["8deg", "-8deg"] : ["0deg", "0deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], tilt ? ["-8deg", "8deg"] : ["0deg", "0deg"]);
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tilt) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-[1200px]"
      {...(animate ? {
        initial: { opacity: 0, y: 48, filter: "blur(12px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true, margin: "-8%" },
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
      } : {})}
    >
      <div className={`relative overflow-hidden rounded-[1.75rem] border border-white/[0.055] bg-gradient-to-b from-white/[0.042] via-white/[0.018] to-white/[0.008] backdrop-blur-2xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] group transition-[border-color] duration-700 hover:border-white/[0.11] ${className}`}>

        {/* Dynamic refraction glow that tracks the mouse */}
        {tilt && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(320px circle at ${x}% ${y}%, rgba(0,229,255,0.06), transparent 65%)`
              )
            }}
          />
        )}

        {/* Persistent top-edge specular gleam — like light catching glass bevel */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Light-leak sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00E5FF]/[0.025] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-out pointer-events-none" />

        {children}
      </div>
    </motion.div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagnifierCursor = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Custom motion values for mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring physics for the cursor movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 36); // Offset by half the width (72/2)
      cursorY.set(e.clientY - 36); // Offset by half the height (72/2)
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-white/10 flex items-center justify-center overflow-hidden"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 72,
        height: 72,
        opacity: isVisible ? 1 : 0,
        backdropFilter: "blur(4px) brightness(1.2)",
        WebkitBackdropFilter: "blur(4px) brightness(1.2)",
        boxShadow: "0 0 40px rgba(0, 229, 255, 0.1), inset 0 0 20px rgba(255,255,255,0.05)",
        // A subtle lens distortion effect
        background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.2) 100%)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
        {/* Subtle inner ring to look more like a physical lens */}
        <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
    </motion.div>
  );
};

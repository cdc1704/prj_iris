"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface SnellenTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealDuration?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export const SnellenText = ({
  text,
  className = "",
  scrambleSpeed = 30, // ms per scramble frame
  revealDuration = 1000, // total duration of the reveal
}: SnellenTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRevealing) {
      let frame = 0;
      const maxFrames = revealDuration / scrambleSpeed;

      interval = setInterval(() => {
        let currentText = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            currentText += " ";
            continue;
          }
          // The character settles down over time from left to right
          const settleThreshold = (i / text.length) * maxFrames;
          
          if (frame > settleThreshold) {
            currentText += text[i];
          } else {
            currentText += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        }
        setDisplayText(currentText);
        frame++;

        if (frame > maxFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, scrambleSpeed);
    } else {
      setDisplayText(text);
    }

    return () => {
      clearInterval(interval);
    };
  }, [text, isRevealing, scrambleSpeed, revealDuration]);

  const handleMouseEnter = () => {
    setIsRevealing(true);
    controls.start({ filter: "blur(0px)", opacity: 1 });
  };

  const handleMouseLeave = () => {
    // Optional: Reset effect on mouse leave, or keep it revealed
    setIsRevealing(false);
  };

  return (
    <motion.span
      className={`inline-block font-mono-ui uppercase cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ filter: "blur(4px)", opacity: 0.8 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {displayText || text}
    </motion.span>
  );
};

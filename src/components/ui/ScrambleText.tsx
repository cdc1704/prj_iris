"use client";

import React, { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  characters?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  duration = 1200,
  delay = 0,
  className = "",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    // Start after delay
    timeout = setTimeout(() => {
      setIsScrambling(true);
      let iteration = 0;
      const totalIterations = duration / 30; // Update every 30ms

      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (letter === " ") return " ";
              if (index < (iteration / totalIterations) * text.length) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }

        iteration += 1;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, duration, delay, characters]);

  return <span className={className}>{isScrambling ? displayText : text}</span>;
};

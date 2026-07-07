"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CinematicTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Seleziona tutte le parole e le anima con un leggero delay (stagger)
    const words = containerRef.current.querySelectorAll(".word");
    
    gsap.fromTo(
      words,
      { y: "100%", rotate: 3 },
      {
        y: "0%",
        rotate: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <h2 ref={containerRef} className="text-4xl md:text-6xl font-display font-light text-white uppercase tracking-tight flex flex-wrap gap-x-4 overflow-hidden py-2">
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden h-fit">
          <span className="word inline-block origin-left">{word}</span>
        </span>
      ))}
    </h2>
  );
}

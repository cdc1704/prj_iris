"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/context/ExperienceContext";

export default function Chapter02Light() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { isEyeOpened } = useExperience();

  useEffect(() => {
    if (!isEyeOpened || !containerRef.current || !textRef.current) return;

    // Quando entra nella viewport, facciamo una semplice animazione fade-in con ScrollTrigger
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true, // Lega l'animazione direttamente allo scroll
        },
      }
    );
  }, [isEyeOpened]);

  if (!isEyeOpened) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center font-display"
    >
      <h2 
        ref={textRef}
        className="text-3xl md:text-5xl text-[#E3F2FD] tracking-widest uppercase font-light text-center px-4 max-w-4xl"
      >
        La luce è l'inizio di ogni visione. <br/>
        <span className="text-[#00E5FF] font-bold">Noi ne guidiamo il percorso.</span>
      </h2>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { VisionSimulator } from "@/components/sections/VisionSimulator";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { AnimatedTabs } from "@/components/ui/AnimatedTabs";
import { DotPattern } from "@/components/ui/DotPattern";

import { motion, useScroll, useTransform } from "framer-motion";

/** Utility: observe elements with .reveal class and add .reveal-in when visible */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("reveal-in");
        });
      },
      { threshold: 0.18 }
    );

    const reveals = containerRef.current.querySelectorAll(".reveal");
    reveals.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return containerRef;
}

export default function EditorialSections() {
  const ref = useScrollReveal();
  
  // Parallax Mechanics
  const { scrollY } = useScroll();
  
  // yBg moves down slightly as we scroll (feels deeper)
  const yBg = useTransform(scrollY, [0, 2000], [0, 400]);
  // yText moves up slightly faster
  const yText = useTransform(scrollY, [0, 2000], [0, -200]);
  
  // Cards move up at varying speeds to create deep 3D separation
  const yCard1 = useTransform(scrollY, [0, 2000], [0, -50]);
  const yCard2 = useTransform(scrollY, [0, 2000], [0, -150]);
  const yCard3 = useTransform(scrollY, [0, 2000], [0, -250]);

  return (
    <div ref={ref}>
      {/* ═══════════════════════════════════════════════════
          CHAPTER I — L'Apertura (Hero editorial)
          ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-end px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto pb-[14vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(7,7,7,.6) 75%, var(--void) 100%)",
        }}
      >
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: yBg }}>
          <DotPattern className="opacity-20 mix-blend-screen" />
        </motion.div>
        
        <motion.div className="reveal relative z-10" style={{ y: yText }}>
          <span className="mask-line">
            <span className="mask-text font-mono-ui" style={{ color: "var(--cyan)" }}>
              Capitolo I — L&#39;apertura
            </span>
          </span>
          <h1 className="font-editorial text-[clamp(2.2rem,6.2vw,5.6rem)] leading-[1.02] mt-7 max-w-5xl">
            <span className="mask-line">
              <span className="mask-text d1">Every great vision</span>
            </span>
            <span className="mask-line">
              <span className="mask-text d2">begins with a</span>
            </span>
            <span className="mask-line">
              <span className="mask-text d3 italic" style={{ color: "var(--ice)" }}>
                single look.
              </span>
            </span>
          </h1>
          <p
            className="mt-10 max-w-xl leading-relaxed text-sm md:text-base"
            style={{ color: "var(--muted)" }}
          >
            Un occhio non è mai neutro. Ogni sguardo è una calibrazione — un atto di misura
            tra chi osserva e ciò che si lascia osservare. Qui l&#39;occhio è macchina, membrana e specchio.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ANATOMY TRIPTYCH — Sclera / Iride / Cornea
          ═══════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex items-center px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto py-28 md:py-36"
        style={{ background: "var(--void)" }}
      >
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 w-full">
          <motion.div style={{ y: yCard1 }}>
            <SpotlightCard className="reveal !bg-transparent !p-6 md:!p-8 h-full">
              <div className="font-mono-ui mb-5" style={{ color: "var(--cyan)" }}>
                01 · Sclera
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl mb-4 leading-tight">
                Il bulbo umido
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Una superficie biologicamente accurata. Riflette i punti luce geometrici dello
                studio virtuale circostante attraverso un livello di clearcoat hardware, con
                finitura umida e sub-sheen latteo.
              </p>
            </SpotlightCard>
          </motion.div>
          <motion.div style={{ y: yCard2 }}>
            <SpotlightCard className="reveal !bg-transparent !p-6 md:!p-8 h-full">
              <div className="font-mono-ui mb-5" style={{ color: "var(--cyan)" }}>
                02 · Iride
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl mb-4 leading-tight">
                Cristallo di blu ghiaccio
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Tinteggiata di un profondo blu ghiaccio che sfuma verso un ciano luminoso.
                Materia auto-emissiva che simula la luce intrappolata nelle striature della
                membrana oculare.
              </p>
            </SpotlightCard>
          </motion.div>

          <motion.div style={{ y: yCard3 }}>
            <SpotlightCard className="reveal !bg-transparent !p-6 md:!p-8 h-full">
              <div className="font-mono-ui mb-5" style={{ color: "var(--cyan)" }}>
                03 · Cornea
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl mb-4 leading-tight">
                Lente di vetro
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Indice di rifrazione fisico reale, ior 1.376. Quando l&#39;occhio si muove, la
                lente deforma e curva la luce che attraversa l&#39;iride retrostante, come una
                lente ottica di precisione.
              </p>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CHAPTER II — Il Respiro
          ═══════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto py-28 md:py-36"
        style={{ background: "var(--void)" }}
      >
        <div className="reveal max-w-3xl">
          <span className="mask-line">
            <span className="mask-text font-mono-ui" style={{ color: "var(--cyan)" }}>
              Capitolo II — Il respiro
            </span>
          </span>
          <h2 className="font-editorial text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.05] mt-7">
            <span className="mask-line">
              <span className="mask-text d1">L&#39;interfaccia non è pietra.</span>
            </span>
            <span className="mask-line">
              <span className="mask-text d2 italic" style={{ color: "var(--ice)" }}>
                Respira.
              </span>
            </span>
          </h2>
          <p
            className="mt-10 leading-relaxed max-w-xl text-sm md:text-base"
            style={{ color: "var(--muted)" }}
          >
            Ogni dodici secondi l&#39;iride e la pupilla subiscono una micro-espansione
            oscillatoria dell&#39;1.5%. Un battito lento, subconscio, che trasmette calma clinica e
            precisione. Il movimento dello sguardo è governato da un&#39;equazione di
            interpolazione lineare — inerzia fluida, pesante, vellutata.
          </p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            <div>
              <div className="font-mono-ui" style={{ color: "var(--muted)" }}>Lerp</div>
              <div className="font-editorial text-3xl md:text-4xl mt-3">0.05</div>
            </div>
            <div>
              <div className="font-mono-ui" style={{ color: "var(--muted)" }}>Breath</div>
              <div className="font-editorial text-3xl md:text-4xl mt-3">12s</div>
            </div>
            <div>
              <div className="font-mono-ui" style={{ color: "var(--muted)" }}>Ampiezza</div>
              <div className="font-editorial text-3xl md:text-4xl mt-3">1.5%</div>
            </div>
            <div>
              <div className="font-mono-ui" style={{ color: "var(--muted)" }}>IOR</div>
              <div className="font-editorial text-3xl md:text-4xl mt-3">1.376</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CHAPTER III — Il Gesto
          ═══════════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex items-center px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto py-28 md:py-36"
        style={{ background: "var(--void)" }}
      >
        <div className="reveal w-full">
          <div className="font-mono-ui mb-6" style={{ color: "var(--cyan)" }}>
            Capitolo III — Il gesto
          </div>
          <h2 className="font-editorial text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.1] max-w-4xl">
            Un click, e la materia{" "}
            <span className="italic" style={{ color: "var(--ice)" }}>
              si sblocca
            </span>
            . La pupilla si contrae per un millisecondo, poi si dilata in un flash di luce
            bianca che attraversa la cornea di vetro.
          </h2>
          <div className="mt-14 grid md:grid-cols-2 gap-10 max-w-4xl">
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Miosi estrema: la pupilla nera si contrae per un millisecondo. Midriasi
              spettacolare: si dilata generando un flash bianco che attraversa la cornea. Il
              canvas 3D si ancora stabilmente sullo sfondo.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Le scritte editoriali compaiono dal basso, tagliate da maschere invisibili. La
              rotellina del mouse si sblocca e inizia il viaggio smooth-scroll verso i
              capitoli successivi.
            </p>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════════════
          TELEMETRY DASHBOARD (Bento Grid)
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto border-t border-white/5" style={{ background: "var(--void)" }}>
        <div className="mb-16">
          <div className="font-mono-ui mb-4 text-cyan-400">/// MODULO DIAGNOSTICA</div>
          <h2 className="font-editorial text-4xl md:text-5xl mb-6">Telemetria in Tempo Reale</h2>
        </div>
        <BentoGrid />
      </section>

      {/* ═══════════════════════════════════════════════════
          REFRACTIVE ERRORS (Animated Tabs)
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto border-t border-white/5" style={{ background: "var(--void)" }}>
        <div className="mb-16 text-center">
          <div className="font-mono-ui mb-4 text-cyan-400">/// EDUCAZIONE PAZIENTE</div>
          <h2 className="font-editorial text-4xl md:text-5xl mb-6">Comprendere la Visione</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Esplora le caratteristiche dei principali difetti refrattivi attraverso 
            modelli ottici semplificati.
          </p>
        </div>
        <AnimatedTabs />
      </section>

      {/* ═══════════════════════════════════════════════════
          VISION SIMULATOR
          ═══════════════════════════════════════════════════ */}
      <VisionSimulator />
    </div>
  );
}

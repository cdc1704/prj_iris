"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "../ui/ScrambleText";

type DefectType = "miopia" | "ipermetropia" | "astigmatismo" | "presbiopia";

const DEFECT_CONFIGS = {
  miopia: {
    id: "miopia",
    label: "Miopia",
    unit: "D",
    sign: "-",
    max: 6,
    step: 0.25,
    description: "L'immagine va a fuoco prima della retina. Difficoltà nella visione da lontano.",
    getEffects: (val: number) => ({
      backgroundBlur: val * 1.5,
      foregroundBlur: 0,
      ghosting: 0,
    }),
    clinicalText: (val: number) => {
      if (val === 0) return "Visione emmetrope (perfetta).";
      if (val < 2) return "Lieve miopia. Lontano sfocato, vicino perfetto.";
      if (val < 4) return "Miopia moderata. Necessaria correzione per guida e TV.";
      return "Miopia elevata. Visione del mondo circostante compromessa.";
    }
  },
  ipermetropia: {
    id: "ipermetropia",
    label: "Ipermetropia",
    unit: "D",
    sign: "+",
    max: 4,
    step: 0.25,
    description: "L'immagine va a fuoco oltre la retina. Difficoltà e affaticamento da vicino.",
    getEffects: (val: number) => ({
      backgroundBlur: val * 0.3, // Slight strain on background
      foregroundBlur: val * 1.5, // High strain on foreground
      ghosting: 0,
    }),
    clinicalText: (val: number) => {
      if (val === 0) return "Visione emmetrope (perfetta).";
      if (val < 2) return "Ipermetropia latente. Il cristallino compensa sforzandosi, causando mal di testa.";
      return "Ipermetropia manifesta. Impossibile leggere da vicino senza lenti.";
    }
  },
  astigmatismo: {
    id: "astigmatismo",
    label: "Astigmatismo",
    unit: "CYL",
    sign: "-",
    max: 4,
    step: 0.25,
    description: "Cornea ovale anziché sferica. Immagine distorta e sdoppiata a tutte le distanze.",
    getEffects: (val: number) => ({
      backgroundBlur: val * 0.8,
      foregroundBlur: val * 0.8,
      ghosting: val * 2.5, // pixel offset for ghosting
    }),
    clinicalText: (val: number) => {
      if (val === 0) return "Assenza di aberrazioni corneali.";
      if (val < 1.5) return "Lieve sdoppiamento delle luci, specialmente guida notturna.";
      return "Forte distorsione meridionale. Lettere sdoppiate e abbagliamento continuo.";
    }
  },
  presbiopia: {
    id: "presbiopia",
    label: "Presbiopia",
    unit: "ADD",
    sign: "+",
    max: 3,
    step: 0.25,
    description: "Irrigidimento del cristallino per l'età (40+). Incapacità di messa a fuoco da vicino.",
    getEffects: (val: number) => ({
      backgroundBlur: 0, // Distance vision unaffected
      foregroundBlur: val * 2, // Close vision severely affected
      ghosting: 0,
    }),
    clinicalText: (val: number) => {
      if (val === 0) return "Accomodazione attiva.";
      if (val < 1.5) return "Inizio presbiopia. Necessità di allontanare il testo per leggere.";
      return "Presbiopia avanzata. Necessari occhiali da lettura per computer e smartphone.";
    }
  }
};

export const VisionSimulator = () => {
  const [activeDefect, setActiveDefect] = useState<DefectType>("miopia");
  const [severity, setSeverity] = useState(0); // 0 to max

  const config = DEFECT_CONFIGS[activeDefect];
  const effects = config.getEffects(severity);

  // Generate CSS drop-shadow for astigmatism ghosting effect
  const ghostingFilter = effects.ghosting > 0 
    ? `drop-shadow(${effects.ghosting}px ${effects.ghosting * 0.5}px rgba(0,229,255,0.4)) drop-shadow(-${effects.ghosting}px -${effects.ghosting * 0.5}px rgba(255,0,0,0.3))` 
    : "drop-shadow(0px 0px rgba(0,0,0,0))";

  const handleTabChange = (defectId: DefectType) => {
    setActiveDefect(defectId);
    setSeverity(0); // Reset severity when switching defect
  };

  return (
    <section className="py-32 px-6 md:px-16 lg:px-28 max-w-[1400px] mx-auto border-t border-white/5 relative z-10" style={{ background: "var(--void)" }}>
      <div className="mb-12">
        <div className="font-mono-ui mb-4 text-cyan-400">/// ESPERIENZA EMPATICA</div>
        <h2 className="font-editorial text-4xl md:text-5xl mb-6">Attraverso i loro occhi</h2>
        <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
          Usa lo slider per manipolare l'indice di rifrazione del motore grafico.
          Sperimenta in prima persona l'impatto dei quattro principali difetti visivi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
        {(Object.keys(DEFECT_CONFIGS) as DefectType[]).map((key) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`px-4 py-2 font-mono-ui text-sm tracking-widest transition-colors duration-300 ${
              activeDefect === key 
                ? "text-cyan-400 border-b-2 border-cyan-400" 
                : "text-gray-500 hover:text-white"
            }`}
          >
            {DEFECT_CONFIGS[key].label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* VISUAL SIMULATOR DISPLAY (Split Screen) */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 bg-[#070707] aspect-[4/3] md:aspect-video flex flex-col md:flex-row">
          
          {/* Left Side: Background Layer (Far) */}
          <motion.div 
            className="flex-1 relative flex flex-col items-center justify-center text-center p-8 border-b md:border-b-0 md:border-r border-white/5"
            animate={{ 
              filter: `blur(${effects.backgroundBlur}px) ${ghostingFilter}`,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <div className="absolute top-4 left-4 font-mono-ui text-[10px] text-white/30 tracking-widest">VISIONE DA LONTANO (∞)</div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 bg-cyan-500/20 rounded-full mix-blend-screen translate-x-[-20%] translate-y-[-20%]" />
              <div className="w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen translate-x-[20%] translate-y-[20%]" />
            </div>
            
            <h3 className="font-editorial text-4xl md:text-6xl mb-2 text-white/90 relative z-10">Orizzonte</h3>
            <p className="font-mono-ui text-cyan-400/50 tracking-widest text-xs relative z-10">
              PANORAMA & PROFONDITÀ
            </p>
          </motion.div>

          {/* Right Side: Foreground Layer (Close / Near Vision Test) */}
          <motion.div
            className="flex-1 relative flex flex-col items-center justify-center p-8 bg-black/40"
            animate={{ 
              filter: `blur(${effects.foregroundBlur}px) ${ghostingFilter}`,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <div className="absolute top-4 right-4 font-mono-ui text-[10px] text-white/30 tracking-widest text-right">VISIONE DA VICINO (35cm)</div>
            
            {/* Reading Chart (Progressively smaller text) */}
            <div className="flex flex-col gap-3 font-editorial text-gray-300 text-center w-full max-w-[240px]">
              <div className="border-b border-white/10 pb-2 mb-2 font-mono-ui text-xs text-cyan-400">TEST JAEGER</div>
              <div className="text-2xl leading-none">Visus 1/10</div>
              <div className="text-xl leading-none text-gray-400">Poter leggere questo rigo</div>
              <div className="text-lg leading-none text-gray-400">indica una vista sufficiente.</div>
              <div className="text-base leading-none text-gray-500">I caratteri più piccoli richiedono</div>
              <div className="text-sm leading-none text-gray-500">un'ottima capacità di accomodazione</div>
              <div className="text-xs leading-none text-cyan-500/70 mt-2 font-mono-ui">se leggi questo non hai presbiopia</div>
            </div>
          </motion.div>

        </div>

        {/* CONTROLS */}
        <div className="lg:col-span-4 flex flex-col gap-8 bg-white/[0.02] p-8 rounded-2xl border border-white/5 h-full justify-between">
          <div>
            <div className="mb-8">
              <h4 className="font-editorial text-2xl text-white mb-2">{config.label}</h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">{config.description}</p>
            </div>

            <div className="flex justify-between items-end mb-4">
              <label className="font-mono-ui text-sm text-cyan-400">SEVERITÀ</label>
              <span className="font-editorial text-4xl">
                {severity === 0 ? "0.00" : `${config.sign}${severity.toFixed(2)}`} <span className="text-xl text-gray-500">{config.unit}</span>
              </span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max={config.max} 
              step={config.step} 
              value={severity} 
              onChange={(e) => setSeverity(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono-ui">
              <span>NORMALE</span>
              <span>GRAVE</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className="font-mono-ui text-xs tracking-widest text-cyan-400 mb-2">DIAGNOSI SIMULATA</div>
            <p className="text-sm text-gray-300 leading-relaxed min-h-[60px]">
              <ScrambleText text={config.clinicalText(severity)} key={`${activeDefect}-${severity}`} delay={50} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
